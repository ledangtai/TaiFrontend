import React,{useState,useEffect} from 'react'
import {store} from '../firebase'
import CKEditor from 'ckeditor4-react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import './SanphamWorkplace.css'
import NumberFormat from 'react-number-format';
function Admin_workplace({slide}){
    const [products,setProducts] = useState([])
    const [search,setSearch] = useState('')
    const [on,setOn] = useState(false)
    const [onUpdate,setOnUpdate] = useState(false)
    const { register, handleSubmit, setValue } = useForm();
    const [danhmuc,setDanhMuc] = useState(null);
    const checkSanPham = (masp)=>{
        for(let i=0;i<products.length;i++){
            if(products[i].masp === masp)
            return true;
        }
        return false;
    }
    const onSubmit = data => {
        const myData = {
            ...data,
            photo:fileUrl
        }
        //console.log(process.env)
        //console.log(myData)
        const myAlterData = {
            masp:myData.masp,
            tensp:myData.tensp,
            soluong:myData.soluong,
            dongia:myData.dongia,
            mota_ngan:myData.motangan,
            mota_chitiet:myData.motachitiet,
            photo:myData.photo,
            khuyenmai:myData.khuyenmai,
            danhmuc:myData.madm?{
            madm:myData.madm
            }:null
        }
        if(onUpdate){
            console.log("update")
            console.log(fileUrl)
            axios.put(process.env.REACT_APP_API +'sanpham',myAlterData)
            .then(response =>{
                console.log(response)
                setOn(!on)
                setOnUpdate(!onUpdate)
                axios.get(process.env.REACT_APP_API+'sanpham')
                .then(response => setProducts(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
        else{
            if(checkSanPham(data.masp)){
                alert('Trùng mã sản phẩm !!!')
                return;
            }
            axios.post(process.env.REACT_APP_API +'sanpham',myAlterData)
            .then(response =>{
                console.log(response)
                setOn(!on)
                axios.get(process.env.REACT_APP_API+'sanpham')
                .then(response => setProducts(response.data) )
                .catch(erro => console.log(erro))
            }).catch(error => console.log(error))
        }
    }
    
    const [fileUrl,setFileUrl] = useState('');
    const [fileName,setFileName] = useState('');
    const handleImage = async (e)=>{
  
            // code here
            var file = e.target.files[0];
           // console.log('dsds')
            const fileNameFirst = file?.name;
            const fileNameFinal = fileNameFirst?.replace(/ /g,'')
            var storageRef =  store.ref().child("tai/"+fileNameFinal)
            
            await storageRef.put(file);
            store.ref().child('tai').child(fileNameFinal).getDownloadURL().then(url=> setFileUrl(url));
    }
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API+'sanpham/')
        .then(response => setProducts(response.data) )
        .catch(erro => console.log(erro))

        //
        axios.get(process.env.REACT_APP_API+'danhmuc/')
        .then(response => setDanhMuc(response.data))
        .catch(error => console.log(error))
    },[])
    const getDeleteSP = (masp)=>{
        let agree = window.confirm(`Bạn có muốn xóa masp = ${masp}?`);
        if (!agree)
        return
        axios.delete(process.env.REACT_APP_API+'sanpham/'+masp)
        .then(response => {
            alert('Delete successfully !!!')
            axios.get(process.env.REACT_APP_API+'sanpham')
            .then(response => setProducts(response.data) )
            .catch(erro =>alert('Xóa thất bại !!!'))
        } )
        .catch(erro => alert('Xóa thất bại'))
    }
    const getUpdateSP =(sp)=>{
        setOnUpdate(true)
        setOn(true)
        setValue("masp",sp.masp)
        setValue("tensp",sp.tensp)
        setValue("soluong",sp.soluong)
        setValue("dongia",sp.dongia)
        setValue("soluong",sp.soluong)
        setValue("khuyenmai",sp.khuyenmai)
        setValue("motangan",sp.mota_ngan)
        setValue("motachitiet",sp.mota_chitiet)
        setFileUrl(sp.photo)

        //
        
    }
    const getInsertSP = ()=>{
        setOn(true); 
        setValue("masp",'')
        setValue("tensp",'')
        setValue("soluong",'')
        setValue("dongia",'')
        setValue("soluong",'')
        setValue("khuyenmai",'')
        setValue("motangan",'')
        setValue("motachitiet",'')
        setFileUrl('')
        setValue("photo",null)
    }
    const handleSearch = (e)=>{
        const {value} = e.target;
        setSearch(value);
    }
    return(
        <div className={slide?"workplace":"on-off-workplace"}>
                <h3 className={!on?"form-head":"d-none"}></h3>  
                <ul className={!on?"":"d-none"} style={{listStyle:'none'}}>
                        <li className="" onClick={()=>getInsertSP()}><button className="btn btn-outline-info"><i className="fa fa-plus-square-o" aria-hidden="true"></i> Thêm sản phẩm</button></li>
                </ul>
                <div className={!on?"workplace_display":"d-none"}>
                    <table className="table table-striped table-bordered table-hover">
                        <thead className="thead">
                            <tr>
                                <th>MÃ SẢN PHẨM</th>
                                <th>TÊN SẢN PHẨM</th>
                                <th>SỐ LƯỢNG</th>
                                <th>ĐƠN GIÁ</th>
                                <th>KHUYẾN MÃI</th>
                                <th>DANH MỤC</th>
                                <th>DELETE</th>
                                <th>UPDATE</th>
                                <th>HÌNH ẢNH</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map(product=>{
                            const target = '#id' +product.masp;
                            //console.log(target)
                            if(product.tensp.toLowerCase().includes(search.toLowerCase()))
                                return (
                                <tr key={product.masp}>
                                    <td>{product.masp}</td>
                                    <td>{product.tensp}</td>
                                    <td>{product.soluong}</td>
                                    <td> <NumberFormat  value={product.dongia} thousandSeparator={true} style={{border:'0', width:'100px', textAlign:'center'}} />  VNĐ</td>
                                    <td>{product.khuyenmai}</td>
                                    <td>{product.danhmuc?.tendm}</td>
                                    <td className="custom"><p className="custom-link" onClick={()=> getDeleteSP(product.masp)}>Delete</p> </td>
                                    <td className="custom"><p className="custom-link" onClick={()=> getUpdateSP(product)}>Update</p> </td>
                                    <td>
                                    <img src={product.photo} alt="hoa picture" style={{width:"100px"}}/>
                                    </td>
                                    

                                    
                                    <div className="modal" id={'id'+product.masp}>
                                        <div className="modal-dialog modal-lg">
                                            <div className="modal-content">

                                        
                                            <div className="modal-header">
                                                <h3 className="modal-title display-4">{product.tensp}</h3>
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                            </div>

                                            
                                            <div className="modal-body px-4">
                                                <div className="row detail_product_admin px-4">
                                                    <div className="col-5">
                                                        <img src={product.photo} alt="hoa picture" style={{width:"90%"}}/>
                                                    </div>
                                                    <div className="col-7">
                                                        <h3>{product.tensp}</h3>
                                                        <h4 className="text-danger"><NumberFormat value={product.dongia} thousandSeparator={true} /> VNĐ</h4>
                                                        <hr/>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <p>Danh mục</p>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <p>{product.danhmuc?.madm}</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <p>Mô tả ngắn</p>
                                                            </div>
                                                            <div className="col-7 text-right">
                                                                <p>{product.mota_ngan}</p>
                                                            </div>
                                                        </div>
                                                        <hr/>
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <p>Hàng trong kho</p>
                                                            </div>
                                                            <div className="col-7 text-right">
                                                                <p>Còn : {product.soluong}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className='col-12 mt-4'>
                                                    <h5>Mô tả chi tiết</h5>
                                                    <p>{product.mota_chitiet}</p>
                                                </div>
                                                </div>
                                                
                                            </div>

                                            
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                            </div>

                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                        

                </div>
                <div>
                <div className={on?"workplace_input":"d-none"}>
                <div className="card">
                <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <label>Mã sản phẩm</label>
                                    <input className="form-control" placeholder="" ref={register} name='masp' readOnly={onUpdate?true:false}/>
                                    <label>Tên sản phẩm</label>
                                    <input className="form-control" placeholder="" ref={register} name='tensp'/>
                                    <label>Số lượng</label>
                                    <input className="form-control" placeholder="" ref={register} name='soluong' type='number' />
                                    <label>Đơn giá</label>
                                    <input className="form-control" placeholder="" ref={register} name='dongia' type='number' />
                                    <label>Hình ảnh</label>
                                    <div className="form-group">
                                          <input className="form-control-file border" placeholder="" ref={register} name='photo' type="file" onChange={handleImage}/>
                                    </div>
                                    <label>Khuyến mãi</label>
                                    <input className="form-control" placeholder="" ref={register} name='khuyenmai' />
                                    <label>Danh mục</label>
                                    <select className="form-control" ref={register} name='madm'>
                                        {danhmuc?.map(dm=>(
                                            <option label={dm.tendm} value={dm.madm}></option>
                                        ))}
                                    </select>
                                    <label>Mô tả</label>
                                    <input className="form-control" placeholder="" ref={register} name='motangan'/>
                                    <label>Mô tả chi tiết</label>
                                    <textarea className="form-control" placeholder="" ref={register} name='motachitiet' rows="5"/>
                                    <div className={fileUrl!==''?"":"d-none"}>
                                        <img src={fileUrl} alt="quan" style={{maxWidth:"100%"}}/>
                                    </div>
                                    <button className="btn btn-warning mt-4 mr-4 btn-input" style={{backgroundColor:'forestgreen', width:'45%', color:'white'}}  type="submit" >Xác Nhận</button>
                        
                                    <button className="btn btn-info mt-4 btn-input" style={{backgroundColor:'forestgreen', width:'45%', marginLeft:'8%', color:'white', fontFamily:'serif', fontWeight:'bolder'}} onClick={()=>setOn(!on)} type="button">Thoát</button>
                                </div>
                                <div className="col-6">
                                    
                                </div>
                            </div>
                            
                            {/* <CKEditor 
                                ref={register} name='motachitiet'
                            /> */}
                            
                            
                        </div>
                    </form>

                </div>
                </div>
                </div>
            
        </div>
        </div>
    )
}
export default Admin_workplace