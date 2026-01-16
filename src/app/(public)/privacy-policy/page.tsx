import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de artsource. Découvrez comment nous protégeons vos données personnelles.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-lg max-w-none text-secondary-700">
            <p className="lead">
              Dernière mise à jour : Janvier 2024
            </p>

            <h2>1. Introduction</h2>
            <p>
              {siteConfig.name} s&apos;engage à protéger la vie privée des visiteurs de son site web. 
              Cette politique de confidentialité explique comment nous collectons, utilisons et 
              protégeons vos informations personnelles.
            </p>

            <h2>2. Informations collectées</h2>
            <p>Nous collectons les informations suivantes lorsque vous utilisez notre site :</p>
            <ul>
              <li>Nom et prénom</li>
              <li>Numéro de téléphone</li>
              <li>Adresse email (si fournie)</li>
              <li>Ville</li>
              <li>Détails de votre projet d&apos;impression</li>
              <li>Fichiers que vous choisissez de télécharger</li>
            </ul>

            <h2>3. Utilisation des informations</h2>
            <p>Vos informations sont utilisées pour :</p>
            <ul>
              <li>Répondre à vos demandes de devis</li>
              <li>Vous contacter concernant vos projets</li>
              <li>Améliorer nos services</li>
              <li>Vous envoyer des informations sur nos produits (avec votre consentement)</li>
            </ul>

            <h2>4. Protection des données</h2>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos 
              informations personnelles contre tout accès non autorisé, modification, 
              divulgation ou destruction.
            </p>

            <h2>5. Partage des informations</h2>
            <p>
              Nous ne vendons ni ne louons vos informations personnelles à des tiers. 
              Vos données ne sont partagées qu&apos;avec les prestataires nécessaires au 
              fonctionnement de notre service (hébergement, etc.).
            </p>

            <h2>6. Cookies</h2>
            <p>
              Notre site peut utiliser des cookies pour améliorer votre expérience de navigation. 
              Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>

            <h2>7. Vos droits</h2>
            <p>Conformément à la législation en vigueur, vous avez le droit de :</p>
            <ul>
              <li>Accéder à vos données personnelles</li>
              <li>Rectifier vos données</li>
              <li>Supprimer vos données</li>
              <li>Vous opposer au traitement de vos données</li>
            </ul>

            <h2>8. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou pour 
              exercer vos droits, contactez-nous :
            </p>
            <ul>
              <li>Email : {siteConfig.contact.email}</li>
              <li>Téléphone : {siteConfig.contact.phone}</li>
              <li>Adresse : {siteConfig.contact.address}</li>
            </ul>

            <h2>9. Modifications</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité 
              à tout moment. Les modifications seront publiées sur cette page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
