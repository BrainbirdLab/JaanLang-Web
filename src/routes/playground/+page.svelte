<script lang="ts">
    import "$lib/editor.scss";
    import { compile } from "jaan/compiler";
    import { showToastMessage } from "@itsfuad/domtoastmessage";

    import { onMount, tick } from "svelte";
    //import {highlight} from '$lib/index';
    import hljs from "$lib/lib";
    import { fly, slide } from "svelte/transition";

    import exampleCode from "./source.jaan?raw";

    let parsedCode: string = $state("");
    let textarea: HTMLTextAreaElement;

    let rawCode = $state(exampleCode);

    //$: console.log("Example code", rawCode);

    let output: string = $state("");
    let compileState: string = $state("");

    onMount(() => {
        const syntaxedCode = hljs.highlight(textarea.value, {
            language: "jaan",
        }).value;
        //textarea.value = text;
        parsedCode = `<code class="jaan">${syntaxedCode}</code>`;
    });

    let runState = $state("Run");

    // Redirect console output to a variable
    let capturedOutput: string[] = [];

    let errorLine = $state(0);

    let runTimeOut: number;

    async function parseCode() {

        if (textarea.value === "") {
            parsedCode = "";
            errorLine = 0;
            return;
        }

        await tick();
        const syntaxedCode = hljs.highlight(textarea.value, {
            language: "jaan",
        }).value;
        //textarea.value = text;
        parsedCode = `<code class="jaan">${syntaxedCode}</code>`;

        clearTimeout(runTimeOut);

        runTimeOut = setTimeout(() => {
            runCode(false);
        }, 1000);
    }

    let scrollableEditorParent: HTMLDivElement;
    let outputTerminal: HTMLDivElement = $state() as HTMLDivElement;

    let highlightedLineError: string = $state("");

    let showTerminal = $state(false);

    let errorMessage: string = $state("");

    let worker: Worker;

    async function runCode(showOutput: boolean = true) {

        errorLine = 0;
        runState = "Compiling...";
        capturedOutput.length = 0;
        capturedOutput = [];
        
        
        if (showOutput){
            if (worker) {
                worker.terminate();
            }
            output = "";
            errorMessage = "";
            compileState = "";
            showOutput ? compileState = "<div class='compiling'>Compiling...</div>" : null;
        }

        try {
            //new instance of the compile function
            //clone the function to avoid memory leaks
            //log("text area value", textarea.value);
            await tick();
            const compiledCode = compile(textarea.value, false);

            if (showOutput){
                //log(compiledCode);
                compileState += "<div class='compiled'>Running...</div>";
                //send the compiled code to the worker
                worker = new Worker(new URL("./codeRunner.ts", import.meta.url));
                worker.postMessage({code: compiledCode, showOutput: showOutput});
    
                worker.onmessage = async (e) => {
                    //output
                    if (e.data.type === "log"){
                        //log(e.data.data);
                        output += "<div class='output'>" + e.data.data + "</div>";
                        await tick();
                        outputTerminal.scrollTop = outputTerminal.scrollHeight;
                    } else if (e.data.type === "finish"){
                        //log("Finished running code");
                        output += "<div class='finished'>\n--- Done ---</div>";
                        await tick();
                        outputTerminal.scrollTop = outputTerminal.scrollHeight;
                    } else if (e.data.type === "error"){
                        //log("Error running code", e.data.data);
                        errorMessage = e.data.data;
                        compileState += "<div class='error'>" + e.data.data + "</div>";
                        await tick();
                        outputTerminal.scrollTop = outputTerminal.scrollHeight;
                    }
                };
            }
        } catch (error) {
            //console.error(error);
            let msg = (error as Error).message as string;

            errorMessage = msg?.split("\n")[0].split(":")[1].trim() || "";

            //Grab the line number from the error message
            let line = msg.match(/line (\d+)/);
            if (line) {
                errorLine = parseInt(line[1]);
                highlightedLineError = msg.split("\n").filter((line) => line.includes("~"))[0] || "";
                highlightedLineError = highlightedLineError.split(" ")?.map((word) => {
                    if (word.includes("~")) {
                        return `<span class="error-token">${word}</span>`;
                    }
                    return word;
                }).join(" ");
                const previousWhitespaceOnLine = textarea.value.split("\n")?.[errorLine - 1].match(/^\s*/)?.[0] || "";
                highlightedLineError = previousWhitespaceOnLine + highlightedLineError;
            } else {
                msg = "Runtime error: " + msg;
            }

            if (showOutput){
                compileState += "<div class='error'>" + msg + "</div>";
            }
        } finally {
            if (showOutput){
                showTerminal = true;
                await tick();
                outputTerminal.scrollTop = outputTerminal.scrollHeight;
                scrollableEditorParent.scrollTop = scrollableEditorParent.scrollHeight;
            }
            runState = "Run";
        }
    }

    let textAreaFocused = false;

    function focusEditor(node: HTMLElement) {
        node.onclick = () => {
            if (textarea){
                textarea.focus();
            }
        };

        return {
            destroy() {
                node.onclick = null;
            },
        }
    }

    let currentLine: number = $state(0);

    let selection = "";

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

    function clearEditor() {
        textarea.value = "";
        rawCode = "";
        parsedCode = `<code class="jaan">${
            hljs.highlight(textarea.value, {
                language: "jaan",
            }).value
        }</code>`;
    }

    function saveCode() {
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
    }

    function handleErrorHover(e: MouseEvent){
        //check if .error-token is intersecting with 50px radius of the mouse
        const mouseX = e.clientX as number;
        const mouseY = e.clientY as number;

        const errorToken = document.querySelector(`.line-shadows .line[data-line="${errorLine}"] .error-token`) as HTMLElement;

        //log(errorToken, errorToken?.getBoundingClientRect(), mouseX, mouseY);

        if (!errorToken) {
            return;
        }

        const radius = 0;

        const errorTokenRect = errorToken.getBoundingClientRect();

        if (
            mouseX > errorTokenRect.left - radius &&
            mouseX < errorTokenRect.right + radius &&
            mouseY > errorTokenRect.top - radius &&
            mouseY < errorTokenRect.bottom + radius
        ) {
            //log("Hovering over error token");
            const tooltip = document.querySelector(".errorTooltip") as HTMLElement;
            if (!tooltip) {
                return;
            }

            tooltip.style.visibility = "visible";
            tooltip.style.opacity = "1";
            tooltip.style.bottom = `calc(100% - ${errorTokenRect.top - 10}px)`;

        } else {
            const tooltip = document.querySelector(".errorTooltip") as HTMLElement;
            if (!tooltip) {
                return;
            }

            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = "0";
        }
    }

