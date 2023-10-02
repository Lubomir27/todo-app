import { startOfDay } from 'date-fns'
import * as yup from 'yup'

export const insuranceFormValidation = yup
    .object({
        insuranceType: yup.string().required('*Toto pole je povinné'),
        packageType: yup.string().required('*Toto pole je povinné'),
        startDate: yup
            .date()
            .required('*Toto pole je povinné')
            .min(startOfDay(new Date()), 'Dátum nemôže byť v minulosti')
            .typeError('Neplatný formát'),
        endDate: yup.date().when('insuranceType', {
            is: 'shortTerm',
            then: (schema) =>
                schema.required('*Toto pole je povinné').min(yup.ref('startDate'), 'Dátum musí byť vyšší').typeError('Neplatný formát'),

            otherwise: (schema) => schema.notRequired().nullable(),
        }),
    })
    .required()
