<script lang="ts">
    import { onMount } from 'svelte';
    //import {highlight} from '$lib/index';
    import hljs from 'highlight.js';
    import { compile } from 'jaan/compiler'; 
    import Logo from './logo.svelte';
    import { fade, fly } from 'svelte/transition';

    /**
{
	"scopeName": "source.jaan",
	"patterns": [
		{
			"include": "#comments"
		},
		{
			"include": "#numbers"
		},
		{
			"include": "#operator-logical"
		},
		{
			"include": "#reservedKeywords"
		},
		{
			"include": "#conditionalKeywords"
		},
		{
			"include": "#functions"
		},
		{
			"include": "#strings-single"
		},
		{
			"include": "#strings-double"
		},
		{
			"include": "#variables"
		}
	],
	"repository": {
		"comments": {
			"patterns": [
				{
					"name": "comment.line.jaan",
					"match": "#.*$"
				}
			]
		},
		"operator-logical": {
			"name": "support.function.jaan",
			"match": "\\b(?:na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy)\\b"
		},
		"reservedKeywords": {
			"name": "keyword.reserved.jaan",
			"match": "\\b(?:dhoro)\\b"
		},
		"conditionalKeywords": {
			"name": "keyword.control.jaan",
			"match": "\\b(?:hi jaan|bye jaan|jodi|tahole|nahole|huh|bar|and|or|holo)\\b"
		},
		"functions": {
			"name": "entity.name.function.jaan",
			"match": "\\b(?:bolo)\\b"
		},
		"strings-single": {
			"name": "string.quoted.single.jaan",
			"begin": "'",
			"end": "'"
		},
		"strings-double": {
			"name": "string.quoted.double.jaan",
			"begin": "\"",
			"end": "\""
		},
		"variables": {
			"name": "variable.constant.jaan",
			"match": "\\b(?:[a-zA-Z0-9_$]+)\\b"
		},
		"numbers": {
			"name": "constant.numeric.jaan",
			"match": "\\b(?:-?\\d+(?:\\.\\d+)?)\\b"
		},
		"symbols": {
			"name": "punctuation.definition.symbol.jaan",
			"match": "\\b(?:\\+|-|\\*|/|\\^|\\(|\\)|\\{|\\}|\\[|\\]|<|>|=|,|;|:|\\.)\\b"
		}
	}
}
 */

    hljs.registerLanguage('jaan', (h) => {
        return {
            name: 'JaanLang',
            keywords: [
                'dhoro',
                'hi jaan',
                'bye jaan',
                'jodi',
                'tahole',
                'nahole',
                'huh',
                'bar',
                'and',
                'or',
                'holo',
            ],
            contains: [
                {
                    className: 'comment',
                    begin: '#',
                    end: '$',
                },
                {
                    className: 'keyword',
                    begin: '\\b(?:na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy)\\b',
                },
                {
                    className: 'keyword',
                    begin: '\\b(?:dhoro)\\b',
                },
                {
                    className: 'keyword',
                    begin: '\\b(?:hi jaan|bye jaan|jodi|tahole|nahole|huh|bar|and|or|holo)\\b',
                },
                {
                    className: 'built_in',
                    begin: '\\b(?:bolo)\\b',
                },
                {
                    className: 'string',
                    begin: "'",
                    end: "'",
                },
                {
                    className: 'string',
                    begin: '"',
                    end: '"',
                },
                {
                    className: 'variables',
                    begin: '\\b(?:[a-zA-Z0-9_$]+)\\b',
                },
                {
                    className: 'number',
                    begin: '\\b(?:-?\\d+(?:\\.\\d+)?)\\b',
                },
                {
                    className: 'symbols',
                    begin: '\\b(?:\\+|-|\\*|/|\\^|\\(|\\)|\\{|\\}|\\[|\\]|<|>|=|,|;|:|\\.)\\b',
                },
            ],
        };
    });

    /*
    $: parsedCode = `<pre><code class="jaan">${hljs.highlight(rawCode.trim(), {
        language: 'jaan'
    }).value}</code></pre>`;
    $: console.log(rawCode);
    */

    let parsedCode: string = '';
    let textarea: HTMLTextAreaElement;

    let rawCode = 
    `hi jaan
    dhoro a holo 5
    dhoro b holo 10

    a jodi b er beshi hoy tahole
        bolo "a boro"
    nahole
        bolo "b boro"
    huh
bye jaan`;

    let compiledCode: string = '';
    let output: string = '';

    let loaded = false;

    onMount(() => {
        setTimeout(() => {
            loaded = true;
        }, 600);
        parsedCode = `<pre><code class="jaan">${hljs.highlight(rawCode.trim(), {
            language: 'jaan'
        }).value}</code></pre>`;
        textarea.addEventListener('input', () => {
            rawCode = textarea.value;
            parsedCode = `<pre><code class="jaan">${hljs.highlight(rawCode.trim(), {
                language: 'jaan'
            }).value}</code></pre>`;
        });
    });

    let runState = 'Run';
    
    function runCode(){
        console.log('Running code');
        runState = 'Compiling...';

        try {
            compiledCode = compile(rawCode);
            console.log(compiledCode);
        } catch (error) {
            console.error(error);
        }
        runState = 'Run';
    }
