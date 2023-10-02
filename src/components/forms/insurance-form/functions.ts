import { round } from 'lodash'
import {
    BASIC_PACKAGE_PRICE_PER_DAY,
    BASIC_PACKAGE_PRICE_PER_YEAR,
    MEDIUM_PACKAGE_PRICE_PER_DAY,
    MEDIUM_PACKAGE_PRICE_PER_YEAR,
    EXTRA_PACKAGE_PRICE_PER_DAY,
    EXTRA_PACKAGE_PRICE_PER_YEAR,
    SHORT_TERM_SURCHARGE_CANCELATION,
    SHORT_TERM_SURCHARGE_SPORT,
    LONG_TERM_SURCHARGE_CANCELATION,
    LONG_TERM_SURCHARGE_SPORT,
} from './constants'
import { countDaysFromStartToEndDates } from '../../../common/util'
import { PackageType, InsuranceType, FormData } from './types'

export const getPackagePrice = (packageType: PackageType | null, priceType: 'DAY' | 'YEAR') => {
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

export const getPriceWithExtraInsurances = (
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

export const calculatePrice = (data: FormData) => {
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
