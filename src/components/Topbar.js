import { Grid } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import './Topbar.css'
import axios from 'axios'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";
function Topbar(){
    const [user,setUser] = useState(null);
    const [userUpdate,setUserUpdate] = useState(null)
    let history = useHistory();
   // const [logout,setLogout] = useState(false);
    const myStore = window.localStorage;
    const [open,setOpen] = useState(false)
    const jwt = myStore.getItem('jwt')
    const username = myStore.getItem('username')
    const initialUserUpdate = (data)=>{
        setUserUpdate({
            username : data.taikhoan?.username,
            password : data.taikhoan?.password,
            ho:data.ho,
            ten:data.ten,
            gioitinh:data.gioitinh,
            sdt:data.sdt,
            email:data.email,
            diachi:data.diachi
        })
    }
    useEffect(()=>{
        if(username)
        axios.get(process.env.REACT_APP_API +'khachhang/'+username)
        .then(response => {setUser(response.data) ; initialUserUpdate(response.data)})
        .catch(error => console.log(error))
    },[])
    const isLogin = ()=>{
        if(user!=null){
            return (
                <div onMouseEnter={()=>setOpen(true)} onMouseLeave={()=> setOpen(false)}>
                    <p className="login item mr-3">{user?.ho +' ' +  user?.ten}</p>
                    {open?
                        <div class="myAccount" style={{zIndex:1}}>
                            <p data-toggle="modal" data-target="#accountInfo">Thông tin tài khoản</p>
                            <p onClick={()=> history.push('/viewOrder')}>Đơn hàng của tôi</p>
                        </div> :''  
                     }
                </div>
            )
        }
        else
            return (
                <p onClick={()=>{history.push('/login')}} className="login item mr-3">Đăng nhập</p>
            )
    }
    const isLogout = ()=>{
        if(user != null){            
            return (
                <p onClick={()=>{myStore.removeItem('username'); myStore.removeItem('jwt'); history.push("/") ;window.location.reload(false) }} className="login item ml-3"><i class="fa fa-sign-out fa-lg" aria-hidden="true"></i> Đăng xuất</p>
            )
        }
        else
            return '';
    }
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserUpdate({
            ...userUpdate,
            [name]:value
        })
    }
    const submitUpdate = ()=>{
        axios.put(process.env.REACT_APP_API +'khachhang/',userUpdate)
        .then(response => alert('Sửa thành công'))
        .catch(error => console.log(error))
    }
    return (
        <div>
            <MessengerCustomerChat
                pageId="575303299345434"
                appId="2594387300854202"
            />
            <div className='d-none d-sm-block'>
                <div className='topbar d-flex justify-content-around'>
                    <div className='topbar__contact d-flex'>              
                        <p>SHOP ĐỒ THỂ THAO T&T</p>
                    </div>
                    <div className='topbar__more d-flex'>
                        {isLogin()}
                        <Link to='/cart'>
                         <button className="btn btn-info"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Giỏ hàng</button>
                        </Link>
                        {isLogout()}
                    </div>
                </div>
            </div>
            <div className='d-block d-sm-none'>
                <div className='topbar d-flex justify-content-around'>
                    <div className='topbar__contact d-flex'>              
                    <p>Công ty thực phẩm đồ ăn nhanh phúc đồng</p>
                    </div>
                    <div className='topbar__more d-flex'>
                         <p className="login item mr-3"><i className="fa fa-user-circle fa-lg" aria-hidden="true"></i></p>
                        <p className="cart item mr-3"><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></p>
                    </div>
                </div>
            </div>
            {/* modal */}
            <div className="modal fade" id="accountInfo" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                  <div className="modal-content">
                    <div className="modal-header bg-warning text-white thongtintaikhoan">
                      <h5 className="modal-title" id="exampleModalLabel">THÔNG TIN TÀI KHOẢN</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    
                    <div className="modal-body" >
                        <h5 >Thông tin về khách hàng : <strong style={{color:'red'}}>{user?.ho + ' ' + user?.ten}</strong></h5>
                    <div className="row">
                    <div className=" col-6">
                      <table className="table table-borderless table-font mt-4">
                        <tbody>
                          <tr>
                            <td>Họ</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ho} name="ho" onChange={handleChange}/></td>
                          </tr>
                          <tr>
                            <td>Tên</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.ten} name="ten" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                            <td>Giới tính</td>
                            <td> 
                                <select className="custom-select my-1 mr-sm-2" defaultValue={user?.gioitinh} name="gioitinh" onChange={handleChange}>
                                    <option defaultValue={0}>Nam</option>
                                    <option defaultValue={1}>Nữ</option>
                                </select> 
                            </td>
                          </tr>
                          <tr>
                            <td>Số điện thoại</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.sdt} name="sdt" onChange={handleChange}/></td>
                          </tr>
                          
                        </tbody>
                      </table>
                      
                      
                      </div>
                      <div className="col-6">  
                      <table className="table table-borderless table-font mt-4">
                        <tbody>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.email} name="email" onChange={handleChange}/></td>
                          </tr>
                          <tr>
                            <td>Địa chỉ</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.diachi} name="diachi" onChange={handleChange}/> </td>
                          </tr>
                          <tr>
                            <td>UserName</td>
                            <td><input type="text" className="form-control mb-2 mr-sm-2" defaultValue={user?.taikhoan?.username} name="username" onChange={handleChange}/></td>
                          </tr>
                          <tr>
                            <td>Password</td>
                            <td><input type="password" className="form-control mb-2 mr-sm-2" defaultValue={user?.taikhoan?.password} name="password" onChange={handleChange}/></td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </div>
            
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-danger btn_thongtintaikhoan" data-dismiss="modal" onClick={()=>initialUserUpdate(user)}>Thoát</button>
                      <button type="button" className="btn btn-warning btn_thongtintaikhoan" data-dismiss="modal" onClick={submitUpdate}>Lưu thay đổi</button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
    )

}
export default Topbar;