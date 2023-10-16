import axios from 'axios'
import { UseMutationResult, useMutation, useQuery } from 'react-query'
import { API_BASE_URL } from '../common/constants'
import { Todo, TodoFilterValues } from '../common/types'
import { AddNewTodoMutationProps, DeleteTodoMutationProps, ToggleIsTodoFinishedMutationProps, UpdateTodoMutationProps } from './types'

export function useFetchTodos(listId: string | undefined, selectedFilter: TodoFilterValues) {
    return useQuery(['todos', selectedFilter], async () => {
        let url = `${API_BASE_URL}/lists_todos/${listId}/todos`

        if (selectedFilter === 'ACTIVE') {
            url += '?isFinished=false'
        } else if (selectedFilter === 'FINISHED') {
            url += '?isFinished=true'
        }
        const response = await axios.get(url)
        return response.data
    })
}

export function useAddNewTodoMutation(): UseMutationResult<Todo, unknown, AddNewTodoMutationProps, unknown> {
    return useMutation(async ({ newTodo, listId }) => {
        const response = await axios.post(`${API_BASE_URL}/lists_todos/${listId}/todos`, newTodo)
        return response.data as Todo
    })
}

export function useUpdateTodoMutation(): UseMutationResult<Todo, unknown, UpdateTodoMutationProps, unknown> {
    return useMutation(async ({ updatedTodo }) => {
        const response = await axios.put(`${API_BASE_URL}/lists_todos/${updatedTodo.lists_todoId}/todos/${updatedTodo.id}`, updatedTodo)
        return response.data as Todo
    })
}

export function useDeleteTodoMutation(): UseMutationResult<void, unknown, DeleteTodoMutationProps, unknown> {
    return useMutation(async ({ todoId, listId }) => await axios.delete(`${API_BASE_URL}/lists_todos/${listId}/todos/${todoId}`))
}

export function useToggleIsTodoFinished(): UseMutationResult<void, unknown, ToggleIsTodoFinishedMutationProps, unknown> {
    return useMutation(
        async ({ todoId, listId, isFinished }) =>
            await axios.put(`https://6525a6b467cfb1e59ce79101.mockapi.io/api/lists_todos/${listId}/todos/${todoId}`, {
                isFinished,
            })
    )
}
