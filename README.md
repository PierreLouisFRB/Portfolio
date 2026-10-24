# Portfolio de Pierre-Louis

Site Astro avec un espace admin (Keystatic) pour gérer l'accueil, les compétences BUT et les ACs.

## En local

```bash
npm install
npm run dev
```

- Site : http://localhost:4321
- Admin : http://localhost:4321/keystatic (en local, les modifications sont écrites directement dans `content/`)

## Contenu

- `content/accueil.yaml` : page d'accueil
- `content/annees.yaml` : interrupteurs « à venir » par année
- `content/competences/*.yaml` : une compétence par fichier, avec ses ACs et leurs blocs (texte, image, fichier, lien)
- `public/uploads/` : images et fichiers envoyés depuis l'admin

## En ligne (Netlify + GitHub)

1. Pousser ce dossier sur un dépôt GitHub.
2. Sur Netlify : « Add new site » → « Import from GitHub » → choisir le dépôt. Build : `npm run build`, dossier : `dist`.
3. (Optionnel) Le dépôt utilisé par l’admin est `PierreLouisFRB/portfolio` par défaut ; pour en changer, définir `PUBLIC_GITHUB_REPO` dans Netlify.
4. Ouvrir `https://ton-site/keystatic` : Keystatic propose de créer une GitHub App, suivre les étapes. Il ajoute lui-même les variables `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` (les copier dans Netlify si demandé) et redéployer.
5. Ensuite, chaque « Sauvegarder » dans l'admin crée un commit sur GitHub et Netlify republie le site en environ 1 minute.

Seuls les comptes GitHub qui ont accès au dépôt peuvent se connecter à l'admin.

Formulaire de contact : géré par Netlify Forms (messages visibles dans Netlify → Forms, notification e-mail configurable).
