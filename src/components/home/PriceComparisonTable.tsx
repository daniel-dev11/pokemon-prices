import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, Shop, Price, PRODUCT_TYPE_LABELS } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronRight, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceComparisonTableProps {
  products: Product[];
  shops: Shop[];
  prices: Price[];
}

export function PriceComparisonTable({
  products,
  shops,
  prices,
}: PriceComparisonTableProps) {
  const priceMap = useMemo(() => {
    const map = new Map<string, Price>();
    prices.forEach((price) => {
      map.set(`${price.productId}-${price.shopId}`, price);
    });
    return map;
  }, [prices]);

  const getBestPriceShopId = (productId: string): string | null => {
    const productPrices = prices.filter((p) => p.productId === productId);
    if (productPrices.length === 0) return null;

    const best = productPrices.reduce((best, current) => {
      const bestEffective = best.prezzoFidelity ?? best.prezzoBase;
      const currentEffective = current.prezzoFidelity ?? current.prezzoBase;
      return currentEffective < bestEffective ? current : best;
    });

    return best.shopId;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

  const formatDate = (value: string | Date) => {
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('it-IT');
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/95 p-8 text-center shadow-card">
        <p className="text-base font-semibold text-slate-900">
          Nessun prodotto trovato
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Prova a modificare i filtri di ricerca.
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-6">
      <div className="w-full rounded-2xl border border-white/10 bg-white/98 text-slate-900 shadow-card">
        <Table className="w-full table-fixed">
          <TableHeader className="bg-slate-50/90">
            <TableRow>
              <TableHead className="w-[280px] text-slate-700">
                Prodotto
              </TableHead>
              {shops.map((shop) => (
                <TableHead
                  key={shop.id}
                  className="w-[110px] px-2 text-center text-xs font-medium text-slate-700"
                >
                  {shop.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, rowIndex) => {
              const bestShopId = getBestPriceShopId(product.id);

              return (
                <TableRow
                  key={product.id}
                  className={cn(
                    'align-top',
                    rowIndex % 2 === 0 && 'bg-white',
                    rowIndex % 2 === 1 && 'bg-slate-50'
                  )}
                >
                  {/* Colonna prodotto */}
                  <TableCell className="whitespace-nowrap py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          <Package className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.id}`}
                          className="flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-emerald-700"
                        >
                          <span className="truncate">{product.name}</span>
                          <ChevronRight className="h-4 w-4 shrink-0" />
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {PRODUCT_TYPE_LABELS[product.productType] ??
                            'Prodotto'}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Colonne prezzi per negozio */}
                  {shops.map((shop) => {
                    const price = priceMap.get(`${product.id}-${shop.id}`);
                    const isBest = !!price && bestShopId === shop.id;

                    return (
                      <TableCell
                        key={shop.id}
                        className="py-2 text-center align-top"
                      >
                        {price ? (
                          <div
                            className={cn(
                              'inline-flex w-full flex-col rounded-xl border bg-white px-2 py-1.5 text-left text-[11px] shadow-sm',
                              isBest && 'border-emerald-500 bg-emerald-50'
          )}
        >
          {isBest && (
            <span className="mb-1 inline-flex w-fit items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
              Miglior prezzo
            </span>
          )}

          <span className="text-sm font-semibold text-slate-900">
            {formatCurrency(price.prezzoFidelity ?? price.prezzoBase)}
          </span>

          {price.prezzoFidelity && (
            <span className="text-[11px] text-slate-400 line-through">
              {formatCurrency(price.prezzoBase)}
            </span>
          )}

          {price.labelFidelity && (
            <span className="mt-1 text-[11px] text-slate-600">
              {price.labelFidelity}
            </span>
          )}

          {price.dataFinePromo && (
            <span className="mt-0.5 text-[10px] text-slate-400">
              Fino al {formatDate(price.dataFinePromo)}
            </span>
          )}
        </div>
      ) : (
        <span className="text-xs text-slate-400">—</span>
      )}
    </TableCell>
  );
})}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
</div>
);
}


                              
