// Decodes email links — defeats Cloudflare's Email Address Obfuscation.
// Nav and footer are hardcoded in each page's HTML.
document.querySelectorAll('a[data-em]').forEach(function (a) {
  var addr = a.dataset.em + '\u0040' + a.dataset.dm;
  a.href = 'mailto:' + addr;
  if (a.dataset.show === 'true') a.textContent = addr;
});
