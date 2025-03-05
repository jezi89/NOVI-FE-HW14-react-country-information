export function countryTextColor(continent) {
    const americas = ['North America', 'South America'];

    if (americas.includes(continent)) {
        return {color: "#053225"};
    }

    const colors = {
        "Africa": "#30638e",
        "Asia": "#a91101",
        "Europe": "#c38f45",
        "Oceania": "#331832",
        default: "black",
    }


    return {
        color: colors[continent] || colors["default"],
    };
}
