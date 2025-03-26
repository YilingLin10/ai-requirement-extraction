import Link from 'next/link';
import { Atom } from 'lucide-react';

interface AuthHeaderProps {
    title: string;
}

export function AuthHeader({ title }: AuthHeaderProps) {
    return (
        <div>
            <div className="flex justify-center">
                <Link href='/'>
                   <Atom size={64}/> 
                </Link>
            </div>
            <h1 className="text-2xl font-bold text-center my-4">{title}</h1>
        </div>
    );
}