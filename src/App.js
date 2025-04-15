import './App.css';
import Vehiculo from './entity/Vehiculo';
import Header from './components/layouts/Header';
import TopBar from './components/layouts/TopBar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Lista from './pages/Lista';
import Footer from './components/layouts/Footer';

function App() {
  const vehiculo = new Vehiculo();

  console.log(vehiculo);

  return (
    <>
      <TopBar />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lista' element={<Lista />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
