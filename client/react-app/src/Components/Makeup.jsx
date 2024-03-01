// import react from 'react'
// const data={
//     "ProductId": 6,
//     "Brand":"HudaBeauty",
//     "FamousProduct":"EyeShadow",
//     "ProductURL":"eyeshadow",
//     "ProductRating":"4.7"
// }

// function Makeup(){
//     return(
//         <div>
            // <h1> Product-Id={data.ProductId}</h1>
            // <h1>Brand={data.Brand} </h1>
            // <h1>FamousProduct={data.FamousProduct}</h1>
            // <h1>ProductURL={data.ProductURL}</h1>
            // <h1>ProductRating{data.ProductRating}</h1>
            
//         </div>
//     )
// }
// export default Makeup;
import React, { useState, useEffect } from "react";
import "../App.css"; 
import {Link} from 'react-router-dom'

function Makeup() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchMakeup();
    }, []);

    const fetchMakeup = async () => {
        try {
            const response = await fetch('https://discover-your-makeup.onrender.com/getallmakeup');
            const productData = await response.json();
            setProduct(productData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="makeup-container">
            <Link to='/add'><button>Add</button></Link>
            {product.map((data, index) => (
                <div key={index} className="makeup-item">
                    <h1 className="product-id">Product-Id={data.ProductId}</h1>
                    <h1 className="brand">Brand={data.Brand}</h1>
                    <h1 className="famous-product">FamousProduct={data.FamousProduct}</h1>
                    <h1 className="product-url">ProductURL={data.ProductURL}</h1>
                    <h1 className="product-rating">ProductRating={data.ProductRating}</h1>
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}

export default Makeup;
