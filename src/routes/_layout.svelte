<script>
	import { AutoAdjust } from '@smui/top-app-bar/styled';
	import { AppContent } from '@smui/drawer/styled';
	import NavigationDrawer from '../components/NavigationDrawer.svelte';
	import TopAppBar from '../components/TopAppBar.svelte';

	export let segment;

	let open;
	let topAppBar;
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
</style>

<NavigationDrawer {segment} bind:open />

<AppContent>
	<TopAppBar bind:topAppBar on:click={() => (open = !open)}/>
	<AutoAdjust {topAppBar}>
		<slot/>
	</AutoAdjust>
</AppContent>