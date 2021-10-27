import express from 'express';
import path from 'path';

//const path = require('path');
//const express = require('express');

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/dist/SbsApp/'));
app.use(express.static(__dirname + '/dist/SbsApp/en/'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/SbsApp/index.html'));
});

app.listen(process.env.PORT || 8080);