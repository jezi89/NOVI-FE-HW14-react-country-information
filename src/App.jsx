import './App.css';
            import { useState } from 'react';
            import axios from 'axios';
            // Import will work once you add the image to assets folder
            import worldMap from './assets/world_map.png';

            function App() {
              const [countries, setCountries] = useState([]);
              const [countryDetail, setCountryDetail] = useState(null);
              const [loading, setLoading] = useState(false);
              const [error, setError] = useState(null);
              const [searchTerm, setSearchTerm] = useState('');
              const [activeTab, setActiveTab] = useState('all'); // 'all' or 'search'

              // Helper function to determine color based on region
              const getRegionColor = (region) => {
                switch (region) {
                  case 'Africa':
                    return 'blue';
                  case 'Americas':
                    return 'green';
                  case 'Asia':
                    return 'red';
                  case 'Europe':
                    return 'yellow';
                  case 'Oceania':
                    return 'purple';
                  default:
                    return 'gray';
                }
              };

              // Helper function to convert population to millions
              const formatPopulationInMillions = (population) => {
                return Math.round(population / 1000000 * 10) / 10;
              };

              const fetchAllCountries = async () => {
                setLoading(true);
                try {
                  const response = await axios.get('https://restcountries.com/v3.1/all?fields=flags,name,population,region');
                  // Sort countries by population (low to high)
                  const sortedCountries = response.data.sort((a, b) => a.population - b.population);
                  setCountries(sortedCountries);
                  setError(null);
                  setActiveTab('all');
                } catch (err) {
                  setError('Failed to fetch countries data');
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              };

              const searchCountry = async (e) => {
                e.preventDefault();

                if (!searchTerm.trim()) return;

                setLoading(true);
                try {
                  const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
                  setCountryDetail(response.data[0]);
                  setError(null);
                  setActiveTab('search');
                  setSearchTerm('');
                } catch (err) {
                  setError(`${searchTerm} bestaat niet. Probeer het opnieuw`);
                  setCountryDetail(null);
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              };

              return (
                <div className="app-container">
                  <header>
                    <img src={worldMap} alt="World Map" className="world-map" />
                    <h1>Country Information App</h1>
                  </header>

                  <nav className="tabs">
                    <button
                      className={activeTab === 'all' ? 'active' : ''}
                      onClick={() => setActiveTab('all')}
                    >
                      All Countries
                    </button>
                    <button
                      className={activeTab === 'search' ? 'active' : ''}
                      onClick={() => setActiveTab('search')}
                    >
                      Search Country
                    </button>
                  </nav>

                  {activeTab === 'all' && (
                    <>
                      {countries.length === 0 && (
                        <div className="button-container">
                          <button onClick={fetchAllCountries} disabled={loading}>
                            {loading ? 'Loading...' : 'Show All Countries'}
                          </button>
                        </div>
                      )}

                      {error && <p className="error">{error}</p>}

                      {countries.length > 0 && (
                        <ul className="countries-list">
                          {countries.map((country) => (
                            <li key={country.name.common} className="country-item">
                              <img
                                src={country.flags.svg}
                                alt={`Flag of ${country.name.common}`}
                                className="country-flag"
                              />
                              <div className="country-info">
                                <h2 style={{ color: getRegionColor(country.region) }}>
                                  {country.name.common}
                                </h2>
                                <p>Has a population of {country.population.toLocaleString()} people</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}

                  {activeTab === 'search' && (
                    <div className="search-container">
                      <form onSubmit={searchCountry}>
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Enter country name..."
                        />
                        <button type="submit" disabled={loading}>
                          {loading ? 'Searching...' : 'Search'}
                        </button>
                      </form>

                      {error && <p className="error">{error}</p>}

                      {countryDetail && (
                        <div className="country-detail">
                          <div className="country-header">
                            <img
                              src={countryDetail.flags.svg}
                              alt={`Flag of ${countryDetail.name.common}`}
                              className="detail-flag"
                            />
                            <h2>{countryDetail.name.common}</h2>
                          </div>

                          <p>
                            {countryDetail.name.common} is situated in {countryDetail.subregion} and the capital is {countryDetail.capital?.[0] || 'unknown'}
                          </p>

                          <p>
                            It has a population of {formatPopulationInMillions(countryDetail.population)} million people
                            and it borders with {countryDetail.borders?.length || 0} neighboring countries
                          </p>

                          <p>
                            Websites can be found on {countryDetail.tld?.[0] || 'unknown'} domain's
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            export default App;
