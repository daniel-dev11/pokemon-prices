import { Expansion, PRODUCT_TYPE_LABELS } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ExpansionFilterProps {
  expansions: Expansion[];
  selectedExpansion: string;
  selectedProductType: string;
  onExpansionChange: (value: string) => void;
  onProductTypeChange: (value: string) => void;
}

export function ExpansionFilter({
  expansions,
  selectedExpansion,
  selectedProductType,
  onExpansionChange,
  onProductTypeChange,
}: ExpansionFilterProps) {
  const productTypes: { value: string; label: string }[] = [
    { value: 'all', label: 'Tutti i prodotti' },
    ...Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
  ];

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white/95 px-6 py-4 shadow-card sm:flex-row">
      <div className="flex flex-1 flex-col gap-2">
        <Label
          htmlFor="expansion-filter"
          className="text-sm font-medium text-slate-700"
        >
          Espansione
        </Label>
        <Select value={selectedExpansion} onValueChange={onExpansionChange}>
          <SelectTrigger
            id="expansion-filter"
            className="bg-slate-50 text-slate-900 border-slate-200"
          >
            <SelectValue placeholder="Seleziona espansione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte le espansioni</SelectItem>
            {expansions.map((exp) => (
              <SelectItem key={exp.id} value={exp.id}>
                {exp.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <Label
          htmlFor="type-filter"
          className="text-sm font-medium text-slate-700"
        >
          Tipo Prodotto
        </Label>
        <Select
          value={selectedProductType}
          onValueChange={onProductTypeChange}
        >
          <SelectTrigger
            id="type-filter"
            className="bg-slate-50 text-slate-900 border-slate-200"
          >
            <SelectValue placeholder="Seleziona tipo" />
          </SelectTrigger>
          <SelectContent>
            {productTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
