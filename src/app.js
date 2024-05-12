
const express = require('express');
const app = express();
const port = 3004;

// json formatında gelen body'leri parse etmek için
app.use(express.json());

// GET isteği için geri döndürülecek basit bir JSON verisi.
let data = [
    { id: 1, name: "Name 1" },
    { id: 2, name: "Name 2" },
];

app.get('/api/data', (req, res) => {
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`API http://localhost:${port} serving ...`);
});