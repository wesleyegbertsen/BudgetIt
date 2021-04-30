import { version } from '../version.js'

const CONSTANTS_APP = {
    name: 'BudgetIt',
    version: version
}

const CONSTANTS_UI = {
    minimumDesktopWidth: 720
}

const CONSTANTS_LOCALES = {//code = BCP 47 (RFC 5646), lang = ISO 639, country = ISO 3166-1 alpha-2
    en_US: {
        code: "en-US",
        lang: "en",
        country: "US"
    },
    en_GB: {
        code: "en-GB",
        lang: "en",
        country: "GB"
    },
    nl_NL:{
        code: "nl-NL",
        lang: "nl",
        country: "NL"
    },
    nl_BE:{
        code: "nl-BE",
        lang: "nl",
        country: "BE"
    }
}

const CONSTANTS_CURRENCIES = {//code = ISO_4217
    USD: {
        code: 'USD',
        symbol: '$'
    },
    GBP: {
        code: 'GBP',
        symbol: '£'
    },
    EUR: {
        code: 'EUR',
        symbol: '€'
    }
}

const CONSTANTS_COOKIES = {
    locale: 'locale',
    currency: 'currency'
}

export { 
    CONSTANTS_APP,
    CONSTANTS_UI,
    CONSTANTS_LOCALES,
    CONSTANTS_CURRENCIES,
    CONSTANTS_COOKIES
};
