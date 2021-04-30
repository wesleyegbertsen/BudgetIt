import {
	register,
	init,
	getLocaleFromNavigator,
	locale as $locale,
} from 'svelte-i18n';

import { setCookie, getCookie } from './modules/cookie.js';
import { CONSTANTS } from './constants.js';

//Creating a list of number formats for i18n based of all defined currencies in CONSTANTS 
let numberFormats = {};
Object.values(CONSTANTS.currencies).forEach(currency => numberFormats[currency.code] = {style: 'currency', currency: currency.code});

const INIT_OPTIONS = {
	fallbackLocale: CONSTANTS.locales.en_US.code,
	initialLocale: null,
	loadingDelay: 200,
	formats: {number: numberFormats},
	warnOnMissingMessages: true,
};

let currentLocale = null;

//TODO: Might want to give en-US and en-GB && nl-NL and nl-BE a separate locale dictionary, since there are some nuanced differences.
//https://stackoverflow.com/a/9713377
//Dynamic imports don't work, so the commented-out code below doesn't work
//Object.values(CONSTANTS.locales).forEach(locale => register(locale.code, () => import(`./locales/${locale.lang}.json`)));
register(CONSTANTS.locales.en_US.code, () => import('./locales/en.json'));
register(CONSTANTS.locales.en_GB.code, () => import('./locales/en.json'));
register(CONSTANTS.locales.nl_NL.code, () => import('./locales/nl.json'));
register(CONSTANTS.locales.nl_BE.code, () => import('./locales/nl.json'));

$locale.subscribe((value) => {
	if (value == null) return;

	currentLocale = value;

	// if running in the client, save the language preference in a cookie
	if (typeof window !== 'undefined') {
		setCookie(CONSTANTS.cookies.locale, value);
		if (!getCookie(CONSTANTS.cookies.currency)) {
			setCookie(CONSTANTS.cookies.currency, DefaultCurrencyForLocale(value));
		}
	}
});

function DefaultCurrencyForLocale(locale) {
	switch(locale) {
		case CONSTANTS.locales.en_US.code:
			return numberFormats.USD.currency;
		case CONSTANTS.locales.en_GB.code:
			return numberFormats.GBP.currency;
		case CONSTANTS.locales.nl_NL.code:
		case CONSTANTS.locales.nl_BE.code:
			return numberFormats.EUR.currency;
	}
	return locale;
}

function nonSpecificLocaleToDefaultSpecificLocale(locale) {
	switch(locale) {
		case CONSTANTS.locales.en_US.lang:
			return CONSTANTS.locales.en_US.code;
		case CONSTANTS.locales.nl_NL.lang:
			return CONSTANTS.locales.nl_NL.code;
	}
	return locale;
}

// initialize the i18n library in client
export function startClient() {
	init({
		...INIT_OPTIONS,
		initialLocale: getCookie(CONSTANTS.cookies.locale) || nonSpecificLocaleToDefaultSpecificLocale(getLocaleFromNavigator()),
	});
}

// init only for routes (urls with no extensions such as .js, .css, etc) and for service worker
const DOCUMENT_REGEX = /(^([^.?#@]+)?([?#](.+)?)?|service-worker.*?\.html)$/;
// initialize the i18n library in the server and returns its middleware
export function i18nMiddleware() {
	// initialLocale will be set by the middleware
	init(INIT_OPTIONS);

	return (req, res, next) => {
		const isDocument = DOCUMENT_REGEX.test(req.originalUrl);
		// get the initial locale only for a document request
		if (!isDocument) {
			next();
			return;
		}

		let locale = getCookie(CONSTANTS.cookies.locale, req.headers.cookie);

		// no cookie, let's get the first accepted language
		if (locale == null) {
			if (req.headers['accept-language']) {
				const headerLang = req.headers['accept-language'].split(',')[0].trim();
				if (headerLang.length > 1) {
					locale = nonSpecificLocaleToDefaultSpecificLocale(headerLang);
				}
			} else {
				locale = INIT_OPTIONS.initialLocale || INIT_OPTIONS.fallbackLocale;
			}
		}

		if (locale != null && locale !== currentLocale) {
			$locale.set(locale);
		}

		next();
	};
}