import { call, put } from 'redux-saga/effects';

import actions from './actions';
import { login } from '../../../utils/userService';

function* handleLoginRequest(action) {
    const { username, password } = action;

    try {
        const user = yield call(login, username, password);
        if(user) {
            yield put(actions.doLoginSuccess(user));
        }
    } catch(error) {
        yield put(actions.doLoginFailure(error));
    }
}

export default { 
    handleLoginRequest,
};