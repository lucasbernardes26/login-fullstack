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
    <div className="card-container" style={{ textAlign: 'center' }}>
      <h2>Área Administrativa</h2>
      
      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', margin: '20px 0 30px 0' }}>
        <h3 style={{ color: '#2e7d32', marginBottom: '10px' }}>{mensagemServidor}</h3>
        
        {dadosUsuario && (
          <p>O teu ID de desenvolvedor é: <strong>{dadosUsuario.id}</strong></p>
        )}
      </div>
      
      <button onClick={handleLogout} className="btn-primary btn-danger">
        Sair (Logout)
      </button>
    </div>
  );
}

export default Admin;