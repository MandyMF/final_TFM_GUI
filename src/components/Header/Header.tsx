import * as React from 'react'

import './Header.scss'
import logo from '../../assets/logo.png'


export default function Header(props) {
  return (
    <div className='header-container'>
      {props.children}
      {/*
      <img className='logo' src={logo} alt='pywebview'/>
      <h2>pywebview</h2>

      <div className='links'>
        <a href='https://pywebview.flowrl.com/' target='_blank'>Documentation</a>
      </div>
      */}
    </div>
  );
};
