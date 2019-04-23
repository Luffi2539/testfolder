import { createStore, applyMiddleware, compose } from 'redux';
import { Map } from 'immutable';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';

// router
import history from './history';
import { routerMiddleware } from 'connected-react-router/immutable';

// middlewares

import persistState from 'redux-localstorage';
import { createEpicMiddleware } from 'redux-observable';

//helpers
import getLocalStorageConfig from 'services/localstorage';
import rootReducer from 'reducers';
import { rootEpic } from 'epics/root';

// constants
import LOCAL_STORAGE_CONFIG from 'constants/localstorage';

const initialState = Map();
const epicMiddleware = createEpicMiddleware();

const enhancers = [persistState(['token'], getLocalStorageConfig(LOCAL_STORAGE_CONFIG))];

const middleware = [
  routerMiddleware(history),
  epicMiddleware
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }

  installDevTools(Immutable);
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer(history),
  initialState,
  composedEnhancers,
);

epicMiddleware.run(rootEpic);

export default store;
