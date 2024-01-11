import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'
import { TravelsContext } from '../../context/TravelsContext';
import { delLocalStorage } from '../../helpers/localStorageUtils';
import './navbarApp.scss'

function NavBarApp() {
  const { user, token, setUser, setToken, setIsLogged } = useContext(TravelsContext);
  console.log("contex", token, user);
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorage("token");
    setUser();
    setToken();
    setIsLogged(false)
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav w-100">
          <Nav className="me-auto d-flex w-100 ">
            <div className='d-flex justify-content-between w-100'>

            <div className='d-flex'>

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            
            {user?.type !== 2 && 
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            }
            {user?.type === 1 && 
              <Nav.Link as={Link} to="/allusers">Todos los usuarios</Nav.Link>
            }
            {user?.type === 2 &&   
              <Nav.Link as={Link} to="/admin">Admin General</Nav.Link>
            }
            </div>

            <div className='d-flex'>

            {!user? 
              <>
                <Button 
                  variant='outline-success me-2'
                  onClick={()=>navigate("/register")}
                  >Register</Button>
                <Button 
                  variant='outline-success me-2'
                  onClick={()=>navigate("/login")}
                  >Login</Button>
              </>:
              <>
              <div className='d-flex user' onClick={()=>navigate('/user')}>
                <p className='mt-3 me-3'>{user.name} {user.lastname}</p>
                <div className='avatar'>
                  {user.user_img?
                    <img src={`http://localhost:3000/images/users/${user.user_img}`}/>
                    :
                    <p>{user.name.charAt(0).toUpperCase()}</p>
                  }
                </div>
              </div>
              <Button 
                variant='outline-success me-2 ms-2'
                onClick={logOut}
                >LogOut</Button>
              </>
              }
              </div>
              </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;