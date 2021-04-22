import React from "react";
import {AppBar, Toolbar, FormControlLabel, Switch} from '@material-ui/core';

import {APP_MODE, useAppMode} from "../hooks/useAppMode";

const Header = () => {
  const { appMode, setAppMode } = useAppMode();

  return <AppBar position={'relative'}>
    <Toolbar className={'toolbar'}>
      <title>Zsolt Dobák's interactive CV</title>
      <div className={'title'}>Zsolt Dobák's interactive CV</div>
      <div className={'controls'}>
        <FormControlLabel value={'start'}
                          label={`Switch to ${appMode === APP_MODE.DEFAULT ? 'export' : 'default'} mode`}
                          labelPlacement={'start'}
                          control={<Switch size={'small'}
                                           color={'default'}
                                           checked={appMode === APP_MODE.EXPORT}
                                           onChange={() => setAppMode(appMode === APP_MODE.DEFAULT ? APP_MODE.EXPORT : APP_MODE.DEFAULT)}/>}
        />
      </div>
    </Toolbar>
  </AppBar>;
}

export default Header;