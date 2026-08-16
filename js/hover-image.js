document.querySelectorAll(".hover-image").forEach((el) => {
  const img = el.querySelector("img");
  if (!img) return;

  el.addEventListener("mousemove", (event) => {
    img.style.left = event.clientX + "px";
    img.style.top = event.clientY + "px";
  });
});
