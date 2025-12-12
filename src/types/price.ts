// src/types/price.ts
export interface Price {
  id: string;
  productId: string;
  shopId: string;
  prezzoBase: number;
  prezzoFidelity: number | null;
  scontoPercentuale: number;
  labelFidelity: string | null;
  dataInizioPromo: string | null;
  dataFinePromo: string | null;
  disponibilita: string | null;
  urlProdotto: string;
  ultimoAggiornamento: string;
}
