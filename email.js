// Reconstructs mailto links from data attributes so Cloudflare's
// Email Address Obfuscation never sees a raw email address in the HTML.
document.querySelectorAll('a[data-em]').forEach(function (a) {
  var addr = a.dataset.em + '\u0040' + a.dataset.dm;
  a.href = 'mailto:' + addr;
  if (a.dataset.show === 'true') a.textContent = addr;
});
