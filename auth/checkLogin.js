const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    let authorization = req.header('Authorization')
    if(!authorization){
        return res.status(401)
        .json({code:101,message:'Vui long cung cap jwt token qua header'})
    }

    let token = authorization.split(' ')[1]
    if (!token){
        return res.status(401)
        .json({code:101,message:'Vui long cung cap jwt token hop le'})
    }

    const {JWT_SECRET}=process.env
    if(!token){
        return res.status(401)
        .json({code:101,message:'Vui long cung cap jwt token'})
    }
    jwt.verify(token,JWT_SECRET,(err,data)=>{
        if(err){
            return res.status(401)
            .json({code:101,message:'Token khong hop le hoac da het han'})
        }
        req.user = data
        next();
    })
}