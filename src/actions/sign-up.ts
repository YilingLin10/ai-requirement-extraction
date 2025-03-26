"use server"

import { z } from "zod"
import { signUpSchema } from "@/lib/zod"
import { prisma } from "@/lib/prisma"
import { saltAndHashPassword } from "@/lib/password"


export const signUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
        const validatedData = signUpSchema.parse(data)
        if (!validatedData) {
            return {
                error: 'Invalid input data.'
            }
        }
        const {name, email, password} = validatedData;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (user) {
            return {
                error: 'User already exists.'
            }
        }
        const pwHash = await saltAndHashPassword(password);
        await prisma.user.create({
            data: {
                name,
                email,
                password: pwHash
            }
        });
        return {
            success: 'User created successfully'
        }
    } catch (error) {
        console.log(error);
        return {
            error: 'An error occurred'
        }
    }
}
 
