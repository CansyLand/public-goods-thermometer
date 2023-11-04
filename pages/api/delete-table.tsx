import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    console.log('Handler started'); // Log when the handler starts
    try {
        console.log('Attempting to delete table'); // Log before attempting to delete the table
        const result = await sql`DROP TABLE IF EXISTS PublicGoods;`;
        console.log('Table deleted successfully', result); // Log the result of the table deletion
        return response.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        console.error('Error caught in handler', error); // Log any errors caught
        if (error instanceof Error) {
            return response.status(500).json({ error: error.message });
        } else {
            return response.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
}
