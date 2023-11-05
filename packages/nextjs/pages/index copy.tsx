// pages/index.tsx
import Layout from '@/components/layout';
import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import VoteAnimation from '../components/VoteAnimation';
import { getAccount } from '@wagmi/core';
import EmojiParticles from '@/components/EmojiParticles';
const account = getAccount()
console.log(account)

interface VotedItems {
  [key: number]: boolean;
}

type PublicGood = {
  id: number;
  address: string;
  title: string;
  description: string;
  hot: number;
  cold: number;
};

type ShowAnimationState = {
  show: boolean;
  type: 'hot' | 'cold';
};

type Vote = {
  id: number;
  goodsid: number;
  address: string;
};

type VotedItemsMap = {
  [goodsid: number]: boolean;
};

const HomePage = () => {
  const [publicGoods, setPublicGoods] = useState<PublicGood[]>([]);
  const [votedItems, setVotedItems] = useState<VotedItems>({});
  const [showAnimation, setShowAnimation] = useState<ShowAnimationState>({ show: false, type: 'hot' });
  const [showParticles, setShowParticles] = useState(false);
  const [voteType, setVoteType] = useState('cold'); // Default to 'cold'

  // Use the hook to get the open and close functions
  const { open, close } = useWeb3Modal();

  const hasVoted = (id: number) => {
    return votedItems[id];
  };

  useEffect(() => {
    const fetchPublicGoods = async () => {
      try {
        const response = await fetch('/api/public-goods');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setPublicGoods(data);
      } catch (error) {
        console.error('Failed to fetch public goods:', error);
      }
    };

    fetchPublicGoods();

    const fetchUserVotes = async (address: string) => {
      try {
        const response = await fetch(`/api/get-users-votes?address=${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user votes');
        }
        const result = await response.json();
        const votes = result.votes.rows; // Adjusted to target the rows array
    
        console.log(votes);
    
        const votedItemsMap = votes.reduce((acc: VotedItemsMap, vote: Vote) => {
          acc[vote.goodsid] = true; // Make sure to use the correct property name (goodsid)
          return acc;
        }, {});
    
        setVotedItems(votedItemsMap);
      } catch (error) {
        console.error('Failed to fetch user votes:', error);
      }
    };

    if (account && account.address) {
      fetchUserVotes(account.address);
    }
  }, [account]);

  const handleOpenModal = async () => {
    try {
      await open(); // This will open the Web3Modal for connecting a wallet
      // Handle the wallet connection logic here
    } catch (error) {
      console.error('Error opening Web3Modal', error);
    }
  };

  const handleVoteClick = async (goodsId: number, voteType: string) => {
    const account = getAccount()
    // Perform your checks here
    if (account.isConnected) {
      // If checks pass, make the API call
      try {
        const response = await fetch('/api/vote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            goodsId: goodsId,
            voteType: voteType,
            address: account.address
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Handle successful vote
          console.log('Vote successful', data);
          setVotedItems((prevVotedItems) => ({
            ...prevVotedItems,
            [goodsId]: true,
          }));

          // Update the publicGoods state with the new vote counts
          setPublicGoods((prevGoods) =>
          prevGoods.map((good) => {
            if (good.id === goodsId) {
              return {
                ...good,
                hot: voteType === 'hot' ? good.hot + 1 : good.hot,
                cold: voteType === 'cold' ? good.cold + 1 : good.cold,
              };
            }
            return good;
          })
        );

        // Trigger the animation
        const animationType = voteType == 'hot' ? 'hot' : 'cold';
        setShowAnimation({ type: animationType, show: true });
        // Hide the animation after some time
        setTimeout(() => setShowAnimation({ type: animationType, show: false }), 2000);


        setVoteType(voteType); // Set the type of particles
        setShowParticles(true); // Show the particles
        setTimeout(() => setShowParticles(false ), 2000);

        } else {
          // Handle different types of errors
          if (response.status === 409) {
            // User has already voted, show a modal with the message
            console.log(data.message);
            
            const modal = document.getElementById('you_voted_modal');
            if (modal instanceof HTMLDialogElement) {
              modal.showModal();
            }
          
          } else {
            // Other types of errors
            console.error(data.message);
          }
        }

      } catch (error) {
        console.error('Failed to vote:', error);
        // Handle error
      }
    } else {
      // Handle the case if wallet is not connected
      // open modal
      handleOpenModal()
    }
  };

  return (
    <Layout>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 max-w-2xl">
          {/* <h1 className="text-4xl font-bold mb-6">🧊🥶🧊/🔥😍🔥</h1> */}
          {/* <p className="mb-4">Whats your favorite?</p> */}
          <ul>
            {publicGoods.map((good) => {
                const isVoted = hasVoted(good.id);
                // Calculate temperature and determine class name inside the map callback
                const temperature = calculateTemperature(good.hot, good.cold);
                const temperatureClassName = getTemperatureClassName(temperature);

                return (
                  <li key={good.id} className="flex items-center justify-between">
                    {/* Move this later into its own component */}
                    {/* Button on the left */}
                    <button
                      className={`btn btn-lg ${isVoted ? 'bg-transparent' : ''}`}
                      onClick={() => handleVoteClick(good.id, 'cold')}
                      disabled={isVoted}
                    >
                      🧊🥶🧊
                    </button>

                    {/* Details in the center */}
                    <details className="collapse bg-base-200 flex-grow mx-2">
                      <summary className="collapse-title text-xl font-medium">
                        <p>{good.title}</p>
                        <progress className={`progress ${temperatureClassName} w-full`} value={temperature} max="100"></progress>
                      </summary>
                      <div className="collapse-content"> 
                        <p>{good.description}</p>
                        <p>creator: {good.address}</p>
                      </div>
                    </details>

                    {/* Button on the right */}
                    <button
                      className={`btn btn-lg ${isVoted ? 'bg-transparent' : ''}`}
                      onClick={() => handleVoteClick(good.id, 'hot')}
                      disabled={isVoted}
                    >
                      🔥😍🔥
                    </button>
                  </li>
                
                );
                })}
          </ul>
        </section>
        <dialog id="you_voted_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">You already voted on this one!</h3>
            <p className="py-4"></p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
      {showParticles && <EmojiParticles voteType={voteType == 'hot' ? 'hot' : 'cold'} />}
    </Layout>
  );
};

export default HomePage;


function calculateTemperature(hotVotes: number, coldVotes: number) {
    const totalVotes = hotVotes + coldVotes;
    if (totalVotes === 0) {
      return 0; // If there are no votes, the hotness score is 0 by default
    }
    const hotnessScore = (hotVotes / totalVotes) * 100;
    return Math.round(hotnessScore); // Round to the nearest whole number
  }


function getTemperatureClassName(temperature: number): string {
    if (temperature < 35) {
      return "progress-info"; // Cold
    } else if (temperature >= 35 && temperature < 70) {
      return "progress-warning"; // Warm
    } else {
      return "progress-error"; // Hot
    }
  }