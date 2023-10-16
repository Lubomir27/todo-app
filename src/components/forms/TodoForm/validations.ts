import * as yup from 'yup'

export const insuranceFormValidation = yup
    .object({
        title: yup.string().required('*Toto pole je povinné'),
        deadline: yup.date().required('*Toto pole je povinné').typeError('Neplatný formát'),
        text: yup.string().required('*Toto pole je povinné'),
    })
    .required()
