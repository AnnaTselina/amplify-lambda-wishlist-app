"use client";
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  PasswordInput,
  TextInput,
  Title,
  Text,
  Group,
  PinInput,
} from "@mantine/core";
import GoogleSocialIcon from "/public/icons/social-google.svg";
import {
  autoSignIn,
  confirmSignUp,
  signInWithRedirect,
  signUp,
  resendSignUpCode,
} from "aws-amplify/auth";
import { AmplifySignUpResult, SimpleError } from "@/types";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/constants";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const signUpForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) =>
        EMAIL_REGEX.test(value) ? null : "Please enter valid email",
      password: (value) =>
        PASSWORD_REGEX.test(value)
          ? null
          : "Please, enter password that is at least 8 characters long, contains at least one lowercase and one uppercase letter and at least one special character",
      confirmPassword: (value, values) =>
        !value.length
          ? "Please confirm password"
          : value !== values.password
          ? "Passwords did not match"
          : null,
    },
  });

  const signUpVerifyCodeForm = useForm({
    initialValues: {
      code: "",
    },

    validate: {
      code: (value) => (value.length < 6 ? "Please enter code" : null),
    },
  });

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpForm.validate().hasErrors) {
      try {
        const { nextStep } = await signUp({
          username: signUpForm.values.email,
          password: signUpForm.values.password,
          options: {
            userAttributes: {
              email: signUpForm.values.email,
            },
            autoSignIn: true,
          },
        });

        if (nextStep.signUpStep === AmplifySignUpResult.CONFIRM_SIGN_UP) {
          setShowVerifyCode(true);
        }
      } catch (error) {
        toast.error(
          (error as SimpleError).message ||
            "Unexpected error happened trying to sign up. Please try again."
        );
      }
    }
  };

  const handleAutoSignIn = async () => {
    try {
      const signInOutput = await autoSignIn();

      if (
        signInOutput.isSignedIn &&
        signInOutput.nextStep.signInStep === AmplifySignUpResult.DONE
      ) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(
        (error as SimpleError).message ||
          "Unexpected error happened trying to auto sign in."
      );
    }
  };

  const handleSignUpVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpVerifyCodeForm.validate().hasErrors) {
      try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
          username: signUpForm.values.email,
          confirmationCode: signUpVerifyCodeForm.values.code,
        });

        if (
          isSignUpComplete &&
          nextStep.signUpStep === AmplifySignUpResult.COMPLETE_AUTO_SIGN_IN
        ) {
          handleAutoSignIn();
        }
      } catch (error) {
        toast.error(
          (error as SimpleError).message ||
            "Unexpected error happened trying to verify code. Please try again."
        );
      }
    }
  };

  const handleResendCode = () => {
    try {
      resendSignUpCode({
        username: signUpForm.values.email,
      });
    } catch (error) {
      toast.error(
        (error as SimpleError).message ||
          "Unexpected error happened trying to resend verification code. Please try again."
      );
    }
  };

  return (
    <>
      <Title variant="formHeading">Sign up</Title>
      {!showVerifyCode ? (
        <form onSubmit={handleSignUp} id="sign-up-form">
          <TextInput
            placeholder="Your email"
            {...signUpForm.getInputProps("email")}
          />
          <PasswordInput
            placeholder="Your password"
            {...signUpForm.getInputProps("password")}
          />
          <PasswordInput
            placeholder="Confirm your password"
            {...signUpForm.getInputProps("confirmPassword")}
          />
          <Button variant="primary" type="submit">
            Sign up
          </Button>
          <Divider my="xs" label="Or sign up with:" labelPosition="center" />
          <ActionIcon
            variant="round"
            m="0 auto"
            onClick={() => signInWithRedirect({ provider: "Google" })}
          >
            <GoogleSocialIcon />
          </ActionIcon>
        </form>
      ) : (
        <form onSubmit={handleSignUpVerifyCode} id="sign-up-form-verify">
          <Flex direction="column" gap="xl">
            <Text fz="md">{`Your code is on the way. To continue, enter the code we emailed to ${signUpForm.values.email}. It may take a minute to arrive.`}</Text>
            <Group position="center" mt="24px" mb="24px">
              <PinInput
                length={6}
                type="number"
                {...signUpVerifyCodeForm.getInputProps("code")}
              />
            </Group>
            <Group>
              <Button variant="primary" type="submit">
                Verify
              </Button>
              <Button variant="primary" onClick={handleResendCode}>
                Resend code
              </Button>
            </Group>
          </Flex>
        </form>
      )}
    </>
  );
};

export default SignUpForm;
