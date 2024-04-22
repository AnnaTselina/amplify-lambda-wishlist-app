"use client";
import {
  ActionIcon,
  Button,
  Divider,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { signIn, signInWithRedirect } from "aws-amplify/auth";
import GoogleSocialIcon from "/public/icons/social-google.svg";
import { useForm } from "@mantine/form";
import { EMAIL_REGEX } from "@/utils/constants";
import { toast } from "react-toastify";
import { AmplifySignUpResult, SimpleError } from "@/types";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const logInForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        EMAIL_REGEX.test(value) ? null : "Please enter valid email",
      password: (value) => (value.length ? null : "Please enter password"),
    },
  });

  const router = useRouter();

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInForm.validate().hasErrors) {
      try {
        const { isSignedIn, nextStep } = await signIn({
          username: logInForm.values.email,
          password: logInForm.values.password,
        });

        if (isSignedIn && nextStep.signInStep === AmplifySignUpResult.DONE) {
          // TODO: fix
          //router.reload();
        } else if (
          nextStep.signInStep === AmplifySignUpResult.CONFIRM_SIGN_UP
        ) {
          toast.error("User is not confirmed.");
        }
      } catch (error) {
        toast.error(
          (error as SimpleError).message ||
            "Unexpected error happened trying to log in. Please try again or contact support."
        );
      }
    }
  };

  return (
    <>
      <Title variant="formHeading">Log in</Title>
      <form id="log-in-form">
        <TextInput
          placeholder="Your email"
          {...logInForm.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Your password"
          {...logInForm.getInputProps("password")}
        />
        <Button variant="primary" type="submit">
          Log in
        </Button>
        <Divider my="xs" label="Or log in with:" labelPosition="center" />
        <ActionIcon
          variant="round"
          m="0 auto"
          onClick={() => signInWithRedirect({ provider: "Google" })}
        >
          <GoogleSocialIcon />
        </ActionIcon>
      </form>
    </>
  );
};

export default LoginForm;
