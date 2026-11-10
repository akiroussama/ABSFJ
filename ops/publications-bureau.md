# Publications du bureau ABSFJ

## Utilisation pour Monsieur Jamel

Guide illustré, adapté au téléphone et à l’impression : **https://absfj.vercel.app/guide-bureau.pdf**. Douze pages, une étape par page, captures d’écran et boutons repérés. Le guide ne contient aucun mot de passe ; les coordonnées d’accès sont transmises séparément.

1. Ouvrir **https://absfj.vercel.app/bureau-publications** et conserver ce lien dans ses favoris.
2. Saisir le mot de passe fourni séparément. La connexion reste ouverte trente jours sur cet appareil.
3. Appuyer sur **Ajouter une publication**, écrire un titre et le texte, puis choisir les photos. La date, le lieu et les photos sont facultatifs.
4. La première photo sert de couverture. Les flèches permettent de changer l’ordre. Appuyer sur **Voir l’aperçu**, puis sur **Publier**.
5. Pour une publication existante, utiliser **Modifier** ou **Retirer du site**. Le retrait demande confirmation. Une publication retirée peut être restaurée depuis l’onglet **Retirées**.

L’adresse du bureau n’est pas affichée dans la navigation publique et demande une authentification pour toute lecture administrative ou écriture. La page porte noindex, nofollow et noarchive. Le mot de passe n’est jamais intégré au HTML ni au JavaScript public. Aucun compte Vercel, GitHub ou ChatGPT n’est nécessaire pour Monsieur Jamel.

## Stockage et conservation

Les quinze publications initiales sont reprises dans assets/data/publications-legacy.json avec leurs identifiants existants et toutes leurs images. Le fil public conserve les cartes statiques comme repli et applique les modifications administrées par identifiant. Les traductions des archives sont associées à leurs identifiants stables. Le contenu nouvellement rédigé reste en français si aucune traduction n’existe. La médiathèque, ses identifiants, les projets et le registre Facebook ne sont pas réécrits.

Les publications administrées et les marqueurs de retrait sont conservés dans le Blob existant, dans un document chiffré AES-256-GCM. Le stockage et la signature des sessions utilisent des clés distinctes. L’API publique ne renvoie que le contenu publié et les identifiants à retirer. Les photos publiées ont une URL publique ; elles sont réencodées en JPEG et leurs métadonnées d’appareil sont retirées.

**Retirer du site** est un archivage réversible. Il n’efface pas les originaux du dépôt, les archives photographiques ou une publication Facebook. Les personnes disposant d’une ancienne URL d’image publique peuvent encore la consulter. Si le service est indisponible, les archives HTML restent consultables ; cette première version n’est pas un outil d’effacement définitif.

## Configuration serveur

- BLOB_READ_WRITE_TOKEN : stockage média existant.
- PUBLICATIONS_ADMIN_PASSWORD_HASH : scrypt, format scrypt:salt_hex_32:hash_hex_128, N16384 r8 p1, sortie64octets.
- PUBLICATIONS_SESSION_SECRET : signature des cookies. Son remplacement révoque les sessions sans modifier le contenu.
- PUBLICATIONS_STORAGE_SECRET : clé persistante du chiffrement des publications. **Ne pas supprimer ni remplacer cette clé sans migration des données.**

Le remplacement du mot de passe haché révoque également les anciennes sessions. Le cookie est host-only, Secure, HttpOnly et SameSite=Strict. Les écritures vérifient l’origine, le type JSON et un en-tête applicatif. Les essais de mot de passe sont limités à cinq par quinze minutes et par origine réseau, avec réservations persistantes atomiques. Les mises à jour utilisent une révision de fiche et une condition ETag ; une modification concurrente produit un message invitant à actualiser.

Le SDK Blob2.8 ne court-circuite pas le cache public via useCache:false. L’adaptateur lit donc l’ETag par l’API de métadonnées, utilise une URL de contenu versionnée distincte et exige un ETag identique avant de lire/modifier l’état. Les photos ont des URL immuables.

## Vérification

**npm test** vérifie les photos et les publications, notamment authentification, concurrence, archivage et chiffrement. **npm run build** prépare les cinq pages. Les parcours navigateur locaux utilisent les vrais traitements serveur avec un adaptateur de stockage isolé ; leurs images et articles de test ne sont jamais ajoutés au fil de production. Les rapports locaux sont conservés sous output/admin-publications/ et ne sont pas déployés.

Les preuves du déploiement et les contrôles publics sont ajoutés au rapport de livraison local après publication. Les identifiants de connexion sont remis séparément à l’utilisateur, qui peut les transmettre à Monsieur Jamel.
