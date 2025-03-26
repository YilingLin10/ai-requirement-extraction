import SignUpForm from "@/components/auth/sign-up-form"
import { AuthHeader } from "@/components/auth/auth-header"
import { AuthFooter } from "@/components/auth/auth-footer"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[320px] mx-auto scale-150">
        <AuthHeader title="Sign Up" />
        <SignUpForm />
        <AuthFooter text="Already have an account?" linkText="Sign in" href="/sign-in" />
      </div>
    </div>
  ) 
}
