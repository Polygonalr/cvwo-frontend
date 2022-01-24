export interface User {
    id: number;
    username: string;
    name: string;
    role: number;
}

export interface UserState {
    user: User;
    isAuthenticated: boolean;
    isLoading: boolean;
}
