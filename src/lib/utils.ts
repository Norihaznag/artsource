import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-MA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('fr-MA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Ensure it starts with country code
  if (digits.startsWith('0')) {
    return '212' + digits.slice(1);
  }
  if (digits.startsWith('212')) {
    return digits;
  }
  return '212' + digits;
}

export function generateWhatsAppLink(phone: string, message?: string): string {
  const formattedPhone = formatPhoneForWhatsApp(phone);
  const baseUrl = `https://wa.me/${formattedPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function generateWhatsAppMessage(data: {
  name?: string;
  product?: string;
  quantity?: string;
  message?: string;
}): string {
  let text = `Bonjour artsource! 👋\n\n`;
  
  if (data.name) {
    text += `Je suis ${data.name}.\n`;
  }
  
  if (data.product) {
    text += `Je suis intéressé(e) par: ${data.product}\n`;
  }
  
  if (data.quantity) {
    text += `Quantité souhaitée: ${data.quantity}\n`;
  }
  
  if (data.message) {
    text += `\nDétails: ${data.message}\n`;
  }
  
  text += `\nMerci de me contacter pour un devis.`;
  
  return text;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function isValidMoroccanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Moroccan numbers: 06/07 + 8 digits or 212 6/7 + 8 digits
  return /^(0[67]\d{8}|212[67]\d{8})$/.test(cleaned);
}
