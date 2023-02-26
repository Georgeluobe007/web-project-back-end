const {verify} = require("jsonwebtoken")

const validationToken = (req,res,next) => {

    const accessToken1 = req.header("accessToken1");
    if(!accessToken1) return res.status(400).json({error:"user not authenticated"})
try {
    const validToken1 = verify(accessToken1,process.env.jwtkey);
    if(validToken1){
     req.user = validToken1;
    // console.log(`watching the object ValidToken @ JWT${req.user}`);
     return next();
    }
} catch (error) {
    return res.status(400).json({error:error})
}
}
module.exports = {validationToken}