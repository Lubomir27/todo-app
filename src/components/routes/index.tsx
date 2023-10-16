import ErrorPage from '../../pages/ErrorPage'
import HomePage from '../../pages/HomePage'
import TodoDetailPage from '../../pages/TodoDetailPage'

export const routes = [
    {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/zoznamy/:title/:id',
        element: <TodoDetailPage />,
        errorElement: <ErrorPage />,
    },
]
