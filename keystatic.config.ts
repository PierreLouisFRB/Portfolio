import { config, collection, singleton, fields } from '@keystatic/core';

const repo = (import.meta.env.PUBLIC_GITHUB_REPO ?? 'PierreLouisFRB/portfolio') as `${string}/${string}`;

const blocs = fields.blocks(
  {
    texte: {
      label: 'Texte',
      itemLabel: (p) => p.fields.titre.value || p.fields.texte.value.slice(0, 40) || 'Texte',
      schema: fields.object({
        titre: fields.text({ label: 'Titre (optionnel)' }),
        texte: fields.text({ label: 'Texte', multiline: true }),
      }),
    },
    image: {
      label: 'Image',
      itemLabel: (p) => p.fields.legende.value || 'Image',
      schema: fields.object({
        image: fields.image({ label: 'Image', directory: 'public/uploads/images', publicPath: '/uploads/images/' }),
        legende: fields.text({ label: 'Légende (optionnel)' }),
      }),
    },
    fichier: {
      label: 'Fichier (Word, PDF…)',
      itemLabel: (p) => p.fields.nom.value || 'Fichier',
      schema: fields.object({
        fichier: fields.file({ label: 'Fichier', directory: 'public/uploads/fichiers', publicPath: '/uploads/fichiers/' }),
        nom: fields.text({ label: 'Nom affiché', validation: { length: { min: 1 } } }),
      }),
    },
    lien: {
      label: 'Lien',
      itemLabel: (p) => p.fields.texte.value || 'Lien',
      schema: fields.object({
        texte: fields.text({ label: 'Texte du lien', validation: { length: { min: 1 } } }),
        url: fields.url({ label: 'Adresse', validation: { isRequired: true } }),
      }),
    },
  },
  { label: 'Blocs de contenu' }
);

export default config({
  locale: 'fr-FR',
  storage: import.meta.env.PROD && repo ? { kind: 'github', repo } : { kind: 'local' },
  ui: {
    brand: { name: 'PL Admin' },
    navigation: { 'Site': ['accueil', 'annees'], 'Portfolio BUT': ['competences'] },
  },
  singletons: {
    accueil: singleton({
      label: "Page d'accueil",
      path: 'content/accueil',
      format: { data: 'yaml' },
      schema: {
        prenom: fields.text({ label: 'Prénom' }),
        nom: fields.text({ label: 'Nom' }),
        accroche: fields.text({ label: 'Accroche', multiline: true }),
        legendePhoto: fields.text({ label: 'Légende sous la photo' }),
        photo: fields.image({ label: 'Photo', directory: 'public/uploads/photos', publicPath: '/uploads/photos/' }),
        etudes: fields.text({ label: 'Études', multiline: true }),
        localisation: fields.text({ label: 'Localisation', multiline: true }),
        interets: fields.text({ label: 'Intérêts', multiline: true }),
        hobbies: fields.text({ label: 'Hobbies', multiline: true }),
        cv: fields.file({ label: 'CV (PDF)', directory: 'public/uploads/cv', publicPath: '/uploads/cv/' }),
        email: fields.text({ label: 'E-mail de contact' }),
      },
    }),
    annees: singleton({
      label: 'Années BUT',
      path: 'content/annees',
      format: { data: 'yaml' },
      schema: {
        but1: fields.checkbox({ label: 'Afficher « à venir » pour BUT 1', description: 'Cache les compétences de cette année sur le site public, pratique pour préparer le contenu.' }),
        but2: fields.checkbox({ label: 'Afficher « à venir » pour BUT 2' }),
        but3: fields.checkbox({ label: 'Afficher « à venir » pour BUT 3' }),
      },
    }),
  },
  collections: {
    competences: collection({
      label: 'Compétences',
      path: 'content/competences/*',
      format: { data: 'yaml' },
      slugField: 'titre',
      columns: ['annee', 'code'],
      schema: {
        titre: fields.slug({
          name: { label: 'Titre', description: 'ex : Réaliser' },
          slug: { label: 'Identifiant', description: 'Doit être unique, ex : but1-realiser' },
        }),
        annee: fields.select({
          label: 'Année',
          options: [
            { label: 'BUT 1', value: 'but1' },
            { label: 'BUT 2', value: 'but2' },
            { label: 'BUT 3', value: 'but3' },
          ],
          defaultValue: 'but1',
        }),
        code: fields.text({ label: 'Code', description: 'ex : C1' }),
        icone: fields.select({
          label: 'Icône',
          options: [
            { label: 'Code', value: 'code' },
            { label: 'Processeur', value: 'cpu' },
            { label: 'Serveur', value: 'server' },
            { label: 'Base de données', value: 'database' },
            { label: 'Tableau / projet', value: 'layout' },
            { label: 'Équipe', value: 'users' },
          ],
          defaultValue: 'code',
        }),
        description: fields.text({ label: 'Description courte', multiline: true }),
        presentation: fields.text({ label: 'Présentation détaillée', multiline: true }),
        acs: fields.array(
          fields.object({
            code: fields.text({ label: 'Code', description: 'ex : AC11.01' }),
            titre: fields.text({ label: 'Intitulé' }),
            blocs,
          }),
          {
            label: 'Apprentissages critiques (ACs)',
            itemLabel: (p) => `${p.fields.code.value} ${p.fields.titre.value}`.trim() || 'AC',
          }
        ),
      },
    }),
  },
});
