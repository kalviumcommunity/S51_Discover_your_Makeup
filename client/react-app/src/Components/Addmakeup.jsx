import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Addmakeup() {
    const navigate = useNavigate();
    const [ProductId,setProductId]=useState("")
    const [Brand,setBrand]=useState("")
    const [FamousProduct,setFamousProduct]=useState("")
    const [ProductURL,setProductURL]=useState("")
    const [ProductRating,setProductRating]=useState("")
    const [Createdby,setCreatedBy]=useState("")
    const submit=(e)=>{
      e.preventDefault();
        axios.post('https://discover-your-makeup.onrender.com/addmakeup',{
          ProductId:ProductId,
          Brand: Brand,
          FamousProduct: FamousProduct,
          ProductURL: ProductURL,
          ProductRating: ProductRating,
          Createdby: Createdby
          })
          
     .then((response) =>{ console.log(response.data);
        navigate('/')
    })
    .catch((error) => console.error(error))
    }

  return (
    <>
        <div id='Body'>
        <div id='Navbar'>
            <div id='Navbar-left'>
                <h1>Makeup</h1>
            </div>
        </div>
        <div id='Body-content'>
          <div id='form'>
          <form onSubmit={submit}>
            <div className='space-around'><label>ProductId : </label>
            <input type="text" onChange={(e)=>setProductId(e.target.value)}/></div>
            <div className='space-around'><label>Brand : </label>
            <input type="text" onChange={(e)=>setBrand(e.target.value)}/></div>
            <div className='space-around'><label>FamousProduct : </label>
            <input type="text" onChange={(e)=>{setFamousProduct(e.target.value)}}/></div>
            <div className='space-around'><label>ProductURL : </label>
            <input type="text" onChange={(e)=>setProductURL(e.target.value)}/></div>
            <div className='space-around'><label>ProductRating : </label>
            <input type="text" onChange={(e)=>setProductRating(e.target.value)}/></div>
            <div className='space-around'><label>Creator : </label>
            <input type="text" onChange={(e)=>setCreatedBy(e.target.value)}/></div>
            <button type="submit">Submit</button>
            </form>
            </div>
        </div>

      
    </div>
    </>
  )
}

export default Addmakeup