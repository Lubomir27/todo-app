import 'normalize.css' //must be before all others css

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.min.css'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ToastContainer } from 'react-toastify'

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { skSK } from '@mui/x-date-pickers/locales'
import { sk } from 'date-fns/locale'

import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './components/routes'
import './index.css'

const queryClient = new QueryClient()
const defaultTheme = createTheme()
function App() {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={sk}
            localeText={skSK.components.MuiLocalizationProvider.defaultProps.localeText}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <RouterProvider router={createBrowserRouter(routes)} />
                </ThemeProvider>
            </QueryClientProvider>
        </LocalizationProvider>
    )
}

export default App
