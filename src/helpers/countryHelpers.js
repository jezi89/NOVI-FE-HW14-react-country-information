export function hasCountries(countriesLength) {
    return countriesLength !== 0;
}

export function shouldDisplayCountries(countriesLength, showCountries) {
    return hasCountries(countriesLength) && showCountries;
}

export function getMainWrapperClass(showCountries) {
    return `main-wrapper ${!showCountries ? "hide" : ""}`;
}

export function longCountryNameHelper(name) {
    const isLong = name.length > 20;
    return {
        displayName: isLong ? name.substring(0, 20) + "..." : name,
        fullName: name,
        isLong: isLong
    };
}

export function setCountryButtonHelper(countriesLength, showCountries) {
    return countriesLength === 0 ? "Fetch All Countries" :
        showCountries ? "Hide Country List" : "Set Country List";
}

// You can add more helper functions here as needed
