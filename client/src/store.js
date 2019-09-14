import reducers from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk];


export default () => {
  const store = createStore(reducers, compose(
    applyMiddleware(...middleware),
    // remove after re-deploy 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
  return store;
}