import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Área Administrativa</h2>
      
      {/* Mensagem de boas-vindas */}
      <div style={{ padding: '20px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Bem-vindo ao painel do sistema!</h3>
        <p>Entraste com sucesso na tua conta.</p>
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

