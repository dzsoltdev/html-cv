import React, {ReactNode} from "react";
import {Paper} from "@material-ui/core";
import classNames from "classnames";
import {isMobileOnly} from "react-device-detect";

import {APP_MODE, useAppMode} from "../hooks/useAppMode";

class ContentPageProps {
  highlights?: ReactNode;
  details?: ReactNode
}

const ContentPage = (props: ContentPageProps) => {
  const { appMode } = useAppMode();
  const {highlights, details} = props;

  return <Paper elevation={3}
                className={classNames('content-page', {
                  mobile: isMobileOnly,
                  export: appMode === APP_MODE.EXPORT
                })}>
    <div className={'highlights'}>{highlights}</div>
    <div className={'details'}>{details}</div>
  </Paper>
}

export default ContentPage;