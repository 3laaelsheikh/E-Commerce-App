import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    let user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    }

    const [errMsg, setErrMsg] = useState(null);
    const [sucssesMsg, setSucssesMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function registerNewUser(values) {

        setIsLoading(true);
        console.log("sending to backend");


        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            console.log(data);

            if (data.message === "success") {
                setSucssesMsg("Account has Created Successflly");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            }
        }
        catch (err) {
            console.log("error", err);
            setErrMsg(err.response.data.message);
        }

        setIsLoading(false);
    }


    const formikObj = useFormik({

        initialValues: user,

        onSubmit: registerNewUser,

        validate: function (values) {

            setErrMsg(null);

            const errors = {};

            if (values.name.length < 3 || values.name.length > 10) {
                errors.name = "Name must be form 3 characters to 10 characters ";
            }

            if (!values.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                errors.email = "Email not valid example: exemple@yyy.zzz ";
            }

            if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
                errors.password = "Enter valid password include Minimum eight characters, at least one letter, one number and one special character";
            }

            if (values.rePassword !== values.password) {
                errors.rePassword = "password and rePassword doesn't match";
            }

            if (!values.phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) {
                errors.phone = "Enter valid Phone Number";
            }


            return errors;

        }


    });




    return <>


        <Helmet>
            <title>Register</title>
        </Helmet>


        <div className='w-75 m-auto py-5'>

            {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}

            {sucssesMsg ? <div className="alert alert-success">{sucssesMsg}</div> : ""}

            <h2>Register now:</h2>

            <form onSubmit={formikObj.handleSubmit} >

                <label htmlFor="name">Name:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} id='name' type="text" placeholder='Enter your name..' className='form-control mb-3' />
                {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger'>{formikObj.errors.name} </div> : ""}

                <label htmlFor="email">email:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email" placeholder='Enter your e-mail..' className='form-control mb-3' />
                {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email} </div> : ""}


                <label htmlFor="password">password:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" placeholder='Enter your password..' className='form-control mb-3' />
                {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password} </div> : ""}


                <label htmlFor="rePassword">rePassword:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} id='rePassword' type="password" placeholder='Re-password..' className='form-control mb-3' />
                {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger'>{formikObj.errors.rePassword} </div> : ""}


                <label htmlFor="phone">Phone:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} id='phone' type="tel" placeholder='Enter your phone..' className='form-control mb-3' />
                {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'>{formikObj.errors.phone} </div> : ""}


                <button type='submit' disabled={(formikObj.isValid === false || formikObj.dirty == false)} className="btn btn-lg bg-success text-white">

                    {isLoading ? <FallingLines
                        color="#fff"
                        width="40"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /> : "Register"}



                </button>

            </form>

        </div>


    </>
}

export default Register;
