import axios from 'axios';

async function fetchCountryData() {
    const result = await axios.get('https://restcountries.com/v3.1/all?fields=flag,name,population');
    console.log(result.data);
}

fetchCountryData()
