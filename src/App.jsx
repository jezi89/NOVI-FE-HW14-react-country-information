import './App.css';
import axios from 'axios';
import {useState} from "react";
import {
    getMainWrapperClass,
    longCountryNameHelper,
    setCountryButtonHelper,
    shouldDisplayCountries
} from './helpers/countryHelpers';


function App() {
    const [countries, setCountries] = useState([]);
    const [showCountries, setShowCountries] = useState(false);


    async function fetchCountryData() {
        try {
            if (!countries.length) {
                const result = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population');
                setCountries(result.data)
                setShowCountries(true);
            } else {
                setShowCountries(!showCountries);
            }
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <header>
                <button
                    onClick={fetchCountryData}
                    className={`country-button ${shouldDisplayCountries(countries.length, showCountries) ? "active" : ""}`}>
                    {setCountryButtonHelper(countries.length, showCountries)}
                </button>
            </header>
            <div className={getMainWrapperClass(showCountries)}>
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
        </>
    )

}


export default App;

