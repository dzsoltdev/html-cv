import React, {ReactNode} from "react";
import {Paper} from "@material-ui/core";
import classNames from "classnames";

import {APP_MODE, useAppMode} from "../hooks/useAppMode";

class ContentPageProps {
  highlights?: ReactNode;
  details?: ReactNode
}

const ContentPage = (props: ContentPageProps) => {
  const { appMode } = useAppMode();
  const {highlights, details} = props;

  return <Paper elevation={appMode === APP_MODE.DEFAULT ? 3 : 0} className={classNames('content-page', {export: appMode === APP_MODE.EXPORT})}>
    <div className={'highlights'}>{highlights}</div>
    <div className={'details'}>{details}</div>
  </Paper>
}

export default ContentPage;