import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import TodoListForm from '../../components/forms/TodoListForm'

const TodoListsHero: FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}>
            <Container maxWidth="md">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom>
                    Zoznamy úloh
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph>
                    Pre pridanie nového zoznamu, vyplnte pole nižšie a stlačte potvrdiť, ak máte záujem vidieť a upravovať jednotlivé úlohy
                    zoznamu tak prejdite na detial.
                </Typography>
                <Container maxWidth="sm">
                    <TodoListForm formType="NEW" />
                </Container>
            </Container>
        </Box>
    )
}

export default TodoListsHero
