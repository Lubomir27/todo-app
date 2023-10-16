import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { Link as Navigate } from 'react-router-dom'
import Footer from './Footer'

const PageWrapper = ({ children }: { children?: ReactElement | ReactElement[] }) => {
    return (
        <>
            <AppBar position="relative">
                <Container maxWidth="lg">
                    <Toolbar>
                        <Navigate to="/">
                            <Typography
                                variant="h5"
                                color="inherit"
                                noWrap>
                                Domov
                            </Typography>
                        </Navigate>
                    </Toolbar>
                </Container>
            </AppBar>
            <main className="min-h-[100vh]">{children}</main>
            <Footer />
        </>
    )
}

export default PageWrapper
