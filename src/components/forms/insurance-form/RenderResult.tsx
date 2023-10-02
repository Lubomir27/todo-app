import { Grid } from '@mui/material'
import React from 'react'
import { FormData } from './types'

type RenderResultProps = {
    resultPrice: number | null
    values: FormData
}

const RenderResult: React.FC<RenderResultProps> = ({ resultPrice, values }) => {
    if (resultPrice !== null) {
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

    return null
}

export default RenderResult
