
import React,{useState} from 'react'
import Detail_Portfolio from './Detail_Portfolio'
import axios from 'axios'
import {useHistory,Link} from 'react-router-dom'
import './Login.css'
function Login(){
    let history =useHistory();
    let userInfo = null;
    const myStorage = window.localStorage;
    const [login,setLogin] = useState({})
    const alterInput = (e)=>{
        const {value,name} = e.target;
        setLogin({
            ...login,
            [name]:value
        })
        //console.log(login)
    }
    const handleSubmit = ()=>{
        axios.post(process.env.REACT_APP_API +'login',login)
        .then(response => {
            console.log(response.data)
            myStorage.setItem('username',login.username)
            let quyen = response.data.quyen.maquyen;
            myStorage.setItem('quyen',quyen)
            if(quyen == 1)
                history.push('/admin/sanpham')
            else if(quyen == 2)
                history.push('/')
            else if(quyen == 3)
            history.push('/admin/sanpham')
            
        })
        .catch(erro => alert('login thất bại !!!'))
    }
    return(
        <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-4'>               
                        <Detail_Portfolio />
                        <Detail_Portfolio />
                    </div> */}
                    <div className='col-12'>     
                       
                        <div className="login_container">
                                <div className="login-ct">

                                <div className="col-md-6 m-auto">
                                <div className="login-sp">
                                <form>
                                <h5 className="dangnhap">ĐĂNG NHẬP</h5>
                                    <div className="form-group">
                                    <label htmlFor="email" style={{color:'tomato',fontSize:'16px', fontWeight:'bolder'}}>TÀI KHOẢN</label>
                                    <input type="email" name="username" className="form-control" id="email" aria-describedby="emailHelp" onChange={alterInput} placeholder="Nhập tài khoản" />
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="password" style={{color:'tomato',fontSize:'16px', fontWeight:'bolder'}}>MẬT KHẨU</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={alterInput} placeholder="Nhập mật khẩu" />
                                    </div>
                                    <button onClick={handleSubmit} type="submit" className="btn btn-danger float-right btn-dangnhap">
                                    Đăng nhập
                                    </button>
                                    <a style={{marginLeft:'65%', color:'red'}} href ="/register">Tạo tài khoản ?</a>
                                </form>
                                </div>
                                </div>
                            </div>

                                </div>
                            
                        </div>
                </div>
            </div>
    )
}
export default Login