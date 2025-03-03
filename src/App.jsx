import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import {getMainWrapperClass, longCountryNameHelper, shouldDisplayCountries} from './helpers/countryHelpers';
import IMAGES from "./assets/Images.jsx";
import CountryButton from "./assets/components/CountryButton.jsx";
import {scrollToTop, smoothScrollTo} from './helpers/scrollHelper';

function App() {
    const [countries, setCountries] = useState([]);
    const [showCountries, setShowCountries] = useState(false);

    useEffect(() => {
        // Show scrollbar only during manual scrolling
        let scrollTimer;

        const handleScroll = () => {
            // Skip if we're in the middle of programmatic scrolling
            if (document.body.classList.contains('scrolling-up')) return;

            // Show scrollbar during manual scrolling
            document.body.classList.add('scrolling-manual');

            // Hide scrollbar after scrolling stops
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                document.body.classList.remove('scrolling-manual');
            }, 1000);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
        };
    }, []);


    async function fetchCountryData() {
        try {
            if (!countries.length) {
                // First time loading countries
                const result = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population');
                setCountries(result.data);
                setShowCountries(true);

                // Smooth scroll to button after countries are loaded
                setTimeout(() => {
                    smoothScrollTo({
                        targetId: "button-section",
                        offset: 30 // Less offset means button appears higher
                    });
                }, 100);
            } else {
                // Toggle countries visibility
                const willShow = !showCountries;

                if (!willShow) {
                    // When hiding countries, scroll to top first
                    scrollToTop(() => {
                        setShowCountries(false);

                        // Remove spacer gradually
                        setTimeout(() => {
                            document.getElementById("content-spacer").style.height = "0";
                        }, 200);
                    });
                } else {
                    // When showing countries
                    setShowCountries(true);
                    // Scroll to button after DOM update
                    setTimeout(() => {
                        smoothScrollTo({
                            targetId: "button-section",
                            offset: 30 // Makes the jump end higher than the container line
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

            <div id="country-list" className={getMainWrapperClass(showCountries)}>
                {shouldDisplayCountries(countries.length, showCountries) &&
                    countries.map((country) => (
                        <div className="countrylist" key={country.name.common}>
                            <div className="country-box">
                                <img src={country.flags.svg}
                                     alt={country.flags.alt || `Vlag van ${country.name.common}`}/>
                                <span title={longCountryNameHelper(country.name.common).fullName}>
                                    {longCountryNameHelper(country.name.common).displayName}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* Show button at the bottom only when countries are displayed */}
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
