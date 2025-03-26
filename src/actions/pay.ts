"use server"

import { paymentFormSchema } from "@/lib/zod"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/getCurrentUser"

export const pay = async(data: z.infer<typeof paymentFormSchema>) => {
    const user = await getCurrentUser();
    if (!user) {
        return { error: 'User not found.' };
    }
    const validatedData = paymentFormSchema.parse(data);
    if (!validatedData) {
        return { error: 'Invalid input data.' };
    }
    const credits = validatedData.credits;
    // add credits to user account
    try {
        await prisma.user.update({
            where: {
                email: user.email!
            },
            data: {
                credit: {
                    increment: credits
                }
            }
        });
        return { success: 'Payment successful.' };
    } catch (error) {
        console.log(error);
        return { error: 'Payment failed.' };
    }
}