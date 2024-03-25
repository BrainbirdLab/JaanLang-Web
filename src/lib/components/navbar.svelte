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
    }

    .menu a {
        color: #ffffffeb;
        padding: 0 10px;
        text-decoration: none;
        font-weight: 500;
        position: relative;
    }

    .menu a::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -4px;
        left: 0;
        background: linear-gradient(90deg, transparent, var(--secondary-color), transparent);
        background-size: 200%;
        animation: moveLeftRight 8s ease-in-out infinite alternate;
        transform-origin: center;
        transition: 300ms;
        transform: scaleX(0);
    }

    @keyframes moveLeftRight{
        0%{
            background-position: 0%;
        }
        100%{
            background-position: 100%;
        }
    }

    .menu a:not(.active):hover {
        color: rgba(255, 255, 255, 0.744);
    }

    .menu a.active::after {
        transform: scaleX(1);
    }
</style>
