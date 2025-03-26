"use client";

export default function GlobalError({ }: {
    error: Error & { digest?: string }
}) {
    return (
        <html>
            <body>
                <h2>Something Went Wrong...</h2>
            </body>
        </html>
    );
}