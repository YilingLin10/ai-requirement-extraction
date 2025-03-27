import React from 'react'
import Spinner from '@/components/home/spinner'
const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <Spinner />
    </div>
  )
}

export default loading