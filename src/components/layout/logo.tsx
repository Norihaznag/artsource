import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="artsource - Accueil">
      <div className="relative flex items-center">
        {/* Logo mark */}
        <div className="relative">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-secondary-900 font-black text-xl">A</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-900 rounded-full" aria-hidden="true" />
        </div>
        {/* Logo text */}
        <div className="ml-3 flex flex-col">
          <span className="text-xl font-black text-secondary-900 leading-none tracking-tight">
            {siteConfig.name}
          </span>
          <span className="text-[10px] text-secondary-500 uppercase tracking-widest">
            Impression Pro
          </span>
        </div>
      </div>
    </Link>
  );
}
