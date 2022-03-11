import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import enUsTrans from "./locales/en-us";
import zhCnTrans from "./locales/zh-cn";

i18n.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enUsTrans,
      },
      zh: {
        translation: zhCnTrans,
      },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n;