import { combineReducers } from 'redux';
import loginReducer from './app/login/duck/'

const rootReducer = combineReducers({
  login: loginReducer
});

export default rootReducer;