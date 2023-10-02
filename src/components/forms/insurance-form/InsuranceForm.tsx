import AddModeratorIcon from '@mui/icons-material/AddModerator'
import AlarmIcon from '@mui/icons-material/Alarm'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SecurityIcon from '@mui/icons-material/Security'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

import { Button, Checkbox, FormControlLabel, Grid, Slider, Typography } from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays } from 'date-fns'
import { ErrorMessage, Form, Formik } from 'formik'
import { useState } from 'react'

import LayerContainer from './LayerContainer'
import RenderResult from './RenderResult'
import ToggleButtonComponent from './ToggleButtonComponent'
import './insuranceForm.scss'
import { calculatePrice } from './functions'
import { insuranceFormValidation } from './validations'

const InsuranceForm = () => {
    const [resultPrice, setResultPrice] = useState<number | null>(null)
    const today = new Date()

    const initialValues = {
        insuranceType: null,
        packageType: null,
        startDate: today,
        endDate: addDays(today, 1),
        hasTripCancellation: false,
        hasSportActivities: false,
        numberOfPersons: 1,
    }

    const numberOfPersonsLabels = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
    ]

    const valueLabelFormat = (value: number) => {
        return numberOfPersonsLabels.findIndex((mark) => mark.value === value) + 1
    }

    const responsiveIconProps = {
        sx: {
            fontSize: '4rem',
            '@media (max-width: 768px)': {
                fontSize: '2rem',
            },
        },
        color: 'error',
    }

    const createStyledIcon = (IconComponent: React.ElementType) => <IconComponent {...responsiveIconProps} />

    const icons = {
        SHORT_TERM: createStyledIcon(AlarmIcon),
        LONG_TERM: createStyledIcon(CalendarMonthIcon),
        BASIC: createStyledIcon(AddModeratorIcon),
        MEDIUM: createStyledIcon(VerifiedUserIcon),
        EXTRA: createStyledIcon(SecurityIcon),
    }

    const options = [
        { value: 'SHORT_TERM', text: 'Krátkodobé', icon: icons.SHORT_TERM },
        { value: 'LONG_TERM', text: 'Dlhodobé', icon: icons.LONG_TERM },
        { value: 'BASIC', text: 'Základný', icon: icons.BASIC },
        { value: 'MEDIUM', text: 'Rozšírený', icon: icons.MEDIUM },
        { value: 'EXTRA', text: 'Extra', icon: icons.EXTRA },
    ]

    return (
        <LayerContainer>
            <Formik
                initialValues={initialValues}
                validationSchema={insuranceFormValidation}
                onSubmit={(values) => {
                    setResultPrice(calculatePrice(values))
                }}>
                {({ setFieldValue, handleSubmit, handleChange, values, resetForm }) => (
                    <Form onSubmit={handleSubmit}>
                        <p className="text-left font-bold mb-4">Typ postenia*</p>
                        <ToggleButtonComponent
                            value={values.insuranceType}
                            className="gap-4"
                            options={options.filter((option) => ['SHORT_TERM', 'LONG_TERM'].includes(option.value))}
                            onChange={(newValue) => setFieldValue('insuranceType', newValue)}
                        />
                        <ErrorMessage
                            name="insuranceType"
                            component="p"
                            className="formik-error"
                        />

                        <p className="text-left font-bold my-4">Výber balíka*</p>
                        <ToggleButtonComponent
                            value={values.packageType}
                            className="gap-4 flex-wrap sm:flex-nowrap"
                            options={options.filter((option) => ['BASIC', 'MEDIUM', 'EXTRA'].includes(option.value))}
                            onChange={(newValue) => setFieldValue('packageType', newValue)}
                        />
                        <ErrorMessage
                            name="packageType"
                            component="p"
                            className="formik-error"
                        />
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
                                    Výber dátumu*
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}>
                                <DatePicker
                                    className="w-full"
                                    label="Začiatok poistenia"
                                    minDate={today}
                                    value={values.startDate}
                                    onChange={(newDate) => setFieldValue('startDate', newDate)}
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="p"
                                    className="formik-error"
                                />
                            </Grid>
                            {values.insuranceType === 'SHORT_TERM' && (
                                <Grid
                                    item
                                    xs={10}
                                    sm={6}>
                                    <DatePicker
                                        className="w-full"
                                        label="Koniec poistenia"
                                        minDate={addDays(values.startDate, 1)}
                                        value={values.endDate}
                                        onChange={(newDate) => setFieldValue('endDate', newDate)}
                                    />
                                    <ErrorMessage
                                        name="endDate"
                                        component="p"
                                        className="formik-error"
                                    />
                                </Grid>
                            )}

                            <Grid
                                item
                                xs={12}>
                                <p className="text-left font-bold">Pripoistenia</p>
                            </Grid>
                            <Grid
                                item
                                xs={12}>
                                <div className="flex align-start flex-wrap">
                                    <FormControlLabel
                                        label="Storno cesty"
                                        control={
                                            <Checkbox
                                                checked={values.hasTripCancellation}
                                                onChange={handleChange}
                                                name="hasTripCancellation"
                                            />
                                        }
                                        className="w-full"
                                    />
                                    <FormControlLabel
                                        label="Športové aktivity"
                                        control={
                                            <Checkbox
                                                checked={values.hasSportActivities}
                                                onChange={handleChange}
                                                name="hasSportActivities"
                                            />
                                        }
                                        className="w-full"
                                    />
                                </div>
                            </Grid>

                            <Grid
                                item
                                xs={12}>
                                <p className="text-left font-bold">Počet osôb*</p>
                            </Grid>
                            <Grid
                                item
                                xs={12}>
                                <Slider
                                    aria-label="Restricted values"
                                    min={1}
                                    max={3}
                                    value={values.numberOfPersons}
                                    valueLabelFormat={valueLabelFormat}
                                    step={1}
                                    valueLabelDisplay="auto"
                                    marks={numberOfPersonsLabels}
                                    onChange={(_, value) => setFieldValue('numberOfPersons', value)}
                                />
                            </Grid>
                        </Grid>

                        <RenderResult
                            resultPrice={resultPrice}
                            values={values}
                        />

                        <div className="flex gap-6 mt-4">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained">
                                Vypočítať
                            </Button>
                            <Button
                                onClick={() => {
                                    resetForm()
                                    setResultPrice(null)
                                }}
                                fullWidth
                                variant="outlined">
                                Vyčistiť
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </LayerContainer>
    )
}

export default InsuranceForm
