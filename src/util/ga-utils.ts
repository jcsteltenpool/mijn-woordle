import ReactGA from "react-ga4";

export const initGA = (id: string) => {
    ReactGA.initialize("G-12MS71069J");

    // if (process.env.NODE_ENV === "production") {
    //     ReactGA.initialize(id);
    // }
}