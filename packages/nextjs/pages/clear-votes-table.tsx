//pages/clear-votes-table.tsx

import React, { useState } from 'react';

const ClearVotesTable = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const clearTable = async () => {
    try {
      const response = await fetch('/api/clear-votes-table', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setResponseMessage(result.message);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <button onClick={clearTable}>Clear Votes Table</button>
      {responseMessage && <div>Response: {responseMessage}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default ClearVotesTable;
