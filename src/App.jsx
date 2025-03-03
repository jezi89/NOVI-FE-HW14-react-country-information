import './App.css';
import axios from 'axios';
import {useState} from "react";

function App() {
    const [countries, setCountries] = useState([]);
    const [showCountries, setShowCountries] = useState(false);


    async function fetchCountryData() {
        try {
            if (!countries.length) {
                const result = await axios.get('https://restcountries.com/v3.1/all?fields=flag,name,population');
                setCountries(result.data)
                setShowCountries(true);
            } else {
                setShowCountries(!showCountries);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function setCountryHelper() {
        return countries.length === 0 ? "Fetch All Countries" :
            showCountries ? "Hide Country List" : "Set Country List"
    }

    return (
        <>
            <header>
                <button
                    onClick={fetchCountryData}
                    className={`country-button ${countries.length !== 0 && showCountries ? "active" : ""}`}> {setCountryHelper()}
                </button>

            </header>
            <div className={`main-wrapper ${!showCountries ? "hide" : ""}`}>
                {countries.length !== 0 && countries.map((country) => (
                    <div className="countrylist" key={country.name.common}>
                        {country.name.common}
                    </div>
                ))}
            </div>
        </>
    )

}


export default App;

