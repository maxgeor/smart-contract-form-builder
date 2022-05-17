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
    </div>
  )
}
