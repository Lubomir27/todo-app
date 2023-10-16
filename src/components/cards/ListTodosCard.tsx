import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import { Paper, Box, Typography, Button, IconButton, Grid } from '@mui/material'
import { Link as Navigate } from 'react-router-dom'

import { ConfirmationModal } from '../modals/ConfirmationModal'
import EditIcon from '@mui/icons-material/Edit'
import { ListTodo } from '../../common/types'
import { useDeleteListTodosMutation } from '../../api/listTodosApi'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import TodoListForm from '../../components/forms/TodoListForm'
import ListTodosFormModal from '../../components/modals/Modal'

interface ListTodosCardProps {
    todosList: ListTodo
}

const ListTodosCard: FC<ListTodosCardProps> = ({ todosList }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [showListTodsModal, setShowListTodosModal] = useState<boolean>(false)

    const { mutateAsync: deleteListTodosMutation } = useDeleteListTodosMutation()
    const queryClient = useQueryClient()

    const deleteTodoList = async (listTodosId: string) => {
        try {
            await deleteListTodosMutation(listTodosId)
            queryClient.setQueryData(['lists-todos'], (prev?: ListTodo[]) =>
                (prev || [])?.filter((listTodos) => listTodos.id !== listTodosId)
            )
            toast.success('Zoznam úspešne odstránený')
        } catch (error) {
            console.error(error)
            toast.error('Vyskytla sa chyba')
        }
    }

    return (
        <Grid
            item
            key={todosList.id}
            xs={12}
            md={6}>
            <Paper
                elevation={6}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{ flexGrow: 1 }}
                    className="p-5">
                    <Box className="flex justify-between items-center flex-wrap">
                        <div className="flex items-end ">
                            <IconButton
                                aria-label="delete"
                                size="large"
                                onClick={() => setShowListTodosModal(true)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                            <Typography
                                gutterBottom
                                variant="h6"
                                component="h2"
                                className="text-left">
                                {todosList.title}
                            </Typography>
                        </div>
                        <Box className="flex gap-4 items-center w-full justify-end">
                            <Navigate to={`/zoznamy/${todosList.title}/${todosList.id}`}>
                                <Button variant="contained">Detail</Button>
                            </Navigate>
                            <IconButton
                                aria-label="delete"
                                size="large"
                                color="error"
                                onClick={() => setIsDeleteModalOpen(true)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Paper>
            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    deleteTodoList(todosList.id)
                    setIsDeleteModalOpen(false)
                }}
                title="Odstránenie úlohy"
                message={`Naozaj si želáte zoznam úloh s názvom ${todosList.title}?`}
            />
            <ListTodosFormModal
                title="Zmena názvu"
                isOpen={showListTodsModal}
                onClose={() => setShowListTodosModal(false)}
                modalElement={
                    <TodoListForm
                        formType={'EDIT'}
                        initialValues={todosList}
                        onClose={() => setShowListTodosModal(false)}
                    />
                }
            />
        </Grid>
    )
}

export default ListTodosCard
