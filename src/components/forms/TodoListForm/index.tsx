import { Button, Grid, TextField } from '@mui/material'
import { Form, Formik } from 'formik'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useAddNewListTodosMutation, useUpdateListTodosMutation } from '../../../api/listTodosApi'
import { ListTodo, NewListTodo } from '../../../common/types'
import { todoListValidation } from './validations'

interface TodoListFormProps {
    formType: 'NEW' | 'EDIT'
    initialValues?: NewListTodo | ListTodo
    onClose?: () => void
}

const initListTodos = {
    title: '',
}

const TodoListForm = ({ formType, initialValues = initListTodos, onClose }: TodoListFormProps) => {
    const { mutateAsync: addTodoMutation } = useAddNewListTodosMutation()
    const { mutateAsync: updateTodoMutation } = useUpdateListTodosMutation()

    const queryClient = useQueryClient()

    const handleAddListTodo = async (newListTodo: NewListTodo) => {
        try {
            const createdListTodo = await addTodoMutation(newListTodo)
            console.log(createdListTodo)
            queryClient.setQueryData(['lists-todos'], (prev?: ListTodo[]) => [createdListTodo, ...(prev || [])])
            toast.success('Zoznam úspešne pridaný')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    const handleUpdateListTodo = async (updatedListTodo: ListTodo) => {
        try {
            await updateTodoMutation(updatedListTodo)
            queryClient.setQueryData(['lists-todos'], (prev?: ListTodo[]) =>
                (prev || [])?.map((listTodo) => (listTodo.id === updatedListTodo.id ? updatedListTodo : listTodo))
            )
            toast.success('Zmeny sa úspešne uložili')
        } catch (err) {
            console.error(err)
            toast.error('Nastala chyba')
        }
    }

    const onFormSubmit = (values: ListTodo | NewListTodo) => {
        if (formType === 'NEW') {
            handleAddListTodo(values)
        } else {
            handleUpdateListTodo(values as ListTodo)
            onClose && onClose()
        }
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={todoListValidation}
            onSubmit={(values, { resetForm }) => {
                onFormSubmit(values)
                resetForm()
            }}>
            {({ handleSubmit, handleChange, values, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Grid
                        container
                        spacing={3}
                        sx={{ mt: 1 }}>
                        <Grid
                            item
                            xs={12}
                            md={8}
                            display="flex"
                            alignItems="stretch">
                            <TextField
                                name="title"
                                variant="outlined"
                                label="*Zadajte Názov"
                                fullWidth
                                value={values.title}
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                sx={{ flexGrow: 1 }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            display="flex"
                            alignItems="stretch">
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit">
                                {formType === 'EDIT' ? 'Uložiť' : 'Pridať'}
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}

export default TodoListForm
