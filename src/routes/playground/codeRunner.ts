/// <reference lib="webworker" />

self.onmessage = async (event) => {

    let code = event.data.code;
    const showOutput = event.data.showOutput;

    try {

        try {
            
            if (showOutput) {
                code = code.replace(/console.log\((.*)\);/g, 'self.postMessage({ type: "log", data: [$1] });');
                code = code + '\nself.postMessage({ type: "done", data: "Code executed successfully" });';
            }

            const func = new Function(code);
            await func();

        } catch (e) {
            console.error('Error executing code:', e);
        } finally {
            self.postMessage({ type: "result", data: "Code executed successfully" });
        }

    } catch (e) {
        // Handle any errors
        console.error('Error executing code:', e);
    }
};
