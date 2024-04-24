import { IWishlist } from "@/types";
import { Card, Group, Text, ActionIcon } from "@mantine/core";
import EditIcon from "/public/icons/icons8-edit.svg";

interface IWishlistCard {
  wishlist: IWishlist;
  onEditWishlist: () => void;
}

const WishlistCard = ({ wishlist, onEditWishlist }: IWishlistCard) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      key={wishlist.id}
      w="45%"
    >
      <Group position="apart" mt="xs" mb="xs">
        <Text weight={500}>{wishlist.name}</Text>
        <ActionIcon variant="transparent" onClick={onEditWishlist}>
          <EditIcon />
        </ActionIcon>
      </Group>
    </Card>
  );
};

export default WishlistCard;
