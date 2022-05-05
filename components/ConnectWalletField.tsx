import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import  { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid'
import shortenAddress from '../utils/helpers'
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';
import ConnectWalletModal from './ConnectWalletModal'

export default function ConnectWalletField({
  showingWalletModal,
  setShowingWalletModal,
}) {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  // const [account, setAccount] = useState(null)
  // const [errors, setErrors] = useState(null)

  // useEffect(() => {
  //   window.ethereum.on('accountsChanged', accountChangedHandler(account));
  // }, []);

  // const connectWalletHandler = async (e) => {
  //   if (window.ethereum) {
  //     const result = await window.ethereum.request({method: 'eth_requestAccounts'})
  //     accountChangedHandler(result[0])
  //   }
  // }

  // const accountChangedHandler = account => setAccount(account);

  const toggleWalletModal = () => setShowingWalletModal(!showingWalletModal);

  return (
    <div className='p-8 w-full max-w-lg mx-auto rounded-lg'>
      <h2 className='text-2xl mb-4'>Connect your wallet</h2>
      <p className='font-lora text-gray-500'>You need an Ethereum wallet to submit this form.</p>
      <p className='font-lora text-gray-500 mb-6'>Don&apos;t have one? Use <Link href={'https://metamask.io/'}><a target={'_blank'} className='underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Metamask</a></Link>.</p>
      {address ? (
      <div className='mb-6 flex items-center space-x-4'>
        <div className='flex items-center space-x-2 text-blue-500'>
          <span className='flex-shrink-0'>
            <CheckCircleIcon className='h-5 w-5' />
          </span>
          <p className='font-medium font-karla'>Connected to <span className='font-semibold'>{shortenAddress(address)}</span></p>
        </div>
        <button className='flex font-karla text-gray-500 text-xs cursor-pointer'>
        <button onClick={toggleWalletModal} className='hover:underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>Change</button></button>
      </div>
      ) : (
      <button onClick={toggleWalletModal} className="font-karla flex items-center cursor-default h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 pl-4 pr-2.5 rounded-lg font-medium text-white">
        <span>Connect wallet</span>
        <ChevronDownIcon className={`transform ${!showingWalletModal && '-rotate-90'} transition duration-200 ease-out h-5 w-5 ml-1.5 text-blue-100`} />
      </button>
      )}
      <ConnectWalletModal 
        classes={`${!showingWalletModal && 'hidden'} w-[calc(100% - 16rem)] translate flex flex-col items-start absolute z-10 bg-white rounded-lg  shadow-md left-8 top-52 overflow-auto`}
        connectWithMetamask={connectWithMetamask}
        connectWithWalletConnect={connectWithWalletConnect}
        connectWithCoinbaseWallet={connectWithCoinbaseWallet}
      />
    </div>
  )
}
