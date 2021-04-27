import {
	register,
	init,
	getLocaleFromNavigator,
	locale as $locale,
} from 'svelte-i18n';

import { setCookie, getCookie } from './modules/cookie.js';

const INIT_OPTIONS = {
	fallbackLocale: 'en-US',
	initialLocale: null,
	loadingDelay: 200,
	formats: {
		number: {//https://en.wikipedia.org/wiki/ISO_4217
			USD: { style: 'currency', currency: 'USD' },
			GBP: { style: 'currency', currency: 'GBP' },
			EUR: { style: 'currency', currency: 'EUR' }
		}
	},
	warnOnMissingMessages: true,
};

let currentLocale = null;

//TODO: Might want to give en-US and en-GB && nl-NL and nl-BE a separate locale dictionary, since there are some nuanced differences.
//https://stackoverflow.com/a/9713377
register('en-US', () => import('./locales/en.json'));
register('en-GB', () => import('./locales/en.json'));
register('nl-NL', () => import('./locales/nl.json'));
register('nl-BE', () => import('./locales/nl.json'));

$locale.subscribe((value) => {
	if (value == null) return;

	currentLocale = value;

	// if running in the client, save the language preference in a cookie
	if (typeof window !== 'undefined') {
		setCookie('locale', value);
	}
});

// initialize the i18n library in client
export function startClient() {
	init({
		...INIT_OPTIONS,
		initialLocale: getCookie('locale') || getLocaleFromNavigator(),
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

		let locale = getCookie('locale', req.headers.cookie);

		// no cookie, let's get the first accepted language
		if (locale == null) {
			if (req.headers['accept-language']) {
				const headerLang = req.headers['accept-language'].split(',')[0].trim();
				if (headerLang.length > 1) {
					locale = headerLang;
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