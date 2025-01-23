import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodeOfConduct from "./pages/code_of_conduct.tsx";
import Archive from "./pages/archive.tsx";
import Mission from "./pages/mission.tsx";
import ViewAccession from "./pages/view_accession.tsx";
import WhoAreWe from "./pages/who_are_we.tsx";
import WhyAnotherArchive from "./pages/why_another_archive.tsx";
import "./il18n.ts";
import "./css/styles.css";
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
    path: "/mission",
    element: <Mission />,
  },
  {
    path: "/who-are-we",
    element: <WhoAreWe />,
  },
  { path: "/why-another-archive", element: <WhyAnotherArchive /> },
  {path: "/code-of-conduct", element: <CodeOfConduct/>},
  {
    path: "/archive",
    element: <Archive />,
  },
  {
    path: "/archive/:id",
    element: <ViewAccession />,
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
