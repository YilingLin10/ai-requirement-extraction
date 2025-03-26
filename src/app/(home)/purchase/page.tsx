"use client"
import { PaymentForm } from '@/components/home/payment-form'
import { CreditSelector } from '@/components/home/credit-selector'
import { useState } from 'react'
const PurchasePage = () => {
  const [credits, setCredits] = useState<number>(10)
  const pricePerCredit = 0.1

  return (
    <div className="flex justify-center">
      <div className="lg:w-[60%] md:w-70%] w-full grid gap-4">
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Payment Summary</h1>
          </div>
        </div>
        <CreditSelector 
          credits={credits}
          setCredits={setCredits}
          pricePerCredit={pricePerCredit}
        />
        <PaymentForm
          credits={credits}
        />
      </div>
    </div>
  )
}

export default PurchasePage;