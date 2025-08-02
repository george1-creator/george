 import React, { useState } from 'react';
// import './App.css'; // Optional: for styling




function AdminCashier() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const credentials = {
    admin: '1234',
    cashier: '4321',
  };

  const handleCardClick = (role) => {
    setSelectedRole(role);
    setPasswordInput('');
    setShowModal(true);
    setMessage('');
  };

  const handleLogin = () => {
    if (passwordInput === credentials[selectedRole]) {
      setMessage(`Welcome, ${selectedRole}!`);
    } else {
      setMessage('Incorrect password!');
    }
  };

  return (
    <div className="app">
      <h1>Login Panel</h1>
      <div className="card-container">
        <div className="card" onClick={() => handleCardClick('admin')}>
          <h2>Admin</h2>
        </div>
        <div className="card" onClick={() => handleCardClick('cashier')}>
          <h2>Cashier</h2>
         
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter {selectedRole} password:</h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
            />
            <div className="modal-actions">
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCashier;
