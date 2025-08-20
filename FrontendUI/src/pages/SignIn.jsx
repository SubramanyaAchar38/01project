import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './SignIn.css'; // Create this CSS file for styling

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call the login function from your AuthContext
      await login(email, password);
      // Navigate to the home page on successful login
      navigate('/');
    } catch (err) {
      // If login fails, display an error message
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="signin-container">
      <div className="signin-form-wrapper">
        <h2 className="signin-title">Sign In</h2>
        {error && <div className="signin-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Sign In'}
          </button>
        </form>
        <div className="signin-footer">
          Don't have an account? <Link to="/customer-signup">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;