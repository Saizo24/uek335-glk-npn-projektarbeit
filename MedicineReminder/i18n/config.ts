import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  de: {
      reminder: "Erinnerung",
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: "de",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});