<script>
	import successkid from 'images/successkid.jpg';
	import { Label, Icon } from '@smui/common';
	import Button from '@smui/button';

	let lightTheme = typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;

	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `client/smui${lightTheme ? '' : '-dark'}.css`;
		document.head.appendChild(themeLink);
	}
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>

<Button on:click={() => switchTheme()}>
	<Icon class="material-icons">dark_mode</Icon>
	<Label>Switch theme</Label>
</Button>