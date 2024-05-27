const express = require('express');
const path = require('path');
const fs = require('fs');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/file', (req, res) => {
    const { base64 } = req.body;

    const typeFile = base64.split('/')[1].split(';')[0];

    const pathToFile = path.join(__dirname, '..', '..', 'public', `${Date.now()}.${typeFile}`);

    const buffer = Buffer.from(base64.split(',')[1], 'base64');

    fs.writeFile(pathToFile, buffer, (err) => {
        if(err){
            return res.send('Erro');
        }

        return res.send('Sucesso!');
    });
});

module.exports = { server };