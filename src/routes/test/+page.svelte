<script lang="ts">
    import { onMount } from "svelte";
    import hljs from "$lib/lib";
    
    export let firstLineCode: string = 'dhoro amarNam holo "Fuad"';

    export let lines = [
        ['empty'],
        ['blue.w20', 'white.w25', 'purple.w10'],
        ['tab.w10', 'pink.w30', 'yellow.w10'],
        ['cyan.w10', 'orange.w10'],
        ['empty'],
        ['purple.w30', 'cyan.w20'],
        ['tab.w10', 'yellow.w20', 'pink.w10'],
        ['purple.w10']
    ];

    onMount(() => {
        if (firstLineCode){
            hljs.highlightAll();
        }
    });
</script>

<div class="codeSnippet">
    <pre>
        <div class="controls">
            <span class="close"></span>
            <span class="min"></span>
            <span class="max"></span>
        </div>
        {#if firstLineCode}
            <div class="flex line first">
                <code>{firstLineCode}</code><span class="cursor"></span>
            </div>
        {/if}
        
        {#each lines as line}
            <div class="flex line">
                {#each line as item}
                    <span class={item.split('.').join(' ')}></span>
                {/each}
            </div>
        {/each}
    </pre>
</div>

<style lang="scss">

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
        margin: 0 0 5px 0;
        gap: 10px;
        height: 10px;
        &::before{
            //make counter
            content: counter(line);
            width: 10px;
            counter-increment: line;
            color: rgba(255, 255, 255, 0.297);
        }

        span{
            height: 0.5rem;
            border-radius: 15px;
            display: inline-block;

            &.purple{
                background: #c678dd;
            }

            &.white{
                background: #dde0e5;
            }

            &.cyan{
                background: #56b6c2;
            }

            &.orange{
                background: #d19a66;
            }

            &.blue{
                background: #61afef;
            }

            &.pink{
                background: #c678dd;
            }

            &.yellow{
                background: #e5c07b;
            }

            &.tab{
                width: 20px;
            }
            
            &.w10{
                width: 10%;
            }

            &.w20{
                width: 20%;
            }

            &.w25{
                width: 25%;
            }

            &.w30{
                width: 30%;
            }

        }
    }

    .codeSnippet {
        min-width: 250px;
        pre {
            height: max-content;
            background: rgb(23, 37, 56);
            padding: 10px;
            white-space: unset;
            counter-reset: line;
            code{
                height: max-content;
                padding: 0;
                margin: 0;
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