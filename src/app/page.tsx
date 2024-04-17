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
  return (
    <>
      <Header />
      <main className={styles.main}>
        <p>My amplify project</p>
        <p>{`User: ${user?.username}`}</p>
      </main>
    </>
  );
};

export default withAuthenticator(Home);
