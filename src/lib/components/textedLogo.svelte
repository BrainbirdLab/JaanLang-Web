<script lang="ts">
    import Logo from "$lib/components/logo.svelte";

    interface Props {
        height?: number;
        width?: number;
    }

    let { height = 40, width = 40 }: Props = $props();

    let fontSize = $derived((height + width) / 4);
    
</script>
<h1 class="bold head" style="font-size: {fontSize} !important;">
    <Logo {height} {width} />
    <div class="name">
        <span class="pink">Jaan</span><span class="blue">Lang</span>
    </div>
</h1>

<style lang="scss">

        
    .head {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }
   
    .bold,
    .name {
        position: inherit;
        font-size: inherit;
    }
</style>