import { OFFERTE_MOCK } from '@/mock/offerte';

export function OffersPage() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">
        Offerte Supermercati &amp; Amazon
      </h1>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-2">Prodotto</th>
            <th className="text-left py-2">Fonte</th>
            <th className="text-left py-2">Prezzo</th>
            <th className="text-left py-2">Fidelity</th>
            <th className="text-left py-2">Zona</th>
            <th className="text-left py-2">Validità</th>
            <th className="text-left py-2">Link offerta</th>

          </tr>
        </thead>
        <tbody>
          {OFFERTE_MOCK.map((o) => (
            <tr key={o.id} className="border-b border-white/5">
              <td className="py-2">
                <a
                  href={o.urlOrigine}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-[#003434] hover:bg-emerald-400"
                >
                  Vai all&apos;offerta
                  {o.nomeProdotto}
                </a>
              </td>
              <td className="py-2 capitalize">{o.fonte}</td>
              <td className="py-2">{o.prezzo.toFixed(2)} €</td>
              <td className="py-2">
                {o.richiedeFidelity ? o.fidelityNome ?? 'Sì' : 'No'}
              </td>
              <td className="py-2">
                {o.citta ?? o.regione ?? '—'}
              </td>
              <td className="py-2">
                {o.validoDal && o.validoFino
                  ? `${o.validoDal} → ${o.validoFino}`
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
