import React, { useContext } from 'react';
import { CartContext } from '../Context/cartContext';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Cart = () => {

    const { cartId, cartProducts, totalCartPrice, deleteProduct, updateCount, deleteCartData } = useContext(CartContext);

    if (cartProducts === null) {
        return <div className="vh-100 d-flex justify-content-center align-items-center">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>

    }

    if (cartProducts.length === 0) {
        return <>

            <div className="container d-flex justify-content-center rounded-3 my-5 gy-5 py-5 bg-body-secondary">
                <h1 className='main-color'>Your Cart is Empty... <Link className='text-decoration-none' to="/home">Add Products?</Link></h1>
            </div>

        </>
    }

    async function deleteElement(id) {
        const res = await deleteProduct(id);


        if (res.status === "success") {
            toast.success("Product Removed Successfully")
        }
        else {
            toast.error("Error Happend..")
        }


    }


    async function updateElementCount(id, count) {
        const res = await updateCount(id, count);

        if (res.status === "success") {
            toast.success("Updated Successfully")
        }
        else {
            toast.error("Error Happend..")
        }
    }

    async function deleteCart() {
        const res = await deleteCartData();
        console.log(res);


        if (res.status === "success") {
            toast.success("Cart Removed Successfully")
        }
        else {
            toast.error("Error Happend..")
        }


    }




    return <>

        <Helmet>
            <title>Cart</title>
        </Helmet>


        <div style={{ backgroundColor: "#eee" }} className="container py-5">
            <div className="text-center">
                <h1 className='my-3'>SHOP CART</h1>
                <div><h3 className='my-2 main-color'>Total Price: {totalCartPrice}</h3></div>
                <div className="d-flex justify-content-between p-4">
                    <button onClick={deleteCart} className='btn btn-outline-danger my-2'>Remove</button>
                    <Link to={`/payment/${cartId}`}><button className='btn btn-outline-success my-2'>checkout Session</button></Link>
                </div>
            </div>




            {cartProducts.map(function (product, idx) {
                return <div key={idx} className="row my-2 border-bottom border-3 align-align-items-center  p-2">
                    <div className="col-sm-2">
                        <img src={product.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-sm-8">
                        <h2 className='my-1'>Title:{product.product.title}</h2>
                        <h5 className='main-color my-1'>Price: {product.price}</h5>
                        <button onClick={() => deleteElement(product.product.id)} className='btn btn-outline-danger my-1'>Remove</button>
                    </div>
                    <div className="col-sm-2">
                        <div className="d-flex align-items-center">
                            <button onClick={() => updateElementCount(product.product.id, product.count + 1)} className='btn btn-outline-success'>+</button>
                            <span className='mx-1'>{product.count}</span>
                            <button onClick={() => updateElementCount(product.product.id, product.count - 1)} className='btn btn-outline-success'>-</button>

                        </div>
                    </div>

                </div>
            })}


        </div>



    </>
}

export default Cart;
