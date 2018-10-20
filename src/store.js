import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'; 
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers';
import rootSaga from './sagas';

function createPersistedStore() {
    // Create persist reducer.
    const persistConfig = {
        key: 'root',
        storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // Create store with middleware.
    const logger = createLogger();
    const saga = createSagaMiddleware();
    const store = createStore(
        persistedReducer,
        undefined,
        applyMiddleware(saga, logger)
    );
    const persistor = persistStore(store);

    saga.run(rootSaga);

    return { store, persistor };
}

export default createPersistedStore;