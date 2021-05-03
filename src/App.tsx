import React, {useCallback, useState} from 'react';
import {Helmet} from 'react-helmet';
import CookieConsent from "react-cookie-consent";

import {AppModeContext, APP_MODE} from "./hooks/useAppMode";
import Header from "./components/Header";
import Content from "./Content";

function App() {
  const [appMode, setAppMode] = useState(APP_MODE.DEFAULT);

  const onAllowCookies = useCallback(() => {
    const windowObject: any = window;
    windowObject.firebase.analytics();
  }, []);

  return (
    <AppModeContext.Provider value={{appMode, setAppMode}}>
      <Helmet>
        <title>Zsolt Dobák Frontend developer interactive CV</title>
        <meta name="description" content="Are you looking for an experienced frontend developer?
        Or just looking for an example, how a well detailed CV looks like? Let's visit my page!" />
      </Helmet>
      <div className="App">
        <Header />
        <Content />
      </div>
      <CookieConsent disableStyles
                     overlay
                     expires={3650}
                     flipButtons
                     buttonText={'I accept'}
                     onAccept={onAllowCookies}
                     enableDeclineButton
                     overlayClasses={'cookie-overlay'}
                     containerClasses={'cookie-banner-container'}
                     contentClasses={'content'}
                     buttonWrapperClasses={'controls'}
                     buttonClasses={'button primary'}
                     declineButtonClasses={'button secondary'}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </AppModeContext.Provider>
  );
}

export default App;
