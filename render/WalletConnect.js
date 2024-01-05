import { createWeb3Modal, defaultConfig, } from '@web3modal/ethers5'
import { ethers } from 'ethers'

// @ts-expect-error 1. Get projectId
const projectId = import.meta.env.VITE_PROJECT_ID
if (!projectId) {
  throw new Error('VITE_PROJECT_ID is not set')
}

// 2. Create wagmiConfig
const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  },
  {
    chainId: 5,
    name: 'Goerli',
    currency: 'ETH',
    explorerUrl: 'https://goerli.etherscan.io',
    rpcUrl: 'https://rpc.ankr.com/eth_goerli'
  },
  {
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygonscan.com/',
    rpcUrl: 'https://polygon.llamarpc.com'
  }
]

const ethersConfig = defaultConfig({
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 1,
  rpcUrl: 'https://cloudflare-eth.com'
})


// 3. Create modal
export const modal = createWeb3Modal({
  ethersConfig,
  projectId,
  chains,
  themeMode: 'light',
})



export async function getWalletState () {
  modal.open()
  const isConnected = modal.getIsConnected()
  const walletProvider = modal.getWalletProvider()
  if (!walletProvider) {
    throw new Error('No wallet provider')
  }


  // 获取钱包地址
  const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
  const signer = await ethersProvider.getSigner()
  const address = await signer.getAddress()
  const USDTAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
  const USDTAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ]
  const USDTContract = new ethers.Contract(USDTAddress, USDTAbi, signer)
  const USDTBalance = await USDTContract.balanceOf(address)


  // // @ts-ignore
  // modal.subscribeProvider(handleChange)

  //获取钱包余额
  console.log(ethers.utils.formatUnits(USDTBalance, 18))

  return { isConnected, address, signer }
}

// function handleChange ({ provider, providerType, address, chainId, isConnected }) {
//   if (provider) {
//     console.log('Connected address:', address)
//   }
//   if (!isConnected || !provider) {
//     console.log('disconnect')
//   }
// }

