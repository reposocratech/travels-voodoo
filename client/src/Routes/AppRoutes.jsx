import React, { useContext } from 'react'
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
import { TravelsContext } from '../context/TravelsContext';
import { AdminUsers } from '../pages/admin/AdminUsers/AdminUsers';
import { AdminPictures } from '../pages/admin/AdminPictures/AdminPictures';

export const AppRoutes = () => {

  const {token, user} = useContext(TravelsContext)
  return (
      <BrowserRouter>
        <Row>
            <NavBarApp />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<ErrorPage/>} />
                
                {user?.type !== 2 &&
                  <Route path='/about' element={<About />} />
                }
                {!token && !user && <>
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                </>}
                {token && user?.type === 1 && <>
                  <Route path='/allusers' element={<AllUsers />} />
                </>}

                {token && user && <>
                  <Route path='/user' element={<User />} />
                  <Route path='/edituser' element={<EditUser />} />
                  </>
                }
                {token && user?.type === 2 && <>
                  <Route path='/admin' element={<AdminHome />} />
                  <Route path='/adminUsers' element={<AdminUsers />} />
                  <Route path='/adminPictures' element={<AdminPictures />} />
                </>}
            </Routes>
        </Row>
    </BrowserRouter>
  )
}
