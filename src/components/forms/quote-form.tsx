'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle, MessageCircle, Upload } from 'lucide-react';
import { Button, Input, Textarea, Select } from '@/components/ui';
import { moroccanCities, productTypes, quantityOptions, siteConfig } from '@/lib/config';
import { generateWhatsAppLink, generateWhatsAppMessage, isValidMoroccanPhone } from '@/lib/utils';

interface QuoteFormProps {
  productName?: string;
  compact?: boolean;
  className?: string;
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function QuoteForm({ productName, compact = false, className = '' }: QuoteFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    productType: productName || '',
    quantity: '',
    message: '',
    preferredContact: 'whatsapp',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Le nom est requis';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!isValidMoroccanPhone(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide (format: 06/07XXXXXXXX)';
    }

    if (!formData.city) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.productType) {
      newErrors.productType = 'Le type de produit est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          product_type: formData.productType,
          quantity: formData.quantity,
          message: formData.message,
          preferred_contact: formData.preferredContact,
          source: 'website',
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setFormState('success');
    } catch {
      setFormState('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter par WhatsApp.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const whatsappUrl = generateWhatsAppLink(
    siteConfig.contact.whatsapp,
    generateWhatsAppMessage({
      name: formData.fullName,
      product: formData.productType,
      quantity: formData.quantity,
      message: formData.message,
    })
  );

  if (formState === 'success') {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-8 text-center ${className}`}>
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
        <h3 className="text-xl font-bold text-secondary-900 mb-2">
          Demande envoyée avec succès !
        </h3>
        <p className="text-secondary-600 mb-6">
          Nous avons bien reçu votre demande. Notre équipe vous contactera très rapidement.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" className="w-full sm:w-auto">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Nous contacter sur WhatsApp
            </Button>
          </a>
          <Button variant="outline" onClick={() => router.push('/')}>
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <Input
          label="Nom complet"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Votre nom complet"
          error={errors.fullName}
          required
        />

        <Input
          label="Téléphone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="06 XX XX XX XX"
          error={errors.phone}
          required
        />

        <Select
          label="Ville"
          name="city"
          value={formData.city}
          onChange={handleChange}
          options={moroccanCities.map((city) => ({ value: city, label: city }))}
          placeholder="Sélectionnez votre ville"
          error={errors.city}
          required
        />

        <Select
          label="Type de produit"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          options={productTypes.map((type) => ({ value: type, label: type }))}
          placeholder="Sélectionnez un produit"
          error={errors.productType}
          required
        />

        <Select
          label="Quantité"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          options={quantityOptions.map((qty) => ({ value: qty, label: qty }))}
          placeholder="Sélectionnez une quantité"
        />

        <Select
          label="Mode de contact préféré"
          name="preferredContact"
          value={formData.preferredContact}
          onChange={handleChange}
          options={[
            { value: 'whatsapp', label: 'WhatsApp' },
            { value: 'call', label: 'Appel téléphonique' },
            { value: 'email', label: 'Email' },
          ]}
        />

        <div className={compact ? '' : 'md:col-span-2'}>
          <Textarea
            label="Détails de votre projet"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Décrivez votre projet: dimensions, couleurs, finitions souhaitées..."
            rows={4}
          />
        </div>

        {!compact && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">
              Fichier (optionnel)
            </label>
            <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm text-secondary-600">
                Glissez votre fichier ici ou{' '}
                <span className="text-primary-600 font-medium">parcourez</span>
              </p>
              <p className="text-xs text-secondary-400 mt-1">PDF, AI, PSD, PNG, JPG (max 10MB)</p>
            </div>
          </div>
        )}
      </div>

      {formState === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button type="submit" size="lg" className="flex-1" isLoading={formState === 'loading'}>
          <Send className="h-5 w-5" aria-hidden="true" />
          Envoyer ma demande
        </Button>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button type="button" variant="whatsapp" size="lg" className="w-full">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            WhatsApp direct
          </Button>
        </a>
      </div>
    </form>
  );
}
