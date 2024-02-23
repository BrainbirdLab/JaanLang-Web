<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import TextedLogo from "$lib/components/textedLogo.svelte";
    import Logo from "$lib/components/logo.svelte";

    const compilerVersion = __VERSION__;
</script>


<svelte:head>
    <title>JaanLang</title>
</svelte:head>

<div class="center flex column pad-top" in:fly|global={{ y: -10, delay: 100 }}>
    <div class="flex column center">
        <Logo />
        <div class="name">
            <span class="pink">Jaan</span><span class="blue">Lang</span>
        </div>
    </div>
    <div class="info">
        <div class="version">v.{compilerVersion}</div>
        Free and Open Source
    </div>
</div>


<span class="sub-title center" in:fly={{x: -10, delay: 200}}>A programming language for couples</span>
<div class="more center" in:fade={{delay: 250}}>
    JaanLang is a fun and simple programming language implemented in TypeScript. It is designed to be easy to learn and use.
</div>

<a in:fly={{y: 10, delay: 300}} href="https://www.npmjs.com/package/jaan" target="_blank" class="button shadow-bg">Install compiler <i class="fa-solid fa-chevron-right"></i> </a>

<section in:fly|global={{ y: 10, delay: 400 }}>
    <h2 class="title">VScode Extension</h2>
    <div class="row">
        <div class="col">
            Download the VScode extension for syntax highlighting and code
            snippets. Click download to go to the official marketplace page. Or
            search on the VScode Extenstions tab.
            <a  class="button shaodw-bg"
                href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang"
                target="_blank">Download</a
            >
        </div>
        <img class="shadow-bg" src="/ss.png" alt="Cover of VScode Extension" />
    </div>
</section>

<footer>
    &copy; {new Date().getFullYear()} Fuad Hasan | All rights reserved
</footer>


<style lang="scss">

    footer{
        font-size: 0.7rem;
    }

    .name{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        * {
            font-family: "Bold";
        }
    }

    .info{
        font-size: 0.7rem;
        font-family: "thin";
        color: #ffffff;
        padding: 0 5px 0 0;
        border-radius: 5px;
        width: max-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5px;
        background: rgba(91, 251, 91, 0.156);
        color: rgb(170, 255, 170);
    }
    
    .version {
        background: rgba(0, 0, 0, 0.997);
        height: 100%;
        padding: 5px 5px;
        color: ghostwhite;
        font-family: inherit;
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
    }
    
    .sub-title {
        color: #ffffff !important;
        font-family: "thin";
        line-height: 1;
        max-width: min(800px, 98vw);
        font-size: min(5rem, 15vw) !important;
        text-align: center;
    }

    .more{
        font-size: min(4.5vw, 1.1rem);
        max-width: 600px;
        color: #ababab;
        text-align: center;
        padding: 10px 0;
    }

    .sub-title {
        font-size: 0.7rem;
        color: var(--secondary-color);
    }

    .center{
        text-align: center !important;
    }

    section{
        padding: 20px;
        border-radius: 10px;
        //background: #ffffff17;
        color: rgb(240, 240, 240);
        font-size: 0.9rem;
        width: 100%;
        max-width: 900px;
        font-family: "thin";

        .row {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .col {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        img {
            border-radius: 10px;
            max-width: 100%;
            width: 400px;
        }

    }
    
    .button {
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 1rem;
        background: linear-gradient(45deg, #2bbdff, #ff689b);
        background-size: 500% 500%;
        animation: rotateBgDegree 15s ease infinite;
        outline: none;
        border: none;
        cursor: pointer;
        color: white;
        box-shadow: 2px 2px 5px #00000029;
        text-decoration: none;
        display: inline-block;
        margin-top: 10px;

        &:hover {
            filter: brightness(0.9);
        }
    }

    @keyframes rotateBgDegree {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    //on mobile ratio, make it column
    @media screen and (orientation: portrait){
        section .row{
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
