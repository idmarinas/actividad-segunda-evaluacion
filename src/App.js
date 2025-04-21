import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Estadisticas from './pages/Estadisticas';
import TopBar from './components/layouts/TopBar';
import Footer from './components/layouts/Footer';
import { Container, Paper } from '@mui/material';

export default function App() {
  return (
    <>
      <TopBar />
      
      <Paper square component={Container} elevation={16} sx={{ padding: 2, bgcolor: 'primary.light', color: 'white', flexGrow: 1, zIndex: 100 }}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lista' element={<Lista />} />
          <Route path='/estadisticas' element={<Estadisticas />} />
        </Routes>
      </Paper>

      <Footer />
    </>
  );
}
