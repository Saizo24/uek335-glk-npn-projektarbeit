import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * This would be part of the internationalization to translate all of the text that is shown to the user.
 * Unfortunately, we couldn't make it work, maybe because the integration of our time picker from react-native-paper
 * interferes with it, but we are not sure about it.
 */
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