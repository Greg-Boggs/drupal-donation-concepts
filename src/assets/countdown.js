import { campaignState } from "/lib/campaign.js";
for (const element of document.querySelectorAll("[data-local-deadline]")) {
  const deadline = new Date(element.dateTime);
  if (!Number.isNaN(deadline.getTime())) {
    element.textContent = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(deadline);
  }
}
async function start() {
  let TemporalAPI = globalThis.Temporal;
  if (!TemporalAPI) {
    try {
      await import("/vendor/temporal-polyfill/global.js");
      TemporalAPI = globalThis.Temporal;
    } catch {
      return;
    }
  }
  for (const element of document.querySelectorAll("[data-countdown]")) {
    const deadline = element.dataset.deadline;
    const end = TemporalAPI.Instant.from(deadline);
    const config = {
      deadline,
      donationUrl: "https://donorbox.org/drupal-security",
    };
    let interval;
    function update() {
      const now = TemporalAPI.Now.instant();
      const state = campaignState(config, Number(now.epochMilliseconds));
      if (state.expired) {
        element.textContent = "00 : 00 : 00 : 00";
        const status = element.parentElement.querySelector(
          "[data-expiry-status]",
        );
        if (status)
          status.textContent =
            "This proposed campaign deadline has passed. Ongoing support remains available.";
        clearInterval(interval);
        return;
      }
      const duration = now.until(end, { largestUnit: "second" });
      const total = Math.max(0, Math.ceil(duration.total("seconds")));
      const values = [
        Math.floor(total / 86400),
        Math.floor(total / 3600) % 24,
        Math.floor(total / 60) % 60,
        total % 60,
      ];
      element.innerHTML = values
        .map(
          (value, index) =>
            `<span><b>${String(value).padStart(2, "0")}</b><small>${["days", "hours", "minutes", "seconds"][index]}</small></span>`,
        )
        .join("");
    }
    interval = setInterval(update, 1000);
    update();
  }
}
start();
