(() => {
  const projectGrid = document.querySelector(".work-grid");
  const dialog = document.querySelector(".project-dialog");
  const dialogScroll = dialog?.querySelector(".project-dialog-scroll");
  const dialogStage = dialog?.querySelector(".project-dialog-stage");
  const pageLayout = document.querySelector(".layout");

  if (!projectGrid || !dialog || !dialogScroll || !dialogStage || !pageLayout) return;

  document.body.append(dialog);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const projects = Array.from(projectGrid.querySelectorAll(".work-item"));
  const entries = projects.map(project => ({
    project,
    toggle: project.querySelector(".work-toggle"),
    name: project.querySelector(".work-title")?.textContent.trim() || "this project"
  }));

  const progress = dialog.querySelector(".work-progress");
  const progressSegments = progress
    ? Array.from(progress.querySelectorAll(".work-progress-segment"))
    : [];
  const floatingControls = dialog.querySelector(".project-floating-controls");
  const floatingClose = dialog.querySelector(".project-floating-close");
  const floatingNext = dialog.querySelector(".project-floating-next");

  let activeIndex = -1;
  let lockedScrollPosition = 0;
  let navigationLocked = false;
  let transitionTimer;

  const transitionDuration = () => reducedMotion.matches ? 0 : 500;

  const lockPageScroll = () => {
    lockedScrollPosition = window.scrollY;
    document.documentElement.classList.add("has-open-project");
  };

  const unlockPageScroll = () => {
    document.documentElement.classList.remove("has-open-project");
    window.scrollTo(0, lockedScrollPosition);
  };

  const setProgress = index => {
    progress?.classList.remove("is-hidden");
    floatingControls?.classList.remove("is-hidden");

    if (progress) {
      progress.setAttribute("aria-label", `Project ${index + 1} of ${entries.length}`);
      progress.setAttribute("aria-hidden", "false");
    }

    progressSegments.forEach((segment, segmentIndex) => {
      segment.classList.toggle("is-active", segmentIndex === index);
    });

    if (floatingNext) {
      const hasNextProject = index < entries.length - 1;
      floatingNext.disabled = !hasNextProject;
      floatingNext.setAttribute(
        "aria-label",
        hasNextProject ? `View ${entries[index + 1].name}` : "No next project"
      );
    }
  };

  const createDialogProject = index => {
    const clone = entries[index].project.cloneNode(true);
    const details = clone.querySelector(".work-more");
    const toggle = clone.querySelector(".work-toggle");
    const icon = clone.querySelector(".work-toggle-icon");

    clone.className = "work-item project-dialog-item";
    clone.removeAttribute("style");
    clone.querySelectorAll("[id]").forEach(element => element.removeAttribute("id"));

    details?.classList.add("is-expanded");

    if (toggle) {
      toggle.removeAttribute("aria-controls");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", `Close ${entries[index].name}`);
      toggle.addEventListener("click", closeProject);
    }

    if (icon) {
      icon.textContent = "×";
    }

    window.requestAnimationFrame(() => {
      if (reducedMotion.matches) return;
      clone.querySelectorAll("video").forEach(video => {
        video.play().catch(() => {});
      });
    });

    return clone;
  };

  const openProject = index => {
    if (!entries[index]?.toggle) return;

    window.clearTimeout(transitionTimer);

    if (activeIndex === -1) {
      activeIndex = index;
      lockPageScroll();
      pageLayout.inert = true;
      document.body.classList.add("has-expanded-project");
      dialog.classList.remove("is-closing");
      dialogStage.replaceChildren(createDialogProject(index));
      dialogScroll.scrollTop = 0;
      setProgress(index);
      dialog.setAttribute("aria-label", `${entries[index].name} project details`);
      dialog.hidden = false;
      dialog.focus({ preventScroll: true });

      window.requestAnimationFrame(() => {
        dialog.classList.add("is-visible");
      });
      return;
    }

    const outgoing = dialogStage.querySelector(".project-dialog-item:not(.is-leaving)");
    const incoming = createDialogProject(index);
    incoming.classList.add("is-entering");
    dialogStage.append(incoming);
    dialogScroll.scrollTop = 0;
    setProgress(index);
    dialog.setAttribute("aria-label", `${entries[index].name} project details`);
    dialogStage.getBoundingClientRect();
    outgoing?.classList.add("is-leaving");
    incoming.classList.remove("is-entering");
    activeIndex = index;

    transitionTimer = window.setTimeout(() => {
      outgoing?.remove();
      navigationLocked = false;
    }, transitionDuration());
  };

  const closeProject = () => {
    if (activeIndex === -1) return;

    const closingIndex = activeIndex;
    activeIndex = -1;
    navigationLocked = true;
    progress?.classList.add("is-hidden");
    progress?.setAttribute("aria-hidden", "true");
    floatingControls?.classList.add("is-hidden");
    dialog.classList.add("is-closing");
    dialog.classList.remove("is-visible");

    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      dialog.hidden = true;
      dialogStage.replaceChildren();
      dialog.classList.remove("is-closing");
      document.body.classList.remove("has-expanded-project");
      pageLayout.inert = false;
      unlockPageScroll();
      navigationLocked = false;
      entries[closingIndex].toggle?.focus({ preventScroll: true });
    }, transitionDuration());
  };

  const moveProject = direction => {
    if (activeIndex === -1 || navigationLocked) return;

    const nextIndex = activeIndex + direction;
    if (nextIndex < 0 || nextIndex >= entries.length) return;

    navigationLocked = true;
    openProject(nextIndex);
  };

  entries.forEach((entry, index) => {
    entry.toggle?.addEventListener("click", () => openProject(index));
  });

  floatingClose?.addEventListener("click", closeProject);
  floatingNext?.addEventListener("click", () => moveProject(1));

  document.addEventListener("keydown", event => {
    if (activeIndex === -1) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeProject();
    } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveProject(1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveProject(-1);
    } else if (event.key === "Tab") {
      const focusable = Array.from(dialog.querySelectorAll(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"
      )).filter(element => element.getClientRects().length);

      if (!focusable.length) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialog) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
