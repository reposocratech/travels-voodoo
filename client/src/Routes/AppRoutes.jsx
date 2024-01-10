import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from '../pages/dashboard/home/Home';
import { ErrorPage } from '../pages/dashboard/errorPage/ErrorPage';
import NavBarApp from '../components/NavBarApp/NavBarApp';
import {Row, Col} from 'react-bootstrap'
import { Register } from '../pages/auth/Register/Register';
import { Login } from '../pages/auth/Login/Login';
import { About } from '../pages/dashboard/About/About';
import { AdminHome } from '../pages/admin/AdminHome/AdminHome';
import { AllUsers } from '../pages/users/allusers/AllUsers';
import { User } from '../pages/users/users/user/User';
import { EditUser } from '../pages/users/users/editUser/EditUser';

export const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Row>
            <NavBarApp />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/admin' element={<AdminHome />} />
                <Route path='/allusers' element={<AllUsers />} />
                <Route path='/user' element={<User />} />
                <Route path='/edituser' element={<EditUser />} />
                <Route path='*' element={<ErrorPage/>} />
            </Routes>
        </Row>
    </BrowserRouter>
  )
}
