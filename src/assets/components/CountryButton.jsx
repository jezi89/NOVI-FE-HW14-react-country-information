// src/components/CountryButton.jsx
import React from 'react';
import {setCountryButtonHelper, shouldDisplayCountries} from '../../helpers/countryHelpers';

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
