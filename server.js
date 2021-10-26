/* eslint-disable @typescript-eslint/no-var-requires */
//import express from 'express';
//import path from 'path';

const path = require('path');
const express = require('express');

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/dist/SbsApp/'));

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/SbsApp/index.html'));
});

app.listen(process.env.PORT || 8080);