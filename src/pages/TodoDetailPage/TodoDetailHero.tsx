import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { ChangeEvent, FC, useState } from 'react'
import { TodoFilterValues } from '../../common/types'
import TodoForm from '../../components/forms/TodoForm'
import SearchInput from '../../components/inputs/SearchInput'
import SelectTabs from '../../components/inputs/Tabs'
import TodoFormModal from '../../components/modals/Modal'

interface TodoDetailHeroProps {
    title: string
    selectedFilter: TodoFilterValues
    handleFilterChange: (newFilter: TodoFilterValues) => void
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const TodoDetailHeader: FC<TodoDetailHeroProps> = ({ title, selectedFilter, handleFilterChange, handleSearchChange }) => {
    const [showTodoModal, setShowTodoModal] = useState<boolean>(false)

    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}>
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom>
                    {title}
                </Typography>
                <SelectTabs
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                />
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center">
                    <SearchInput handleChange={handleSearchChange} />
                    <Button
                        variant="contained"
                        onClick={() => setShowTodoModal(true)}>
                        Pridať úlohu
                    </Button>
                </Stack>
                <TodoFormModal
                    isOpen={showTodoModal}
                    onClose={() => setShowTodoModal(false)}
                    modalElement={
                        <TodoForm
                            selectedFilter={selectedFilter}
                            formType={'NEW'}
                            onClose={() => setShowTodoModal(false)}
                        />
                    }
                />
            </Container>
        </Box>
    )
}

export default TodoDetailHeader
