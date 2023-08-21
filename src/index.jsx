import React from 'react'
import ReactDOM from 'react-dom'

import MainView from './components/MainView/MainView'

import './index.scss'

const App = function() {
  return (
    <>
      <MainView />
    </>
  )
}

const view = App('pywebview')

const element = document.getElementById('app')
ReactDOM.render(view, element)