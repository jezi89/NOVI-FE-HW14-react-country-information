// src/assets/components/CountryGrid/CountryGrid.jsx
import React from 'react';
import Country from '../Country/Country.jsx';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator.jsx';
import './CountryGrid.css';

function CountryGrid({countries, contentRef}) {
    return (
        <div className="country-grid" ref={contentRef}>
            {countries.map((country, index) => (
                <Country
                    key={country.name.common}
                    country={country}
                    index={index}
                />
            ))}
            <ScrollIndicator containerRef={contentRef} delay={3000}/>
        </div>
    );
}

export default CountryGrid;
