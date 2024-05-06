import jwt from 'jsonwebtoken';
import Admin from '../model/admin.model.js'

const verifyToken = async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try{
        const accessToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const admin = await Admin.findById(decoded.id);

        if(admin){
            next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    } catch(error) {
        console.error("verfiyToken: ", error);
        res.status(401).json({
            message: "Unauthorized"
        })
    }
};

export default verifyToken;