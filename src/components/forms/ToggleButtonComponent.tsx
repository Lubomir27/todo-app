import React, { FC } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

type Option = {
    value: string
    text: string
    icon: React.ReactNode
}

type ToggleButtonComponentProps = {
    value: string | null
    options: Option[]
    onChange: (value: string | null) => void
}

const ToggleButtonComponent: FC<ToggleButtonComponentProps> = ({ value, options, onChange }) => (
    <>
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={(_, newValue) => onChange(newValue)}
            fullWidth
            className="gap-4">
            {options.map((option) => (
                <ToggleButton
                    key={option.value}
                    value={option.value}
                    className={`insurance-toggle flex flex-col gap-4 ${value === option.value ? 'Mui-selected' : ''}`}>
                    {option.icon}
                    <p className="text-left font-bold">{option.text}</p>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    </>
)

export default ToggleButtonComponent
