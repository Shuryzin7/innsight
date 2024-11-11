const db = require('./../config/db');

const getFilter = async (req, res) => {
    const { endereco } = req.params;
    const query = 'SELECT * FROM Acomodacoes WHERE endereco LIKE ?';
    
    try {
        const [results] = await db.promise().query(query, [`%${endereco}%`]);
        res.render('index', { acomodacoes: results });
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};

const getAcomodacoes = async (req, res) => {
    const query = 'SELECT * FROM Acomodacoes';

    try {
        const [results] = await db.promise().query(query);
        res.render('index', { acomodacoes: results });
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
};

const getDetails = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Acomodacoes WHERE id = ?';
    
    try {
        const [results] = await db.promise().query(query, [id]);
        if (results.length > 0) {
            res.render('acomodos', { propriedade: results[0] });
        } else {
            res.status(404).send('Acomodação não encontrada');
        }
    } catch (err) {
        console.error('Erro ao executar consulta:', err);
        res.status(500).send('Erro ao buscar dados');
    }
}

module.exports = { getAcomodacoes, getFilter, getDetails };