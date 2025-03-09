// src/assets/components/CountryButton/CountryButton.jsx
import React from 'react';
import {shouldDisplayCountries, setCountryButtonHelper} from '../../../../helpers/countryHelpers.js';
import './CountryButton.css'; // Fixed CSS import path

function CountryButton({onClick, countriesLength, showCountries, className = ""}) {
    return (
        <button
            onClick={onClick}
            className={`country-button ${shouldDisplayCountries(countriesLength, showCountries) ? "active" : ""} ${className}`}>
            {setCountryButtonHelper(countriesLength, showCountries)}
        </button>
    );
}

export default CountryButton;
