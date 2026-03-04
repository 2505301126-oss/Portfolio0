/* ─────────────────────────────────────
   Harsh Shroti Portfolio — script.js
   ───────────────────────────────────── */

/* ── Cursor Glow ── */
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => cursorGlow.style.opacity = '0');
document.addEventListener('mouseenter', () => cursorGlow.style.opacity = '1');

/* ── Navbar Scroll & Active Links ── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Active nav highlighting
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
});

/* ── Mobile Hamburger ── */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
    const spans = hamburger.querySelectorAll('span');
    if (navbar.classList.contains('mobile-open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});
// Close on nav link click
document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
        navbar.classList.remove('mobile-open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

/* ── Hero Stat Counter ── */
function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
    }, 16);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(animateCounter);
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ── Skill Bars ── */
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                fill.style.width = fill.getAttribute('data-width') + '%';
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-grid').forEach(g => skillObserver.observe(g));

/* ── Work Filter ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        workCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const visible = filter === 'all' || category === filter;
            card.classList.toggle('hidden', !visible);
            if (visible) {
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            }
        });
    });
});

/* ── Testimonial Slider ── */
let testiIndex = 0;
const testiCards = document.querySelectorAll('.testi-card');
const dotBtns = document.querySelectorAll('.dot-btn');

function showTesti(index) {
    testiCards.forEach((c, i) => c.classList.toggle('active', i === index));
    dotBtns.forEach((d, i) => d.classList.toggle('active', i === index));
    testiIndex = index;
}

dotBtns.forEach(btn => {
    btn.addEventListener('click', () => showTesti(+btn.getAttribute('data-index')));
});

// Auto-rotate
setInterval(() => {
    showTesti((testiIndex + 1) % testiCards.length);
}, 4000);

/* ── Contact Form Validation & Submission ── */
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('clientName');
const emailInput = document.getElementById('clientEmail');
const typeSelect = document.getElementById('projectType');
const detailsInput = document.getElementById('projectDetails');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const formSuccess = document.getElementById('formSuccess');

const nameErr = document.getElementById('nameErr');
const emailErr = document.getElementById('emailErr');
const typeErr = document.getElementById('typeErr');
const detailsErr = document.getElementById('detailsErr');

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
    [nameErr, emailErr, typeErr, detailsErr].forEach(e => e.textContent = '');
}

function validateForm() {
    clearErrors();
    let valid = true;

    if (!nameInput.value.trim()) {
        nameErr.textContent = 'Please enter your name.'; valid = false;
    }
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailErr.textContent = 'Please enter a valid email.'; valid = false;
    }
    if (!typeSelect.value) {
        typeErr.textContent = 'Please select a project type.'; valid = false;
    }
    if (!detailsInput.value.trim() || detailsInput.value.trim().length < 20) {
        detailsErr.textContent = 'Please describe your project (min 20 chars).'; valid = false;
    }
    return valid;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate sending (no backend)
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    submitBtn.style.opacity = '0.7';

    setTimeout(() => {
        submitBtn.style.display = 'none';
        formSuccess.style.display = 'flex';
        form.reset();
    }, 1800);
});

// Real-time validation clear
[nameInput, emailInput, detailsInput].forEach(input => {
    input.addEventListener('input', clearErrors);
});

/* ── Scroll Reveal (generic) ── */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.skill-card, .work-card, .testi-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    const delay = el.getAttribute('data-delay');
    if (delay) el.style.transitionDelay = delay + 'ms';
    revealObserver.observe(el);
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ── Play button toggle ── */
let playing = false;
document.getElementById('playBtn')?.addEventListener('click', function () {
    playing = !playing;
    this.innerHTML = playing
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
        : `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
});

console.log('%c🎬 Harsh Shroti Portfolio', 'color: #7B5CFA; font-size: 20px; font-weight: bold;');
console.log('%cAn editor who can\'t edit his own life 😄', 'color: #FF4ECD; font-size: 13px;');
