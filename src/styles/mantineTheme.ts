import { MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
  fontFamily: "Poppins, sans-serif",
  colors: {
    grey: [
      "#ffffff",
      "#f8f9fa",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#6c757d",
      "#495057",
      "#343a40",
      "#212529",
    ],
    main: ["#000000", "#3d2645", "#832161", "#da4167", "#83216152", "#f0eff4"],
  },
  spacing: { md: "24px" },
  radius: { md: "12px" },
  lineHeight: "20px",
  components: {
    Title: {
      variants: {
        formHeading: () => ({
          root: {
            fontSize: "28px",
            lineHeight: "33.89px",
            marginBottom: "16px",
          },
        }),
      },
    },
    TextInput: {
      styles: (theme) => ({
        root: {
          marginBottom: "14px",
        },
        input: {
          fontSize: "14px",
          lineHeight: "21px",
          ":focus": {
            borderColor: theme.colors.main[2],
            caretColor: theme.colors.main[2],
          },
        },
      }),
    },
    PasswordInput: {
      styles: (theme) => ({
        root: {
          marginBottom: "14px",
        },
        input: {
          fontSize: "14px",
          lineHeight: "21px",
          ":focus": {
            borderColor: theme.colors.main[2],
            caretColor: theme.colors.main[2],
          },
          ":focus-within": {
            borderColor: theme.colors.main[2],
          },
        },
      }),
    },
    Button: {
      variants: {
        primary: (theme) => ({
          root: {
            backgroundColor: theme.colors.main[3],
            padding: "4px 20px",
            color: theme.colors.main[5],
            borderRadius: "8px",
            fontWeight: 500,

            // ":hover": {
            //   backgroundColor: theme.colors.blue[2],
            // },
            // ":focus": {
            //   backgroundColor: theme.colors.blue[0],
            // },
          },
        }),
        ghost: (theme) => ({
          root: {
            backgroundColor: "transparent",
            border: `1px solid ${theme.colors.main[2]}`,
            color: theme.colors.main[2],
          },
        }),
        light: (theme) => ({
          root: {
            backgroundColor: `${theme.colors.main[3]}80`,
            color: theme.colors.grey[0],
            fontWeight: "normal",
            svg: {
              marginRight: "10px",
            },
            ":hover": {
              backgroundColor: `${theme.colors.main[2]}`,
            },
          },
        }),
      },
    },
    ActionIcon: {
      variants: {
        round: (theme) => ({
          root: {
            backgroundColor: theme.colors.grey[0],
            border: `1px solid ${theme.colors.grey[4]}`,
            borderRadius: "50%",
            padding: "4px",
          },
        }),
      },
    },
    Tabs: {
      styles: (theme) => ({
        tabsList: {
          button: {
            backgroundColor: theme.colors.grey[0],
            padding: "14px",
            "&[data-active=true]": {
              backgroundColor: theme.colors.main[1],
              borderColor: theme.colors.main[1],
              color: theme.colors.grey[0],
            },
          },
        },
      }),
    },
  },
};
