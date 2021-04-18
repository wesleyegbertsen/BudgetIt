<script>
	import Nav from '../components/Nav.svelte';
	import { AutoAdjust } from '@smui/top-app-bar';

	export let segment;

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

<Nav {segment} bind:topAppBar/>

<AutoAdjust {topAppBar}>
	<slot></slot>
</AutoAdjust>