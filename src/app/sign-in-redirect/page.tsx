"use client";

import { ROUTES } from "@/utils/constants";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Center, Loader } from "@mantine/core";
import {useRouter} from "next/navigation";
import { useEffect } from "react";

const SignInRedirect = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(ROUTES.wishlists);
    } else {
      router.push(ROUTES.home)
    }
  }, [user]);

  return (
    <Center mih="90vh">
      <Loader color="main.4" size="xl" />
    </Center>
  );
};

export default SignInRedirect;
