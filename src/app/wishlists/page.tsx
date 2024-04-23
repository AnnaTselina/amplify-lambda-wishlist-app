import { Header } from "@/components";
import CreateWishlist from "@/components/createWishlist";
import PageContainer from "@/components/pageContainer";

const Wishlists = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <CreateWishlist />
      </PageContainer>
    </>
  );
};
export default Wishlists;
