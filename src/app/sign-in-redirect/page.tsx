"use client";
import { ROUTES } from "@/utils/constants";
import { Center, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";

const SignInRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    getCurrentUser()
      .then((data: { userId: string }) => {
        if (data.userId) {
          router.push(ROUTES.wishlists);
        } else {
          router.push(ROUTES.home);
        }
      })
      .catch(() => {
        router.push(ROUTES.home);
      });
  }, []);

  return (
    <Center mih="90vh">
      <Loader color="main.4" size="xl" />
    </Center>
  );
};

export default SignInRedirect;
