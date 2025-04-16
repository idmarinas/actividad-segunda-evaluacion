import { Box, Container } from "@mui/material";

export default function Footer () {
    return (
        <footer>
            <Box sx={{ py: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Container maxWidth="xl">
                    <Box component="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        © 2025 Concesionario Coches Mariano
                    </Box>
                    <Box component="span" sx={{ display: 'block', fontSize: '0.9rem' }}>
                        Todos los derechos reservados.
                    </Box>
                </Container>
            </Box>    
        </footer>
    );
}