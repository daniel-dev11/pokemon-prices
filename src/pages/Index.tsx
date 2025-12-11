import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ExpansionFilter } from '@/components/home/ExpansionFilter';
import { PriceComparisonTable } from '@/components/home/PriceComparisonTable';
import { useExpansions, useProducts, usePrices, useShops } from '@/hooks/useData';
import { TrendingDown } from 'lucide-react';

const Index = () => {
  const [selectedExpansion, setSelectedExpansion] = useState<string>('all');
  const [selectedProductType, setSelectedProductType] = useState<string>('all');

  const { expansions } = useExpansions();
  const { products } = useProducts();
  const { prices } = usePrices();
  const { shops } = useShops();

  // Filter products based on selections
  const filteredProducts = products.filter((product) => {
    const matchesExpansion =
      selectedExpansion === 'all' || product.expansionId === selectedExpansion;
    const matchesType =
      selectedProductType === 'all' || product.productType === selectedProductType;
    return matchesExpansion && matchesType;
  });

  // Filter prices to only include those for filtered products
  const filteredPrices = prices.filter((price) =>
    filteredProducts.some((p) => p.id === price.productId)
  );

  return (
    <Layout>
      <div className="space-y-8 pb-10">
        {/* Hero Section */}
        <section className="pt-8 pb-4">
          <div className="container flex flex-col items-center text-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
              <TrendingDown className="h-4 w-4 text-amber-200" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-amber-200">
                Confronta prezzi GCC
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
              Confronta Prezzi Pokémon
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-slate-200">
              Trova i migliori prezzi per le carte Pokémon GCC nei supermercati e negozi
              online italiani.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="container">
          <ExpansionFilter
            expansions={expansions}
            selectedExpansion={selectedExpansion}
            selectedProductType={selectedProductType}
            onExpansionChange={setSelectedExpansion}
            onProductTypeChange={setSelectedProductType}
          />
        </section>

        {/* Price Comparison Table */}
        <PriceComparisonTable
          products={filteredProducts}
          shops={shops}
          prices={filteredPrices}
        />
      </div>
    </Layout>
  );
};

export default Index;
