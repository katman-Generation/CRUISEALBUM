import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import Unauthorized from './pages/Unauthorized';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateCity from './pages/CreateCity';
import CreatePost from './pages/CreatePost';
import Explore from './pages/Explore';
import CityDetail from './pages/CityDetail';


const App = () => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/city/:id" element={<CityDetail />} />
          {/* Protected admin-only routes */}
          <Route
            path="/create-post"
            element={
              <AdminRoute>
                <CreatePost />
              </AdminRoute>
            }
          />
          <Route
            path="/create-city"
            element={
              <AdminRoute>
                <CreateCity />
              </AdminRoute>
            }
          /> 
        </Routes>
      </div>
    </>
  );
};

export default App;

