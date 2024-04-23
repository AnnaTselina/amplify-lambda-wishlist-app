"use client";
import { SimpleError } from "@/types";
import { ROUTES } from "@/utils/constants";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, Flex } from "@mantine/core";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const isSRPUser = user.signInDetails?.authFlowType === "USER_SRP_AUTH";
      await signOut();

      if (isSRPUser) {
        router.push(ROUTES.home);
      }
    } catch (error) {
      toast.error(
        (error as SimpleError).message ||
          "Unexpected error happened trying to log out. Please try again."
      );
    }
  };

  return (
    <header>
      <Flex p={14} justify="flex-end">
        {authStatus === "authenticated" && (
          <Button variant="ghost" onClick={handleLogOut}>
            Log out
          </Button>
        )}
      </Flex>
    </header>
  );
};

export default Header;
