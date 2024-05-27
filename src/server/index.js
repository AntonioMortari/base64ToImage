const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4 } = require('uuid');
const Jimp = require('jimp');

const server = express();

server.use(express.urlencoded({ limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' }));
server.use(express.json({ limit: '100mb' }));
server.use(cors({
    origin: '*'
}));

server.post('/file', async (req, res) => {
    const { upload1, upload2 } = req.body;

    const typeFile1 = upload1.split('/')[1].split(';')[0];

    const pathToFile1 = path.join(__dirname, '..', '..', 'public', `${v4()}.png`);

    const typeFile2 = upload2.split('/')[1].split(';')[0];
    const pathToFile2 = path.join(__dirname, '..', '..', 'public', `${v4()}.png`);

    const buffer1 = Buffer.from(upload1, 'base64');
    const buffer2 = Buffer.from(upload2, 'base64');

    try {
        const image1 = await Jimp.read(buffer1);
        await image1
        .quality(50)
        .resize(256, Jimp.AUTO)
        .writeAsync(pathToFile1);

        const image2 = await Jimp.read(buffer2);
        await image2
            .quality(50)
            .resize(256, Jimp.AUTO)
            .writeAsync(pathToFile2);

        return res.send('Sucesso!');
    } catch (error) {
        res.send(`Erro ${error}`);
    }
});

module.exports = { server };