import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.loggedIn) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (username.length < 3) {
      newErrors.username = 'Username musí mít minimálně 3 znaky';
    }

    if (password.length < 5) {
      newErrors.password = 'Heslo musí mít minimálně 5 znaků';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setUser({
        username,
        loggedIn: true,
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Meme Marketplace</h1>
        <h2>Přihlášení</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? 'input-error' : ''}
              placeholder="Zadejte username"
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Heslo</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
              placeholder="Zadejte heslo"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-button">
            Přihlásit se
          </button>
        </form>
      </div>
    </div>
  );
}
