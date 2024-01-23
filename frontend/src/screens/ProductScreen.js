import React, { useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loaderr from '../components/Loaderr'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions'

// import axios from 'axios'

function ProductScreen({}) {

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product}  = productDetails

    const { id } = useParams();
    const navigate = useNavigate();

    // const [product, setProduct] = useState([])

    

  useEffect(() => {
    dispatch(listProductDetails(id))


    // async function fetchProduct () {
    //   const {data} = await axios.get(`/products/${id}`)
    //   setProduct(data)
    // }
    // fetchProduct()
  }, [])

  const addToCartHandler = () => {
    navigate(`/cart/${id}/?qty=${qty}`)
}

    // const product = products.find((p) => p._id === id);
  return (
    <div >
      <Link to='/' className='btn my-3 bg-success text-white'>
        Go Back
      </Link>

      {
        loading ? <Loaderr/>
        :error
        ? <Message variant='danger'>{error}</Message>
        :
        <Row>
        <Col md={6}>
            <Image fluid rounded src={product.image} alt={product.name}></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3 className='text-success'>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className='text-success'>
                    <Rating  value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                </ListGroup.Item>

                <ListGroup.Item className='text-success'>
                    Price: ${product.price}
                </ListGroup.Item>

                <ListGroup.Item className='text-success'>
                    Description: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup  variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col className='text-success'>
                                Price:
                            </Col>
                            <Col>
                                <strong className='text-success'>
                                    ${product.price}
                                </strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col className='text-success'>
                                Status:
                            </Col>
                            <Col>
                                <strong className='text-success'>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                </strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col className='text-success'>qty</Col>
                                <Col xs="auto" className='my-1'>
                                    <Form.Control
                                        as="select"
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map((x) => 
                                                <option value={x + 1} key={x+1}>
                                                    {x+1}
                                                </option>
                                            )
                                        }
                                            
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    <ListGroup.Item className='text-success'>
                        <Button variant='success' className='' onClick={addToCartHandler}  disabled={product.countInStock == 0} type='button'>Add to Cart</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
      }
      
    </div>
  )
}

export default ProductScreen
