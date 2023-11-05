import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

// Gnosis
// public: 0xC626aeC9f41231e7ecbC03C48031662FeF248137
// voting contract: 0xc85918FDC5035A922DE13Eb8B888Ab2f4f781FD1
// https://gnosisscan.io/address/0xc85918fdc5035a922de13eb8b888ab2f4f781fd1


//  zkSync EVM
//  https://testnet-zkevm.polygonscan.com/address/0x5f5a90f859bb03a816e01323d3d8a92bea94cd9f




// import { ethers } from 'ethers'
// import { EthersAdapter } from '@safe-global/protocol-kit'
// import dotenv from 'dotenv'

// dotenv.config()

// // const RPC_URL='https://eth-goerli.public.blastapi.io'
// const RPC_URL='http://127.0.0.1:8545/'
// const provider = new ethers.providers.JsonRpcProvider(RPC_URL)

// const owner1Signer = new ethers.Wallet(process.env.OWNER_1_PRIVATE_KEY!, provider)

// const ethAdapterOwner1 = new EthersAdapter({
//   ethers,
//   signerOrProvider: owner1Signer
// })


// // Initialize the API Kit
// import SafeApiKit from '@safe-global/api-kit'
// const txServiceUrl = 'https://safe-transaction-goerli.safe.global'
// const safeService = new SafeApiKit({ txServiceUrl, ethAdapter: ethAdapterOwner1 })

// // Initialize the Protocol Kit
// import { SafeFactory } from '@safe-global/protocol-kit'
// const safeFactory = await SafeFactory.create({ ethAdapter: ethAdapterOwner1 })

// // Deploy a Safe
// import { SafeAccountConfig } from '@safe-global/protocol-kit'

// const safeAccountConfig: SafeAccountConfig = {
//   owners: [
//     await owner1Signer.getAddress(),
//     // await owner2Signer.getAddress(),
//     // await owner3Signer.getAddress()
//   ],
//   threshold: 1,
//   // ... (Optional params)
// }

// /* This Safe is tied to owner 1 because the factory was initialized with
// an adapter that had owner 1 as the signer. */
// const safeSdkOwner1 = await safeFactory.deploySafe({ safeAccountConfig })

// const safeAddress = await safeSdkOwner1.getAddress()

// console.log('Your Safe has been deployed:')
// console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
// console.log(`https://app.safe.global/gor:${safeAddress}`)

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/pages/index.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
