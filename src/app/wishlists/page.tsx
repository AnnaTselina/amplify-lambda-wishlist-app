import { Header } from "@/components";
import CreateWishlist from "@/components/createWishlist";
import PageContainer from "@/components/pageContainer";
import { runWithAmplifyServerContext } from "@/utils/amplifyServerUtils";
import { cookies } from "next/headers";
import { get } from "aws-amplify/api/server";
import WishlistsAll from "@/components/wishlistsAll";

const Wishlists = async () => {
  const getWishlistsOperation = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: (contextSpec) =>
      get(contextSpec, {
        apiName: "wishlistAPI",
        path: "/wishlist",
      }),
  });

  const { body } = await getWishlistsOperation.response;
  // TODO: solve DocumentType issue
  const wishlistsData = (await body.json()) as any;

  return (
    <>
      <Header />
      <PageContainer>
        <CreateWishlist />
        <WishlistsAll wishlists={Object.values(wishlistsData.data.wishlists)} />
      </PageContainer>
    </>
  );
};
export default Wishlists;
