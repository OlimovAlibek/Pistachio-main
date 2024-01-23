import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps';
import { register } from '../actions/userActions';
import Loaderr from '../components/Loaderr';
import Message from '../components/Message';
import { saveShippingAddress } from '../actions/cartActions';


function ShippingScreen({history}) {

  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(address, city, postalcode, country))
    navigate('/payment');

  }


  return (
    <FormContainer>

        <CheckOutSteps step1 step2/>

        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your city'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='postalcode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your postal code'
                        value={postalcode ? postalcode : ''}
                        onChange={(e) => setPostalcode(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter your country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Continue
                </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
