import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import About from "./pages/about.tsx";
import Archive from "./pages/archive.tsx";
import "./il18n.ts";
import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import ChakraThemeRTLProvider from "./components/chakra-theme-rtl-provider.tsx";
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
  {
    path: "*",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <ChakraThemeRTLProvider>
      <RouterProvider router={router} />
    </ChakraThemeRTLProvider>
  </StrictMode>
);
