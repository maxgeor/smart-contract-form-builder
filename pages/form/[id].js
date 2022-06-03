import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import Field from '../../components/Field';
import WalletConnectButton from '../../components/WalletConnectButton';
import { LinkIcon, ArrowSmRightIcon } from '@heroicons/react/solid'
import { useContract } from 'wagmi'
import { useState, useEffect, createRef } from 'react'

import { findForm, updateForm } from '../../lib/db';
import { Router } from 'next/router';

export default function Form({ ...form }) {
  const address = createRef();
  const [errors, setErrors] = useState({});
  const [onMobile, setOnMobile] = useState(false);

  useEffect(() => window.addEventListener('resize', () => setOnMobile(window.innerWidth < 768)), []);
  useEffect(() => window.addEventListener('resize', () => setOnMobile(window.innerWidth < 768)), []);

  const contract = useContract({
    addressOrName: form.contract.address,
    contractInterface: form.contract.abi,
  });

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
      if (field.required && !data[field.name]) {
        errors[field.name] = 'Required';
      }
    }
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    try {
      await prisma.mutation.updateForm({
        where: { id: form.id },
        data: {
          ...data,
          address: address.current.value,
        },
      });
      window.location.href = `/edit/${form.id}`;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className='relative min-h-screen'>
      <main className='font-lora flex flex-col items-center mx-auto mb-80'>
        <div className={`background-pattern w-full h-44`}></div>
        <section className={`-mt-32 sm:-mt-28 mb-4 sm:mb-12 bg-white p-8 pt-12 sm:pt-10 shadow-t sm:shadow rounded-t-xl sm:rounded-xl sm:max-w-lg mx-auto w-full`}>
          <div className='max-w-md mx-auto'>
            <h1 value={form.title} className={`sm:px-4  mb-[15px] pb-1 border-b border-transparent w-full placeholder:text-gray-800  font-lora text-4xl font-medium text-center transition duration-200 focus:outline-none`} >
              {form.title ? form.title : `Call ${form.method}`}
            </h1>
            <h3 className='sm:px-4 mb-[23px] sm:mb-[27px] pb-1 border-b border-transparent  w-full text-gray-500 font-lora text-center transition duration-200 focus:outline-none'>
              {form.description ? form.description : `This calls the ${form.method} method from the ${form.contract.name} contract.`}
            </h3>
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
        <div className='max-w-lg mx-auto space-y-4'>
          {form.fields.map(field => 
            <Field 
              key={field.name}
              name={field.name}
              type={field.type} 
              title={field.title}
              description={field.description}
            />
          )}
          <div className='p-8 w-full rounded-lg'>
            <h2 className='text-2xl mb-4'>Connect your wallet</h2>
            <p className='font-lora text-gray-500 mb-6'>
              You need an Ethereum wallet to submit this form. Don&apos;t have one? Use <Link href={onMobile ? 'https://rainbow.me/' : 'https://metamask.io/'}><a target={'_blank'} className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>{onMobile ? 'Rainbow' : 'Metamask'}</a></Link>.
            </p>
            <WalletConnectButton />
          </div>
          <div className='mx-0'>
            <div className='my-12 p-8 sm:rounded-lg ring-1 ring-blue-100/90 bg-blue-50/80'>
              <div className='max-w-md'>
                <p className='font-lora text-gray-500 mb-4'><i>Anyone</i> can make a form for this contract — make sure you trust it.</p>
                <label htmlFor='confirmation' className='cursor-pointer flex items-center space-x-3'>
                  <input name="confirmaton" id='confirmation' type='checkbox' className={`rounded-lg transition duration-200 border hover:border-gray-300  truncate`} />
                  <p>I trust this form</p>
                </label>
              </div>
            </div>
          </div>
          <div className='ml-8 pt-8'>
            <label htmlFor='submit' onClick={e => handleSubmit(e)} className="flex w-fit items-center font-karla h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 pr-3 rounded-lg font-medium text-white">
              <span className='mr-1.5'>Submit</span>
              <ArrowSmRightIcon className='h-5 w-5' />
              <input id='submit' name='submit' className='hidden' />
            </label>
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const form = await findForm(context.params.id);
  console.log(form)
  if (!form) {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
  return { 
    props: { 
      ...form
    } 
  };
}