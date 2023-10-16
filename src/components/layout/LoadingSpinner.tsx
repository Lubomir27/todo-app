import { CircularProgress } from '@mui/material'

const LoadingSpinner = () => {
    return (
        <div className="flex">
            <CircularProgress className="mx-auto" />
        </div>
    )
}

export default LoadingSpinner
