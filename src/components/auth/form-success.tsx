import { CheckCheckIcon } from 'lucide-react'

interface FormSuccessProps {
    message: string
}

export function FormSuccess({ message }: FormSuccessProps) {
    if (!message) return null
    return (
        <div className="flex items-center space-x-4  text-green-500 bg-green-50 p-4 rounded-lg">
            <CheckCheckIcon className="w-6 h-6"/>
            <p>{message}</p>
        </div>
    )
}