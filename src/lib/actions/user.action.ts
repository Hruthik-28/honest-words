"use server";

import userModel from "@/models/user.model";
import dbConnect from "../dbConnect";

export interface createUserInput {
    clerkUserId: string;
    email: string;
    name?: string;
}

export async function createUser(user: createUserInput) {
    try {
        await dbConnect();
        const createdUser = await userModel.create(user);
        return JSON.parse(JSON.stringify(createdUser));
    } catch (error) {
        console.log(error);
    }
}
