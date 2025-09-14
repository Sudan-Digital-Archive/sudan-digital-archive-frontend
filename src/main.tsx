import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./il18n.ts";
import "./css/styles.css";
import { BrowserRouter } from "react-router";
import ChakraThemeRTLProvider from "./components/ChakraThemeRTLProvider.tsx";
import { ColorModeScript } from "@chakra-ui/react";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale";
import { UserProvider } from "./context/UserContext.tsx";
import {App} from "./App.tsx";
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
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </ChakraThemeRTLProvider>
    </StrictMode>
  );
}
