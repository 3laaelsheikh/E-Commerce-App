import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const Brands = () => {

    function getAllBrands() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands");

    }
    const { isLoading, data } = useQuery("allBrands", getAllBrands, {});

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
            <title>Brands</title>
        </Helmet>

        <div className="container">
            <div className="row py-5 gy-4">
                <h1 className="main-color d-flex justify-content-center align-items-center p-4">All Brands</h1>
                {data?.data.data.map(function (Product, idx) {
                    return <div key={idx} className="col-md-4">
                        <Link className='text-decoration-none text-black'>
                            <div className='home-products'>
                                <img src={Product.image} className='w-100' alt={Product.title} />
                                <h3 className="main-color text-center">{Product.name}</h3>
                            </div>
                        </Link>

                    </div>
                })}

            </div>
        </div>



    </>
}

export default Brands;
