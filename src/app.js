
// load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

// json formatında gelen body'leri parse etmek için
app.use(express.json());

// GET isteği için geri döndürülecek basit bir JSON verisi.
let data = [
    { id: 1, name: "Name 1" },
    { id: 2, name: "Name 2" },
];

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const [username, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

        // Kullanıcı adı ve şifreyi kontrol et
        if (username === 'ad' && password === 'pw') {
            // Kullanıcı adı ve şifre doğruysa bir 
            // sonraki middleware'e veya route'a geç
            return next(); 
        }
    }

    // Kullanıcı adı veya şifre hatalıysa veya 
    // Authorization başlığı eksikse 401 Unauthorized hatası ver
    res.status(401).json({ message: 'Unauthorized' });
};

app.get('/api/data', (req, res) => {
    res.status(200).json(data);
});

app.get('/api/data/:id', basicAuth, (req, res) => {
    // req.params.id ile id parametresi okunabilir.
    const id = parseInt(req.params.id);
    const item = data.find(d => d.id === id);
    
    if (!item) {
        return res.status(404).json({ message: "Böyle bir veri bulunamadı." });
    }

    res.status(200).json(item);
});

app.post('/api/data', (req, res) => {
    // req.body.name ile request 'in body sindeki json nesneye erişilir.
    const newItem = {
        id: data.length + 1,
        name: req.body.name,
    };
    
    data.push(newItem);
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`server started on port ${ port } ...`);
});