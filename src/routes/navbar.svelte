<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import { currentPage } from "$lib/store";
    import { fly } from "svelte/transition";

    onNavigate(() => {
        currentPage.set(window.location.pathname);
    });

    const navLinks = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Docs",
            href: "/docs",
        },
    ];

    console.log($currentPage);
</script>

<div class="navbar" in:fly={{ x: 20, delay: 200 }}>
    <div class="menu">
        {#each navLinks as menu}
            <a href={menu.href} class:active={$currentPage === menu.href}>
                {menu.name}
            </a>
        {/each}
        <a href="https://github.com/itsfuad/JaanLang" target="_blank"
            >Source code</a
        >
    </div>
</div>

<style lang="scss">
    .navbar {
        width: 100%;
        padding: 20px;
        background: inherit;
        z-index: 2;
        display: flex;
        justify-content: flex-end;
    }

    .menu {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
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
        background: var(--secondary-color);
        transform-origin: center;
        transition: 300ms;
        transform: scaleX(0);
    }

    .menu a:not(.active):hover {
        color: rgba(255, 255, 255, 0.744);
    }

    .menu a.active::after {
        transform: scaleX(1);
    }
</style>
