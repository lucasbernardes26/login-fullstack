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
    <div style={{ maxWidth: '300px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Entrar no Sistema</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="login">Login:</label><br />
          <input 
            type="text" 
            id="login"
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label><br />
          <input 
            type="password" 
            id="senha"
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {erro && <p style={{ color: 'red', fontSize: '14px' }}>{erro}</p>}

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Não tem uma conta? <Link to="/registro">Registre-se aqui</Link>
      </p>
    </div>
  );
}
