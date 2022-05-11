import React from 'react'

export default function Field({ name, type, title, description }) {
  return (
    <div className='w-full group'>
      <div className='p-8 w-full max-w-lg mx-auto rounded-lg hover:ring-1 group-hover:bg-gray-100/50 hover:ring-gray-200/60 transition duration-200'>
        <div className=''>
          <div className='flex items-baseline justify-between'>
            <h2 className='text-2xl mb-4 mr-4 group-hover:text-sm transition-text duration-200'>{name}</h2>
            <span className='text-xs text-gray-400 font-karla'>{type}</span>
          </div>
          <input name="title" placeholder="Write a useful prompt..." className={`placeholder:text-gray-400 border bg-white focus:ring-1 w-full text-2xl mb-2  rounded-lg p-2 px-4 transition duration-200 hover:text-gray-800 focus:text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
          <input name="description" placeholder="Write some helper text..." className={`placeholder:text-gray-400 font-lora rounded-lg mb-6 p-2 px-4 w-full bg-white focus:ring-1 transition duration-200 hover:text-gray-800 focus:text-gray-800 border hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
          <div className='flex group-hover:hidden'>
            <label className='relative flex flex-col items-start w-full' htmlFor={name}>
              <input autoFocus
                     placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
                     className={`border border-gray-200 transition duration-200 hover:text-gray-800 focus:text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}