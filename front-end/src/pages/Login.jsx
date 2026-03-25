import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setErro('');

    try {
        const response = await axios.post('http://localhost:3000/login', {
          login,
          senha
        });
  
        if (response.status === 200) {
          const token = response.data.desenvolvedor.token;
          localStorage.setItem('token', token);
          
          navigate('/admin');
        }
      } catch (error) {
      if (error.response && error.response.data.erro) {
        setErro(error.response.data.erro);
      } else {
        setErro('Erro ao tentar conectar com o servidor. Verifique se o backend está rodando.');
      }
    }
  };

  return (
    <div className="card-container">
      <h2>Entrar no Sistema</h2>
      
      <form onSubmit={handleLogin} className="form-group">
        <div>
          <label htmlFor="login">Login</label>
          <input 
            type="text" 
            id="login"
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            required 
            placeholder="Digite seu usuário"
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            id="senha"
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            placeholder="Digite sua senha"
          />
        </div>

        {erro && <p className="mensagem-erro">{erro}</p>}

        <button type="submit" className="btn-primary">
          Entrar
        </button>
      </form>

      <p className="text-footer">
        Não tem uma conta? <Link to="/registro">Registre-se aqui</Link>
      </p>
    </div>
  );
}
