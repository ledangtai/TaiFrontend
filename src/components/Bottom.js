import React from 'react'
import './Bottom.css'
import hoa from '../image/hoa4.jpg'
import bot from '../image/b.png'
export default function Bottom(){
    return (
        <div className='bottom'>
            <div className=''>
                <div className='row'>
                   <div className="col-12">
                       <img src ={bot} style={{width:'100%'}} />
                   </div>
                </div>
            </div>
            <footer className='text-center'>
                <span className="copyright"> &copy; copyright dangtai05@gmail.com</span>
                <div>CÔNG TY T&T </div>
            </footer>
        </div>
    )
}