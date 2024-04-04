<script lang="ts">
    import { fade, fly } from "svelte/transition";
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
    <a
        class="version-info"
        href="https://github.com/itsfuad/JaanLang"
        target="_blank"
    >
        <div class="version">v.{compilerVersion}</div>
        Free and Open Source
    </a>
</div>

<span class="sub-title center" in:fly={{ x: -10, delay: 200 }}
    >A programming language for couples</span
>
<div class="more center" in:fade={{ delay: 250 }}>
    JaanLang is a fun and simple programming language implemented in TypeScript.
    It is designed to be easy to learn and use.
</div>

<a
    in:fly={{ y: 10, delay: 300 }}
    href="https://www.npmjs.com/package/jaan"
    target="_blank"
    class="button button-border-animate"
>
    <div class="animation-border-innerContent padding shadow-bg">
        Install <i class="fa-solid fa-arrow-down"></i>
    </div>
</a>

<div class="breakout-wrapper" in:fly={{x: 20}}>
    <img class="breakout" src="/images/editor.png" alt="code-playground" />
</div>

<section class="feature">
    <ul>
        <h3 class="title">Features <i class="fa-solid fa-fire"></i></h3>
        <li class="featureItem"><i class="fa-solid fa-book"></i> Easy syntax</li>
        <li class="featureItem"><i class="fa-solid fa-code"></i> Web Code playground</li>
        <li class="featureItem"><i class="fa-solid fa-highlighter"></i> Syntax highlighting</li>
        <li class="featureItem"><i class="fa-solid fa-triangle-exclamation"></i> Inline error message</li>
        <li class="featureItem"><i class="fa-solid fa-rocket"></i> Fast buld time</li>
    </ul>
</section>

<section in:fly|global={{ y: 10, delay: 400 }}>
    <h3 class="title">VScode Extension</h3>
    <div class="row">
        <div class="col">
            Download the VScode extension for syntax highlighting and code
            snippets. Click download to go to the official marketplace page. Or
            search on the VScode Extenstions tab.
            <a
                class="button button-border-animate"
                href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang"
                target="_blank"
            >
                <div class="padding animation-border-innerContent shadow-bg">
                    Download
                </div>
            </a>
        </div>
        <img src="/images/ss.png" alt="Cover of VScode Extension" />
    </div>
</section>

<footer>
    &copy; {new Date().getFullYear()} Fuad Hasan | All rights reserved
</footer>

<style lang="scss">

    .fa-fire{
        color: #ff7300;
    }

    .feature{
        //tree like style
        ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            .featureItem {
                font-size: 1rem;
                font-family: "thin";
                //color: #ffffffa1;
                padding: 10px 0;
                border-bottom: 1px solid #ffffff17;
                i{
                    &.fa-book{
                        color: #fe4d4d;
                    }
                    &.fa-code{
                        color: #79a1ff;
                    }
                    &.fa-highlighter{
                        color: #66ff00;
                    }
                    &.fa-triangle-exclamation{
                        color: #ff7300;
                    }
                    &.fa-rocket{
                        color: #fffc5a;
                    }
                }
            }
        }
    }

    .breakout-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        max-width: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: -1;
        perspective: 1000px;
    }

    .breakout {
        border-radius: 10px;
        //max-width: 100%;
        //width: 400px;
        width: 100%;
        //rotate 3d
        position: absolute;
        top: 50%;
        left: 0;
        z-index: -1;
        //3d perspective rotate
        filter: blur(2px);
        transform: translateY(-50%) rotateY(50deg) rotateX(30deg);
        transition: transform 0.5s;
    }

    footer {
        font-size: 0.7rem;
    }

    .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        * {
            font-family: "Bold";
        }
    }

    .version-info {
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
        font-weight: normal;
        gap: 5px;
        background: rgba(91, 251, 91, 0.156);
        color: rgb(170, 255, 170);
        .version {
            background: rgba(0, 0, 0, 0.997);
            height: 100%;
            padding: 5px 5px;
            color: ghostwhite;
            font-family: inherit;
            border-top-left-radius: inherit;
            border-bottom-left-radius: inherit;
        }
    }

    .sub-title {
        color: #ffffff !important;
        font-family: "thin";
        line-height: 1;
        max-width: min(800px, 98vw);
        font-size: min(5rem, 15vw) !important;
        text-align: center;
    }

    .more {
        font-size: min(4.5vw, 1rem);
        max-width: 600px;
        color: #ffffffa1;
        text-align: center;
        padding: 10px 0;
    }

    .sub-title {
        font-size: 0.7rem;
        color: var(--secondary-color);
    }

    .center {
        text-align: center !important;
    }

    section {
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

    //on mobile ratio, make it column
    @media screen and (orientation: portrait) {
        section .row {
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
