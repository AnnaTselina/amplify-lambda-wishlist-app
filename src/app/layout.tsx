import type { Metadata } from "next";
import AuthenticationProvider from "@/providers/authentication";
import MantineThemeProvider from "@/providers/mantine";
import MainLayout from "@/components/mainLayout";

export const metadata: Metadata = {
  title: "Wishy",
  description: "Create wish list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineThemeProvider>
          <AuthenticationProvider>
            <MainLayout>{children}</MainLayout>
          </AuthenticationProvider>
        </MantineThemeProvider>
      </body>
    </html>
  );
}
