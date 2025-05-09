import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Estadisticas from './pages/Estadisticas';
import TopBar from './components/layouts/TopBar';
import Footer from './components/layouts/Footer';
import { Alert, Container, Paper, Snackbar } from '@mui/material';
import { useSnackbar, VehiculosProvider } from './contexts/AppContext';

export default function App() {
  const { snackbarOpen, handleClose, snackbarSeverity, snackbarDuration, snackbarMessage } = useSnackbar();

  return (
    <>
      <VehiculosProvider>
        <TopBar />
        
        <Paper square component={Container} elevation={16} sx={{ padding: 2, bgcolor: 'primary.light', color: 'white', flexGrow: 1, zIndex: 100 }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/lista' element={<Lista />} />
              <Route path='/estadisticas' element={<Estadisticas />} />
            </Routes>
        </Paper>
      </VehiculosProvider>

      <Snackbar
        open={snackbarOpen} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
        autoHideDuration={snackbarDuration} 
        onClose={handleClose}
      >
        <Alert variant='filled' severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}
