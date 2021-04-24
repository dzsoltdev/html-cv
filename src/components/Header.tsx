import React, {useCallback} from "react";
import {AppBar, Toolbar, FormControlLabel, Switch} from '@material-ui/core';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import classNames from "classnames";
import {isBrowser} from "react-device-detect";

import {APP_MODE, useAppMode} from "../hooks/useAppMode";
import ExportDomToPdf from "../tools/exportDomToPdf";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { appMode, setAppMode } = useAppMode();

  const handleExport = useCallback(() => {
    let cv = document.getElementById('cv-content');

    if(cv) {
      let options = {
        fileName: 'dobak_zsolt_cv.pdf',
      };

      ExportDomToPdf.export(cv, options)
    }
  },[]);

  return <AppBar position={'relative'}>
    <Toolbar className={'toolbar'}>
      <title>Zsolt Dobák's interactive CV</title>
      <div className={'title'}>Zsolt Dobák's interactive CV</div>
      {isBrowser && <div className={'controls'}>
        <FormControlLabel value={'start'}
                          label={`Switch to ${appMode === APP_MODE.DEFAULT ? 'export' : 'default'} mode`}
                          labelPlacement={'start'}
                          control={<Switch size={'small'}
                                           color={'default'}
                                           checked={appMode === APP_MODE.EXPORT}
                                           onChange={() => setAppMode(appMode === APP_MODE.DEFAULT ? APP_MODE.EXPORT : APP_MODE.DEFAULT)}/>}
        />
        {appMode === APP_MODE.EXPORT && <label className={'warning'}>
          <FontAwesomeIcon icon={faExclamationTriangle} size={'sm'}/>
          This feature is under development
        </label>}
        <div className={classNames('export', {disabled: appMode !== APP_MODE.EXPORT})} onClick={handleExport}>
          <CloudDownloadOutlinedIcon/>
        </div>
      </div>}
    </Toolbar>
  </AppBar>;
}

export default Header;