"use client";
import { Container } from "@mantine/core";
import Header from "../header";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container variant="centered" bg="main.2" maw="unset" mih="100vh" p={0}>
      {children}
      <ToastContainer />
    </Container>
  );
};

export default MainLayout;
