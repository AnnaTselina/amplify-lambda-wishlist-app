"use client";
import { IWishlist } from "@/types";
import { Group, Modal, TextInput, Button, Loader } from "@mantine/core";
import { put, del } from "aws-amplify/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface IEditWishlist {
  editedWishlist: IWishlist | null;
  setEditedWishlist: React.Dispatch<React.SetStateAction<IWishlist | null>>;
  modalOpened: boolean;
  closeModal: () => void;
}

const EditWishlist = ({
  editedWishlist,
  setEditedWishlist,
  modalOpened,
  closeModal,
}: IEditWishlist) => {
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();

  const handleEditWishlist = async () => {
    if (!editedWishlist) {
      return;
    }
    try {
      setEditLoading(true);
      const result = put({
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

      await result.response;

      closeModal();
      setEditLoading(false);
      setEditedWishlist(null);
      router.refresh();
    } catch (e: any) {
      toast.error(
        JSON.parse(e.response?.body)?.message ||
          "Error occurred trying to update wish list"
      );
    }
  };

  const handleDeleteWishlist = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      setDeleteLoading(true);
      const result = del({
        apiName: "wishlistAPI",
        path: `/wishlist`,
        options: {
          queryParams: {
            id,
          },
        },
      });

      await result.response;

      closeModal();
      setEditedWishlist(null);
      setDeleteLoading(false);
      router.refresh();
    } catch (e: any) {
      toast.error(
        JSON.parse(e.response?.body)?.message ||
          "Error occurred trying to update wish list"
      );
    }
  };

  return (
    <Modal
      opened={modalOpened && !!editedWishlist}
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
        <Group position="apart" mt="xs" mb="xs">
          <Button
            variant="primary"
            disabled={!editedWishlist?.name.length}
            onClick={handleEditWishlist}
          >
            {editLoading ? <Loader color="grey.0" size="xs" /> : "Save"}
          </Button>
          <Button
            variant="ghost"
            sx={(theme) => ({
              color: theme.colors.main[3],
              borderColor: theme.colors.main[3],
            })}
            onClick={() => {
              handleDeleteWishlist(editedWishlist!.id);
            }}
          >
            {deleteLoading ? (
              <Loader color="main.3" size="xs" />
            ) : (
              "Delete wishlist"
            )}
          </Button>
        </Group>
      </>
    </Modal>
  );
};

export default EditWishlist;
