import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const success = await loginUser(form.username, form.password);
    if (success) {
      navigate('/explore');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} className="form-control mb-2"/>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="form-control mb-2"/>
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
