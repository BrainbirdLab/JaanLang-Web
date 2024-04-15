<script lang="ts">
    import "$lib/editor.scss";
    import { onMount } from "svelte";
    import hljs from "$lib/lib";
    export let code: {text: string, line: number} | null = null;
    export let error: number = 0;
    export let output: string[] = [];
    export let lines = [
        ['blue.w10', 'white.w25', 'purple.w10'],
        ['tab.w5', 'pink.w30', 'yellow.w10'],
        ['cyan.w10', 'orange.w5'],
        ['purple.w5'],
        ['empty'],
        ['purple.w30', 'cyan.w20'],
        ['tab.w5', 'yellow.w20', 'pink.w10'],
        ['purple.w10']
    ];

    onMount(() => {
        hljs.highlightAll();
    });
</script>

<div class="codeSnippet border-animate">
    <div class="editor-wrap animation-border-innerContent shadow-bg">
        <pre class="editor">
            <div class="tools">
                <div class="controls">
                    <span class="close"></span>
                    <span class="min"></span>
                    <span class="max"></span>
                </div>
                {#if output.length > 0}                
                <div class="runner">
                    <i class="fa-solid fa-play"></i>
                    <i class="fa-regular fa-copy"></i>
                    <i class="fa-solid fa-floppy-disk"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
                {/if}
            </div>
    
            {#if code}
            <div class="line exclude"><code>hi jaan</code></div>
            <div class="line empty"></div>
            {/if}
            
            {#each lines as line, i}
                {#if code && i === code.line}
                <div class="flex line first" class:exclude={!code}>
                    <code>{code.text}</code><span class="cursor"></span>
                </div>
                <div class="line empty"></div>
                {/if}
                <div class="flex line" class:error={error - 1 === i} class:exclude={!code}>
                    {#each line as item}
                    <span class="{item.split('.').join(' ')} snippet"></span>
                    {/each}
                </div>
                {#if error - 1 === i}
                    <div class="errorLine">
            
                    </div>
                {/if}
            {/each}
            {#if code}
            <div class="line empty"></div>
            <div class="line exclude"><code>bye jaan</code></div>
            {/if}
        </pre>
        {#if output.length > 0}
            <div class="output">
                <div class="top">
                    Console_
                    <div class="runner">
                        <i class="fa-regular fa-copy"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
                <div class="op-lines">
                    {#each output as line}
                        <span class="snippet {line.split('.').join(' ')}"></span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">

    .editor-wrap{
        overflow: hidden;
    }

    .error{
        background: #ff5e5624;
        position: relative;
        &::after{
            //tooltip
            content: 'Arey jaan ki egula? 😑';
            font-size: 0.5rem;
            position: absolute;
            bottom: 80%;
            width: max-content;
            left: 15%;
            background: #000000;
            color: white;
            padding: 2px 5px;
            border-radius: 4px;
        }
    }

    .tools{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 10px 0;
    }

    .controls{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        height: 10px;

        span{
            width: 10px;
            height: 10px;
            min-height: 10px;
            min-width: 10px;
            border-radius: 50%;
            &.min{
                background: #ffbd2e;
            }
            &.max{
                background: #27c93f;
            }
            &.close{
                background: #ff5f56;
            }
        }
    }

    .runner{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        height: 10px;

        i{
            font-size: 10px;
            color: #fff;

            &.fa-copy{
                color: rgba(255, 255, 255, 0.6);
            }

            &.fa-floppy-disk{
                color: rgb(0, 188, 212);
            }

            &.fa-trash{
                color: #ff5f56;
            }
        }
    }


    .output{
        width: 100%;
        padding: 10px;
        background: #140d25;
        .top{
            font-size: 0.6rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }

    .op-lines{

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 10px;
        gap: 5px;
        //padding: 0 20px;
        .snippet{
            height: 6px;
        }
    }

    .line{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 0 2px 0;
        gap: 10px;
        height: var(--size);
        font-size: var(--size);

        &:not(.exclude) {
            code, span:first-child{
                margin-left: 20px;
            }
        }

        &::before{
            //make counter
            content: counter(line);
            min-width: 20px;
            text-align: right;
            counter-increment: line;
            color: rgba(255, 255, 255, 0.297);
        }
    }

    .codeSnippet {
        width: 100%;
        min-width: 250px;
        height: max-content;
        border-radius: 10px;
        --size: 0.8rem;
        pre {
            height: max-content;
            border-radius: inherit;
            background: #211835;
            padding: 0 10px 10px 10px;
            margin: 0;
            white-space: unset;
            counter-reset: line;
            code{
                all: initial;
                height: max-content;
                padding: 0 !important;
                margin: 0;
                font-size: var(--size);
                background: transparent;
            }
            .cursor{
                display: inline-block;
                width: 3px;
                margin-left: -8px;
                border-radius: 2px;
                height: 1rem;
                background: rgba(255, 255, 255, 0.8);
                animation: blink 1s infinite;
            }
        }
    }

    .flex{
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
</style>