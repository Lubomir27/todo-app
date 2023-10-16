export interface Todo {
    id: string
    lists_todoId: string
    title: string
    deadline: Date
    text: string
    isFinished: boolean
}

export interface NewTodo {
    title: string
    deadline: Date
    text: string
    isFinished: boolean
}

export interface ListTodo {
    id: string
    title: string
}

export interface NewListTodo {
    title: string
}

export type TodoFilterValues = 'ALL' | 'ACTIVE' | 'FINISHED'
