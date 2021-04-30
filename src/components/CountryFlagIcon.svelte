<script>
    //https://www.npmjs.com/package/country-flag-icons
    //https://catamphetamine.gitlab.io/country-flag-icons/3x2/
    //https://stackoverflow.com/a/65627412

    import { CONSTANTS } from '../constants.js';
    import CountryFlags from 'images/country-flags';
    
    export let country;
    export let locale;
	export { clazz as class };

    let clazz;

    if (!country && locale) {
        country = CONSTANTS.locales[locale.replace('-', '_')].country;
    }
</script>

<img 
    class={clazz || ''}
    alt="{country}"
    src="{CountryFlags[country]}"/>