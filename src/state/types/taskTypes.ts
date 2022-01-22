import type { Tag } from './tagTypes';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: number;
    user_id: number;
    tags: Tag[];
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    fetched: boolean;
    selectedTask: number;
}
