import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useState, useEffect, createRef } from 'react'
import ArrowRight from '../icons/ArrowRight';

import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider() || 'http://localhost:3000');

export default function New() {
  const address = createRef();
  const [contract, setContract] = useState({});
  const [methods, setMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedMethod, setCheckedMethod] = useState('');
  const [errors, setErrors] = useState({});
  const [showingEtherscanLogo, setShowingEtherscanLogo] = useState(false);

  const isInitialMount = createRef(true);
  
  const methodSection = createRef();
  const descriptionSection = createRef();
  const description = createRef();

  useEffect((e) => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const methodData = contract?._jsonInterface?.filter(method => 
        method.type === 'function' &&
        method.outputs.length === 0
      );
      setMethods(methodData);
    }
  }, [contract, setContract, methods, setMethods, isInitialMount]);

  const getContract = async () => {
    setErrors({});
    if (!web3.utils.isAddress(address.current.value)) {
      return setErrors({ address: "Hmm, that doesn't look like an address. Try copy & pasting it again." });
    }
    
    setIsLoading(true);
    
    try {
      const data = await fetch(`https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address.current.value}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`);
      const json = await data.json();
      const abi = await JSON.parse(json.result[0].ABI);
      const builtContract = new web3.eth.Contract(abi);
      builtContract.name = json.result[0].ContractName
      setContract(builtContract);
      setTimeout(() => {
        setShowingEtherscanLogo(true)
      } , 600);
    } catch (e) {
      console.log(e);
      // setErrors({ address: e });
    }
    
    setIsLoading(false);
  }

  function handleCheck(e, method) {
    if (e.target.checked) {
      setCheckedMethod(method);
    }
  }

  return (
    <div className='min-h-screen text-gray-800'>
      <Head>
        <title>Pick your contract</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='font-karla flex flex-col items-center max-w-md mx-auto mt-16 md:mt-24 mb-36 md:mb-48'>
        <div className='relative mb-16 md:mb-24 mx-8'>
          <Link href="/">
            <div className='cursor-pointer md:absolute md:-left-20 md:top-0.5 flex justify-center items-center h-9 w-8 p-1 rounded-md bg-blue-500 mb-8'>
              <div className='text-white italic font-lora font-medium text-2xl'>F</div>
            </div>
          </Link>
          <h1 className='font-lora text-4xl font-medium'>Ok, let&apos;s make a form for your smart contract!</h1>
        </div>
        <div className='px-8 w-full space-y-16 md:space-y-24'>
          <div className='relative w-full'>
            <div className='md:absolute md:-left-20 md:top-1.5 italic space-x-1 mb-6 text-gray-400 font-lora text-sm'>
              <span>1</span>
              <span className='text-xs'>of</span>
              <span>3</span>
            </div>
            <h2 className='font-lora  text-2xl mb-4'>First, what contract are you using to make this form?</h2>
            <p className='font-lora text-gray-500 mb-6'>Pop in a contract&apos;s address from <Link href={'https://etherscan.io/'} target={'_blank'}><span className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Etherscan</span></Link>.</p>
            <div className='flex'>
              <label className='flex flex-col items-start w-full' htmlFor='address'>
                <input ref={address} 
                       autoFocus
                       placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
                       className={`${contract.name === undefined ? 'rounded-lg' : 'rounded-t-lg text-gray-400'} transition duration-200 hover:text-gray-800 focus:text-gray-800 border ${errors.address && 'border-red-400'} hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
                />
                <div className={`${contract.name === undefined ? 'hidden' : ' flex'} items-center space-x-1.5 font-lora border border-t-0 rounded-b-lg p-4 w-full mr-10`}>
                  <h3 className='font-lora text-lg break-words'>{contract?.name}</h3>
                  <Link href={'https://etherscan.io/'} target={'_blank'}>
                    <a className={`${showingEtherscanLogo ? 'opacity-100 flex' : 'opacity-0'} transition duration-200 justify-center items-center h-5 w-5 hover:bg-gray-200 rounded-full`}>
                      <Image src='/etherscan-logo-circle.svg' width={12} height={12} />
                    </a>
                  </Link>
                </div>
                <span className={`${isLoading ? 'inline-block' : 'hidden'} leading-7 tracking-widest text-2xl text-gray-400 ml-4 mt-2`}>...</span>
              </label>
            </div>
            {errors.address && (
            <div className='mt-2'>
              <p className='text-sm text-red-600'>{errors.address}</p>
            </div>
            )}
            <button onClick={getContract} className="mt-4 cursor-default h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 rounded-lg font-medium text-white">Find</button>
          </div>
          {methods && (
          <div className='relative w-full'>
            <div className='md:absolute md:-left-20 md:top-1.5 italic space-x-1 mb-6 text-gray-400 font-lora text-sm'>
              <span>2</span>
              <span className='text-xs'>of</span>
              <span>3</span>
            </div>
            <div className='font-lora text-gray-500'>
              <h2 ref={methodSection} className='text-gray-800 font-lora text-2xl mb-4'>Sweet, which method should the form use?</h2>
              <p className=' mb-4'>Your form will take this method and...</p>
              <ol className='relative list-decimal list-inside mb-4'>
                <li className='pl-2'>Turn it&apos;s <span className='font-karla'>inputs</span> into form fields</li>
                <li className="pl-2 before:content['-']">Call the method when the form submits</li>
              </ol>
              <p className='font-lora text-gray-500 mb-6 text-xs'>Psst: You can&apos;t use methods that <i>return data</i>, so you won&apos;t find them here.</p>
            </div>
            <div className='divide-y border rounded-lg -mx-4 sm:mx-0'>
              {methods?.map(method => 
              <label className={`p-4 flex sm:items-center justify-between w-full transition duration-200  ${checkedMethod.signature === method.signature && 'bg-blue-500 text-white'} hover:ring-2 hover:ring-inset hover:ring-blue-500 first:rounded-t-lg last:rounded-b-lg`} key={method.signature} htmlFor={method.signature}>
                <div className={`flex flex-col w-full ${method.inputs.length > 0 && 'space-y-2'}`}>
                  <div className='flex space-x-4'>
                    <input className='self-start h-7' onChange={(e) => handleCheck(e, method)} id={method.signature} type='radio' name='method' />
                    <div className='flex items-center justify-between w-full'>
                      <h3 className={`font-lora mr-12 md:mr-16 text-lg break-all ${checkedMethod.signature === method.signature && 'text-white'}`}>{method.name}</h3>
                      <p className={`flex-shrink-0 self-start leading-7 text-xs ${checkedMethod.signature === method.signature ? 'text-blue-200' : 'text-gray-400'}`}>{method.inputs.length} field{method.inputs.length !== 1 && 's'}</p>
                    </div>
                  </div>
                  {method.inputs && (
                    <table className='ml-[29px]' cellPadding={0} cellSpacing={0}>
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {method.inputs.map(input => 
                        <tr key={input.name} className="flex justify-between items-baseline ">
                          <td className={`text-sm flex-grow break-all mr-2 ${checkedMethod.signature === method.signature ? 'text-gray-100' : 'text-gray-500'}`}>
                            {input.name}
                          </td>
                          <td className={`ml-2 text-xs flex-shrink-0 ${checkedMethod.signature === method.signature ? 'text-blue-200' : 'text-gray-400'}`}>
                            {input.type}
                          </td>
                        </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </label>
              )}
            </div>
          </div>
          )}
          {checkedMethod && (
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
                <input ref={description} 
                       placeholder='Swaps a token on Uniswap, Mints a GM Gnome NFT'
                       className='rounded-lg transition duration-200 hover:text-gray-800 focus:text-gray-800 focus:border-blue-500 border hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 truncate py-2 px-4 w-full' 
                />
              </div>
            </div>
            <Link href='/edit'>
              <button className="mt-4 flex items-center font-karla cursor-default h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 pr-3 rounded-lg font-medium text-white">
                <p className='mr-1.5'>Create form & continue</p>
                <ArrowRight className="text-white" />
              </button>
            </Link>
          </div>
          )}
        </div>
      </main>
    </div>
  )
}