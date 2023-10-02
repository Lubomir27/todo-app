// LayerContainer.js
import React, { ReactNode } from 'react'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import logo from '../../../assets/aston-logo.svg'

type LayerContainerProps = {
    children: ReactNode
}

const LayerContainer: React.FC<LayerContainerProps> = ({ children }) => {
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
                {' '}
                <div className="my-5">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-[12rem] sm:w-[16rem]"
                    />
                </div>
                {children}
            </Box>
        </Container>
    )
}

export default LayerContainer
