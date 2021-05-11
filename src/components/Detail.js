import React from 'react'
import Detail_Portfolio from './Detail_Portfolio'
import Detail_Product from './Detail_Product'
import './Detail.css'
export default function Detail(){
    return(
        <div>
            <div className='banner'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Logo_Sport.svg/1200px-Logo_Sport.svg.png" style={{width:'500px'}}/>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-4'>               
                        
                    </div>
                    <div className='col-12'>               
                        <Detail_Product />
                    </div>
                </div>
            </div>
        </div>
    )
}