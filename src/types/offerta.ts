// src/types/offerta.ts

export type Fonte =
  | 'carrefour'
  | 'bennet'
  | 'conad'
  | 'ipercoop'
  | 'gigante'
  | 'esselunga'
  | 'amazon';

export interface Offerta {
  id: string;
  productId: string;      // id del prodotto nel tuo sistema (usato in ProductDetail)
  fonte: Fonte;           // supermercato / amazon
  nomeProdotto: string;

  prezzo: number;         // prezzo finale che paga il cliente
  prezzoPieno?: number;   // prezzo senza sconto (opzionale)

  richiedeFidelity: boolean;
  fidelityNome?: string;  // es. "Carta Socio Coop", "Carta Fìdaty"

  regione?: string;       // es. "Lombardia"
  citta?: string;         // es. "Milano"

  validoDal?: string;     // ISO date "2025-12-01"
  validoFino?: string;    // ISO date

  urlOrigine: string;     // URL esatto della pagina promo sul sito del negozio
  ultimoAggiornamento: string; // ISO date
}
