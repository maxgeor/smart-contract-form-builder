import React from 'react'
import { useState } from 'react'

export default function Field({ name, type, title, description, isEditable, beingEdited, updateForm, isPublic = false, isFocusedField, handleFocus, handleUpdate }) {

  return (
    <div className='w-full group'>
      <div className={`p-8 w-full sm:rounded-lg transition duration-200'`}>
        <div className='flex items-baseline justify-between'>
          <h2 className='text-2xl mb-4 mr-4 transition-text duration-200'>{title ? title : name}</h2>
          {!title && <span className='text-xs text-gray-400 font-karla'>{type}</span>}
        </div>
        <div className='flex'>
          <label className='relative flex flex-col items-start w-full' htmlFor={name}>
            <input 
              autoFocus
              placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
              className={`hover:border-gray-300 hover:text-gray-800 focus:text-gray-800 rounded-lg border  transition duration-200  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
            />
          </label>
        </div>
      </div>
    </div>
  )
}