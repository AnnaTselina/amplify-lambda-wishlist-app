"use client";
import { Amplify } from "aws-amplify";
import config from "../../aws-exports-extended.js";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure(config, { ssr: true });

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <Authenticator.Provider>{children}</Authenticator.Provider>;

export default AuthenticationProvider;
