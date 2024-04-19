"use client";

import styles from "./page.module.css";
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
import {
  WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { Header } from "./components";
import { post } from "aws-amplify/api";

Amplify.configure(config);

const Home = ({ user }: WithAuthenticatorProps) => {
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
        <button onClick={handleCreateWishlist}>Create wishlist</button>
        <p>{`User: ${user?.username}`}</p>
      </main>
    </>
  );
};

export default withAuthenticator(Home);
