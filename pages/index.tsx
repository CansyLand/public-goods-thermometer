// pages/index.tsx
import Layout from '@/components/layout';
import React, { useState, useEffect } from 'react';
import { getAccount } from '@wagmi/core'
const account = getAccount()
console.log(account)

type PublicGood = {
  id: number;
  address: string;
  title: string;
  description: string;
  hot: number;
  cold: number;
};

const HomePage = () => {
  const [publicGoods, setPublicGoods] = useState<PublicGood[]>([]);

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
  }, []);

  return (
    <Layout>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-8 max-w-2xl">
          {/* <h1 className="text-4xl font-bold mb-6">🧊🥶🧊/🔥😍🔥</h1> */}
          {/* <p className="mb-4">Whats your favorite?</p> */}
          <ul>
            {publicGoods.map((good) => {
                // Calculate temperature and determine class name inside the map callback
                const temperature = calculateTemperature(good.hot, good.cold);
                const temperatureClassName = getTemperatureClassName(temperature);

                return (
                  <li key={good.id} className="flex items-center justify-between">
                    {/* Button on the left */}
                    <button className="btn btn-lg">🧊🥶🧊</button>

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
                    <button className="btn btn-lg">🔥😍🔥</button>
                  </li>
                
                );
                })}
          </ul>
        </section>
      </main>
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