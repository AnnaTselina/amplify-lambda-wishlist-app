"use client";
import { IWishlist } from "@/types";
import { Flex, Text, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import WishlistCard from "../wishlistCard";
import EditWishlist from "../editWishlist";

const WishlistsAll = ({ wishlists }: { wishlists: IWishlist[] }) => {
  const [editWishlistModalOpened, { open, close }] = useDisclosure(false);
  const [editedWishlist, setEditedWishlist] = useState<IWishlist | null>(null);

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
        <Center h="50vh">
          <Text fz="l" mt="md" color="grey.0">
            No wishlists! Let's create one...
          </Text>
        </Center>
      )}

      <EditWishlist
        editedWishlist={editedWishlist}
        setEditedWishlist={setEditedWishlist}
        modalOpened={editWishlistModalOpened}
        closeModal={close}
      />
    </>
  );
};

export default WishlistsAll;
