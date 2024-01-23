import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar, Nav, Container,Button, Form, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()



  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
    <Navbar bg='success' className='text-danger' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
                <Navbar.Brand className='text-white '><span className='hover:text-green-200'>Pistachio</span></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <LinkContainer to='/cart'>
                <Nav.Link className='text-white' ><span className='hover:text-green-200'><i className='fas fa-shopping-cart'></i>Cart</span></Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

              </NavDropdown>
            ) : <LinkContainer to='/login'>
            <Nav.Link className='text-white'><span className='hover:text-green-200'><i className='fas fa-user'></i>Login</span></Nav.Link>
        </LinkContainer>}

            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success" className='border border-white '>Search</Button>
          </Form>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  

    </header>
  )
}

export default Header
