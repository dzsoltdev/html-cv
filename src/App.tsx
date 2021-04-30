import React, {useState} from 'react';
import {Helmet} from 'react-helmet'

import {AppModeContext, APP_MODE} from "./hooks/useAppMode";
import Header from "./components/Header";
import Content from "./Content";

function App() {
  const [appMode, setAppMode] = useState(APP_MODE.DEFAULT);

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
    </AppModeContext.Provider>
  );
}

export default App;
