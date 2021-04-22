import React, {useLayoutEffect, useRef} from "react";
import classNames from "classnames";
import {Avatar} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin, faStackOverflow} from '@fortawesome/free-brands-svg-icons';

import profilePicture from './assets/images/zsolt-dobak.jpg';

import ContentPage from "./components/ContentPage";
import Separator from "./components/Separator";
import ProgressBar from "./components/ProgressBar";
import {useAppMode, APP_MODE} from "./hooks/useAppMode";

const Content = () => {
  const { appMode } = useAppMode();

  const contentRef = useRef<any>();

  useLayoutEffect(() => {
    const a4Height = 595.28;
    const a4Width = 841.89;
    const innerRatio = a4Height / a4Width;

    const rect = contentRef.current.getBoundingClientRect();

    // contentRef.current.style.height = `${rect.width * innerRatio}px`;
    const zoom = Math.floor(rect.width / a4Height);
    contentRef.current.style.height = `${a4Width * zoom}px`;
    contentRef.current.style.width = `${a4Height * zoom}px`;
  }, []);

  return <div className={'content-wrapper'}>
    <div ref={contentRef} className={classNames('content', {export: appMode === APP_MODE.EXPORT})} id={'cv-content'}>
      <ContentPage highlights={
        <>
          <section className={'centered'}>
            <Avatar className={'avatar'} alt={'Zsolt Dobák'} src={profilePicture}/>
            <div className={'title'}>Zsolt Dobák</div>
            <Separator />
            <div className={'sub-title'}>Principal UI and mobile developer @ Oracle</div>
          </section>

          <section>
            <div className={'label'}>Contacts</div>
            <div><a href={'tel:+36202814270'}>+36202814270</a></div>
            <div><a href={'mailto:dzsolt87@gmail.com'}>dzsolt87@gmail.com</a></div>
          </section>

          <section>
            <div className={'label'}>Data / Place of birth</div>
            <div>1987. 06. 08.</div>
            <div>Budapest</div>
          </section>

          <section>
            <div className={'label'}>Community</div>
            <div className={'links'}>
              <a href={'https://www.linkedin.com/in/zsolt-dobak'} target={'_blank'}>
                <FontAwesomeIcon icon={faLinkedin} size={'2x'} />
              </a>
              <a href={'https://github.com/dzsoltdev'} target={'_blank'}>
                <FontAwesomeIcon icon={faGithub} size={'2x'} />
              </a>
              <a href={'https://stackoverflow.com/users/14992691/zsolt-dobak'} target={'_blank'}>
                <FontAwesomeIcon icon={faStackOverflow} size={'2x'} />
              </a>
            </div>
          </section>

          <section>
            <div className={'label'}>Top Tech. stack</div>
            <div>HTML, CSS, JavaScript, TypeScript</div>
            <div>React, redux, SCSS</div>
            <div>npm, webpack, Jenkins</div>
          </section>

          <section>
            <div className={'label'}>Skills</div>
            <ProgressBar value={100} label={'Build webapp from scratch'} />
            <ProgressBar value={100} label={'Adapting to new technologies'} />
            <ProgressBar value={100} label={'Problem solving'} />
            <ProgressBar value={100} label={'Investigating bugs'} />
            <ProgressBar value={65} label={'Automated software testing'} />
            <ProgressBar value={50} label={'Mentoring'} />
            <ProgressBar value={70} label={'Architectural planning'} />
            <ProgressBar value={75} label={'Work with agile methodologies'} />
          </section>

          <section>
            <div className={'label'}>Languages</div>
            <ProgressBar value={60} label={'English'} />
          </section>

          <section>
            <div className={'label'}>Hobbies</div>
            <div>Football, sailing, snowboard, trips</div>
          </section>
        </>
      }
      />
    </div>
  </div>
}

export default Content;