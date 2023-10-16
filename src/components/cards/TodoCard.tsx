import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import { Button, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { Todo, TodoFilterValues } from '../../common/types'
import { formatDateToLocale } from '../../common/util'
import { ConfirmationModal } from '../modals/ConfirmationModal'
import TodoFormModal from '../../components/modals/Modal'
import TodoForm from '../../components/forms/TodoForm'
import { useDeleteTodoMutation, useToggleIsTodoFinished } from '../../api/todoApi'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useQueryClient } from 'react-query'

interface TodoCardProps {
    todo: Todo
    selectedFilter: TodoFilterValues
}

const TodoCard: FC<TodoCardProps> = ({ todo, selectedFilter }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [showTodoModal, setShowTodoModal] = useState<boolean>(false)

    const params = useParams()
    const queryClient = useQueryClient()

    const { mutateAsync: deleteTodoMutation } = useDeleteTodoMutation()
    const { mutateAsync: toggleIsFinishedMutation } = useToggleIsTodoFinished()

    const toggleIsTodoFinished = async (todoId: string, isFinished: boolean) => {
        try {
            await toggleIsFinishedMutation({ todoId, listId: params.id as string, isFinished })
            queryClient.setQueryData(['todos', selectedFilter], (prev?: Todo[]) =>
                (prev || [])?.map((todo) => (todo.id === todoId ? { ...todo, isFinished: isFinished } : todo))
            )
            toast.success('Zmena úspešne uložená')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    const handleDeleteTodo = async (todoId: string) => {
        try {
            await deleteTodoMutation({ todoId, listId: params.id as string })
            queryClient.setQueryData(['todos', selectedFilter], (prev?: Todo[]) => (prev || [])?.filter((todo) => todo.id !== todoId))
            toast.success('Úloha úspešne odstránená')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    return (
        <Grid
            item
            xs={12}
            sm={6}
            md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                raised>
                <CardContent sx={{ flexGrow: 1 }}>
                    <div className="flex justify-between">
                        <Chip
                            size="small"
                            sx={{ marginBottom: 2 }}
                            color={todo.isFinished ? 'success' : 'primary'}
                            deleteIcon={todo.isFinished ? <CloseIcon /> : <DoneIcon />}
                            label={todo.isFinished ? 'Dokončená' : 'Aktívna'}
                            onDelete={() => toggleIsTodoFinished(todo.id, !todo.isFinished)}
                        />
                        <Chip
                            size="small"
                            sx={{ marginBottom: 2 }}
                            label={formatDateToLocale(todo.deadline as unknown as string)}
                        />
                    </div>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={`mt-3 ${todo.isFinished ? 'line-through' : ''}`}>
                        {todo.title}
                    </Typography>
                    <Typography>{todo.text}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', mb: 1 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => setShowTodoModal(true)}>
                        Upraviť
                    </Button>
                    <Button
                        color="error"
                        size="small"
                        onClick={() => {
                            setIsDeleteModalOpen(true)
                        }}>
                        Zmazať
                    </Button>
                </CardActions>
            </Card>
            <ConfirmationModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    handleDeleteTodo(todo.id)
                    setIsDeleteModalOpen(false)
                }}
                title="Odstránenie úlohy"
                message={`Naozaj si želáte zmazať úlohu s názvom ${todo.title}?`}
            />
            <TodoFormModal
                isOpen={showTodoModal}
                onClose={() => setShowTodoModal(false)}
                modalElement={
                    <TodoForm
                        selectedFilter={selectedFilter}
                        formType={'EDIT'}
                        initialValues={todo}
                        onClose={() => setShowTodoModal(false)}
                    />
                }
            />
        </Grid>
    )
}

export default TodoCard
