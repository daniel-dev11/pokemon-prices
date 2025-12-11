import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#003434] text-slate-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border/40 py-6 mt-auto">
        <div className="container text-center text-sm text-slate-300">
          <p>© 2024 PokéPrezzi — Confronta i prezzi delle carte Pokémon GCC in Italia</p>
        </div>
      </footer>
    </div>
  );
}
