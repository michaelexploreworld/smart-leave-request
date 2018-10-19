import jwtDecode from 'jwt-decode';

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
                localStorage.setItem('user', token);
                extractedUser = extractUser(user);
            }
            return extractedUser;
        });
}

function logout() {
    // Remove user from local storage to log user out
    localStorage.removeItem('user');
}

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

function extractUser() {
    const userToken = localStorage.getItem('user');
    let user = {};
    
    try {
        if(userToken) {
            user = jwtDecode(userToken);
        }
    } catch(error) {
        console.error("Extract user error: ", error.message);
    }
    return user;
}

function isValid() {
    const user = extractUser();

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

export {
    login,
    logout,
    extractUser,
    isValid
};