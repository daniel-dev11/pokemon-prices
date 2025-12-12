// api/prices-upsert.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Price } from '../src/types/price';
import { prices } from './_pricesStore';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body as { price: Price };

    if (!body || !body.price) {
      return res.status(400).json({ error: 'Missing price in body' });
    }

    const incoming = body.price;

    const id = incoming.id || `${incoming.productId}-${incoming.shopId}`;
    const now = new Date().toISOString();

    const normalized: Price = {
      ...incoming,
      id,
      ultimoAggiornamento: now,
    };

    const index = prices.findIndex(
      (p) =>
        p.productId === normalized.productId &&
        p.shopId === normalized.shopId
    );

    if (index >= 0) {
      prices[index] = normalized;
    } else {
      prices.push(normalized);
    }

    return res.status(200).json({ price: normalized });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
