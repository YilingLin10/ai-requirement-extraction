import { InferenceClient } from "@huggingface/inference"

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

export const textGeneration = async(prompt: string) => {
    const response = await client.chatCompletion({
        provider: "sambanova",
        model: "meta-llama/Llama-3.2-3B-Instruct",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
    })
    return response.choices[0].message.content;
}