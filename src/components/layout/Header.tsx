import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Settings, Home } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/admin', label: 'Admin', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#003434]/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo + nome */}
        <Link to="/" className="flex items-center gap-3">
  <img
    src="/images/Pokeprezzi_logo.png"
    alt="PokéPrezzi"
    className="h-60 w-auto"
  />
</Link>

        {/* Navigazione */}
        <nav className="flex items-center gap-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-amber-300 text-[#003434]'
                    : 'bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
