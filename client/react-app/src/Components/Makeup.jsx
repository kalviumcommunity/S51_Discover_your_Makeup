import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../App.css"; 

function Makeup() {
    const [product, setProduct] = useState([]);
    const [createdByOptions, setCreatedByOptions] = useState([]);
    const [selectedCreatedBy, setSelectedCreatedBy] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        fetchMakeup();
        checkLoginStatus()
    }, []);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const checkLoginStatus = () => {
        const token = getCookie('token');
        setIsLoggedIn(!!token);
    };

    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsLoggedIn(false);
        window.location.reload();
    };



    const fetchMakeup = async () => {
        try {
            const response = await fetch('https://discover-your-makeup.onrender.com/getallmakeup');
            const productData = await response.json();
            setProduct(productData);

            // Extract unique values of "created by"
            const createdBySet = new Set(productData.map(item => item.Createdby));
            setCreatedByOptions(Array.from(createdBySet));
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (brand) => {
        try {
            const response = await fetch(`https://discover-your-makeup.onrender.com/deletemakeup/${brand}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const updatedData = product.filter(item => item.Brand !== brand);
                setProduct(updatedData);
                console.log('Item deleted successfully');
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCreatedByChange = (event) => {
        setSelectedCreatedBy(event.target.value);
    };

    const filteredProducts = selectedCreatedBy
        ? product.filter(item => item.Createdby === selectedCreatedBy)
        : product;

    return (
        <div className="makeup-container">
            {isLoggedIn && <Link to='/add'><button>Add</button></Link>}
            {isLoggedIn ? (
                    <button className="logout" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <Link to='/login'><button className="login">LOGIN</button></Link>
                )}
            <select value={selectedCreatedBy} onChange={handleCreatedByChange}>
                <option value="">Select Created By</option>
                {createdByOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            {filteredProducts.map((data, index) => (
                <div key={index} className="makeup-item">
                    <h1 className="product-id">Product-Id={data.ProductId}</h1>
                    <h1 className="brand">Brand={data.Brand}</h1>
                    <h1 className="famous-product">FamousProduct={data.FamousProduct}</h1>
                    <h1 className="product-url">ProductURL={data.ProductURL}</h1>
                    <h1 className="product-rating">ProductRating={data.ProductRating}</h1>
                    <h1 className="createdby">Creator={data.Createdby}</h1>
                    {isLoggedIn && <Link to={`/update/${data.Brand}`}><button>Update</button></Link>}
                    {isLoggedIn && <button onClick={() => handleDelete(data.Brand)}>Delete</button>}
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}

export default Makeup;
