<script lang="ts">
    import { onDestroy, onMount, tick } from "svelte";
    //import {highlight} from '$lib/index';
    import hljs from "$lib/lib";
    import { compile } from "jaan/compiler";
    import Logo from "./logo.svelte";
    import { fly, slide } from "svelte/transition";
    import { showToastMessage } from "domtoastmessage";

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

    /*
    $: parsedCode = `<pre><code class="jaan">${hljs.highlight(textarea.value, {
        language: 'jaan'
    }).value}</code></pre>`;
    $: console.log(textarea.value);
    */

    let parsedCode: string = "";
    let textarea: HTMLTextAreaElement;

    $: rawCode = `hi jaan

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

    let compiledCode: string = "";
    let output: string = "";

    onMount(() => {

        lineNumbers.onscroll = syncScroll;
        editor.onscroll = syncScroll;

        parsedCode = `<code class="jaan">${
            hljs.highlight(rawCode, {
                language: "jaan",
            }).value
        }</code>`;
    });

    let runState = "Run";

    // Redirect console output to a variable
    const capturedOutput: string[] = [];
    const log = console.log;

    let errorLine = 0;

    console.log = (...args) => {
        capturedOutput.push(args.join(" "));
        //originalConsoleLog(...args); // Optionally keep logging to the dev console
    };

    async function parseCode() {
        await tick();
        const syntaxedCode = hljs.highlight(textarea.value, {
            language: "jaan",
        }).value;
        //textarea.value = text;
        parsedCode = `<code class="jaan">${syntaxedCode}</code>`;
    }

    let outputTerminal: HTMLDivElement;

    function runCode() {

        
        errorLine = 0;
        runState = "Compiling...";
        capturedOutput.length = 0;
        output = "<div class='run'>Compiling...</div>";
        //await tick();
        //log(textarea.value);
        //outputTerminal.scrollIntoView({ behavior: "smooth" });

        try {
            compiledCode = compile(textarea.value, false);
            new Function(compiledCode)();
            //originalConsoleLog("Hi");
            output +=
                "Output &gt;<div class='output'>" +
                capturedOutput.join("\n") +
                "</div>";
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
        runState = "Run";
    }

    let textAreaFocused = false;

    function focusEditor(evt: MouseEvent) {
        const target = evt.target as HTMLElement;
        if (!target || target.closest(".topbar")) {
            return;
        }
        textarea.focus();
    }

    let currentLine: number = 0;

    function getCurrentLineNumber(event: Event) {
        requestAnimationFrame(() => {
            const target = event.target as HTMLTextAreaElement;
            const cursorPosition = target.selectionStart;
            const textBeforeCursor = target.value.substring(0, cursorPosition);
            const lineNumber = textBeforeCursor.split('\n').length;
            //log(`Cursor at line ${lineNumber}`);
            currentLine = lineNumber;
        });
    }

    let editor: HTMLPreElement;
    let lineNumbers: HTMLDivElement;

    let editorScrollTop = 0;

    $: {
        if (editor) {
            editor.scrollTop = editorScrollTop;
        }

        if (lineNumbers) {
            lineNumbers.scrollTop = editorScrollTop;
        }
    }

    function syncScroll(evt: Event){
        const target = evt.target as HTMLElement;
        editorScrollTop = target.scrollTop;
    }

    onDestroy(() => {
        lineNumbers.onscroll = null;
        editor.onscroll = null;
    });

</script>

<svelte:document
    on:keydown={(e) => {

        if (e.key === "s" && e.ctrlKey) {
            e.preventDefault();
            //console.log('Saving');
        }

        //run code on ctrl+enter
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            runCode();
        }

        //clear output on escape
        if (e.key === "Escape") {
            output = "";
        }

        //clear code on ctrl+backspace
        if (e.key === "Backspace" && e.ctrlKey) {
            e.preventDefault();
            textarea.value = "";
            parsedCode = `<pre><code class="jaan">${
                hljs.highlight(textarea.value, {
                    language: "jaan",
                }).value
            }</code></pre>`;
        }

        //override tab to indent
        if (e.key === "Tab" && textAreaFocused) {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value =
                textarea.value.substring(0, start) +
                "\t" +
                textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            parseCode();
        }
    }}
/>

<svelte:head>
    <title>JaanLang - Playground</title>
</svelte:head>

<h1 class="bold head" in:fly|global={{ y: -10, delay: 100 }}>
    <Logo height={40} width={40} />
    <div class="name">
        <span class="pink">Jaan</span><span class="blue">Lang</span>
    </div>
    <span class="sub-title">A language for couples</span>
</h1>

<div class="editorWrapper" in:fly|global={{ x: 10, delay: 200 }}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="editorContainer" on:click={focusEditor}>
        <div class="topbar">
            <div class="title">Playground <span class="caret"></span></div>
            <div class="btn-grp">
                <button
                    title="Ctrl+Enter"
                    class="run"
                    on:click={runCode}
                >
                    {#if runState === "Compiling..."}
                        <i class="fa-solid fa-spinner"></i>
                    {:else}
                        <i class="fa-solid fa-play"></i>
                    {/if}
                </button>
                <button class="copy" title="Copy source code" on:click={() => {
                    navigator.clipboard.writeText(textarea.value);
                    showToastMessage("Source code copied to clipboard");
                }}>
                    <i class="fa-regular fa-copy"></i>
                </button>
                <button
                    title="Ctrl+s"
                    class="save"
                    on:click={() => {
                        //console.log('Saving');

                        //save code in .jaan file
                        const blob = new Blob([textarea.value], {
                            type: "text/plain",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "code.jaan";
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    ><i class="fa-solid fa-floppy-disk"></i>
                </button>
                <button
                    title="Ctrl+Backspace to clear"
                    class="clear"
                    on:click={() => {
                        //console.log('Clearing');
                        textarea.value = "";
                        rawCode = "";
                        parsedCode = `<pre><code class="jaan">${
                            hljs.highlight(textarea.value, {
                                language: "jaan",
                            }).value
                        }</code></pre>`;
                    }}><i class="fa-solid fa-trash"></i></button
                >
            </div>
        </div>
        <div class="parent">
            <div class="line-numbers" bind:this={lineNumbers}>
                <div class="line-content">
                    {#each rawCode.split("\n") as _, i}
                        <span
                            class="line-number"
                            data-line={i + 1}
                            class:error={errorLine == i + 1}
                            class:currentLine={currentLine == i + 1}
                        ></span>
                    {/each}
                </div>
            </div>
            <pre class="editor" bind:this={editor}><div class="inputWrapper">{@html parsedCode}<textarea
                        aria-hidden="true"
                        placeholder="# Write your code here"
                        class="textarea codeArea"
                        spellcheck="false"
                        bind:this={textarea}
                        bind:value={rawCode}
                        on:keydown={getCurrentLineNumber}
                        on:mousedown={getCurrentLineNumber}
                        on:focus={() => {
                            textAreaFocused = true;
                        }}
                        on:blur={() => {
                            textAreaFocused = false;
                        }}
                        on:input={parseCode}
                    ></textarea></div>
            </pre>
        </div>
    </div>

    {#if output}
    <div class="output" id="output" in:fly={{y: 50, duration: 100}} out:slide={{duration: 100}}>
        <div class="topbar">
            <div class="title">
                Console <span class="caret"></span>
            </div>
            <div class="btn-grp">
                <button class="copy" title="Copy output" on:click={() => {
                    navigator.clipboard.writeText(output);
                    showToastMessage("Output copied to clipboard");
                }}>
                    <i class="fa-regular fa-copy"></i>
                </button>
                <button
                    title="Esc to clear"
                    class="clear"
                    on:click={() => {
                        output = "";
                    }}><i class="fa-solid fa-trash"></i></button
                >
            </div>
        </div>
        <div class="outputcontent" bind:this={outputTerminal}>
            <div class="container">
                {@html output}
            </div>
        </div>
    </div>
    {/if}
</div>

<style lang="scss">

    .pink {
        color: #ffa8c6;
    }

    .blue {
        color: #59cbff;
    }

    .bold,
    .name {
        position: inherit;
        font-family: "Bold";
        * {
            font-family: "Bold";
        }
    }

    .sub-title {
        color: #ffffff !important;
        font-family: "thin";
    }

    .head {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #9c27b0;
        font-size: 1.2rem;
        position: relative;
    }

    .sub-title {
        font-size: 0.7rem;
        color: var(--secondary-color);
    }

    .title {
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

    button {
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

        &:hover {
            filter: brightness(0.9);
        }
    }

    .topbar {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 5px;
        border-bottom: 2px solid #ffffff26;
    }

    .btn-grp {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: max-content;

    }
    button {
        all: unset;
        padding: 10px;
        cursor: pointer;

        &.run {
            color: #ffffff;
        }

        &.clear {
            color: #ff3737;
        }

        &.save {
            color: #00bcd4;
        }

        &.copy {
            color: #ffffff99 !important;
        }

        &:hover {
            filter: brightness(0.9);
        }
    }

    .line-numbers {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        width: min-content;
        overflow-y: scroll;
        height: 100%;
        font-size: 1rem;
        line-height: var(--line-height);
        padding: 0 5px;
        border-right: 2px solid #ffffff26;
        min-width: 4.5ch;
        counter-reset: codeLine;
        width: 50px;
        flex-shrink: 0;

        .line-content{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
        }
    }

    .line-number {

        &.error {
            border-right: 2px solid #ff3737;
        }

        
        counter-increment: codeLine;
        height: var(--line-height);
        color: #ffffff50;

        &.currentLine {
            color: #ffffffba;
        }

        &::before {
            content: counter(codeLine);
            margin-right: 5px;
            font-family: monospace;
        }
    }

    .editorWrapper {
        display: flex;
        flex-direction: column;
        //flex-wrap: wrap;
        flex-grow: 1;
        width: 100%;
        border-radius: 10px;
        overflow: scroll;
        //background: #35315f;
        border: 2px solid #ffffff26;
        position: relative;
        //max-width: min(900px, 100vw);
    }
    .codeArea {
        overflow-wrap: normal !important;
        word-break: keep-all !important;
        outline: none;
        white-space: nowrap;
    }

    .editorContainer {
        height: 100%;
        width: 100%;
        overflow: hidden;
        flex-grow: 1;
        -moz-tab-size: 2ch;
        -o-tab-size: 2ch;
        tab-size: 2ch;
        color: #fff;
        position: relative;

        .editor,
        .parent {
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

        .parent {
            overflow: hidden;
            overflow-y: scroll;
            min-width: 100%;
            height: calc(100% - 45px);
        }

        .editor {
            position: relative;
            cursor: text;
            overflow: scroll;
            width: 100%;
            max-width: calc(100% - 50px);
            height: 100%;
            z-index: 0;
            margin: 0;
            line-height: var(--line-height);

            .inputWrapper {
                width: 100%;
                min-width: max-content;
                position: relative;
            }
        }

        .textarea {
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

            &:blank {
                color: #ffffff50;
            }
        }

        ::selection {
            background: #ffffff2f;
            color: rgba(255, 255, 255, 0);
        }
    }

    #output {
        //width: 100%;
        padding: 0 10px 5px;
        height: 100%;
        width: 100%;
        overflow: hidden;
        flex-grow: 1;
        //border: 1px solid #000000;
        font-family: monospace;
        color: white;
        font-size: 0.9rem;
        background: #2b284e;
        //position: absolute;
        top: 50%;

        user-select: text;

        .topbar {
            padding: 0;
            margin: 0;
        }

        .outputcontent {
            //user-select: text;
            white-space: pre;
            overflow: hidden;
            height: calc(100% - 50px);

            font-family: monospace;

            .container{
                overflow: scroll;
                height: 100%;
            }
        }
    }
</style>
