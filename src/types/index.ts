export interface Expansion {
  id: string;
  name: string;
  code: string;
  releaseDate: string;
}

export type ProductType = 
  | 'box_booster' 
  | 'etb' 
  | 'booster_singolo' 
  | 'blister_3' 
  | 'bundle_6' 
  | 'tin_box';

export interface Product {
  id: string;
  expansionId: string;
  name: string;
  productType: ProductType;
  ean?: string;
  imageUrl?: string;
}

export type ShopType = 'supermarket' | 'online';

export interface Shop {
  id: string;
  name: string;
  type: ShopType;
}

export type Availability = 'online' | 'in_negozio' | 'entrambi';

export interface Price {
  id: string;
  productId: string;
  shopId: string;
  prezzoBase: number;
  prezzoFidelity?: number;
  scontoPercentuale?: number;
  labelFidelity?: string;
  dataInizioPromo?: string;
  dataFinePromo?: string;
  disponibilita: Availability;
  urlProdotto?: string;
  ultimoAggiornamento: string;
}

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  box_booster: 'Box Booster',
  etb: 'Elite Trainer Box',
  booster_singolo: 'Booster Singolo',
  blister_3: 'Blister 3 Buste',
  bundle_6: 'Bundle 6 Buste',
  tin_box: 'Tin Box',
};

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  online: 'Online',
  in_negozio: 'In Negozio',
  entrambi: 'Online e In Negozio',
};
