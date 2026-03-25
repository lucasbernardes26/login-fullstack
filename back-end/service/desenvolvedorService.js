const bcrypt = require('bcryptjs');
const DesenvolvedorRepository = require('../repository/desenvolvedorRepository');
const jwt = require('jsonwebtoken'); 

const DesenvolvedorService = {

    async registrar(login, senha) {
       
        const usuarioExistente = await DesenvolvedorRepository.buscarPorLogin(login);
        if (usuarioExistente) {
            throw new Error('Este login já está em uso.');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        const resultado = await DesenvolvedorRepository.criar(login, senhaCriptografada);
        return resultado;
    },

    async login(login, senha) {
        const desenvolvedor = await DesenvolvedorRepository.buscarPorLogin(login);
        
        if (!desenvolvedor) {
            throw new Error('Utilizador não encontrado.');
        }

        const senhaValida = await bcrypt.compare(senha, desenvolvedor.senha);
        
        if (!senhaValida) {
            throw new Error('Palavra-passe inválida.');
        }
        
        const token = jwt.sign(
            { id: desenvolvedor.id, login: desenvolvedor.login }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );
        return { 
            id: desenvolvedor.id, 
            login: desenvolvedor.login,
            token: token 
        };
    }
};

module.exports = DesenvolvedorService;