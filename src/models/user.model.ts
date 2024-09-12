import { Schema, Document, models, Model, model } from "mongoose";

export interface User extends Document {
    clerkUserId: string;
    email: string;
    name?: string;
}
    
const userSchema = new Schema(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            match: [
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                "email is not valid",
            ],
        },
        name: {
            type: String,
            required: false
        },
    },
    { timestamps: true }
);

const userModel =
    (models?.user as Model<User>) || model<User>("User", userSchema);

export default userModel;
