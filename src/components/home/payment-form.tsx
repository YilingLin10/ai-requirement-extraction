"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { paymentFormSchema } from "@/lib/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormLabel,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { pay } from "@/actions/pay"

interface PaymentFormProps {
    credits: number
}
export const PaymentForm = ({ credits }: PaymentFormProps) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            cardNumber: "",
            cardHolder: "",
            expiryDate: "",
            cvv: "",
            credits: credits,
        }
    })
    const onSubmit = async (data: z.infer<typeof paymentFormSchema>) => {
        setLoading(true)
        await pay(data).then((res) => {
            if (res.success) {
                setLoading(false)
                // redirect to get-started page
                router.push('/get-started')
            } else {
                setLoading(false)
            }
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-center">Payment Form</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cardHolder"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Card Holder</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Expiry Date</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="text"
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="credits"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="hidden"
                                                value={credits}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full h-[48px]" aria-disabled={loading}>
                            {loading ? "Loading..." : "Pay"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}