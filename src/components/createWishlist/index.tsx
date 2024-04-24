"use client";

import { Button, Modal, TextInput } from "@mantine/core";
import PlusIcon from "/public/icons/icons8-plus.svg";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { post } from "aws-amplify/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateWishlist = () => {
  const [modalOpened, { open, close }] = useDisclosure(false);
  const [wishlistName, setWishlistName] = useState("");
  const [wishlistNameError, setWishlistNameError] = useState(false);

  const router = useRouter();

  const handleCreateWishlist = async () => {
    if (!wishlistName.length) {
      setWishlistNameError(true);
      return;
    } else {
      try {
        post({
          apiName: "wishlistAPI",
          path: "/wishlist",
          options: {
            body: {
              name: wishlistName,
            },
          },
        });

        close();
        setWishlistName("");

        router.refresh();
      } catch (e: any) {
        toast.error(
          JSON.parse(e.response?.body)?.message ||
            "Error occurred trying to create wish list"
        );
      }
    }
  };

  return (
    <>
      <Button variant="light" size="lg" onClick={open}>
        <PlusIcon />
        Create wishlist
      </Button>
      <Modal
        opened={modalOpened}
        onClose={close}
        title="Enter wishlist name"
        centered
        overlayProps={{
          color: "grey.3",
          opacity: 0.55,
          blur: 3,
        }}
      >
        <TextInput
          placeholder="Name"
          withAsterisk
          value={wishlistName}
          onChange={(event) => setWishlistName(event.currentTarget.value)}
          error={wishlistNameError}
        />
        <Button variant="primary" onClick={handleCreateWishlist}>
          Create
        </Button>
      </Modal>
    </>
  );
};

export default CreateWishlist;
