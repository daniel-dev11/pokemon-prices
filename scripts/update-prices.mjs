// scripts/update-prices.mjs

const API_BASE = 'https://pokemon-prices.vercel.app';

const PRODUCTS = [
  {
    productId: 'prod-fiamme-etb',
    shopId: 'shop-amazon',
    prezzoBase: 69.9,
    prezzoFidelity: 59.9,
    urlProdotto: 'https://www.amazon.it/dp/XXXXXXXX', // metti URL reale
  },
  {
    productId: 'prod-fiamme-box',
    shopId: 'shop-amazon',
    prezzoBase: 39.9,
    prezzoFidelity: null,
    urlProdotto: 'https://www.amazon.it/dp/YYYYYYYY', // metti URL reale
  },
];

async function upsertPrice(entry) {
  const now = new Date().toISOString();

  const body = {
    price: {
      id: '', // lascialo vuoto, l'API genera/normalizza
      productId: entry.productId,
      shopId: entry.shopId,
      prezzoBase: entry.prezzoBase,
      prezzoFidelity: entry.prezzoFidelity,
      scontoPercentuale: 0,
      labelFidelity: entry.prezzoFidelity ? 'Offerta' : null,
      dataInizioPromo: null,
      dataFinePromo: null,
      disponibilita: 'online',
      urlProdotto: entry.urlProdotto,
      ultimoAggiornamento: now,
    },
  };

  const res = await fetch(`${API_BASE}/api/prices-upsert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Errore ${res.status}: ${text}`);
  }

  const json = await res.json();
  console.log('Aggiornato:', json.price.productId, json.price.shopId, json.price.prezzoBase);
}

async function main() {
  for (const p of PRODUCTS) {
    try {
      await upsertPrice(p);
    } catch (err) {
      console.error('Errore su', p.productId, p.shopId, err.message);
    }
  }
}

main().catch((e) => {
  console.error('Errore generale:', e);
  process.exit(1);
});
