const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

app.get('/compute', (req, res) => {
    const inputData = 10; // Example input data

    const worker = new Worker('./computeWorker.js', {
        workerData: inputData
    });

    worker.on('message', (result) => {
        res.json({ result });
    });

    worker.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(new Error(`Worker stopped with exit code ${code}`));
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

