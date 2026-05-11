/* ============================================================
   LARA.ai — script.js
   ============================================================ */

(function () {
  'use strict';

  /* --- Custom cursor (desktop only) --- */
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');

  if (cursor && cursorRing) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
        cursorRing.style.opacity = '0.2';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.opacity = '0.6';
      });
    });
  }

  /* --- Nav: scroll shadow + active link --- */
  var nav      = document.querySelector('nav');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  var sections = Array.from(
    document.querySelectorAll('section[id]')
  );

  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    highlightActiveNav();
  }, { passive: true });

  function highlightActiveNav() {
    var scrollMid = window.scrollY + window.innerHeight / 2;
    var current = '';
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollMid) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  /* --- Mobile hamburger --- */
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll reveal (IntersectionObserver) --- */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var delay = entry.target.dataset.delay || i * 80;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, Number(delay));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Cert progress bars: animate when in view --- */
  var progressBars = document.querySelectorAll('.cert-progress-fill');

  if ('IntersectionObserver' in window && progressBars.length) {
    var progressObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(function (bar) {
      progressObserver.observe(bar);
    });
  }

  /* --- Contact form (Formspree async) --- */
  var contactForm    = document.getElementById('contactForm');
  var formSuccess    = document.getElementById('formSuccess');
  var submitBtn      = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        var formData = new FormData(contactForm);
        var response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.style.display = 'none';
          if (formSuccess) {
            formSuccess.classList.add('visible');
          }
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Try Again →';
        }
        alert('Sorry, something went wrong. Please email us directly at hello@lara-ai.in');
      }
    });
  }

})();
