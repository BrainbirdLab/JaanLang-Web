<script lang="ts">
    import "$lib/globasl.scss";
    import "$lib/fontawesome/css/all.min.css";
    import "highlight.js/styles/atom-one-dark.min.css";
    import { showToastMessage } from "domtoastmessage";
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";
    import Logo from "./logo.svelte";
    import Navbar from "./navbar.svelte";
    import { currentPage } from "$lib/store";

    async function detectSWUpdate(){
        const registration = await navigator.serviceWorker.ready;

        registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                    console.log("New update available");
                    showToastMessage("App updated");
                }
            });
        });
    }

    let loaded = false;

    onMount(() => {

        currentPage.set(window.location.pathname);

        setTimeout(() => {
            loaded = true;
        }, 600);
        detectSWUpdate();
    });

</script>

<svelte:window on:contextmenu|preventDefault />

{#if !loaded}
<div class="loading" transition:fade={{duration: 300}}>
    <Logo height={40} width={40}/>
</div>
{:else}
<div class="content">
    
    <Navbar />

    <div class="main">
        <div class="container">
            <slot />
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    .loading{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;

        height: 100vh;
        width: 100%;
        background: ghostwhite;
        color: #282c34;
        font-size: 1rem;
    }


    .content{
        width: 100%;
        height: 100vh;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        .main{
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;

        }
    }
    
    .container{
        display: flex;
        flex-direction: column;
        overflow: scroll;
        justify-content: flex-start;
        align-items: center;
        height: 100%;
        width: 95%;
        gap: 10px;
        padding: 10px;
    }

    @media screen and (orientation: landscape) {
        .container{
            width: 70%;
        }
    }
</style>