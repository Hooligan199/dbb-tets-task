const express = require('express');
const app = express();

app.get('/health', (req, res) => res.json({ status: "healthy" }));

app.listen(8080, () => console.log("Server running on port 8080"));
