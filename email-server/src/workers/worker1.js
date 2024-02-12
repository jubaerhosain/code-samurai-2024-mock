const { parentPort, workerData } = require('worker_threads');

function heavyComputation(data) {
    // Perform heavy CPU-intensive computation
    // For demonstration, just square the input number
    return data * data;
}

parentPort.on('message', (data) => {
    const result = heavyComputation(data);
    parentPort.postMessage(result);
});

