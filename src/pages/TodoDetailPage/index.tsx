import { SetStateAction, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

import { useFetchTodos } from '../../api/todoApi'
import { Todo, TodoFilterValues } from '../../common/types'
import PageWrapper from '../../components/layout/PageWrapper'
import ErrorPage from '../ErrorPage'
import TodoDetailHero from './TodoDetailHero'
import TodoList from './TodoList'

const TodoDetailPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<TodoFilterValues>('ALL')
    const [searchQuery, setSearchQuery] = useState<string>('')

    const params = useParams()
    const queryClient = useQueryClient()

    const { data: todos, isLoading, isError } = useFetchTodos(params.id as string, selectedFilter)

    const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
        setSearchQuery(event.target.value)
    }

    const handleFilterChange = (newFilter: TodoFilterValues) => {
        setSelectedFilter(newFilter)
        queryClient.invalidateQueries(['todos', newFilter])
    }

    if (isError) {
        return <ErrorPage />
    }

    const filteredTodos =
        !isLoading &&
        todos?.filter((todo: Todo) => {
            return (
                todo.title.toLowerCase().includes(searchQuery.toLowerCase()) || todo.text.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })

    return (
        <PageWrapper>
            <TodoDetailHero
                title={params.title as string}
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                handleSearchChange={handleSearchChange}
            />
            <TodoList
                isLoading={isLoading}
                todos={filteredTodos}
                selectedFilter={selectedFilter}
            />
        </PageWrapper>
    )
}

export default TodoDetailPage
