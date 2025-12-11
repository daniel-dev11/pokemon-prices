import type { Expansion, Product, Shop, Price } from '@/types';

// 1) Espansioni
export const expansions: Expansion[] = [
  {
    id: 'exp-fiamme-spettrali',
    name: 'Megaevoluzione – Fiamme Spettrali',
    code: 'PHF',
    releaseDate: '2025-11-14',
  },
  {
    id: 'exp-megaevoluzione',
    name: 'Megaevoluzione',
    code: 'ME',
    releaseDate: '2025-09-26',
  },
  {
    id: 'exp-luce-nera',
    name: 'Scarlatto e Violetto – Luce Nera',
    code: 'SVLN',
    releaseDate: '2025-07-18',
  },
  {
    id: 'exp-fuoco-bianco',
    name: 'Scarlatto e Violetto – Fuoco Bianco',
    code: 'SVFB',
    releaseDate: '2025-07-18',
  },
];

// 2) Prodotti (QUI incolla il tuo array products completo)
export const products: Product[] = [
  // Megaevoluzione – Fiamme Spettrali
  {
    id: 'prod-fiamme-etb',
    name: 'Set Allenatore Fuoriclasse Megaevoluzione – Fiamme Spettrali',
    expansionId: 'exp-fiamme-spettrali',
    productType: 'etb',
    imageUrl: '/images/products/etb-fiamme-spettrali.png',
  },
  {
    id: 'prod-fiamme-box',
    name: 'Display Box 36 Buste Megaevoluzione – Fiamme Spettrali',
    expansionId: 'exp-fiamme-spettrali',
    productType: 'box_booster',
    imageUrl: '/images/products/box-fiamme-spettrali.png',
  },
  {
    id: 'prod-fiamme-booster',
    name: 'Booster Pack Fiamme Spettrali',
    expansionId: 'exp-fiamme-spettrali',
    productType: 'booster_singolo',
    imageUrl: '/images/products/booster-fiamme-spettrali.png',
  },
  {
    id: 'prod-fiamme-blister-3',
    name: 'Blister 3 Buste Fiamme Spettrali',
    expansionId: 'exp-fiamme-spettrali',
    productType: 'blister_3',
    imageUrl: '/images/products/blister3-fiamme-spettrali.png',
  },
  {
    id: 'prod-fiamme-bundle-6',
    name: 'Bundle 6 Buste Fiamme Spettrali',
    expansionId: 'exp-fiamme-spettrali',
    productType: 'bundle_6',
    imageUrl: '/images/products/bundle6-fiamme-spettrali.png',
  },

  // Megaevoluzione
  {
    id: 'prod-mega-etb',
    name: 'Set Allenatore Fuoriclasse Megaevoluzione',
    expansionId: 'exp-megaevoluzione',
    productType: 'etb',
    imageUrl: '/images/products/etb-megaevoluzione.png',
  },
  {
    id: 'prod-mega-box',
    name: 'Display Box 36 Buste Megaevoluzione',
    expansionId: 'exp-megaevoluzione',
    productType: 'box_booster',
    imageUrl: '/images/products/box-megaevoluzione.png',
  },
  {
    id: 'prod-mega-booster',
    name: 'Booster Pack Megaevoluzione',
    expansionId: 'exp-megaevoluzione',
    productType: 'booster_singolo',
    imageUrl: '/images/products/booster-megaevoluzione.png',
  },

  // Scarlatto e Violetto – Luce Nera
  {
    id: 'prod-luce-etb',
    name: 'Set Allenatore Fuoriclasse Scarlatto e Violetto – Luce Nera',
    expansionId: 'exp-luce-nera',
    productType: 'etb',
    imageUrl: '/images/products/etb-luce-nera.png',
  },
  {
    id: 'prod-luce-box',
    name: 'Display Box 36 Buste Scarlatto e Violetto – Luce Nera',
    expansionId: 'exp-luce-nera',
    productType: 'box_booster',
    imageUrl: '/images/products/box-luce-nera.png',
  },
  {
    id: 'prod-luce-booster',
    name: 'Booster Pack Scarlatto e Violetto – Luce Nera',
    expansionId: 'exp-luce-nera',
    productType: 'booster_singolo',
    imageUrl: '/images/products/booster-luce-nera.png',
  },
  {
    id: 'prod-luce-bundle-6',
    name: 'Bundle 6 Buste Scarlatto e Violetto – Luce Nera',
    expansionId: 'exp-luce-nera',
    productType: 'bundle_6',
    imageUrl: '/images/products/bundle6-luce-nera.png',
  },
  {
    id: 'prod-luce-mini-tin-set',
    name: 'Box Mini Tin Luce Nera / Fuoco Bianco',
    expansionId: 'exp-luce-nera',
    productType: 'tin_box',
    imageUrl: '/images/products/minitin-luce-nera.png',
  },

  // Scarlatto e Violetto – Fuoco Bianco
  {
    id: 'prod-fuoco-etb',
    name: 'Set Allenatore Fuoriclasse Scarlatto e Violetto – Fuoco Bianco',
    expansionId: 'exp-fuoco-bianco',
    productType: 'etb',
    imageUrl: '/images/products/etb-fuoco-bianco.png',
  },
  {
    id: 'prod-fuoco-box',
    name: 'Display Box 36 Buste Scarlatto e Violetto – Fuoco Bianco',
    expansionId: 'exp-fuoco-bianco',
    productType: 'box_booster',
    imageUrl: '/images/products/box-fuoco-bianco.png',
  },
  {
    id: 'prod-fuoco-booster',
    name: 'Booster Pack Scarlatto e Violetto – Fuoco Bianco',
    expansionId: 'exp-fuoco-bianco',
    productType: 'booster_singolo',
    imageUrl: '/images/products/booster-fuoco-bianco.png',
  },
  {
    id: 'prod-fuoco-bundle-6',
    name: 'Bundle 6 Buste Scarlatto e Violetto – Fuoco Bianco',
    expansionId: 'exp-fuoco-bianco',
    productType: 'bundle_6',
    imageUrl: '/images/products/bundle6-fuoco-bianco.png',
  },
  {
    id: 'prod-fuoco-mini-tin-set',
    name: 'Box Mini Tin Scarlatto e Violetto – Fuoco Bianco',
    expansionId: 'exp-fuoco-bianco',
    productType: 'tin_box',
    imageUrl: '/images/products/minitin-fuoco-bianco.png',
  },
];

// 3) Negozi
export const shops: Shop[] = [
  { id: 'shop-coop', name: 'Coop/Ipercoop', type: 'supermarket' },
  { id: 'shop-conad', name: 'Conad', type: 'supermarket' },
  { id: 'shop-gigante', name: 'Il Gigante', type: 'supermarket' },
  { id: 'shop-bennet', name: 'Bennet', type: 'supermarket' },
  { id: 'shop-carrefour', name: 'Carrefour', type: 'supermarket' },
  { id: 'shop-amazon', name: 'Amazon', type: 'online' },
];

// 4) Prezzi mock (puoi metterne pochi, giusto per vedere la tabella piena)
export const prices: Price[] = [
  {
    id: 'price-1',
    productId: 'prod-fiamme-etb',
    shopId: 'shop-coop',
    prezzoBase: 59.99,
    prezzoFidelity: 49.49,
    scontoPercentuale: 17.5,
    labelFidelity: 'Prezzo con Carta Socio Coop',
    dataInizioPromo: '2025-11-20',
    dataFinePromo: '2025-12-10',
    disponibilita: 'in_negozio',
    urlProdotto: '',
    ultimoAggiornamento: '2025-12-09',
  },
  // aggiungi altri prezzi se vuoi
];
