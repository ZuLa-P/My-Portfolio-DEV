import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// EN
import enNav from "./locales/en/nav";
import enHome from "./locales/en/home";
import enProjects from "./locales/en/projects";
import enContact from "./locales/en/contact";
import enValidation from "./locales/en/validation";

// TH
import thNav from "./locales/th/nav";
import thHome from "./locales/th/home";
import thProjects from "./locales/th/projects";
import thContact from "./locales/th/contact";
import thValidation from "./locales/th/validation";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        nav: enNav,
        home: enHome,
        projects: enProjects,
        contact: enContact,
        validation: enValidation,
      },
    },
    th: {
      translation: {
        nav: thNav,
        home: thHome,
        projects: thProjects,
        contact: thContact,
        validation: thValidation,
      },
    },
  },
  lng: localStorage.getItem("lang") || "th",
  fallbackLng: "th",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
