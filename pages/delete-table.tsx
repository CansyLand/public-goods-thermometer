import React, { useState, useEffect } from 'react';

interface DataResult {
  // Define the structure of your result here
  result: any; // Replace 'any' with the actual type of your result
}

const DeleteTable: React.FC = () => {
  const [data, setData] = useState<DataResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Assuming your API route is '/api/create-table'
        const response = await fetch('/api/delete-table❌');
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
    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default DeleteTable;
