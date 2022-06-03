import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import EditableField from '../../components/EditableField';
import WalletConnectButton from '../../components/WalletConnectButton';
import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import { LinkIcon, ArrowSmRightIcon, CheckIcon } from '@heroicons/react/solid'
import { useAccount, useContract } from 'wagmi'
import { useState, useEffect, createRef } from 'react'

import { findForm, updateForm } from '../../lib/db';

export default function Edit({ ...form }) {
  const { data, isError, isLoading } = useAccount()
  const address = createRef();
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [onMobile, setOnMobile] = useState(false);
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => window.addEventListener('resize', () => setOnMobile(window.innerWidth < 768)), []);
  useEffect(() => window.addEventListener('resize', () => setOnMobile(window.innerWidth < 768)), []);

  const contract = useContract({
    addressOrName: form.contract.address,
    contractInterface: form.contract.abi,
  });

  const handleFocus = (fieldName) => {
    if (focusedField) {
      return;
    }
    setFocusedField(fieldName);
  }

  const handleUpdate = (name, title, description) => {
    console.log(name, title, description);
    // update form field
      // pass the form id, the field name, title, and description
    setFocusedField(null);
  }

  const handleCopy = () => {
    setJustCopied(true);
    navigator.clipboard.writeText(`${window.location.host}/form/${form.id}`);
    setTimeout(() => setJustCopied(false), 1500);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    debugger;
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    const errors = {};
    for (let field of fields) {
      if (!data[field.name]) {
        errors[field.name] = 'Required';
      }
    }
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    try {
      
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='relative min-h-screen'>
      <header className='sticky top-0 bg-white z-10 shadow'>
        <div className='relative flex items-center justify-between px-4 md:px-8 py-3'>
          <Link href='/new'>
            <a className='p-1 rounded-md hover:bg-gray-100'>
              <ArrowSmLeftIcon className='h-6 w-6 text-gray-500 flex-shrink-0' />
            </a>
          </Link>
          <div className='absolute left-1/2 transform -translate-x-1/2 cursor-pointer flex justify-center items-center h-9 w-8 p-1 rounded-md bg-blue-500'>
            <div className='text-white italic font-lora font-medium text-2xl'>F</div>
          </div>
          <button onClick={handleCopy} className="flex items-center space-x-2 h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 hover:text-blue-50 py-2 pl-3 pr-4 rounded-lg font-medium text-white">
            {justCopied ? <CheckIcon className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
            <span className='text-sm'>{justCopied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
      </header>
      <main className='font-lora flex flex-col items-center mx-auto mb-80'>
        <div className={`background-pattern w-full h-52`}></div>
        <section className={`-mt-36 sm:-mt-32 mb-8 sm:mb-12 bg-white p-8 pt-12 sm:pt-10 shadow-t sm:shadow rounded-t-xl sm:rounded-xl sm:max-w-lg mx-auto w-full`}>
          <div className='max-w-md mx-auto'>
            <textarea rows={1} autoFocus onFocus={e => e.target.select()} type="text" placeholder="Add a Title..." value={form.title} className={`sm:px-4  mb-[15px] focus:mb-[14px] pb-1 border-b focus:border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 w-full placeholder:text-gray-800 focus:placeholder:text-gray-400  font-lora text-4xl font-medium text-center transition duration-200 focus:outline-none`} />
            <textarea rows={1} onFocus={e => e.target.select()} placeholder="Add a description..." value={form.description} className='sm:px-4 mb-[23px] sm:mb-[27px] focus:mb-[22px] sm:focus:mb-[26px] pb-1 border-b focus:border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 w-full text-gray-500 placeholder:text-gray-500 focus:placeholder:text-gray-400 font-lora text-center transition duration-200 focus:outline-none'/>
            <div className='flex flex-col border rounded-lg'>
              <div className='flex p-4 flex-wrap'>
                <div className='flex-1 mr-4'>
                  <h4 className='uppercase text-xs text-gray-400 tracking-wider font-karla mb-2 whitespace-nowrap'>Contract</h4>
                  <h2 className='text-lg break-all leading-6'>{form.contract.name}</h2>
                </div>
                <div className='flex-1 mr-4'>
                  <h4 className='uppercase text-xs text-gray-400 tracking-wider font-karla mb-2 whitespace-nowrap'>What&apos;ll This do?</h4>
                  <p className='text-lg break-all leading-6'>{form.method}</p>
                </div>
              </div>
              <Link href={`https://etherscan.io/token/${form.contract.address}`}>
                <a target='_blank' className='cursor-pointer hover:bg-gray-50 rounded-b-lg border-t px-4 py-2 flex items-center justify-center transition duration-200 space-x-1.5'>
                  <Image src='/etherscan-logo-circle.svg' width={16} height={16} />
                  <span className='text-xs text-gray-500'>See on Etherscan</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
        <div className='max-w-lg mx-auto space-y-4 w-full'>
          {form.fields.map((field, index) => 
            <EditableField
              key={field.name}
              handleFocus={handleFocus} 
              handleUpdate={handleUpdate}
              name={field.name}
              type={field.type} 
              title={field.title}
              description={field.description}
              isEditable={true}
              focusedField={focusedField}
              isFocusedField={focusedField === field.name}
            />
          )}
          {/* <div ref={field1} id='field1' onClick={(e) => handleClick} className='w-full group'>
            <div className='p-8 w-full max-w-lg mx-auto rounded-lg hover:ring-1 group-hover:bg-gray-100/50 hover:ring-gray-200/60 transition duration-200'>
              <div className=''>
                <div className='flex items-baseline justify-between'>
                  <h2 name="title" className='text-2xl mb-4 mr-4 group-hover:text-sm transition-text duration-200'>renounceOwnership</h2>
                  <span className='text-xs text-gray-400 font-karla'>uint256</span>
                </div>
                <input name="title" placeholder="Write a useful prompt..." className={`${focusedField === 'field1' ? 'block' : 'hidden'} placeholder:text-gray-400 border bg-white focus:ring-1 w-full text-2xl mb-2  rounded-lg p-2 px-4 transition duration-200 hover:text-gray-800 focus:text-gray-800 hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
                <input name="description" placeholder="Write some helper text..." className={`${focusedField === 'field1' ? 'block' : 'hidden'} placeholder:text-gray-400 font-lora rounded-lg mb-6 p-2 px-4 w-full bg-white focus:ring-1 transition duration-200 hover:text-gray-800 focus:text-gray-800 border hover:border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}/>
                <div className='flex group-hover:hidden'>
                  <label className='relative flex flex-col items-start w-full' htmlFor='address'>
                    <input ref={address} 
                          autoFocus
                          // placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
                          className={`${contract.name === undefined ? 'rounded-lg' : 'rounded-t-lg text-gray-400'}  border border-gray-300  transition duration-200 hover:text-gray-800 focus:text-gray-800  ${errors.address && 'border-red-400'}  focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
                    />
                  </label>
                </div>
                <div className='hidden group-hover:flex'>
                  <label className='relative flex flex-col items-start w-full' htmlFor='address'>
                    <input ref={address} 
                          autoFocus
                          disabled
                          // placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
                          className={`${contract.name === undefined ? 'rounded-lg' : 'rounded-t-lg text-gray-400'} bg-transparent placeholder:text-gray-300 text-gray-300 transition duration-200 hover:text-gray-800 focus:text-gray-800 border border-gray-200/70 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
                    />
                  </label>
                </div>
                {errors.address && (
                <div className='mt-2'>
                  <p className='text-sm text-red-600'>{errors.address}</p>
                </div>
                )}
              </div>
            </div>
          </div> */}
          {/* <div className='p-8 w-full rounded-lg'>
            <h2 className='text-2xl mb-4'>Connect your wallet</h2>
            <p className='font-lora text-gray-500 mb-6'>
              You need an Ethereum wallet to submit this form. Don&apos;t have one? Use <Link href={onMobile ? 'https://rainbow.me/' : 'https://metamask.io/'}><a target={'_blank'} className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>{onMobile ? 'Rainbow' : 'Metamask'}</a></Link>.
            </p>
            <WalletConnectButton />
          </div> */}
          {/* <div className='mx-0'>
            <div className='my-12 p-8 sm:rounded-lg ring-1 ring-blue-100/90 bg-blue-50/80'>
              <div className='max-w-md'>
                <p className='font-lora text-gray-500 mb-4'><i>Anyone</i> can make a form for this contract — make sure you trust it.</p>
                <div className='flex items-center space-x-3'>
                  <input name="confirmaton"
                        type='checkbox'
                        className={`rounded-lg transition duration-200 hover:text-gray-800 focus:text-gray-800 border hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate`} 
                  />
                  <label htmlFor='confirmation'>I trust this form</label>
                </div>
              </div>
            </div>
          </div> */}
          <div className='flex items-center ml-8 pt-8 space-x-6'>
            <button onClick={e => handleSubmit(e)} className="flex items-center font-karla h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 pr-3 rounded-lg font-medium text-white">
              <span className='mr-1.5'>Submit</span>
              <ArrowSmRightIcon className='h-5 w-5' />
            </button>
            <button className='text-gray-500 font-karla text-xs hover:underline underline-offset-4 decoration-gray-400 font-medium'>Edit label</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const form = await findForm(context.params.id);
  console.log("FORM DATA:", form);
  return { 
    props: { 
      ...form
    } 
  };
}