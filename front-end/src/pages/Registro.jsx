import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Registro() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');

    try {

      const response = await axios.post('http://localhost:3000/register', {
        login,
        senha
      });

      if (response.status === 201) {
        setMensagem('Usuário cadastrado com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.erro) {
        setErro(error.response.data.erro);
      } else {
        setErro('Erro ao conectar com o servidor. O backend está rodando?');
      }
    }
  };

  return (
    <div className="card-container">
      <h2>Registo de Utilizador</h2>
      
      <form onSubmit={handleRegistro} className="form-group">
        <div>
          <label htmlFor="login">Login</label>
          <input 
            type="text" 
            id="login"
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            required 
            placeholder="Escolhe um nome de utilizador"
          />
        </div>

        <div>
          <label htmlFor="senha">Palavra-passe</label>
          <input 
            type="password" 
            id="senha"
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            placeholder="Cria uma palavra-passe forte"
          />
        </div>

        {/* Mensagens de erro e sucesso */}
        {erro && <p className="mensagem-erro">{erro}</p>}
        {mensagem && <p style={{ color: '#4CAF50', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>{mensagem}</p>}

        <button type="submit" className="btn-primary">
          Registar
        </button>
      </form>

      <p className="text-footer">
        Já tens uma conta? <Link to="/login">Faz login aqui</Link>
      </p>
    </div>
  );
}
