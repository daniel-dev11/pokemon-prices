// src/mock/offerte.ts
import type { Offerta } from '@/types/offerta'; // se sposti il tipo lì

export const OFFERTE_MOCK: Offerta[] = [
  {
    id: 'fiamme-spettrali-1',
    productId: 'SET-ALLENATORE-FIAMME-SPETTRALI', // ⬅️ usa qui l'id del prodotto che hai in products
    fonte: 'amazon',
    nomeProdotto: 'Set Allenatore Fuoriclasse Megaevoluzione – Fiamme Spettrali',
    prezzo: 69.9,
    prezzoPieno: 74.9,
    richiedeFidelity: false,
    regione: 'Italia',
    citta: 'Online',
    validoDal: '2025-12-10',
    validoFino: '2025-12-31',
    urlOrigine: 'https://www.amazon.it/Pok%C3%A9mon-Fuoriclasse-dellespansione-Megaevoluzione-promozionale/dp/B0FN471SG9/ref=dp_fod_d_sccl_1/261-1582704-9868467?pd_rd_w=mBNPp&content-id=amzn1.sym.1f3c1772-ccf5-4aa2-abc0-5bb5851fb447&pf_rd_p=1f3c1772-ccf5-4aa2-abc0-5bb5851fb447&pf_rd_r=HAPPJSC9Y4ZZEE56BG33&pd_rd_wg=FOx49&pd_rd_r=291488d4-9f8d-4b99-a29a-b27ab8f3446d&pd_rd_i=B0FN471SG9&psc=1',
    ultimoAggiornamento: new Date().toISOString(),
  },
];
