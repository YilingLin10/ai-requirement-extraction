import { BsExclamationCircleFill } from 'react-icons/bs';

interface FormErrorProps {
    message: string;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    return (
        <div className="flex items-center space-x-4 text-red-500 bg-red-50 p-4 rounded-lg">
            <BsExclamationCircleFill className="w-6 h-6" />
            <p>{message}</p>
        </div>
    );
}