import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    console.log('Query parameters received:', request.body);

    const { address, title, description, votes } = request.body;

    // Validate the required parameters
    if (!address || !title || !description) {
      throw new Error('Address, title, and description are required');
    }

    // Insert data into the PublicGoods table
    await sql`
      INSERT INTO PublicGoods (address, title, description, votes)
      VALUES (${address}, ${title}, ${description}, ${votes});
      
    `;

    // Optionally, retrieve all entries from the PublicGoods table
    const publicGoods = await sql`SELECT * FROM PublicGoods;`;
    return response.status(200).json({ publicGoods });
  } catch (error) {
    console.error(error);
    // If the error is an instance of Error, send its message; otherwise, send a generic error message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return response.status(500).json({ error: errorMessage });
  }
}
