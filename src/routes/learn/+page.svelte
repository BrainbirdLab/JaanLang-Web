<script lang="ts">
    import { fly } from "svelte/transition";
    import TextedLogo from "$lib/components/textedLogo.svelte";
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
        overflow: hidden;
        overflow-y: scroll;
        line-height: 1.5;
        //box-shadow: 2px 2px 5px #00000029;
    }

</style>
