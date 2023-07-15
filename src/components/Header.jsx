import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/images/logo192.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';

const Header = (props) => {




  const navigate = useNavigate();
  const user = useSelector(state => state.user.account)
  const dispatch =useDispatch();



// Logout
  const handleLogout = () => {
    dispatch(handleLogoutRedux());

  }
  useEffect(()=> {
    if (user && user.auth === false && window.location.pathname !== '/login') {
      navigate("/");
      toast.success("log out success")
    }
  }, [user])

  return (<>
    <Navbar expand="lg" className="bg-body-tertiary bg-secondary text-white" >
      <Container>
        <Navbar.Brand href="/">
          <img src={logoApp}
            width="30"
            height="30"
            className='d-inline-block align-top'
            alt='logo'
          />
          <span> REQRES API</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className=''>
          { (user && user.auth || window.location.pathname === "/") && 
             <> 
            <Nav className='me-auto '>

              <NavLink to="/" className="nav-link">Home</NavLink>


              <NavLink to="/users" className="nav-link">Manege Users</NavLink>


            </Nav>
            
            <Nav>
              {user && user.email && <span className='nav-link'>
                Welcome intern{user.email}
              </span>}
              <NavDropdown title="Setting" className='justify-content-end'>
                {/* check đăng nhập hay chưua chỉ hiện 1 trong 2 cái */}
                {user && user.auth === true
                  ? <NavDropdown.Item className="nav-link" onClick={() => handleLogout()}>logout</NavDropdown.Item>
                  : <NavLink to="/login" className="dropdown-item">login</NavLink>
                }

              </NavDropdown>
            </Nav>
            </> 
          } 

        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>)
}
export default Header 