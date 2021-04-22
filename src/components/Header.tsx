import React, {useCallback} from "react";
import {AppBar, Toolbar, FormControlLabel, Switch, IconButton, Button} from '@material-ui/core';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import classNames from "classnames";

// @ts-ignore
import domToPdf from 'dom-to-pdf';

import {APP_MODE, useAppMode} from "../hooks/useAppMode";

const Header = () => {
  const { appMode, setAppMode } = useAppMode();

  const handleExport = useCallback(() => {
    let cv = document.getElementById('cv-content');

    if(cv) {
      let options = {
        filename: 'dobak_zsolt_cv.pdf',
        overrideWidth: cv.getBoundingClientRect().width
      };

      domToPdf(cv, options, function() {
        console.log('done');
      });
    }
  },[]);

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
        <div className={classNames('export', {disabled: appMode !== APP_MODE.EXPORT})} onClick={handleExport}><CloudDownloadOutlinedIcon /></div>
      </div>
    </Toolbar>
  </AppBar>;
}

export default Header;