import { put, call } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { login } from '../../../utils/userService';
import { loginActions, loginOperations } from './index';

describe('handle login request', () => {
    it('do login success', () => {
        const username = 'yichin';
        const password = '6Q7z>stbBdP(';
        const loginAction = loginActions.doLoginRequest(username, password);
        const expectedUser = {
            user_id: 42,
            customer_id: "candidates",
            first_name: 'Yi',
            last_name: 'Chin',
            username: 'yichin',
            email: 'michaelexploreworld@gmail.com'
        };

        const generator = cloneableGenerator(loginOperations.handleLoginRequest)(loginAction);
        expect(generator.next(expectedUser).value).toMatchObject(call(login, username, password));
        expect(generator.next(expectedUser).value).toEqual(put(loginActions.doLoginSuccess(expectedUser)));
        expect(generator.next().done).toEqual(true);
    });
});