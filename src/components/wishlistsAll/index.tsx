"use client";
import { IWishlist } from "@/types";
import { Card, Flex, Text } from "@mantine/core";

const WishlistsAll = ({ wishlists }: { wishlists: IWishlist[] }) => {
  return wishlists.length ? (
    <Flex mt="md" justify="space-between">
      {wishlists.map((wishlist) => (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          key={wishlist.id}
          w="45%"
        >
          <Text weight={500}>{wishlist.name}</Text>
        </Card>
      ))}
    </Flex>
  ) : (
    "currently no wish lists"
  );
};

export default WishlistsAll;
