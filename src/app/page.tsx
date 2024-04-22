import styles from "./page.module.css";
import "@aws-amplify/ui-react/styles.css";

import { Header } from "../components";
import { post } from "aws-amplify/api";

const Home = () => {
  const handleCreateWishlist = async () => {
    try {
      const restOperation = post({
        apiName: "wishlistAPI",
        path: "/wishlist",
        options: {
          body: {},
        },
      });

      const { body } = await restOperation.response;
      const response = await body.json();
    } catch (e: any) {
      console.log("POST call failed: ", JSON.parse(e.response.body));
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <p>My amplify project</p>
        {/* <button onClick={handleCreateWishlist}>Create wishlist</button> */}
      </main>
    </>
  );
};

export default Home;
