import Slider from 'react-material-ui-carousel'
import React from 'react'
import hoa1 from '../image/hoa1.jpg'
import hoa2 from '../image/hoa2.jpg'
import hoa3 from '../image/hoa3.jpg'
import './Carousel.css'
function Carousel(){
    return (
        <div className='container-fluid  my-carousel'>
            <img style={{width:'100%'}} src="https://www.decathlon.vn/modules/ps_imageslider/images/a585155a3a97fde378f68ddf71e79830216203c7_OLD-WEB-BANNER-VIET.jpg" />
        </div>
    )
}
export default Carousel