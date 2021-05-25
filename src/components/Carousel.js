import Slider from 'react-material-ui-carousel'
import React from 'react'
import './Carousel.css'
import {CarouselWrapper} from "react-pretty-carousel";
import {autoPlaySpeed} from "react-pretty-carousel";
import { render } from '@testing-library/react'

function Carousel(){
    const settings = {
        items :3,
        loop: true,
        autoplay:true,
        autoplayTimeout:500,
        autoplayHoverPause:true,
      };

    return (
        <CarouselWrapper mode="gallery" {...settings} >
            <img  src="https://binhminhdigital.com/StoreData/images/PageData/nhung-meo-giup-ban-chup-anh-the-thao-dep-BinhMinhDigital1.jpg"/>
            <img  src="https://c.wallhere.com/photos/d1/89/digital_art_soccer_sport_Adidas-1441095.jpg!d"/>
            <img  src="https://binhminhdigital.com/StoreData/images/PageData/nhung-meo-giup-ban-chup-anh-the-thao-dep-BinhMinhDigital2.jpg"/>
            <img  src="https://storage.googleapis.com/cdn.nhanh.vn/store/13829/artCT/68972/do_bo_the_thao_.jpg"/>
            <img  src="https://file.vfo.vn/hinh/2018/03/top-nhung-hinh-anh-hinh-nen-chelsea-dep-nhat-full-hd4.jpg"/>
            <img  src="https://lh3.googleusercontent.com/proxy/GQZysCFvRNKCf_kRtzE6_fkRtqQ2Fl8tDfQkekX25Q2gv1ZpSFSnwCc8SpU8D0-DFZosC7kcLrf2OSJy8re5"/>
            <img  src="https://sites.google.com/site/sport9a13team3/_/rsrc/1476010237532/bong-chuyen-trong-nha/21-08-2016-Volleyball-Men-02.jpg" />
            <img src="https://baovephapluat.vn/data/images/0/2020/06/27/tienbv/dsc-0555.jpg?dpi=150&quality=100&w=630 " />
 </CarouselWrapper>
    )
}
export default Carousel