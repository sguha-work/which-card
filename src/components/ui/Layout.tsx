import { Link, useLocation } from "react-router-dom";
import { CreditCard as CardIcon, Home } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { label: "Which Card", path: "/", icon: Home },
    { label: "Manage", path: "/manage", icon: CardIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass border-b border-white/5 mx-4 mt-4 rounded-2xl">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform">
              <CardIcon size={18} />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-gradient">WhichCard</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                    isActive 
                      ? "bg-white/10 text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-4">
        <div className="glass rounded-2xl p-4 border border-white/5 bg-brand-primary/5">
          <p className="text-sm text-slate-400 leading-relaxed text-center italic">
            "Credit cards often have different billing cycles. By strategically choosing a card whose statement has just been generated, you can get up to 45-55 days of interest-free credit."
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {children}
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} WhichCard. All data is stored in your device only.</p>
      </footer>
    </div>
  );
}
