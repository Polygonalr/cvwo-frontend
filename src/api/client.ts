const API_URL = 'http://localhost:3001/api';

export const submitCredentials = async (username: string, password: string) => {
    const credentials = {
        username: username,
        password: password,
    };
    console.log('API: Submitting credentials');

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
    console.log('API: Fetching user data');

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

export const fetchTasks = async (accessToken: string) => {
    console.log('API: Fetching tasks');
    const tasks = await fetch(API_URL + `/get_tasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((resp) => resp.json());
    return tasks;
};

export const addTask = async (accessToken: string, title: string, description: string) => {
    console.log('API: Adding task');
    const taskData = {
        task: {
            title: title,
            description: description,
        },
    };
    const new_task = await fetch(API_URL + `/add_task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
    }).then((resp) => resp.json());
    return new_task.id;
};

export const updateTask = async (
    accessToken: string,
    taskId: number,
    title: string,
    description: string,
    status: number,
) => {
    console.log('API: Updating task');
    const taskData = {
        id: taskId,
        title: title,
        description: description,
        status: status,
    };
    await fetch(API_URL + `/update_task`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
    });
};

export const fetchTags = async (accessToken: string) => {
    console.log('API: Fetching tags');
    const tags = await fetch(API_URL + `/get_tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((resp) => resp.json());
    return tags;
};
