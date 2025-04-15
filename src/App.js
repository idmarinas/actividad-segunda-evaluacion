import './App.css';
import Vehiculo from './entity/Vehiculo';
import TopBar from './components/layouts/TopBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Footer from './components/layouts/Footer';
import Estadisticas from './pages/Estadisticas';
import { Container } from '@mui/material';

function App() {
  const vehiculo = new Vehiculo();

  console.log(vehiculo);

  return (
    <>
      <TopBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lista' element={<Lista />} />
          <Route path='/estatisticas' element={<Estadisticas />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
