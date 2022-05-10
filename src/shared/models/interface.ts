export interface List {
    id: number;
    name: string;
    tasks?: ListTask[];
}

export interface ListTask {
    id: number;
    name: string;
    description: string;
}