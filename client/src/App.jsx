import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/dashboard/home/Home';
import { AppRoutes } from './Routes/AppRoutes';
import { Container } from 'react-bootstrap';
import { Register } from './pages/auth/Register/Register';
import { TravelsProvider } from './context/TravelsContext';

function App() {
  return (
    <Container fluid>
      <TravelsProvider>
        <AppRoutes />
      </TravelsProvider>
    </Container>
  )
}

export default App
