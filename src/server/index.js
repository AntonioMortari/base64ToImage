const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4 } = require('uuid');

const server = express();

server.use(express.urlencoded({ limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' }));
server.use(express.json({ limit: '100mb' }));
server.use(cors({
    origin: '*'
}));

server.post('/file', (req, res) => {
    const { upload1, upload2 } = req.body;

    const typeFile1 = upload1.split('/')[1].split(';')[0];

    const pathToFile1 = path.join(__dirname, '..', '..', 'public', `${v4()}.png`);

    const typeFile2 = upload2.split('/')[1].split(';')[0];
    const pathToFile2 = path.join(__dirname, '..', '..', 'public', `${v4()}.png`);

    const buffer1 = Buffer.from(upload1, 'base64');
    const buffer2 = Buffer.from(upload2, 'base64');

    fs.writeFileSync(pathToFile1, buffer1, (err) => {
        if (err) {
            return res.send('Erro');
        }
    });

    fs.writeFileSync(pathToFile2, buffer2, (err) => {
        if (err) {
            return res.send('Erro');
        }
    });

    return res.send('Sucesso!');
});

module.exports = { server };