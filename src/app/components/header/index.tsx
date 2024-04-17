import { SimpleError } from "@/app/types";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return null;
  }

  const handleLogOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast.error(
        (error as SimpleError).message ||
          "Unexpected error happened trying to log out. Please try again."
      );
    }
  };

  return (
    <header>
      <button onClick={handleLogOut}>Log Out</button>
    </header>
  );
};

export default Header;
