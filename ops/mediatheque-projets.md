# Médiathèque publique et projets — 8 novembre 2026

## Parcours public

L’accueil présente trois cartes projets et six photos récentes. Le bouton « Partager mes photos » ouvre `/mediatheque.html#partager`. La médiathèque dédiée conserve les 22 photos des archives, leurs dates, leurs albums et leurs liens sources. Les contributions publiques s’y ajoutent avec leur album et leur date. La recherche, les filtres et la visionneuse permettent de parcourir les souvenirs sans surcharger l’accueil.

Le dépôt est ouvert sans connexion. Chaque photo est redimensionnée dans le navigateur, puis vérifiée et réencodée sur le serveur pour supprimer les métadonnées EXIF. La publication exige la confirmation des droits et de l’accord des personnes reconnaissables. Les photos sont publiques dès leur publication.

Les pages `/projets.html` et `/projet.html?id=…` présentent trois propositions :

- Santé connectée : inventaire, maintenance et disponibilité des équipements hospitaliers en Tunisie.
- Valorisation des déchets : expérimentation d’une filière locale de tri et de valorisation.
- Communauté Tunisie–Japon : accueil, repères pratiques et rencontres pour les Japonais en Tunisie.

Les budgets, jalons, indicateurs et pourcentages sont des **exemples de présentation**. Les responsables sont des fonctions à désigner. Aucun financement, nomination ou partenariat n’est établi par ces exemples. Les fiches distinguent le budget prévisionnel de l’allocation réelle, qui reste à confirmer. Les photographies sont des illustrations, avec leur crédit et leur source.

## Stockage et déploiement

Projet Vercel existant : `absfj` (`prj_9Vopn0uVVkZ5kNSejXuKDlnvM3VE`). Domaine public : `https://absfj.vercel.app/`.

La fonction `/api/photos` utilise Vercel Blob, magasin `absfj-mediatheque` (`store_oeujgxolyRAyyXZo`, région Francfort). `BLOB_READ_WRITE_TOKEN` est configuré côté serveur par la connexion du magasin. Aucun secret ne doit être ajouté aux fichiers publics ni aux commits.

L’envoi utilise `POST /api/photos`; la consultation utilise `GET /api/photos` avec pagination. Les images et leurs métadonnées sont enregistrées durablement dans Blob. Aucun envoi n’est simulé dans le stockage local du navigateur. Une erreur serveur reste affichée comme un échec d’envoi.

Les limites d’envoi réduisent les abus ; elles ne constituent pas une modération éditoriale. L’association peut retirer une contribution depuis le tableau de bord Vercel Blob. Il faut supprimer l’image et ses entrées d’index associées ; voir les chemins du code serveur avant toute suppression. Aucun visiteur ne dispose d’un droit de suppression.

## Mettre à jour les projets

Les projets sont gérés dans `assets/data/projects.json`, avec une fiche par identifiant. Modifier le responsable, le budget réel, les jalons et le statut dans ce fichier, puis déployer la modification. Il n’existe pas encore de formulaire d’administration des projets. Une personne nommée ou une allocation budgétaire ne doit être ajoutée qu’après validation par l’association.

Les archives initiales sont dans `assets/data/gallery.json`. Les contributions sont dans le stockage Blob et survivent aux déploiements. Les publications Facebook et leur registre de suivi ne sont pas modifiés par cette livraison.

## Vérification

Les résultats réellement constatés après déploiement sont consignés dans le rapport local de livraison. La réussite des tests locaux ne prouve pas, à elle seule, le dépôt dans le stockage de production.
