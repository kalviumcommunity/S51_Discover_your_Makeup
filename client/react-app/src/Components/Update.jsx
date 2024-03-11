import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

export default function UpdateData() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productId, setProductId] = useState('');
    const [modelName, setModelName] = useState('');
    const [company, setCompany] = useState('');
    // const [productURL, setProductURL] = useState('');
    const [productRating, setProductRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.patch(`https://discover-your-makeup.onrender.com/updatemakeup/${id}`, {
                ProductId: productId,
                Brand: company,
                FamousProduct: modelName,
                // ProductURL: productURL,
                ProductRating: productRating
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Updated Product:', response.data);
                navigate('/');
            } else {
                console.error('Update failed:', response.data.error);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <>
            <h2>Update Data</h2>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <div className='div'>
                        <label htmlFor="ProductId">Product ID</label>
                        <input type="number" id="ProductId" name="ProductId" value={productId} onChange={(e) => setProductId(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="ModelName">Model Name</label>
                        <input type="text" id="ModelName" name="ModelName" value={modelName} onChange={(e) => setModelName(e.target.value)} />
                    </div>
                    <div className='div'>
                        <label htmlFor="Company">Company</label>
                        <input type="text" id="Company" name="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    {/* <div className='div'>
                        <label htmlFor="ProductURL">Product URL</label>
                        <input type="text" id="ProductURL" name="ProductURL" value={productURL} onChange={(e) => setProductURL(e.target.value)} />
                    </div> */}
                    <div className='div'>
                        <label htmlFor="ProductRating">Product Rating</label>
                        <input type="number" id="ProductRating" name="ProductRating" value={productRating} onChange={(e) => setProductRating(e.target.value)} />
                    </div>
                    <input type="submit" className='submit' value="Submit" />
                </form>
            </div>
        </>
    );
}
