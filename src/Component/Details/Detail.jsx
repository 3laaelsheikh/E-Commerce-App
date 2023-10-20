import axios from 'axios';
import React, { useContext } from 'react';
import { Oval, RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const Detail = () => {


    const { addProductToCart } = useContext(CartContext);

    const { id } = useParams();

    const [setsendingLoader, setSetsendingLoader] = useState(false);

    async function addProduct(id) {

        setSetsendingLoader(true);

        const res = await addProductToCart(id);

        if (res.status === "success") {
            toast.success(res.message)
        }
        else {
            toast.error("Error Happend..")
        }

        setSetsendingLoader(false);

    }

    function getProductDtails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);

    }
    const { isLoading, data } = useQuery("ProductDtails", getProductDtails);

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


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };


    return <>


        <Helmet>
            <title>{data.data.data.title.split(" ").slice( 0 , 2 ).join(" ")}</title>
        </Helmet>

        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-3">
                    <figure>
                        <Slider {...settings}>

                            {data.data.data.images.map(function (img, idx) {
                                return <div key={idx}>
                                    <img className='w-100' src={img} />
                                </div>
                            })}
                        </Slider>
                    </figure>
                </div>
                <div className="col-md-9">
                    <h1 className='mt-2'>{data.data.data.title}</h1>
                    <h5 className='main-color mt-2'>{data.data.data.category.name}</h5>
                    <p className='mt-2'>{data.data.data.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <p>{data.data.data.price} EGP</p>
                        <p className='mt-2'><span><i className="fa-solid fa-star" style={{ color: "#e1ea62", }} ></i></span> {data.data.data.ratingsAverage}</p>
                    </div>
                    <button onClick={() => addProduct(data.data.data.id)} className='btn main-bg-color mt-2 text-center text-white w-100 '>
                        {setsendingLoader ? <Oval
                            height={30}
                            width={30}
                            color="#fff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#4fa94d"
                            strokeWidth={2}
                            strokeWidthSecondary={2}

                        /> : "+Add to cart"}



                    </button>
                </div>
            </div>
        </div>


    </>
}

export default Detail;
