import jwtDecode from 'jwt-decode';

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data.data;
    });
}

function login(username, password) {
    const API_URL = `https://auth-staging.assignar.com.au/login`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            login_id: 'candidates',
            username, 
            password,
            user_type: 'dashboard' 
        })
    };

    return fetch(API_URL, requestOptions)
        .then(handleResponse)
        .then(user => {
            let token = user.token;
            let extractedUser = {};

            if(token) {
                extractedUser = extractUser(token);
                localStorage.setItem('user', token);
            }
            return extractedUser;
        });
}

function extractUser(token) {
    let user = {};
    
    try {
        if(token) {
            user = jwtDecode(token);
        }
    } catch(error) {
        console.error("Extract user error: ", error.message);
    }
    return user;
}

function isAuthenticated(user) {
    if(!user) {
        return false;
    } else if(!user.exp) {
        return false;
    } else if(user.exp < Date.now() / 1000) {
        return false;
    } else {
        return true;
    }
}

function authHeader() {
    let token = localStorage.getItem('user');

    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export {
    login,
    isAuthenticated,
    authHeader
};