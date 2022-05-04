import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Check from '../icons/Check'
import shortenAddress from '../utils/helpers'

export default function ConnectWalletField() {
  const [account, setAccount] = useState(null)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    window.ethereum.on('accountsChanged', accountChangedHandler(account));
  }, []);

  const connectWalletHandler = async (e) => {
    if (window.ethereum) {
      const result = await window.ethereum.request({method: 'eth_requestAccounts'})
      accountChangedHandler(result[0])
    }
  }

  const accountChangedHandler = account => setAccount(account);

  return (
    <div className='p-8 w-full max-w-lg mx-auto rounded-lg'>
      <h2 className='text-2xl mb-4'>Connect your wallet</h2>
      <p className='font-lora text-gray-500'>You need an Ethereum wallet to submit this form.</p>
      <p className='font-lora text-gray-500 mb-6'>Don&apos;t have one? Use <Link href={'https://metamask.io/'} target={'_blank'}><span className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Metamask</span></Link>.</p>
      {account ? (
      <div className='mb-6 flex items-center space-x-4'>
        <div className='flex items-center space-x-2 text-blue-500'>
          <span className='flex-shrink-0'>
            <Check />
          </span>
          <p className='font-medium font-karla'>Connected to <span className='font-semibold'>{shortenAddress(account)}</span></p>
        </div>
        <Link href={'https://metamask.io/'} target={'_blank'}><span className='mt-px text-gray-500 text-xs underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Change</span></Link>
      </div>
      ) : (
       <button onClick={connectWalletHandler} className="font-karla cursor-default h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 rounded-lg font-medium text-white">Connect wallet</button> 
      )}
    </div>
  )
}
