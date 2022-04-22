import React from 'react'

export default function Field() {
  return (
    <div ref={descriptionSection} className='relative w-full'>
            <div className='md:absolute md:-left-20 md:top-1.5 italic space-x-1 mb-6 text-gray-400 font-lora text-sm'>
              <span>3</span>
              <span className='text-xs'>of</span>
              <span>3</span>
            </div>
            <h2 className='font-lora  text-2xl mb-4'>Last thing: Describe <i>what this method actually does</i>.</h2>
            <p className='font-lora text-gray-500 mb-6'>It&apos;ll help fill out fields on the next page.</p>
            <div className='flex'>
              <div className='w-full mr-2'>
                <div className={`mb-2 p-4 flex flex-col w-full border rounded-lg ${checkedMethod.inputs.length > 0 && 'space-y-2'}`}>
                  <div className='flex space-x-4'>
                    <div className='flex items-center justify-between w-full'>
                      <h3 className='font-lora mr-12 md:mr-16 text-lg break-all'>{checkedMethod.name}</h3>
                      <p className='flex-shrink-0 self-start leading-7 text-xs text-gray-400'>{checkedMethod.inputs.length} field{checkedMethod.inputs.length !== 1 && 's'}</p>
                    </div>
                  </div>
                  {checkedMethod.inputs && (
                    <table cellPadding={0} cellSpacing={0}>
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkedMethod.inputs.map(input => 
                        <tr key={input.name} className="flex justify-between items-baseline ">
                          <td className='text-sm flex-grow break-all mr-2 text-gray-500'>
                            {input.name}
                          </td>
                          <td className='ml-2 text-xs flex-shrink-0 text-gray-400'>
                            {input.type}
                          </td>
                        </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                <input placeholder='Swaps a token on Uniswap, Mints a GM Gnome NFT'
                       className='rounded-lg transition duration-200 hover:text-gray-800 focus:text-gray-800 focus:border-blue-500 border hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 truncate py-2 px-4 w-full' 
                />
              </div>
            </div>
          </div>
  )
}
