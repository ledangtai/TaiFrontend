import React,{useState,useEffect} from 'react'
import './Admin.css'
import SanphamWorkplace from './SanphamWorkplace'
import DanhMucWorkplace from './DanhMucWorkplace'
import KhachhangWorkplace from './KhachhangWorkplace'
import NhanvienWorkplace from './NhanvienWorkplace'
import DonhangWorkplace from './Donhang_workplace'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Link,
    useParams,
    useHistory
  } from "react-router-dom";

function Admin(){
    let myStore = window.localStorage
    let quyen = myStore.getItem('quyen')
    let history = useHistory();
    const username = myStore.getItem('username')
    const [user,setUser] = useState(null);
    useEffect(()=>{
        if(quyen == 2)
            history.push('/')
        if(username && quyen ==3)
        axios.get(process.env.REACT_APP_API +'nhanvien/'+username)
        .then(response => {setUser(response.data) ; console.log(response.data)})
        .catch(error => console.log(error))
    })
    
    
    let {adminPage} = useParams();
    const [slide,setSlide] = useState(true)
    let Page = '';
    switch(adminPage){
        case 'sanpham':{
            Page = <SanphamWorkplace slide={slide}/>
            break;
        }
       
        case 'danhmuc':{
            Page = <DanhMucWorkplace slide={slide}/>
            break;
        }
        case 'khachhang':{
            Page = <KhachhangWorkplace slide={slide}/>
            break;
        }
        case 'nhanvien':{
            Page = <NhanvienWorkplace slide={slide}/>
            break;
        }
        case 'donhang':{
            Page = <DonhangWorkplace slide={slide} user = {user}/>
            break;
        }
    }
    return(
        <div>
            <div className='header-admin'>       
                <h3 className="logo-admin"><span className="slide-button" onClick={toggleSlide}><i className="fa fa-bars" aria-hidden="true"></i></span>TRANG QUẢN TRỊ</h3>
                <h4 className="employee-name" style={{marginRight:'-800px'}}>{quyen == 1?'ADMIN':user?.ho + ' ' + user?.ten}</h4>
                <p onClick={()=>{myStore.removeItem('username') ; history.push("/")}} className="logout"><i className="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất</p>
            </div>
            <div className='body-admin'>
                <div className={slide?"slide-bar":'slide-bar on-off'}  >
                    <div className={slide?"employee":"employee on-off-employee"}>
                        <div className="employee-image" style={{backgroundColor:'white', padding:'10px'}}>
                            <img style={{width:'250px'}} src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5c/Chelsea_crest.svg/1200px-Chelsea_crest.svg.png"/>
                        </div>
                        
                    </div>
                    <div className={slide?"slide-bar_list":"slide-bar_list on-off-menu"} style={{marginTop:'-10px'}}>
                        <Link to="/admin/sanpham"><p><span className="ml-2" >Danh sách sản phẩm</span></p></Link>
                        <Link to="/admin/danhmuc"><p><span className="ml-2">Danh sách danh mục</span></p></Link>
                        {quyen == 1?
                            <div>
                                <Link to="/admin/khachhang"><p><span className="ml-2">Danh sách khách hàng</span></p></Link>
                        <Link to="/admin/nhanvien"><p><span className="ml-2">Danh sách nhân viên</span></p></Link>
                            </div>:''
                        }
                        <Link to="/admin/donhang"><p><span className="ml-2">Danh sách đơn hàng</span></p></Link>
                        <Link to="/"><p><span className="ml-2" style={{color:'red'}}>Thoát</span></p></Link>
                    </div>
                    
                </div>
                {Page}
            </div>
        </div>       
    )
    function toggleSlide(){
        setSlide(!slide)
    }
    
}

export default Admin