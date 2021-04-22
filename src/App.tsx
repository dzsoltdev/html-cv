import React, {useState} from 'react';

import {AppModeContext, APP_MODE} from "./hooks/useAppMode";
import Header from "./components/Header";
import Content from "./Content";

function App() {
  const [appMode, setAppMode] = useState(APP_MODE.DEFAULT);

  return (
    <AppModeContext.Provider value={{appMode, setAppMode}}>
      <div className="App">
        <Header />
        <Content />
      </div>
    </AppModeContext.Provider>
  );
}

export default App;
