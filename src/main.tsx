import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import About from "./pages/about.tsx";
import Archive from "./pages/archive.tsx";
import "./il18n.ts";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { ColorModeScript } from "@chakra-ui/react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
