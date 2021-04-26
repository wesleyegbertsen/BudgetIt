<script>
    //https://www.npmjs.com/package/country-flag-icons

    import { Constants } from '../resources.js';
    
    export let country;
    export let language;
    export let size = "3x2";//3x2 or 1x1
	export { clazz as class };

    let clazz;

    if (!country && language) {
        country = Constants.countryFlagForLanguage[language.replace('-', '_')];
    }
</script>

<img 
    class={clazz || ''}
    alt="{country}"
    src="http://purecatamphetamine.github.io/country-flag-icons/{size}/{country}.svg"/>