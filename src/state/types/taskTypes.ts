export interface Task {
    id: number;
    title: string;
    description: string;
    status: number;
    user_id: number;
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    fetched: boolean;
}
