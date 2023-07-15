import React from 'react';

import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    const handleNotFound = ()=>{
        navigate('/');
        
    }
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Oops!</h1>
        <p className="not-found-description">The page you're looking for cannot be found.</p>
        <button className="not-found-button" onClick={handleNotFound}>Go Back</button>
      </div>
    </div>
  );
};

export default NotFound;
