'use client'

import { Button } from "@/components/ui/button";
import { client } from "../app/client";
import '../../public/css/style.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import { ConnectButton, MediaRenderer, useReadContract, TransactionButton, useActiveAccount } from "thirdweb/react";
import { getContract, toEther } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { claimTo, getActiveClaimCondition, getTotalClaimedSupply, nextTokenIdToMint } from "thirdweb/extensions/erc721";
import React from 'react';
import { Sparkles, Zap, Shield, Rocket } from 'lucide-react'




export default function NftClaimPage() {
  const scrollToNFTList = () => {
    const element = document.getElementById('nft-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("Element with ID 'nft-list' not found");
    }
  };
  
  

  const account = useActiveAccount();
  const contract = getContract({
    client: client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS as string,
    
  });

  
  
  



  const{ data: contractMetadata, isLoading: isContractMetadataLoading} = useReadContract(
    getContractMetadata,
    {
      contract: contract
    }
  );
  console.log(contractMetadata);

  const{ data: claimedSupply} = useReadContract(
    getTotalClaimedSupply,
    {
      contract: contract
    }
  );
  console.log(claimedSupply);

  const{ data: totalNftSupply} = useReadContract(
    nextTokenIdToMint,
    {
      contract: contract
    }
  );
  console.log(totalNftSupply);

  const{ data: claimCondition} = useReadContract(
    getActiveClaimCondition,
    {
      contract: contract
    }
  );
  console.log(claimCondition);

  // const { data: nft, isLoading: isNFTLoading, error: nftError } = useNFT(contract, 0);
  // console.log(nft)
  // console.log(isNFTLoading)
  // console.log(nftError)
  // console.log(contract)

 

  const getPrice = (quantity: number) => {
    const total = quantity * parseInt(claimCondition?.pricePerToken.toString() || "0")
    return toEther(BigInt(total));
  }
  console.log(getPrice)
  


  
  if (contractMetadata) {
    console.log(contractMetadata.name); // Akan mencetak 'name' jika contractMetadata tersedia
    console.log(contractMetadata.symbol); // Akan mencetak 'symbol' jika contractMetadata tersedia
  } else {
    console.log("Contract metadata is not yet available.");
  }
  

  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi
      once: true, // Hanya satu kali saat scroll
    });
  }, []);
  // const [isWalletConnected, setIsWalletConnected] = useState(false)

  // const handleConnectWallet = () => {
  //   // Implement wallet connection logic here
  //   setIsWalletConnected(true)
  // }
  

  // You can also pass an optional settings object
  // below listed default settings
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMjIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-10"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center py-4 px-6 lg:px-12">
        <div className="text-2xl font-bold">Barong<span className="text-blue-500"> Legends</span></div>
        <ul className="hidden md:flex space-x-8">
          {['Home', 'Features', 'Roadmap', 'Token', 'Team'].map((item) => (
            <li
              key={item}
              className={`hover:text-blue-400 transition-colors ${['Features', 'Roadmap', 'Token', 'Team'].includes(item) ? 'pointer-events-none text-gray-500' : ''}`}
              >
                <a href="#">{item}</a>
            </li>
          ))}
        </ul>

        {/* <Button
          onClick={handleConnectWallet}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
        >
          {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </Button> */}
        <ConnectButton client={client}/>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between mt-12 py-12 px-6 lg:px-12 max-w-7xl mx-auto ">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-3xl lg:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-[typing_3.5s_steps(40,end),blink-caret_0.75s_step-end_infinite] border-r-10">
          <span className="bg-gradient-text">
            {/* {contractMetadata?.name} */}
            Own a Piece of the Digital Frontier
          </span>
          
          </h1>
          <p className="text-xl text-gray-300">
          Embrace the power of Barong and join an exclusive community with our mystical, limited-edition NFT collection
          </p>
          <Button  onClick={scrollToNFTList} className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
            Claim Your NFT
          </Button>
          
          
          
        </div>
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="relative w-64 h-64 lg:w-96 lg:h-96 mx-auto animate-[float_2s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
            <img
              src="img/barong.jpeg"
              alt="Futuristic NFT"
              className="relative z-1 rounded-full"
            />
          </div>
        </div>
      </section>
      
      {/* NFT Info Section */}
      <section className="relative z-10 py-12 px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <h2  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-3xl font-bold mb-6">About the Collection</h2>
        <p  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-gray-300 mb-8">
        Our NFT collection embodies the fusion of tradition and innovation. Each piece is a unique digital masterpiece, crafted by renowned digital artist Alex Vertex. Owning one of these NFTs unlocks access to exclusive events, early feature releases, and a voice in shaping our decentralized community.
        </p>
        <div  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="flex justify-center items-center space-x-4">
          <img
            src="img/profile.jpeg?height=64&width=64"
            alt="Artist Avatar"
            className="w-16 h-16 rounded-full"
          />
          <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
            <p className="font-bold">Mr ChnMan</p>
            <p className="text-gray-400">Digital Artist & Futurist</p>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-12 px-6 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Holder Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, title: 'Exclusive Access', description: 'Get VIP entry to virtual and real-world events' },
            { icon: Zap, title: 'Voting Rights', description: 'Shape the future of our ecosystem with governance tokens' },
            { icon: Shield, title: 'Secure Ownership', description: 'Your NFT is protected by blockchain technology' },
            { icon: Rocket, title: 'Future Airdrops', description: 'Be eligible for future token and NFT airdrops' },
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition-all duration-200 hover:scale-105 hover:bg-opacity-70">
              <feature.icon className="w-12 h-12 mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
  {/* NFT List Section */}
  <section id="nft-list" className="relative z-10 py-12 px-6 lg:px-12 max-w-6xl mx-auto">
  <h2 data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" className="text-3xl font-bold mb-6 text-center text-white">
    Get Your Exclusive NFT
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
    
    {/* Card 1 - Active */}
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition-all duration-200 hover:scale-105 hover:bg-opacity-70 shadow-lg hover:shadow-2xl">
      <img 
        src="img/random.jpg" 
        alt="Barong NFT" 
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
      />
      <MediaRenderer
        client={client}
        // src={ContractMetadata?.image}
      />
      <h3 className="text-xl font-bold mb-2 text-white">Random Barong</h3>
      <p className="text-gray-400 mb-4 text-sm">Claim your free Random Barong NFT and join the exclusive community!</p>
      <TransactionButton 
        transaction={() => claimTo({
          contract: contract,
          to: account?.address as string,
          quantity: BigInt(1),
        })}
        onTransactionConfirmed={async () => alert("Transaction Confirmed")}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full text-center transition-all duration-200 transform hover:scale-105"
      >
        Claim 1 NFT
      </TransactionButton>
    </div>

    {/* Card 2 - Coming Soon */}
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition-all duration-200 hover:scale-105 hover:bg-opacity-70 shadow-lg hover:shadow-2xl">
      <img 
        src="img/barong5.jpeg" 
        alt="Eternal Flame NFT" 
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
      />
      <h3 className="text-xl font-bold mb-2 text-white">Eternal Flame</h3>
      <p className="text-gray-400 mb-4 text-sm">A symbol of everlasting power and resilience. Stay tuned for this limited drop!</p>
      <button 
        className="bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded text-center cursor-not-allowed opacity-60"
        disabled
      >
        Coming Soon
      </button>
    </div>

    {/* Card 3 - Coming Soon */}
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition-all duration-200 hover:scale-105 hover:bg-opacity-70 shadow-lg hover:shadow-2xl">
      <img 
        src="img/barong6.jpeg" 
        alt="Protector Realm NFT" 
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
      />
      <h3 className="text-xl font-bold mb-2 text-white">Protector Realm</h3>
      <p className="text-gray-400 mb-4 text-sm">Defend your legacy with this exclusive NFT. Launching soon—stay connected!</p>
      <button 
        className="bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded text-center cursor-not-allowed opacity-60"
        disabled
      >
        Coming Soon
      </button>
    </div>

    {/* Card 4 - Coming Soon */}
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="bg-gray-800 bg-opacity-50 rounded-lg p-6 transform transition-all duration-200 hover:scale-105 hover:bg-opacity-70 shadow-lg hover:shadow-2xl">
      <img 
        src="img/barong7.jpeg" 
        alt="Sacred Spirit NFT" 
        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
      />
      <h3 className="text-xl font-bold mb-2 text-white">Sacred Spirit</h3>
      <p className="text-gray-400 mb-4 text-sm">Harness the sacred energy of this one-of-a-kind NFT. Launching soon!</p>
      <button 
        className="bg-gray-500 text-gray-200 font-bold py-2 px-4 rounded text-center cursor-not-allowed opacity-60"
        disabled
      >
        Coming Soon
      </button>
    </div>
  </div>
