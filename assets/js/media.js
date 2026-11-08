/** ABSFJ — shared photographs, albums and anonymous publication. */
(() => {
  "use strict";
  const PAGE_SIZE = 24;
  const MAX_FILES = 8;
  const MAX_ORIGINAL_BYTES = 20 * 1024 * 1024;
  const TARGET_BYTES = 1.5 * 1024 * 1024;
  const presets = ["Team Building · Ras Jbel", "Voyages au Japon", "Rencontres & événements", "Vie de l’association"];
  const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  let seedPromise, sharedRequest, coverageRequest;
  const state = { seed: [], shared: [], filtered: [], category: "all", album: "all", query: "", visible: PAGE_SIZE, cursor: null, hasMore: true, loading: false, networkError: false, selected: [], uploading: false, lightboxIndex: 0 };
  const byId = id => document.getElementById(id);
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function safeUrl(value) {
    if (typeof value !== "string") return "";
    if (/^assets\/images\/[\w./-]+$/.test(value)) return value;
    try { const url = new URL(value, location.origin); return url.protocol === "https:" || url.origin === location.origin ? url.href : ""; } catch { return ""; }
  }
  function prettyDate(value) {
    const date = new Date(`${String(value || "").slice(0, 10)}T12:00:00Z`);
    return Number.isNaN(date.valueOf()) ? "Date non précisée" : dateFormat.format(date);
  }
  function normalize(photo, official = false) {
    if (!photo || !safeUrl(photo.url)) return null;
    return { ...photo, id: String(photo.id || photo.url), url: safeUrl(photo.url), title: String(photo.title || "Un instant partagé"), album: String(photo.album || "Vie de l’association"), author: String(photo.author || ""), official: official || photo.official === true };
  }
  async function fetchJSON(url, options = {}) {
    const response = await fetch(url, { ...options, signal: AbortSignal.timeout(60000) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || data.message || "La connexion n’a pas abouti. Réessayez dans un instant.");
    return data;
  }
  async function getSeed() {
    seedPromise ||= fetchJSON("/assets/data/gallery.json").then(data => (Array.isArray(data) ? data : data.photos || []).map(photo => normalize(photo, true)).filter(Boolean));
    return seedPromise;
  }
  function mergePhotos(seed, shared) {
    return [...new Map([...seed, ...shared].map(photo => [photo.id, photo])).values()].sort((a, b) => String(b.createdAt || b.eventDate).localeCompare(String(a.createdAt || a.eventDate)));
  }
  function photoCard(photo, onOpen) {
    const article = element("article", "media-card");
    const button = element("button", "media-card-button");
    button.type = "button";
    button.setAttribute("aria-label", `Ouvrir la photo : ${photo.title}`);
    button.setAttribute("aria-haspopup", "dialog");
    const visual = element("div", "media-card-visual");
    const image = element("img");
    image.src = photo.url;
    image.alt = photo.title;
    image.loading = "lazy";
    image.decoding = "async";
    visual.append(image, element("span", "media-card-kind", photo.official ? "ARCHIVES ABSFJ" : "COMMUNAUTÉ"));
    const zoom = element("span", "media-card-view", "↗"); zoom.setAttribute("aria-hidden", "true"); visual.append(zoom);
    const copy = element("div", "media-card-copy");
    copy.append(element("span", "media-card-album", photo.album), element("h3", "", photo.title));
    const meta = element("div", "media-card-meta");
    const date = element("time", "", prettyDate(photo.eventDate));
    if (photo.eventDate) date.dateTime = String(photo.eventDate).slice(0, 10);
    meta.append(date);
    if (photo.author) meta.append(element("span", "media-card-author", photo.author));
    copy.append(meta);
    button.append(visual, copy);
    button.addEventListener("click", onOpen);
    article.append(button);
    return article;
  }
  async function renderPreview(container) {
    if (!container) return;
    container.classList.add("media-grid", "media-grid-preview");
    const [seedResult, sharedResult] = await Promise.allSettled([getSeed(), fetchJSON("/api/photos?limit=6")]);
    const seed = seedResult.status === "fulfilled" ? seedResult.value : [];
    const shared = sharedResult.status === "fulfilled" ? (sharedResult.value.photos || []).map(photo => normalize(photo)).filter(Boolean) : [];
    container.replaceChildren();
    for (const photo of mergePhotos(seed, shared).slice(0, 6)) {
      const card = photoCard(photo, () => { location.href = `/mediatheque.html?photo=${encodeURIComponent(photo.id)}#albums`; });
      card.querySelector("button").removeAttribute("aria-haspopup");
      container.append(card);
    }
    if (!seed.length && !shared.length) container.append(element("p", "media-notice", "Les souvenirs se retrouvent dans la médiathèque. Ouvrez les albums pour les découvrir."));
  }
  function syncAlbums() {
    const select = byId("media-album");
    if (!select) return;
    const albums = [...new Set([...presets, ...state.seed.map(photo => photo.album), ...state.shared.map(photo => photo.album)])].sort((a, b) => a.localeCompare(b, "fr"));
    select.replaceChildren(new Option("Tous les albums", "all"), ...albums.map(album => new Option(album, album)));
    select.value = state.album;
  }
  function needsFilterCoverage() {
    return state.category !== "official" && (state.category === "community" || state.album !== "all" || Boolean(state.query.trim()));
  }
  function ensureFilterCoverage() {
    if (coverageRequest) return coverageRequest;
    coverageRequest = (async () => {
      while (state.hasMore && !state.networkError && needsFilterCoverage()) await loadShared();
    })().finally(() => { coverageRequest = null; });
    return coverageRequest;
  }
  function applyFilters() {
    const query = state.query.trim().toLocaleLowerCase("fr");
    state.filtered = mergePhotos(state.seed, state.shared).filter(photo => {
      const categoryMatch = state.category === "all" || (state.category === "official" ? photo.official : !photo.official);
      return categoryMatch && (state.album === "all" || photo.album === state.album) && (!query || `${photo.title} ${photo.album} ${photo.author} ${photo.description || ""}`.toLocaleLowerCase("fr").includes(query));
    });
    const shown = state.filtered.slice(0, state.visible);
    const gallery = byId("media-gallery");
    gallery.replaceChildren(...shown.map((photo, index) => photoCard(photo, () => openPhoto(index))));
    const searching = needsFilterCoverage() && state.hasMore && !state.networkError;
    byId("media-empty").hidden = shown.length !== 0 || state.loading || searching;
    if (!shown.length && state.networkError && state.hasMore) byId("media-empty").querySelector("p").textContent = "La recherche n’a pas encore couvert tous les souvenirs. Réessayez de charger les photos avec le bouton ci-dessous.";
    else byId("media-empty").querySelector("p").textContent = "Aucune photo ne correspond à votre recherche. Essayez un autre album ou partagez le premier souvenir.";
    byId("media-results").textContent = searching ? `${shown.length} résultat${shown.length > 1 ? "s" : ""} · Recherche dans tous les albums…` : state.loading && !shown.length ? "Chargement des souvenirs…" : `${shown.length} photo${shown.length > 1 ? "s" : ""}${shown.length < state.filtered.length ? ` sur ${state.filtered.length}` : ""} affichée${shown.length > 1 ? "s" : ""}${state.hasMore ? " · d’autres souvenirs à découvrir" : ""}`;
    const load = byId("media-load");
    load.hidden = !state.hasMore && state.visible >= state.filtered.length;
    load.disabled = state.loading;
    load.textContent = state.loading ? "Chargement…" : state.networkError ? "Réessayer de charger les souvenirs ↻" : "Voir plus de souvenirs ↓";
  }
  function loadShared() {
    if (sharedRequest) return sharedRequest;
    if (!state.hasMore) return Promise.resolve();
    sharedRequest = fetchSharedPage().finally(() => { sharedRequest = null; });
    return sharedRequest;
  }
  async function fetchSharedPage() {
    state.loading = true;
    applyFilters();
    try {
      const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
      if (state.cursor) params.set("cursor", state.cursor);
      const data = await fetchJSON(`/api/photos?${params}`);
      state.shared = mergePhotos(state.shared, (data.photos || []).map(photo => normalize(photo)).filter(Boolean));
      state.cursor = data.cursor || null;
      state.hasMore = Boolean(data.hasMore && state.cursor);
      state.networkError = false;
      byId("media-network-notice").hidden = true;
      syncAlbums();
    } catch {
      state.networkError = true;
      const notice = byId("media-network-notice");
      notice.textContent = "Les archives restent disponibles. Les photos récemment partagées n’ont pas pu être chargées ; utilisez le bouton de chargement pour réessayer.";
      notice.hidden = false;
    } finally { state.loading = false; applyFilters(); }
  }
  async function morePhotos() {
    state.visible += PAGE_SIZE;
    if (state.visible > state.filtered.length && state.hasMore) await loadShared();
    else applyFilters();
    ensureFilterCoverage();
  }
  function openPhoto(index) {
    const dialog = byId("media-lightbox");
    if (!dialog || !state.filtered.length) return;
    state.lightboxIndex = (index + state.filtered.length) % state.filtered.length;
    const photo = state.filtered[state.lightboxIndex];
    byId("media-lightbox-image").src = photo.url;
    byId("media-lightbox-image").alt = photo.title;
    byId("media-lightbox-title").textContent = photo.title;
    byId("media-lightbox-album").textContent = photo.album;
    byId("media-lightbox-meta").textContent = `${prettyDate(photo.eventDate)}${photo.author ? ` · ${photo.author}` : ""}`;
    byId("media-lightbox-description").textContent = photo.description || "";
    const source = byId("media-lightbox-source");
    const sourceUrl = safeUrl(photo.source);
    source.hidden = !sourceUrl;
    if (sourceUrl) source.href = sourceUrl;
    else source.removeAttribute("href");
    byId("media-lightbox-position").textContent = `${state.lightboxIndex + 1} / ${state.filtered.length}`;
    if (!dialog.open) { dialog.showModal(); document.body.style.overflow = "hidden"; }
  }
  function initLightbox() {
    const dialog = byId("media-lightbox");
    dialog.querySelector(".media-lightbox-close").addEventListener("click", () => dialog.close());
    dialog.querySelector(".media-lightbox-prev").addEventListener("click", () => openPhoto(state.lightboxIndex - 1));
    dialog.querySelector(".media-lightbox-next").addEventListener("click", () => openPhoto(state.lightboxIndex + 1));
    dialog.addEventListener("close", () => { document.body.style.overflow = ""; });
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); openPhoto(state.lightboxIndex + (event.key === "ArrowLeft" ? -1 : 1)); }
    });
    let startX = null;
    byId("media-lightbox-image").addEventListener("touchstart", event => { startX = event.changedTouches[0]?.clientX; }, { passive: true });
    byId("media-lightbox-image").addEventListener("touchend", event => { const delta = (event.changedTouches[0]?.clientX || 0) - startX; if (startX !== null && Math.abs(delta) > 65) openPhoto(state.lightboxIndex + (delta < 0 ? 1 : -1)); startX = null; }, { passive: true });
  }
  function initNavigation() {
    let theme;
    try { theme = localStorage.getItem("absfj-theme"); } catch { /* The theme also works without local storage. */ }
    if (!["light", "dark"].includes(theme)) theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    function setTheme(value) {
      document.documentElement.dataset.theme = value;
      byId("media-theme").setAttribute("aria-label", value === "dark" ? "Activer le mode clair" : "Activer le mode sombre");
      try { localStorage.setItem("absfj-theme", value); } catch { /* Optional preference persistence. */ }
    }
    setTheme(theme);
    byId("media-theme").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
    const menu = byId("media-menu"), navigation = byId("media-navigation");
    function setMenu(open) { navigation.classList.toggle("is-open", open); menu.setAttribute("aria-expanded", String(open)); menu.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu"); menu.textContent = open ? "×" : "☰"; }
    menu.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
    navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("click", event => { if (!event.target.closest(".media-header")) setMenu(false); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") setMenu(false); });
  }
  function showFormMessage(text, error = false) {
    const message = byId("media-form-message");
    message.textContent = text;
    message.hidden = !text;
    message.className = `media-form-message ${error ? "is-error" : "is-success"}`;
    message.setAttribute("role", error ? "alert" : "status");
  }
  function renderFiles() {
    byId("media-file-previews").replaceChildren(...state.selected.map((entry, index) => {
      const preview = element("div", "media-file-preview");
      const image = element("img"); image.src = entry.preview; image.alt = `Aperçu : ${entry.file.name}`;
      const remove = element("button", "media-file-remove", "×");
      remove.type = "button"; remove.disabled = state.uploading;
      remove.setAttribute("aria-label", `Retirer ${entry.file.name}`);
      remove.addEventListener("click", () => { URL.revokeObjectURL(entry.preview); state.selected.splice(index, 1); renderFiles(); });
      preview.append(image, remove, element("span", "media-file-name", entry.file.name));
      if (entry.uploaded) preview.append(element("span", "media-file-badge", "Publié ✔"));
      return preview;
    }));
    const pending = state.selected.filter(entry => !entry.uploaded).length;
    byId("media-file-status").textContent = state.selected.length ? `${state.selected.length} photo${state.selected.length > 1 ? "s" : ""} sélectionnée${state.selected.length > 1 ? "s" : ""}${pending !== state.selected.length ? ` · ${pending} restant${pending > 1 ? "es" : "e"} à publier` : ""}` : "";
  }
  function addFiles(files) {
    if (state.uploading) return;
    const problems = [];
    for (const file of Array.from(files)) {
      if (state.selected.length >= MAX_FILES) { problems.push("Vous pouvez sélectionner 8 photos à la fois."); break; }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { problems.push(`${file.name} : choisissez une image JPEG, PNG ou WebP.`); continue; }
      if (file.size > MAX_ORIGINAL_BYTES) { problems.push(`${file.name} : l’original dépasse 20 Mo.`); continue; }
      if (!state.selected.some(entry => entry.file.name === file.name && entry.file.size === file.size && entry.file.lastModified === file.lastModified)) state.selected.push({ file, preview: URL.createObjectURL(file), uploaded: false });
    }
    byId("media-files").value = "";
    renderFiles();
    showFormMessage(problems.join(" "), problems.length > 0);
  }
  async function optimizedDataUrl(file) {
    const url = URL.createObjectURL(file);
    try {
      const image = new Image(); image.decoding = "async"; image.src = url;
      await image.decode().catch(() => { throw new Error(`Impossible de lire ${file.name}. Choisissez une autre photo.`); });
      const scale = Math.min(1, 2000 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Votre navigateur ne permet pas l’optimisation des images.");
      context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, canvas.width, canvas.height);
      let quality = .88;
      let blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      while (blob && blob.size > TARGET_BYTES && quality > .43) { quality -= .1; blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality)); }
      if (!blob || blob.size > 3 * 1024 * 1024) throw new Error(`${file.name} reste trop volumineuse. Essayez une image plus petite.`);
      return await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error("La lecture du fichier a échoué.")); reader.readAsDataURL(blob); });
    } finally { URL.revokeObjectURL(url); }
  }
  function initUpload() {
    const form = byId("media-upload-form"), files = byId("media-files"), dropzone = byId("media-dropzone"), album = byId("media-upload-album");
    const today = new Date();
    const localDate = new Date(today.valueOf() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    byId("media-event-date").value = localDate;
    byId("media-event-date").max = localDate;
    files.addEventListener("change", () => addFiles(files.files));
    ["dragenter", "dragover"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); if (!state.uploading) dropzone.classList.add("is-dragover"); }));
    ["dragleave", "drop"].forEach(type => dropzone.addEventListener(type, event => { event.preventDefault(); dropzone.classList.remove("is-dragover"); }));
    dropzone.addEventListener("drop", event => addFiles(event.dataTransfer.files));
    album.addEventListener("change", () => { const custom = album.value === "custom"; byId("media-custom-album-wrap").hidden = !custom; byId("media-custom-album").required = custom; });
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (state.uploading || !form.reportValidity()) return;
      const pending = state.selected.filter(entry => !entry.uploaded);
      if (!pending.length) { showFormMessage("Choisissez au moins une photo à partager.", true); files.focus(); return; }
      const chosenAlbum = album.value === "custom" ? byId("media-custom-album").value.trim() : album.value;
      if (!chosenAlbum) { showFormMessage("Donnez un nom à votre album.", true); byId("media-custom-album").focus(); return; }
      const fields = { title: byId("media-title-input").value.trim(), album: chosenAlbum, eventDate: byId("media-event-date").value, author: byId("media-author").value.trim(), consent: byId("media-consent").checked, website: byId("media-website").value };
      state.uploading = true; showFormMessage("");
      const controls = [...form.querySelectorAll("input,select,button")];
      controls.forEach(control => { control.disabled = true; });
      byId("media-upload-progress").hidden = false;
      const publish = byId("media-publish"); publish.textContent = "Publication en cours…";
      let published = 0;
      try {
        for (const [index, entry] of pending.entries()) {
          byId("media-progress-label").textContent = `Optimisation et publication de la photo ${index + 1} sur ${pending.length}…`;
          byId("media-progress").value = Math.round(index / pending.length * 100);
          const image = await optimizedDataUrl(entry.file);
          const result = await fetchJSON("/api/photos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fields, image, title: fields.title || "Un instant partagé" }) });
          entry.uploaded = true; published++;
          const photo = normalize(result.photo || result);
          if (photo) state.shared = mergePhotos(state.shared, [photo]);
          renderFiles();
          byId("media-progress").value = Math.round((index + 1) / pending.length * 100);
        }
        byId("media-progress-label").textContent = "Publication terminée.";
        showFormMessage(`${published} photo${published > 1 ? "s" : ""} publiée${published > 1 ? "s" : ""} ! Merci, vos souvenirs font désormais partie de la médiathèque.`);
        state.selected.forEach(entry => URL.revokeObjectURL(entry.preview)); state.selected = []; renderFiles();
        state.category = "all"; state.album = "all"; state.query = "";
        byId("media-search").value = "";
        document.querySelectorAll("[data-media-category]").forEach(button => { const active = button.dataset.mediaCategory === "all"; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
        state.cursor = null; state.hasMore = true;
        syncAlbums(); applyFilters(); await loadShared();
      } catch (error) {
        showFormMessage(`${published ? `${published} photo${published > 1 ? "s ont" : " a"} été publiée${published > 1 ? "s" : ""}. ` : ""}${error.message} Les photos restantes sont conservées ici pour réessayer.`, true);
        byId("media-progress-label").textContent = "Envoi interrompu. Vous pouvez réessayer.";
      } finally {
        state.uploading = false; controls.forEach(control => { control.disabled = false; });
        const remaining = state.selected.filter(entry => !entry.uploaded).length;
        publish.textContent = remaining ? "Réessayer les photos restantes ↗" : "Publier mes photos ↗";
        renderFiles(); syncAlbums(); applyFilters();
      }
    });
  }
  async function initPage() {
    if (!byId("media-gallery")) return;
    initNavigation(); initLightbox(); initUpload();
    document.querySelectorAll("[data-media-category]").forEach(button => button.addEventListener("click", () => {
      state.category = button.dataset.mediaCategory; state.visible = PAGE_SIZE;
      document.querySelectorAll("[data-media-category]").forEach(item => { const active = item === button; item.classList.toggle("is-active", active); item.setAttribute("aria-pressed", String(active)); });
      applyFilters(); ensureFilterCoverage();
    }));
    byId("media-search").addEventListener("input", event => { state.query = event.target.value; state.visible = PAGE_SIZE; applyFilters(); ensureFilterCoverage(); });
    byId("media-album").addEventListener("change", event => { state.album = event.target.value; state.visible = PAGE_SIZE; applyFilters(); ensureFilterCoverage(); });
    byId("media-reset").addEventListener("click", () => {
      state.query = ""; state.album = "all"; state.category = "all"; state.visible = PAGE_SIZE;
      byId("media-search").value = ""; byId("media-album").value = "all";
      document.querySelectorAll("[data-media-category]").forEach(button => { const active = button.dataset.mediaCategory === "all"; button.classList.toggle("is-active", active); button.setAttribute("aria-pressed", String(active)); });
      applyFilters();
    });
    byId("media-load").addEventListener("click", morePhotos);
    try { state.seed = await getSeed(); } catch { byId("media-network-notice").textContent = "Les archives n’ont pas pu être chargées. Actualisez la page pour réessayer."; byId("media-network-notice").hidden = false; }
    syncAlbums(); applyFilters(); await loadShared();
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting) && !state.loading && !state.networkError && (state.hasMore || state.visible < state.filtered.length)) morePhotos(); }, { rootMargin: "150px" });
      observer.observe(byId("media-load-sentinel"));
    }
    const wantedPhoto = new URLSearchParams(location.search).get("photo");
    if (wantedPhoto) { const index = state.filtered.findIndex(photo => photo.id === wantedPhoto); if (index >= 0) openPhoto(index); }
  }
  window.ABSFJMedia = { renderPreview };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initPage);
  else initPage();
})();
