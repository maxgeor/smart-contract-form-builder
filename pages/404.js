import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { shortenAddress } from '../utils/helpers'
import { ArrowSmUpIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import WalletConnectButton from '../components/WalletConnectButton'
import LogInWalletConnectButton from '../components/LogInWalletConnectButton'

import { findUser, createUser } from '../lib/db'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {
 return <div>That form doesn't exist</div>
}
