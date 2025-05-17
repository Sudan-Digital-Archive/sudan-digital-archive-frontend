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
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import ChakraThemeRTLProvider from "./components/ChakraThemeRTLProvider.tsx";
import { ColorModeScript } from "@chakra-ui/react";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale";
import ContactUs from "./pages/ContactUs.tsx";
import Login from "./pages/Login.tsx"
import JWTAuth from "./pages/JWTAuth.tsx";
import { UserProvider } from "./context/UserContext.tsx";

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
            <Routes>
              <Route index element={<Home />} />
              <Route path="mission" element={<Mission />} />
              <Route path="who-are-we" element={<WhoAreWe />} />
              <Route path="why-another-archive" element={<WhyAnotherArchive />} />
              <Route path="code-of-conduct" element={<CodeOfConduct />} />
              <Route path="archive" element={<Archive />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="archive/:id" element={<ViewAccession />} />
              <Route path="login" element={<Login />} />
              <Route path="jwt-auth" element={<JWTAuth />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ChakraThemeRTLProvider>
    </StrictMode>
  );
}
