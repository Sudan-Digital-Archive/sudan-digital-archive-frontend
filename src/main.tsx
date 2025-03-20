import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CodeOfConduct from "./pages/CodeofConduct.tsx";
import Archive from "./pages/Archive.tsx";
import Mission from "./pages/Mission.tsx";
import ViewAccession from "./pages/ViewAccession.tsx";
import WhoAreWe from "./pages/WhoAreWe.tsx";
import WhyAnotherArchive from "./pages/WhyAnotherArchive.tsx";
import "./il18n.ts";
import "./css/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import ChakraThemeRTLProvider from "./components/ChakraThemeRTLProvider.tsx";
import { ColorModeScript } from "@chakra-ui/react";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale";
import ContactUs from "./pages/ContactUs.tsx";

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
  { path: "/code-of-conduct", element: <CodeOfConduct /> },
  {
    path: "/archive",
    element: <Archive />,
  },
  {
    path: "/archive/:id",
    element: <ViewAccession />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "*",
    element: <Home />,
  },
], { basename: "/" });
registerLocale("ar", ar);
// replay routes we DO want react router to render - they need to
// serve files from our static site
// however the service worker that the replay web page component uses
// intercepts all other requests to /replay/ so we don't want those
// to go through react router
const replayRoutes = new Set(["/replay/sw.js", "/replay/ui.js"]);
const isNonReplayRoute = (path: string) => {
  return !path.startsWith("/replay/") || replayRoutes.has(path);
};

if (isNonReplayRoute(window.location.pathname)) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ColorModeScript initialColorMode="dark" />
      <ChakraThemeRTLProvider>
        <RouterProvider router={router} />
      </ChakraThemeRTLProvider>
    </StrictMode>
  );
}
