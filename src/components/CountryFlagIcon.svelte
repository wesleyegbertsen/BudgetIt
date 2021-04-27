<script>
    //https://www.npmjs.com/package/country-flag-icons
    //https://catamphetamine.gitlab.io/country-flag-icons/3x2/
    //https://stackoverflow.com/a/65627412

    import { Constants } from '../resources.js';
    import CountryFlags from 'images/country-flags';
    
    export let country;
    export let language;
	export { clazz as class };

    let clazz;

    if (!country && language) {
        country = Constants.countryFlagForLanguage[language.replace('-', '_')];
    }
</script>

<img 
    class={clazz || ''}
    alt="{country}"
    src="{CountryFlags[country]}"/>