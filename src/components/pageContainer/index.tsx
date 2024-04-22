"use client";
import { Container } from "@mantine/core";

const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <main>
    <Container variant="centered" p="40px 24px" m={0} maw="100%">
      {children}
    </Container>
  </main>
);

export default PageContainer;
