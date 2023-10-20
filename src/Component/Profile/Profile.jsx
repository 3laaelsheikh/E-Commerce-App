import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RotatingLines } from 'react-loader-spinner';

const Profile = () => {

    const [name, setName] = useState(null);

    useEffect(() => {
        const res = jwtDecode(localStorage.getItem("tkn"));
        setName(res.name);
    }, []);

    if (name === null) {
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
            <title>Profile</title>
        </Helmet>


        <div className="container bg-body-secondary rounded-3 my-5">
            <h1 className='text-center main-color py-5 gy-5 '>Welcome to our website, {name} .</h1>
        </div>


    </>
}

export default Profile;
