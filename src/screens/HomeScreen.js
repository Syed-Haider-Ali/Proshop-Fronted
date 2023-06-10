import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
// import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/ProductActions'

import Product from '../components/Pro'
import Loader from '../components/Loader'
import Alert from '../components/Message'

// import products from '../products'



const HomeScreen = () => {

  const dispatch = useDispatch()
  // const productList = useSelector((state)=>state.productList)
  // const {error , loading, products} = productList
  const {error , loading, products} = useSelector(state => state.productList)

// Products.map(p => {return(...)})  ==  Procucts.map(p =>(...))
// const [products, setProducts] = useState([])

  useEffect(()=>{
    // const fetch = async ()=>{
    //   const {data} = await axios.get('/api/products')
    //   setProducts(data)
    // }
    // fetch()

    dispatch(listProducts())
  },[dispatch])

  // console.log(products)
  return (
    <div>
        <h1>Latest Products</h1>
        
        {loading ? <Loader/> : error ? <h3><Alert variant='danger'>{error}</Alert></h3> :
          <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ) )}
          </Row> 
      }
        
    
    </div>
  )
}

export default HomeScreen