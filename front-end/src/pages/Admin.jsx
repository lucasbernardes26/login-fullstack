import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const navigate = useNavigate();
  const [mensagemServidor, setMensagemServidor] = useState('A carregar dados seguros...');
  const [dadosUsuario, setDadosUsuario] = useState(null);

  useEffect(() => {
    const buscarDadosProtegidos = async () => {
      const token = localStorage.getItem('token');

      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        
        const response = await axios.get('http://localhost:3000/admin-data', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        
        setMensagemServidor(response.data.mensagem);
        setDadosUsuario(response.data.usuario);
        
      } catch (error) {
        
        console.error('Acesso negado ou token expirado.');
        localStorage.removeItem('token'); 
        navigate('/login'); 
      }
    };

    buscarDadosProtegidos();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Área Administrativa</h2>
      
      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginTop: '20px' }}>
        
        <h3>{mensagemServidor}</h3>
        
        {dadosUsuario && (
          <p>O seu ID de desenvolvedor na base de dados é: <strong>{dadosUsuario.id}</strong></p>
        )}
      </div>
      
      <button 
        onClick={handleLogout} 
        style={{ 
          marginTop: '30px', 
          padding: '10px 20px', 
          cursor: 'pointer', 
          backgroundColor: '#f44336', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        Sair (Logout)
      </button>
    </div>
  );
}

export default Admin;