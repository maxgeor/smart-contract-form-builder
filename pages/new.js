import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import getContractFromEtherscan from '../lib/etherscan';
import { useRouter } from 'next/router'
import { findUser, createForm } from '../lib/db'

import { isAddress } from 'ethers/lib/utils';
import { useState, createRef } from 'react'
import { ArrowSmRightIcon, DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/solid'
import LogInWalletConnectButton from '../components/LogInWalletConnectButton';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';

export default function New() {
  const addressField = createRef();
  const [contract, setContract] = useState(null);
  const [contractName, setContractName] = useState();
  const [pickedMethod, setPickedMethod] = useState(null);
  const [methods, setMethods] = useState(null);
  const [errors, setErrors] = useState({});
  // const [showingTags, setShowingTags] = useState(true);
  const [showingEtherscanLogo, setShowingEtherscanLogo] = useState(false);

  const { data, isSuccess } = useAccount()
  const { address } = data || {}

  const Router = useRouter();

  useEffect(() => {
    console.log(address);
  }, [isSuccess]);

  const getContract = async () => {
    const contractAddress = addressField.current.value;

    setErrors({});

    if (!isAddress(contractAddress)) return setErrors({ 
      address: "Hmm, that doesn't look like an address. Try copy & pasting it again." 
    });

    try {
      const contractData = await getContractFromEtherscan(contractAddress);
      setContract(contractData);
      setContractName(contractData.ContractName);

      const abi = JSON.parse(contractData.ABI);
      const oneWayMethods = abi.filter(method =>
        method.type === 'function' &&
        method.outputs.length === 0
      );
      const oneWayMethodsWithIds = oneWayMethods.map((method, index) => {
        return { ...method, id: `${method.name}${index}` };
      });
      setMethods(oneWayMethodsWithIds);
    } catch (e) {
      console.log(e);
    }

    setPickedMethod(null);
    setTimeout(() => {
      setShowingEtherscanLogo(true)
    }, 600);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = await createForm(
        address, 
        contract.ABI,
        addressField.current.value,
        contractName,
        pickedMethod.name,
        pickedMethod.inputs
      );

      Router.push(`/edit/${form.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagClick = (e) => {
    e.preventDefault();
    addressField.current.value = e.target.dataset.address;
    getContract();
  }

  return (
    <div className='min-h-screen text-gray-800'>
      <main className='relative font-karla flex flex-col items-center max-w-lg mx-auto mt-16 md:mt-24 mb-48 md:mb-96'>
        <div className='relative mb-16 md:mb-24 mx-8'>
          <div className='flex flex-row items-center mb-8 lg:mb-0 mr-full'>
            <div className='cursor-pointer absolute right-0 sm:-right-24 md:-right-40 -top-8 sm:-top-16'>
              <LogInWalletConnectButton 
                label={'Connect wallet'} 
                classes={'font-karla font-medium'}
                isDropdown={true}
              />
            </div>
            <Link href="/">
              <div className='cursor-pointer sm:absolute sm:left-0 md:-left-20 md:top-0.5 flex justify-center items-center h-9 w-8 p-1 rounded-md bg-blue-500'>
                <div className='text-white italic font-lora font-medium text-2xl'>F</div>
              </div>
            </Link>
          </div>
          <h1 className='font-lora text-4xl font-medium'>Ok, let&apos;s make a form for your smart contract!</h1>
        </div>
        <div className='px-8 w-full'>
          <div className='relative w-full mb-16 md:mb-24'>
            <div className='md:absolute md:-left-20 md:top-1.5 italic space-x-1 mb-6 text-gray-400 font-lora text-sm'>
              <span>1</span>
              <span className='text-xs'>of</span>
              <span>2</span>
            </div>
            <h2 className='font-lora  text-2xl mb-4'>What contract are you making a form for?</h2>
            <p className='font-lora text-gray-500 mb-6'>Pop in the address of a contract from <Link href={'https://etherscan.io/'} target={'_blank'}><span className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Etherscan</span></Link>.</p>
            <label className='relative z-10 flex flex-col items-start w-full' htmlFor='address'>
              <input 
                ref={addressField} 
                autoFocus
                placeholder='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7'
                className={`${!contract ? 'rounded-lg' : 'rounded-t-lg text-gray-400'} transition duration-200 hover:text-gray-500 focus:text-gray-800 border ${errors.address && 'border-red-400'} border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 truncate py-2 px-4 md:pr-8  w-full`} 
                // onFocus={() => setShowingTags(true)}
                // onBlur={() => {
                //   console.log(contract);
                //   if (contract === {}) setShowingTags(false)
                // }}
              />
              <div className={`${!contract ? '-mt-[3.75rem] opacity-0 pointer-events-none' : ' flex'} transition duration-300 h-[3.75rem] box-border items-center space-x-1.5 font-lora border border-t-0 border-gray-200 rounded-b-lg p-4 w-full mr-10`}>
                <h3 className='font-lora text-lg break-words'>{contract?.ContractName}</h3>
                <Link href={'https://etherscan.io/'}>
                  <a target='_blank' className={`${showingEtherscanLogo ? 'opacity-100 flex' : 'opacity-0'} transition duration-200 justify-center items-center h-5 w-5 hover:bg-gray-200 rounded-full`}>
                    <Image src='/etherscan-logo-circle.svg' width={12} height={12} />
                  </a>
                </Link>
              </div>
            </label>
            <div className={`opacity-100 transition duration-300 transform mt-3 mb-6`}>
              <div className='flex space-x-2 z-0 '>
                <button onClick={e => handleTagClick(e)} data-address='0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' className='transition duration-200 flex items-center space-x-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full py-1.5 px-3'>
                  <DocumentDuplicateIcon className='pointer-events-none h-3 w-3 text-gray-400' />
                  <span className='pointer-events-none'>Uniswap</span>
                </button>
                <button onClick={e => handleTagClick(e)} data-address='0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7' className='transition duration-200 flex items-center space-x-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full py-1.5 px-3'>
                  <DocumentDuplicateIcon className='pointer-events-none h-3 w-3 text-gray-400' />
                  <span className='pointer-events-none'>Loot</span>
                </button>
                <button onClick={e => handleTagClick(e)} data-address='0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72' className='transition duration-200 flex items-center space-x-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full py-1.5 px-3'>
                  <DocumentDuplicateIcon className='pointer-events-none h-3 w-3 text-gray-400' />
                  <span className='pointer-events-none'>ENS</span>
                </button>
              </div>
            </div>
            {errors.address && (
              <div className='mt-2'>
                <p className='text-sm text-red-600 mt-2'>{errors.address}</p>
              </div>
            )}
            <button onClick={getContract} className="block mt-4 h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 rounded-lg font-medium text-white">Find</button>
          </div>
          {methods && (
            <div className='relative w-full'>
              <div className='md:absolute md:-left-20 md:top-1.5 italic space-x-1 mb-6 text-gray-400 font-lora text-sm'>
                <span>2</span>
                <span className='text-xs'>of</span>
                <span>2</span>
              </div>
              <div className='font-lora text-gray-500'>
                <h2 className='text-gray-800 font-lora text-2xl mb-4'>Got it ??? which method should the form use?</h2>
                <p className=' mb-4'>Your form will take this method and...</p>
                <ol className='relative list-decimal list-inside mb-4'>
                  <li className='pl-2'>Turn it&apos;s <span className='font-karla'>inputs</span> into form fields</li>
                  <li className="pl-2">Call it when the form submits</li>
                </ol>
                <p className='font-lora text-gray-500 mb-6 text-xs'>You can&apos;t use methods that <i>return data</i>, so you won&apos;t find those ones here.</p>
              </div>
              <div className='divide-y border rounded-lg -mx-4 sm:mx-0 mb-4'>
                {methods.map(method => 
                  <label 
                    key={method.id} 
                    htmlFor={method.id} 
                    className={`relative transform active:scale-[99%] ease-out p-4 flex sm:items-center justify-between w-full transition duration-150 ${pickedMethod?.id === method.id && 'bg-blue-500 text-white'} hover:ring-2 hover:ring-inset hover:ring-blue-500 first:rounded-t-lg last:rounded-b-lg`} 
                    onClick={() => setPickedMethod(method)} 
                  >
                    <input id={method.id} type='radio' name='method' className='peer hidden self-start h-7' />
                    <span className='absolute top-[1.4375rem] left-4 h-[14px] w-[14px] rounded-full box-border border border-gray-400 peer-checked:border-2 peer-checked:hidden' />
                    <CheckIcon className='absolute top-5 left-3.5 h-5 w-5 hidden peer-checked:block text-white' />
                    <div className={`ml-[1.875rem] flex flex-col w-full ${method.inputs.length > 0 && 'space-y-2'}`}>
                      <div className='flex space-x-4'>
                        <div className='flex items-center justify-between w-full'>
                          <h3 className={`font-lora mr-12 md:mr-16 text-lg break-all ${pickedMethod?.id === method.id && 'text-white'}`}>{method.name}</h3>
                          <p className={`flex-shrink-0 self-start leading-7 text-xs ${pickedMethod?.id === method.id ? 'text-blue-200' : 'text-gray-400'}`}>{method.inputs.length} field{method.inputs.length !== 1 && 's'}</p>
                        </div>
                      </div>
                      {method.inputs && (
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            {method.inputs.map(input => 
                            <tr key={input.name} className="flex justify-between items-baseline ">
                              <td className={`text-sm flex-grow break-all mr-2 ${pickedMethod?.id === method.id ? 'text-gray-100' : 'text-gray-500'}`}>
                                {input.name}
                              </td>
                              <td className={`ml-2 text-xs flex-shrink-0 ${pickedMethod?.id === method.id ? 'text-blue-200' : 'text-gray-400'}`}>
                                {input.type}
                              </td>
                            </tr>)}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </label>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={`${!pickedMethod && 'hidden'} mt-4 w-full bg-white sticky sm:mx-4 px-8 p-4 bottom-0`}>
          <button onClick={handleSubmit} className={`flex items-center font-karla h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 pr-3 rounded-lg font-medium text-white`}>
            <p className='mr-1.5'>Create your form</p>
            <ArrowSmRightIcon className='h-5 w-5' />
          </button>
        </div>
      </main>
    </div>
  )
}