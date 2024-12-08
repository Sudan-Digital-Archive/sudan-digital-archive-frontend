import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import About from "./pages/about.tsx";
import Archive from "./pages/archive.tsx";
import BrowsertrixDemo from "./pages/browsertrixDemo.tsx";
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
    path: "/browsertrix-demo",
    element: <BrowsertrixDemo />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);
// this service worker is seriously cool
// it lives in public/replay/sw.js
// and imports a service worker that webrecorder built
// it intercepts all requests to /replay/sw.js to allow
// use of a <replay-web-page/> component that lets you embed
// full browser crawls in a webpage using JS injected
// with a script tag in `index.html`
// https://github.com/webrecorder/replayweb.page
navigator.serviceWorker
.register("/replay/sw.js")
.then((registration) =>
  console.log(
    "Service Worker registration successful with scope: ",
    registration.scope
  )
)
.catch((err) => console.log("Service Worker registration failed: ", err));
createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <ChakraThemeRTLProvider>
      <RouterProvider router={router} />
    </ChakraThemeRTLProvider>
  </StrictMode>
);
