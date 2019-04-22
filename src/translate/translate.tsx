import * as React from 'react'
import { addLocale, useLocale } from 'ttag'

const LOCALE_STORAGE = '__language'

export const getLocale = () => localStorage.getItem(LOCALE_STORAGE) || 'fa'
export const saveLocale = (locale: string) => localStorage.setItem(LOCALE_STORAGE, locale)

// setup
const locale = getLocale()

if (locale !== 'fa') {
  const translationsObj = require(`./${locale}.po.json`);
  addLocale(locale, translationsObj);
  useLocale(locale);
  document.body.setAttribute('lang', 'en');
} else {
  document.body.setAttribute('lang', 'fa');
}
