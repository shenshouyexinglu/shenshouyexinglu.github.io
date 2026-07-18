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
  fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "omit",
    headers: { "content-type": "text/plain;charset=UTF-8" },
    body: payload,
    keepalive: true
  }).catch(() => {});
})();
