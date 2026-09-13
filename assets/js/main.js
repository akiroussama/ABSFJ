/** ABSFJ — theme, navigation, sakura & jasmine and accessible photo archives. */
document.addEventListener("DOMContentLoaded", () => {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const themeButton = document.getElementById("theme-toggle");
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("absfj-theme");
  } catch {
    /* Storage is optional. */
  }
  const initialTheme =
    savedTheme === "dark" || savedTheme === "light"
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("absfj-theme", theme);
    } catch {
      /* Keep the in-memory preference. */
    }
    themeButton.setAttribute(
      "aria-label",
      theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre",
    );
    themeButton.innerHTML =
      theme === "dark"
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  applyTheme(initialTheme);
  themeButton.addEventListener("click", () =>
    applyTheme(
      document.documentElement.dataset.theme === "dark" ? "light" : "dark",
    ),
  );

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const header = document.querySelector(".site-header");
  function setMenu(open) {
    navLinks.classList.toggle("show", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Fermer le menu" : "Ouvrir le menu",
    );
    menuToggle.textContent = open ? "×" : "☰";
  }
  menuToggle.addEventListener("click", () =>
    setMenu(!navLinks.classList.contains("show")),
  );
  navLinks
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("click", (e) => {
    if (!header.contains(e.target)) setMenu(false);
  });
  window.matchMedia("(min-width: 1121px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });
  const sections = [...document.querySelectorAll("section[id], footer[id]")];
  const navigation = [...document.querySelectorAll(".nav-link")];
  let scrollFrame = 0;
  function updateNavigation() {
    header.classList.toggle("scrolled", window.scrollY > 40);
    const position = window.scrollY + header.offsetHeight + 45;
    const section = sections.find(
      (section) =>
        position >= section.offsetTop &&
        position < section.offsetTop + section.offsetHeight,
    );
    if (section)
      navigation.forEach((link) => {
        const active =
          link.hash ===
          "#" + (section.id === "bureau" ? "a-propos" : section.id);
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    scrollFrame = 0;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateNavigation);
    },
    { passive: true },
  );
  updateNavigation();

  // Botanical miniatures: six cached silk/porcelain studies, carried by a slow breeze.
  const canvas = document.getElementById("sakura-canvas");
  const ctx = canvas?.getContext("2d");
  if (ctx) {
    let width,
      height,
      frame = 0,
      lastTime = 0,
      flowers = [];
    function flowerSprite(jasmine, variation) {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 256;
      const brush = sprite.getContext("2d");
      brush.scale(2, 2);
      brush.translate(64, 64);

      // An asymmetric sage leaf gives the white jasmine a quiet botanical signature.
      if (jasmine) {
        brush.save();
        brush.rotate(-0.35 + variation * 0.24);
        const leaf = brush.createLinearGradient(9, 15, 40, 49);
        leaf.addColorStop(0, "#536c59");
        leaf.addColorStop(0.5, "#80977a");
        leaf.addColorStop(1, "#b5bea0");
        brush.fillStyle = leaf;
        brush.beginPath();
        brush.moveTo(7, 11);
        brush.bezierCurveTo(32, 12, 44, 28, 43, 50);
        brush.bezierCurveTo(20, 45, 11, 33, 7, 11);
        brush.fill();
        brush.strokeStyle = "#d6d6b496";
        brush.lineWidth = 0.7;
        brush.beginPath();
        brush.moveTo(10, 15);
        brush.quadraticCurveTo(29, 30, 40, 46);
        brush.stroke();
        brush.restore();
      }

      const petals = jasmine ? 7 : 5;
      for (let i = 0; i < petals; i++) {
        brush.save();
        const irregularity = Math.sin(i * 2.4 + variation * 1.7);
        brush.rotate((i * Math.PI * 2) / petals + irregularity * 0.065);
        brush.scale(1 + irregularity * 0.06, 0.94 + irregularity * 0.06);

        // A coloured underside and an off-centre highlight suggest a folded surface.
        const wash = jasmine
          ? brush.createLinearGradient(-15, -23, 15, -16)
          : brush.createLinearGradient(-18, 1, 13, -43);
        wash.addColorStop(0, jasmine ? "#8c9d88" : "#a84969");
        wash.addColorStop(0.28, jasmine ? "#dce2d4" : "#d7809c");
        wash.addColorStop(0.6, jasmine ? "#ffffff" : "#f2b9c9");
        wash.addColorStop(0.84, jasmine ? "#f9f6e9" : "#ffe3e8");
        wash.addColorStop(1, jasmine ? "#aebca2" : "#efb1c4");
        brush.fillStyle = wash;
        brush.shadowColor = jasmine ? "#344f467a" : "#87375340";
        brush.shadowBlur = 3;
        brush.shadowOffsetX = -0.8;
        brush.shadowOffsetY = 1.8;
        brush.beginPath();
        brush.moveTo(-2, 5);
        if (jasmine) {
          // Twisted lance-shaped petals, rather than a flat outlined star.
          brush.bezierCurveTo(-15, -5, -17, -26, -5, -45);
          brush.bezierCurveTo(-1, -49, 17, -30, 12, -15);
          brush.bezierCurveTo(10, -4, 3, 1, -2, 5);
        } else {
          // Broad silk lobes and a small V-shaped cherry-blossom notch.
          brush.bezierCurveTo(-13, -5, -26, -24, -17, -39);
          brush.bezierCurveTo(-13, -47, -7, -48, -3, -43);
          brush.lineTo(1, -36);
          brush.lineTo(5, -44);
          brush.bezierCurveTo(16, -49, 25, -31, 16, -16);
          brush.bezierCurveTo(11, -7, 4, 0, -2, 5);
        }
        brush.closePath();
        brush.fill();
        brush.shadowColor = "transparent";
        if (jasmine) {
          // Only the shaded edge is defined; the lit edge melts into the ivory.
          const edge = brush.createLinearGradient(-15, 0, 12, -37);
          edge.addColorStop(0, "#5c716087");
          edge.addColorStop(0.55, "#89997b66");
          edge.addColorStop(1, "#ffffff90");
          brush.strokeStyle = edge;
          brush.lineWidth = 1.3;
          brush.stroke();
        }
        brush.clip();

        // A translucent fold catches the light on one side of each petal.
        const fold = brush.createLinearGradient(-7, -19, 10, -21);
        fold.addColorStop(0, "#ffffff00");
        fold.addColorStop(0.48, jasmine ? "#ffffffa8" : "#fff5f29c");
        fold.addColorStop(0.58, jasmine ? "#9ca98c38" : "#b7658430");
        fold.addColorStop(1, "#ffffff00");
        brush.fillStyle = fold;
        brush.beginPath();
        brush.moveTo(-2, 4);
        brush.bezierCurveTo(-7, -12, 7, -27, jasmine ? -5 : 1, -45);
        brush.quadraticCurveTo(20, -22, 8, -4);
        brush.closePath();
        brush.fill();

        brush.strokeStyle = jasmine ? "#7d906338" : "#a94d7438";
        brush.lineWidth = 0.65;
        for (const side of [-1, 1]) {
          brush.beginPath();
          brush.moveTo(0, -3);
          brush.quadraticCurveTo(side * 9, -16, side * 10, -29);
          brush.stroke();
        }
        brush.strokeStyle = jasmine ? "#ffffffb8" : "#fff3efb0";
        brush.lineWidth = 0.85;
        brush.beginPath();
        brush.moveTo(jasmine ? -5 : 5, -43);
        brush.quadraticCurveTo(17, -30, 10, -15);
        brush.stroke();
        brush.restore();
      }

      const heart = brush.createRadialGradient(-1, -2, 0, 0, 0, 12);
      heart.addColorStop(0, jasmine ? "#b4bd7b" : "#aa4e70");
      heart.addColorStop(0.48, jasmine ? "#d6d6a6" : "#d987a0");
      heart.addColorStop(1, jasmine ? "#dedec200" : "#e5a3ba00");
      brush.fillStyle = heart;
      brush.beginPath();
      brush.arc(0, 0, 12, 0, Math.PI * 2);
      brush.fill();

      // Fine champagne stamens, with tiny points of light rather than sparkles.
      const stamens = jasmine ? 7 : 12;
      brush.strokeStyle = jasmine ? "#929e64" : "#a25e79";
      brush.lineWidth = 0.7;
      for (let i = 0; i < stamens; i++) {
        const angle = (i * Math.PI * 2) / stamens;
        const radius = jasmine ? 5.5 : 9 + (i % 3) * 1.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        brush.beginPath();
        brush.moveTo(x * 0.25, y * 0.25);
        brush.quadraticCurveTo(x * 0.6 - 1, y * 0.5, x, y);
        brush.stroke();
        brush.fillStyle = jasmine ? "#b6a461" : "#c7a16b";
        brush.beginPath();
        brush.arc(x, y, jasmine ? 1 : 1.4, 0, Math.PI * 2);
        brush.fill();
        brush.fillStyle = "#fff4d7";
        brush.beginPath();
        brush.arc(x - 0.3, y - 0.4, 0.5, 0, Math.PI * 2);
        brush.fill();
      }
      return sprite;
    }
    const sprites = [false, true].map((jasmine) =>
      Array.from({ length: 3 }, (_, variation) =>
        flowerSprite(jasmine, variation),
      ),
    );
    function flower(randomY = false, kind = Math.round(Math.random())) {
      const depth = Math.random();
      return {
        kind,
        variation: Math.floor(Math.random() * 3),
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -60,
        size: (kind === 1 ? 43 : 39) + depth * 19,
        speed: 8 + depth * 10,
        drift: (Math.random() - 0.45) * 7,
        angle: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.16,
        opacity: kind === 1 ? 0.88 + depth * 0.1 : 0.58 + depth * 0.2,
      };
    }
    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flowers = Array.from({ length: width < 760 ? 8 : 18 }, (_, i) =>
        flower(true, i % 2),
      );
    }
    function animate(time) {
      const dt = Math.min((time - lastTime) / 1000 || 0.016, 0.04);
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      flowers.forEach((p, i) => {
        p.phase += dt * 0.34;
        p.x += (p.drift + Math.sin(p.phase) * 12) * dt;
        p.y += (p.speed + Math.cos(p.phase * 0.8) * 2) * dt;
        p.angle += p.spin * dt;
        if (p.y > height + 60 || p.x > width + 60 || p.x < -60) {
          flowers[i] = flower(false, p.kind);
          return;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle + Math.sin(p.phase * 0.7) * 0.16);
        ctx.transform(
          1,
          Math.sin(p.phase) * 0.09,
          0,
          0.82 + Math.cos(p.phase) * 0.16,
          0,
          0,
        );
        ctx.globalAlpha = p.opacity;
        ctx.drawImage(
          sprites[p.kind][p.variation],
          -p.size / 2,
          -p.size / 2,
          p.size,
          p.size,
        );
        ctx.restore();
      });
      frame = requestAnimationFrame(animate);
    }
    function syncAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (!motion.matches && !document.hidden)
        frame = requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, width, height);
    }
    resizeCanvas();
    syncAnimation();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
  }

  const eventDetailsData = {
    "ia-distinction-akir": {
      id: "ia-distinction-akir",
      category: "reseau",
      badge: "Excellence & IA",
      date: "09 Septembre 2026",
      location: "Tokyo • Tunis",
      title:
        "Accueil d'Honneur et Distinction de M. Oussama Akir au sein de l'ABSFJ",
      summary:
        "Doctorant en intelligence artificielle et expert primé à Tokyo parmi 25 000 candidats issus de 120 pays. Une fierté nationale et une compétence d'avenir pour l'ABSFJ.",
      full_text:
        "Nous avons l’immense honneur d’accueillir au sein de notre Association M. Oussama Akir, doctorant en intelligence artificielle (IA).\n\nSon parcours exceptionnel mérite d’être particulièrement salué : M. Akir a remporté le Premier Prix d’un concours international organisé à Tokyo, auquel ont participé près de 25 000 candidats issus de 120 pays.\n\nCette remarquable distinction témoigne de son excellence, de son talent et de son engagement dans le domaine de l’intelligence artificielle. Elle constitue également une grande fierté pour notre Association et illustre pleinement la richesse des compétences et du savoir-faire des Tunisiens formés et engagés dans des domaines d’avenir.",
      main_image: "assets/images/events/photo_122186560898769937.jpg",
      images: ["assets/images/events/photo_122186560898769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid03365BHg6MCskR3cQGZighBeLAMiJzPuHVYPVgSzcRXndG4tev4z2DqgvicR4hC5dSl&id=61573098115073",
    },
    "dejeuner-abe-jica": {
      id: "dejeuner-abe-jica",
      category: "reseau",
      badge: "Initiative ABE & Diplomatie",
      date: "01 Septembre 2026",
      location: "Ambassade du Japon & Bureau JICA, Tunis",
      title:
        "Déjeuner de Travail en l’Honneur des Jeunes Talents de l’Initiative ABE",
      summary:
        "Rencontre de haut niveau réunissant le Président Jamel Boujdaria, Mme Miyata Mayumi (JICA), la Première Secrétaire de l'Ambassade du Japon et 4 jeunes talents dont les lauréats ABE et experts IA.",
      full_text:
        "À la suite de l’invitation de l’Ambassade du Japon en Tunisie et du Bureau de la JICA à Tunis, le Président de l’Association des Bénéficiaires de Sessions de Formation au Japon (ABSFJ) a participé à un déjeuner de travail organisé en l’honneur de quatre jeunes talents tunisiens, dont trois participants à l’Initiative ABE (African Business Education Initiative for Youth) :\n- M. Driss LAABIDI (13ᵉ promotion ABE)\n- M. Bechir HENTATI (10ᵉ promotion ABE)\n- M. Akrem JABRI (4ᵉ promotion ABE)\n- M. Oussama AKIR (GCI World 2026 et expert IA, lauréat à Tokyo).\n\nLa rencontre a réuni, du côté japonais, Mme Miyata Mayumi, Représentante Résidente de la JICA à Tunis, accompagnée de ses collaborateurs, ainsi que la Première Secrétaire de l’Ambassade du Japon en Tunisie et des représentants de la Chambre de Commerce Tuniso-Japonaise (CCITJ). Le Président de l’ABSFJ a invité les quatre talents à rejoindre l’Association pour valoriser leurs compétences au profit de nos adhérents.",
      main_image: "assets/images/events/photo_122185797686769937.jpg",
      images: ["assets/images/events/photo_122185797686769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0cWLTgJZrcYGrdKxGyNbzbs3fqoN5xAwS65VeMA9mSgV5wJEyBUVzsLuGPav398bql&id=61573098115073",
    },
    "reseau-afrique-alumni": {
      id: "reseau-afrique-alumni",
      category: "reseau",
      badge: "Réseau Panafricain",
      date: "22 Août 2026",
      location: "Visioconférence Panafricaine JICA",
      title:
        "Réunion du Réseau des Associations Africaines d’Anciens Stagiaires de la JICA",
      summary:
        "Échanges multilatéraux présidés par Djibouti avec le Gabon, le Burkina Faso, le Mali, la RDC et la JICA pour bâtir des initiatives communes panafricaines.",
      full_text:
        "Le Président de l’ABSFJ a participé à une réunion en ligne du Réseau des associations africaines d’anciens stagiaires de la JICA, présidée par le Président de l’Association de Djibouti et réunissant les représentants du Gabon, du Burkina Faso, du Mali, de Djibouti et de la RD Congo.\n\nLa séance d’ouverture a été assurée par la Chargée des projets de la JICA à Djibouti. Le Président de l’ABSFJ a présenté un bilan de l'Association et affirmé la disponibilité de la Tunisie pour catalyser des synergies d'envergure africaine, avec l'appui constant et bienveillant du bureau JICA Tunis.",
      main_image: "assets/images/events/photo_122184892514769937.jpg",
      images: ["assets/images/events/photo_122184892514769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0o6eEX5K2rJ56En7RdsaYdxuMhbunr3xfAZKA2RgSF2NBTHqmxChp8H3pQqb2jS4rl&id=61573098115073",
    },
    "accueil-volontaires-japon": {
      id: "accueil-volontaires-japon",
      category: "amitie",
      badge: "Amitié Tunisie–Japon",
      date: "14 Août 2026",
      location: "Tunis, Tunisie",
      title: "Accueil Chaleureux des Volontaires et Amis Japonais en Tunisie",
      summary:
        "L'ABSFJ souhaite la bienvenue aux volontaires et coopérants japonais arrivés en Tunisie et réaffirme son engagement à les accompagner.",
      full_text:
        "🇯🇵🇹🇳 Bienvenue en Tunisie à nos amis et volontaires japonais ! Nous leur souhaitons un excellent séjour parmi nous, riche en découvertes, en échanges et en belles expériences.\n\nNotre Association est pleinement à leur disposition pour les accompagner et les soutenir, afin de contribuer à la réussite de leur mission dans notre pays. Bienvenue en Tunisie et très bon séjour à tous ! 🌿🤝",
      main_image: "assets/images/events/photo_122184036554769937.jpg",
      images: ["assets/images/events/photo_122184036554769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0exxtBkcRDugkZjxgrxXVhifPZ7m2HPyckeTd3CKHcYdd4vgisBaa6u6oadRcQn1Jl&id=61573098115073",
    },
    "felicitations-laureats": {
      id: "felicitations-laureats",
      category: "reseau",
      badge: "Excellence & Promotion",
      date: "30 Juillet 2026",
      location: "Tunis • Programmes JICA",
      title: "Célébration et Félicitations aux Lauréats des Formations JICA",
      summary:
        "Remise solennelle de distinctions et hommages aux lauréats des sessions de formation de la JICA au Japon. Galerie de 6 photographies officielles.",
      full_text:
        "« Toutes mes félicitations à vous deux. Vous faites notre fierté. »\n\nCélébration des cadres et experts tunisiens ayant brillamment accompli leurs cycles de perfectionnement et de co-création de connaissances au Japon. Une illustration vivante de la rigueur et du dévouement de nos alumni au service de la nation.",
      main_image: "assets/images/events/photo_1352334837016043.jpg",
      images: [
        "assets/images/events/photo_1352334837016043.jpg",
        "assets/images/events/photo_1352334830349377.jpg",
        "assets/images/events/photo_1352334820349378.jpg",
        "assets/images/events/photo_1352334823682711.jpg",
        "assets/images/events/photo_1352334827016044.jpg",
        "assets/images/events/photo_122182593866769937.jpg",
      ],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    "seminaire-penthouse-kaizen": {
      id: "seminaire-penthouse-kaizen",
      category: "kaizen",
      badge: "KAIZEN & Décarbonation",
      date: "09 Juillet 2026",
      location: "Hôtel The Penthouse, Tunis",
      title:
        "Séminaire National : « L'Impact de l'Approche Kaizen sur le Changement Climatique »",
      summary:
        "Conférence de référence co-organisée avec la JICA, réunissant l'Ambassadeur du Japon, Mme Miyata Mayumi, BSB Toyota, l'ANME et le Ministère de l'Industrie.",
      full_text:
        "L'Hôtel The Penthouse a abrité la conférence scientifique intitulée « L'impact de l'approche Kaizen face au changement climatique et son rôle dans la décarbonation », avec la participation de hauts responsables tunisiens et japonais, de chefs d'entreprises et de chercheurs.\n\nInterventions remarquées du Président Jamel Boujdaria, de Mme Miyata Mayumi (Représentante Résidente JICA), de S.E. l'Ambassadeur du Japon, de M. Nacef Belkhiria (Vice-Président BSB Toyota, CCITJ), de M. Nafeh Baccari (DG ANME) et de M. Slim Ferchichi (DG Ministère de l'Industrie).\n\nLe séminaire a démontré que la philosophie Kaizen constitue une méthode d'excellence pour réduire les pertes énergétiques, décarboner les processus de fabrication et accélérer la transition écologique.",
      main_image: "assets/images/events/photo_122180433800769937.jpg",
      images: ["assets/images/events/photo_122180433800769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02KkN9FLXWgwf2mXo8hjpYvqZW3fbQA8bTqoWnw26oDtnJ7BVCzkK3QjrFjnfXMfLvl&id=61573098115073",
    },
    "football-amitie-japon": {
      id: "football-amitie-japon",
      category: "amitie",
      badge: "Sport & Fair-Play",
      date: "20 Juin 2026",
      location: "Juventus Academy Club, Tunis",
      title:
        "Rencontre Footballistique Tuniso-Japonaise d'Amitié et de Fair-Play",
      summary:
        "Match amical réunissant de jeunes Tunisiens et Japonais et leurs familles, en présence de S.E. M. Saito Jun, Ambassadeur du Japon, et de Mme Miyata Mayumi.",
      full_text:
        "Une manifestation sportive festive réunissant une cinquantaine de jeunes participants tunisiens et japonais et leurs familles à la Juventus Academy Club, organisée par l’ABSFJ et la JICA dans le cadre des préparatifs du match officiel Tunisie - Japon de la Coupe du Monde 2026.\n\nL'événement s'est déroulé en présence de Son Excellence Monsieur Saito Jun, Ambassadeur du Japon en Tunisie, et de Madame Miyata Mayumi, Représentante Résidente de la JICA. Les meilleurs joueurs U13 ont été primés pour leur remarquable esprit sportif et leur fraternité.",
      main_image: "assets/images/events/photo_122178574154769937.jpg",
      images: [
        "assets/images/events/photo_122178574154769937.jpg",
        "assets/images/events/photo_122176625234769937.jpg",
      ],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0yEQrD4wBBC6gY9NUrUAVgNkR48BYjPLFaKtHR3289yo4Ma2NFzxz8fWSJDNDKorKl&id=61573098115073",
    },
    "visite-mitsui-yoko-jica": {
      id: "visite-mitsui-yoko-jica",
      category: "reseau",
      badge: "Direction JICA Tokyo",
      date: "16 Juin 2026",
      location: "Tunis • Siège Résidence JICA",
      title:
        "Déjeuner-Débat Stratégique avec Mme Mitsui Yoko, Senior VP de la JICA Tokyo",
      summary:
        "Visite officielle de Mme Mitsui Yoko, Senior Vice President de la JICA Tokyo. Présentation des réalisations de l'ABSFJ et consolidation du partenariat futur.",
      full_text:
        "À l’occasion de la visite de travail en Tunisie de Mme Mitsui Yoko, Senior Vice President de la JICA, accompagnée de Mme Kawamura Reiko (responsable Moyen-Orient JICA Tokyo) et de Mme Miyata Mayumi, un déjeuner-débat s'est tenu à Tunis.\n\nM. Jamel Boujdaria a exposé les missions et les avancées de l’Association, mettant en avant la promotion de la démarche Kaizen et l'engagement en faveur du développement durable. Mme Mitsui a salué le dynamisme remarquable de l’ABSFJ et réaffirmé le soutien indéfectible de la JICA.",
      main_image: "assets/images/events/photo_122178214784769937.jpg",
      images: ["assets/images/events/photo_122178214784769937.jpg"],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0NRzPn8HRD9NWRgxMMLVgKpPaS5oUX3tAdqqvMy7cms3xERrfZShyHLRSGZyaRVGpl&id=61573098115073",
    },
    "reception-70-ans-empereur": {
      id: "reception-70-ans-empereur",
      category: "reseau",
      badge: "Diplomatie & 70 Ans",
      date: "30 Mars 2026",
      location: "Résidence de l'Ambassade du Japon, Tunis",
      title:
        "Célébration du 70ᵉ Anniversaire des Relations Bilatérales & Fête de l'Empereur",
      summary:
        "Participation solennelle de l'ABSFJ à la réception diplomatique de l'Ambassade du Japon marquant les 70 ans de liens Tunisie–Japon. Galerie de 5 photos officielles.",
      full_text:
        "L’Association a pris part activement à la réception solennelle organisée par l’Ambassade du Japon en Tunisie à l’occasion de la célébration de l’anniversaire de Sa Majesté l’Empereur du Japon, un événement marquant également le 70ᵉ anniversaire des relations diplomatiques tuniso-japonaises.\n\nCette participation a constitué une opportunité majeure pour présenter les accomplissements de l'ABSFJ, dévoiler le programme 2026 et valoriser le kakemono officiel de l'association aux côtés des plus hautes autorités diplomatiques.",
      main_image: "assets/images/events/photo_122170759898769937.jpg",
      images: [
        "assets/images/events/photo_122170759898769937.jpg",
        "assets/images/events/photo_122170760918769937.jpg",
        "assets/images/events/photo_122170759646769937.jpg",
        "assets/images/events/photo_122170759712769937.jpg",
        "assets/images/events/photo_122170759574769937.jpg",
      ],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
    "projet-decharge-beja": {
      id: "projet-decharge-beja",
      category: "ecologie",
      badge: "Écologie & Méthode Fukuoka",
      date: "2025 - 2026",
      location: "Décharge de Béja, Tunisie",
      title:
        "Méthode Japonaise de Fukuoka à la Décharge de Béja (ANGED & EX Research)",
      summary:
        "Projet d'ingénierie écologique nippone réduisant drastiquement les émissions de gaz méthane par aération semi-aérobie.",
      full_text:
        "Dans le cadre de la coopération entre la JICA, l'ANGED et le cabinet japonais EX Research Institute, l'ABSFJ soutient le déploiement de la méthode d'enfouissement semi-aérobie 'Fukuoka' à la décharge contrôlée de Béja.\n\nCette technique innovante, reconnue par les Nations Unies, permet une décomposition accélérée de la matière organique, diminue les lixiviats et prévient le réchauffement climatique.",
      main_image: "assets/images/events/photo_1038482885850153.jpg",
      images: [
        "assets/images/events/photo_1038482885850153.jpg",
        "assets/images/event-fukuoka-beja.jpg",
      ],
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0g4XQQwWMNcWnNEr2V9haeewjtftvUSuMRokf5C5DdhFUatdY7jZS3MzC2xLY93AKl&id=61573098115073",
    },
    "ag-ordinaire-utica": {
      id: "ag-ordinaire-utica",
      category: "ag",
      badge: "Assemblée Générale",
      date: "29 Janvier 2026",
      location: "Siège de l'UTICA, Tunis",
      title: "1ère Assemblée Générale Ordinaire de l'ABSFJ",
      summary:
        "Bilan moral et financier d'une première année de mandat réussie sous la présidence de M. Jamel Boujdaria et structuration des comités opérationnels.",
      full_text:
        "Réunie au siège de l'UTICA à Tunis, la première assemblée générale ordinaire a rassemblé les membres fondateurs et anciens boursiers JICA.\n\nAdoption à l'unanimité des rapports d'activités, validation du budget prévisionnel et structuration de comités sectoriels (Industrie 4.0, Énergie, Tourisme japonais, Transfert technologique).",
      main_image: "assets/images/event-cite-sciences.jpg",
      images: ["assets/images/event-cite-sciences.jpg"],
      fb_url: "https://www.facebook.com/61573098115073/",
    },
    "lancement-solennel-cite-sciences": {
      id: "lancement-solennel-cite-sciences",
      category: "ag",
      badge: "Fondation Historique",
      date: "14 Février 2025",
      location: "Cité des Sciences de Tunis",
      title: "Cérémonie Solennelle de Lancement de l'ABSFJ",
      summary:
        "Naissance officielle de l'association réunissant l'Ambassade du Japon, la JICA et plus de 200 cadres et experts formés au Japon depuis 1975.",
      full_text:
        "Cérémonie inaugurale historique scellant 50 années de coopération technique et humaine. Allocutions solennelles de Son Excellence l'Ambassadeur du Japon et de la Représentation Résidente de la JICA, saluant la création de ce trait d'union patriotique et scientifique.",
      main_image: "assets/images/event-cite-sciences.jpg",
      images: ["assets/images/event-cite-sciences.jpg"],
      fb_url: "https://www.facebook.com/61573098115073/",
    },
  };

  const galleryMasterData = [
    {
      id: "p1",
      category: "talents",
      tag: "IA & Compétences",
      img: "assets/images/events/photo_122186560898769937.jpg",
      title: "M. Oussama Akir • 1er Prix International en IA à Tokyo",
      date: "09 Septembre 2026",
      event_id: "ia-distinction-akir",
      event_name: "Accueil d'Honneur de M. Oussama Akir",
      desc: "Distinction d'excellence décernée à Tokyo à M. Oussama Akir parmi 25 000 candidats internationaux de 120 pays.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid03365BHg6MCskR3cQGZighBeLAMiJzPuHVYPVgSzcRXndG4tev4z2DqgvicR4hC5dSl&id=61573098115073",
    },
    {
      id: "p2",
      category: "diplomatie",
      tag: "Initiative ABE & JICA",
      img: "assets/images/events/photo_122185797686769937.jpg",
      title: "Déjeuner de Travail avec la JICA et les Boursiers ABE",
      date: "01 Septembre 2026",
      event_id: "dejeuner-abe-jica",
      event_name: "Déjeuner de Travail Initiative ABE",
      desc: "M. Jamel Boujdaria, Mme Miyata Mayumi (JICA), la 1ère Secrétaire de l'Ambassade du Japon et les 4 jeunes talents tunisiens.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0cWLTgJZrcYGrdKxGyNbzbs3fqoN5xAwS65VeMA9mSgV5wJEyBUVzsLuGPav398bql&id=61573098115073",
    },
    {
      id: "p3",
      category: "ecologie",
      tag: "Méthode Fukuoka",
      img: "assets/images/events/photo_1038482885850153.jpg",
      title:
        "Projet Pilote Fukuoka à la Décharge de Béja (ANGED & EX Research)",
      date: "24 Août 2026",
      event_id: "projet-decharge-beja",
      event_name: "Décharge de Béja - Méthode Fukuoka",
      desc: "Revue technique et médiatique de l'expérience d'enfouissement semi-aérobie réduisant le méthane à Béja.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0g4XQQwWMNcWnNEr2V9haeewjtftvUSuMRokf5C5DdhFUatdY7jZS3MzC2xLY93AKl&id=61573098115073",
    },
    {
      id: "p4",
      category: "afrique",
      tag: "Réseau Alumni Afrique",
      img: "assets/images/events/photo_122184892514769937.jpg",
      title: "Réunion Panafricaine des Associations d'Anciens Stagiaires JICA",
      date: "22 Août 2026",
      event_id: "reseau-afrique-alumni",
      event_name: "Réseau Panafricain Alumni JICA",
      desc: "Visioconférence multilatérale avec Djibouti, Gabon, Burkina Faso, Mali, RDC et la JICA.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0o6eEX5K2rJ56En7RdsaYdxuMhbunr3xfAZKA2RgSF2NBTHqmxChp8H3pQqb2jS4rl&id=61573098115073",
    },
    {
      id: "p5",
      category: "amitie",
      tag: "Volontaires JICA",
      img: "assets/images/events/photo_122184036554769937.jpg",
      title: "Accueil Chaleureux des Nouveaux Volontaires Japonais en Tunisie",
      date: "14 Août 2026",
      event_id: "accueil-volontaires-japon",
      event_name: "Accueil des Volontaires Japonais",
      desc: "L'ABSFJ souhaite la bienvenue aux volontaires nippons pour une mission féconde en Tunisie.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0exxtBkcRDugkZjxgrxXVhifPZ7m2HPyckeTd3CKHcYdd4vgisBaa6u6oadRcQn1Jl&id=61573098115073",
    },
    {
      id: "p6",
      category: "talents",
      tag: "Félicitations & Fierté",
      img: "assets/images/events/photo_1352334837016043.jpg",
      title: "Célébration des Lauréats Tunisiens des Sessions JICA",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Hommage et reconnaissance aux bénéficiaires de formations spécialisées au Japon.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p7",
      category: "talents",
      tag: "Lauréats JICA",
      img: "assets/images/events/photo_1352334830349377.jpg",
      title: "Remise d'Attestations & Honneurs aux Boursiers JICA",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Reconnaissance de l'excellence académique et technique acquise au Japon.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p8",
      category: "talents",
      tag: "Certificats d'Excellence",
      img: "assets/images/events/photo_1352334820349378.jpg",
      title: "Certificats Officiels & Validation des Compétences Nipponnes",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Validation des compétences de haut niveau transmises par les experts japonais.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p9",
      category: "talents",
      tag: "Alumni d'Élite",
      img: "assets/images/events/photo_1352334823682711.jpg",
      title: "Promotion des Cadres Tunisiens Formés au Japon",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Fierté de la communauté des anciens boursiers JICA en Tunisie.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p10",
      category: "talents",
      tag: "Cérémonie Alumni",
      img: "assets/images/events/photo_1352334827016044.jpg",
      title: "Témoignage de Réussite & Rayonnement Bilatéral",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Mise à l'honneur des parcours d'exception issus de la coopération bilatérale.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p11",
      category: "talents",
      tag: "Insigne & Fierté",
      img: "assets/images/events/photo_122182593866769937.jpg",
      title: "Hommage de l'ABSFJ aux Boursiers Exemplaires",
      date: "30 Juillet 2026",
      event_id: "felicitations-laureats",
      event_name: "Félicitations aux Lauréats",
      desc: "Félicitations fraternelles du Président et du bureau exécutif aux lauréats.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02L5awBmikF5eNhBFQy3diERNtGv9wevAoZLZtfKhVZ6ThwDnXAQCsErFobu2Y4JMtl&id=61573098115073",
    },
    {
      id: "p12",
      category: "kaizen",
      tag: "KAIZEN & Climat",
      img: "assets/images/events/photo_122180433800769937.jpg",
      title: "Tribune Officielle du Séminaire KAIZEN & Décarbonation",
      date: "09 Juillet 2026",
      event_id: "seminaire-penthouse-kaizen",
      event_name: "Séminaire National The Penthouse",
      desc: "Discours d'ouverture de M. Jamel Boujdaria, Mme Miyata Mayumi (JICA) et l'Ambassadeur du Japon à The Penthouse.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02KkN9FLXWgwf2mXo8hjpYvqZW3fbQA8bTqoWnw26oDtnJ7BVCzkK3QjrFjnfXMfLvl&id=61573098115073",
    },
    {
      id: "p13",
      category: "sport",
      tag: "Sport & Amitié",
      img: "assets/images/events/photo_122178574154769937.jpg",
      title:
        "Match Footballistique d'Amitié Tuniso-Japonaise (Juventus Academy)",
      date: "20 Juin 2026",
      event_id: "football-amitie-japon",
      event_name: "Rencontre Footballistique Tuniso-Japonaise",
      desc: "Les équipes de jeunes Tunisiens et Japonais réunies sur le terrain sous l'égide de l'ABSFJ et de la JICA.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0yEQrD4wBBC6gY9NUrUAVgNkR48BYjPLFaKtHR3289yo4Ma2NFzxz8fWSJDNDKorKl&id=61573098115073",
    },
    {
      id: "p14",
      category: "sport",
      tag: "Invitation Jeunesse",
      img: "assets/images/events/photo_122176625234769937.jpg",
      title: "Affiche Officielle de la Rencontre Sportive Tuniso-Japonaise",
      date: "29 Mai 2026",
      event_id: "football-amitie-japon",
      event_name: "Rencontre Footballistique Tuniso-Japonaise",
      desc: "Campagne d'invitation des familles et enfants à célébrer le fair-play et les liens bilatéraux.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid02RByv7p55qh8pcFdp2RnSMCKSVNX2CpsmHRTV3bWysNW83J7RCQMVwUPzxa3TjiPql&id=61573098115073",
    },
    {
      id: "p15",
      category: "diplomatie",
      tag: "Direction JICA Tokyo",
      img: "assets/images/events/photo_122178214784769937.jpg",
      title: "Déjeuner Stratégique avec Mme Mitsui Yoko, Senior VP JICA Tokyo",
      date: "16 Juin 2026",
      event_id: "visite-mitsui-yoko-jica",
      event_name: "Visite Ministérielle JICA Tokyo",
      desc: "Rencontre de haut niveau avec Mme Mitsui Yoko, Mme Kawamura Reiko et Mme Miyata Mayumi.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0NRzPn8HRD9NWRgxMMLVgKpPaS5oUX3tAdqqvMy7cms3xERrfZShyHLRSGZyaRVGpl&id=61573098115073",
    },
    {
      id: "p16",
      category: "diplomatie",
      tag: "Communication Officielle",
      img: "assets/images/events/photo_122176323434769937.jpg",
      title: "Mobilisation & Rayonnement Institutionnel de l'ABSFJ",
      date: "26 Mai 2026",
      event_id: "visite-mitsui-yoko-jica",
      event_name: "Visite Ministérielle JICA Tokyo",
      desc: "Support visuel officiel relayant les initiatives de l'association.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid06z964sqFdjUQDB9A6kS7sMKmukwL9ai5oJ4QsA7CvCApxbTRiLuWJYg29br18zxbl&id=61573098115073",
    },
    {
      id: "p17",
      category: "diplomatie",
      tag: "70 Ans de Diplomatie",
      img: "assets/images/events/photo_122170759898769937.jpg",
      title:
        "Tribune d'Honneur • Célébration des 70 Ans de Liens Diplomatiques",
      date: "30 Mars 2026",
      event_id: "reception-70-ans-empereur",
      event_name: "70 Ans de Relations Bilatérales",
      desc: "Discours à la Résidence de l'Ambassadeur du Japon en l'honneur de Sa Majesté l'Empereur.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
    {
      id: "p18",
      category: "diplomatie",
      tag: "Bureau Exécutif ABSFJ",
      img: "assets/images/events/photo_122170760918769937.jpg",
      title: "Membres du Bureau de l'ABSFJ à la Réception Diplomatique",
      date: "30 Mars 2026",
      event_id: "reception-70-ans-empereur",
      event_name: "70 Ans de Relations Bilatérales",
      desc: "Délégation de l'ABSFJ reçue par les représentants du Japon lors de la fête de l'Empereur.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
    {
      id: "p19",
      category: "diplomatie",
      tag: "Délégation Officielle",
      img: "assets/images/events/photo_122170759646769937.jpg",
      title: "Représentants de l'ABSFJ et Partenaires Institutionnels",
      date: "30 Mars 2026",
      event_id: "reception-70-ans-empereur",
      event_name: "70 Ans de Relations Bilatérales",
      desc: "Rencontre cordiale et renforcement des partenariats avec les diplomates japonais.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
    {
      id: "p20",
      category: "diplomatie",
      tag: "Kakemono Officiel",
      img: "assets/images/events/photo_122170759712769937.jpg",
      title: "Kakemono Solennel de l'ABSFJ à la Cérémonie Diplomatique",
      date: "30 Mars 2026",
      event_id: "reception-70-ans-empereur",
      event_name: "70 Ans de Relations Bilatérales",
      desc: "Présentation du kakemono institutionnel de l'ABSFJ aux côtés des drapeaux tunisien et japonais.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
    {
      id: "p21",
      category: "diplomatie",
      tag: "Réception Impériale",
      img: "assets/images/events/photo_122170759574769937.jpg",
      title: "Vue d'Ensemble de la Réception de l'Ambassade du Japon",
      date: "30 Mars 2026",
      event_id: "reception-70-ans-empereur",
      event_name: "70 Ans de Relations Bilatérales",
      desc: "Célébration festive du 70e anniversaire des relations amicales et diplomatiques Tunisie - Japon.",
      fb_url:
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0K3JYnMeR4FddESuTLHZnYUzuhzttBNFKw6f3dPaGsnLCdPXSwwxkqdnmG4oeyXAol&id=61573098115073",
    },
  ];

  // Shared dialog lifecycle: focus, scroll lock and assistive-technology state.
  let activeDialog = null,
    previousFocus = null,
    previousOverflow = "";
  const background = [...document.body.children].filter(
    (el) => !el.matches(".modal-overlay, .lightbox-overlay, script, canvas"),
  );
  const inertState = new Map();
  function openDialog(dialog) {
    if (activeDialog) closeDialog();
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    activeDialog = dialog;
    dialog.classList.add("active");
    dialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    dialog.querySelector("button")?.focus();
    background.forEach((el) => {
      inertState.set(el, el.inert);
      el.inert = true;
    });
  }
  function closeDialog() {
    if (!activeDialog) return;
    const dialog = activeDialog;
    activeDialog = null;
    background.forEach((el) => {
      el.inert = inertState.get(el) || false;
    });
    inertState.clear();
    document.body.style.overflow = previousOverflow;
    dialog.classList.remove("active");
    previousFocus?.focus({ preventScroll: true });
    dialog.setAttribute("aria-hidden", "true");
  }
  document
    .querySelectorAll(".modal-overlay, .lightbox-overlay")
    .forEach((dialog) =>
      dialog.addEventListener("click", (e) => {
        if (e.target === dialog) closeDialog();
      }),
    );
  ["modal-close", "lightbox-close"].forEach((id) =>
    document.getElementById(id).addEventListener("click", closeDialog),
  );

  function setupFilters(
    buttons,
    items,
    filterAttribute,
    categoryAttribute,
    label,
  ) {
    const status = document.createElement("p");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    buttons[0]?.parentElement.after(status);
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active")),
      );
      button.addEventListener("click", () => {
        const filter = button.getAttribute(filterAttribute);
        buttons.forEach((other) => {
          other.classList.toggle("active", other === button);
          other.setAttribute("aria-pressed", String(other === button));
        });
        let visible = 0;
        items.forEach((item) => {
          item.hidden =
            filter !== "all" && item.getAttribute(categoryAttribute) !== filter;
          if (!item.hidden) visible++;
        });
        status.textContent = `${visible} ${label}`;
      });
    });
  }
  setupFilters(
    [...document.querySelectorAll("[data-filter]")],
    [...document.querySelectorAll(".event-card")],
    "data-filter",
    "data-category",
    "événements affichés",
  );
  setupFilters(
    [...document.querySelectorAll("[data-gfilter]")],
    [...document.querySelectorAll(".gallery-item")],
    "data-gfilter",
    "data-gcategory",
    "photographies affichées",
  );

  const eventModal = document.getElementById("event-modal");
  const modalImg = document.getElementById("modal-img");
  const modalThumbs = document.getElementById("modal-thumbs-container");
  document.querySelectorAll(".open-modal-btn").forEach((button) => {
    button.setAttribute("aria-haspopup", "dialog");
    const data = eventDetailsData[button.dataset.eventId];
    button.setAttribute("aria-label", "Lire : " + data.title);
    button.addEventListener("click", () => {
      document.getElementById("modal-title").textContent = data.title;
      document.getElementById("modal-date").textContent = data.date;
      document.getElementById("modal-location").textContent = data.location;
      document.getElementById("modal-badge").textContent = data.badge;
      document.getElementById("modal-description").textContent =
        data.full_text || data.summary;
      document.getElementById("modal-fb-link").href = data.fb_url;
      modalImg.src = data.main_image;
      modalImg.alt = data.title;
      modalThumbs.replaceChildren();
      modalThumbs.style.display = data.images?.length > 1 ? "flex" : "none";
      if (data.images?.length > 1)
        data.images.forEach((src, i) => {
          const thumb = document.createElement("button");
          thumb.type = "button";
          thumb.className = "modal-thumb" + (i === 0 ? " active" : "");
          thumb.setAttribute("aria-label", "Afficher la photo " + (i + 1));
          thumb.setAttribute("aria-pressed", String(i === 0));
          const img = document.createElement("img");
          img.src = src;
          img.alt = "";
          thumb.append(img);
          thumb.addEventListener("click", () => {
            modalImg.src = src;
            modalImg.alt = data.title + " — Photo " + (i + 1);
            modalThumbs.querySelectorAll("button").forEach((other) => {
              other.classList.toggle("active", other === thumb);
              other.setAttribute("aria-pressed", String(other === thumb));
            });
          });
          modalThumbs.append(thumb);
        });
      openDialog(eventModal);
    });
  });

  const lightbox = document.getElementById("lightbox-modal");
  let currentPhotoIndex = 0;
  function showPhoto(index) {
    currentPhotoIndex =
      (index + galleryMasterData.length) % galleryMasterData.length;
    const photo = galleryMasterData[currentPhotoIndex];
    const img = document.getElementById("lightbox-img");
    img.src = photo.img;
    img.alt = photo.title;
    document.getElementById("lightbox-tag").textContent = photo.tag;
    document.getElementById("lightbox-title").textContent = photo.title;
    document.getElementById("lightbox-desc").textContent =
      photo.desc + " — " + photo.event_name;
    document.getElementById("lightbox-date").textContent =
      `${photo.date} · Photo ${currentPhotoIndex + 1} / ${galleryMasterData.length}`;
    document.getElementById("lightbox-fb-link").href = photo.fb_url;
  }
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.setAttribute(
      "aria-label",
      "Agrandir : " + item.querySelector("img").alt,
    );
    item.addEventListener("click", () => {
      showPhoto(Number(item.dataset.index));
      openDialog(lightbox);
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
  document
    .getElementById("lightbox-prev")
    .addEventListener("click", () => showPhoto(currentPhotoIndex - 1));
  document
    .getElementById("lightbox-next")
    .addEventListener("click", () => showPhoto(currentPhotoIndex + 1));
  let touchStart = null;
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStart =
        e.touches.length === 1
          ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
          : null;
    },
    { passive: true },
  );
  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (!touchStart || activeDialog !== lightbox) return;
      const dx = e.changedTouches[0].clientX - touchStart.x,
        dy = e.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
        showPhoto(currentPhotoIndex + (dx < 0 ? 1 : -1));
      touchStart = null;
    },
    { passive: true },
  );
  lightbox.addEventListener(
    "touchcancel",
    () => {
      touchStart = null;
    },
    { passive: true },
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (activeDialog) closeDialog();
      else if (navLinks.classList.contains("show")) {
        setMenu(false);
        menuToggle.focus();
      }
    }
    if (!activeDialog) return;
    if (
      activeDialog === lightbox &&
      (e.key === "ArrowLeft" || e.key === "ArrowRight")
    ) {
      e.preventDefault();
      showPhoto(currentPhotoIndex + (e.key === "ArrowRight" ? 1 : -1));
    }
    if (e.key === "Tab") {
      const focusable = [
        ...activeDialog.querySelectorAll(
          'button, a[href], input, select, [tabindex="0"]',
        ),
      ].filter((el) => !el.disabled && el.getClientRects().length);
      const first = focusable[0],
        last = focusable.at(-1);
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          !activeDialog.contains(document.activeElement))
      ) {
        e.preventDefault();
        last?.focus();
      } else if (
        !e.shiftKey &&
        (document.activeElement === last ||
          !activeDialog.contains(document.activeElement))
      ) {
        e.preventDefault();
        first?.focus();
      }
    }
  });

  const nameInput = document.getElementById("card-input-name");
  const yearInput = document.getElementById("card-input-year");
  const domainInput = document.getElementById("card-input-domain");
  yearInput.max = String(new Date().getFullYear());
  function syncCard() {
    document.getElementById("card-display-name").textContent =
      nameInput.value.trim() || "VOTRE NOM & PRÉNOM";
    document.getElementById("card-display-year").textContent =
      yearInput.value || "—";
    document.getElementById("card-display-domain").textContent =
      domainInput.value;
  }
  [nameInput, yearInput, domainInput].forEach((input) =>
    input.addEventListener("input", syncCard),
  );
  syncCard();
  function downloadFile(href, filename) {
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
  }
  const restitutionForm = document.getElementById("restitution-form");
  const restitutionText = document.getElementById("restitution-text");
  const restitutionCount = document.getElementById("restitution-count");
  const restitutionStatus = document.getElementById("restitution-status");
  const restitutionYear = document.getElementById("restitution-year");
  restitutionYear.max = String(new Date().getFullYear());
  function restitutionParagraphs() {
    return restitutionText.value
      .trim()
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }
  function updateRestitutionCount() {
    const count = restitutionParagraphs().length;
    restitutionCount.textContent = `${count} / 3 paragraphe${count > 1 ? "s" : ""}`;
    restitutionCount.classList.toggle("is-valid", count >= 2 && count <= 3);
  }
  restitutionText.addEventListener("input", updateRestitutionCount);
  restitutionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const paragraphs = restitutionParagraphs();
    if (paragraphs.length < 2 || paragraphs.length > 3) {
      restitutionStatus.textContent =
        "Séparez votre texte en deux ou trois paragraphes avec une ligne vide.";
      restitutionStatus.classList.add("is-error");
      restitutionText.focus();
      return;
    }
    const name = document.getElementById("restitution-name").value.trim();
    const title = document.getElementById("restitution-title").value.trim();
    const content = [
      "RESTITUTION DE MISSION AU JAPON — ABSFJ TUNISIE",
      "",
      `Auteur : ${name}`,
      `Année : ${restitutionYear.value}`,
      `Mission / Formation : ${title}`,
      "",
      ...paragraphs.flatMap((paragraph, index) => [
        `PARAGRAPHE ${index + 1}`,
        paragraph,
        "",
      ]),
      "Document préparé par l’adhérent. Publication soumise à la validation de l’ABSFJ.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }),
    );
    const safeName = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();
    downloadFile(url, `ABSFJ-restitution-${safeName || "adherent"}.txt`);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    restitutionStatus.textContent =
      "Votre restitution est prête et a été téléchargée sur votre appareil.";
    restitutionStatus.classList.remove("is-error");
  });
  updateRestitutionCount();
  document.getElementById("membership-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const content = [
      "DEMANDE D’ADHÉSION — ABSFJ TUNISIE",
      "",
      "Nom et prénom : " + nameInput.value.trim(),
      "Année de formation JICA : " + yearInput.value,
      "Domaine : " + domainInput.value,
      "Email : " + document.getElementById("member-email").value.trim(),
      "Organisme : " + document.getElementById("member-org").value.trim(),
      "",
      "Document à transmettre au bureau de l’ABSFJ via sa page officielle :",
      "https://www.facebook.com/61573098115073/",
      "",
      "Cette demande n’a pas été envoyée automatiquement. L’adhésion reste soumise à la validation de l’association.",
    ].join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", content], { type: "text/plain;charset=utf-8" }),
    );
    downloadFile(url, "ABSFJ-demande-adhesion.txt");
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById("form-success-alert").style.display = "block";
  });
  document
    .getElementById("btn-download-svg")
    .addEventListener("click", () =>
      downloadFile(
        "assets/images/logo-absfj-officiel.jpg",
        "ABSFJ_Logo_Officiel.jpg",
      ),
    );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!motion.matches) entry.target.classList.add("reveal");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section-header, .president-composition, .history-line",
      )
      .forEach((el) => observer.observe(el));
  }
});
