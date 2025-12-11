import { useState, useEffect, useCallback } from 'react';
import { Expansion, Product, Shop, Price } from '@/types';
import { 
  expansions as mockExpansions, 
  products as mockProducts, 
  shops as mockShops, 
  prices as mockPrices 
} from '@/data/mockData';

const STORAGE_KEYS = {
  expansions: 'pokemon-prices-expansions',
  products: 'pokemon-prices-products',
  shops: 'pokemon-prices-shops',
  prices: 'pokemon-prices-prices',
};

function getFromStorage<T>(key: string, defaultValue: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useExpansions() {
  const [expansions, setExpansions] = useState<Expansion[]>(() => 
    getFromStorage(STORAGE_KEYS.expansions, mockExpansions)
  );

  const saveExpansions = useCallback((data: Expansion[]) => {
    setExpansions(data);
    saveToStorage(STORAGE_KEYS.expansions, data);
  }, []);

  const addExpansion = useCallback((expansion: Omit<Expansion, 'id'>) => {
    const newExpansion = { ...expansion, id: `exp-${Date.now()}` };
    saveExpansions([...expansions, newExpansion]);
    return newExpansion;
  }, [expansions, saveExpansions]);

  const updateExpansion = useCallback((id: string, data: Partial<Expansion>) => {
    saveExpansions(expansions.map(e => e.id === id ? { ...e, ...data } : e));
  }, [expansions, saveExpansions]);

  const deleteExpansion = useCallback((id: string) => {
    saveExpansions(expansions.filter(e => e.id !== id));
  }, [expansions, saveExpansions]);

  return { expansions, addExpansion, updateExpansion, deleteExpansion };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => 
    getFromStorage(STORAGE_KEYS.products, mockProducts)
  );

  const saveProducts = useCallback((data: Product[]) => {
    setProducts(data);
    saveToStorage(STORAGE_KEYS.products, data);
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `prod-${Date.now()}` };
    saveProducts([...products, newProduct]);
    return newProduct;
  }, [products, saveProducts]);

  const updateProduct = useCallback((id: string, data: Partial<Product>) => {
    saveProducts(products.map(p => p.id === id ? { ...p, ...data } : p));
  }, [products, saveProducts]);

  const deleteProduct = useCallback((id: string) => {
    saveProducts(products.filter(p => p.id !== id));
  }, [products, saveProducts]);

  const getProductsByExpansion = useCallback((expansionId: string) => {
    return products.filter(p => p.expansionId === expansionId);
  }, [products]);

  return { products, addProduct, updateProduct, deleteProduct, getProductsByExpansion };
}

export function useShops() {
  const [shops, setShops] = useState<Shop[]>(() => 
    getFromStorage(STORAGE_KEYS.shops, mockShops)
  );

  const saveShops = useCallback((data: Shop[]) => {
    setShops(data);
    saveToStorage(STORAGE_KEYS.shops, data);
  }, []);

  const addShop = useCallback((shop: Omit<Shop, 'id'>) => {
    const newShop = { ...shop, id: `shop-${Date.now()}` };
    saveShops([...shops, newShop]);
    return newShop;
  }, [shops, saveShops]);

  const updateShop = useCallback((id: string, data: Partial<Shop>) => {
    saveShops(shops.map(s => s.id === id ? { ...s, ...data } : s));
  }, [shops, saveShops]);

  const deleteShop = useCallback((id: string) => {
    saveShops(shops.filter(s => s.id !== id));
  }, [shops, saveShops]);

  return { shops, addShop, updateShop, deleteShop };
}

export function usePrices() {
  const [prices, setPrices] = useState<Price[]>(() => 
    getFromStorage(STORAGE_KEYS.prices, mockPrices)
  );

  const savePrices = useCallback((data: Price[]) => {
    setPrices(data);
    saveToStorage(STORAGE_KEYS.prices, data);
  }, []);

  const addPrice = useCallback((price: Omit<Price, 'id'>) => {
    const newPrice = { ...price, id: `price-${Date.now()}` };
    savePrices([...prices, newPrice]);
    return newPrice;
  }, [prices, savePrices]);

  const updatePrice = useCallback((id: string, data: Partial<Price>) => {
    savePrices(prices.map(p => p.id === id ? { ...p, ...data } : p));
  }, [prices, savePrices]);

  const deletePrice = useCallback((id: string) => {
    savePrices(prices.filter(p => p.id !== id));
  }, [prices, savePrices]);

  const getPricesByProduct = useCallback((productId: string) => {
    return prices.filter(p => p.productId === productId);
  }, [prices]);

  const getBestPrice = useCallback((productId: string) => {
    const productPrices = prices.filter(p => p.productId === productId);
    if (productPrices.length === 0) return null;
    
    return productPrices.reduce((best, current) => {
      const bestEffective = best.prezzoFidelity || best.prezzoBase;
      const currentEffective = current.prezzoFidelity || current.prezzoBase;
      return currentEffective < bestEffective ? current : best;
    });
  }, [prices]);

  return { prices, addPrice, updatePrice, deletePrice, getPricesByProduct, getBestPrice };
}
