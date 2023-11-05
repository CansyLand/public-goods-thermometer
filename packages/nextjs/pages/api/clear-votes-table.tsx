// pages/api/clear-votes-table.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    // You might want to add authentication here to ensure that not just anyone can clear the table
    if (request.method === 'POST') { // Ensure that the request is a POST request
        try {
            console.log('Attempting to clear votes table');
            await sql`TRUNCATE TABLE Votes`; // This will remove all rows from Votes table
            console.log('Votes table cleared successfully');
            return response.status(200).json({ message: 'Votes table cleared successfully' });
        } catch (error) {
            console.error('Error caught in handler', error);
            if (error instanceof Error) {
                return response.status(500).json({ error: error.message });
            } else {
                return response.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    } else {
        // If the request is not a POST request, return a 405 Method Not Allowed error
        return response.status(405).json({ error: 'Method not allowed' });
    }
}
