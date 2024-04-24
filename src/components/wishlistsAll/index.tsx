"use client";
import { IWishlist } from "@/types";
import {
  Card,
  Flex,
  Text,
  Group,
  ActionIcon,
  Modal,
  TextInput,
  Button,
} from "@mantine/core";
import EditIcon from "/public/icons/icons8-edit.svg";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { put } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import WishlistCard from "../wishlistCard";

const WishlistsAll = ({ wishlists }: { wishlists: IWishlist[] }) => {
  const [editWishlistModalOpened, { open, close }] = useDisclosure(false);
  const [editedWishlist, setEditedWishlist] = useState<IWishlist | null>(null);

  const router = useRouter();

  const handleEditWishlist = () => {
    if (!editedWishlist) {
      return;
    }

    try {
      put({
        apiName: "wishlistAPI",
        path: "/wishlist",
        options: {
          body: {
            id: editedWishlist.id,
            updated: {
              name: editedWishlist.name,
            },
          },
        },
      });

      close();
      setEditedWishlist(null);
      router.refresh();
    } catch (e: any) {
      toast.error(
        JSON.parse(e.response?.body)?.message ||
          "Error occurred trying to update wish list"
      );
    }
  };

  return (
    <>
      {wishlists.length ? (
        <Flex mt="md" justify="space-between" gap="sm" wrap="wrap">
          {wishlists.map((wishlist) => (
            <WishlistCard
              wishlist={wishlist}
              onEditWishlist={() => {
                setEditedWishlist(wishlist);
                open();
              }}
            />
          ))}
        </Flex>
      ) : (
        "No wishlists"
      )}
      <Modal
        opened={editWishlistModalOpened && !!editedWishlist}
        onClose={close}
        title="Edit wishlist"
        centered
        overlayProps={{
          color: "grey.3",
          opacity: 0.55,
          blur: 3,
        }}
      >
        <>
          <TextInput
            placeholder="Name"
            label="Name"
            value={editedWishlist?.name}
            onChange={(event) =>
              setEditedWishlist((state) => ({
                ...state!,
                name: event.target.value,
              }))
            }
          />
          <Button
            variant="primary"
            disabled={!editedWishlist?.name.length}
            onClick={handleEditWishlist}
          >
            Save
          </Button>
        </>
      </Modal>
    </>
  );
};

export default WishlistsAll;
