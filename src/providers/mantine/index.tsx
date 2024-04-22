"use client";
import { MantineProvider } from "@mantine/core";
import { myTheme } from "@/styles/mantineTheme";

const MantineThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={myTheme}>
    {children}
  </MantineProvider>
);
export default MantineThemeProvider;
