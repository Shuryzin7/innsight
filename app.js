const express = require('express');
require('dotenv').config();

const path = require('path');
const app = express();

const Acomodacao_Routes = require('./routes/Acomodacao_Routes');

app.set('view engine', 'ejs');

// Roteamento
app.use('/', Acomodacao_Routes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});