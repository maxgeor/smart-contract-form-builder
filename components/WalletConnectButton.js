import { useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CheckCircleIcon } from '@heroicons/react/solid';

export default function WalletConnectButton() {
  const { disconnect } = useDisconnect();
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <button onClick={openConnectModal} type="button" className="font-karla flex items-center h-min tracking-tight bg-blue-500 transition duration-200 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 hover:text-blue-50 py-2 px-4 rounded-lg font-medium text-white">
                    Connect wallet
                  </button>
                );
              }

              return (
                <div className='flex items-center flex-wrap space-x-4'>
                  <div className='flex items-center space-x-2 text-blue-500'>
                    <span className='self-start flex items-center justify-center flex-shrink-0 h-6 w-6 -ml-1'>
                      <CheckCircleIcon className='flex-shrink-0 h-5 w-5' />
                    </span>
                    <div className='flex items-center flex-wrap'>
                      <p className='font-medium font-karla mr-4'>
                        Connected to 
                        <span className='font-extrabold ml-1'>
                          {account.displayName}
                        </span>
                      </p>
                      <button onClick={disconnect} type="button" className='flex font-karla text-gray-500 text-xs hover:underline decoration-1 underline-offset-4 decoration-gray-300 hover:decoration-gray-500 cursor-pointer transition duration-200'>
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};