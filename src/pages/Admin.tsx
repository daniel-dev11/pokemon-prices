import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminExpansions } from '@/components/admin/AdminExpansions';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminShops } from '@/components/admin/AdminShops';
import { AdminPrices } from '@/components/admin/AdminPrices';
import { Database, Package, Store, Tag } from 'lucide-react';

export default function Admin() {
  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pannello Admin</h1>
          <p className="text-muted-foreground">
            Gestisci espansioni, prodotti, negozi e prezzi del catalogo.
          </p>
        </div>

        <Tabs defaultValue="expansions" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="expansions" className="gap-2">
              <Database className="h-4 w-4" />
              Espansioni
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              Prodotti
            </TabsTrigger>
            <TabsTrigger value="shops" className="gap-2">
              <Store className="h-4 w-4" />
              Negozi
            </TabsTrigger>
            <TabsTrigger value="prices" className="gap-2">
              <Tag className="h-4 w-4" />
              Prezzi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expansions">
            <AdminExpansions />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="shops">
            <AdminShops />
          </TabsContent>

          <TabsContent value="prices">
            <AdminPrices />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
