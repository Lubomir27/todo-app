import { NewTodo, Todo } from '../common/types'

export interface AddNewTodoMutationProps {
    newTodo: NewTodo
    listId: string
}

export interface UpdateTodoMutationProps {
    updatedTodo: Todo
}

export interface DeleteTodoMutationProps {
    todoId: string
    listId: string
}

export interface ToggleIsTodoFinishedMutationProps {
    listId: string
    todoId: string
    isFinished: boolean
}
