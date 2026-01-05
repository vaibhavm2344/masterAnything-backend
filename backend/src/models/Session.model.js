import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        refreshTokenHash:{
            type: String,
            required: true,
        },
        userAgent:{
            type: String,
        },
        isValid:{
            type: Boolean,
            default: true,
        },
        expiresAt:{
            type: Date,
            required: true,
            index: true,
        }
    },
    {
        timestamps: true,
    }  
);

export default mongoose.model("Session",sessionSchema);