import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Homeslider = () => {
    
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    
    
    return<>
    
    <div>
        
        <Slider {...settings}>
          
          <div>
            <img style={{width: "100%", height:"400px"}} src={require("../../images/image 2.jpg")}  alt="slider" />
          </div>
          
          <div>
            <img style={{width: "100%", height:"400px"}} src={require("../../images/image 4.jpg")}  alt="slider" />
          </div>
          <div>
            <img style={{width: "100%", height:"400px"}} src={require("../../images/image 7.png")}  alt="slider" />
          </div>
          <div>
            <img style={{width: "100%", height:"400px"}} src={require("../../images/image 9.png")}  alt="slider" />
          </div>
          <div>
            <img style={{width: "100%", height:"400px"}} src={require("../../images/image 10.png")}  alt="slider" />
          </div>
          
          
          
        </Slider>
      </div>
    
    </>
}

export default Homeslider;
