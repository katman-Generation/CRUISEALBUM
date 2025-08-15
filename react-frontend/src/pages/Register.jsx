import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://generation.pythonanywhere.com/api/register/', form);
      setMessage('Account created. You can now log in.');
    } catch (err) {
      setMessage('Failed to register.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" required onChange={handleChange} className="form-control mb-2"/>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="form-control mb-2"/>
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="form-control mb-2"/>
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
