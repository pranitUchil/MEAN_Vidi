const jwt = require('jsonwebtoken');

const auth =  (req,res,next) =>{
    try {
        const data = jwt.verify(req.cookies.vidiAuthToken, process.env.SECREDT_KEY);
        req.user = data._doc;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({message:"Unauthorized access"})
    }
}

module.exports = auth;

