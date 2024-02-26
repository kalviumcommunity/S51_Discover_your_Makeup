import react from 'react'
const data={
    "ProductId": 6,
    "Brand":"HudaBeauty",
    "FamousProduct":"EyeShadow",
    "ProductURL":"eyeshadow",
    "ProductRating":"4.7"
}

function Makeup(){
    return(
        <div>
            <h1> Product-Id={data.ProductId}</h1>
            <h1>Brand={data.Brand} </h1>
            <h1>FamousProduct={data.FamousProduct}</h1>
            <h1>ProductURL={data.ProductURL}</h1>
            <h1>ProductRating{data.ProductRating}</h1>
            <h1></h1>
        </div>
    )
}
export default Makeup;