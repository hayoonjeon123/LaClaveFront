export const SERVER_URL = "http://localhost:8080";

export const COLOR_MAP: Record<string, string> = {
    "black": "#000000",
    "white": "#FFFFFF",
    "gray": "#808080",
    "grey": "#808080",
    "red": "#FF0000",
    "blue": "#0000FF",
    "navy": "#000080",
    "beige": "#F5F5DC",
    "ivory": "#FFFFF0",
    "brown": "#A52A2A",
    "light_denim": "#A8C1D8",
    "mid_denim": "#5A7A9C",
    "dark_denim": "#2B3E58",
    "black_denim": "#323232"
};

export const getSafeColor = (colorName: any) => {
    if (!colorName || typeof colorName !== "string") return "transparent";
    if (colorName.startsWith("#")) return colorName;
    const cleanName = colorName.replace("색상", "").toLowerCase().trim();
    return COLOR_MAP[cleanName] || colorName;
};

export const formatPrice = (price: any) => {
    if (price === null || price === undefined) return "0원";
    return Number(price).toLocaleString() + "원";
};

export const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "FREE"];

export const COLOR_TO_EN: Record<string, string> = {
    black: "Black",
    white: "White",
    gray: "Gray",
    grey: "Gray",
    red: "Red",
    blue: "Blue",
    navy: "Navy",
    brown: "Brown",
    ivory: "Ivory",
    beige: "Beige"
};

export const sortSizes = (sizes: string[]) => {
    if (!sizes) return [];
    return [...sizes].sort((a, b) => {
        const indexA = SIZE_ORDER.indexOf(a.toUpperCase());
        const indexB = SIZE_ORDER.indexOf(b.toUpperCase());
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
};

export const getDisplayColor = (name: string) => {
    if (!name) return "";
    const cleanName = name.replace("색상", "").trim();
    return COLOR_TO_EN[cleanName] || cleanName;
};
