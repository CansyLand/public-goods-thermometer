import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    console.log('Query parameters received:', request.body);

    const { goodsId, address, voteType } = request.body;

    // Validate the required parameters
    if (!goodsId || !address || !voteType) {
      return response.status(400).json({ message: 'Goods ID, address, and vote type are required' });
    }

    // Check if the user has already voted on the given proposal
    const existingVote = await sql`
      SELECT * FROM Votes WHERE goodsId = ${goodsId} AND address = ${address};
    `;

    if (existingVote.rowCount > 0) {
      return response.status(409).json({ message: 'You have already voted on this proposal' });
    }

    // Insert the vote into the Votes table
    await sql`
      INSERT INTO Votes (goodsId, address)
      VALUES (${goodsId}, ${address});
    `;

    // Update the PublicGoods table to increment the hot or cold counter based on the vote
    if (voteType === 'hot') {
      await sql`
        UPDATE PublicGoods SET hot = hot + 1 WHERE id = ${goodsId};
      `;
    } else if (voteType === 'cold') {
      await sql`
        UPDATE PublicGoods SET cold = cold + 1 WHERE id = ${goodsId};
      `;
    } else {
      return response.status(400).json({ message: 'Invalid vote type' });
    }

    // Optionally, retrieve the updated entry from the PublicGoods table
    const updatedPublicGood = await sql`
      SELECT * FROM PublicGoods WHERE id = ${goodsId};
    `;
    return response.status(200).json({ updatedPublicGood });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return response.status(500).json({ error: errorMessage });
  }
}
