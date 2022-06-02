import { ConnectButton } from '@rainbow-me/rainbowkit';
import { shortenAddress } from '../utils/helpers';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Router from 'next/router';

export default function LogInWalletConnectButton({ label, classes, connectedEl, isDropdown, isWhite }) {
  const redirect = () => {
    Router.push('/new');
  }

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
                  <button onClick={openConnectModal} type="button" className={ classes }>
                    { label }
                  </button>
                );
              }
              if (isDropdown) {
                return (
                  <div className={`${isWhite ? 'bg-white hover:shadow-md hover:bg-gray-100' : 'bg-gray-100 hover:bg-gray-200'} transition duration-200 py-2 pl-4 pr-3 rounded-full flex items-center space-x-1.5`}>
                    <p className={`${isWhite ? 'text-blue-500' : 'text-gray-600'} text-sm font-medium rounded-full`}>{shortenAddress(account.address)}</p>
                    <ChevronDownIcon className={`${isWhite ? 'text-blue-500' : 'text-gray-500'} h-5 w-5`} />
                  </div>
                )
              }
              if (connectedEl) {
                return connectedEl;
              }
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};