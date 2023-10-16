import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { API_BASE_URL } from '../common/constants'
import { ListTodo, NewListTodo } from '../common/types'

export function useFetchListsTodos() {
    return useQuery('lists-todos', async () => {
        const response = await axios.get(`${API_BASE_URL}/lists_todos`)
        return response.data
    })
}

export const useAddNewListTodosMutation = () => {
    return useMutation<ListTodo, unknown, NewListTodo>(async (newListTodos) => {
        const response = await axios.post<ListTodo>(`${API_BASE_URL}/lists_todos`, newListTodos)
        return response.data
    })
}

export const useUpdateListTodosMutation = () => {
    return useMutation<ListTodo, unknown, ListTodo>((listTodos) => axios.put(`${API_BASE_URL}/lists_todos/${listTodos.id}`, listTodos))
}

export const useDeleteListTodosMutation = () => {
    return useMutation<ListTodo, unknown, string>((listId) => axios.delete(`${API_BASE_URL}/lists_todos/${listId}`))
}
