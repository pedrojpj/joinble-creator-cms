import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './theme/theme.css';

import { Resolver } from 'found-relay';

import Routes from './routes';
import environment from './environment';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routes resolver={new Resolver(environment)} />, document.getElementById('root'));
registerServiceWorker();
