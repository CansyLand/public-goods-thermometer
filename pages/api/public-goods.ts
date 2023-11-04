// pages/api/public-goods.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { rows } = await sql`SELECT * FROM PublicGoods LIMIT 100;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Failed to fetch public goods' });
  }
}
