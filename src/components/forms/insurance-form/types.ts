export type PackageType = 'BASIC' | 'MEDIUM' | 'EXTRA'

export type InsuranceType = 'LONG_TERM' | 'SHORT_TERM'

export type FormData = {
    insuranceType: InsuranceType | null
    packageType: PackageType | null
    startDate: Date | null
    endDate: Date | null
    hasTripCancellation: boolean
    hasSportActivities: boolean
    numberOfPersons: number
}
