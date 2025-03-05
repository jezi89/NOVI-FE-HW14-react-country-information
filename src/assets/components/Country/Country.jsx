import React from 'react';
import {longCountryNameHelper} from '../../../helpers/countryHelpers.js';
import './Country.css';
import {countryTextColor} from "../../../helpers/countryTextColor.js";

function Country({country, index}) {
    const {color} = countryTextColor(country.continents?.[0])

    return (
        <div className="country-item" style={{animationDelay: `${index * 0.02}s`}}>
            <div className="country-card">
                <div className="country-header">
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt || `Flag of ${country.name.common}`}
                    />
                    <span
                        className="country-name"
                        title={longCountryNameHelper(country.name.common).fullName}
                        style={{color}}
                    >
                        {longCountryNameHelper(country.name.common).displayName}
                    </span>
                </div>
                <hr className="country-divider"/>
                <div className="country-population">
                    Has a population of <br/> {country.population?.toLocaleString() || "Unknown"} people
                </div>
            </div>
        </div>
    );
}

export default Country;
