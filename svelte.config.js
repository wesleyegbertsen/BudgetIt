// svelte.config.js
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
  preprocess: sveltePreprocess({
    defaults: {
		style: 'scss'
	}
  }),
  // ...other svelte options
};