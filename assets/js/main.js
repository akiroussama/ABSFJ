/**
 * ABSFJ TUNISIE - Interactive Application Script
 * Gère le mode sombre, le filtre d'événements, la carte virtuelle et l'animation Sakura
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

  // 2. MENU MOBILE HAMBURGER
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

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
    const petalCount = 35; // Subtil et élégant

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
        // Forme de pétale ovale effilée
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
      p.y = Math.random() * height; // Répartition initiale
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

  // 4. FILTRAGE DES ÉVÉNEMENTS (ISSU DE LA PAGE FACEBOOK)
  const filterButtons = document.querySelectorAll('.filter-btn');
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
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. GESTION DU MODAL DE DÉTAIL D'ÉVÉNEMENT
  const modalOverlay = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-description');
  const modalClose = document.getElementById('modal-close');

  const eventDetailsData = {
    'ag-2026': {
      title: "1ère Assemblée Générale Ordinaire de l'ABSFJ",
      date: "29 Janvier 2026 • Siège de l'UTICA, Tunis",
      desc: "L'ABSFJ a tenu sa première assemblée générale avec une forte mobilisation des anciens stagiaires de la JICA. M. Jamel Boujdaria a exposé le bilan moral et financier de l'association un an après son lancement. Des comités thématiques ont été constitués pour déployer des initiatives concrètes : guide d'accueil touristique spécialisé pour les visiteurs japonais en Tunisie, développement d'émulsifiants naturels à haute valeur ajoutée, et renforcement du réseau d'entraide."
    },
    'kaizen-climat': {
      title: "Séminaire National : Approche Kaizen pour le Climat & Décarbonation",
      date: "29 Juin 2026 • Tunis (Partenariat JICA & Ministère de l'Industrie)",
      desc: "Co-organisé avec le Bureau de la JICA en Tunisie, ce séminaire d'envergure a mis en lumière la contribution déterminante de la méthodologie japonaise KAIZEN (5S, chasse aux gaspillages Muda, efficience énergétique) pour aider les entreprises industrielles et de services tunisiennes à réussir leur transition verte et leur décarbonation."
    },
    'fukuoka-beja': {
      title: "Projet Pilote : Méthode Fukuoka à la Décharge de Béja",
      date: "Mission Continue 2025-2026 • Béja, Tunisie",
      desc: "En collaboration avec l'ANGED et l'institut nippon EX Research Institute, l'ABSFJ appuie le projet d'enfouissement semi-aérobie des déchets dit 'Méthode de Fukuoka'. Cette technique japonaise éprouvée permet d'accélérer la décomposition des déchets tout en réduisant drastiquement les émanations de gaz méthane."
    },
    'lancement-2025': {
      title: "Cérémonie Officielle de Lancement de l'ABSFJ",
      date: "14 Février 2025 • Cité des Sciences à Tunis",
      desc: "Événement fondateur marquant la naissance officielle de l'association, en présence de l'Ambassadeur du Japon en Tunisie, du Représentant Résident de la JICA et de plus de 200 hauts cadres, ingénieurs et chercheurs tunisiens formés au Japon. L'association scelle le trait d'union entre 50 ans de coopération et l'avenir bilatéral."
    },
    'kaizen-sante': {
      title: "Atelier KAIZEN dans le Management Hospitalier",
      date: "Octobre 2025 • Hôpitaux Universitaires & ENSIT",
      desc: "Transfert des outils d'amélioration continue et de gestion des flux patients dans les structures hospitalières tunisiennes, animé par des experts tunisiens formés au Japon dans le cadre du programme JICA Santé."
    },
    'reseau-afrique': {
      title: "Forum Panafricain des Associations Alumni JICA",
      date: "Novembre 2025 • Plateforme Virtuelle & Présentielle",
      desc: "Rencontre d'échanges d'expertises entre l'ABSFJ et les associations de bénéficiaires de la JICA à travers toute l'Afrique, renforçant la coopération Sud-Sud et triangulaire (Tunisie-Japon-Afrique) initiée lors de la TICAD."
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const eventKey = button.getAttribute('data-event-id');
      const data = eventDetailsData[eventKey];
      if (data && modalOverlay) {
        modalTitle.textContent = data.title;
        modalDate.textContent = data.date;
        modalDesc.textContent = data.desc;
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

  // 6. CARTE DE MEMBRE VIRTUELLE EN TEMPS RÉEL
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

  // Soumission Formulaire d'Adhésion
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

  // 7. TÉLÉCHARGEMENT DU LOGO OFFICIEL
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
