<script>
	import { Constants } from '../resources.js'
	import { onMount } from 'svelte';
	import { AutoAdjust } from '@smui/top-app-bar/styled';
	import Drawer, {
		AppContent,
		Content,
		Header,
		Title,
		Subtitle,
		Scrim,
	} from '@smui/drawer/styled';
	import HeaderBar from '../components/HeaderBar.svelte';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list/styled';
	import H6 from '@smui/common/H6.svelte';

	export let segment;

	let topAppBar;
	let innerWidth;
	let open = false;
	let isDesktopView = () => innerWidth >= Constants.ui.minimumDesktopWidth;

	onMount(async () => {
		open = isDesktopView();
	});
	$: segment, open = isDesktopView();

	//TODO: Hacky fix so the margin-right on the AppContent caused by the Drawer, doesn't cause the toolbar section of the TopAppBar to go out of view
	$: if (typeof window !== 'undefined' && (open || !open) && innerWidth) {
		document
			.querySelector('.mdc-top-app-bar section[role=toolbar]')
			.style.marginRight = (open && innerWidth >= Constants.ui.minimumDesktopWidth) ? '256px' : '0';
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
</style>

<svelte:window bind:innerWidth/>


<!--TODO: Move Drawer/Scrim component to a custom Svelte component so _layout stays readable and clean -->
<Drawer variant="{innerWidth >= Constants.ui.minimumDesktopWidth ? 'dismissible' : 'modal'}" bind:open>
	<Header>
		<Title>{Constants.app.name}</Title>
		<Subtitle>{Constants.app.description}</Subtitle>
	</Header>
	<Content>
		<List>
		<Item href="." activated={segment === undefined}>
			<Graphic class="material-icons" aria-hidden="true">home</Graphic>
			<Text>Home</Text>
		</Item>
		<Item href="about" activated={segment === 'about'}>
			<Graphic class="material-icons" aria-hidden="true">info</Graphic>
			<Text>About</Text>
		</Item>
		<Item rel=prefetch href="blog" activated={segment === 'blog'}>
			<Graphic class="material-icons" aria-hidden="true">message</Graphic>
			<Text>Blog</Text>
		</Item>

		<!--<Separator />
		<Subheader component={H6}>Labels</Subheader>
		<Item href="javascript:void(0)" on:click={() => setActiveDrawerItem('Family')} activated={segment === 'Family'}>
			<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			<Text>Family</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActiveDrawerItem('Friends')} activated={segment === 'Friends'}>
			<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			<Text>Friends</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActiveDrawerItem('Work')} activated={segment === 'Work'}>
			<Graphic class="material-icons" aria-hidden="true">bookmark</Graphic>
			<Text>Work</Text>
		</Item>-->
		</List>
	</Content>
</Drawer>

{#if innerWidth <= Constants.ui.minimumDesktopWidth}
	<Scrim/>
{/if}

<AppContent>
	<HeaderBar bind:topAppBar on:click={() => (open = !open)}/>
	<AutoAdjust {topAppBar}>
		<slot></slot>
	</AutoAdjust>
</AppContent>