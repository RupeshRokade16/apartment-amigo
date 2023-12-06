import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const About = () => {
  // Sample data for multiple cards
  const cardData = [
    {
      id: 1,
      title: 'Card 1',
      text: 'Some quick example text for Card 1.',
      imageUrl: 'https://via.placeholder.com/50x50',
    },
    {
      id: 2,
      title: 'Card 2',
      text: 'Some quick example text for Card 2.',
      imageUrl: 'https://via.placeholder.com/50x50',
    },
    {
      id: 3,
      title: 'Card 3',
      text: 'Some quick example text for Card 3.',
      imageUrl: 'https://via.placeholder.com/50x50',
    },
    // Add more card data as needed
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p>
        Welcome to our page! Explore the following cards to learn more about each topic:
      </p>
      {cardData.map((card) => (
        <Card key={card.id} style={{ width: '400px', margin: '10px' }}>
          <Card.Img variant="top" src={card.imageUrl} />
          <Card.Body>
            <Card.Title>{card.title}</Card.Title>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default About;
