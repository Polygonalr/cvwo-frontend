import { Task } from '../state/types/taskTypes';

const API_URL = 'http://localhost:3001/api';

// ========================== USER ============================

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
    return user;
};

export const createUser = async (
    accessToken: string,
    username: string,
    name: string,
    password: string,
    role: number,
) => {
    const userData = {
        user: {
            username: username,
            name: name,
            password: password,
            password_confirmation: password,
            role: role,
        },
    };
    console.log('API: Creating user');
    const newUser = await fetch(API_URL + `/add_user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
    }).then((resp) => resp.json());
    return newUser;
};

// ========================== TASKS ============================

// TODO Implement this sort in backend instead
const compareTasks = (a: Task, b: Task) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
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
    tasks.sort(compareTasks);
    return tasks;
};

export const addTask = async (accessToken: string, title: string, description: string, tag_ids: number[]) => {
    console.log('API: Adding task');
    const taskData = {
        task: {
            title: title,
            description: description,
            tag_ids: tag_ids,
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
    tag_ids: number[],
) => {
    console.log('API: Updating task');
    const taskData = {
        task: {
            id: taskId,
            title: title,
            description: description,
            status: status,
            tag_ids: tag_ids,
        },
    };
    await fetch(API_URL + `/update_task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
    });
};

export const deleteTask = async (accessToken: string, taskId: number) => {
    console.log('API: Deleting task');
    const taskData = {
        task: {
            id: taskId,
        },
    };
    await fetch(API_URL + `/delete_task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
    });
};

// ========================== TAGS AND COLORS ============================

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

export const addTag = async (accessToken: string, name: string, color: number) => {
    console.log('API: Adding tag');
    const tagData = {
        tag: {
            name: name,
            color_id: color,
        },
    };
    const new_tag = await fetch(API_URL + `/add_tag`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tagData),
    }).then((resp) => resp.json());
    return new_tag.id;
};

export const deleteTag = async (accessToken: string, tagId: number) => {
    console.log('API: Deleting tag');
    const tagData = {
        id: tagId,
    };
    await fetch(API_URL + `/remove_tag`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(tagData),
    });
};

export const fetchColors = async (accessToken: string) => {
    console.log('API: Fetching colors');
    const colors = await fetch(API_URL + `/get_colors`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((resp) => resp.json());
    return colors;
};
