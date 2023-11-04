// pages/api/seed-public-goods.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    // Only allow POST requests for this endpoint
    response.setHeader('Allow', ['POST']);
    response.status(405).end(`Method ${request.method} Not Allowed`);
    return;
  }

  try {
    // Create dummy data
    const dummyData = [
      {
        address: '0x0000000000000000000000000000000000000001',
        hot: 10,
        cold: 5,
        title: 'Dummy Public Good 1',
        description: 'Description for dummy public good 1',
      },
      {
        address: '0x0000000000000000000000000000000000000002',
        hot: 20,
        cold: 10,
        title: 'Dummy Public Good 2',
        description: 'Description for dummy public good 2',
      },
      // Add more dummy entries as needed
    ];

    // Insert dummy data into the PublicGoods table
    for (const data of dummyData) {
      await sql`
        INSERT INTO PublicGoods (address, hot, cold, title, description)
        VALUES (${data.address}, ${data.hot}, ${data.cold}, ${data.title}, ${data.description});
      `;
    }

    response.status(200).json({ message: 'Dummy data inserted successfully' });
  } catch (error) {
    console.error('Error caught in handler', error);
    if (error instanceof Error) {
      response.status(500).json({ error: error.message });
    } else {
      response.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
