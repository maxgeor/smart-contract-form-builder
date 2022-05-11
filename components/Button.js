import React from 'react'

export default function Button({ hasArrow = false }) {
  return (
    <button 
      onClick={handleSubmit} 
      disabled={selectedMethod ? false : true} 
      className={`flex items-center font-karla h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 pr-3 rounded-lg font-medium text-white`}
    >
      <span className='mr-1.5'>Create your form</span>
      {hasArrow && <ArrowSmRightIcon className='h-5 w-5 mr-1.5' />}
    </button>
  )
}
