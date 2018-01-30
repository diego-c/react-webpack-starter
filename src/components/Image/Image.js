import React from 'react';
import classes from './Image.css';

export default ({ path }) => (
    <div className = { classes.Img }>
        <img 
        src={ path }
        alt="img" />
    </div>    
);