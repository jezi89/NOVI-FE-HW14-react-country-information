export function countryTextColor(continent) {
    switch (continent) {
        case "Africa":
            return "blue";
        case "Americas":
            return "green";
        case "Asia":
            return "red";
        case "Europe":
            return "yellow";
        case "Oceania":
            return "purple";
        default:
            return "black";
    }
}