</section>



    

<section className="relative z-10 py-12 px-6 lg:px-12 max-w-6xl mx-auto">
  <h2 data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" className="text-3xl font-bold mb-6 text-center">
    Frequently Asked Questions
  </h2>
  <div className="space-y-6">
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">What is an NFT?</h4>
      <p className="text-gray-400">
        An NFT is a non-fungible token, a unique digital asset that is verified using blockchain technology. Each NFT is one-of-a-kind.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">How do I claim my NFT?</h4>
      <p className="text-gray-400">
        Simply connect your wallet and click on the Claim Your NFT button to receive your limited-edition NFT.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">What are the benefits of owning a Barong NFT?</h4>
      <p className="text-gray-400">
        Owning a Barong NFT gives you access to exclusive events, voting rights, secure ownership, and future airdrops.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">Do I need to pay to claim an NFT?</h4>
      <p className="text-gray-400">
        Some NFTs are free to claim, but others may require a small gas fee for the transaction. Check the details on the claim page.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">What wallets are supported?</h4>
      <p className="text-gray-400">
        We support wallets like MetaMask and WalletConnect. Make sure your wallet is configured for the Sepolia network.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">Can I sell my NFT?</h4>
      <p className="text-gray-400">
        Yes, you can trade your NFT on supported marketplaces like OpenSea or others that recognize the Sepolia network.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">What is the Sepolia network?</h4>
      <p className="text-gray-400">
        Sepolia is a testnet for Ethereum, used for testing smart contracts and transactions before deploying on the mainnet.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">Is there a claiming limit?</h4>
      <p className="text-gray-400">
        Yes, each user can claim a limited number of NFTs to ensure fair distribution. Refer to the specific rules for each collection.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">What should I do if my transaction fails?</h4>
      <p className="text-gray-400">
        Ensure you have sufficient gas fees in your wallet and try again. If the problem persists, contact our support team.
      </p>
    </div>
    <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="false" className="text-left">
      <h4 className="font-bold">Where can I find more information?</h4>
      <p className="text-gray-400">
        For additional details, visit our official social media channels or contact us through the provided email address.
      </p>
    </div>
  </div>
</section>
<footer className=" text-white py-8">
  <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center">
    {/* Logo & Description */}
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6 lg:mb-0">
      <div className="text-2xl font-bold">
        Barong<span className="text-blue-500"> Legends</span>
      </div>
      <p className="text-gray-400 mt-2">Join the frontier of digital art and blockchain innovation.</p>
    </div>

    {/* Links */}
    

    {/* Social Media Links */}
    <div className="flex space-x-6 mt-6 lg:mt-0">
      <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
        <i className="fab fa-discord"></i>
      </a>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="border-t border-gray-700 mt-8 pt-4 text-center">
    <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Barong Legends. All rights reserved.</p>
  </div>
</footer>



      
    </div>
  )
}