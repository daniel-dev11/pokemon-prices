import { useState } from 'react';
import { usePrices, useProducts, useShops } from '@/hooks/useData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Price, Availability, AVAILABILITY_LABELS } from '@/types';
import { toast } from 'sonner';

const defaultFormData = {
  productId: '',
  shopId: '',
  prezzoBase: '',
  prezzoFidelity: '',
  scontoPercentuale: '',
  labelFidelity: '',
  dataInizioPromo: '',
  dataFinePromo: '',
  disponibilita: 'entrambi' as Availability,
  urlProdotto: '',
};

export function AdminPrices() {
  const { prices, addPrice, updatePrice, deletePrice } = usePrices();
  const { products } = useProducts();
  const { shops } = useShops();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Price | null>(null);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceData = {
      productId: formData.productId,
      shopId: formData.shopId,
      prezzoBase: parseFloat(formData.prezzoBase),
      prezzoFidelity: formData.prezzoFidelity ? parseFloat(formData.prezzoFidelity) : undefined,
      scontoPercentuale: formData.scontoPercentuale ? parseInt(formData.scontoPercentuale) : undefined,
      labelFidelity: formData.labelFidelity || undefined,
      dataInizioPromo: formData.dataInizioPromo || undefined,
      dataFinePromo: formData.dataFinePromo || undefined,
      disponibilita: formData.disponibilita,
      urlProdotto: formData.urlProdotto || undefined,
      ultimoAggiornamento: new Date().toISOString().split('T')[0],
    };
    
    if (editingItem) {
      updatePrice(editingItem.id, priceData);
      toast.success('Prezzo aggiornato');
    } else {
      addPrice(priceData);
      toast.success('Prezzo aggiunto');
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData(defaultFormData);
  };

  const handleEdit = (item: Price) => {
    setEditingItem(item);
    setFormData({
      productId: item.productId,
      shopId: item.shopId,
      prezzoBase: item.prezzoBase.toString(),
      prezzoFidelity: item.prezzoFidelity?.toString() || '',
      scontoPercentuale: item.scontoPercentuale?.toString() || '',
      labelFidelity: item.labelFidelity || '',
      dataInizioPromo: item.dataInizioPromo || '',
      dataFinePromo: item.dataFinePromo || '',
      disponibilita: item.disponibilita,
      urlProdotto: item.urlProdotto || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo prezzo?')) {
      deletePrice(id);
      toast.success('Prezzo eliminato');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingItem(null);
      setFormData(defaultFormData);
    }
  };

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || 'Sconosciuto';
  };

  const getShopName = (shopId: string) => {
    return shops.find((s) => s.id === shopId)?.name || 'Sconosciuto';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prezzi</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Aggiungi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Modifica Prezzo' : 'Nuovo Prezzo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prodotto</Label>
                  <Select 
                    value={formData.productId} 
                    onValueChange={(value) => setFormData({ ...formData, productId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Negozio</Label>
                  <Select 
                    value={formData.shopId} 
                    onValueChange={(value) => setFormData({ ...formData, shopId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona" />
                    </SelectTrigger>
                    <SelectContent>
                      {shops.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prezzo Base (€)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.prezzoBase}
                    onChange={(e) => setFormData({ ...formData, prezzoBase: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prezzo Fidelity (€)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.prezzoFidelity}
                    onChange={(e) => setFormData({ ...formData, prezzoFidelity: e.target.value })}
                    placeholder="Opzionale"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sconto %</Label>
                  <Input
                    type="number"
                    value={formData.scontoPercentuale}
                    onChange={(e) => setFormData({ ...formData, scontoPercentuale: e.target.value })}
                    placeholder="Opzionale"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Label Fidelity</Label>
                  <Input
                    value={formData.labelFidelity}
                    onChange={(e) => setFormData({ ...formData, labelFidelity: e.target.value })}
                    placeholder="es. Carta Socio Coop"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Inizio Promo</Label>
                  <Input
                    type="date"
                    value={formData.dataInizioPromo}
                    onChange={(e) => setFormData({ ...formData, dataInizioPromo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fine Promo</Label>
                  <Input
                    type="date"
                    value={formData.dataFinePromo}
                    onChange={(e) => setFormData({ ...formData, dataFinePromo: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Disponibilità</Label>
                <Select 
                  value={formData.disponibilita} 
                  onValueChange={(value) => setFormData({ ...formData, disponibilita: value as Availability })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>URL Prodotto</Label>
                <Input
                  value={formData.urlProdotto}
                  onChange={(e) => setFormData({ ...formData, urlProdotto: e.target.value })}
                  placeholder="https://..."
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
                <TableHead>Prodotto</TableHead>
                <TableHead>Negozio</TableHead>
                <TableHead>Prezzo</TableHead>
                <TableHead>Fidelity</TableHead>
                <TableHead>Aggiornato</TableHead>
                <TableHead className="w-[100px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prices.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {getProductName(item.productId)}
                  </TableCell>
                  <TableCell>{getShopName(item.shopId)}</TableCell>
                  <TableCell>€{item.prezzoBase.toFixed(2)}</TableCell>
                  <TableCell>
                    {item.prezzoFidelity ? `€${item.prezzoFidelity.toFixed(2)}` : '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {new Date(item.ultimoAggiornamento).toLocaleDateString('it-IT')}
                  </TableCell>
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
