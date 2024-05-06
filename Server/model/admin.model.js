import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: (value) => {
                    return value.length >= 6;
                },
                message: {
                    return : "Password must be of at least 6 characters."
                }
            }
        }
    },
    {
        timestamps: true
    }
);

// // Encrypting password before sending to database.
// adminSchema.pre("save", async (next) => {
//     const admin = this;
//     // if aleady encryped don't do anything
//     if (!admin.isModified("password")) {
//       return next();
//     }
//     try {
//       const salt = await bcrypt.genSalt(10);
//       admin.password = await bcrypt.hash(admin.password, salt);
//       return next();
//     } 
//     catch (error) {
//       return next(error);
//     }
// });

export default mongoose.model('Admin', adminSchema);
