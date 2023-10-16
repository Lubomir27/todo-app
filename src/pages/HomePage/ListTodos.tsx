import { Container, Grid, Typography } from '@mui/material'
import { ListTodo } from '../../common/types'
import ListTodosCard from '../../components/cards/ListTodosCard'
import LoadingSpinner from '../../components/layout/LoadingSpinner'
import { useFetchListsTodos } from '../../api/listTodosApi'
import ErrorPage from '../ErrorPage'

const ListTodos = () => {
    const { data: listsTodos, isLoading, isError } = useFetchListsTodos()

    if (isError) {
        return <ErrorPage />
    }

    return (
        <Container
            sx={{ py: 8 }}
            maxWidth="lg">
            {isLoading ? (
                <LoadingSpinner />
            ) : listsTodos.length === 0 ? (
                <Typography
                    variant="h4"
                    textAlign={'center'}>
                    Nenašli sa žiadne zoznamy
                </Typography>
            ) : (
                <Grid
                    container
                    spacing={4}>
                    {listsTodos.map((listTodos: ListTodo) => (
                        <ListTodosCard
                            key={listTodos.id}
                            todosList={listTodos}
                        />
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default ListTodos
