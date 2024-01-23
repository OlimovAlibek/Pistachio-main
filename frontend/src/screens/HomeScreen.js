import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
// import Loader from '../components/Loader'
// import axios from 'axios'
import { useEffect } from 'react'
import  {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loaderr from '../components/Loaderr'


function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList


  useEffect(() => {

    dispatch(listProducts())
  

  }, [dispatch])



  return (
    <div>
      <h1 className='text-success '>Latest Products</h1>

      {loading ? <Loaderr/>
        : error ? <Message variant='danger'>{error}</Message>
      : <Row>
      {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product}/>
          </Col>
      ))}
    </Row>
    }
      
    </div>
  )
} 

export default HomeScreen
