import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const CityDetail = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [city, setCity] = useState(null);
  const { authTokens, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://generation.pythonanywhere.com/api/city/${id}/posts/`)
      .then(res => {
        setCity(res.data.city);
        setPosts(res.data.posts);
      })
      .catch(err => console.error(err));
  }, [id]);

  const likePost = async (postId) => {
    if (!authTokens) return alert('Please log in to like posts.');
    try {
      await axios.post(
        `https://generation.pythonanywhere.com/api/posts/${postId}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
      // Refresh posts after like
      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? { ...post, no_of_likes: post.no_of_likes + 1 }
            : post
        )
      );
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const downloadImage = async (postId) => {
    if (!authTokens) return alert('Please log in to download images.');
    try {
      const res = await axios.get(
        `https://generation.pythonanywhere.com/api/download/${postId}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
          responseType: 'blob',
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `image_${postId}.jpg`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error downloading image:', err);
    }
  };

  return (
    <div className="container mt-4">
      {city && (
        <>
          <h2 className="text-center text-success">{city.name} — {city.country}</h2>
          <p className="text-muted text-center">{city.info}</p>
        </>
      )}

      <div className="row mt-4">
        {posts.map(post => (
          <div key={post.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={post.image}
                alt={post.caption}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <p>{post.caption}</p>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => likePost(post.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Like ❤️
                  </button>
                  <button
                    onClick={() => downloadImage(post.id)}
                    className="btn btn-outline-success btn-sm"
                  >
                    Download ⬇️
                  </button>
                </div>
                <div className="text-muted mt-2">
                  {post.no_of_likes} likes | {post.no_of_downloads} downloads
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityDetail;


