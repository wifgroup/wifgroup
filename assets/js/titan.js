// Titan — scroll reveal + mobile nav
(function () {
  'use strict';

  // Add .js class to body so CSS reveal animations activate
  document.body.classList.add('js');

  // Scroll reveal
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(function(el) {
    observer.observe(el);
  });

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  if (toggle && navMobile) {
    toggle.addEventListener('click', function() {
      var open = navMobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    navMobile.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navMobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }
})();
