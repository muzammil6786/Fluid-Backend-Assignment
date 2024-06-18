const jwt = require("jsonwebtoken");
const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try{
            const decoded  = jwt.verify(token,process.env.accesstokenKey);
            req.body.userID = decoded.userID;
            req.body.author = decoded.author;
            next();
        }
        catch(err){
            res.status(403).send({msg:"You are not authorized"})
        }
    }else{
        res.status(401).send({msg:"Your token is not valid"}) 
    }
}
module.exports={
    auth
}