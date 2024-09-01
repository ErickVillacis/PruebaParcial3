const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, 'client')));

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
