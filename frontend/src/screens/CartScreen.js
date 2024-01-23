import React, {useEffect} from 'react'
import {Link, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart   } from '../actions/cartActions'

function CartScreen({history}) {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    
    const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1;

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log('cartItems:', cartItems)

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate(`/login?redirect=/shipping`)
    }

  return (
    <Row>
        <Col md={8}>
            <h1 className='text-success' >Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message  variant='info'>
                    Your cart is empty <Link to={'/'}>Go Back</Link>
                </Message>
            ):
            <ListGroup variant='flush'>
                {cartItems.map(item => 
                    <ListGroup.Item>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} fluid rounded alt={item.name} />
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                ${item.price}
                            </Col>

                            <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => 
                                                <option value={x + 1} key={x+1}>
                                                    {x+1}
                                                </option>
                                            )
                                        }
                                            
                                    </Form.Control>
                            </Col>

                            <Col md={1}>
                                <Button  onClick={() => removeFromCartHandler(item.product)} type='button' variant='outline-success'>
                                        <i className='fas fa-trash hover:text-success'></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    )}
            </ListGroup>

            
}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h2 className='text-success'>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)}  items </h2>
                        <span className='text-success'>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                    <Button variant='success' type='button' className=' hover:bg-white' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen
