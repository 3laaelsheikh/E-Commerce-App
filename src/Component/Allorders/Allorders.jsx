import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';

const Allorders = () => {

    const [userOrders, setUserOrders] = useState(null);

    useEffect(() => {
        const res = jwtDecode(localStorage.getItem("tkn"));
        getUserOrders(res.id);
    }, []);

    async function getUserOrders(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            console.log(data);
            setUserOrders(data);

        } catch (error) {
            console.log("erorr", error);

        }
    }


    if (userOrders === null) {
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
            <title>All Orders</title>
        </Helmet>

        <div className="container">
            <div className="row gy-4">
                {userOrders.map(function (order, idx) {
                    return <div key={idx} className="col-md-6 ">
                        <div className="order bg-body-secondary rounded-3 p-4">
                            <div className="container">
                                <div className="row">
                                    {order.cartItems?.map(function (item, index) {
                                        return <div key={index} className="col-sm-4">
                                            <div className=' bg-body-secondary'>
                                                <img src={item.product.imageCover} className='w-75' alt={item.product.title} />
                                                <h5>Title: {item.product.title.split(' ').slice(0, 2).join(" ")}</h5>
                                                <p>Count: {item.count}</p>
                                                <p>Price: {item.price}</p>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>


                            <p>Ordered With Phone: {order.shippingAddress.phone}</p>
                            <p>Ordered Details: {order.shippingAddress.details}</p>
                            <p>City: {order.shippingAddress.city}</p>
                            <h5>Total Price: {order.totalOrderPrice}</h5>
                            <h5>Payment Method: {order.paymentMethodType}</h5>
                        </div>
                    </div>

                })}

            </div>
        </div>




    </>
}

export default Allorders;
