import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../rtk/slices/cart-slice';
import { fetchProducts } from './../rtk/slices/products-slice';

function Products(){
    const products=useSelector((state)=>{
        return state.products;
    })
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        console.log(products);
        return () => {
            // cleanup
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return(
        <Container className='py-5'>
            <Row className='py-5'>
                {
                    products.map((prod)=>(
                        <Col key={prod.id}>
                            <Card style={{ width: '18rem' }} className="m-2">
                                <Card.Img variant="top" src={prod.image} style={{ height: '300px' }}/>
                                <Card.Body>
                                    <Card.Title>{prod.title.slice(0,10)}</Card.Title>
                                    <Card.Text>
                                    {prod.description.slice(0,50)}..
                                    </Card.Text>
                                    <Card.Text>
                                    {prod.price}$
                                    </Card.Text>
                                    <Button variant="primary" onClick={
                                        ()=>{
                                            return  dispatch(addToCart(prod))
                                        }
                                    }>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
                
            </Row>
        </Container>
    )
}
export default Products;