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

export interface TodoInput {
    text: string;
    assignee: string;
    deadline: string;
}

export const assignees = ["김철수", "이영희", "박민수", "홍길동", "나"];