import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './modules/routes'
import apiRoutes from './app/config/apiRoutes.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
    (
        <Router routes={routes} history={browserHistory}/>
    ), document.getElementById('app')
);
