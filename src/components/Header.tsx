import React, {lazy, Suspense} from "react";
import {AppBar, Toolbar} from '@material-ui/core';
import {isBrowser} from "react-device-detect";

const HeaderControlsLazy = lazy(() => import('./HeaderControls'));

const Header = () => {
  return <AppBar position={'relative'}>
    <Toolbar className={'toolbar'}>
      <title>Zsolt Dobák's interactive CV</title>
      <div className={'title'}>Zsolt Dobák's interactive CV</div>
      {isBrowser && <Suspense fallback={<div />}><HeaderControlsLazy /></Suspense>}
    </Toolbar>
  </AppBar>;
}

export default Header;