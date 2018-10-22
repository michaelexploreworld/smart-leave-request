import { combineReducers } from 'redux';
import loginReducer from './app/login/duck/';
import homeReducer from './app/home/duck/';

const rootReducer = combineReducers({
  login: loginReducer,
  home: homeReducer
});

export default rootReducer;