import { Container, Grid, Typography } from '@mui/material'
import LoadingSpinner from '../../components/layout/LoadingSpinner'
import TodoCard from '../../components/cards/TodoCard'
import { Todo, TodoFilterValues } from '../../common/types'

interface TodoListProps {
    isLoading: boolean
    todos: Todo[]
    selectedFilter: TodoFilterValues
}

const TodoList = ({ isLoading, todos, selectedFilter }: TodoListProps) => {
    return (
        <Container
            sx={{ py: 8 }}
            maxWidth="lg">
            {isLoading ? (
                <LoadingSpinner />
            ) : todos.length === 0 ? (
                <Typography
                    variant="h4"
                    textAlign={'center'}>
                    Nenašli sa žiadne úlohy
                </Typography>
            ) : (
                <Grid
                    container
                    spacing={4}>
                    {todos.map((todo: Todo) => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            selectedFilter={selectedFilter}
                        />
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default TodoList
