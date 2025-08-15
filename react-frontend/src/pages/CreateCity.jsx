import React, { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const CreateCity = () => {
  const { user, isAdmin, authTokens } = useContext(AuthContext);

  
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    info: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  if (!user || !isAdmin) {
    return <p>You are not authorized to view this page.</p>;
  }

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('name', formData.name);
    uploadData.append('country', formData.country);
    uploadData.append('info', formData.info);
    uploadData.append('image', formData.image);

    try {
      const response = await axios.post('https://generation.pythonanywhere.com/api/create-city/', uploadData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          'Content-Type': 'multipart/form-data',
        },
      
        withCredentials: true // if using Django session auth
      });

      setMessage('City created successfully!');
      setFormData({ name: '', country: '', info: '', image: null });
    } catch (error) {
      setMessage('Error creating city.');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Create New City</h1>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label className="form-label">City Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter city name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Country</label>
          <input
            type="text"
            name="country"
            className="form-control"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder="Enter country"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City Info</label>
          <textarea
            name="info"
            className="form-control"
            rows="4"
            value={formData.info}
            onChange={handleChange}
            required
            placeholder="Tell us about the city"
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCity;
