import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'
import { TravelsContext } from '../../context/TravelsContext';
import { delLocalStorage } from '../../helpers/localStorageUtils';

function NavBarApp() {
  const { user, token, setUser, setToken } = useContext(TravelsContext);
  console.log("contex", token, user);
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorage("token");
    setUser();
    setToken();
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Travels</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

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
              <div className='d-flex'>
                <p>{user.name} {user.lastname}</p>
              </div>
              <Button 
                variant='outline-success me-2 ms-2'
                onClick={logOut}
              >LogOut</Button>
              </>
              }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarApp;