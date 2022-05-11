import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { shortenAddress } from '../utils/helpers'
import { useAccount } from 'wagmi'

import WalletConnectButton from './WalletConnectButton'

export default function ConnectWalletField() {
  // const { data, isError, isLoading } = useAccount()
  const [onMobile, setOnMobile] = useState(false);

  useEffect(() => window.addEventListener('resize', () => setOnMobile(window.innerWidth < 768)), []);

  return (
    <div className='p-8 w-full max-w-lg mx-auto rounded-lg'>
      <h2 className='text-2xl mb-4'>Connect your wallet</h2>
      <p className='font-lora text-gray-500 mb-6'>
        You need an Ethereum wallet to submit this form. Don&apos;t have one? Use <Link href={onMobile ? 'https://rainbow.me/' : 'https://metamask.io/'}><a target={'_blank'} className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>{onMobile ? 'Rainbow' : 'Metamask'}</a></Link>.
      </p>
      <WalletConnectButton />
      {/* {data?.address ? (
        <div className='flex items-center flex-wrap space-x-4 mb-6'>
          <div className='flex items-center space-x-2 text-blue-500'>
            <CheckCircleIcon className='flex-shrink-0 h-5 w-5' />
            <p className='font-medium font-karla'>Connected to <span className='font-semibold'>{shortenAddress(data?.address)}</span></p>
          </div>
          <button className='flex font-karla text-gray-500 text-xs hover:underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Change</button>
        </div>
      ) : (
        <div>
          <button className="font-karla flex items-center cursor-default h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 pl-4 pr-2.5 rounded-lg font-medium text-white">
            <span>Connect wallet</span>
            <ChevronDownIcon className={`transition duration-200 h-5 w-5 ml-1.5 text-blue-100`} />
          </button>
          <ConnectButton />
        </div>
      )} */}
    </div>
  )
}
