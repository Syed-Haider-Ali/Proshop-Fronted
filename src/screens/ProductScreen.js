import React, {useState, useEffect} from 'react'
import {Link,useParams, useNavigate} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { listProductDetails } from '../actions/ProductActions'
// import axios from 'axios'

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

// import Products from '../products'


const ProductScreen = () => {


  const [qty, setQty] = useState(1)

  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const product = Products.find((p) => p._id === match.params.id)   -- Not getting ID this way -- match.params
  // const product = Products.find((p) => p._id === id)
  // const [product, setProduct] = useState([])
  const {error, loading, product} = useSelector(state => state.productDetails)

  useEffect(()=>{
    // const fetch = async ()=>{
    //   const {data} = await axios.get(`/api/products/${id}`)
    //   setProduct(data)
    // }
    // fetch()
    dispatch(listProductDetails(id))
  },[id, dispatch])

  const addToCartHandler = ()=>{
    console.log(`addToCartHandler called: ${id}`)
    navigate(`/cart/${id}?qty=${qty}`)
  }


  return (
    <div>
      <Link to='/' className='btn my-3 btn-dark'>
        Go back
      </Link>

      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
        : (<Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
  
            <Col md={3}>
               <ListGroup variant='flush'>  {/*  variant='flush' - removes extra border*/}
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
  
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty: </Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control 
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                            >
                              {
                                [...Array(product.countInStock).keys()].map(x =>(
                                  <option key={x+1} value={x+1}>
                                    {x+1}
                                  </option>
                                ))
                              }

                          </Form.Control>
                        </Col>

                      </Row>
                    </ListGroup.Item>
                  ) }


                  <ListGroup.Item>
                      <Row>
                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                      </Row> 
                    </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
  
        </Row>)  
    }

      
    </div>
  )
}

export default ProductScreen