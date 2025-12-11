import { useState } from 'react';
import { useProducts, useExpansions } from '@/hooks/useData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Product, ProductType, PRODUCT_TYPE_LABELS } from '@/types';
import { toast } from 'sonner';

const defaultFormData = {
  name: '',
  expansionId: '',
  productType: 'box_booster' as ProductType,
  ean: '',
  imageUrl: '/placeholder.svg',
};

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { expansions } = useExpansions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateProduct(editingItem.id, formData);
      toast.success('Prodotto aggiornato');
    } else {
      addProduct(formData);
      toast.success('Prodotto aggiunto');
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  const handleEdit = (item: Product) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      expansionId: item.expansionId,
      productType: item.productType,
      ean: item.ean,
      imageUrl: item.imageUrl,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      deleteProduct(id);
      toast.success('Prodotto eliminato');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingItem(null);
      setFormData(defaultFormData);
    }
  };

  const getExpansionName = (expansionId: string) => {
    return expansions.find((e) => e.id === expansionId)?.name || 'Sconosciuta';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prodotti</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="es. Display Box 36 Buste"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expansion">Espansione</Label>
                <Select 
                  value={formData.expansionId} 
                  onValueChange={(value) => setFormData({ ...formData, expansionId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona espansione" />
                  </SelectTrigger>
                  <SelectContent>
                    {expansions.map((exp) => (
                      <SelectItem key={exp.id} value={exp.id}>
                        {exp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productType">Tipo Prodotto</Label>
                <Select 
                  value={formData.productType} 
                  onValueChange={(value) => setFormData({ ...formData, productType: value as ProductType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ean">EAN</Label>
                <Input
                  id="ean"
                  value={formData.ean}
                  onChange={(e) => setFormData({ ...formData, ean: e.target.value })}
                  placeholder="es. 0820650853791"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL Immagine</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="/placeholder.svg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                  Annulla
                </Button>
                <Button type="submit">
                  {editingItem ? 'Salva' : 'Aggiungi'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Espansione</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>EAN</TableHead>
                <TableHead className="w-[100px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{getExpansionName(item.expansionId)}</TableCell>
                  <TableCell>{PRODUCT_TYPE_LABELS[item.productType]}</TableCell>
                  <TableCell className="font-mono text-sm">{item.ean}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
