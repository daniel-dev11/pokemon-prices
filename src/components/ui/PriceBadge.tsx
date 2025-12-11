import { cn } from '@/lib/utils';
import { Price, Shop } from '@/types';
import { Tag, Percent, Clock } from 'lucide-react';

interface PriceBadgeProps {
  price: Price;
  shop: Shop;
  isBest?: boolean;
  compact?: boolean;
}

export function PriceBadge({ price, shop, isBest = false, compact = false }: PriceBadgeProps) {
  const hasPromo = price.dataInizioPromo && price.dataFinePromo;
  const hasFidelity = price.prezzoFidelity && price.prezzoFidelity < price.prezzoBase;
  const effectivePrice = price.prezzoFidelity || price.prezzoBase;
  
  const isPromoActive = hasPromo && new Date(price.dataFinePromo!) >= new Date();

  if (compact) {
    return (
      <div className={cn(
        "relative p-3 rounded-lg transition-all",
        isBest 
          ? "bg-success/10 border-2 border-success" 
          : "bg-muted/50 border border-border"
      )}>
        {isBest && (
          <span className="absolute -top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase bg-success text-success-foreground rounded-full">
            Miglior Prezzo
          </span>
        )}
        
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-muted-foreground truncate">
            {shop.name}
          </span>
          
          <div className="flex items-baseline gap-1.5">
            {hasFidelity ? (
              <>
                <span className="text-lg font-bold text-foreground">
                  €{effectivePrice.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  €{price.prezzoBase.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-foreground">
                €{price.prezzoBase.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {hasFidelity && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-secondary/10 text-secondary rounded">
                <Tag className="h-2.5 w-2.5" />
                {price.labelFidelity || 'Fidelity'}
              </span>
            )}
            {isPromoActive && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-accent/10 text-accent rounded">
                <Percent className="h-2.5 w-2.5" />
                Promo
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative p-4 rounded-xl transition-all",
      isBest 
        ? "bg-success/10 border-2 border-success shadow-soft" 
        : "bg-card border border-border shadow-card"
    )}>
      {isBest && (
        <span className="absolute -top-2.5 left-3 px-2.5 py-1 text-xs font-bold uppercase bg-success text-success-foreground rounded-full">
          Miglior Prezzo
        </span>
      )}
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {shop.name}
          </span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            shop.type === 'online' 
              ? "bg-secondary/10 text-secondary" 
              : "bg-muted text-muted-foreground"
          )}>
            {shop.type === 'online' ? 'Online' : 'Supermercato'}
          </span>
        </div>
        
        <div className="flex items-baseline gap-2">
          {hasFidelity ? (
            <>
              <span className="text-2xl font-bold text-foreground">
                €{effectivePrice.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                €{price.prezzoBase.toFixed(2)}
              </span>
              {price.scontoPercentuale && (
                <span className="text-sm font-semibold text-success">
                  -{price.scontoPercentuale}%
                </span>
              )}
            </>
          ) : (
            <span className="text-2xl font-bold text-foreground">
              €{price.prezzoBase.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-1">
          {hasFidelity && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-lg">
              <Tag className="h-3 w-3" />
              {price.labelFidelity || 'Carta Fidelity'}
            </span>
          )}
          {isPromoActive && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg">
              <Clock className="h-3 w-3" />
              Fino al {new Date(price.dataFinePromo!).toLocaleDateString('it-IT')}
            </span>
          )}
        </div>
        
        {price.urlProdotto && (
          <a 
            href={price.urlProdotto}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-xs font-medium text-secondary hover:underline"
          >
            Vai al prodotto →
          </a>
        )}
      </div>
    </div>
  );
}
