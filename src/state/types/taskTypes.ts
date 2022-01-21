import type { Tag } from './tagTypes';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: number;
    user_id: number;
    tags: number[];
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    fetched: boolean;
}
