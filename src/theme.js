// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Cairo', sans-serif`,
    body: `'Cairo', sans-serif`,
  },
  colors: {
    primary: "#247CFF",
    secondary: "#4F46E5",
    mainText: "#6B7280",   // للهيدينجز
    subtitle: "#4F46E5",   // للنصوص الثانوية
    success: "#27AE5F",
    error: "#E63948",
  },
  styles: {
    global: {
      "h1, h2, h3, h4, h5, h6": {
        color: "mainText",
      },
      body: {
        color: "subtitle",
      },
    },
  },
  components: {
        FormLabel: {
      baseStyle: {
        color: "black",
        fontWeight: "600",
      },
    },  
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "primary",
          color: "white",
          _hover: {
            bg: "secondary",
          },
        },
      },
    },
  },
});

export default theme;
