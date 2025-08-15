import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('https://generation.pythonanywhere.com/api/cities/')
      .then(res => setCities(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container text-center">
      <h2 className="mb-4 text-primary">Explore the World Through Photos 🌍</h2>

      <div className="row">
        {cities.map(city => (
          <div key={city.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img src={city.image} className="card-img-top" alt={city.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{city.name}</h5>
                <p className="card-text">{city.country}</p>
                <Link to={`/City/${city.id}`} className="btn btn-outline-primary btn-sm">View Posts</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
