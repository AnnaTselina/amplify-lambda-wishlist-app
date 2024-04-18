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

Amplify.configure(config);

const Home = ({ user }: WithAuthenticatorProps) => {
  const handleCreateWishlist = () => {
    // instantiate a headers object
    const myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");

    // create a JSON object with parameters for API call and store in a variable
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      // redirect: "follow",
    };

    fetch(
      "https://6zmhwmkyyg.execute-api.eu-north-1.amazonaws.com/dev",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => alert(JSON.parse(result).body))
      .catch((error) => console.log("error", error));
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
