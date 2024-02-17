<script lang="ts">
    import "$lib/globasl.scss";
    import "$lib/fontawesome/css/all.min.css";
    import "highlight.js/styles/atom-one-dark.min.css";
    import { showToastMessage } from "domtoastmessage";
    import { onMount } from "svelte";

    async function detectSWUpdate(){
        const registration = await navigator.serviceWorker.ready;

        registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker?.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                    console.log("New update available");
                    showToastMessage("App updated");
                }
            });
        });
    }

    onMount(() => {
        detectSWUpdate();
    });

</script>

<slot />