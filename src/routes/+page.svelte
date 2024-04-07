<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import Logo from "$lib/components/logo.svelte";
    import { showToastMessage } from "@itsfuad/domtoastmessage";

    const compilerVersion = __VERSION__;

    let copied: boolean = false;
    let copyTimeout: number;
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
    <div class="version-info">
        <div class="version">v.{compilerVersion}</div>
        Free and Open Source
    </div>
</div>

<span class="sub-title center" in:fly={{ x: -10, delay: 200 }}
    >A programming language for couples</span
>
<div class="more center" in:fade={{ delay: 250 }}>
    JaanLang is a fun and simple programming language implemented in TypeScript.
    It is designed to be easy to learn and use.
</div>

<div class="button-group">
    <a
        in:fly={{ x: 10, delay: 250 }}
        class="button-link github"
        href="https://github.com/itsfuad/JaanLang"
        target="_blank"
    >
        Github <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </a>

    <a
        in:fly={{ x: -10, delay: 250 }}
        class="button-link npm"
        href="https://www.npmjs.com/package/jaan"
        target="_blank"
    >
        View on NPM <i class="fa-solid fa-arrow-up-right-from-square"></i>
    </a>
</div>

<div
in:fly={{ y: 10, delay: 300 }}
class="install">
    npm i -D @itsfuad/jaan
    <button
        on:click={() => {
            if (!navigator.clipboard) {
                //fallback
                const el = document.createElement("textarea");
                el.value = "npm i -D @itsfuad/jaan";
                el.style.position = "absolute";
                el.style.left = "-9999px";
                document.body.appendChild(el);
                el.select();
                try {
                    document.execCommand("copy");
                } catch (e) {
                    console.error("Failed to copy to clipboard", e);
                }
            } else {
                navigator.clipboard.writeText("npm i -D @itsfuad/jaan");
            }
            copied = true;
            clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => {
                copied = false;
            }, 2000);
        }}
    >
        {#if !copied}
            <i class="fa-regular fa-clone"></i>
        {:else}
            <i class="fa-solid fa-check"></i>
        {/if}
    </button>
</div>

<div class="breakout-wrapper" in:fly={{ x: 20 }}>
    <img class="breakout" src="/images/editor.png" alt="code-playground" />
</div>

<section class="max">
    <h3 class="title">All in one <i class="fa-solid fa-fire"></i></h3>
    <div class="content">
        <ul>
            <li class="featureItem">
                <i class="fa-regular fa-square-check"></i>
                Easy syntax
                <i class="fa-solid fa-book"></i>
            </li>
            <li class="featureItem">
                <i class="fa-regular fa-square-check"></i>
                Web Code playground
                <i class="fa-solid fa-code"></i>
            </li>
            <li class="featureItem">
                <i class="fa-regular fa-square-check"></i>
                Syntax highlighting
                <i class="fa-solid fa-highlighter"></i>
            </li>
            <li class="featureItem">
                <i class="fa-regular fa-square-check"></i>
                Inline error message
                <i class="fa-solid fa-triangle-exclamation"></i>
            </li>
            <li class="featureItem">
                <i class="fa-regular fa-square-check"></i>
                Fast buld time
                <i class="fa-solid fa-rocket"></i>
            </li>
        </ul>
        <div class="img border-animate mainWrapper">
            <img class="animation-border-innerContent shadow-bg" src= "/images/editor.png" alt="editor">
        </div>
        <section class="runsOn">
            <h5 class="title">Compatible with</h5>
            <ul>
                <li>
                    <i class="fa-brands fa-windows"></i>
                </li>
                <li>
                    <i class="fa-brands fa-apple"></i>
                </li>
                <li>
                    <i class="fa-brands fa-ubuntu"></i>
                </li>
                <li>
                    <i class="fa-brands fa-android"></i>
                </li>
            </ul>
        </section>
    </div>
</section>


<section in:fly|global={{ y: 10, delay: 400 }}>
    <h3 class="title">VScode Extension</h3>
    <div class="row">
        <div class="col">
            Download the VScode extension for syntax highlighting and code
            snippets. Click download to go to the official marketplace page. Or
            search on the VScode Extenstions tab.
            <a
                class="button-link"
                href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang"
                target="_blank"
            >
            Download <i class="fa-solid fa-arrow-down"></i>
            </a>
        </div>
        <img src="/images/ss.png" alt="Cover of VScode Extension" />
    </div>
</section>

<footer>
    &copy; {new Date().getFullYear()} Fuad Hasan | All rights reserved
</footer>

<style lang="scss">

    .max{
        width: 100%;
        max-width: 100%;
        .content{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
            perspective: 1000px;
        }

        .img{
            width: 100%;
            max-width: 600px;
            transform: rotateX(19deg) rotateY(337deg) rotateZ(14deg);
        }
    }

    .button-group{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    .button-link {
        padding: 10px 20px;
        border-radius: 25px;
        background: rgb(0 120 214);
        color: #ffffff;
        font-family: "thin";
        font-size: 1rem;
        text-decoration: none;

        &.npm {
            background: #cc3534;
        }

        &.github {
            background: #171717;
        }

        &:hover {
            text-decoration: underline;
        }
    }

    .install {
        padding: 10px;
        color: #ffffffd6;
        font-weight: lighter;
        font-family: monospace;
        font-size: 1rem;
        background: #171717;
        border-radius: 10px;

        button {
            cursor: pointer;
            border: none;
            outline: none;
            background: transparent;
            color: inherit;
        }
        i {
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            border: 2px solid #ffffff19;
            background: rgba(255, 255, 255, 0.068);
        }
    }

    .fa-fire {
        color: #ff7300;
    }

    .fa-windows {
        color: #0078d6;
    }

    .fa-apple {
        color: #ffffff;
    }

    .fa-ubuntu {
        color: #f96834;
    }

    .fa-android {
        color: #21ff73;
    }
    
    section {
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        ul {
            list-style: none;
            padding: 0;
            li {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
                font-size: 1rem;
                margin: 10px 0;
                .fa-solid {
                    color: #ffffff;
                }
            }
        }

        &.runsOn {
            ul {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                gap: 20px;
                li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                    margin: 10px 0;
                    font-size: 3.4rem;
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
        filter: blur(5px);
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
