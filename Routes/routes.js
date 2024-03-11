const express = require('express');
require('dotenv').config()
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const MakeUps = require("../models/makeup.model")
const joi = require ("joi")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const app = express()

app.use(cookieParser());


const makeupSchema = joi.object({
    ProductId : joi.string(),
    Brand : joi.string(),
    FamousProduct: joi.string(),
    ProductURL: joi.string(),
    ProductRating: joi.string()
})
getRouter.get('/getallmakeup', async (req, res) => {
    try {
        let { error } = await makeupSchema.validate(req.body);
        if (error) {
            console.log(error);
            // handle the validation error, probably by sending an error response
            return res.status(400).send(error.details[0].message);
        }

        const makeup = await MakeUps.find();
        res.status(200).json(makeup);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

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
        let{ProductId,Brand,FamousProduct,ProductURL,ProductRating,Createdby} = req.body;

        const makeup = await MakeUps.create({ProductId,Brand,FamousProduct,ProductURL,ProductRating,Createdby});

        res.status(201).json(makeup);
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
})

postRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log("user", username, password)

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid =  bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const secretKey =" 92bf306d16c34d6de16cf819a679c0cb00cb797f0b46f8b044e369f017eb2d7b"
        const token = jwt.sign({ username: user.username }, secretKey);
        res.cookie('token', token, { httpOnly: true });
        console.log("token", token, user.username)
        res.json({ token, username: user.username });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

putRouter.patch('/updatemakeup/:id',async (req, res) => {
    try {
        const {id}= req.params;
        let{ProductId,Brand,FamousProduct,ProductURL,ProductRating,Createdby} = req.body;
        const makeup = await MakeUps.findOneAndUpdate({Brand : id},{ProductId,Brand,FamousProduct,ProductURL,ProductRating,Createdby});

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
    const secretKey =" 92bf306d16c34d6de16cf819a679c0cb00cb797f0b46f8b044e369f017eb2d7b"
    const token = jwt.sign({ username: username },secretKey);
    res.send({ token });
    res.cookie('token', token);
    

});

module.exports = {getRouter, postRouter, deleteRouter, putRouter};
