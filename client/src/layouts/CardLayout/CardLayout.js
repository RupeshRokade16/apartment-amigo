import React from 'react';
import './CardLayout.css';
const CardLayout = ({ title, content }) => (
    <div className='card-layout' >
        <div className='card-title' >
            <h2>{title}</h2>
        </div>
        <div className='card-content' >
            {content}
        </div>
    </div>
);

export default CardLayout;


