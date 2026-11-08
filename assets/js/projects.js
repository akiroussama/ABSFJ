/* ABSFJ projects: shared cards, portfolio filters, and detailed project briefs. */
(() => {
  "use strict";
  const source = document.currentScript?.src || new URL("assets/js/projects.js", location.href).href;
  const rootURL = new URL("../../", source);
  const dataURL = new URL("assets/data/projects.json", rootURL);
  let projectData;
  const absolute = (path) => new URL(path, rootURL).href;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const money = (value) => `${new Intl.NumberFormat("fr-TN", { maximumFractionDigits: 0 }).format(value)} TND`;
  const projectURL = (id) => `${absolute("projet.html")}?id=${encodeURIComponent(id)}`;

  async function load() {
    if (!projectData) {
      projectData = fetch(dataURL).then((response) => {
        if (!response.ok) throw new Error("Chargement impossible");
        return response.json();
      }).catch((error) => { projectData = null; throw error; });
    }
    return projectData;
  }

  function card(project) {
    return `<article class="project-card" data-project-category="${escapeHTML(project.categoryId)}" lang="fr">
      <a class="project-card-link" href="${projectURL(project.id)}" aria-label="Découvrir le projet ${escapeHTML(project.name)}">
        <div class="project-card-image"><img src="${absolute(project.image)}" alt="${escapeHTML(project.imageAlt)}" loading="lazy" width="720" height="480" /><span class="project-card-category">${escapeHTML(project.category)}</span><span class="project-card-image-label">Photo d’illustration</span></div>
        <div class="project-card-content"><div class="project-card-meta"><span>PROJET ${escapeHTML(project.number)} · EXEMPLE</span><span lang="ja" aria-hidden="true">${escapeHTML(project.kanji)}</span></div><h3>${escapeHTML(project.name)}</h3><p class="project-card-summary">${escapeHTML(project.summary)}</p>
          <div class="project-card-progress-label"><span>${escapeHTML(project.status)}</span><strong>${project.progress} % · indicatif</strong></div><div class="project-progress" role="progressbar" aria-label="Avancement indicatif de ${escapeHTML(project.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${project.progress}" aria-valuetext="${project.progress} pour cent, exemple à valider"><span style="width:${project.progress}%"></span></div>
          <div class="project-card-bottom"><span>${money(project.budget)}<small>Budget prévisionnel · à valider</small></span><span class="project-card-arrow" aria-hidden="true">↗</span></div>
        </div>
      </a></article>`;
  }

  async function renderCards(container, options = {}) {
    const target = typeof container === "string" ? document.querySelector(container) : container;
    if (!target) return;
    target.classList.add("project-grid");
    target.setAttribute("lang", "fr");
    try {
      const data = await load();
      const projects = options.exclude ? data.projects.filter((entry) => entry.id !== options.exclude) : data.projects;
      target.innerHTML = projects.map(card).join("");
    } catch {
      target.innerHTML = `<p class="project-error">Les projets ne peuvent pas être chargés pour le moment. <a href="${absolute("projets.html")}">Réessayer depuis la page des projets</a>.</p>`;
    }
  }

  function detail(project) {
    const stateLabels = { done: "Étape illustrée comme préparée", current: "Prochaine étape proposée", next: "À planifier" };
    return `<div class="container project-detail-hero">
      <a class="project-back" href="${absolute("projets.html")}">← Tous les projets</a>
      <div class="project-title-row"><div><span class="project-eyebrow">PROJET ${escapeHTML(project.number)} / ${escapeHTML(project.category.toUpperCase())}</span><h1 class="project-detail-title">${escapeHTML(project.name)}</h1><p class="project-detail-subtitle">${escapeHTML(project.title)}</p><p class="project-intro">${escapeHTML(project.summary)}</p></div><span class="project-detail-seal" lang="ja" aria-hidden="true">${escapeHTML(project.kanji)}</span></div>
      <div class="project-demo-note"><span aria-hidden="true">◇</span><p><strong>Fiche exemple · proposition à valider.</strong> Le suivi, l’équipe, le calendrier et les budgets ci-dessous illustrent le futur espace projets. Aucun financement, lancement ou partenariat n’est confirmé.</p></div>
      <figure class="project-detail-photo"><img src="${absolute(project.image)}" alt="${escapeHTML(project.imageAlt)}" width="1400" height="800" fetchpriority="high" /><span class="project-photo-category">${escapeHTML(project.category)} · Tunisie × Japon</span><figcaption><span>${escapeHTML(project.imageCaption)}</span><a href="${escapeHTML(project.imageSource)}" target="_blank" rel="noopener noreferrer">Photo : ${escapeHTML(project.imageCredit)} ↗</a></figcaption></figure>
    </div>
    <div class="container project-detail-layout">
      <div class="project-detail-content">
        <section class="project-section" aria-labelledby="project-overview-title"><h2 id="project-overview-title">L’idée, et ce qu’elle peut changer.</h2><div class="project-overview-columns"><div><h3>Le point de départ</h3><p>${escapeHTML(project.challenge)}</p></div><div><h3>Notre approche proposée</h3><p>${escapeHTML(project.approach)}</p></div></div><ol class="project-objectives">${project.objectives.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol></section>
        <div class="project-targets" aria-label="Objectifs indicatifs, à valider">${project.metrics.map((item) => `<div><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(item.label)}</span></div>`).join("")}</div>
        <section class="project-section" id="avancement" aria-labelledby="project-timeline-title"><div class="project-section-heading"><h2 id="project-timeline-title">Un chemin, étape par étape.</h2><span>Calendrier indicatif · après validation</span></div><ol class="project-timeline">${project.milestones.map((item) => `<li class="project-milestone ${escapeHTML(item.status)}"><div class="project-milestone-heading"><h3>${escapeHTML(item.title)}</h3><span>${escapeHTML(item.date)}</span></div><p>${escapeHTML(item.detail)}</p><span class="project-milestone-state">${stateLabels[item.status]}</span></li>`).join("")}</ol></section>
        <section class="project-section" id="budget" aria-labelledby="project-budget-title"><div class="project-section-heading"><h2 id="project-budget-title">Des moyens pour agir.</h2><span>Budget prévisionnel · exemple</span></div><p>Une première répartition indicative pour rendre le périmètre concret. Les montants doivent être chiffrés et approuvés avant tout engagement.</p><table class="project-budget-table"><caption class="visually-hidden">Répartition du budget prévisionnel indicatif en dinars tunisiens</caption><thead><tr><th scope="col">Poste envisagé</th><th scope="col" style="text-align:right">Montant indicatif</th></tr></thead><tbody>${project.budgetLines.map((item) => `<tr><th scope="row">${escapeHTML(item.label)}</th><td>${money(item.amount)}</td></tr>`).join("")}</tbody><tfoot><tr><th scope="row">Total prévisionnel</th><td>${money(project.budget)}</td></tr></tfoot></table><p class="project-budget-note">Budget alloué : à confirmer · Dépenses engagées : non renseignées.<br />Aucun financement acquis n’est présenté dans cet exemple.</p></section>
        <section class="project-section" id="equipe" aria-labelledby="project-team-title"><h2 id="project-team-title">Les compétences derrière l’idée.</h2><p>Une équipe à constituer parmi les membres et les volontaires intéressés. Les sigles représentent des rôles, pas des personnes nommées.</p><ul class="project-team">${project.team.map((item) => `<li><span class="project-avatar" aria-hidden="true">${escapeHTML(item.initials)}</span><div><strong>${escapeHTML(item.role)}</strong><small>${escapeHTML(item.detail)}</small></div></li>`).join("")}</ul></section>
        <section class="project-section" aria-labelledby="project-deliverables-title"><h2 id="project-deliverables-title">Ce que nous souhaitons transmettre.</h2><ul class="project-deliverables">${project.deliverables.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul><div class="project-next-step"><span class="project-eyebrow">LE PROCHAIN PAS PROPOSÉ</span><p>${escapeHTML(project.nextStep)}</p></div></section>
      </div>
      <aside class="project-sidebar" aria-labelledby="project-sidebar-title"><span class="project-eyebrow">EN UN REGARD · DONNÉES EXEMPLES</span><h2 id="project-sidebar-title">Le suivi du projet.</h2><span class="project-status">${escapeHTML(project.status)}</span><strong class="project-big-progress">${project.progress}<span style="font-size:28px"> %</span></strong><div class="project-progress" role="progressbar" aria-label="Avancement indicatif du projet" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${project.progress}" aria-valuetext="${project.progress} pour cent, exemple à valider"><span style="width:${project.progress}%"></span></div><p class="project-progress-disclaimer">Avancement de démonstration · à remplacer par le suivi réel après validation.</p><dl><div><dt>RESPONSABLE / OWNER PROPOSÉ</dt><dd>${escapeHTML(project.owner)}<small>${escapeHTML(project.ownerStatus)}</small></dd></div><div><dt>BUDGET PRÉVISIONNEL</dt><dd>${money(project.budget)}<small>Estimation d’exemple à valider</small></dd></div><div><dt>BUDGET ALLOUÉ</dt><dd>À confirmer<small>Financement non confirmé</small></dd></div><div><dt>DURÉE ENVISAGÉE</dt><dd>${escapeHTML(project.duration)}<small>À compter d’un éventuel lancement</small></dd></div><div><dt>TERRITOIRE</dt><dd>${escapeHTML(project.location)}</dd></div></dl><a class="project-button" href="${absolute("index.html")}#contact">Contribuer à ce projet <span aria-hidden="true">↗</span></a><p class="project-sidebar-help">Contactez l’association pour proposer votre participation.</p></aside>
    </div>
    <section class="container project-other" aria-label="Autres projets"><span class="project-eyebrow">D’AUTRES FAÇONS D’AGIR</span><h2>Les idées se répondent.</h2><div class="project-grid" id="project-related-grid"></div><a class="project-back" style="margin:25px 0 0" href="${absolute("projets.html")}">Voir tous les projets →</a></section>`;
  }

  function initializeTheme() {
    const button = document.getElementById("project-theme-toggle");
    if (!button) return;
    let theme;
    try { theme = localStorage.getItem("absfj-theme"); } catch { /* Optional preference storage. */ }
    if (theme !== "dark" && theme !== "light") theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const apply = () => {
      document.documentElement.dataset.theme = theme;
      button.setAttribute("aria-label", theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
      button.setAttribute("title", theme === "dark" ? "Mode clair" : "Mode sombre");
      try { localStorage.setItem("absfj-theme", theme); } catch { /* Theme still works without storage. */ }
    };
    apply();
    button.addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; apply(); });
  }

  async function initialize() {
    initializeTheme();
    const home = document.getElementById("project-home-grid");
    if (home) renderCards(home);
    const listing = document.getElementById("project-list-grid");
    if (listing) {
      await renderCards(listing);
      const buttons = [...document.querySelectorAll("[data-project-filter]")];
      buttons.forEach((button) => button.addEventListener("click", () => {
        buttons.forEach((item) => { item.classList.toggle("active", item === button); item.setAttribute("aria-pressed", String(item === button)); });
        let count = 0;
        listing.querySelectorAll(".project-card").forEach((item) => {
          item.hidden = button.dataset.projectFilter !== "all" && item.dataset.projectCategory !== button.dataset.projectFilter;
          if (!item.hidden) count += 1;
        });
        document.getElementById("project-result-count").textContent = `${count} proposition${count > 1 ? "s" : ""}`;
      }));
    }
    const target = document.getElementById("project-detail");
    if (target) {
      try {
        const data = await load();
        const id = new URLSearchParams(location.search).get("id");
        const project = data.projects.find((item) => item.id === id);
        if (!project) {
          document.title = "Projet introuvable | ABSFJ";
          target.className = "container project-error";
          target.removeAttribute("role");
          target.innerHTML = `<h1>Ce projet n’a pas été trouvé.</h1><p>Retrouvez les propositions de l’association dans notre espace projets.</p><a href="${absolute("projets.html")}">Voir tous les projets →</a>`;
          return;
        }
        document.title = `${project.name} | Projets ABSFJ`;
        document.querySelector('meta[name="description"]')?.setAttribute("content", project.summary);
        target.className = "";
        target.removeAttribute("role");
        target.innerHTML = detail(project);
        await renderCards(document.getElementById("project-related-grid"), { exclude: id });
      } catch {
        target.className = "container project-error";
        target.innerHTML = `<h1>Le projet est momentanément indisponible.</h1><p>Veuillez réessayer dans un instant.</p><a href="${absolute("projets.html")}">Retour aux projets →</a>`;
      }
    }
  }
  window.ABSFJProjects = { renderCards, load };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
  else initialize();
})();
