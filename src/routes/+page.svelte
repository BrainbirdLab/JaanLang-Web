<script lang="ts">
    import { onMount, tick } from 'svelte';
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
                    className: 'operator-logical',
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
                    className: 'function',
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
                    //start with a letter or underscore is mandatory
                    begin: '\\b(?:[a-zA-Z_$][a-zA-Z0-9_$]*)\\b'
                },
                {
                    className: 'number',
                    begin: '\\b(?:-?\\d+(?:\\.\\d+)?)\\b',
                },
                {
                    className: 'symbols',
                    begin: '\\b(?:\\+|-|\\*|/|\\^|\\(|\\)|\\{|\\}|\\[|\\]|<|>|=|,|;|:|\\.)\\b',
                },
                {
                    className: 'empty-line',
                    begin: '^$',
                }
            ],
        };
    });

    /*
    $: parsedCode = `<pre><code class="jaan">${hljs.highlight(textarea.value, {
        language: 'jaan'
    }).value}</code></pre>`;
    $: console.log(textarea.value);
    */

    let parsedCode: string = '';
    let textarea: HTMLTextAreaElement;

    $: rawCode = 
`hi jaan

    #declare a variable
    dhoro tmrCG holo 3.2
    dhoro amrCG holo 3.8


    #check if tmrCG is greater than amrCG
    amrCG jodi tmrCG er beshi hoy tahole
        bolo "I love you"
    nahole
        bolo "Breakup!!"
    huh

    #say sorry 5 times. '$' is a counter variable
    5 bar
        bolo "Sorry " + $
    huh


bye jaan`;

    let compiledCode: string = '';
    let output: string = '';

    let loaded = false;

    onMount(() => {
        setTimeout(() => {
            loaded = true;
        }, 600);
        parsedCode = `<code class="jaan">${hljs.highlight(rawCode, {
            language: 'jaan'
        }).value}</code>`;
    });

    let runState = 'Run';

    // Redirect console output to a variable
    const capturedOutput: string[] = [];
    const log = console.log;

    let errorLine = 0;

    console.log = (...args) => {
        capturedOutput.push(args.join(' '));
        //originalConsoleLog(...args); // Optionally keep logging to the dev console
    };
    
    async function parseCode() {
        await tick();
        const syntaxedCode = hljs.highlight(textarea.value, {
            language: 'jaan',
        }).value;
        //textarea.value = text;
        parsedCode = `<code class="jaan">${syntaxedCode}</code>`;
    }

    function runCode(){

        errorLine = 0;
        runState = 'Compiling...';
        capturedOutput.length = 0;
        output = "<div class='run'>Compiling...</div>";

        //log(textarea.value);

        try {
            compiledCode = compile(textarea.value);
            new Function(compiledCode)();
            //originalConsoleLog("Hi");
            output += "<div class='output'>Output >\n" + capturedOutput.join('\n') + "</div>";
        } catch (error) {
            //console.error(error);
            let msg = (error as Error).message;

            //Grab the line number from the error message
            let line = msg.match(/line (\d+)/);
            if (line) {
                errorLine = parseInt(line[1]);
            } else {
                msg = "Runtime error: " + msg;
            }

            output += "<div class='error'>" + msg + "</div>";
        }
        runState = 'Run';
    }

    let textAreaFocused = false;

    function focusEditor(evt: MouseEvent){
        const target = evt.target as HTMLElement;
        if (!target || target.closest('.topbar')){
            return;
        }
        textarea.focus();
    }
</script>

<svelte:document on:keydown={
    (e) => {
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault();
            //console.log('Saving');
        }

        //override tab to indent
        if (e.key === 'Tab' && textAreaFocused) {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            parseCode();
        }
    }
}/>

