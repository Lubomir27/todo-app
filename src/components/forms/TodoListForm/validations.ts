import * as yup from 'yup'

export const todoListValidation = yup
    .object({
        title: yup.string().required('*Zadajte prosím názov'),
    })
    .required()
