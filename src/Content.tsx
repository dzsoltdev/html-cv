import React, {useCallback, useState} from "react";
import classNames from "classnames";
import remove from 'lodash/remove';
import {Avatar, Accordion, AccordionSummary, AccordionDetails, Tooltip} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faLinkedin, faStackOverflow} from '@fortawesome/free-brands-svg-icons';
import {faPhoneAlt, faEnvelope, faGlobeAmericas, faChevronDown} from "@fortawesome/free-solid-svg-icons";

import profilePicture from './assets/images/zsolt-dobak.jpg';

import ContentPage from "./components/ContentPage";
import Separator from "./components/Separator";
import ProgressBar from "./components/ProgressBar";
import {useAppMode, APP_MODE} from "./hooks/useAppMode";

enum ACCORDIONS {
  FREELANCER = 'FREELANCER',
  ORACLE = 'ORACLE',
  ORACLE_LEAD = 'ORACLE_LEAD',
  ICT = 'ICT',
  NOKIA = 'NOKIA',
}

const Content = () => {
  const {appMode} = useAppMode();

  const [openedAccordions, setOpenedAccordions] = useState<Array<string>>([]);

  const handleOpenAccordion = useCallback((accordionId: string) => {
    let updatedState = [...openedAccordions];

    if (openedAccordions.includes(accordionId)) {
      remove(updatedState, (id => id === accordionId));
    } else {
      updatedState.push(accordionId);
    }

    setOpenedAccordions(updatedState);

  }, [openedAccordions]);

  const isAccordionExpanded = useCallback((accordionId: string) => {
    return openedAccordions.includes(accordionId) || appMode === APP_MODE.EXPORT;
  }, [openedAccordions, appMode]);

  return <div className={'content-wrapper'}>
    <div className={classNames('content', {export: appMode === APP_MODE.EXPORT})} id={'cv-content'}>
      <ContentPage
        highlights={<>
          <section className={'centered'}>
            <Avatar className={'avatar'} alt={'Zsolt Dobák'} src={profilePicture}/>
            <div className={'title'}>Zsolt Dobák</div>
            <Separator/>
            <div className={'sub-title'}>Frontend team lead and tech lead @ Oracle</div>
          </section>

          <section>
            <div className={'label'}>Contacts</div>
            <div className={'contacts'}>
              <a href={'tel:+36202814270'}>
                <FontAwesomeIcon icon={faPhoneAlt} size={'sm'}/>
                <label>+36202814270</label>
              </a>
              <a href={'mailto:dzsolt87@gmail.com'}>
                <FontAwesomeIcon icon={faEnvelope} size={'sm'}/>
                <label>dzsolt87@gmail.com</label>
              </a>
              <a href={'https://zsolt-dobak.web.app/'} target={'_blank'} rel="noreferrer">
                <FontAwesomeIcon icon={faGlobeAmericas} size={'sm'}/>
                <label>zsolt-dobak.web.app</label>
              </a>
            </div>
          </section>

          <section>
            <div className={'label'}>Data / Place of birth</div>
            <div>1987. 06. 08.</div>
            <div>Budapest</div>
          </section>

          <section>
            <div className={'label'}>Community</div>
            <div className={'links'}>
              <a href={'https://www.linkedin.com/in/zsolt-dobak'} target={'_blank'} rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size={'2x'}/>
                {appMode === APP_MODE.EXPORT && <label>linkedin.com/in/zsolt-dobak</label>}
              </a>
              <a href={'https://github.com/dzsoltdev'} target={'_blank'} rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size={'2x'}/>
                {appMode === APP_MODE.EXPORT && <label>github.com/dzsoltdev</label>}
              </a>
              <a href={'https://stackoverflow.com/users/14992691/zsolt-dobak'} target={'_blank'} rel="noreferrer">
                <FontAwesomeIcon icon={faStackOverflow} size={'2x'}/>
                {appMode === APP_MODE.EXPORT && <label>stackoverflow.com/users/14992691/zsolt-dobak</label>}
              </a>
            </div>
          </section>

          <section>
            <div className={'label'}>Top Tech. stack</div>
            <div>HTML, CSS, JavaScript, TypeScript</div>
            <div>React, redux, SCSS, REST API</div>
            <div>npm, webpack, git, Jenkins</div>
          </section>

          <section>
            <div className={'label'}>Skills</div>
            <ProgressBar value={100} label={'Build webapp from scratch'}/>
            <ProgressBar value={100} label={'Adapting to new technologies'}/>
            <ProgressBar value={100} label={'Problem solving'}/>
            <ProgressBar value={100} label={'Investigating bugs'}/>
            <ProgressBar value={75} label={'Automated software testing'}/>
            <ProgressBar value={70} label={'Mentoring'}/>
            <ProgressBar value={80} label={'Architectural planning'}/>
            <ProgressBar value={85} label={'Work with agile methodologies'}/>
          </section>

          <section>
            <div className={'label'}>Languages</div>
            <ProgressBar value={70} label={'English'}/>
          </section>

          <section>
            <div className={'label'}>Hobbies</div>
            <div>Football, sailing, snowboard, trips</div>
          </section>
        </>}

        details={<>
          <section>
            <div className={'title'}>Career Highlight</div>
            <div>I am a frontend-focused engineer, eager to find the best solutions for the most challenging tasks -
              this is what really keeps me motivated in my job. I am not afraid of working on projects with new
              frameworks and technologies
              since I believe a steep learning curve fosters development very effectively. My preferred framework is
              React, I'm working with it since 2015 and
              I think it's very easy to learn and understand its fundamentals.
            </div>
          </section>

          <section>
            <div className={'title'}>Education</div>
            <div className={'sub-title'}>Engineering Information Technologist BSc</div>
            <div>Specialization: Mobile informatics</div>
            <div>Óbuda University John von Neumann Faculty of Informatics</div>
            <div>2010 - 2015</div>

            <div className={'sub-title'}>Technical informatics engineer assistant (higher vocational training)</div>
            <div>Szent György Media and Informatics Technical College</div>
            <div>2008 - 2010</div>

            <div className={'sub-title'}>Electrical engineer BSc (not completed)</div>
            <div>Budapest University of Technology and Economics</div>
            <div>2006 - 2008</div>
          </section>

          <section>
            <div className={'title'}>Courses</div>
            <div className={'sub-title'}>Microsoft 70-583 (Pro: Designing and Developing Microsoft Azure Application)
            </div>
            <div>2014</div>
          </section>

          <section data-breakpoint={true}>
            <div className={'title'}>Employment History</div>
            <div>
              <Accordion className={classNames('accordion-container', {export: appMode === APP_MODE.EXPORT})}
                         expanded={isAccordionExpanded(ACCORDIONS.FREELANCER)}>
                <AccordionSummary
                  onClick={() => handleOpenAccordion(ACCORDIONS.FREELANCER)}
                  className={'accordion-summary'}
                  expandIcon={appMode !== APP_MODE.EXPORT && <FontAwesomeIcon icon={faChevronDown} size={'xs'}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Tooltip title={isAccordionExpanded(ACCORDIONS.FREELANCER) ? '' : 'Click to see projects'}>
                    <div className={'summary'}>
                      <div className={'sub-title'}>Freelance Web Developer</div>
                      <div>2019 - Present</div>
                    </div>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={'accordion-details'}>
                  <div className={'title'}>Projects</div>

                  <section>
                    <div className={'sub-title'}>ProMed Bt's webpage</div>
                    <a className={'info'} href={'https://promedbt.hu/'} target={'_blank'} rel="noreferrer">https://promedbt.hu</a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, React, npm, GitHub, Firebase</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        I've made this small web app, written in ReactJS with a simple design to the ProMed Bt.
                        It was a special project for me, because as a freelancer, I was the only responsible for the entire
                        project, including the communication
                        with customer about the needs and also about the opinions.
                        I extended the design and the features continuously, following the agile methodology and also made
                        the deployment to Firebase.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>EvoSol 2020 Ltd's webpage</div>
                    <a className={'info'} href={'https://evosol.hu/'} target={'_blank'} rel="noreferrer">https://evosol.hu</a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, TypeScript, React, npm, GitHub, Firebase, Cloudinary, Google Maps</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        It was my second freelancer project, with much more feature like the previous one.
                        It is also written in React with TypeScript, but focused on attracting customers to improve publicity.
                        For the best user experience, I implemented animated loaders for images, used
                        <a href={'https://cloudinary.com/'} target={'_blank'} rel="noreferrer"> Cloudinary</a> as a gallery components, which
                        uses CDN to improve customer setiscafction. I also integrated Google Maps and finally launched in Firebase as well as the
                        previous project.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>My own webpage</div>
                    <a className={'info'} href={'https://zsolt-dobak.web.app/'} target={'_blank'} rel="noreferrer">https://zsolt-dobak.web.app</a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, TypeScript, React, npm, GitHub, Firebase, jsPdf, Codacy, Google Analytics, SEO</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        After a lot of experimentals with CV templates and generators, I thought, why not to implement my CV as webapp? So I've started
                        to implement my own webpage to provide a summary of my carrier as I expected. It has a setisfying feature to export the content to PDF
                        as well. The projet is open source, so You can check it out on <a href={'https://github.com/dzsoltdev/html-cv'} target={'_blank'} rel="noreferrer">GitHub</a>.
                      </p>
                    </div>
                  </section>
                </AccordionDetails>
              </Accordion>
            </div>

            <div data-breakpoint={true}>
              <Accordion className={classNames('accordion-container', {export: appMode === APP_MODE.EXPORT})}
                         expanded={isAccordionExpanded(ACCORDIONS.ORACLE_LEAD)}>
                <AccordionSummary
                  onClick={() => handleOpenAccordion(ACCORDIONS.ORACLE_LEAD)}
                  className={'accordion-summary'}
                  expandIcon={appMode !== APP_MODE.EXPORT && <FontAwesomeIcon icon={faChevronDown} size={'xs'}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Tooltip title={isAccordionExpanded(ACCORDIONS.ORACLE_LEAD) ? '' : 'Click to see projects'}>
                    <div className={'summary'}>
                      <div className={'sub-title'}>Frontend team and tech lead at Oracle</div>
                      <div>January, 2022 - Present</div>
                      <a className={'info'} href={'https://www.oracle.com/'} target={'_blank'} rel="noreferrer">https://www.oracle.com</a>
                    </div>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={'accordion-details'}>
                  <div className={'title'}>Role Summary</div>

                  <section>
                    <div>
                      <p>
                        As the CSP project (you can read more about it in the next section) became more and more successful, the development team have been started to grow and been separated to smaller teams.
                        I actively supported my line manager to coordinate UI development and as the team separation happened,
                        I've got the promotion to be the lead of the frontend team. Naturally, my roles changed with the promotion and now I'm the responsible to keep an
                        eye on frontend team's work, organize meetings, take care on knowledge share and support colleauges' personal development as well as to report to
                        the line manager.
                      </p>
                    </div>
                  </section>
                </AccordionDetails>
              </Accordion>
            </div>

            <div data-breakpoint={true}>
              <Accordion className={classNames('accordion-container', {export: appMode === APP_MODE.EXPORT})}
                         expanded={isAccordionExpanded(ACCORDIONS.ORACLE)}>
                <AccordionSummary
                  onClick={() => handleOpenAccordion(ACCORDIONS.ORACLE)}
                  className={'accordion-summary'}
                  expandIcon={appMode !== APP_MODE.EXPORT && <FontAwesomeIcon icon={faChevronDown} size={'xs'}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Tooltip title={isAccordionExpanded(ACCORDIONS.ORACLE) ? '' : 'Click to see projects'}>
                    <div className={'summary'}>
                      <div className={'sub-title'}>Principal UI and mobile developer and Frontend tech lead at Oracle</div>
                      <div>November, 2019 - December, 2021</div>
                      <a className={'info'} href={'https://www.oracle.com/'} target={'_blank'} rel="noreferrer">https://www.oracle.com</a>
                    </div>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={'accordion-details'}>
                  <div className={'title'}>Role Summary</div>

                  <section>
                    <div>
                      <p>
                        Do to my ability to solve architectural issues and suggest solutions to the most difficult
                        business needs, I've become the tech lead of the frontend part of the team.
                        My duties expanded with creating POCs and giving suggestions to aid business decision for the new features,
                        collaborate with the UX team to find out the most user friendly components, which also can be developed quickly,
                        participating on UI reviews, educating teammates to coding practicies, improving the frontend CI/CD workflow
                        and I'm also involved into the hiring process.
                      </p>
                    </div>
                  </section>

                  <div className={'title'}>Projects</div>

                  <section>
                    <div className={'sub-title'}>Customer Success Platform</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, TypeScript, OJET, React, Redux, webpack, REST API, React Native, Karma,
                      Mocha, Chai, Sinon, Micro frontend, npm, git, Jenkins, Sonar
                    </div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        As a member of an international team (the teammates are from US, Mexico, India and Hungary), my recent
                        project is an analytical tool, which helps Oracle's
                        specialist to improve customer satisfaction by highlighting known issues based on a huge data set.
                        The development started in React Native,
                        but due some business reasons, we switched to OJET framework. The biggest challenge was to pick up
                        enough knowledge of OJET ecosystem
                        to start delivery as soon as possible and fortify the project with 3rd party libs, eg. with redux,
                        which was extremely difficult to integrate with OJET.
                      </p>

                      <p>
                        Next to the production version, I've started to work on a React based alternative of this project.
                        I've developed the whole app from scratch and started to transfer all existing features
                        from the OJET version and solve all the business needs, what we weren't able to reach with the other
                        framework. As part of the app,
                        I'm working on a micro frontend architecture based solution to be able to share the codebase between
                        teams and use existing,
                        JET written pages to speed up the migration to React.

                        Unfortunately, this approach has been cancelled later.
                      </p>
                    </div>
                  </section>

                  <section>
                    <div className={'sub-title'}>SCUBA</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, TypeScript, OJET, Preact, webpack, REST API, Jest, testing-library, Sonar,
                      npm, git, Jenkins
                    </div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        This small project is also about to support finance team to find Oracle products, which would be
                        successful suggestion to the customers to extend their existing product portfolio.

                        It's written with the latest OJET version, which is built up on preact framework (which is very similar to react),
                        so I was able to work again with my prefered framework.
                        I was the only one UI developer on the project and was responsible on the UX as well.
                      </p>
                    </div>
                  </section>
                </AccordionDetails>
              </Accordion>
            </div>

            <div data-breakpoint={true}>
              <Accordion className={classNames('accordion-container', {export: appMode === APP_MODE.EXPORT})}
                         expanded={isAccordionExpanded(ACCORDIONS.ICT)}>
                <AccordionSummary
                  onClick={() => handleOpenAccordion(ACCORDIONS.ICT)}
                  className={'accordion-summary'}
                  expandIcon={appMode !== APP_MODE.EXPORT && <FontAwesomeIcon icon={faChevronDown} size={'xs'}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Tooltip title={isAccordionExpanded(ACCORDIONS.ICT) ? '' : 'Click to see projects'}>
                    <div className={'summary'}>
                      <div className={'sub-title'}>Senior Software Developer at IncepTech</div>
                      <div>March, 2017 - November, 2019</div>
                      <a className={'info'} href={'https://www.incepteam.com/'} target={'_blank'} rel="noreferrer">https://www.incepteam.com</a>
                    </div>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={'accordion-details'}>
                  <div className={'title'}>Projects</div>

                  <section>
                    <div className={'sub-title'}>SchedulR</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, React, Redux, webpack, REST API, npm, git</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        This tool is the responsible for the schedule optimization in the most of the
                        <a href={'https://www.bayer.com'} target={'_blank'} rel="noreferrer"> Bayer</a>'s factories in all around the world.
                        At the beginning, it's written in ReactJS by another team, later me and my team got the project to investigate and fix existing issues
                        and implement new features on it. My additional role was to help new colleagues to pick up the necessary knowledge in front end development.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>Sequent</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, React, Redux, webpack, REST API, npm, git, AWS, CDN</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        It was the first in-house project in the history of IncepTech Ltd, where I was responsible for building the core ReactJS modules
                        from scratch of an innovative visual event planning platform. Due to its nature as an in-house startup, I was given free reign in trying out
                        new React practices to optimize our feature development and building reusable app components. The main feature was to visualize an event
                        as a directed graph, which has been implemented with using D3 and GSAP, embedded into React wrapper components.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>Parametric CleanSheet</div>
                    <a className={'info'} href={'https://www.mckinsey.com/business-functions/operations/how-we-help-clients/cleansheet/parametric-modeling'} target={'_blank'} rel="noreferrer">
                      Link to the original project overview
                    </a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, React, Redux, webpack, REST API, npm, git, Auth0, nodeJS</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        It is a cost engineering tool (owned by <a href={'https://www.mckinsey.com'} target={'_blank'} rel="noreferrer"> McKinsey & Company</a>),
                        built to optimize manufacturing processes of large multinationals, based on advanced benchmarking analytics.
                        I was part of the team, responsible for the entire redesign & implementation of the UI with ReactJS.
                        The main goal of the refactor was to efficiently handle huge datasets, so I had te opportunity to collect valuable
                        experience about windowed list with infinite scroll, continuously extendable forms, which can have embedded forms as well,
                        dynamic charts, etc.
                      </p>

                      <p>
                        During this project, for a couple of months, I worked as a full stack developer and my task was to
                        implement nodeJS features to export
                        data into Excel macro files and also I was the responsible for the related changes on the UI side.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>Performance Lens</div>
                    <a className={'info'} href={'https://www.mckinsey.com/industries/financial-services/how-we-help-clients/performance-lens/overview'} target={'_blank'} rel="noreferrer">
                      Link to the original project overview
                    </a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, AngularJs, Redux, gulp, REST API, npm, git</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        This is a document manager tool (owned by <a href={'https://www.mckinsey.com'} target={'_blank'} rel="noreferrer"> McKinsey & Company</a>)
                        to help organize periodically generated surveys and client responses with custom templates for McKinsey & Company and partner companies.
                        It was a small project with a short, one month development period, in which my team’s role was to plan and deliver a
                        web based solution with the given functionalities.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>SectorTech</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, AngularJs, Redux, gulp, webpack, REST API, npm, git</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        This project is a remade and extended version of FinTech (see below) to explore various sectors in a structured way and
                        get insights straight from the leading startups and experts of the field. Our role was also to plan and estimate
                        the sprint task based on the given user stories. I was one of the three front end developers on the project and received special
                        tasks like creating the build system of the frontend part to deploy it to different environments and to keep the used 3rd party
                        components up to date.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>FinTech</div>
                    <a className={'info'} href={'https://www.mckinsey.com/industries/financial-services/how-we-help-clients/panorama/our-offerings/panorama-fintech'} target={'_blank'} rel="noreferrer">
                      Link to the original project overview
                    </a>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, AngularJs, Redux, gulp, REST API, npm, git</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        This tool is a knowledge platform for banks and other financial institutions (owned by
                        <a href={'https://www.mckinsey.com'} target={'_blank'} rel="noreferrer"> McKinsey & Company</a>) to help them stay ahead
                        of digital disruption. I joined to the team as a beginner AngularJs developer on the maintaining
                        stage of the project. My performance to adapt to AngularJs highlighted my strength to the team
                        and soon I got my first own tasks to enhance the solution with new features.
                      </p>
                    </div>
                  </section>
                </AccordionDetails>
              </Accordion>
            </div>

            <div data-breakpoint={true}>
              <Accordion className={classNames('accordion-container', {export: appMode === APP_MODE.EXPORT})}
                         expanded={isAccordionExpanded(ACCORDIONS.NOKIA)}>
                <AccordionSummary
                  onClick={() => handleOpenAccordion(ACCORDIONS.NOKIA)}
                  className={'accordion-summary'}
                  expandIcon={appMode !== APP_MODE.EXPORT && <FontAwesomeIcon icon={faChevronDown} size={'xs'}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Tooltip title={isAccordionExpanded(ACCORDIONS.NOKIA) ? '' : 'Click to see projects'}>
                    <div className={'summary'}>
                      <div className={'sub-title'}>Software Engineer at Nokia</div>
                      <div>Augustus, 2014 - March, 2017</div>
                      <a className={'info'} href={'https://www.nokia.com/'} target={'_blank'} rel="noreferrer">https://www.nokia.com</a>
                    </div>
                  </Tooltip>
                </AccordionSummary>
                <AccordionDetails className={'accordion-details'}>
                  <div className={'title'}>Projects</div>

                  <section>
                    <div className={'sub-title'}>nWidgets</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>HTML, SCSS, JavaScript, React, Flux, gulp, REST API, Karma, Mocha, Robot, npm, git, Jenkins, Agile</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        It was my first project as a front end developer in collaboration with colleagues from abroad on a
                        system analytical tool for mobile networks. This tool was responsible for collecting and display available data
                        about the operating network system by customers. Eg. it was able to visualize the network usage on a given area or
                        a given transmission tower on a map as well as on charts or tables. MY team followed the agile methodologies and my role
                        was to created and extended ReactJS components with keeping TDD and A-TDD rules, while also to maintain the
                        existing code base and test case set. During this project I participated in an internal scrum master training.
                      </p>
                    </div>
                  </section>

                  <section data-breakpoint={true}>
                    <div className={'sub-title'}>Nokia Mobile Switching Center (3G core)</div>
                    <div className={'label'}>Tech. Stack</div>
                    <div>TNSDL, svn</div>
                    <div className={'label'}>Project Summary</div>
                    <div>
                      <p>
                        I think, it isn't necessary to introduce 3G mobile systems, which was my first project in corporate
                        environment. As a junior developer, my main task was to improve my knowledge about programming methodologies
                        and the 3GPP standard. I also were responsible to made performed development and maintenance works on
                        the 3G core modules of Nokia system (usually on A-interface), also prepared module tests. I also had to take
                        courses, such as Clean code (by Robert Martin), scrum and agile.
                      </p>
                    </div>
                  </section>
                </AccordionDetails>
              </Accordion>
            </div>
          </section>
        </>}
      />
    </div>
  </div>
}

export default Content;