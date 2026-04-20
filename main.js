/* ═══════════════════════════════════════
   PayResolve Financial Solutions
   main.js — All JavaScript
═══════════════════════════════════════ */

/* ── Mobile Menu ── */
function closeMob() {
  document.getElementById('ham')?.classList.remove('open');
  document.getElementById('mobNav')?.classList.remove('open');
}
document.getElementById('ham')?.addEventListener('click', function() {
  this.classList.toggle('open');
  document.getElementById('mobNav')?.classList.toggle('open');
});

/* ── Navbar scroll effect ── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  const st = document.getElementById('scrollTop');
  if (st) st.classList.toggle('show', window.scrollY > 400);
});

/* ── Active nav link ── */
const navLinks = document.querySelectorAll('.nav-link');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

/* ── Reveal on scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── Toast ── */
function showToast(msg, type = 'ok') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.className = 'toast', 4000);
}

/* ── Web3Forms Contact Form ── */
const form = document.getElementById('caseForm');
if (form) {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('btnSpinner');
    const errMsg = document.getElementById('formErr');

    btn.disabled = true;
    if (btnText) btnText.textContent = 'Submitting...';
    if (spinner) spinner.style.display = 'block';
    if (errMsg) errMsg.style.display = 'none';

    try {
      const data = Object.fromEntries(new FormData(this));
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        document.getElementById('formWrap').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
        showToast('✅ Case submitted! We\'ll call you within 24 hours.', 'ok');
      } else throw new Error(json.message);
    } catch (err) {
      if (errMsg) errMsg.style.display = 'block';
      showToast('❌ Submission failed. Please WhatsApp us.', 'err');
      btn.disabled = false;
      if (btnText) btnText.textContent = 'Submit Case for Free Evaluation →';
      if (spinner) spinner.style.display = 'none';
    }
  });
}

/* ── Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
