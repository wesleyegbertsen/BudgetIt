<script>
	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
	} from '@smui/top-app-bar';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	import IconButton from '@smui/icon-button';
	import { Icon } from '@smui/common';
	import {
		mdiWeatherSunny,
		mdiWeatherNight,
	} from '@mdi/js';
	import Svg from '@smui/common/Svg.svelte';
	import { goto } from '@sapper/app';
	import { Constants } from '../resources.js'

	export let segment;

	let topAppBar;
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
	:global(main) { /*Styling for AutoAdjust*/
		position: relative;
		top: 20px;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	ul {
		margin: 0;
		padding: 0 0 0 10px;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: 4px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	:global(#nav-title) {
		cursor: pointer;
	}
</style>

<TopAppBar bind:this={topAppBar} variant="standard" dense=true>
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<Title id="nav-title" on:click={() => goto('.')}>{Constants.app.name}</Title>
			<ul>
				<li><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
				<li><a aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a></li>
		
				<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
					 the blog data when we hover over the link or tap it on a touchscreen -->
				<li><a rel=prefetch aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a></li>
			</ul>
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Download">file_download</IconButton>
			<IconButton class="material-icons" aria-label="Print this page">print</IconButton>
			<IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>
			<Wrapper>
				<IconButton toggle pressed={lightTheme} on:MDCIconButtonToggle:change={switchTheme}>
					<Icon component={Svg} viewBox="0 0 24 24" on>
						<path fill="currentColor" d={mdiWeatherNight} />
					</Icon>
					<Icon component={Svg} viewBox="0 0 24 24">
						<path fill="currentColor" d={mdiWeatherSunny} />
					</Icon>
				</IconButton>
				<Tooltip xPos="start" yPos="below">{lightTheme ? 'Lights off' : 'Lights on'}</Tooltip>
			</Wrapper>
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot></slot>
</AutoAdjust>