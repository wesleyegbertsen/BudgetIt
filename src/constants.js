const CONSTANTS = {
    app: {
        name: 'BudgetIt'
    },
    ui: {
        minimumDesktopWidth: 720
    },
    locales: {//code = BCP 47 (RFC 5646), lang = ISO 639, country = ISO 3166-1 alpha-2
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
    },
    currencies: {//code = ISO_4217
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
    },
    cookies: {
        locale: 'locale',
        currency: 'currency'
    }
}
export { CONSTANTS };
