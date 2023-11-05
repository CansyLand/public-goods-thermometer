import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the address from the query string
  const { address } = req.query;

  // Check if the address is provided and is a string
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Address is required and must be a string.' });
  }

  try {
    // Query the database for votes by the address
    const votes = await sql`
      SELECT * FROM Votes WHERE address = ${address};
    `;

    // Return the votes in the response
    return res.status(200).json({ votes });
  } catch (error) {
    console.error('Error fetching user votes:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
