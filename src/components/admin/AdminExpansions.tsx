import { useState } from 'react';
import { useExpansions } from '@/hooks/useData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Expansion } from '@/types';
import { toast } from 'sonner';

export function AdminExpansions() {
  const { expansions, addExpansion, updateExpansion, deleteExpansion } = useExpansions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Expansion | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', releaseDate: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateExpansion(editingItem.id, formData);
      toast.success('Espansione aggiornata');
    } else {
      addExpansion(formData);
      toast.success('Espansione aggiunta');
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ name: '', code: '', releaseDate: '' });
  };

  const handleEdit = (item: Expansion) => {
    setEditingItem(item);
    setFormData({ name: item.name, code: item.code, releaseDate: item.releaseDate });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questa espansione?')) {
      deleteExpansion(id);
      toast.success('Espansione eliminata');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingItem(null);
      setFormData({ name: '', code: '', releaseDate: '' });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Espansioni</CardTitle>
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
                {editingItem ? 'Modifica Espansione' : 'Nuova Espansione'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="es. Megaevoluzione – Fiamme Spettrali"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Codice</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="es. MEV-FS"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="releaseDate">Data di Uscita</Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                  required
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Codice</TableHead>
              <TableHead>Data Uscita</TableHead>
              <TableHead className="w-[100px]">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expansions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{new Date(item.releaseDate).toLocaleDateString('it-IT')}</TableCell>
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
      </CardContent>
    </Card>
  );
}
