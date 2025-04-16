import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Estadisticas from './pages/Estadisticas';
import TopBar from './components/layouts/TopBar';
import Footer from './components/layouts/Footer';
import { Container, Paper, Typography } from '@mui/material';
import { useTitle } from './contexts/AppContext';

export default function App() {
  const { title } = useTitle();

  return (
    <>
      <TopBar />

      <Paper elevation={3} sx={{ padding: 2, bgcolor: 'primary.light', color: 'white' }}>
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>{title}</Typography>
      </Paper>
      
      <Container>
          <Paper elevation={3} sx={{ padding: 2, marginY: 2, bgcolor: 'primary.light', color: 'white' }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/lista' element={<Lista />} />
              <Route path='/estadisticas' element={<Estadisticas />} />
            </Routes>
          </Paper>
      </Container>

      <Footer />
    </>
  );
}
