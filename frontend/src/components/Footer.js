import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <div>
      <footer className='bg-success'>
        <Container> 
                <Row>
                    <Col className='text-center py-3 text-white '>
                        Copyright &copy; Pistachio
                    </Col>
                </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Footer