{#if !loaded}
    <div class="loading" transition:fade={{duration: 300}}>
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
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="editorContainer" on:click={focusEditor}>
            <div class="topbar">
                <div class="title">Playground <span class="caret"></span></div>
                <div class="btn-grp" >
                    <button class="run" on:click={runCode} in:fly|global={{y: 10, delay: 500}}>
                        {#if runState === 'Compiling...'}
                        <i class="fa-solid fa-spinner"></i>
                        {:else}
                        <i class="fa-solid fa-play"></i>
                        {/if}
                    </button>
                    <button class="save" in:fly|global={{y: 10, delay: 600}} on:click={() => {
                        //console.log('Saving');
                
                        //save code in .jaan file
                        const blob = new Blob([textarea.value], { type: 'text/plain' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'code.jaan';
                        a.click();
                        URL.revokeObjectURL(url);
                        
                    }}><i class="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button class="clear" in:fly|global={{y: 10, delay: 700}} on:click={() => {
                        //console.log('Clearing');
                        textarea.value = '';
                        parsedCode = `<pre><code class="jaan">${hljs.highlight(textarea.value, {
                            language: 'jaan'
                        }).value}</code></pre>`;
                    }}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <div class="parent">
                <div class="line-numbers">
                    {#each rawCode.split('\n') as _, i}
                        <span class="line-number" data-line={i+1} class:error={errorLine == i+1}></span>
                    {/each}
                </div>
                <pre class="editor">   
                    <div class="inputWrapper">{@html parsedCode}<textarea aria-hidden="true" placeholder="# Write your code here" class="textarea codeArea" spellcheck="false" bind:this={textarea} on:focus={() => {textAreaFocused = true}} on:blur={() => {textAreaFocused = false}} on:input={parseCode} bind:value={rawCode}></textarea></div>                     
                </pre>
            </div>
        </div>

        <div class="output" id="output" in:fly|global={{x: -10, delay: 800}}>
            <div class="topbar">
                JaanLang Console <button on:click={() => {output = ''}}><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="outputcontent">
                {@html output}
            </div>
        </div>
    </div>

    <section class="pad" in:fly|global={{y: 10, delay: 900}}>
        <div class="title">About JaanLang</div>
        <p>
            JaanLang is a language for couples. It is designed to be a fun and easy way to communicate with your partner. 
            It is inspired by the way couples talk to each other and the way they express their love. 
            It is a simple and easy to learn language that can be used to write small programs and scripts.
        </p>
    </section>

    <section in:fly|global={{y: 10, delay: 1000}}>
        <div class="docs title">How to use</div>
        <article>
            <div class="title">#Start program</div>
            <p>
                Code must start with <code>hi jaan</code> and end with <code>bye jaan</code>.
            </p>
        </article>
        <article>
            <div class="title">#Variables</div>
            <p>
                To declare a variable, use <code>dhoro</code> keyword. 
                For example, <code>dhoro a holo 5</code> will declare a variable <code>a</code> with value <code>5</code>.
            </p>
        </article>
        <article>
            <div class="title">#Conditional statements</div>
            <p>
                To write a conditional statement, use <code>jodi</code> and <code>tahole</code> or <code>nahole</code> keywords. 
                For example, <code>a jodi b er beshi hoy tahole</code> will check if <code>a</code> is greater than <code>b</code>.
            </p>
        </article>
    </section>

    <section in:fly|global={{y: 10, delay: 1100}}>
        <div class="title">Installing Compiler</div>
        <p>
            Download <b>Node.JS</b> on your machine. Then run <code>npm i -g jaan</code>
        </p>
    </section>

    <section in:fly|global={{y: 10, delay: 1200}}>
        <div class="title">VScode Extension</div>
        <div class="row">
            <div class="col">
                Download the VScode extension for syntax highlighting and code snippets. Click download to go to the official marketplace page. Or search on the VScode Extenstions tab.
                <a href="https://marketplace.visualstudio.com/items?itemName=JaanLang.jaanlang" target="_blank">Download</a>
            </div>
            <img src="/ss.png" alt="Cover of VScode Extension">
        </div>
    </section>

    <footer in:fly|global={{y: 10, delay: 1300}}>
        &copy; {new Date().getFullYear()} | All rights reserved ・
        <a href="https://github.com/itsfuad/JaanLang" target="_blank">Source code</a>
    </footer>
</div>
{/if}


<style lang="scss">

    :root{
        --secondary-color: #59cbff;
        --line-height: 20px;
    }

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
        background: #ffffff17;
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
            font-size: 1.5rem;
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
            background: #ffffff1f;
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
                font-size: 1.2rem;
                color: #ffffffc2;
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

    
    footer{
        font-size: 0.7rem;
        padding: 10px;
        color: white;
        a{
            color: #ffffff;
        }
    }

    .docs{
        margin-top: 0;
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
        white-space: pre-wrap;
        font-family: monospace;


        :global(*){
            font-family: monospace;
        }

        :global(.error){
            color: #ff4444;
            font-family: monospace;
        }

        :global(.run){
            color: #ffe044;
            font-family: monospace;
        }
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

    button{
        top: 2px;
        right: 2px;
        z-index: 2;
        padding: 8px 10px;
        border-radius: 8px;
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
    }

    .topbar{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 5px;
        border-bottom: 2px solid #ffffff26;
    }

    .btn-grp{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: max-content;

        button{
            all: unset;
            padding: 10px;
            cursor: pointer;

            &.run{
                color: #ffffff;
            }

            &.clear{
                color: #ff3737;
            }

            &.save{
                color: #00bcd4;
            }

            &:hover{
                filter: brightness(0.9);
            }
        }
    }

    .line-numbers{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        width: min-content;
        font-size: 1rem;
        line-height: var(--line-height);
        padding: 0 5px;
        border-right: 2px solid #ffffff26;
        min-width: 4.5ch;
        counter-reset: codeLine;
        width: 50px;
        flex-shrink: 0;
    }

    .line-number{

        &.error{
            border-right: 2px solid #ff3737;
        }

        counter-increment: codeLine;
        height: var(--line-height);
        &::before{
            content: counter(codeLine);
            color: #ffffff50;
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
        width: 80%;
        gap: 10px;

        .editorWrapper{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            flex-grow: 1;
            width: 100%;
            gap: 20px;
            
            //max-width: min(900px, 100vw);
        }
    }

    .codeArea{
        overflow-wrap: normal!important;
        word-break: keep-all!important;
        outline: none;
        white-space: nowrap;
    }

    .editorContainer {
        
        height: 25rem;
        overflow: hidden;
        flex-grow: 1;
        -moz-tab-size: 4ch;
        -o-tab-size: 4ch;
        tab-size: 4ch;
        color: #fff;
        background-color: #35315f;
        position: relative;
        border-radius: 10px;
        
        .editor, .parent {
            //min-width: 100%;
            //min-height: 55vh;
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

        .parent{
            overflow: hidden;
            overflow-y: scroll;
            min-width: 100%;
            height: calc(100% - 55px);
        }

        
        .editor{
            position: relative;
            overflow-x: scroll;
            width: 100%;
            max-width: calc(100% - 50px);
            height: max-content;
            //opacity: 0;
            z-index: 0;
            line-height: var(--line-height);
            //background: rgba(255, 255, 255, 0.07);

            .inputWrapper{
                width: 100%;
                min-width: max-content;
                position: relative;
            }

            :global(code){
                //position: absolute;
                //top: 0;
                //left: 0;
                display: inline-block;
                width: max-content;
                height: max-content;
                color: #c79a66;
                padding: 0 5px;
            }
        }
        
        .textarea{

            width: 100%;
            height: 100%;
            white-space: pre;
            padding: 0 5px;
            //overflow-x: scroll;
            //white-space: pre;
            background: transparent;
            caret-color: rgba(255, 255, 255, 0.579);
            border: none;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            font-size: 1rem;
            font-family: monospace;
            resize: none;
            
            color: rgba(255, 255, 0, 0);
            //-webkit-text-fill-color: rgba(255, 0, 0, 0);
            -webkit-font-smoothing: antialiased;
            line-height: var(--line-height);
            user-select: text;

            &:blank{
                color: #ffffff50;
            }
        }

        ::selection{
            background: #ffffff2f;
            color: rgba(255, 255, 255, 0);
        }
    }

    .output {
        min-width: 40%;
        //width: 100%;
        padding: 20px;
        height: 25rem;
        flex-grow: 1;
        border: 1px solid #000000;
        font-family: monospace;
        color: white;
        font-size: 0.9rem;
        background: #0000009c;
        border-radius: 10px;
        position: relative;

        .topbar{
            padding: 0;
            margin: 0;
            border: none;
        }

        button{
            background: none;
            border: none;
            box-shadow: none;
            padding: 0 10px;
            font-weight: 100;

            &:hover{
                filter: brightness(0.9);
            }

            i{
                color: #ff4444;
            }
        }
    }
</style>