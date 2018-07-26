import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import './styles/main.css'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>

, document.getElementById('root'));
unregister();
