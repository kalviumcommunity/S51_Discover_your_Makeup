const mongoose =require("mongoose")
const makeupSchema=new mongoose.Schema({
    ProductId:{type:Number},
    Brand:{type:String},  
    FamousProduct:{type:String},
    ProductURL:{type:String},
    ProductRating:{type:Number}
    },{
        timestamp:true
    })

    module.export=mongoose.model('MakeUp',makeupSchema)  