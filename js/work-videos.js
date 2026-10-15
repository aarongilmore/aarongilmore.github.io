(() => {
  const videos = Array.from(document.querySelectorAll(".work-grid video"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = navigator.connection?.saveData;

  if (!videos.length || reducedMotion || saveData) return;

  if (!("IntersectionObserver" in window)) {
    videos.forEach(video => video.play().catch(() => {}));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, {
    rootMargin: "20% 0px",
    threshold: 0.1
  });

  videos.forEach(video => observer.observe(video));
})();