</script>

<svelte:document on:keydown={
    (e) => {
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            console.log('Saving');
        }

        //override tab to indent
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    }
} />

{#if !loaded}
    <div class="loading" out:fade>
        <Logo height={40} width={40}/>
    </div>
{:else}
<div class="container">
    
    <h1 class="bold head" in:fly|global={{y: -10, delay: 400}}>
        <Logo height={70} width={70}/>
        <div class="name">
            <span class="pink">Jaan</span><span class="blue">Lang</span>
        </div>
        <span class="sub-title">A language for couples</span>
    </h1>

    <div class="editorWrapper" in:fly|global={{x: 10, delay: 500}}>
        <div class="editorContainer">
            <div class="title">Playground <span class="caret"></span></div>
            <div class="editor">
                <div class="line-numbers">
                    {#each rawCode.split('\n') as _, i}
                    <span class="line-number"></span>
                    {/each}
                </div>
                <textarea class="write codeArea" spellcheck="false" bind:this={textarea}>{rawCode}</textarea>
                {@html parsedCode}
            </div>
        </div>
        <div class="btn-grp" >
            <button class="run" on:click={runCode} in:fly|global={{y: 10, delay: 500}}>{runState}
                {#if runState === 'Compiling...'}
                <i class="fa-solid fa-spinner"></i>
                {:else}
                <i class="fa-solid fa-play"></i>
                {/if}
            </button>
            <button class="clear" in:fly|global={{y: 10, delay: 600}} on:click={() => {
                console.log('Clearing');
                rawCode = '# Write your code here';
                parsedCode = `<pre><code class="jaan">${hljs.highlight(rawCode.trim(), {
                    language: 'jaan'
                }).value}</code></pre>`;
            }}>Clear <i class="fa-solid fa-trash"></i></button>
            <button class="save" in:fly|global={{y: 10, delay: 700}} on:click={() => {
                console.log('Saving');
        
                //save code in .jaan file
                const blob = new Blob([rawCode], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'code.jaan';
                a.click();
                URL.revokeObjectURL(url);
                
            }}>Save <i class="fa-solid fa-floppy-disk"></i></button>
        </div>
        <div class="output" id="output" in:fly|global={{x: -10, delay: 800}}>
            JaanLang Console<br>
            Output &gt;
            <span class="outputcontent">
                {output}
            </span>
        </div>
    </div>

    <section class="pad">
        <div class="title">About JaanLang</div>
        <p>
            JaanLang is a language for couples. It is designed to be a fun and easy way to communicate with your partner. 
            It is inspired by the way couples talk to each other and the way they express their love. 
            It is a simple and easy to learn language that can be used to write small programs and scripts.
        </p>
    </section>

    <section>
        <div class="docs title">How to use</div>
        <article>
            <div class="title">Start program</div>
            <p>
                Code must start with <code>hi jaan</code> and end with <code>bye jaan</code>.
            </p>
        </article>
        <article>
            <div class="title">Variables</div>
            <p>
                To declare a variable, use <code>dhoro</code> keyword. 
                For example, <code>dhoro a holo 5</code> will declare a variable <code>a</code> with value <code>5</code>.
            </p>
        </article>
        <article>
            <div class="title">Conditional statements</div>
            <p>
                To write a conditional statement, use <code>jodi</code> and <code>tahole</code> or <code>nahole</code> keywords. 
                For example, <code>a jodi b er beshi hoy tahole</code> will check if <code>a</code> is greater than <code>b</code>.
            </p>
        </article>
    </section>

    <section>
        <div class="title">Installing Compiler</div>
        <p>
            Download <b>Node.JS</b> on your machine. Then run <code>npm i -g jaan</code>
        </p>
    </section>

    <section>
        <div class="title">Download VScode Extension</div>
        <div class="row">
            <div class="col">
                Download the VScode extension for syntax highlighting and code snippets. Click download to go to the official marketplace page. Or search on the VScode Extenstions tab.
                <a href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang" target="_blank">Download</a>
            </div>
            <img src="/ss.png" alt="Cover of VScode Extension">
        </div>
    </section>

    <footer>
        &copy; {new Date().getFullYear()} | All rights reserved ・
        <a href="https://github.com/itsfuad/JaanLang" target="_blank">Source code</a>
    </footer>
</div>
{/if}


<style lang="scss">

    :root{
        --secondary-color: #59cbff;
    }

    .pink{
        color: #ffa8c6;
    }

    .blue{
        color: #59cbff;
    }

    section{
        padding: 20px;
        margin: 20px 0;
        border-radius: 10px;
        //background: #0000009c;
        color: rgb(240, 240, 240);
        font-size: 0.9rem;
        width: 100%;
        max-width: 900px;
        text-align: justify;
        //box-shadow: 2px 2px 5px #00000029;

        &.pad{
            margin-top: 100px;
        }

        .title{
            font-size: 2rem;
            padding: unset;
            width: max-content;
            color: ghostwhite;
            //color: var(--secondary-color);
        }

        b{
            font-weight: 900;
            color: var(--secondary-color);
        }

        code{
            background: var(--secondary-color);
            padding: 0 4px;
            border-radius: 2px;
        }

        p {
            margin-top: 0;
        }
        .row{
            display: grid;
            grid-auto-flow: dense;
            gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            grid-auto-rows: minmax(100px, auto);
        }

        .col{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        img{
            border-radius: 10px;
            max-width: 100%;
            width: 400px;
        }

        article{
            margin-bottom: 20px;
            .title{
                font-size: 1.5rem;
                padding: unset;
                margin: unset;
            }
        }

        a{
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

            &:hover{
                filter: brightness(0.9);
            }
        }
    }

    a{
        color: #0e95e4;
    }

    footer{
        font-size: 0.7rem;
        color: white;
    }

    .docs{
        margin-top: 0;
    }




    .loading{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-size: 2rem;
    }

    .bold, .name {
        font-family: 'Bold';
        *{
            font-family: 'Bold';
        }
    }

    .sub-title{
        color: #ffffff !important;
        font-family: 'thin';
    }

    .outputcontent{
        user-select: text;
    }

    .head{
        margin-top: 20px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #9c27b0;
    }

    .sub-title{
        font-size: 0.8rem;
        color: var(--secondary-color);
    }

    .title{
        padding: 5px 10px 10px;
        font-size: 0.9rem;
        width: max-content;
    }

    .caret {
        background: #3ebbff;
        height: 2px;
        width: 10px;
        display: inline-block;
    }

    .btn-grp{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
        gap: 10px;
        width: 100%;
    }

    button{
        top: 2px;
        right: 2px;
        z-index: 2;
        padding: 8px 10px;
        border-radius: 5px;
        font-size: 1rem;
        //background: #27e337;
        outline: none;
        border: none;
        cursor: pointer;
        color: white;
        box-shadow: 2px 2px 5px #00000029;

        &:hover{
            filter: brightness(0.9);
        }

        &.run{
            background: #32ff44;
        }

        &.clear{
            background: #ff3737;
        }

        &.save{
            background: #3ebbff;
        }
    }

    .line-numbers{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        width: min-content;
        font-size: 1rem;
        line-height: 1.1;
        padding: 0 5px;
        margin-right: 2px;
        border-right: 1px solid grey;
        min-width: 4.5ch;
        counter-reset: codeLine;
    }

    .line-number{
        counter-increment: codeLine;
        &::before{
            content: counter(codeLine);
            color: grey;
            margin-right: 5px;
            font-family: monospace;
        }
    }

    .container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;

        .editorWrapper{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            
            max-width: min(900px, 90vw);
        }
    }

    .codeArea{
        overflow-wrap: normal!important;
        word-break: keep-all!important;
        outline: none;
        white-space: nowrap;
    }

    .editorContainer {
        
        height: 60vh;
        overflow: auto;
        flex-grow: 1;
        -moz-tab-size: 4ch;
        -o-tab-size: 4ch;
        tab-size: 4ch;
        color: #fff;
        background-color: #35315f;
        position: relative;
        border-radius: 10px;
        
        .write{
            margin: 0px;
            border: 0px;
            background: none;
            box-sizing: inherit;
            display: inherit;
            font-family: inherit;
            font-size: inherit;
            font-style: inherit;
            font-variant-ligatures: inherit;
            font-weight: inherit;
            letter-spacing: inherit;
            line-height: inherit;
            tab-size: inherit;
            text-indent: inherit;
            text-rendering: inherit;
            text-transform: inherit;
            white-space: pre-wrap;
            word-break: keep-all;
            overflow-wrap: break-word;
            position: absolute;
            top: 0px;
            right: 0;
            height: 100%;
            width: calc(100% - 55px);
            resize: none;
            color: inherit;
            caret-color: white;
            overflow: hidden;
            line-height: 1.25;
            -webkit-font-smoothing: antialiased;
            -webkit-text-fill-color: transparent;
            user-select: text;
        }

        ::selection{
            background: #ffffff2f;
            color: aqua;
        }
        
        .editor {
            position: relative;
            text-align: left;
            box-sizing: border-box;
            padding: 0px;
            overflow: hidden;
            font-family: monospace;
            font-size: 16px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
        }
    }

    .output {
        min-width: 40%;
        //width: 100%;
        padding: 20px;
        height: 60vh;
        border: 1px solid #000000;
        font-family: monospace;
        color: white;
        font-size: 0.9rem;
        background: #0000009c;
        border-radius: 10px;
    }

    :global(pre){
        margin: 0px;
        border: 0px;
        background: none;
        box-sizing: inherit;
        display: inherit;
        font-family: inherit;
        font-size: inherit;
        font-style: inherit;
        font-variant-ligatures: inherit;
        font-weight: inherit;
        letter-spacing: inherit;
        line-height: inherit;
        tab-size: inherit;
        text-indent: inherit;
        text-rendering: inherit;
        text-transform: inherit;
        white-space: pre-wrap;
        word-break: keep-all;
        overflow-wrap: break-word;
        position: relative;
        pointer-events: none;
        padding: 0 10px;
        line-height: 1.25;
        user-select: none;
    }


</style>