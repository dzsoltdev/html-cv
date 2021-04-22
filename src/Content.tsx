import React from "react";
import {Avatar, Size} from "@material-ui/core";

import profilePicture from './assets/images/zsolt-dobak.jpg';

import ContentPage from "./components/ContentPage";

const Content = () => {
  return <div className={'content'}>
    <ContentPage highlights={
      <>
        <section>
          <Avatar className={'avatar'} alt={'Zsolt Dobák'} src={profilePicture}/>
          <div className={'title'}>Dobák Zsolt</div>
          <div>Principal UI and mobile developer @ Oracle</div>
        </section>
      </>
    }
    />
  </div>
}

export default Content;