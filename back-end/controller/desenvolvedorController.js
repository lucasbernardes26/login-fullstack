const DesenvolvedorService = require('../service/desenvolvedorService');

const DesenvolvedorController = {
 
    async register(req, res) {
        try {
            
            const { login, senha } = req.body;

            
            if (!login || !senha) {
                return res.status(400).json({ erro: 'Login e senha são obrigatórios.' });
            }

            
            await DesenvolvedorService.registrar(login, senha);
            
           
            return res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });
        } catch (erro) {
         
            return res.status(400).json({ erro: erro.message });
        }
    },


    async login(req, res) {
        try {
  
            const { login, senha } = req.body;

            if (!login || !senha) {
                return res.status(400).json({ erro: 'Login e senha são obrigatórios.' });
            }

            const desenvolvedor = await DesenvolvedorService.login(login, senha);
            
            return res.status(200).json({ 
                mensagem: 'Login realizado com sucesso!', 
                desenvolvedor 
            });
        } catch (erro) {
            return res.status(401).json({ erro: erro.message });
        }
    }
};

module.exports = DesenvolvedorController;