/** Published updates supplement the static archives; failed requests leave them intact. */
(() => {
  "use strict";
  const categories = {
    reseau: "Réseau & talents", kaizen: "Kaizen & climat", ecologie: "Environnement",
    amitie: "Sport & Amitié", ag: "Vie associative",
  };
  const byId = new Map();
  const dateFormat = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
  function text(value, maximum = 50000) {
    return typeof value === "string" ? value.trim().slice(0, maximum) : "";
  }
  function safeUrl(value, allowArchive = false) {
    if (typeof value !== "string" || !value) return "";
    try {
      const url = new URL(value, location.origin);
      if (url.username || url.password) return "";
      if (allowArchive && /^\/?assets\/images\//.test(value) && url.origin === location.origin && url.pathname.startsWith("/assets/images/")) return value;
      return url.protocol === "https:" ? url.href : "";
    } catch { return ""; }
  }
  function normalize(record) {
    if (!record || typeof record !== "object" || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,159}$/.test(record.id || "") ||
        !text(record.title, 300) || !Object.hasOwn(categories, record.category) || record.archived === true || !Array.isArray(record.photos)) return null;
    const photos = record.photos.map(photo => {
      const url = safeUrl(photo?.url, true);
      return url ? { id: text(photo.id, 160), url, alt: text(photo.alt, 500) || text(record.title, 300), width: photo.width, height: photo.height } : null;
    });
    if (photos.some(photo => !photo)) return null;
    const eventDate = /^\d{4}-\d{2}-\d{2}$/.test(record.eventDate || "") ? record.eventDate : "";
    const date = eventDate ? new Date(`${eventDate}T12:00:00Z`) : null;
    const dateLabel = text(record.dateLabel, 160) || (date && !Number.isNaN(date.valueOf()) ? dateFormat.format(date) : "");
    const body = text(record.body);
    return { ...record, id: record.id, title: text(record.title, 300), body,
      summary: text(record.summary, 2000) || body.slice(0, 240), eventDate, dateLabel,
      location: text(record.location, 300), photos, sourceUrl: safeUrl(record.sourceUrl), archived: false };
  }
  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  }
  function cardFor(publication) {
    const card = element("article", "event-card publication-card");
    card.id = `event-${publication.id}`;
    card.dataset.eventId = publication.id;
    card.dataset.category = publication.category;
    card.dataset.publicationManaged = "true";
    card.lang = "fr";
    const visual = element("div", "event-card-img-wrap");
    const cover = publication.photos[0];
    if (cover) {
      const image = element("img", "event-card-img");
      image.src = cover.url; image.alt = cover.alt; image.loading = "lazy"; image.decoding = "async";
      if (Number.isInteger(cover.width) && cover.width > 0) image.width = cover.width;
      if (Number.isInteger(cover.height) && cover.height > 0) image.height = cover.height;
      visual.append(image);
    } else {
      visual.classList.add("publication-text-visual");
      visual.append(element("span", "publication-monogram", "ABSFJ"));
    }
    visual.append(element("span", "event-type-badge-overlay", categories[publication.category]));
    if (publication.dateLabel) visual.append(element("span", "event-date-overlay", publication.dateLabel));
    if (publication.photos.length > 1) visual.append(element("span", "event-photos-count", `${publication.photos.length} photos`));
    const body = element("div", "event-card-body");
    body.append(element("h4", "event-title", publication.title), element("p", "event-desc", publication.summary));
    const footer = element("div", "event-footer");
    footer.append(element("span", "event-location", publication.location));
    const actions = element("div", "publication-actions");
    if (publication.sourceUrl) {
      const link = element("a", "btn-link publication-source", "Source ↗");
      link.href = publication.sourceUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.title = "Consulter la source"; actions.append(link);
    }
    const more = element("button", "btn-link open-modal-btn", "En savoir plus →");
    more.type = "button"; more.dataset.eventId = publication.id;
    actions.append(more); footer.append(actions); body.append(footer); card.append(visual, body);
    return card;
  }
  async function start() {
    const grid = document.querySelector("#evenements .events-grid");
    if (!grid || !window.ABSFJEvents) return;
    grid.querySelectorAll(".event-card[data-event-id]").forEach(card => byId.set(card.dataset.eventId, card));
    try {
      const response = await fetch("/api/publications", { headers: { Accept: "application/json" }, cache: "no-store", signal: AbortSignal.timeout(15000) });
      if (!response.ok) return;
      const data = await response.json();
      if (!Array.isArray(data.publications) || !Array.isArray(data.hiddenIds) || data.hiddenIds.some(id => typeof id !== "string")) return;
      const normalized = data.publications.map(normalize);
      // Validate the complete response before changing any archived card.
      if (normalized.some(publication => !publication)) return;
      const hidden = new Set(data.hiddenIds);
      const records = [...new Map(normalized.map(publication => [publication.id, publication])).values()]
        .filter(publication => !hidden.has(publication.id))
        .sort((a, b) => String(b.createdAt || b.updatedAt || "").localeCompare(String(a.createdAt || a.updatedAt || "")));
      window.ABSFJEvents.upsert(records);
      const additions = document.createDocumentFragment();
      records.forEach(publication => {
        const card = cardFor(publication);
        const previous = byId.get(publication.id);
        if (previous) previous.replaceWith(card);
        else additions.append(card);
        byId.set(publication.id, card);
      });
      hidden.forEach(id => { byId.get(id)?.remove(); byId.delete(id); });
      grid.prepend(additions);
      window.ABSFJEvents.refresh();
    } catch {
      // The 15 original cards, their translated text and dialogs remain usable offline.
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else if (window.ABSFJEvents) start();
  else window.addEventListener("absfj:eventsready", start, { once: true });
})();
