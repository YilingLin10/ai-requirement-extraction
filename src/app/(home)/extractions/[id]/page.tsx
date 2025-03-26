import { prisma } from "@/lib/prisma"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ExtractionPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const extraction = await prisma.extraction.findUnique({
        where: { id: id },
        include: {
          requirements: true,
        },
    })
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Extraction Result</h1>
                    <Button asChild>
                        <Link href="/get-started">Start A New Session</Link>
                    </Button>
                </div>
                {extraction?.createdAt && 
                    <p className="text-sm">{new Date(extraction.createdAt).toLocaleString()}</p>
                }
            </div>
            <Textarea value={extraction?.originalText} readOnly className="mb-20 resize-none min-h-[320px]" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] font-bold">#</TableHead>
                        <TableHead className="font-bold">Category</TableHead>
                        <TableHead className="font-bold">Category Description</TableHead>
                        <TableHead className="text-right font-bold">Original Text</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {extraction?.requirements?.map((requirement, index) => (
                        <TableRow key={requirement.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>{requirement.category}</TableCell>
                            <TableCell>{requirement.categoryDescription}</TableCell>
                            <TableCell className="text-right">{requirement.originalText}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
