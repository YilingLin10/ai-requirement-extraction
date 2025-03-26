import { OpenAI } from "openai";

const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
});

export const textGeneration = async(prompt: string, input: string) => {
    const response = await client.responses.create({
        model: "gpt-4o",
        instructions: prompt,
        input: input,
    });
    return response.output_text;
}
