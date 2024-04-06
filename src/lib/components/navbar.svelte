<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import { currentPage } from "$lib/store";
    import { fly } from "svelte/transition";
    import Logo from "./logo.svelte";

    onNavigate(() => {
        currentPage.set(window.location.pathname);
    });

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Playground",
            href: "/playground",
        },
        {
            name: "Learn",
            href: "/learn",
        },
    ];

</script>

<div class="navbar" in:fly={{ x: 20, delay: 200 }} >
    <Logo height={30} width={30} />
    <div class="menu">
        {#each navLinks as menu}
            <a href={menu.href} class:active={$currentPage === menu.href}>
                {menu.name}
            </a>
        {/each}
    </div>
</div>

<style lang="scss">
    .navbar {
        width: 100%;
        height: 50px;
        padding: 10px;
        background: inherit;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }

    .menu a {
        color: #ffffffc0;
        padding: 5px 10px;
        text-decoration: none;
        font-weight: 500;
        position: relative;
        border-radius: 25px;
        font-size: 0.8rem;
        background: #ffffff11;
        transition: 100ms;
    }
    
    .menu a:not(.active):hover {
        background: #ffffff1a;
    }

    .menu a.active {
        color: #ffffff;
        background: #189dda;
    }

</style>
