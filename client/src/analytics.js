
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-EZETLQXW9Q'); 
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
