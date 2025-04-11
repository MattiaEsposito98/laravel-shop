import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(GlobalContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie');
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      console.log('Login effettuato:', response.data.user);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token); // Salva il token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Salva l'utente
      navigate('/');

    } catch (err) {
      console.error("Errore durante il login:", err.response || err.message);
      setError('Credenziali errate o errore di rete.');
    }
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center mt-3">
        <h2 className='mb-3'>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin} className='d-flex flex-column gap-2 w-25'>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit" className='btn btn-primary'>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
