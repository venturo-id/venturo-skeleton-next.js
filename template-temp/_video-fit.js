/* Class-independent layout fit for video sections (Figma hashed classes are unstable).
   Finds each video, trims oversized side padding on its full-width row, fills vertical space. */
(function () {
  function px(v) { return parseFloat(v) || 0; }
  function fitOne(video) {
    if (!video || video.dataset.vfit) return;
    // climb to the full-width flex row that holds this video + the text column
    var el = video, row = null;
    for (var i = 0; i < 8 && el; i++) {
      var s = getComputedStyle(el);
      var r = el.getBoundingClientRect();
      if (s.display === 'flex' && s.flexDirection === 'row' && r.width > window.innerWidth * 0.75) { row = el; break; }
      el = el.parentElement;
    }
    if (!row) return;
    video.dataset.vfit = '1';
    var rs = getComputedStyle(row);
    // trim excessive horizontal padding (Figma often uses 150-220px)
    if (px(rs.paddingLeft) > 96) row.style.setProperty('padding-left', '56px', 'important');
    if (px(rs.paddingRight) > 96) row.style.setProperty('padding-right', '56px', 'important');
    if (px(rs.paddingTop) > 64) row.style.setProperty('padding-top', '40px', 'important');
    if (px(rs.paddingBottom) > 64) row.style.setProperty('padding-bottom', '40px', 'important');
    if (px(rs.gap) < 24) row.style.setProperty('gap', '40px', 'important');
    row.style.setProperty('align-items', 'center', 'important');
  }
  function scan() {
    var vids = document.querySelectorAll('.vf-wrap, iframe[src*="youtube"]');
    for (var i = 0; i < vids.length; i++) fitOne(vids[i]);
  }
  if (document.readyState !== 'loading') scan();
  else document.addEventListener('DOMContentLoaded', scan);
  try { new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
  setTimeout(scan, 2000); setTimeout(scan, 5000);
  window.addEventListener('scroll', function () { scan(); }, { passive: true });
})();
