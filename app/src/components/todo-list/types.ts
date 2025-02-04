export enum TodoStatus {
    COMPLETE = 1,
    INCOMPLETE = 0
}

export interface Todo {
    id: string;
    text: string;
    status: TodoStatus;
    assignee: string;
    deadline: string;
    createdAt: string;
}
