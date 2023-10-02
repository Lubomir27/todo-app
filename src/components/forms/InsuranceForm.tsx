import AddModeratorIcon from '@mui/icons-material/AddModerator'
import AlarmIcon from '@mui/icons-material/Alarm'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SecurityIcon from '@mui/icons-material/Security'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'

import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Slider, Typography } from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { addDays } from 'date-fns'
import { ErrorMessage, Form, Formik } from 'formik'
import { round } from 'lodash'
import { useState } from 'react'
import logo from '../../assets/aston-logo.svg'

import {
    BASIC_PACKAGE_PRICE_PER_DAY,
    BASIC_PACKAGE_PRICE_PER_YEAR,
    EXTRA_PACKAGE_PRICE_PER_DAY,
    EXTRA_PACKAGE_PRICE_PER_YEAR,
    LONG_TERM_SURCHARGE_CANCELATION,
    LONG_TERM_SURCHARGE_SPORT,
    MEDIUM_PACKAGE_PRICE_PER_DAY,
    MEDIUM_PACKAGE_PRICE_PER_YEAR,
    SHORT_TERM_SURCHARGE_CANCELATION,
    SHORT_TERM_SURCHARGE_SPORT,
} from '../../common/constants'

import { countDaysFromStartToEndDates } from '../../common/util'
import ToggleButtonComponent from './ToggleButtonComponent'
import './forms.scss'
import { InsuranceType, PackageType } from './types'
import { insuranceFormValidation } from './validations'

type FormData = {
    insuranceType: InsuranceType | null
    packageType: PackageType | null
    startDate: Date | null
    endDate: Date | null
    hasTripCancellation: boolean
    hasSportActivities: boolean
    numberOfPersons: number
}

export default function SignUp() {
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

    const getPackagePrice = (packageType: PackageType | null, priceType: 'DAY' | 'YEAR') => {
        switch (packageType) {
            case 'BASIC':
                return priceType === 'DAY' ? BASIC_PACKAGE_PRICE_PER_DAY : BASIC_PACKAGE_PRICE_PER_YEAR
            case 'MEDIUM':
                return priceType === 'DAY' ? MEDIUM_PACKAGE_PRICE_PER_DAY : MEDIUM_PACKAGE_PRICE_PER_YEAR
            case 'EXTRA':
                return priceType === 'DAY' ? EXTRA_PACKAGE_PRICE_PER_DAY : EXTRA_PACKAGE_PRICE_PER_YEAR
            default:
                return 0
        }
    }

    const getPriceWithExtraInsurances = (
        price: number,
        insuranceType: InsuranceType | null,
        hasTripCancellation: boolean,
        hasSportActivities: boolean
    ) => {
        if (!hasTripCancellation && !hasSportActivities) {
            return price
        }
        switch (true) {
            case hasTripCancellation && hasSportActivities: {
                const surcharge =
                    insuranceType === 'SHORT_TERM'
                        ? SHORT_TERM_SURCHARGE_CANCELATION * SHORT_TERM_SURCHARGE_SPORT
                        : LONG_TERM_SURCHARGE_CANCELATION * LONG_TERM_SURCHARGE_SPORT
                return round(price * surcharge, 2)
            }

            case !hasTripCancellation && hasSportActivities: {
                const surcharge = insuranceType === 'SHORT_TERM' ? SHORT_TERM_SURCHARGE_SPORT : LONG_TERM_SURCHARGE_SPORT
                return round(price * surcharge, 2)
            }

            case hasTripCancellation && !hasSportActivities: {
                const surcharge = insuranceType === 'SHORT_TERM' ? SHORT_TERM_SURCHARGE_CANCELATION : LONG_TERM_SURCHARGE_CANCELATION
                return round(price * surcharge, 2)
            }
            default:
                return 0
        }
    }

    const countPrice = (data: FormData) => {
        const { insuranceType, packageType, startDate, endDate, hasTripCancellation, hasSportActivities, numberOfPersons } = data
        let price = 0

        if (insuranceType === 'SHORT_TERM') {
            const daysForInsurance: number = countDaysFromStartToEndDates(startDate as Date, endDate as Date)

            const pricePerDay = getPackagePrice(packageType, 'DAY')
            price = daysForInsurance * pricePerDay * numberOfPersons
            return getPriceWithExtraInsurances(price, insuranceType, hasTripCancellation, hasSportActivities)
        }

        price = getPackagePrice(packageType, 'YEAR') * numberOfPersons
        return getPriceWithExtraInsurances(price, insuranceType, hasTripCancellation, hasSportActivities)
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

    const commonIconProps = {
        sx: {
            fontSize: '4rem',
            '@media (max-width: 768px)': {
                fontSize: '2rem',
            },
        },
        color: 'error',
    }

    // Function to generate icons with common styling
    const createStyledIcon = (IconComponent: React.ElementType) => <IconComponent {...commonIconProps} />

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

    const valueLabelFormat = (value: number) => {
        return numberOfPersonsLabels.findIndex((mark) => mark.value === value) + 1
    }

    const renderResult = (values: FormData) => {
        if (resultPrice) {
            const priceLabel = values.insuranceType === 'LONG_TERM' ? '€ ročne' : '€'

            return (
                <Grid
                    item
                    xs={12}>
                    <p className="border-2 border-black py-2 font-bold">
                        Výsledná suma: {resultPrice} {priceLabel}
                    </p>
                </Grid>
            )
        }
        return null // Don't render anything if resultPrice is null
    }

    return (
        <Container
            component="main"
            maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginBottom: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <div className="my-5">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[12rem] sm:w-[16rem]"
                    />
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={insuranceFormValidation}
                    onSubmit={(values) => {
                        setResultPrice(countPrice(values))
                        console.log(values)
                    }}>
                    {({ setFieldValue, handleSubmit, handleChange, values, resetForm }) => (
                        <Form onSubmit={handleSubmit}>
                            {/*  Insurance type */}
                            <p className="text-left font-bold mb-4">Typ postenia*</p>
                            <ToggleButtonComponent
                                value={values.insuranceType}
                                options={options.filter((option) => ['SHORT_TERM', 'LONG_TERM'].includes(option.value))}
                                onChange={(newValue) => setFieldValue('insuranceType', newValue)}
                            />
                            <ErrorMessage
                                name="insuranceType"
                                component="p"
                                className="formik-error"
                            />
                            {/*  Package type */}
                            <p className="text-left font-bold my-4">Výber balíka*</p>
                            <ToggleButtonComponent
                                value={values.packageType}
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
                                {/*  Dates */}

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

                                {/*  Extra insurances */}

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

                            {/* Result */}
                            {renderResult(values)}

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
            </Box>
        </Container>
    )
}
