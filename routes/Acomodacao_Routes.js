const express = require('express');
const path = require('path');

const Acomodacao_Routes = express.Router();
const { getAcomodacoes, getFilter, getDetails } = require('../controllers/Acomodacoes_Controller');

// Rotas

Acomodacao_Routes.get('/', getAcomodacoes);

Acomodacao_Routes.get('/endereco=:endereco', getFilter);

Acomodacao_Routes.get('/details/id=:id', getDetails);


// Styles

Acomodacao_Routes.get('/home-style', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'home', 'index.css'))
});

Acomodacao_Routes.get('/details-style', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'css', 'acomodos', 'acomodos.css'))
});


// JavaScript

Acomodacao_Routes.get('/home-js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'js', 'home', 'filter.js'))
});

module.exports = Acomodacao_Routes;