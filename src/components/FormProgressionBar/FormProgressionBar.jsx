import * as React from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import './FormProgressionBar.scss';

export default function FormProgressionBar(props) {
  return (
    <div className='progress-bar-container'>
      <ProgressBar
        percent={props.percentage}
        filledBackground="linear-gradient(to right, #002c48, #00a8b5)"
        unfilledBackground="#b1b1b1"
        height='24px'
      >
         <Step transition="scale">
          {({ accomplished }) => (
            <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
              I
             </div>
             <p className='step-label'>{props.screen_titles[0]}</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             II
            </div>
            <p className='step-label'>{props.screen_titles[1]}</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             III
            </div>
            <p className='step-label'>{props.screen_titles[2]}</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             IV
            </div>
            <p className='step-label'>{props.screen_titles[3]}</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             V
            </div>
            <p className='step-label'>{props.screen_titles[4]}</p>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div className='main-step-container'>
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             VI
            </div>
            <p className='step-label'>{props.screen_titles[5]}</p>
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};
