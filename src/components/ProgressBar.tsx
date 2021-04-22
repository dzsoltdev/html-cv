import React from "react";
import {Line} from 'rc-progress';

class ProgressBarProps {
  value: number = 0;
  label?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {value, label} = props;

  return <>
    {label && <label>{label}</label>}
    <Line className={'progress-bar'}
          percent={value}
          strokeWidth={2}
          trailWidth={2}
          strokeColor="#FCFBFA"
          trailColor="rgba(252, 251, 250, 0.4)"
    />
  </>;
}

export default ProgressBar;
