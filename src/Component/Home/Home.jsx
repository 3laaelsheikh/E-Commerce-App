import axios from 'axios';
import React, { useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homeslider from './../Homeslider/Homeslider';
import Categoryslider from '../Categoryslider/Categoryslider';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../Context/wishlistContext';
import { Helmet } from 'react-helmet';

const Home = () => {

    const { addProductToCart } = useContext(CartContext);
    const { addProductToWish } = useContext(WishlistContext);




    async function addProduct(id) {
        const res = await addProductToCart(id);

        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Error Happend..")
        }

    }


    async function setItem(id) {
        const res = await addProductToWish(id);

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
            <title>Home</title>
        </Helmet>


        <div className="container py-5 ">

            <div className="row gx-0 mb-5">
                <div className="col-sm-9">
                    <Homeslider />
                </div>
                <div className="col-sm-3">
                    <img style={{ width: "100%", height: "200px" }} src={require("../../images/image 15.png")} alt="" />
                    <img style={{ width: "100%", height: "200px" }} src={require("../../images/image 5.jpg")} alt="" />

                </div>
            </div>

            <Categoryslider />


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
                        <div className="d-flex">
                            <button onClick={() => addProduct(Product.id)} className='btn main-bg-color mt-2 text-white w-100 '>+Add to cart</button>
                            <button onClick={() => setItem(Product.id)} className='btn  mt-2'><i className="fa-solid fa-heart" style={{ color: "#0d0d0d", }}></i></button>

                        </div>
                    </div>
                })}

            </div>

        </div>



    </>
}

export default Home;
