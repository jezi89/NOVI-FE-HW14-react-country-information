// src/assets/components/WorldMap/WorldMap.jsx
import React from 'react';
import IMAGES from "../../Images.jsx"; // Corrected path
import './WorldMap.css';

function WorldMap() {
    return (
        <div className="map-container" id="map-section">
            <img src={IMAGES.image3} alt="world map"/>
        </div>
    );
}

export default WorldMap;
