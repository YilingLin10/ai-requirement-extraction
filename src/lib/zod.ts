import { object, string, number } from "zod"
 
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const signUpSchema = object({
  name: string({ required_error: "Name is required" }),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})

export const textFormSchema = object({
  text: string({ required_error: "Text is required" })
    .min(1, "Please enter your requirements.")
})

export const paymentFormSchema = object({
  cardNumber: string({ required_error: "Card number is required" })
    .min(1, "Card number is required")
    .max(16, "Card number must be 16 characters"),
  cardHolder: string({ required_error: "Card holder is required" })
    .min(1, "Card holder is required"),
  expiryDate: string({ required_error: "Expiry date is required" })
    .regex(/^\d{2}\/\d{2}$/, "Expiry must be in MM/YY format"),
  cvv: string({ required_error: "CVV is required" })
    .regex(/^\d{3}$/, "CVV must be 3 digits"),
  credits: number({ required_error: "Credits is required" })
    .min(10, "Please select the number of credits you want to purchase.")
})