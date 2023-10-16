import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Footer = () => {
    return (
        <Box
            sx={{ bgcolor: 'background.paper', p: 6 }}
            component="footer">
            <Typography
                variant="h6"
                align="center"
                gutterBottom>
                Ľubomír Bučko
            </Typography>
            <Typography
                variant="subtitle1"
                align="center"
                color="text.secondary"
                component="p">
                Kľudne kopíruj tento projekt, ak máš nejaké otázky, tak ma neváhaj kontaktovať!
            </Typography>
        </Box>
    )
}

export default Footer
