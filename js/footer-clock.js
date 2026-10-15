(() => {
  const clock = document.querySelector(".footer-clock");

  if (!clock) return;

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Etc/GMT-1",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Etc/GMT-1",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });

  const date = document.createElement("span");
  const time = document.createElement("span");
  const timeZone = document.createElement("span");
  date.className = "footer-clock-date";
  time.className = "footer-clock-time";
  timeZone.className = "footer-clock-zone";
  timeZone.textContent = "[GMT+1]";
  clock.append(date, time, timeZone);

  const updateClock = () => {
    const now = new Date();
    clock.dateTime = now.toISOString();
    date.textContent = dateFormatter.format(now);
    time.textContent = timeFormatter.format(now);
    clock.setAttribute(
      "aria-label",
      `${date.textContent}, ${time.textContent}, GMT plus one`
    );
  };

  updateClock();
  window.setInterval(updateClock, 1000);
})();
