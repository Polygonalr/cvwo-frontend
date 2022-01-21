export interface Tag {
    id: number;
    name: string;
    color: number;
}

export interface TagState {
    tags: Tag[];
    isLoading: boolean;
    fetched: boolean;
}
