const express = require("express");
// const bodyParser = require("body-parser");
require("dotenv-safe").config()
// const jwt = require("jsonwebtoken")
const app = express();
const cors = require('cors');

const porta = process.env.PORT || 3001; 

const usuario = require("./routes/Usuarios");

app.use(cors({
    origin: '*'
}));

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use("/", usuario);

app.use(function (error, req, res, next) {
    app.logger.info("received from "+req.get("X-Forwarded-For")+" : "+req.method+" "+req.originalUrl+" (Authorization: "+req.get("Authorization")+")");
    //does not work if json is malformed
    //app.logger.info("content :"+JSON.stringify(req.body));
    if (error /*instanceof SyntaxError*/) {
       res.status(400);
       app.logger.error(error);
       res.json({ error:{msg: error.message}});
} else {
    next();
}
});
 
app.listen(porta, ()=>{

    console.log(`Servidor iniciado na porta ${porta}`)

});