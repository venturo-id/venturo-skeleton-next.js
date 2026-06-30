/* YouTube facade: replace heavy iframe with a clean poster + custom play button.
   Cleaner look (no big red YT play) + faster load (iframe only on click). */
(function () {
  var TEAL = "#16b89a";
  var css = document.createElement("style");
  css.textContent = [
    ".vf-wrap{position:relative;width:100%;height:100%;cursor:pointer;overflow:hidden;border-radius:inherit;background:#0e3a3a}",
    ".vf-wrap img.vf-poster{width:100%;height:100%;object-fit:cover;display:block}",
    ".vf-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}",
    ".vf-play svg{width:68px;height:68px;filter:drop-shadow(0 6px 16px rgba(0,0,0,.35));transition:transform .18s}",
    ".vf-wrap:hover .vf-play svg{transform:scale(1.08)}"
  ].join("");
  document.head.appendChild(css);

  function ytId(src) {
    var m = (src || "").match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
    return m ? m[1] : null;
  }
  var PLAY = '<div class="vf-play"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="38" fill="' + TEAL + '" opacity=".95"/><path d="M33 27l22 13-22 13z" fill="#fff"/></svg></div>';

  function facade(iframe) {
    if (iframe.dataset.vf) return;
    var id = ytId(iframe.src || iframe.getAttribute("src"));
    if (!id) return;
    iframe.dataset.vf = "1";
    var w = document.createElement("div");
    w.className = "vf-wrap";
    w.innerHTML = '<img class="vf-poster" loading="lazy" alt="Tonton video Venturo" ' +
      'src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" ' +
      'onerror="this.src=\'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg\'">' + PLAY;
    iframe.parentNode.insertBefore(w, iframe);
    iframe.style.display = "none";
    w.addEventListener("click", function () {
      iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.style.display = "";
      w.remove();
    });
  }
  function scan() {
    var ifr = document.querySelectorAll('iframe[src*="youtube.com/embed"],iframe[src*="youtu.be"]');
    for (var i = 0; i < ifr.length; i++) facade(ifr[i]);
  }
  if (document.readyState !== "loading") scan();
  else document.addEventListener("DOMContentLoaded", scan);
  try { new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  setTimeout(scan, 2000); setTimeout(scan, 4500);
})();
