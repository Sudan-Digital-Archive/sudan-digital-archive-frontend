import { beforeAll } from "vitest";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import React from "react";
import arTranslations from "../src/translations/ar.json";
import enTranslations from "../src/translations/en.json";
import { registerLocale } from "react-datepicker";
import { ar } from "date-fns/locale";

export const resetLanguage = () => {
  i18n.changeLanguage("en");
  document.documentElement.lang = "en";
  document.documentElement.dir = "ltr";
};

export const addi18n = () => {
  beforeAll(() => {
    registerLocale("ar", ar);
    i18n.init({
      lng: "en",
      resources: {
        en: enTranslations,
        ar: arTranslations,
      },
    });
    resetLanguage();
  });
};

interface RenderOptions {
  language?: "en" | "ar";
}

export const renderWithProviders = (
  component: React.ReactNode,
  options: RenderOptions = {}
) => {
  if (options.language) {
    i18n.changeLanguage(options.language);
    document.documentElement.lang = options.language;
    document.documentElement.dir = options.language === "ar" ? "rtl" : "ltr";
  }

  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </BrowserRouter>
  );
};
