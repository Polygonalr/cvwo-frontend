const API_URL = 'http://localhost:3001/api';

export const submitCredentials = async (username: string, password: string) => {
    const credentials = {
        username: username,
        password: password,
    };
    console.log('Submitting credentials');

    const user = await fetch(API_URL + `/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
        .then((resp) => resp.json())
        .then((data) => {
            localStorage.setItem('token', data.jwt);
            console.log('Got jwt: ', data.jwt);
            return data.user;
        });
    return user;
};

export const fetchUserData = async (accessToken: string) => {
    console.log('Fetching data');

    const user = await fetch(API_URL + `/user_data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((resp) => resp.json());
    // await timeout(500);
    return user;
};
