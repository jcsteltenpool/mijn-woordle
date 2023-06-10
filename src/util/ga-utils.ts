import ReactGA from "react-ga4";

export const initGA = (id: string) => {
    // ReactGA.initialize(id);

    if (process.env.NODE_ENV === "production") {
        ReactGA.initialize(id);
    }
}