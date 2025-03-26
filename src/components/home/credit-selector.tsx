"use client"

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

interface CreditSeletorProps {
    credits: number
    setCredits: (v: number) => void
    pricePerCredit: number
  }
export const CreditSelector = ({ credits, setCredits, pricePerCredit }: CreditSeletorProps) => {
    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Select Credits</h2>
            <Select value={String(credits)} onValueChange={(v) => setCredits(Number(v))}>
                <SelectTrigger className="w-[20%]">
                    <SelectValue placeholder="Select credits" />
                </SelectTrigger>
                <SelectContent>
                    {[10, 20, 50, 100].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                            {num}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            </div>
            <div className="text-right">

            <p className="text-bold">
                Total: ${(credits * pricePerCredit).toFixed(2)}
            </p>
            </div>
        </div>
    )
}