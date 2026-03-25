const express = require('express');
const cors = require('cors');
require('dotenv').config();

const DesenvolvedorController = require('./controller/desenvolvedorController');

const app = express();

app.use(express.json());
app.use(cors());         


app.post('/register', DesenvolvedorController.register);
app.post('/login', DesenvolvedorController.login);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr com sucesso na porta ${PORT}!`);
    console.log(`http://localhost:${PORT}`)
});