import React, { useState, useEffect } from 'react';

interface DataResult {
  message: string;
}

const SeedTable: React.FC = () => {
  const [data, setData] = useState<DataResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function seedData() {
      try {
        // Call the new API route '/api/seed-table'
        const response = await fetch('/api/seed-public-goods', {
          method: 'POST', // Make sure to match the HTTP method expected by the API route
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    // Call the seedData function
    seedData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data ? (
        <div>
          <p>Seed Successful:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
};

export default SeedTable;
