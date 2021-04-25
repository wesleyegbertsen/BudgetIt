<script>
    import Svg from '@smui/common/Svg.svelte';
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar/styled';
	import Tooltip, { Wrapper } from '@smui/tooltip/styled';
	import IconButton from '@smui/icon-button/styled';
	import { Icon } from '@smui/common/styled';
	import { mdiCashRegister, mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
	import { goto } from '@sapper/app';
	import { Constants } from '../resources.js'

	export let topAppBar = undefined;

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
		document.head
			.querySelector('link[href="client/smui-dark.css"]')
			.insertAdjacentElement('afterend', themeLink);
	}
</script>

<style>
	:global(#header-title) {
		cursor: pointer;
		display: flex;
    	align-items: center;
	}
	:global(#header-title svg) {
		padding-right: 5px;
		/*color: #F0E68C;*/
	}
</style>

<TopAppBar bind:this={topAppBar}>
	<Row>
		<Section>
			<IconButton class="material-icons" on:click>menu</IconButton>
			
			<Title id="header-title" on:click={() => goto('.')}>
				<Icon component={Svg} viewBox="0 0 24 24" width=24 height=24>
					<path fill="currentColor" d={mdiCashRegister} />
				</Icon>
				{Constants.app.name}
			</Title>
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
				<Tooltip xPos="start" yPos="below" style="margin-left: -30px; margin-top: -5px;">{lightTheme ? 'Lights off' : 'Lights on'}</Tooltip>
			</Wrapper>
		</Section>
	</Row>
</TopAppBar>