import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import './index.css';
import App from './app/App.jsx';
import createPersistedStore from './store';

const { store, persistor } = createPersistedStore();

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});
  
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MuiThemeProvider theme={theme} >
                <App />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
