<script>
	import { _, locale, locales } from 'svelte-i18n';
	import { setCookie, getCookie } from '../modules/cookie.js';
	import { CONSTANTS } from '../constants.js';
	import { onMount } from 'svelte';
	import Drawer, {
		Content,
		Header,
		Title,
		Subtitle,
		Scrim,
	} from '@smui/drawer/styled';
	import List, { Item, Text, Graphic, Separator, Subheader } from '@smui/list/styled';
	import Select, { Option } from '@smui/select/styled';
	import Icon from '@smui/select/icon/styled';
	import H6 from '@smui/common/H6.svelte';
	import CountryFlagIcon from '../components/CountryFlagIcon.svelte';

	export let segment;
    export let open;

	let innerWidth;
	let isDesktopView = () => innerWidth >= CONSTANTS.ui.minimumDesktopWidth;
	let currency = getCookie('currency');

	onMount(async () => {
		open = isDesktopView();
	});

	function handleCurrencyChange() {
		if (typeof window !== 'undefined') {
			setCookie('currency', currency);
		}
	}

	//When segment, currency or $locale value changes, update navigation drawer open state
	$: segment, currency, $locale, open = isDesktopView();
	$: currency, handleCurrencyChange();

	//TODO: Hacky fix so the margin-right on the AppContent caused by the Drawer, doesn't cause the toolbar section of the TopAppBar to go out of view
	$: if (typeof window !== 'undefined' && (open || !open) && innerWidth) {
		document
			.querySelector('.mdc-top-app-bar section[role=toolbar]')
			.style.marginRight = (open && innerWidth >= CONSTANTS.ui.minimumDesktopWidth) ? '256px' : '0';
	}
</script>

<style>
	div {
		:global(.flag-icon) {
			width: 18px;
			margin-right: 10px;
			margin-top: 5px;
		}

		:global(.mdc-select) {
			display: flex;
			margin: 8px;
			padding: 0 8px 0 8px;
		}

		:global(.language-selector.nl-NL ul),
		:global(.language-selector.nl-BE ul) {
			:global(span[value="en-GB"]) {
				font-size: 13.3px;
			}
		}
	}
</style>

<svelte:window bind:innerWidth/>

<Drawer variant="{innerWidth >= CONSTANTS.ui.minimumDesktopWidth ? 'dismissible' : 'modal'}" bind:open>
	<Header>
		<Title>{CONSTANTS.app.name}</Title>
		<Subtitle>{$_('app.description')}</Subtitle>
	</Header>
	<Content><!--FIXME:Clicking items doesn't update <slot> with route, only updates URL (When <slot> is moved outside of <AppContent> it does work)-->
		<List>
		<Item href="." activated={segment === undefined}>
			<Graphic class="material-icons" aria-hidden="true">home</Graphic>
			<Text>{$_('nav.home')}</Text>
		</Item>
		<Item href="about" activated={segment === 'about'}>
			<Graphic class="material-icons" aria-hidden="true">info</Graphic>
			<Text>{$_('nav.about')}</Text>
		</Item>
		<Item rel=prefetch href="blog" activated={segment === 'blog'}>
			<Graphic class="material-icons" aria-hidden="true">message</Graphic>
			<Text>{$_('nav.blog')}</Text>
		</Item>

		<Separator />

		<Subheader component={H6}>{$_('nav.options')}</Subheader>

		<!--FIXME: Selected value doesn't get updated to new language locale value right away-->
		<div>
		<Select bind:value={$locale} label="{$_('nav.language')}" class="language-selector {$locale}">
			<Icon class="material-icons" slot="leadingIcon">language</Icon>
			{#each $locales as item}
				<Option value={item}>
					<div><CountryFlagIcon class="flag-icon" locale={item} /></div>
					{$_('languages.' + item.replace('-', '_'))}
				</Option>
			{/each}
		</Select>
		<Select bind:value={currency} label="Currency">
			<Icon class="material-icons" slot="leadingIcon">payments</Icon>
			{#each Object.values(CONSTANTS.currencies) as currency}
				<Option value={currency.code}>{currency.code} - {currency.symbol}</Option>
			{/each}
		</Select>
		</div>

		</List>
	</Content>
</Drawer>

<!--FIXME: Clicking Scrim when initial innerWidth is less than or equal to minimumDesktopWidth, won't dismiss navigation drawer-->
{#if innerWidth <= CONSTANTS.ui.minimumDesktopWidth}
	<Scrim/>
{/if}