<script lang="ts">
    import { onMount } from 'svelte';
    //import {highlight} from '$lib/index';
    import hljs from 'highlight.js';
    import { compile } from 'jaan/compiler'; 

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

    onMount(() => {
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

<div class="container">
    
    <h1 class="bold head">
        <img src="/icon.png" alt="logo" width="50" >
        JaanLang
        <span class="sub-title">A language for couples</span>
    </h1>

    <div class="editorWrapper">
        <div class="editorContainer">
            <div class="title">Playground</div>
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
        <div class="btn-grp">
            <button class="run" on:click={runCode}>{runState} 
                {#if runState === 'Compiling...'}
                <i class="fa-solid fa-spinner"></i>
                {:else}
                <i class="fa-solid fa-play"></i>
                {/if}
            </button>
            <button class="clear" on:click={() => {
                console.log('Clearing');
                rawCode = '# Write your code here';
                parsedCode = `<pre><code class="jaan">${hljs.highlight(rawCode.trim(), {
                    language: 'jaan'
                }).value}</code></pre>`;
            }}>Clear <i class="fa-solid fa-trash"></i></button>
            <button class="save" on:click={() => {
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
        <div class="output" id="output">
            JaanLang Console<br>
            Output &gt;
            {output}
        </div>
    </div>
</div>


<style lang="scss">

    .bold {
        font-family: 'Bold';
    }

    .head{
        margin-top: 20px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .sub-title{
        font-size: 0.8rem;
        color: grey;
    }

    .title{
        padding: 5px 10px;
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

        &:hover{
            filter: brightness(1.1);
        }

        &.run{
            background: #27e337;
        }

        &.clear{
            background: #e33737;
        }

        &.save{
            background: #37a7e3;
        }
    }

    .line-numbers{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        width: min-content;
        font-size: 1rem;
        line-height: 1.1rem;
        padding: 10px 5px;
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
        background-color: #333;
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
            left: 35px;
            padding: 10px;
            height: 100%;
            width: 100%;
            resize: none;
            color: inherit;
            caret-color: white;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -webkit-text-fill-color: transparent;
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
        background: #000000e7;
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
        padding: 10px;
    }


</style>