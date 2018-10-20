import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './app/App.jsx';
import createPersistedStore from './store';
import { mutationClient } from './apolloClients';

const { store, persistor } = createPersistedStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={mutationClient}>
                <App />
            </ApolloProvider>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);
