// src/App.jsx
import {useRef, useState} from 'react';
import './App.css';
import axios from 'axios';
import {shouldDisplayCountries} from './helpers/countryHelpers';
import CountryButton from "./assets/components/CountryButton/CountryButton.jsx";
import {scrollToTop, smoothScrollTo} from './helpers/scrollHelper.js';
import CountryGrid from './assets/components/CountryGrid/CountryGrid.jsx';
import WorldMap from './assets/components/WorldMap/WorldMap.jsx';

function App() {
    const [countries, setCountries] = useState([]);
    const [showCountries, setShowCountries] = useState(false);
    const contentRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    async function fetchCountryData() {
        try {
            if (!countries.length) {
                // First time loading countries
                const result = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population');
                // Sort countries by population (high to low)
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

    function toggleFullScreen() {
        setIsFullScreen(!isFullScreen);
        // When entering full screen, make sure we're showing countries
        if (!isFullScreen && !showCountries) {
            setShowCountries(true);
        }
    }

    return (

        <div className="container">
            <WorldMap/>

            <div className={`btn-wrapper ${showCountries ? "after-scroll" : ""}`} id="button-section">
                <CountryButton
                    onClick={fetchCountryData}
                    countriesLength={countries.length}
                    showCountries={showCountries}
                />
            </div>

            {shouldDisplayCountries(countries.length, showCountries) && (
                <CountryGrid
                    countries={countries}
                    contentRef={contentRef}
                />
            )}

            {shouldDisplayCountries(countries.length, showCountries) && (
                <div className="btn-wrapper bottom-button">
                    <button
                        className="full-screen-button"
                        onClick={toggleFullScreen}>
                        Show Full Screen
                    </button>
                </div>
            )}
            <div id="content-spacer" style={{height: 0}}></div>
            {/* Add the full screen overlay component here */}
            {isFullScreen && (
                <div className="full-screen-overlay">
                    <div className="full-screen-header">
                        <button className="close-button" onClick={toggleFullScreen}>×</button>
                    </div>
                    <div className="full-screen-content">
                        <CountryGrid
                            countries={countries}
                            contentRef={contentRef}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
