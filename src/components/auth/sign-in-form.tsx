"use client"
import { useForm } from "react-hook-form"
import { 
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/lib/zod"
import { z } from "zod"
import { login } from "@/actions/login"
import { FormSuccess } from "@/components/auth/form-success"
import { FormError } from "@/components/auth/form-error"
import { useRouter } from 'next/navigation';

const SignInForm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const form = useForm<z.infer<typeof signInSchema>>({ 
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setLoading(true)
        // register an account
        login(data).then((res) => {
            if (res.error) {
                setLoading(false)
                setError(res.error)
                setSuccess("")
            } 
            if (res.success) {
                router.push('/get-started');
            }
        })
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    required
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    required
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <FormSuccess message={success}/>
            <FormError message={error}/>
            <Button type="submit" className="w-full h-[48px]" aria-disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
            </Button>
        </form>
    </Form>
  )
}

export default SignInForm