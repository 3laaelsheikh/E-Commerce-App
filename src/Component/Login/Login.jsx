import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { authcontext } from './../Context/authentication';
import { Helmet } from 'react-helmet';

const Register = () => {

    const { setToken } = useContext(authcontext);

    let user = {
        email: "",
        password: "",
    }

    const [errMsg, setErrMsg] = useState(null);
    const [sucssesMsg, setSucssesMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function loginToAccount(values) {

        setIsLoading(true);
        console.log("sending to backend");


        try {

            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            console.log(data);

            if (data.message === "success") {
                localStorage.setItem("tkn", data.token);
                setToken(data.token);
                setSucssesMsg("Welcome Back");
                setTimeout(() => {
                    navigate("/home");
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

        onSubmit: loginToAccount,

        validate: function (values) {

            setErrMsg(null);

            const errors = {};

            if (!values.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                errors.email = "Email not valid example: exemple@yyy.zzz ";
            }

            if (!values.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
                errors.password = "Enter valid password include Minimum eight characters, at least one letter, one number and one special character";
            }


            return errors;

        }


    });




    return <>


        <Helmet>
            <title>Login</title>
        </Helmet>


        <div className='w-75 m-auto py-5'>

            {errMsg ? <div className="alert alert-danger">{errMsg}</div> : ""}

            {sucssesMsg ? <div className="alert alert-success">{sucssesMsg}</div> : ""}

            <h2>Login:</h2>

            <form onSubmit={formikObj.handleSubmit} >

                <label htmlFor="email">email:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} id='email' type="email" placeholder='Enter your e-mail..' className='form-control mb-3' />
                {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email} </div> : ""}


                <label htmlFor="password">password:</label>
                <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password' type="password" placeholder='Enter your password..' className='form-control mb-3' />
                {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password} </div> : ""}


                <button type='submit' disabled={(formikObj.isValid === false || formikObj.dirty == false)} className="btn btn-lg bg-success text-white">

                    {isLoading ? <FallingLines
                        color="#fff"
                        width="40"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    /> : "Login"}



                </button>

            </form>

        </div>


    </>
}

export default Register;