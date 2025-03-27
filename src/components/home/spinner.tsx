import React from 'react'

const Spinner = () => {
  return (
    <div className="animate-spin inline-block size-10 border-[4px] rounded-full border-t-cyan-500 border-gray-200"
      role="status"
      aria-label='loading'>
        <span className="sr-only">Loading</span>
    </div>
  )
}

export default Spinner