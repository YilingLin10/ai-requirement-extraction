import SignInForm from "@/components/auth/sign-in-form"
import { AuthHeader } from "@/components/auth/auth-header"
import { AuthFooter } from "@/components/auth/auth-footer"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[320px] mx-auto scale-150">
        <AuthHeader title="Sign In" />
        <SignInForm />
        <AuthFooter text="Don't have an account?" linkText="Sign up" href="/sign-up" />
      </div>
    </div>
  ) 
}