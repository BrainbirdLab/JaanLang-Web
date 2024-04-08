<script lang="ts">
    import { onMount } from "svelte";
    import hljs from "$lib/lib";
    
    export let firstLineCode: string = 'bolo "babu khaiso?"';
    export let error: number = 0;
    export let lines = [
        ['blue.w20', 'white.w25', 'purple.w10'],
        ['tab.w10', 'pink.w30', 'yellow.w10'],
        ['cyan.w10', 'orange.w10'],
        ['empty'],
        ['purple.w30', 'cyan.w20'],
        ['tab.w10', 'yellow.w20', 'pink.w10'],
        ['purple.w10']
    ];

    onMount(() => {
        hljs.highlightAll();
    });
</script>

<div class="codeSnippet border-animate">
    <pre class="editor animation-border-innerContent shadow-bg">
        <div class="controls">
            <span class="close"></span>
            <span class="min"></span>
            <span class="max"></span>
        </div>
        <div class="line exclude"><code>hi jaan</code></div>
        <div class="line empty"></div>
        {#if firstLineCode}
            <div class="flex line first">
                <code>{firstLineCode}</code><span class="cursor"></span>
            </div>
            <div class="line empty"></div>
        {/if}
        
        {#each lines as line, i}
            <div class="flex line" class:error={error - 1 === i}>
                {#each line as item}
                    <span class="{item.split('.').join(' ')} snippet"></span>
                {/each}
            </div>
            {#if error - 1 === i}
                <div class="errorLine">
        
                </div>
            {/if}
        {/each}
        <div class="line empty"></div>
        <div class="line exclude"><code>bye jaan</code></div>
    </pre>
</div>

<style lang="scss">

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

    .controls{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        height: 10px;
        margin-bottom: 10px;

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
        width: 250px;
        border-radius: 10px;
        --size: 0.8rem;
        pre {
            height: max-content;
            border-radius: inherit;
            background: #211835;
            padding: 10px;
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