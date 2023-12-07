import React from 'react';
import './CardLayout.css';
const CardLayout = ({ title, content }) => (
  <div className='card-layout'
    style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      margin: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      background: '#fff',
      overflow: 'hidden',
      height: '100%', // Set a fixed height for the card
    }}
  >
    <div className='card-title'
      style={{
        background: '#F2BED1',
        borderRadius: '10px 10px 0 0',
        color: '#fff',
        textAlign: 'center',
        padding: '10px',
      }}
    >
      <h1>{title}</h1>
    </div>
    <div className='card-content'
      style={{
        background: '#F8E8EE',
        borderRadius: '0 0 10px 10px',
        padding: '15px',
        overflowY: 'auto', // Make the content area scrollable if it overflows
        maxHeight: '280px', 
        height: '280px'// Adjust the max height based on your design
      }}
    >
      {content}
    </div>
  </div>
);

export default CardLayout;


