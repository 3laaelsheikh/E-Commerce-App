import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import { RotatingLines } from 'react-loader-spinner';
import axios from 'axios';

const Categoryslider = () => {

    function getAllCategory() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    }
    const { data, isLoading } = useQuery("categorySlider", getAllCategory, {
        refetchOnMount: false
    });


    if (isLoading) {

        return <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />

    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false
    };


    return <>

        <div className='my-5 '>

            <Slider {...settings}>

                {data?.data.data.map(function (category, idx) {
                    return <div key={idx}>
                        <img style={{ width: "100%", height: "200px" }} src={category.image} alt="slider" />
                        <h6 className="my-3 d-flex justify-content-center align-items-center">{category.name}</h6>
                    </div>
                })}



            </Slider>
        </div>

    </>
}

export default Categoryslider;
