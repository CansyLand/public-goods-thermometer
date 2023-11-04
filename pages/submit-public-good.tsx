import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Confetti from 'react-confetti';
import { getAccount } from '@wagmi/core'
import { useAccount } from 'wagmi';
const account = getAccount()
console.log(account)

function NewPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [runConfetti, setRunConfetti] = useState(false);
    const [isUserConnected, setIsUserConnected] = useState(false);

    useAccount({
        onConnect: (data) => {
            console.log('Account connected!', data);
            setIsUserConnected(true);
        },
        onDisconnect: () => {
            console.log('Account disconnected!');
            setIsUserConnected(false);
        },
    });

    useEffect(() => {
        if (submitted) {
            setRunConfetti(true);
            const timer = setTimeout(() => {
                setRunConfetti(false);
            }, 2000); // Stop confetti after 2 seconds

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [submitted]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(''); // Reset any previous errors
        const testAddress = '0x0000000000000000000000000000000000000000';

        try {
            const response = await fetch('/api/create-public-good', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address: testAddress,
                    title,
                    description,
                    votes: 0,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Public good created:', data);
            setSubmitted(true);
        } catch (error) {
            setError('Failed to submit. Please try again later.');
            console.error('Error creating public good:', error);
        }
    };

    return (
        <Layout>
            <main className="flex-grow">
                <section className="container mx-auto px-4 py-8 max-w-lg">
                    <h1 className="text-4xl font-bold mb-6">Your Public Goods Wish</h1>
                    <p className="mb-4">Do you have an idea or a problem that would benefit everyone if it were solved?</p>
                    {isUserConnected ? (
                        submitted ? (
                            <>
                                <Confetti />
                                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
                                    <span className="font-medium">Success!</span> Your public good has been submitted.
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="input input-bordered w-full"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="textarea textarea-bordered h-40"
                                    placeholder="Explain in detail what you are wishing for or where you see a problem that needs a fix"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        )
                    ) : (
                        <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800" role="alert">
                            <span className="font-medium"></span> Connect your wallet to submit a public good.
                        </div>
                    )}
                    {error && (
                        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <span className="font-medium">Error!</span> {error}
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
    
}

export default NewPost;
