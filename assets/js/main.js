/**
 * ABSFJ TUNISIE - Interactive Application Script
 * Gère le mode sombre, le filtre d'événements, la visionneuse Lightbox, les 21 photos Facebook, la carte virtuelle et l'animation Sakura
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. GESTION DU THÈME SOMBRE / CLAIR
  const themeToggleBtn = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('absfj-theme') || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('absfj-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. MENU MOBILE HAMBURGER & DIPLOMATIC SCROLL SPY
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const siteHeader = document.querySelector('.site-header');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });

    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('show');
      }
    });
  }

  // Active Navigation Scroll Spy & Header Elevation
  const trackedSections = document.querySelectorAll('section[id], footer[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    let activeId = '';
    const scrollPosition = window.scrollY + 140;

    trackedSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.getAttribute('id');
      }
    });

    if (activeId) {
      allNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // 3. EFFET DE PÉTALES SAKURA FLOTTANTS (Canvas)
  const canvas = document.getElementById('sakura-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalCount = 35;

    class Petal {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.speedX = Math.random() * 1.5 - 0.5;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() - 0.5) * 0.03;
        this.opacity = Math.random() * 0.4 + 0.35;
      }

      update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY;
        this.angle += this.angularSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fillStyle = `rgba(253, 164, 175, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      const p = new Petal();
      p.y = Math.random() * height;
      petals.push(p);
    }

    function animateSakura() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(petal => {
        petal.update();
        petal.draw();
      });
      requestAnimationFrame(animateSakura);
    }

    animateSakura();
  }

  // 4. DONNÉES COMPLÈTES DES ÉVÉNEMENTS (100% ISSUES DE LA PAGE FACEBOOK OFFICIELLE)
  const eventDetailsData = {
  "ia-distinction-akir": {
    "id": "ia-distinction-akir",
    "category": "reseau",
    "badge": "Excellence & IA",
    "date": "09 Septembre 2026",
    "location": "Tokyo • Tunis",
    "title": "Accueil d'Honneur et Distinction de M. Oussama Akir au sein de l'ABSFJ",
    "summary": "Doctorant en intelligence artificielle et expert primé à Tokyo parmi 25 000 candidats issus de 120 pays. Une fierté nationale et une compétence d'avenir pour l'ABSFJ.",
    "full_text": "Nous avons l’immense honneur d’accueillir au sein de notre Association M. Oussama Akir, doctorant en intelligence artificielle (IA).\n\nSon parcours exceptionnel mérite d’être particulièrement salué : M. Akir a remporté le Premier Prix d’un concours international organisé à Tokyo, auquel ont participé près de 25 000 candidats issus de 120 pays.\n\nCette remarquable distinction témoigne de son excellence, de son talent et de son engagement dans le domaine de l’intelligence artificielle. Elle constitue également une grande fierté pour notre Association et illustre pleinement la richesse des compétences et du savoir-faire des Tunisiens formés et engagés dans des domaines d’avenir.",
    "main_image": "assets/images/events/photo_122186560898769937.jpg",
    "images": [
      "assets/images/events/photo_122186560898769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid03365BHg6MCskR3cQGZighBeLAMiJzPuHVYPVgSzcRXndG4tev4z2DqgvicR4hC5dSl&id=61573098115073"
  },
  "dejeuner-abe-jica": {
    "id": "dejeuner-abe-jica",
    "category": "reseau",
    "badge": "Initiative ABE & Diplomatie",
    "date": "01 Septembre 2026",
    "location": "Ambassade du Japon & Bureau JICA, Tunis",
    "title": "Déjeuner de Travail en l’Honneur des Jeunes Talents de l’Initiative ABE",
    "summary": "Rencontre de haut niveau réunissant le Président Jamel Boujdaria, Mme Miyata Mayumi (JICA), la Première Secrétaire de l'Ambassade du Japon et 4 jeunes talents dont les lauréats ABE et experts IA.",
    "full_text": "À la suite de l’invitation de l’Ambassade du Japon en Tunisie et du Bureau de la JICA à Tunis, le Président de l’Association des Bénéficiaires de Sessions de Formation au Japon (ABSFJ) a participé à un déjeuner de travail organisé en l’honneur de quatre jeunes talents tunisiens, dont trois participants à l’Initiative ABE (African Business Education Initiative for Youth) :\n- M. Driss LAABIDI (13ᵉ promotion ABE)\n- M. Bechir HENTATI (10ᵉ promotion ABE)\n- M. Akrem JABRI (4ᵉ promotion ABE)\n- M. Oussama AKIR (GCI World 2026 et expert IA, lauréat à Tokyo).\n\nLa rencontre a réuni, du côté japonais, Mme Miyata Mayumi, Représentante Résidente de la JICA à Tunis, accompagnée de ses collaborateurs, ainsi que la Première Secrétaire de l’Ambassade du Japon en Tunisie et des représentants de la Chambre de Commerce Tuniso-Japonaise (CCITJ). Le Président de l’ABSFJ a invité les quatre talents à rejoindre l’Association pour valoriser leurs compétences au profit de nos adhérents.",
    "main_image": "assets/images/events/photo_122185797686769937.jpg",
    "images": [
      "assets/images/events/photo_122185797686769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0cWLTgJZrcYGrdKxGyNbzbs3fqoN5xAwS65VeMA9mSgV5wJEyBUVzsLuGPav398bql&id=61573098115073"
  },
  "reseau-afrique-alumni": {
    "id": "reseau-afrique-alumni",
    "category": "reseau",
    "badge": "Réseau Panafricain",
    "date": "22 Août 2026",
    "location": "Visioconférence Panafricaine JICA",
    "title": "Réunion du Réseau des Associations Africaines d’Anciens Stagiaires de la JICA",
    "summary": "Échanges multilatéraux présidés par Djibouti avec le Gabon, le Burkina Faso, le Mali, la RDC et la JICA pour bâtir des initiatives communes panafricaines.",
    "full_text": "Le Président de l’ABSFJ a participé à une réunion en ligne du Réseau des associations africaines d’anciens stagiaires de la JICA, présidée par le Président de l’Association de Djibouti et réunissant les représentants du Gabon, du Burkina Faso, du Mali, de Djibouti et de la RD Congo.\n\nLa séance d’ouverture a été assurée par la Chargée des projets de la JICA à Djibouti. Le Président de l’ABSFJ a présenté un bilan de l'Association et affirmé la disponibilité de la Tunisie pour catalyser des synergies d'envergure africaine, avec l'appui constant et bienveillant du bureau JICA Tunis.",
    "main_image": "assets/images/events/photo_122184892514769937.jpg",
    "images": [
      "assets/images/events/photo_122184892514769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0o6eEX5K2rJ56En7RdsaYdxuMhbunr3xfAZKA2RgSF2NBTHqmxChp8H3pQqb2jS4rl&id=61573098115073"
  },
  "accueil-volontaires-japon": {
    "id": "accueil-volontaires-japon",
    "category": "amitie",
    "badge": "Amitié Tunisie–Japon",
    "date": "14 Août 2026",
    "location": "Tunis, Tunisie",
    "title": "Accueil Chaleureux des Volontaires et Amis Japonais en Tunisie",
    "summary": "L'ABSFJ souhaite la bienvenue aux volontaires et coopérants japonais arrivés en Tunisie et réaffirme son engagement à les accompagner.",
    "full_text": "🇯🇵🇹🇳 Bienvenue en Tunisie à nos amis et volontaires japonais ! Nous leur souhaitons un excellent séjour parmi nous, riche en découvertes, en échanges et en belles expériences.\n\nNotre Association est pleinement à leur disposition pour les accompagner et les soutenir, afin de contribuer à la réussite de leur mission dans notre pays. Bienvenue en Tunisie et très bon séjour à tous ! 🌿🤝",
    "main_image": "assets/images/events/photo_122184036554769937.jpg",
    "images": [
      "assets/images/events/photo_122184036554769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0exxtBkcRDugkZjxgrxXVhifPZ7m2HPyckeTd3CKHcYdd4vgisBaa6u6oadRcQn1Jl&id=61573098115073"
  },
  "felicitations-laureats": {
    "id": "felicitations-laureats",
    "category": "reseau",
    "badge": "Excellence & Promotion",
    "date": "30 Juillet 2026",
    "location": "Tunis • Programmes JICA",
    "title": "Célébration et Félicitations aux Lauréats des Formations JICA",
    "summary": "Remise solennelle de distinctions et hommages aux lauréats des sessions de formation de la JICA au Japon. Galerie de 6 photographies officielles.",
    "full_text": "« Toutes mes félicitations à vous deux. Vous faites notre fierté. »\n\nCélébration des cadres et experts tunisiens ayant brillamment accompli leurs cycles de perfectionnement et de co-création de connaissances au Japon. Une illustration vivante de la rigueur et du dévouement de nos alumni au service de la nation.",
    "main_image": "assets/images/events/photo_1352334837016043.jpg",
    "images": [
      "assets/images/events/photo_1352334837016043.jpg",
      "assets/images/events/photo_1352334830349377.jpg",
      "assets/images/events/photo_1352334820349378.jpg",
      "assets/images/events/photo_1352334823682711.jpg",
      "assets/images/events/photo_1352334827016044.jpg",
      "assets/images/events/photo_122182593866769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  "seminaire-penthouse-kaizen": {
    "id": "seminaire-penthouse-kaizen",
    "category": "kaizen",
    "badge": "KAIZEN & Décarbonation",
    "date": "09 Juillet 2026",
    "location": "Hôtel The Penthouse, Tunis",
    "title": "Séminaire National : « L'Impact de l'Approche Kaizen sur le Changement Climatique »",
    "summary": "Conférence de référence co-organisée avec la JICA, réunissant l'Ambassadeur du Japon, Mme Miyata Mayumi, BSB Toyota, l'ANME et le Ministère de l'Industrie.",
    "full_text": "L'Hôtel The Penthouse a abrité la conférence scientifique intitulée « L'impact de l'approche Kaizen face au changement climatique et son rôle dans la décarbonation », avec la participation de hauts responsables tunisiens et japonais, de chefs d'entreprises et de chercheurs.\n\nInterventions remarquées du Président Jamel Boujdaria, de Mme Miyata Mayumi (Représentante Résidente JICA), de S.E. l'Ambassadeur du Japon, de M. Nacef Belkhiria (Vice-Président BSB Toyota, CCITJ), de M. Nafeh Baccari (DG ANME) et de M. Slim Ferchichi (DG Ministère de l'Industrie).\n\nLe séminaire a démontré que la philosophie Kaizen constitue une méthode d'excellence pour réduire les pertes énergétiques, décarboner les processus de fabrication et accélérer la transition écologique.",
    "main_image": "assets/images/events/photo_122180433800769937.jpg",
    "images": [
      "assets/images/events/photo_122180433800769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02KkN9FLXWgwf2mXo8hjpYvqZW3fbQA8bTqoWnw26oDtnJ7BVCzkK3QjrFjnfXMfLvl&id=61573098115073"
  },
  "football-amitie-japon": {
    "id": "football-amitie-japon",
    "category": "amitie",
    "badge": "Sport & Fair-Play",
    "date": "20 Juin 2026",
    "location": "Juventus Academy Club, Tunis",
    "title": "Rencontre Footballistique Tuniso-Japonaise d'Amitié et de Fair-Play",
    "summary": "Match amical réunissant de jeunes Tunisiens et Japonais et leurs familles, en présence de S.E. M. Saito Jun, Ambassadeur du Japon, et de Mme Miyata Mayumi.",
    "full_text": "Une manifestation sportive festive réunissant une cinquantaine de jeunes participants tunisiens et japonais et leurs familles à la Juventus Academy Club, organisée par l’ABSFJ et la JICA dans le cadre des préparatifs du match officiel Tunisie - Japon de la Coupe du Monde 2026.\n\nL'événement s'est déroulé en présence de Son Excellence Monsieur Saito Jun, Ambassadeur du Japon en Tunisie, et de Madame Miyata Mayumi, Représentante Résidente de la JICA. Les meilleurs joueurs U13 ont été primés pour leur remarquable esprit sportif et leur fraternité.",
    "main_image": "assets/images/events/photo_122178574154769937.jpg",
    "images": [
      "assets/images/events/photo_122178574154769937.jpg",
      "assets/images/events/photo_122176625234769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0yEQrD4wBBC6gY9NUrUAVgNkR48BYjPLFaKtHR3289yo4Ma2NFzxz8fWSJDNDKorKl&id=61573098115073"
  },
  "visite-mitsui-yoko-jica": {
    "id": "visite-mitsui-yoko-jica",
    "category": "reseau",
    "badge": "Direction JICA Tokyo",
    "date": "16 Juin 2026",
    "location": "Tunis • Siège Résidence JICA",
    "title": "Déjeuner-Débat Stratégique avec Mme Mitsui Yoko, Senior VP de la JICA Tokyo",
    "summary": "Visite officielle de Mme Mitsui Yoko, Senior Vice President de la JICA Tokyo. Présentation des réalisations de l'ABSFJ et consolidation du partenariat futur.",
    "full_text": "À l’occasion de la visite de travail en Tunisie de Mme Mitsui Yoko, Senior Vice President de la JICA, accompagnée de Mme Kawamura Reiko (responsable Moyen-Orient JICA Tokyo) et de Mme Miyata Mayumi, un déjeuner-débat s'est tenu à Tunis.\n\nM. Jamel Boujdaria a exposé les missions et les avancées de l’Association, mettant en avant la promotion de la démarche Kaizen et l'engagement en faveur du développement durable. Mme Mitsui a salué le dynamisme remarquable de l’ABSFJ et réaffirmé le soutien indéfectible de la JICA.",
    "main_image": "assets/images/events/photo_122178214784769937.jpg",
    "images": [
      "assets/images/events/photo_122178214784769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0NRzPn8HRD9NWRgxMMLVgKpPaS5oUX3tAdqqvMy7cms3xERrfZShyHLRSGZyaRVGpl&id=61573098115073"
  },
  "reception-70-ans-empereur": {
    "id": "reception-70-ans-empereur",
    "category": "reseau",
    "badge": "Diplomatie & 70 Ans",
    "date": "30 Mars 2026",
    "location": "Résidence de l'Ambassade du Japon, Tunis",
    "title": "Célébration du 70ᵉ Anniversaire des Relations Bilatérales & Fête de l'Empereur",
    "summary": "Participation solennelle de l'ABSFJ à la réception diplomatique de l'Ambassade du Japon marquant les 70 ans de liens Tunisie–Japon. Galerie de 5 photos officielles.",
    "full_text": "L’Association a pris part activement à la réception solennelle organisée par l’Ambassade du Japon en Tunisie à l’occasion de la célébration de l’anniversaire de Sa Majesté l’Empereur du Japon, un événement marquant également le 70ᵉ anniversaire des relations diplomatiques tuniso-japonaises.\n\nCette participation a constitué une opportunité majeure pour présenter les accomplissements de l'ABSFJ, dévoiler le programme 2026 et valoriser le kakemono officiel de l'association aux côtés des plus hautes autorités diplomatiques.",
    "main_image": "assets/images/events/photo_122170759898769937.jpg",
    "images": [
      "assets/images/events/photo_122170759898769937.jpg",
      "assets/images/events/photo_122170760918769937.jpg",
      "assets/images/events/photo_122170759646769937.jpg",
      "assets/images/events/photo_122170759712769937.jpg",
      "assets/images/events/photo_122170759574769937.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  },
  "projet-decharge-beja": {
    "id": "projet-decharge-beja",
    "category": "ecologie",
    "badge": "Écologie & Méthode Fukuoka",
    "date": "2025 - 2026",
    "location": "Décharge de Béja, Tunisie",
    "title": "Méthode Japonaise de Fukuoka à la Décharge de Béja (ANGED & EX Research)",
    "summary": "Projet d'ingénierie écologique nippone réduisant drastiquement les émissions de gaz méthane par aération semi-aérobie.",
    "full_text": "Dans le cadre de la coopération entre la JICA, l'ANGED et le cabinet japonais EX Research Institute, l'ABSFJ soutient le déploiement de la méthode d'enfouissement semi-aérobie 'Fukuoka' à la décharge contrôlée de Béja.\n\nCette technique innovante, reconnue par les Nations Unies, permet une décomposition accélérée de la matière organique, diminue les lixiviats et prévient le réchauffement climatique.",
    "main_image": "assets/images/events/photo_1038482885850153.jpg",
    "images": [
      "assets/images/events/photo_1038482885850153.jpg",
      "assets/images/event-fukuoka-beja.jpg"
    ],
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0g4XQQwWMNcWnNEr2V9haeewjtftvUSuMRokf5C5DdhFUatdY7jZS3MzC2xLY93AKl&id=61573098115073"
  },
  "ag-ordinaire-utica": {
    "id": "ag-ordinaire-utica",
    "category": "ag",
    "badge": "Assemblée Générale",
    "date": "29 Janvier 2026",
    "location": "Siège de l'UTICA, Tunis",
    "title": "1ère Assemblée Générale Ordinaire de l'ABSFJ",
    "summary": "Bilan moral et financier d'une première année de mandat réussie sous la présidence de M. Jamel Boujdaria et structuration des comités opérationnels.",
    "full_text": "Réunie au siège de l'UTICA à Tunis, la première assemblée générale ordinaire a rassemblé les membres fondateurs et anciens boursiers JICA.\n\nAdoption à l'unanimité des rapports d'activités, validation du budget prévisionnel et structuration de comités sectoriels (Industrie 4.0, Énergie, Tourisme japonais, Transfert technologique).",
    "main_image": "assets/images/event-cite-sciences.jpg",
    "images": [
      "assets/images/event-cite-sciences.jpg"
    ],
    "fb_url": "https://www.facebook.com/61573098115073/"
  },
  "lancement-solennel-cite-sciences": {
    "id": "lancement-solennel-cite-sciences",
    "category": "ag",
    "badge": "Fondation Historique",
    "date": "14 Février 2025",
    "location": "Cité des Sciences de Tunis",
    "title": "Cérémonie Solennelle de Lancement de l'ABSFJ",
    "summary": "Naissance officielle de l'association réunissant l'Ambassade du Japon, la JICA et plus de 200 cadres et experts formés au Japon depuis 1975.",
    "full_text": "Cérémonie inaugurale historique scellant 50 années de coopération technique et humaine. Allocutions solennelles de Son Excellence l'Ambassadeur du Japon et de la Représentation Résidente de la JICA, saluant la création de ce trait d'union patriotique et scientifique.",
    "main_image": "assets/images/event-cite-sciences.jpg",
    "images": [
      "assets/images/event-cite-sciences.jpg"
    ],
    "fb_url": "https://www.facebook.com/61573098115073/"
  }
};

  // 5. FILTRAGE DES ÉVÉNEMENTS
  const filterButtons = document.querySelectorAll('.filter-nav:not(.gallery-filter) .filter-btn:not(.gallery-fbtn)');
  const eventCards = document.querySelectorAll('.event-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 6. GESTION DU MODAL DE DÉTAIL D'ÉVÉNEMENT (AVEC GALERIE MULTI-PHOTOS ET LIEN FACEBOOK)
  const modalOverlay = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalLocation = document.getElementById('modal-location');
  const modalBadge = document.getElementById('modal-badge');
  const modalDesc = document.getElementById('modal-description');
  const modalImg = document.getElementById('modal-img');
  const modalThumbs = document.getElementById('modal-thumbs-container');
  const modalFbLink = document.getElementById('modal-fb-link');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const eventKey = button.getAttribute('data-event-id');
      const data = eventDetailsData[eventKey];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date;
        if (modalLocation) modalLocation.textContent = '📍 ' + data.location;
        if (modalBadge) modalBadge.textContent = data.badge;
        modalDesc.textContent = data.full_text || data.summary;
        if (modalImg) {
          modalImg.src = data.main_image;
          modalImg.alt = data.title;
        }
        if (modalFbLink) {
          modalFbLink.href = data.fb_url;
        }

        // Générer les miniatures si l'événement compte plusieurs photos
        if (modalThumbs) {
          modalThumbs.innerHTML = '';
          if (data.images && data.images.length > 1) {
            modalThumbs.style.display = 'flex';
            data.images.forEach((imgSrc, i) => {
              const thumb = document.createElement('img');
              thumb.src = imgSrc;
              thumb.alt = data.title + ' - Photo ' + (i + 1);
              thumb.className = 'modal-thumb' + (i === 0 ? ' active' : '');
              thumb.addEventListener('click', () => {
                modalImg.src = imgSrc;
                modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
              });
              modalThumbs.appendChild(thumb);
            });
          } else {
            modalThumbs.style.display = 'none';
          }
        }

        modalOverlay.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // 7. DONNÉES COMPLÈTES DE LA MÉDIATHÈQUE FACEBOOK (21 PHOTOS EXCLUSIVES)
  const galleryMasterData = [
  {
    "id": "p1",
    "category": "talents",
    "tag": "IA & Compétences",
    "img": "assets/images/events/photo_122186560898769937.jpg",
    "title": "M. Oussama Akir • 1er Prix International en IA à Tokyo",
    "date": "09 Septembre 2026",
    "event_id": "ia-distinction-akir",
    "event_name": "Accueil d'Honneur de M. Oussama Akir",
    "desc": "Distinction d'excellence décernée à Tokyo à M. Oussama Akir parmi 25 000 candidats internationaux de 120 pays.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid03365BHg6MCskR3cQGZighBeLAMiJzPuHVYPVgSzcRXndG4tev4z2DqgvicR4hC5dSl&id=61573098115073"
  },
  {
    "id": "p2",
    "category": "diplomatie",
    "tag": "Initiative ABE & JICA",
    "img": "assets/images/events/photo_122185797686769937.jpg",
    "title": "Déjeuner de Travail avec la JICA et les Boursiers ABE",
    "date": "01 Septembre 2026",
    "event_id": "dejeuner-abe-jica",
    "event_name": "Déjeuner de Travail Initiative ABE",
    "desc": "M. Jamel Boujdaria, Mme Miyata Mayumi (JICA), la 1ère Secrétaire de l'Ambassade du Japon et les 4 jeunes talents tunisiens.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0cWLTgJZrcYGrdKxGyNbzbs3fqoN5xAwS65VeMA9mSgV5wJEyBUVzsLuGPav398bql&id=61573098115073"
  },
  {
    "id": "p3",
    "category": "ecologie",
    "tag": "Méthode Fukuoka",
    "img": "assets/images/events/photo_1038482885850153.jpg",
    "title": "Projet Pilote Fukuoka à la Décharge de Béja (ANGED & EX Research)",
    "date": "24 Août 2026",
    "event_id": "projet-decharge-beja",
    "event_name": "Décharge de Béja - Méthode Fukuoka",
    "desc": "Revue technique et médiatique de l'expérience d'enfouissement semi-aérobie réduisant le méthane à Béja.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0g4XQQwWMNcWnNEr2V9haeewjtftvUSuMRokf5C5DdhFUatdY7jZS3MzC2xLY93AKl&id=61573098115073"
  },
  {
    "id": "p4",
    "category": "afrique",
    "tag": "Réseau Alumni Afrique",
    "img": "assets/images/events/photo_122184892514769937.jpg",
    "title": "Réunion Panafricaine des Associations d'Anciens Stagiaires JICA",
    "date": "22 Août 2026",
    "event_id": "reseau-afrique-alumni",
    "event_name": "Réseau Panafricain Alumni JICA",
    "desc": "Visioconférence multilatérale avec Djibouti, Gabon, Burkina Faso, Mali, RDC et la JICA.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0o6eEX5K2rJ56En7RdsaYdxuMhbunr3xfAZKA2RgSF2NBTHqmxChp8H3pQqb2jS4rl&id=61573098115073"
  },
  {
    "id": "p5",
    "category": "amitie",
    "tag": "Volontaires JICA",
    "img": "assets/images/events/photo_122184036554769937.jpg",
    "title": "Accueil Chaleureux des Nouveaux Volontaires Japonais en Tunisie",
    "date": "14 Août 2026",
    "event_id": "accueil-volontaires-japon",
    "event_name": "Accueil des Volontaires Japonais",
    "desc": "L'ABSFJ souhaite la bienvenue aux volontaires nippons pour une mission féconde en Tunisie.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0exxtBkcRDugkZjxgrxXVhifPZ7m2HPyckeTd3CKHcYdd4vgisBaa6u6oadRcQn1Jl&id=61573098115073"
  },
  {
    "id": "p6",
    "category": "talents",
    "tag": "Félicitations & Fierté",
    "img": "assets/images/events/photo_1352334837016043.jpg",
    "title": "Célébration des Lauréats Tunisiens des Sessions JICA",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Hommage et reconnaissance aux bénéficiaires de formations spécialisées au Japon.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p7",
    "category": "talents",
    "tag": "Lauréats JICA",
    "img": "assets/images/events/photo_1352334830349377.jpg",
    "title": "Remise d'Attestations & Honneurs aux Boursiers JICA",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Reconnaissance de l'excellence académique et technique acquise au Japon.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p8",
    "category": "talents",
    "tag": "Certificats d'Excellence",
    "img": "assets/images/events/photo_1352334820349378.jpg",
    "title": "Certificats Officiels & Validation des Compétences Nipponnes",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Validation des compétences de haut niveau transmises par les experts japonais.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p9",
    "category": "talents",
    "tag": "Alumni d'Élite",
    "img": "assets/images/events/photo_1352334823682711.jpg",
    "title": "Promotion des Cadres Tunisiens Formés au Japon",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Fierté de la communauté des anciens boursiers JICA en Tunisie.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p10",
    "category": "talents",
    "tag": "Cérémonie Alumni",
    "img": "assets/images/events/photo_1352334827016044.jpg",
    "title": "Témoignage de Réussite & Rayonnement Bilatéral",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Mise à l'honneur des parcours d'exception issus de la coopération bilatérale.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p11",
    "category": "talents",
    "tag": "Insigne & Fierté",
    "img": "assets/images/events/photo_122182593866769937.jpg",
    "title": "Hommage de l'ABSFJ aux Boursiers Exemplaires",
    "date": "30 Juillet 2026",
    "event_id": "felicitations-laureats",
    "event_name": "Félicitations aux Lauréats",
    "desc": "Félicitations fraternelles du Président et du bureau exécutif aux lauréats.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073"
  },
  {
    "id": "p12",
    "category": "kaizen",
    "tag": "KAIZEN & Climat",
    "img": "assets/images/events/photo_122180433800769937.jpg",
    "title": "Tribune Officielle du Séminaire KAIZEN & Décarbonation",
    "date": "09 Juillet 2026",
    "event_id": "seminaire-penthouse-kaizen",
    "event_name": "Séminaire National The Penthouse",
    "desc": "Discours d'ouverture de M. Jamel Boujdaria, Mme Miyata Mayumi (JICA) et l'Ambassadeur du Japon à The Penthouse.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02KkN9FLXWgwf2mXo8hjpYvqZW3fbQA8bTqoWnw26oDtnJ7BVCzkK3QjrFjnfXMfLvl&id=61573098115073"
  },
  {
    "id": "p13",
    "category": "sport",
    "tag": "Sport & Amitié",
    "img": "assets/images/events/photo_122178574154769937.jpg",
    "title": "Match Footballistique d'Amitié Tuniso-Japonaise (Juventus Academy)",
    "date": "20 Juin 2026",
    "event_id": "football-amitie-japon",
    "event_name": "Rencontre Footballistique Tuniso-Japonaise",
    "desc": "Les équipes de jeunes Tunisiens et Japonais réunies sur le terrain sous l'égide de l'ABSFJ et de la JICA.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0yEQrD4wBBC6gY9NUrUAVgNkR48BYjPLFaKtHR3289yo4Ma2NFzxz8fWSJDNDKorKl&id=61573098115073"
  },
  {
    "id": "p14",
    "category": "sport",
    "tag": "Invitation Jeunesse",
    "img": "assets/images/events/photo_122176625234769937.jpg",
    "title": "Affiche Officielle de la Rencontre Sportive Tuniso-Japonaise",
    "date": "29 Mai 2026",
    "event_id": "football-amitie-japon",
    "event_name": "Rencontre Footballistique Tuniso-Japonaise",
    "desc": "Campagne d'invitation des familles et enfants à célébrer le fair-play et les liens bilatéraux.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid02RByv7p55qh8pcFdp2RnSMCKSVNX2CpsmHRTV3bWysNW83J7RCQMVwUPzxa3TjiPql&id=61573098115073"
  },
  {
    "id": "p15",
    "category": "diplomatie",
    "tag": "Direction JICA Tokyo",
    "img": "assets/images/events/photo_122178214784769937.jpg",
    "title": "Déjeuner Stratégique avec Mme Mitsui Yoko, Senior VP JICA Tokyo",
    "date": "16 Juin 2026",
    "event_id": "visite-mitsui-yoko-jica",
    "event_name": "Visite Ministérielle JICA Tokyo",
    "desc": "Rencontre de haut niveau avec Mme Mitsui Yoko, Mme Kawamura Reiko et Mme Miyata Mayumi.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0NRzPn8HRD9NWRgxMMLVgKpPaS5oUX3tAdqqvMy7cms3xERrfZShyHLRSGZyaRVGpl&id=61573098115073"
  },
  {
    "id": "p16",
    "category": "diplomatie",
    "tag": "Communication Officielle",
    "img": "assets/images/events/photo_122176323434769937.jpg",
    "title": "Mobilisation & Rayonnement Institutionnel de l'ABSFJ",
    "date": "26 Mai 2026",
    "event_id": "visite-mitsui-yoko-jica",
    "event_name": "Visite Ministérielle JICA Tokyo",
    "desc": "Support visuel officiel relayant les initiatives de l'association.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid06z964sqFdjUQDB9A6kS7sMKmukwL9ai5oJ4QsA7CvCApxbTRiLuWJYg29br18zxbl&id=61573098115073"
  },
  {
    "id": "p17",
    "category": "diplomatie",
    "tag": "70 Ans de Diplomatie",
    "img": "assets/images/events/photo_122170759898769937.jpg",
    "title": "Tribune d'Honneur • Célébration des 70 Ans de Liens Diplomatiques",
    "date": "30 Mars 2026",
    "event_id": "reception-70-ans-empereur",
    "event_name": "70 Ans de Relations Bilatérales",
    "desc": "Discours à la Résidence de l'Ambassadeur du Japon en l'honneur de Sa Majesté l'Empereur.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  },
  {
    "id": "p18",
    "category": "diplomatie",
    "tag": "Bureau Exécutif ABSFJ",
    "img": "assets/images/events/photo_122170760918769937.jpg",
    "title": "Membres du Bureau de l'ABSFJ à la Réception Diplomatique",
    "date": "30 Mars 2026",
    "event_id": "reception-70-ans-empereur",
    "event_name": "70 Ans de Relations Bilatérales",
    "desc": "Délégation de l'ABSFJ reçue par les représentants du Japon lors de la fête de l'Empereur.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  },
  {
    "id": "p19",
    "category": "diplomatie",
    "tag": "Délégation Officielle",
    "img": "assets/images/events/photo_122170759646769937.jpg",
    "title": "Représentants de l'ABSFJ et Partenaires Institutionnels",
    "date": "30 Mars 2026",
    "event_id": "reception-70-ans-empereur",
    "event_name": "70 Ans de Relations Bilatérales",
    "desc": "Rencontre cordiale et renforcement des partenariats avec les diplomates japonais.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  },
  {
    "id": "p20",
    "category": "diplomatie",
    "tag": "Kakemono Officiel",
    "img": "assets/images/events/photo_122170759712769937.jpg",
    "title": "Kakemono Solennel de l'ABSFJ à la Cérémonie Diplomatique",
    "date": "30 Mars 2026",
    "event_id": "reception-70-ans-empereur",
    "event_name": "70 Ans de Relations Bilatérales",
    "desc": "Présentation du kakemono institutionnel de l'ABSFJ aux côtés des drapeaux tunisien et japonais.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  },
  {
    "id": "p21",
    "category": "diplomatie",
    "tag": "Réception Impériale",
    "img": "assets/images/events/photo_122170759574769937.jpg",
    "title": "Vue d'Ensemble de la Réception de l'Ambassade du Japon",
    "date": "30 Mars 2026",
    "event_id": "reception-70-ans-empereur",
    "event_name": "70 Ans de Relations Bilatérales",
    "desc": "Célébration festive du 70e anniversaire des relations amicales et diplomatiques Tunisie - Japon.",
    "fb_url": "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073"
  }
];

  // 8. FILTRAGE DE LA GALERIE PHOTOS
  const galleryFilterBtns = document.querySelectorAll('.gallery-fbtn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const gfilter = btn.getAttribute('data-gfilter');

      galleryItems.forEach(item => {
        const gcat = item.getAttribute('data-gcategory');
        if (gfilter === 'all' || gcat === gfilter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 40);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 9. VISIONNEUSE LIGHTBOX HD PLEIN ÉCRAN POUR LES 21 PHOTOS
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxDate = document.getElementById('lightbox-date');
  const lightboxFbLink = document.getElementById('lightbox-fb-link');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentPhotoIndex = 0;

  function showLightboxPhoto(index) {
    if (index < 0) index = galleryMasterData.length - 1;
    if (index >= galleryMasterData.length) index = 0;
    currentPhotoIndex = index;

    const p = galleryMasterData[currentPhotoIndex];
    if (!p) return;

    if (lightboxImg) {
      lightboxImg.src = p.img;
      lightboxImg.alt = p.title;
    }
    if (lightboxTag) lightboxTag.textContent = p.tag;
    if (lightboxTitle) lightboxTitle.textContent = p.title;
    if (lightboxDesc) lightboxDesc.textContent = p.desc + ' (Événement lié : ' + p.event_name + ')';
    if (lightboxDate) lightboxDate.textContent = '📅 ' + p.date + ' • Photo ' + (currentPhotoIndex + 1) + '/' + galleryMasterData.length;
    if (lightboxFbLink) lightboxFbLink.href = p.fb_url;
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
      showLightboxPhoto(idx);
      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxPhoto(currentPhotoIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxPhoto(currentPhotoIndex + 1);
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // Navigation au Clavier (Échap, Flèches Gauche / Droite)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay) modalOverlay.classList.remove('active');
      if (lightboxModal) lightboxModal.classList.remove('active');
    } else if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'ArrowLeft') showLightboxPhoto(currentPhotoIndex - 1);
      if (e.key === 'ArrowRight') showLightboxPhoto(currentPhotoIndex + 1);
    }
  });

  // 10. CARTE DE MEMBRE VIRTUELLE EN TEMPS RÉEL
  const inputName = document.getElementById('card-input-name');
  const inputYear = document.getElementById('card-input-year');
  const inputDomain = document.getElementById('card-input-domain');

  const cardDisplayName = document.getElementById('card-display-name');
  const cardDisplayYear = document.getElementById('card-display-year');
  const cardDisplayDomain = document.getElementById('card-display-domain');

  if (inputName && cardDisplayName) {
    inputName.addEventListener('input', (e) => {
      cardDisplayName.textContent = e.target.value.trim() || 'NOM & PRÉNOM';
    });
  }

  if (inputYear && cardDisplayYear) {
    inputYear.addEventListener('input', (e) => {
      cardDisplayYear.textContent = e.target.value.trim() || '2025';
    });
  }

  if (inputDomain && cardDisplayDomain) {
    inputDomain.addEventListener('change', (e) => {
      cardDisplayDomain.textContent = e.target.value || 'Management KAIZEN';
    });
  }

  // Formulaire d'Adhésion
  const memberForm = document.getElementById('membership-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (memberForm) {
    memberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        memberForm.reset();
        setTimeout(() => {
          formSuccessAlert.style.display = 'none';
        }, 5000);
      }
    });
  }

  // 11. TÉLÉCHARGEMENT DU LOGO OFFICIEL
  const downloadSvgBtn = document.getElementById('btn-download-svg');
  if (downloadSvgBtn) {
    downloadSvgBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = 'assets/images/logo-absfj.svg';
      link.download = 'ABSFJ_Logo_Officiel_HD.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const downloadBadgeBtn = document.getElementById('btn-download-badge');
  if (downloadBadgeBtn) {
    downloadBadgeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = document.createElement('a');
      link.href = 'assets/images/logo-absfj-badge.svg';
      link.download = 'ABSFJ_Badge_Officiel_Sceau.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
