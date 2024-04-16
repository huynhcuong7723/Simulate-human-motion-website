// RollValueDisplay.js
import React from 'react';

const RollValueDisplay = ({ label, value }) => (
    <div style={{ textAlign: 'center' }}>
        <h2>{label}</h2>
        <p>{value}</p>
    </div>
);

export default RollValueDisplay;
