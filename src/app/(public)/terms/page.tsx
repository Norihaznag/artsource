import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente de artsource. Termes et conditions pour nos services d\'impression.',
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8">
            Conditions Générales de Vente
          </h1>
          
          <div className="prose prose-lg max-w-none text-secondary-700">
            <p className="lead">
              Dernière mise à jour : Janvier 2024
            </p>

            <h2>1. Objet</h2>
            <p>
              Les présentes conditions générales de vente (CGV) régissent les relations 
              commerciales entre {siteConfig.name}, situé à {siteConfig.contact.address}, 
              et ses clients pour toute commande de produits d&apos;impression.
            </p>

            <h2>2. Commandes</h2>
            <p>
              Toute commande implique l&apos;acceptation des présentes CGV. Les commandes peuvent 
              être passées par téléphone, WhatsApp, email ou via notre formulaire de contact.
            </p>
            <p>
              Un devis détaillé vous sera fourni avant toute commande. La commande ne sera 
              considérée comme définitive qu&apos;après validation du devis par le client.
            </p>

            <h2>3. Prix</h2>
            <p>
              Les prix sont indiqués en Dirhams Marocains (MAD) et sont valables à la date 
              du devis. Ils peuvent être modifiés sans préavis. Les prix indiqués sur le site 
              sont donnés à titre indicatif.
            </p>

            <h2>4. Fichiers et BAT</h2>
            <p>
              Le client est responsable de la qualité et de la conformité des fichiers fournis. 
              Un BAT (Bon à Tirer) sera envoyé pour validation avant impression. Toute erreur 
              non signalée avant validation du BAT reste sous la responsabilité du client.
            </p>
            <p>Formats acceptés : PDF, AI, PSD, PNG, JPG (300 DPI minimum)</p>

            <h2>5. Délais de production</h2>
            <p>Les délais de production sont indiqués à titre indicatif :</p>
            <ul>
              <li>Standard : 2-3 jours ouvrables</li>
              <li>Express : 24h (supplément applicable)</li>
            </ul>
            <p>
              Ces délais courent à partir de la validation du BAT et de la réception du paiement.
            </p>

            <h2>6. Paiement</h2>
            <p>Modes de paiement acceptés :</p>
            <ul>
              <li>Espèces</li>
              <li>Virement bancaire</li>
              <li>Chèque (pour les professionnels)</li>
            </ul>
            <p>
              Un acompte de 50% peut être demandé à la commande. Le solde est payable à la livraison.
            </p>

            <h2>7. Livraison</h2>
            <p>
              La livraison est disponible à Guelmim et dans toute la région. La livraison est 
              gratuite à Guelmim pour les commandes supérieures à 500 MAD. Des frais de livraison 
              peuvent s&apos;appliquer selon la destination.
            </p>

            <h2>8. Réclamations</h2>
            <p>
              Toute réclamation doit être formulée dans les 48h suivant la réception de la commande. 
              Passé ce délai, aucune réclamation ne sera acceptée.
            </p>
            <p>
              En cas de défaut avéré de fabrication, nous nous engageons à réimprimer 
              la commande à nos frais.
            </p>

            <h2>9. Propriété intellectuelle</h2>
            <p>
              Le client garantit détenir tous les droits nécessaires sur les éléments fournis 
              pour l&apos;impression. {siteConfig.name} ne pourra être tenu responsable en cas de 
              violation des droits de propriété intellectuelle par le client.
            </p>

            <h2>10. Force majeure</h2>
            <p>
              {siteConfig.name} ne saurait être tenu responsable de l&apos;inexécution de ses 
              obligations en cas de force majeure (catastrophe naturelle, grève, panne, etc.).
            </p>

            <h2>11. Litiges</h2>
            <p>
              En cas de litige, une solution amiable sera recherchée en priorité. À défaut, 
              les tribunaux compétents de Guelmim seront seuls compétents.
            </p>

            <h2>12. Contact</h2>
            <p>Pour toute question concernant ces CGV :</p>
            <ul>
              <li>Email : {siteConfig.contact.email}</li>
              <li>Téléphone : {siteConfig.contact.phone}</li>
              <li>Adresse : {siteConfig.contact.address}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
