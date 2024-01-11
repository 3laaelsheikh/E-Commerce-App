import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { CartContext } from '../Context/cartContext';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';

const Payment = () => {

    const { cartId } = useContext(CartContext);


    async function Order(shippingAddress) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
                {
                    shippingAddress
                },
                {
                    headers: { token: localStorage.getItem("tkn") },
                    params: { url: `https://3laaelsheikh.github.io/E-Commerce-App/#` }
                });



            console.log(data.session.url);
            window.location.href = data.session.url;

        }
        catch (err) {
            console.log("error", err);
        }
    }

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: Order
    })









    return <>

        <Helmet>
            <title>Payment</title>
        </Helmet>

        <form onSubmit={formik.handleSubmit} className='container w-100 p-5' >

            <label htmlFor="details">Details:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} id='details' type="tel" placeholder='Enter your details..' className='form-control mb-3' />

            <label htmlFor="phone">Phone:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' type="tel" placeholder='Enter your phone..' className='form-control mb-3' />

            <label htmlFor="city">City:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} id='city' type="text" placeholder='Enter your city..' className='form-control mb-3' />


            <button type='submit' className="btn btn-lg bg-success text-white">online checkout session</button>
        </form>



    </>
}

export default Payment;
