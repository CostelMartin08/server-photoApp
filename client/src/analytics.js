import ReactGA from 'react-ga4';

const areCookiesSet = () => {
  const consentCookie = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
  return consentCookie && consentCookie.split('=')[1] === 'true';
};

export const initializeGA = () => {

  ReactGA.initialize([
    {
      trackingId: "G-EZETLQXW9Q",
     // gaOptions: { testMode: true }
    }
  ]);
};

export const logPageView = (pageName) => {
  if (areCookiesSet()) {
  ReactGA.send({
    hitType: "pageview",
    page: pageName,
    title: pageName,
  });
  }
};

export const logEventView = (action) => {
  if (areCookiesSet()) {
  ReactGA.event({
    category: "User Interaction",
    action: action,
  });
  }
}

export function deleteAnalyticsCookies() {

  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const equalsPosition = cookie.indexOf("=");
    const name = equalsPosition > -1 ? cookie.substr(0, equalsPosition) : cookie;
    const trimmedName = name.trim();

    if (trimmedName.startsWith('_ga') || trimmedName.startsWith('_ga_') || trimmedName.startsWith('_gid') || trimmedName.startsWith('_gat')) {

      document.cookie = `${trimmedName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
      document.cookie = `${trimmedName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=balanandrei.ro`;
    }

    ReactGA.ga('set', 'sendHitTask', null);

  });
}
