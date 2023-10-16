import { Box, Typography } from '@mui/material'
import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
    const error = useRouteError() as { statusText?: string; message?: string }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
            <Typography
                variant="h1"
                color="primary">
                404
            </Typography>
            <Typography
                variant="h6"
                color="primary">
                {error.statusText || error.message}
            </Typography>
        </Box>
    )
}

export default ErrorPage
