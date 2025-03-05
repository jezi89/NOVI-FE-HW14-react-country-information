// src/assets/components/FullScreenButton/FullScreenButton.jsx
import React from 'react';
import './FullScreenButton.css';

function FullScreenButton({onClick, isFullScreen}) {
    return (
        <button
            className={`full-screen-button ${isFullScreen ? "active" : ""}`}
            onClick={onClick}
        >
            {isFullScreen ? "Exit Full Screen" : "Show Full Screen"}
        </button>
    );
}

export default FullScreenButton;
