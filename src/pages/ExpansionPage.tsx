import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useExpansions, useProducts, usePrices } from '@/hooks/useData';
import { PRODUCT_TYPE_LABELS } from '@/types';
import { ArrowLeft, Package, Calendar, ChevronRight } from 'lucide-react';

export default function ExpansionPage() {
  const { id } = useParams<{ id: string }>();
  const { expansions } = useExpansions();
  const { getProductsByExpansion } = useProducts();
  const { getBestPrice } = usePrices();
  
  const expansion = expansions.find((e) => e.id === id);
  const products = expansion ? getProductsByExpansion(expansion.id) : [];

  if (!expansion) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Espansione non trovata</h1>
          <p className="text-muted-foreground mb-6">L'espansione richiesta non esiste o è stata rimossa.</p>
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
          <span className="text-foreground">{expansion.name}</span>
        </nav>

        {/* Expansion Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{expansion.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Calendar className="h-4 w-4" />
              Uscita: {new Date(expansion.releaseDate).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
            <span className="text-sm">Codice: {expansion.code}</span>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Prodotti ({products.length})
          </h2>
          
          {products.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-muted/50 border border-border">
              <p className="text-muted-foreground">Nessun prodotto disponibile per questa espansione.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const bestPrice = getBestPrice(product.id);
                
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group p-4 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {PRODUCT_TYPE_LABELS[product.productType]}
                        </p>
                        {bestPrice && (
                          <p className="text-lg font-bold text-success mt-2">
                            da €{(bestPrice.prezzoFidelity || bestPrice.prezzoBase).toFixed(2)}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
