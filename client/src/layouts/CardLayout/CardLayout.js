import React from 'react';
import './CardLayout.css';
const CardLayout = ({ title, content }) => (
    <div className='card-layout1' >
        <div className='card-title1' >
            <h2>{title}</h2>
        </div>
        <div className='card-content1' >
            {content}
        </div>
    </div>
);

export default CardLayout;


