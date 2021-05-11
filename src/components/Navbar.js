import React,{useState,useEffect} from 'react'
import logo from '../image/logo.png'
import './Navbar.css'
import axiosClient from '../API/AxiosClient'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios'
function Navbar(){
    const [danhmuc,setDanhMuc] = useState(null);
    useEffect(()=>{
      axios.get(process.env.REACT_APP_API+'danhmuc/')
      .then(response => setDanhMuc(response.data))
      .catch(error => console.log(error))
    },[])
    const [search,setSearch] = useState('')
    const [isSearch,setIsSearch] = useState(false)
    const [products,setProducts] = useState([])
    useEffect(async()=>{
        try {
          const data = await axiosClient.get('sanpham',null);
          setProducts(data);
        } catch (error) {
          console.log(error)
        }
    },[]) 
    const handleSearch = (e)=>{
      const {value} = e.target
      setSearch(value)
    }
    return(
      
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <a className="navbar-brand d-block d-sm-none" to="/#">
            <img src={logo} className='logo'/>
         </a>
         <Link to='/'>
          <a className="navbar-brand d-none d-sm-block" to="/#">
              <img src={logo} style={{width:50}} className="mr-4"/>
                T&T SHOP
          </a>
         </Link>
        <form className='search input-group ' onFocus={()=>setIsSearch(true)} onBlur={()=>setIsSearch(false)}>
            <input className='search-bar' placeholder='Nhập để tìm kiếm . . .' onChange={handleSearch} />
            {isSearch?
              <div className="searchBox">
              <div className="table-responsive">
              <table className="table table-borderless table-hover table-dark" >
                <tbody>
                  {products.map(sp=>{
                    if(sp.tensp.toLowerCase().includes(search.toLowerCase()))
                    return (
                      <tr key={sp.masp} onMouseDown={()=> window.location.href="/product/"+sp.masp}  >
                          <td>{sp.masp}</td>
                          <td>{sp.tensp}</td>
                          <td>{sp.soluong}</td>
                          <td>{sp.dongia}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
              
            </div>:''
            }
        </form>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon" />
               </button>
               <div className="collapse navbar-collapse" id="navbarText">
                 <ul className="navbar-nav ml-auto">
                   <li className="nav-item active">
                     <a className='nav-link'><i class="fa fa-home" aria-hidden="true"></i> TRANG CHỦ</a>
                   </li>
                   <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-list-alt" aria-hidden="true"></i> DANH MỤC</a>
                            <div className="dropdown-menu bg-info">
                                 {danhmuc?.map(dm=>{
                                   return (
                                    <Link to = {"/danhmuc/"+dm.madm}><p className="dropdown-item">{dm.tendm}</p></Link>
                                   )
                                 })}
                            </div>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>GIỚI THIÊU</a>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>LIÊN HỆ</a>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>ĐỐI TÁC KINH DOANH</a>
                   </li>
                   <li className="nav-item">
                     <a className='nav-link'>TẦM NHÌN CHIẾN LƯỢC</a>
                   </li>
                 </ul>
                 
               </div>
               
               
             </nav>
    )
}
export default Navbar;