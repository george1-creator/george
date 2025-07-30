import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      login();
      navigate('/sales');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ padding: 50, textAlign: 'center',backgroundColor: 'aquamarine' }}>
      <h2>Login to Mboka Doba</h2>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
