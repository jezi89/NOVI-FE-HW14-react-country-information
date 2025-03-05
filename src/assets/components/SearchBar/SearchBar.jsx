import axios from "axios";
import React, {useState} from "react";
import "./SearchBar.css";
import ReactCountryFlag from 'react-country-flag';


export const SearchBar = ({countries, onSelectCountry}) => {
    const [searchValue, setSearchValue] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchSingleCountryInfo(input) {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/name/${input}?fields=flags,name,subregion,capital,population,borders,tld`);
            setResult(response.data[0]);
        } catch (e) {
            console.error(e);
            setResult(null);
            setError("Country not found. Please try another search.");
        } finally {
            setLoading(false);
        }
    }

    function handleSearch() {
        if (searchValue.trim()) {
            fetchSingleCountryInfo(searchValue).catch(e => {
                console.error("Error in search:", e);
                setError("An unexpected error occurred");
            });
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    function formatBorders(borders) {
        if (!borders || borders.length === 0) {
            return "no";
        }

        if (borders.length === 1) {
            return `${borders[0]}`;
        }

        return borders.slice(0, -1).join(", ") + " and " + borders[borders.length - 1];
    }

    function formatPopulation(population) {
        if (population >= 1000000) {
            return `${(population / 1000000).toFixed(1)} million`;
        }
        return population.toLocaleString();
    }

    return (
        <div className="search-bar">
            <div className="search-input-group">
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading && <div className="search-loading">Searching...</div>}
            {error && <div className="search-error">{error}</div>}

            {result && !loading && (
                <div className="search-result">
                    <div className="result-header">
                        <img
                            src={result.flags.svg}
                            alt={result.flags.alt || `Flag of ${country.name.common}`}
                        />
                        <h3>{result.name.common}</h3>
                    </div>
                    <p>{result.name.common} is situated in {result.subregion || "N/A"} and the capital
                                            is {result.capital?.[0] || "N/A"}</p>
                    <p>It has a population of {formatPopulation(result.population)} and it borders
                       with {formatBorders(result.borders)} neighboring countries</p>
                    <p>Websites can be found
                       on {Array.isArray(result.tld) ? result.tld.join(", ") : result.tld} domain{result.tld?.length !== 1 ? 's' : ''}</p>
                </div>
            )}
        </div>
    );
};
