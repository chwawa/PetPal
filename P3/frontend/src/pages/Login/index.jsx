import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch('http://127.0.0.1:8000/accounts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('id', data.id);
      localStorage.setItem('usertype', data.usertype);
      setError('');

      navigate('/');
    } else {
      const errorData = await response.json();
      if (errorData.non_field_errors) {
        setError(errorData.non_field_errors[0]);
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="login-error">{error}</p>
            <button className="loginbutton" type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

