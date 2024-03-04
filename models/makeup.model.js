const mongoose =require("mongoose")
const makeupSchema=new mongoose.Schema({
    ProductId:{type:String},
    Brand:{type:String},  
    FamousProduct:{type:String},
    ProductURL:{type:String},
    ProductRating:{type:String}
    },{
        timestamp:true
    })

    module.exports=mongoose.model('MakeUp',makeupSchema)  
