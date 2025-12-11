import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PriceBadge } from '@/components/ui/PriceBadge';
import { useProducts, useExpansions, useShops, usePrices } from '@/hooks/useData';
import { PRODUCT_TYPE_LABELS, AVAILABILITY_LABELS } from '@/types';
import { ArrowLeft, Package, Calendar, Barcode } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { expansions } = useExpansions();
  const { shops } = useShops();
  const { getPricesByProduct, getBestPrice } = usePrices();
  
  const product = products.find((p) => p.id === id);
  const expansion = product ? expansions.find((e) => e.id === product.expansionId) : null;
  const productPrices = product ? getPricesByProduct(product.id) : [];
  const bestPrice = product ? getBestPrice(product.id) : null;

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Prodotto non trovato</h1>
          <p className="text-muted-foreground mb-6">Il prodotto richiesto non esiste o è stato rimosso.</p>
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          {expansion && (
            <>
              <Link 
                to={`/expansion/${expansion.id}`} 
                className="hover:text-foreground transition-colors"
              >
                {expansion.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Header */}
        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-10">
          <div className="aspect-square rounded-2xl bg-muted border border-border overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            {expansion && (
              <Link 
                to={`/expansion/${expansion.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 w-fit rounded-full bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors"
              >
                {expansion.name}
              </Link>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                {PRODUCT_TYPE_LABELS[product.productType]}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Barcode className="h-4 w-4" />
                EAN: {product.ean}
              </span>
            </div>

            {bestPrice && (
              <div className="p-4 rounded-xl bg-success/10 border border-success">
                <p className="text-sm font-medium text-success mb-1">Miglior prezzo disponibile</p>
                <p className="text-3xl font-bold text-foreground">
                  €{(bestPrice.prezzoFidelity || bestPrice.prezzoBase).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  presso {shops.find((s) => s.id === bestPrice.shopId)?.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Prices Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Confronto prezzi ({productPrices.length} {productPrices.length === 1 ? 'negozio' : 'negozi'})
          </h2>
          
          {productPrices.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-muted/50 border border-border">
              <p className="text-muted-foreground">Nessun prezzo disponibile per questo prodotto.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productPrices
                .sort((a, b) => {
                  const aPrice = a.prezzoFidelity || a.prezzoBase;
                  const bPrice = b.prezzoFidelity || b.prezzoBase;
                  return aPrice - bPrice;
                })
                .map((price) => {
                  const shop = shops.find((s) => s.id === price.shopId);
                  if (!shop) return null;
                  
                  return (
                    <PriceBadge 
                      key={price.id}
                      price={price}
                      shop={shop}
                      isBest={price.id === bestPrice?.id}
                    />
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
