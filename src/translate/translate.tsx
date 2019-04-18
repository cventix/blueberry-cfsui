import { addLocale, useLocale } from 'ttag';
import * as cookie from './cookie';

const LOCALE_COOKIE = '__locale';

export const getLocale = () => cookie.get(LOCALE_COOKIE) || 'fa';
export const saveLocale = (locale: string) => cookie.set(LOCALE_COOKIE, locale);

// setup
const locale = getLocale();

if (locale !== 'fa') {
	const translationsObj = require(`./${locale}.po.json`);
	addLocale(locale, translationsObj);
	useLocale(locale);
	// document.body.setAttribute('style', 'direction: ltr');
}

export const set = (key: string, value: string) => document.cookie = `${key}=${value}`;