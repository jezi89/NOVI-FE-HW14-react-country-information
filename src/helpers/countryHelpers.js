export function hasCountries(countriesLength) {
    return countriesLength !== 0;
}

export function shouldDisplayCountries(countriesLength, showCountries) {
    return hasCountries(countriesLength) && showCountries;
}


export function longCountryNameHelper(name) {
    const isLong = name.length > 25;
    return {
        displayName: isLong ? name.substring(0, 24) + "..." : name,
        fullName: name,
        isLong: isLong
    };
}

export function setCountryButtonHelper(countriesLength, showCountries) {
    return countriesLength === 0 ? "Fetch All Countries" :
        showCountries ? "Hide Countries ↑" : "Show Countries ↓";
}

// You can add more helper functions here as needed
