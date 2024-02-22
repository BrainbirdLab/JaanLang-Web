<script lang="ts">
    import { fly } from "svelte/transition";
    import Logo from "../../lib/components/logo.svelte";
    import { marked } from "marked";
    import { onMount } from "svelte";
    import hljs from "$lib/lib";
    import md from "$lib/docs.md?raw";

    onMount(() => {
        //console.log(md);
        //const html = marked(md);
        hljs.highlightAll();
    });

</script>

<svelte:head>
    <title>JaanLang - Documentation</title>
</svelte:head>

<section in:fly|global={{ y: 10, delay: 100 }}>
    <h1 class="title">
        JaanLang
        <Logo height={40} width={40} />
    </h1>
</section>

<section in:fly|global={{ y: 10, delay: 200 }}>
    {@html marked(md)}
</section>

<style lang="scss">
    section {
        padding: 20px;
        border-radius: 10px;
        //background: #ffffff17;
        color: rgb(240, 240, 240);
        font-size: 0.9rem;
        width: 100%;
        max-width: 900px;
        line-height: 1.5;
        //box-shadow: 2px 2px 5px #00000029;

        .title {
            padding: unset;
            width: 100%;
            color: ghostwhite;
            //color: var(--secondary-color);
        }
    }

</style>
