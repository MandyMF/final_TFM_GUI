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
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
              I
             </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             II
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             III
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             IV
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             V
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
             <div className={`step-container ${ accomplished ? "completed": "" }`} >
             VI
            </div>
          )}
        </Step>
      </ProgressBar>
    </div>
  );
};
