import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} className="card-img" />
      <div className="card-content">
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
