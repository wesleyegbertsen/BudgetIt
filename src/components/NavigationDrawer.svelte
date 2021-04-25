<script>
	import { Constants } from '../resources.js'
	import { onMount } from 'svelte';
	import Drawer, {
		Content,
		Header,
		Title,
		Subtitle,
		Scrim,
	} from '@smui/drawer/styled';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list/styled';
	import H6 from '@smui/common/H6.svelte';

	export let segment;
    export let open;

	let innerWidth;
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

<svelte:window bind:innerWidth/>

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

<!--FIXME: Clicking Scrim when initial innerWidth is less than or equal to minimumDesktopWidth, won't dismiss navigation drawer-->
{#if innerWidth <= Constants.ui.minimumDesktopWidth}
	<Scrim/>
{/if}