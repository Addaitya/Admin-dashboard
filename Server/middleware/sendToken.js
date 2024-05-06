import jwt from 'jsonwebtoken' ;

const sendToken = (req, res) => {
    const payload = {
        id: res.locals.adminId,
        email: req.body.email
    } 
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "6h",
    });

    try{
        res.status(201).json({
            accessToken,
            admin: {
                id: res.locals.adminId,
                email: req.body.email
            },
            message: "access token generated"
        });
    } catch(error){
        console.error("sendToken: ", error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
} 

export default sendToken;