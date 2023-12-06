import React from 'react';
import { Link } from 'react-router-dom';
import '../Home/Home.css';
import CardLayout from "../../layouts/CardLayout/CardLayout"; // Import the CardLayout component
import { Carousel } from 'react-bootstrap'; 



const Features = () => {
  // Sample data for the CardLayout component
  const cardData = [
    {
      imageUrl: 'url_for_image_1.jpg',
      title: 'Feature 1',
      description: 'Description of Feature 1.',
    },
    {
      imageUrl: 'url_for_image_2.jpg',
      title: 'Feature 2',
      description: 'Description of Feature 2.',
    },
    // Add more card data as needed
  ];

  
  return (
    <div>
      {/* Navbar */}
      {/* ... (Your existing navbar code) */}

      {/* Main Section */}
      <div className="container mt-5">
        <div className="row">
          {/* Centered Text */}
          <div className="col-md-6 offset-md-3 text-center custom-text">
            {/* ... (Your existing text) */}
          </div>

          <div className="col-md-6 offset-md-3 mt-3">
            {/* Add your Features content here */}
            <h2>Features</h2>
            <p>Include details about the features of your application here.</p>

            {/* Use the Bootstrap Carousel component */}
            <Carousel>
              {cardData.map((card, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={card.imageUrl}
                    alt={card.title}
                  />
                  <Carousel.Caption>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>

            {/* You can add more content based on your needs */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;