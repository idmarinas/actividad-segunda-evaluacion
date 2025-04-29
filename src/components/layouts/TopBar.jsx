import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Logo from '../icons/Logo';
import { Link } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import NewVehiculoDialogForm from '../dialogs/NewVehiculoDialog';

const pages = ['Lista', 'Estadisticas'];

export default function TopBar() {
    const [ anchorElNav, setAnchorElNav ] = useState(null);
    const [ dialogOpen, setDialogOpen ] = useState(false);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);

    return (
        <AppBar position="static" sx={{ zIndex: 200}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Tooltip title="Coches Mariano">
                        <Logo sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    </Tooltip>
                    
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        textAlign="center"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, textDecoration: 'none', color: 'inherit'}}
                    >
                        Mariano
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem component={Link} to={page.toLowerCase()} key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Tooltip title="Coches Mariano">
                        <Logo sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Tooltip>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Mariano
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                component={Link}
                                key={page}
                                to={page.toLowerCase()}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Button size="large" variant='contained' aria-label="Añadir vehículo" color="secondary" onClick={handleDialogOpen}>
                        <AddCircle sx={{ marginRight: 1 }} /> Añadir Vehículo
                    </Button>
                    <NewVehiculoDialogForm open={dialogOpen} onClose={handleDialogClose} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
