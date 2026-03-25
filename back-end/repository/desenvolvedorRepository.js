const db = require('../config/db');

const DesenvolvedorRepository = {

    async criar(login, senhaCriptografada) {
        const sql = 'INSERT INTO desenvolvedor (login, senha) VALUES (?, ?)';
        const [resultado] = await db.execute(sql, [login, senhaCriptografada]);
        return resultado;
    },


    async buscarPorLogin(login) {
        const sql = 'SELECT * FROM desenvolvedor WHERE login = ?';
        const [linhas] = await db.execute(sql, [login]);
        return linhas[0]; 
    }
};

module.exports = DesenvolvedorRepository;