</script>

<svelte:document
    onkeydown={(e) => {

        if (e.key === "s" && e.ctrlKey) {
            e.preventDefault();
            //console.log('Saving');
            saveCode();
            return;
        }

        //run code on ctrl+enter
        if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            clearTimeout(runTimeOut);
            runCode();
            return;
        }

        //clear output on escape
        if (e.key === "Escape") {
            e.preventDefault();
            output = "";
            return;
        }

        //clear code on ctrl+backspace
        if (e.key === "Backspace" && e.ctrlKey) {
            e.preventDefault();
            clearEditor();
            return;
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
            return;
        }
    }}

    onmouseover={handleErrorHover}
    onmousemove={handleErrorHover}
/>

<svelte:head>
    <title>JaanLang - Playground</title>
</svelte:head>

<div class="content-container">
    <div class="border-animate mainWrapper" in:fly|global={{ x: 10, delay: 200 }}>
    <div class="editorWrapper animation-border-innerContent shadow-bg">
        <div class="editorContainer">
            <div class="topbar">
                <div class="title">Playground <span class="caret"></span></div>
                <div class="btn-grp">
                    <button
                        title="Ctrl+Enter"
                        class="run"
                        aria-label="run"
                        onclick={() => {
                            clearTimeout(runTimeOut);
                            runCode();
                        }}
                    >
                        {#if runState === "Compiling..."}
                            <i class="fa-solid fa-spinner"></i>
                        {:else}
                            <i class="fa-solid fa-play"></i>
                        {/if}
                    </button>
                    <button class="copy" title="Copy source code" aria-label="copy" onclick={() => {
                        navigator.clipboard.writeText(textarea.value);
                        showToastMessage("Source code copied to clipboard");
                    }}>
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button
                        title="Ctrl+s"
                        class="save"
                        aria-label="save"
                        onclick={() => {
                            //console.log('Saving');
                            saveCode();
                        }}
                        ><i class="fa-solid fa-floppy-disk"></i>
                    </button>
                    <button
                        title="Ctrl+Backspace to clear"
                        class="clear"
                        aria-label="clear"
                        onclick={() => {
                            //console.log('Clearing');
                            clearEditor();
                        }}><i class="fa-solid fa-trash"></i></button
                    >
                </div>
            </div>
            <div class="parent" bind:this={scrollableEditorParent}>
                {#if errorMessage && errorLine}                            
                    <div class="errorTooltip">
                        {errorMessage}
                    </div>
                {/if}
                <div class="line-numbers">
                    <div class="line-content">
                        {#each rawCode.split("\n") as _, i}
                        <span
                            class="line-number"
                            data-line={i + 1}
                            class:error={errorLine == i + 1 && rawCode.length > 0}
                            class:currentLine={currentLine == i + 1}
                        >
                        {#if errorLine === i +1}
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        {/if}
                        </span>
                        {/each}
                    </div>
                </div>
                <pre class="editor" use:focusEditor><div class="inputWrapper">{@html parsedCode}<textarea
                            aria-hidden="true"
                            placeholder="# Write your code here"
                            class="textarea codeArea"
                            spellcheck="false"
                            bind:this={textarea}
                            bind:value={rawCode}
                            onkeydown={getCurrentLineNumber}
                            onmousedown={getCurrentLineNumber}
                            oninput={parseCode}
                            onfocus={() => (textAreaFocused = true)}
                            onblur={() => (textAreaFocused = false)}
                        ></textarea></div>
                </pre>
                <div class="line-shadows">
                    {#each rawCode.split("\n") as _, i}
                        <span
                            class="line"
                            data-line={i + 1}
                            class:error={errorLine == i + 1 && rawCode.length > 0}
                            class:currentLine={currentLine == i + 1}
                            class:noSelection={selection.length == 0}
                        >
                            {#if errorLine === i + 1}
                                {@html highlightedLineError}
                            {/if}
                        </span>
                    {/each}
                </div>
            </div>
        </div>
    
        {#if showTerminal}
        <div class="output" id="output" in:fly={{y: 50, duration: 100}} out:slide={{duration: 100}}>
            <div class="topbar">
                <div class="title">
                    Console <span class="caret"></span>
                </div>
                <div class="btn-grp">
                    <button class="copy" title="Copy output" aria-label="copy" onclick={() => {
                        navigator.clipboard.writeText(output);
                        showToastMessage("Output copied to clipboard");
                    }}>
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <button
                        title="Esc to clear"
                        class="clear"
                        aria-label="clear"
                        onclick={() => {
                            output = "";
                            showTerminal = false;
                        }}><i class="fa-solid fa-trash"></i></button
                    >
                </div>
            </div>
            <div class="outputcontent">
                <div class="container" bind:this={outputTerminal}>
                    {@html compileState}
                    {@html output.trim()}
                </div>
            </div>
        </div>
        {/if}
    </div>
    </div>
</div>

<style lang="scss">

    .content-container{
        padding: 10px;
        display: flex;
        height: 100%;
        min-height: 100vh;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .errorTooltip{
        position: fixed;
        //bottom: 18px;
        //left: -35px;
        padding: 5px;
        margin-left: 55px;
        margin-right: 15px;
        height: min-content;
        white-space: pre-wrap;
        z-index: 10;
        background: rgb(0 0 0 / 80%);
        border-radius: 5px;
        visibility: hidden;
        opacity: 0;
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

    .line-shadows{
        position: absolute;
        display: flex;
        right: 0;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        width: calc(100% - 50px);
        padding: 0 5px;
        height: 100%;
        pointer-events: none;
        white-space: pre;
        .line{
            height: var(--line-height);
            min-height: var(--line-height);
            position: relative;
            
            font-family: monospace !important;
            
            :global(.error-token){
                color: #ff3737;
                display: inline-block;
                //transform: rotate(180deg);
                height: 20px;
                bottom: -8px;
                position: relative;
            }
            
            &.currentLine.noSelection {
                background: #ffffff0f;
            }

            &:hover{
                background: #ff6c6cc1;
            }            
        }

        
        :global(.line *){
            font-family: monospace !important;
        }
    }

    .line-numbers {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        width: min-content;
        overflow-y: scroll;
        height: max-content;
        //line-height: var(--line-height);
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
            line-height: 1.1;
        }
    }

    .line-number {

        &.error {
            border-right: 2px solid #ff3737;
        }

        
        counter-increment: codeLine;
        height: var(--line-height);
        color: #ffffff50;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
            font-size: 0.7rem;
            padding-right: 5px;
            color: orangered;
        }

        &.currentLine {
            color: #ffffffba;
        }

        &::after {
            content: counter(codeLine);
            margin-right: 5px;
            font-family: monospace;
        }
    }

    .editorWrapper, .mainWrapper {
        display: flex;
        flex-direction: column;
        //flex-wrap: wrap;
        flex-grow: 1;
        width: 100%;
        min-height: 400px;
        height: 85vh;
        max-width: 140vh;
        border-radius: 10px;
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

        *{
            font-size: 0.9rem;
        }

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
            height: max-content;
            min-height: 100%;
            z-index: 0;
            margin: 0;
            line-height: var(--line-height);
            background: none;

            .inputWrapper {
                width: 100%;
                min-width: max-content;
                position: relative;
            }
        }

        .textarea {
            width: 100%;
            height: 100%;
            min-height: var(--line-height);
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
            background: #ffffff0f;
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
        background: #15132a;
        //position: absolute;
        border-radius: inherit;

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
