import { Button, Grid, TextField, Typography, useMediaQuery, Theme } from '@mui/material'

import { ErrorMessage, Form, Formik } from 'formik'

import { DateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers'
import { addDays } from 'date-fns'
import { NewTodo, Todo, TodoFilterValues } from '../../../common/types'

import { insuranceFormValidation } from './validations'
import { useAddNewTodoMutation, useUpdateTodoMutation } from '../../../api/todoApi'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

interface TodoFormProps {
    formType: 'NEW' | 'EDIT'
    selectedFilter: TodoFilterValues
    initialValues?: Todo | NewTodo
    onClose: () => void
    onSubmit?: (todo: Todo | NewTodo) => void
}

const initTodo: NewTodo = {
    title: '',
    deadline: addDays(new Date(), 1),
    text: '',
    isFinished: false,
}

const TodoForm = ({ formType, selectedFilter, initialValues = initTodo, onClose }: TodoFormProps) => {
    const { mutateAsync: addTodoMutation } = useAddNewTodoMutation()
    const { mutateAsync: updateTodoMutation } = useUpdateTodoMutation()

    const queryClient = useQueryClient()
    const params = useParams()
    const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

    const handleAddTodo = async (newTodo: NewTodo) => {
        try {
            const createdTodo = await addTodoMutation({ newTodo, listId: params.id as string })
            queryClient.setQueryData(['todos', selectedFilter], (prev?: Todo[]) => [createdTodo, ...(prev || [])])
            toast.success('Úloha úspešne pridaná')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    const handleUpdateTodo = async (updatedTodo: Todo) => {
        try {
            await updateTodoMutation({ updatedTodo })
            queryClient.setQueryData(['todos', selectedFilter], (prev?: Todo[]) =>
                (prev || [])?.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
            )
            toast.success('Zmeny sa úspešne uložili')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    const onFormSubmit = (values: Todo | NewTodo) => {
        formType === 'NEW' ? handleAddTodo(values) : handleUpdateTodo(values as Todo)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={insuranceFormValidation}
            onSubmit={(values) => {
                onFormSubmit(values)
                onClose()
            }}>
            {({ setFieldValue, handleSubmit, handleChange, values, resetForm }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={3}
                        sx={{ mt: 1 }}>
                        <Grid
                            item
                            xs={12}>
                            <Typography
                                className="text-left"
                                sx={{ fontWeight: 'bold' }}>
                                Deadline*
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}>
                            <MobileDateTimePicker
                                value={new Date(values.deadline)}
                                onChange={(newDate) => setFieldValue('deadline', newDate)}
                                sx={{
                                    display: isSmallScreen ? 'block' : 'none',
                                }}
                            />
                            <DateTimePicker
                                value={new Date(values.deadline)}
                                onChange={(newDate) => setFieldValue('deadline', newDate)}
                                sx={{
                                    display: isSmallScreen ? 'none' : 'block',
                                }}
                            />
                            <ErrorMessage
                                name="deadline"
                                component="p"
                                className="formik-error"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}>
                            <Typography
                                className="text-left"
                                sx={{ fontWeight: 'bold' }}>
                                Názov*
                            </Typography>
                        </Grid>{' '}
                        <Grid
                            item
                            xs={12}>
                            <TextField
                                name="title"
                                fullWidth
                                variant="outlined"
                                value={values.title}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="title"
                                component="p"
                                className="formik-error"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}>
                            <Typography
                                className="text-left"
                                sx={{ fontWeight: 'bold' }}>
                                Popis*
                            </Typography>
                        </Grid>{' '}
                        <Grid
                            item
                            xs={12}>
                            <TextField
                                name="text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={values.text}
                                onChange={handleChange}
                            />
                            <ErrorMessage
                                name="text"
                                component="p"
                                className="formik-error"
                            />
                        </Grid>
                    </Grid>
                    <div className="flex justify-end gap-6 mt-4">
                        <Button
                            type="submit"
                            variant="contained">
                            {formType === 'NEW' ? 'Pridať' : 'Uložiť'}
                        </Button>
                        <Button
                            onClick={() => {
                                resetForm()
                                onClose()
                            }}
                            variant="text">
                            Zrušiť
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default TodoForm
