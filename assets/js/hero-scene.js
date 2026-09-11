/** Kizuna: a lightweight layered diorama, independent of the page's archives. */
document.addEventListener("DOMContentLoaded", () => {
  const scene = document.getElementById("kizuna-scene");
  if (!scene) return;

  const viewport = scene.querySelector(".diorama-viewport");
  const toggle = scene.querySelector(".scene-motion-toggle");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let userPaused = false;
  let inView = true;
  let frame = 0;
  let previousTime = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function canMove() {
    return !userPaused && !motion.matches && inView && !document.hidden;
  }

  function paint() {
    scene.style.setProperty("--scene-rx", `${currentX.toFixed(3)}deg`);
    scene.style.setProperty("--scene-ry", `${currentY.toFixed(3)}deg`);
  }

  // Only render while the pointer response is settling; CSS handles idle motion.
  function settle(time) {
    frame = 0;
    if (!canMove()) return;
    const delta = Math.min(previousTime ? time - previousTime : 16.67, 50);
    previousTime = time;
    const ease = 1 - Math.exp(-delta / 105);
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    const settled =
      Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.015;
    if (settled) {
      currentX = targetX;
      currentY = targetY;
    }
    paint();
    if (!settled) frame = requestAnimationFrame(settle);
    else previousTime = 0;
  }

  function requestSettle() {
    if (!frame && canMove()) frame = requestAnimationFrame(settle);
  }

  function resetPointer() {
    targetX = targetY = 0;
    if (canMove()) requestSettle();
    else {
      currentX = currentY = 0;
      paint();
    }
  }

  function syncMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    scene.dataset.paused = String(userPaused || motion.matches);
    scene.dataset.visible = String(inView && !document.hidden);
    toggle.hidden = motion.matches;
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.setAttribute(
      "aria-label",
      userPaused ? "Animer la scène" : "Mettre la scène en pause",
    );
    toggle.title = userPaused ? "Animer la scène" : "Mettre la scène en pause";
    resetPointer();
  }

  viewport.addEventListener(
    "pointermove",
    (event) => {
      if (!canMove() || !finePointer.matches || event.pointerType === "touch")
        return;
      const rect = viewport.getBoundingClientRect();
      const x = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      const y = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
      targetX = -y * 7;
      targetY = x * 11;
      requestSettle();
    },
    { passive: true },
  );
  viewport.addEventListener("pointerleave", resetPointer);
  viewport.addEventListener("pointercancel", resetPointer);
  toggle.addEventListener("click", () => {
    userPaused = !userPaused;
    syncMotion();
  });
  motion.addEventListener("change", syncMotion);
  finePointer.addEventListener("change", resetPointer);
  document.addEventListener("visibilitychange", syncMotion);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncMotion();
      },
      { threshold: 0 },
    );
    observer.observe(scene);
  }

  scene.classList.add("is-animated");
  syncMotion();
});
