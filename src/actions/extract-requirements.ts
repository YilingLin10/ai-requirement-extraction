"use server"
import { z } from 'zod';
import { textFormSchema } from '@/lib/zod';
//import { textGeneration } from "@/lib/huggingface"
import { textGeneration } from "@/lib/test-ai"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from '@/lib/getCurrentUser';

type ExtractedRequirement = {
  id: number
  category: string
  category_description: string
  original_text: string
}

async function saveExtractionWithRequirements(
  originalText: string,
    requirements: ExtractedRequirement[]
) {
    const extraction = await prisma.extraction.create({
        data: {
            originalText,
            requirements: {
                create: requirements.map((r) => ({
                    category: r.category,
                    categoryDescription: r.category_description,
                    originalText: r.original_text,
                })),
            },
        },
        include: {
            requirements: true,
        },
    })
    return extraction
}


export const extractRequirements = async (data: z.infer<typeof textFormSchema>) => {
    const user = await getCurrentUser();
    if (!user) {
        return { error: 'User not found' };
    }
    // check if user has > 0 credits
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    })
    if (!dbUser || dbUser.credit <= 0) {
        return { error: 'Insufficient credits.' };
    }
    const validatedData = textFormSchema.parse(data);
    if (!validatedData) {
        return { error: 'Invalid input data.' };
    }
    const { text } = validatedData;
    const prompt = `
        You are an AI system that extracts and categorizes software requirements from user input.
        Your task is:
        1. Extract each distinct requirement as written in the original input.
        2. Assign it to the most appropriate category from the **fixed list below**.
        3. Use the **exact category description provided** — do not generate your own.
        ---
        Categories (do not change):
        [
        {
            "category": "Authentication & Authorization",
            "category_description": "Login, registration, role-based access, session management"
        },
        {
            "category": "User Management",
            "category_description": "Create/edit/delete users, assign roles, view profiles"
        },
        {
            "category": "Data Storage & Management",
            "category_description": "CRUD operations, relational data, file storage"
        },
        {
            "category": "API / Integration",
            "category_description": "RESTful APIs, third-party integrations (e.g., Stripe, Gmail)"
        },
        {
            "category": "Reporting & Analytics",
            "category_description": "Dashboards, performance metrics, data visualization"
        },
        {
            "category": "Search & Filtering",
            "category_description": "Search bars, filters, keyword queries"
        },
        {
            "category": "Notifications",
            "category_description": "Email, SMS, in-app alerts"
        },
        {
            "category": "Scheduling & Calendar",
            "category_description": "Events, reminders, calendar integration"
        },
        {
            "category": "E-commerce",
            "category_description": "Cart, checkout, payments, order history"
        },
        {
            "category": "Localization",
            "category_description": "Multilingual support, timezone handling"
        }
        ]
        ---
        Return only valid JSON in this format:
        [
        {
            "id": 1,
            "category": "Authentication & Authorization",
            "category_description": "Login, registration, role-based access, session management",
            "original_text": "Users should be able to log in with their credentials"
        }
        ]
        Only return valid JSON. Do not include explanations or formatting outside the array.
        User Input:
        """${text}"""
    `
    try {
        const resultString = await textGeneration(prompt);
        const parsed = JSON.parse(resultString || '[]');
        const extraction = await saveExtractionWithRequirements(text, parsed);
        // deduct credits
        const updatedUser = await prisma.user.update({
            where: { email: dbUser.email! },
            data: {
                credit: {
                    decrement: 1
                }
            }
        })
        return {
            success: "Requirements extracted successfully.",
            extractionId: extraction.id,
            remainingCredits: updatedUser.credit
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to extract requirements."
        }
    }
}