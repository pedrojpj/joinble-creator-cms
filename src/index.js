import React from 'react';
import ReactDOM from 'react-dom';
import { registerObserver } from 'react-perf-devtool';

import 'bootstrap/dist/css/bootstrap.css';
import './theme/theme.css';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

if (process.env.NODE_ENV === 'development') {
  const options = {
    shouldLog: true,
    port: 3000
  };

  registerObserver(options);
}
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
