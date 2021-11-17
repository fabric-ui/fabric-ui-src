import React, {useContext} from 'react'
import LanguageContext from "../context/LanguageContext";
import LocaleEN from "../../locales/LocaleEN";
import LocalePT from "../../locales/LocalePT";

export default function useLocale() {
  const locale = useContext(LanguageContext)
  return (word) => {
    switch (locale) {
      case 'en':
        return LocaleEN[word]
      default:
        return LocalePT[word]
    }
  }
}
