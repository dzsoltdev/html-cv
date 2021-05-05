import React, {useCallback, useState} from "react";
import {FormControlLabel, Switch, CircularProgress} from "@material-ui/core";
import {APP_MODE, useAppMode} from "../hooks/useAppMode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';

const HeaderControls = () => {
  const {appMode, setAppMode} = useAppMode();

  const [exportInProgress, setExportInProgress] = useState(false);

  const handleExport = useCallback(async () => {
    let cv = document.getElementById('cv-content');

    if (cv) {
      const {ExportDomToPdf, paperSizes} = await import("../tools/exportDomToPdf");

      let options = {
        fileName: 'dobak_zsolt_cv.pdf',
        paperSize: paperSizes.A4,
        fittingPaperSize: paperSizes.A2,
        contentMargin: 64,
        setProgressState: setExportInProgress
      };

      ExportDomToPdf.export(cv, options);
    }
  }, []);

  return <div className={'controls'}>
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
      {!exportInProgress && <CloudDownloadOutlinedIcon/>}
      {exportInProgress && <CircularProgress className={'download-progress'} size={24}/>}
    </div>
  </div>
};

export default HeaderControls;