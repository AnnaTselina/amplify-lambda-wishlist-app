"use client";

import { Authenticator } from "@aws-amplify/ui-react";

const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <Authenticator.Provider>{children}</Authenticator.Provider>;

export default AuthenticationProvider;
