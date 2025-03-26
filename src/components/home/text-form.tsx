"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { textFormSchema } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { extractRequirements } from "@/actions/extract-requirements"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface TextFormProps {
    disabled?: boolean
}
export const TextForm = ({ disabled }: TextFormProps) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof textFormSchema>>({
        resolver: zodResolver(textFormSchema),
        defaultValues: {
            text: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof textFormSchema>) => {
        setLoading(true)
        await extractRequirements(data).then((res) => {
            if (res.success && res.extractionId) {
                if (res.remainingCredits <= 0) {
                    toast.info("You have run out of credits.")
                }
                // redirect to extraction page
                router.push(`/extractions/${res.extractionId}`)
            } 
            if (res.error) { 
                setLoading(false)
                toast.error(res.error)
            }
            setLoading(false)
        })
    }
    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-[75%] gap-4">
                    <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Textarea
                            placeholder="Please paste your requirements here."
                            className="resize-none min-h-[320px]"
                            {...field}
                            disabled={disabled}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" disabled={disabled}>{loading ? "Loading..." : "Submit"}</Button>
                </form>
            </Form>
        </div>
    )
}