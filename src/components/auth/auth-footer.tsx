import Link from 'next/link';

interface AuthFooterProps {
    text: string;
    linkText: string;
    href: string;
}

export function AuthFooter({ text, linkText, href }: AuthFooterProps) {
    return (
        <div className="mt-4 text-center">
            <p>
                {text}&nbsp;
                <Link href={href} className="text-blue-500">{linkText}</Link>
            </p>
        </div>
    );
}   