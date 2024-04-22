"use client";
import { Container } from "@mantine/core";
import Header from "../header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container variant="centered" bg="main.2" maw="unset" mih="100vh" p={0}>
      <Header />
      <Container variant="centered" p="40px 24px" m={0} maw="100%">
        {children}
      </Container>
      <ToastContainer />
    </Container>
  );
};

export default MainLayout;
