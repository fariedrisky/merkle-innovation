/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}" /* src folder, for example */,
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Onest", "sans"],
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
