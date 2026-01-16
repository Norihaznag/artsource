'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { Button, Input, Card, CardContent } from '@/components/ui';
import { siteConfig } from '@/lib/config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur de connexion');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary-900 to-secondary-800">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-secondary-900 font-black text-2xl">A</span>
            </div>
            <span className="text-2xl font-black text-white">{siteConfig.name}</span>
          </div>
          <p className="text-secondary-400">Administration</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardContent className="p-6 md:p-8">
            <h1 className="text-2xl font-bold text-secondary-900 mb-6 text-center">
              Connexion Admin
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@artsource.ma"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  label="Mot de passe"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                <Lock className="h-5 w-5" aria-hidden="true" />
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-secondary-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
