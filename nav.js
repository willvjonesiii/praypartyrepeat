/* nav.js — injects nav + footer + cursor + scroll logic */
(function() {

  /* ── cursor: crystal image + glow orb ── */
  document.body.insertAdjacentHTML('afterbegin',
    '<div id="cursor"></div>' +
    '<img id="cursor-crystal" src="crystal-cursor.png" alt="" draggable="false" />'
  );
  const cur = document.getElementById('cursor');
  const crystal = document.getElementById('cursor-crystal');
  let mx=0, my=0, cx=0, cy=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function tick(){
    cx += (mx-cx)*0.12; cy += (my-cy)*0.12;
    cur.style.left     = cx+'px';     cur.style.top     = cy+'px';
    crystal.style.left = mx+'px';     crystal.style.top = my+'px';
    requestAnimationFrame(tick);
  })();
  document.addEventListener('mouseover', e => {
    if(e.target.closest('a,button')) { cur.classList.add('on-link'); crystal.classList.add('on-link'); }
  });
  document.addEventListener('mouseout', e => {
    if(e.target.closest('a,button')) { cur.classList.remove('on-link'); crystal.classList.remove('on-link'); }
  });

  /* ── nav ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const links = [
    { href:'index.html', label:'Home' },
    { href:'about.html', label:'About' },
    { href:'walking-with-the-elements.html', label:'Walking with the Elements' },
    { href:'services.html', label:'Services' },
    { href:'index.html#contact', label:'Contact' },
  ];
  const liItems = links.map(l=>`
    <li><a href="${l.href}" class="${l.href===page||l.href.startsWith(page)?'active':''}">${l.label}</a></li>
  `).join('');
  const mobileLinks = links.map(l=>`
    <li><a href="${l.href}" class="${l.href===page||l.href.startsWith(page)?'active':''}">${l.label}</a></li>
  `).join('<li><div class="nav-mobile-divider"></div></li>');

  const navHTML = `
  <nav id="sitenav">
    <a href="index.html" class="nav-brand">Pray Party Repeat</a>
    <ul class="nav-links">${liItems}</ul>
    <div style="display:flex;align-items:center;gap:14px;">
      <a href="https://calendly.com/praypartyrepeat" target="_blank" class="nav-cta">Book Online</a>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-mobile-menu" id="nav-mobile-menu">
    <ul class="nav-mobile-links">${mobileLinks}</ul>
    <a href="https://calendly.com/praypartyrepeat" target="_blank" class="nav-mobile-cta">Book Online</a>
  </div>`;
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ── nav scroll ── */
  const nav = document.getElementById('sitenav');
  if (page === 'index.html' || page === '') nav.classList.add('over-dark');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

  /* ── hamburger toggle ── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── footer ── */
  const footerHTML = `
  <footer>
    <div class="footer-top">
      <div>
        <span class="footer-brand">Pray Party Repeat</span>
        <p class="footer-tagline">Empower Your Healing Journey</p>
        <div class="footer-social" style="margin-top:20px;">
          <a href="https://www.instagram.com/praypartyrepeat/" target="_blank" title="Instagram">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.facebook.com/mari.soo.juicy" target="_blank" title="Facebook">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-links-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="walking-with-the-elements.html">Walking with the Elements</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="index.html#contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-links-col">
        <h4>Book</h4>
        <ul>
          <li><a href="https://calendly.com/praypartyrepeat/discoverycall" target="_blank">Discovery Call</a></li>
          <li><a href="https://calendly.com/praypartyrepeat/remotehealing" target="_blank">Reiki, Sound &amp; Crystal Healing</a></li>
          <li><a href="https://calendly.com/praypartyrepeat" target="_blank">All Sessions</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">Copyright &copy; 2025 PrayPartyRepeat - All Rights Reserved.</p>
    </div>
  </footer>`;
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ── scroll reveal ── */
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, {threshold:0.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

})();
