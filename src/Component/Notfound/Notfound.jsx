import React from 'react';
import img1 from "../../images/error.svg"
import { Helmet } from 'react-helmet';

const Notfound = () => {




    return <>

        <Helmet>
            <title>Not Found</title>
        </Helmet>

        <div className="container d-flex align-items-center justify-content-center gy-5 my-5 p-5">
            <img src={img1} />
        </div>


    </>
}

export default Notfound;
