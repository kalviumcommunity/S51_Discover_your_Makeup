const { startDatabase, stopDatabase, isConnected } = require('./config');
const express = require('express')
const bodyParser=require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')
const {getRouter, postRouter,deleteRouter,putRouter} = require("./Routes/routes")
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    res.json({
        message: 'o_O',
        database: isConnected() ? 'connected' : 'disconnected'
    })
});
app.use('/',getRouter);
app.use('/',postRouter);
app.use('/',deleteRouter);
app.use('/',putRouter);
app.listen(port, async () => {
    await startDatabase();
    console.log(`🚀 server running on PORT: ${port}`);
});

