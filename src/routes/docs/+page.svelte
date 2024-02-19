<script lang="ts">
    import { fly } from "svelte/transition";
    import Logo from "../logo.svelte";

</script>

<svelte:head>
    <title>JaanLang - Documentation</title>
</svelte:head>

<section in:fly|global={{ y: 10, delay: 100 }}>
    <div class="title">
        <Logo height={40} width={40} />
        About JaanLang
    </div>
    <p>
        JaanLang is a language for couples. It is designed to be a fun and easy
        way to communicate with your partner. It is inspired by the way couples
        talk to each other and the way they express their love. It is a simple
        and easy to learn language that can be used to write small programs and
        scripts.
    </p>
</section>

<section in:fly|global={{ y: 10, delay: 200 }}>
    <div class="docs title">How to use</div>
    <article>
        <div class="title">#Start program</div>
        <p>
            Code must start with <code>hi jaan</code> and end with
            <code>bye jaan</code>.
        </p>
    </article>
    <article>
        <div class="title">#Variables</div>
        <p>
            To declare a variable, use <code>dhoro</code> keyword. For example,
            <code>dhoro a holo 5</code>
            will declare a variable <code>a</code> with value <code>5</code>.
        </p>
    </article>
    <article>
        <div class="title">#Conditional statements</div>
        <p>
            To write a conditional statement, use <code>jodi</code> and
            <code>tahole</code>
            or <code>nahole</code> keywords. For example,
            <code>a jodi b er beshi hoy tahole</code>
            will check if <code>a</code> is greater than <code>b</code>.
        </p>
    </article>
</section>

<section in:fly|global={{ y: 10, delay: 300 }}>
    <div class="title">Installing Compiler</div>
    <p>
        Download <b>Node.JS</b> on your machine. Then run
        <code>npm i -g jaan</code>
    </p>
</section>

<section in:fly|global={{ y: 10, delay: 400 }}>
    <div class="title">VScode Extension</div>
    <div class="row">
        <div class="col">
            Download the VScode extension for syntax highlighting and code
            snippets. Click download to go to the official marketplace page. Or
            search on the VScode Extenstions tab.
            <a
                href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang"
                target="_blank">Download</a
            >
        </div>
        <img src="/ss.png" alt="Cover of VScode Extension" />
    </div>
</section>

<style lang="scss">
    section {
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;
        //background: #ffffff17;
        color: rgb(240, 240, 240);
        font-size: 0.9rem;
        width: 100%;
        max-width: 900px;
        text-align: justify;
        //box-shadow: 2px 2px 5px #00000029;

        .title {
            font-size: 1.5rem;
            padding: unset;
            width: 100%;
            color: ghostwhite;
            //color: var(--secondary-color);
        }

        b {
            font-weight: 900;
            color: var(--secondary-color);
        }

        code {
            background: #ffffff1f;
            padding: 0 4px;
            border-radius: 2px;
            white-space: unset;
        }

        p {
            margin-top: 0;
        }
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

        article {
            margin-bottom: 20px;
            .title {
                font-size: 1.2rem;
                color: #ffffffc2;
                padding: unset;
                margin: unset;
            }
        }

        a {
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1rem;
            background: #3ebbff;
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
    }

    .docs {
        margin-top: 0;
    }

    //on mobile ratio, make it column
    @media screen and (orientation: portrait){
        section .row{
            flex-direction: column;
            align-items: flex-start;
        }
    }
</style>
