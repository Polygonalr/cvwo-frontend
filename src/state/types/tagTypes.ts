export interface Tag {
    id: number;
    name: string;
    color_id: number;
}

export interface Color {
    id: number;
    hex: string;
}

export interface TagState {
    tags: Tag[];
    colors: Color[];
    isLoading: boolean;
    fetched: boolean;
    selectedTags: number[];
}
