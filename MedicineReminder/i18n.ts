import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";



const resources = {
  en: {
    translation: {

    }
  },
  de: {
    translation: {

    }
  },
};

i18next.use(initReactI18next).use(LanguageDetector)
.init({
  resources,
  fallbackLng: "en",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18next;
