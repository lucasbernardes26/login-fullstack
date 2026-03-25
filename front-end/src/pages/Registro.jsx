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
    <div style={{ maxWidth: '350px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Registro de Usuário</h2>
      
      <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
        {mensagem && <p style={{ color: 'green', fontSize: '14px', fontWeight: 'bold' }}>{mensagem}</p>}

        {/* botão de cadastrar */}
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Já tem uma conta? <Link to="/login">Faça login aqui</Link>
      </p>
    </div>
  );
}
