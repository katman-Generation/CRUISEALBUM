import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const { authTokens, user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    caption: '',
    image: null,
  });

  const handleChange = e => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!authTokens || !isAdmin) {
      alert('Only admins can create posts.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('caption', form.caption);
    formData.append('image', form.image);

    try {
      await axios.post(
        'https://generation.pythonanywhere.com/api/create-post/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      alert('Post created successfully!');
      navigate('/explore');
    } catch (err) {
      console.error(err);
      alert('Error creating post.');
    }
  };

  if (!user || !isAdmin) {
    return <p>You must be an admin to create posts.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="City Name" required onChange={handleChange} className="form-control mb-2" />
        <textarea name="caption" placeholder="What's on the image?" required onChange={handleChange} className="form-control mb-2" />
        <input type="file" name="image" required onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
