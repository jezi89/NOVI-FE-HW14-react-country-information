import {useState} from 'react'; // Remove useEffect
import './App.css';
import axios from 'axios';
import {longCountryNameHelper, shouldDisplayCountries} from './helpers/countryHelpers';
import IMAGES from "./assets/Images.jsx";
import CountryButton from "./assets/components/CountryButton.jsx";
import {scrollToTop, smoothScrollTo} from './helpers/scrollHelper';
import { useRef } from 'react';
import ScrollIndicator from "./assets/components/ScrollIndicator.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [showCountries, setShowCountries] = useState(false);
    const contentRef = useRef(null);


    async function fetchCountryData() {
        try {
            if (!countries.length) {
                // First time loading countries
                const result = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population');
                // Sort countries by population (low to high) before setting state
                const sortedCountries = result.data.sort((b, a) =>
                    (a.population || 0) - (b.population || 0)
                );
                setCountries(sortedCountries);

                // Add a small delay before showing countries to make transition smoother
                setTimeout(() => {
                    setShowCountries(true);
                    // Smooth scroll to button
                    setTimeout(() => {
                        smoothScrollTo({
                            targetId: "button-section",
                            offset: 30
                        });
                    }, 50);
                }, 100);
            } else {
                // Toggle countries visibility with improved transition
                const willShow = !showCountries;

                if (!willShow) {
                    // When hiding countries, scroll first
                    scrollToTop(() => {
                        // Add a small delay before state change to improve transition
                        setTimeout(() => {
                            setShowCountries(false);
                            // Remove spacer gradually
                            setTimeout(() => {
                                document.getElementById("content-spacer").style.height = "0";
                            }, 100);
                        }, 100);
                    });
                } else {
                    // When showing countries
                    setShowCountries(true);
                    // Position button with a slight delay for smooth transition
                    setTimeout(() => {
                        smoothScrollTo({
                            targetId: "button-section",
                            offset: 30
                        });
                    }, 100);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container">
            <div className="map-container" id="map-section">
                <img src={IMAGES.image3} alt="world map"/>
            </div>

            <div className={`btn-wrapper ${showCountries ? "after-scroll" : ""}`} id="button-section">
                <CountryButton
                    onClick={fetchCountryData}
                    countriesLength={countries.length}
                    showCountries={showCountries}
                />
            </div>

            {shouldDisplayCountries(countries.length, showCountries) && (
                <div className="main-wrapper" ref={contentRef}>
                    {countries.map((country, index) => (
                        <div className="countrylist" key={country.name.common}
                             style={{animationDelay: `${index * 0.02}s`}}>
                            <div className="country-wrapper">
                                <div className="country-header">
                                    <img src={country.flags.svg}
                                         alt={country.flags.alt || `Vlag van ${country.name.common}`}/>
                                    <span className="country-name"
                                          title={longCountryNameHelper(country.name.common).fullName}>
                                        {longCountryNameHelper(country.name.common).displayName}
                                    </span>
                                </div>

                                <hr className="country-divider"/>

                                <div className="country-population">
                                    Has a population of {country.population?.toLocaleString() || "Unknown"} people
                                </div>
                            </div>
                        </div>
                    ))}
                    <ScrollIndicator containerRef={contentRef} delay={3000} />
                </div>
            )}

            {shouldDisplayCountries(countries.length, showCountries) && (
                <div className="btn-wrapper bottom-button">
                    <CountryButton
                        onClick={fetchCountryData}
                        countriesLength={countries.length}
                        showCountries={showCountries}
                        position="bottom"
                    />
                </div>
            )}
            <div id="content-spacer" style={{height: 0}}></div>
        </div>
    );
}

export default App;
