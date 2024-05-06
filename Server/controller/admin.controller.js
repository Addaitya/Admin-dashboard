import Admin from '../model/admin.model.js'
import bcrypt from 'bcrypt'

const addAdmin = async (req, res, next) => {

    if(!req.body || !req.body.password || !req.body.email){
        return res.status(400).json({
            message: "Email or password missing."
        })
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newAdmin = new Admin({
        "email": req.body.email,
        "password": hashedPassword, 
    });
    console.log("res.locals: ", res.locals);
    res.locals.adminId = newAdmin._id;
    
    try{
        await newAdmin.save();
        console.log('admin added successfully');
        // res.status(201).json({
        //     message: "User added successfully",
        // });
        next()
    } catch(error){
        console.error("admin.controller addAdmin: ", error);
        res.status(400).json({
            message: "Failed to add user",
          });
    }
}


const adminLogin = async (req, res, next) => {
    if(!req.body || !req.body.email || !req.body.password){
        return res.status(400).json({
            message: "Email or password missing."
        })
    }

    try {
        const { email, password } = req.body;
    
        const existingAdmin = await Admin.findOne({
            email,
        });

        if(!existingAdmin){
            return res.status(401).json({
                message: "Invalid email."
            })
        }

        console.log("admin: ", existingAdmin.email, existingAdmin.password);
        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        )

        if (!isPasswordCorrect) {
            return res.status(400).json({
              message: "Invalid credentials",
            });
        }

        res.locals.adminId = existingAdmin._id;
        next();
    } catch(error){
        console.error("admin.controller login: ", error);
        res.status(500).json({
            message: "Something went wrong."
        })
    }
} 
export  { addAdmin, adminLogin };