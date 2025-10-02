import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import theme from "./theme.js";
import "./index.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/600.css";
import "@fontsource/cairo/700.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      {/* v2: نمرّر الثيم بـ theme (وليس value) */}
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </HashRouter>
  </StrictMode>
);
