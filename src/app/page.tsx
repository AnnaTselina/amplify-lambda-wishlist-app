"use client";

import styles from "./page.module.css";
import "@aws-amplify/ui-react/styles.css";

import { Amplify } from "aws-amplify";
import config from "../amplifyconfiguration.json";
import {
  WithAuthenticatorProps,
  withAuthenticator,
} from "@aws-amplify/ui-react";

Amplify.configure(config);

const Home = ({ signOut, user }: WithAuthenticatorProps) => {
  return (
    <main className={styles.main}>
      <p>My amplify project</p>
      <p>{`User: ${user?.username}`}</p>
    </main>
  );
};

export default withAuthenticator(Home);
