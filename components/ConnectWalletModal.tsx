import React from 'react'
import Image from 'next/image'

export default function ConnectWalletModal({
  classes,
  connectWithMetamask,
  connectWithWalletConnect,
  connectWithCoinbaseWallet,
}) {
  return (
    <div className={classes}>
      <button onClick={() => connectWithMetamask()} className='flex items-center space-x-4 hover:bg-blue-500 hover:text-white px-6 py-4 w-full'>
        <Image src='/metamask.svg' alt={'metamask logo'} height={24} width={24} />
        <span>Metamask</span>
      </button>
      <button onClick={() => connectWithCoinbaseWallet()} className='flex items-center space-x-4 hover:bg-blue-500 hover:text-white px-6 py-4 w-full'>
        Coinbase Wallet
      </button>
      <button onClick={() => connectWithWalletConnect()} className='flex items-center space-x-4  hover:bg-blue-500 hover:text-white px-6 py-4 w-full'>
        WalletConnect
      </button>
      <div className='text-xs p-6 py-3 bg-gray-100 text-gray-500'>
        Use WalletConnect for mobile wallets
      </div>
    </div>
  )
}
