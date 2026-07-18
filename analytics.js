(() => {
  const endpoint = document.querySelector('meta[name="analytics-endpoint"]')?.content?.trim();
  if (!endpoint || endpoint.includes("PASTE_WORKER_URL_HERE")) return;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
  const payload = JSON.stringify({
    path: location.pathname,
    title: document.title,
    referrer: document.referrer
  });
  const url = endpoint.replace(/\/$/, "") + "/api/collect";
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([payload], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }
})();

