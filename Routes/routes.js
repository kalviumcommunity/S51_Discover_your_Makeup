const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const Makeup = require("../models/makeup.model")

getRouter.get('/getallmakeup',async (req, res) => {
    try{
        const makeup = await Makeup.find();
        res.status(200).json(makeup);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

getRouter.get('/getmakeup/:id',async (req, res) => {
    try{
        const makeup = await Makeup.findone({Brand:query});
        res.status(200).json(makeup);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

postRouter.post('/addmakeup',async (req, res) => {
    try{
        let{ProductId,Brand,FamousProduct,ProductURL,ProductRating} = req.body;
        const makeup = await Makeup.create({ProductId,Brand,FamousProduct,ProductURL,ProductRating});
        res.status(201).json(makeup);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

putRouter.patch('/updatemakeup/:id',async (req, res) => {
    try {
        let{ProductId,Brand,FamousProduct,ProductURL,ProductRating} = req.body;
        const makeup = await Makeup.update({ProductId,Brand,FamousProduct,ProductURL,ProductRating});
        res.status(200).json(makeup);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

deleteRouter.delete('/deletemakeup/:id',async (req, res) => {
    try {
        const makeup= await Makeup.delete({Brand});
        res.status(200).json(makeup);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

module.exports = {getRouter, postRouter, deleteRouter, putRouter};