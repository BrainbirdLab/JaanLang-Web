<script lang="ts">
    import "$lib/editor.scss";
    import { fade, fly } from "svelte/transition";
    import Logo from "$lib/components/logo.svelte";
    import EditorSnippet from "$lib/components/editorSnippet.svelte";

    const compilerVersion = __VERSION__;

    let copied: boolean = false;
    let copyTimeout: number;
</script>

<svelte:head>
    <title>JaanLang</title>
</svelte:head>

<div class="container">
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
    
    <span class="big-title center" in:fly={{ x: -10, delay: 200 }}
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
    
    <section class="runsOn">
        <ul>
            <li in:fly={{ y: 10, delay: 350 }}>
                <i class="fab fa-windows"></i>
            </li>
            <li in:fly={{ y: 10, delay: 400 }}>
                <i class="fab fa-apple"></i>
            </li>
            <li in:fly={{ y: 10, delay: 450 }}>
                <i class="fab fa-ubuntu"></i>
            </li>
            <li in:fly={{ y: 10, delay: 500 }}>
                <i class="fab fa-android"></i>
            </li>
    
        </ul>
    </section>
    
    <div class="breakout-wrapper" in:fly={{ x: 20, delay: 200 }}>
        <img class="breakout" src="/images/editor.png" alt="code-playground" />
    </div>

    <article in:fade>
        <section class="feature">
            <div class="row inner-content">
                <div class="item-info">
                    <div class="title">
                        Experience the Comprehensive Tools of our Online Playground
                    </div>
                    <div class="text">
                        Our playground offers an immersive environment for compiling, executing, and preserving your code effortlessly.
                    </div>
                </div>
                <EditorSnippet showButtons={true} lines={
                    [
                        ['purple.w5', 'purple.w10'],
                        ['tab.w5', 'yellow.w5', 'purple.w5'],
                        ['tab.w10', 'cyan.w10', 'green.w20'],
                        ['tab.w5', 'purple.w5'],
                        ['purple.w5', 'purple.w10']
                    ]
                }/>
            </div>
        </section>
        <section class="rev feature">
            <div class="row inner-content">
                <EditorSnippet code={{text: 'bolo "babu khaiso?"', line: 0}}/>
            <div class="item-info">
                <div class="title">
                    Enjoy Enhanced Syntax Highlighting Anywhere, Anytime
                </div>
                <div class="text">
                    Benefit from real-time syntax highlighting, elevating your coding experience and enhancing code structure visualization.
                </div>
            </div>
            </div>
        </section>
        <section class="feature">
            <div class="row inner-content">
                <div class="item-info">
                    <div class="title">
                        Inline error messages and suggestions
                    </div>
                    <div class="text">
                        Get instant feedback on your code with inline error messages and suggestions. Smart compiler knows what you did wrong and how to fix it.
                    </div>
                </div>
                <EditorSnippet error={3}/>
            </div>
        </section>
        <section class="feature">
            <div class="inner-content col">
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
            </div>
        </section>
    </article>
    
    <footer>
        &copy; {new Date().getFullYear()} Fuad Hasan | All rights reserved
    </footer>    
</div>

<style lang="scss">

    .container{
        //padding: 10px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    .item-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        font-size: 0.9rem;
        font-family: "thin";
        .title{
            font-size: 1.6rem;
            font-weight: bold;
            //font-family: "bold";
        }
        .text{
            font-size: 0.9rem;
        }
    }

    article{
        width: 100% !important;
        max-width: initial;
        background: #E91E63;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        perspective: 1000px;
    }

    .feature{
        display: flex;
        align-items: center !important;
        justify-content: center !important;
        list-style: none;
        list-style: none;
        border-radius: 0;
        padding: 50px 10px;
        min-height: 350px;
        max-width: initial;
        width: 100%;

        .inner-content{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            max-width: 900px;
        }

        &:nth-child(1){
            background: linear-gradient(-65deg, #f4b942, #f4511e);
        }

        &:nth-child(2){
            background: linear-gradient(65deg, #21dacd, #3545f4);
            //color: black;
        }

        &:nth-child(3){
            background: linear-gradient(75deg, #f44242, #4257f4);
        }

        &:nth-child(4){
            background: var(--content-color);
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
        margin-bottom: 45px;
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
        background: #1a1a1a;
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
        padding: 10px;
    }


    .runsOn {
        padding: 42px 0;
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
        padding: 10px 0 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: var(--content-color);
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

    .big-title {
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
        padding: 20px 0;
    }

    .center {
        text-align: center !important;
    }

    section {
        border-radius: 10px;
        //background: #ffffff17;
        color: rgb(240, 240, 240);
        font-size: 0.9rem;
        width: 100%;
        max-width: 900px;
        font-family: "thin";

        .row{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .col {
            display: flex;
            flex-direction: column !important;
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
        .row {
            flex-direction: column !important;
            align-items: center !important;

            img{
                width: auto;
                flex-grow: 1;
            }
        }
    }
</style>
