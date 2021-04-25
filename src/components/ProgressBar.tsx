import React from "react";

class ProgressBarProps {
  value: number = 0;
  label?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  const {value, label} = props;

  const style = { "--width": `${Math.min(100, Math.max(0, value))}%` } as React.CSSProperties;
  return <div className={'progress-bar-container'}>
    {label && <label>{label}</label>}
    <div className={'progress-bar'} data-convert-to-canvas={true} style={style}/>
  </div>;
}

export default ProgressBar;
