import React, { useContext } from 'react';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from 'react-query';
import { RotatingLines } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Products = () => {

    const { addProductToCart } = useContext(CartContext);


    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Error Happend..")
        }

    }


    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");

    }
    const { isLoading, data } = useQuery("allProducts", getAllProducts, {});

    if (isLoading) {
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





    return <>


        <Helmet>
            <title>All Products</title>
        </Helmet>


        <div className="container">
            <div className="row py-5 gy-4">
                {data?.data.data.map(function (Product, idx) {
                    return <div key={idx} className="col-md-2">
                        <Link to={`/details/${Product.id}`} className='text-decoration-none text-black'>
                            <div className='home-products'>
                                <img src={Product.imageCover} className='w-100' alt={Product.title} />
                                <h6 className="main-color">{Product.category.name}</h6>
                                <h5>{Product.title.split(' ').slice(0, 2).join(" ")}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p>{Product.price} EGP</p>
                                    <p><span><i className="fa-solid fa-star" style={{ color: "#e1ea62", }} ></i></span> {Product.ratingsAverage}</p>
                                </div>

                            </div>
                        </Link>
                        <button onClick={() => addProduct(Product.id)} className='btn main-bg-color mt-2 text-white w-100 '>+Add to cart</button>

                    </div>
                })}

            </div>
        </div>




    </>
}

export default Products;
