import Link from 'next/link';
import { Button } from '@/components/ui/button'

export default function Home() {
    return (
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          LLM-Based Requirement Analyzer
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Paste your software requirements and let our AI do the heavy lifting.<br />
          ✨ Automatically extracts key features, categories, and details.<br />
          📊 Displays structured data in an easy-to-read table.<br />
          🎯 Start with 20 free credits — 1 credit per requirement extracted.<br />
        </p>
        <div className="flex">
          <Button className="mt-8 text-lg px-8 py-6">
            <Link href="/get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    );
}