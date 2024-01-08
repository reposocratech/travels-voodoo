import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../pages/dashboard/home/Home';
import { ErrorPage } from '../pages/dashboard/errorPage/ErrorPage';
import NavBarApp from '../components/NavBarApp/NavBarApp';
import {Row, Col} from 'react-bootstrap'
import { Register } from '../pages/auth/Register/Register';
import { Login } from '../pages/auth/Login/Login';

export const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Row>
            <NavBarApp />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<ErrorPage/>} />
            </Routes>
        </Row>
    </BrowserRouter>
  )
}
