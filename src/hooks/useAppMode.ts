import { createContext, useContext } from 'react';

export enum APP_MODE {
  DEFAULT= 'default',
  EXPORT = 'export'
}

export type AppModeContextType = {
  appMode: APP_MODE;
  setAppMode: Function;
}

export const AppModeContext = createContext<AppModeContextType>({ appMode: APP_MODE.DEFAULT, setAppMode: () => console.warn('add app mode setter')});
export const useAppMode = () => useContext(AppModeContext);