import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/app.jsx';

const initProps = window.app_props;
ReactDOM.render(
  <App { ...initProps } />, document.querySelector('.content')
);
