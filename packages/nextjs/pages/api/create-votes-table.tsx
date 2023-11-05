import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    console.log('Handler started'); // Log when the handler starts
    try {
        console.log('Attempting to create votes table'); // Log before attempting to create the table
        const result = await sql`
            CREATE TABLE Votes (
                id SERIAL PRIMARY KEY,
                goodsId INTEGER NOT NULL,
                address VARCHAR(42) NOT NULL,
                UNIQUE(goodsId, address)  -- This ensures that an address can only vote once per goodsId
            );
        `;
        console.log('Votes table created successfully', result); // Log the result of the table creation
        return response.status(200).json({ result });
    } catch (error) {
        console.error('Error caught in handler', error); // Log any errors caught
        if (error instanceof Error) {
            return response.status(500).json({ error: error.message });
        } else {
            return response.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}
