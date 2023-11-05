// pages/submit-public-good.tsx

import React, { useState } from 'react';

const SubmitPublicGoodPage = () => {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [votes, setVotes] = useState(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submit action

    try {
      const response = await fetch('/api/create-public-good', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          title,
          description,
          votes,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Public good created:', data);
      // Handle success, maybe clear the form or show a success message
    } catch (error) {
      console.error('Error creating public good:', error);
      // Handle errors, maybe show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ethereum Address"
        required
      />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        type="number"
        value={votes}
        onChange={(e) => setVotes(Number(e.target.value))}
        placeholder="Votes"
        required
      />
      <button type="submit">Submit Public Good</button>
    </form>
  );
};

export default SubmitPublicGoodPage;
