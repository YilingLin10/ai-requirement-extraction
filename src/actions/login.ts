"use server"

import { signIn } from '@/auth';
import { z } from 'zod';
import { signInSchema } from '@/lib/zod';
import { prisma } from '@/lib/prisma';
import { AuthError } from 'next-auth';

export const login = async (data: z.infer<typeof signInSchema>) => {
    const validatedData = signInSchema.parse(data);
    if (!validatedData) {
        return { error: 'Invalid input data.' };
    }
    const { email, password } = validatedData;
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        return { error: 'User not found.' };
    }
    try {
        await signIn("credentials", {
            email: user.email,
            password: password,
            redirectTo: '/get-started'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': 
                    return { error: 'Invalid credentials.' };
                default:
                    return { error: 'Please confirm your email address.' };
            }
        }
    }
    return { success: 'User logged in successfully.' };
};