"use client";
import { Container, Tabs } from "@mantine/core";

import LoginForm from "./login";
import SignUpForm from "./signUp";

const Auth = () => {
  return (
    <>
      <Tabs defaultValue="log-in" variant="outline" maw="640px" m="0 auto">
        <Tabs.List grow position="center">
          <Tabs.Tab value="log-in">Log in</Tabs.Tab>
          <Tabs.Tab value="sign-up">Sign up</Tabs.Tab>
        </Tabs.List>

        <Container
          p={50}
          bg="main.5"
          ml="unset"
          mr="unset"
          mih="25rem"
          maw="unset"
        >
          <Tabs.Panel value="log-in">
            <LoginForm />
          </Tabs.Panel>
          <Tabs.Panel value="sign-up">
            <SignUpForm />
          </Tabs.Panel>
        </Container>
      </Tabs>
    </>
  );
};

export default Auth;
