import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { WishlistContext } from '../Context/wishlistContext';
import { RotatingLines } from 'react-loader-spinner';
import { CartContext } from '../Context/cartContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Wishlist = () => {


    const { wishProducts, deleteProduct } = useContext(WishlistContext);
    const { addProductToCart } = useContext(CartContext);

    if (wishProducts === null) {
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


    if (wishProducts.length === 0) {
        return <>

            <div className="container d-flex justify-content-center rounded-3 my-5 gy-5 py-5 bg-body-secondary">
                <h1 className='main-color'>Your Wishlist is Empty... <Link className='text-decoration-none' to="/home">Add Products?</Link></h1>
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



    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Error Happend..")
        }

    }


















    return <>



        <Helmet>
            <title>Wishlist</title>
        </Helmet>


        <div style={{ backgroundColor: "#eee" }} className="container py-5">
            <div className="text-center">
                <h1 className='my-3'>Wishlist CART</h1>
            </div>




            {wishProducts?.map(function (product, idx) {
                return <div key={idx} className="row my-2 border-bottom border-3 align-align-items-center  p-2">
                    <div className="col-sm-2">
                        <img src={product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-sm-8">
                        <h2 className='my-1'>Title:{product.title}</h2>
                        <h5 className='main-color my-1'>Price: {product.price}</h5>
                        <button onClick={() => deleteElement(product.id)} className='btn btn-outline-danger my-1'>Remove</button>
                    </div>
                    <div className="col-sm-2">
                        <button onClick={() => addProduct(product.id)} className='btn main-bg-color mt-2 text-white w-100 '>+Add to cart</button>
                    </div>

                </div>
            })}


        </div>











    </>
}

export default Wishlist;
