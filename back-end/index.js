const express = require('express');
const cors = require('cors');
require('dotenv').config();
const verificarToken = require('./middleware/authMiddleware');

const DesenvolvedorController = require('./controller/desenvolvedorController');

const app = express();

app.use(express.json());
app.use(cors());         


app.post('/register', DesenvolvedorController.register);
app.post('/login', DesenvolvedorController.login);
app.get('/admin-data', verificarToken, DesenvolvedorController.perfil);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr com sucesso na porta ${PORT}!`);
    console.log(`http://localhost:${PORT}`)
});