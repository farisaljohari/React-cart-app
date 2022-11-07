import { Container } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { clearCart, removeFromCart } from "../rtk/slices/cart-slice";
function Cart(){
    const cart=useSelector((state)=>{
        return state.cart;
    });
    const dispatch=useDispatch();
    const totalPrice=cart.reduce((acc,product)=>{
        acc=acc+product.price*product.quantity;
        return acc;
    },0);
    return(
        <>
            <Container className="py-5 my-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Quantity</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Description</th>
                        <th>price</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((prod)=>(
                                    <tr key={prod.id}>
                                        <td>{prod.quantity}</td>
                                        <td>{prod.title}</td>
                                        <td><img src={prod.image} alt="" style={{ width: '150px',height:'150px' }} /></td>
                                        <td>{prod.description}</td>
                                        <td>{prod.price}$</td>
                                        <td><Button variant="danger" onClick={
                                            ()=>{
                                                dispatch(removeFromCart(prod))
                                            }
                                        }>Remove</Button></td>
                                    </tr>
                            )
                            
                            )
                            
                        }
                        <tr>
                            <td colSpan="2" ><h4>Total</h4></td>
                            <td colSpan="4" ><h4>{totalPrice.toFixed(2)}$</h4></td>
                        </tr>
                    </tbody>
                </Table>
                
                <Button variant="primary" onClick={
                                            ()=>{
                                                dispatch(clearCart())
                                            }
                                        }>clear cart</Button>
                
            </Container>
        </>
    )
}
export default Cart;