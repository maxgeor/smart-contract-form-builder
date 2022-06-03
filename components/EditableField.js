import React from 'react'
import { useState } from 'react'

export default function EditableField({ name, type, title, description, isEditable, beingEdited, updateForm, isPublic = false, isFocusedField, handleFocus, handleUpdate }) {
  const [fieldTitle, setFieldTitle] = useState(title)
  const [fieldDescription, setFieldDescription] = useState(description)

  return (
    <div onClick={() => handleFocus(name)} className='w-full group'>
      <div className={`${isFocusedField && isEditable ? 'ring-1 ring-gray-200 bg-gray-100/80' : 'hover:ring-1 hover:ring-gray-200 hover:bg-gray-50/80'} p-8 w-full sm:rounded-lg transition duration-200'`}>
        <div>
          <div className='flex items-baseline justify-between'>
            <h2 className={`text-2xl mb-4 mr-4 transition-text duration-200 text-wrap`}>{fieldTitle === '' ? name : isFocusedField ? name : fieldTitle}</h2>
            <span className='text-xs text-gray-400 font-karla'>{type}</span>
          </div>
          {fieldDescription !== '' && !isFocusedField  && (
            <p className='text-gray-500 mb-6'>{fieldDescription}</p>
          )}
        </div>
        {isFocusedField && isEditable && (
          <>
          <input name="title" value={fieldTitle} onChange={e => setFieldTitle(e.target.value)} placeholder="Write a useful prompt..." className={`placeholder:text-gray-400 border bg-white focus:ring-1 w-full text-2xl mb-2  rounded-lg p-2 px-4 transition duration-200 hover:text-gray-800 focus:text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
          <input name="description" value={fieldDescription} onChange={e => setFieldDescription(e.target.value)} placeholder="Write some helper text..." className={`placeholder:text-gray-400 font-lora rounded-lg mb-6 p-2 px-4 w-full bg-white focus:ring-1 transition duration-200 hover:text-gray-800 focus:text-gray-800 border hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
          </>
        )}
        <div className='flex'>
          <label className='relative flex flex-col items-start w-full' htmlFor={name}>
            <input 
              autoFocus
              placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
              disabled={isFocusedField}
              className={`${isFocusedField ? 'bg-transparent' : 'hover:border-gray-300 hover:text-gray-800 focus:text-gray-800'} rounded-lg border  transition duration-200  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
            />
          </label>
        </div>
        {isFocusedField && isEditable && (
          <div className='flex justify-end w-full mt-6'>
            <button
              onClick={() => handleUpdate(name, fieldTitle, fieldDescription)}
              className='bg-blue-500 hover:bg-blue-700 text-white  font-karla py-2 px-4 rounded-lg'>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  )
}