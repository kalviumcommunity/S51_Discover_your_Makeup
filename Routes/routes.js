const express = require('express');
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const MakeUps = require("../models/makeup.model")
const joi = require ("joi")
const jwt = require('jsonwebtoken');

app.use(cookieParser());
const cookieParser = require('cookie-parser');

const makeupSchema = joi.object({
    ProductId : joi.string(),
    Brand : joi.string(),
    FamousProduct: joi.string(),
    ProductURL: joi.string(),
    ProductRating: joi.string()
})
getRouter.get('/getallmakeup', async (req, res) => {

    let {error}= joi.validate(makeupSchema)
    
    if (error){
        console.log(error)
    }

    try{
        const makeup = await MakeUps.find();
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
        const {id}= req.params;
        const makeup = await MakeUps.findone({Brand : id});
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

        const makeup = await MakeUps.create({ProductId,Brand,FamousProduct,ProductURL,ProductRating});

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
        const {id}= req.params;
        let{ProductId,Brand,FamousProduct,ProductURL,ProductRating} = req.body;
        const makeup = await MakeUps.findOneAndUpdate({Brand : id},{ProductId,Brand,FamousProduct,ProductURL,ProductRating});

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
        const {id}= req.params;
        const makeup = await MakeUps.findOneAndDelete({Brand : id});
        res.status(200).json(makeup);
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

app.post('/login', (req, res) => {
    const { username } = req.body;
    res.cookie('username', username);
    res.send('Login successful');
});

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.send('Logout successful');
});

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username: username },process.env.ACCESS_TOKEN);
    res.send({ token });
    res.cookie('token', token);

});

module.exports = {getRouter, postRouter, deleteRouter, putRouter};
