/* ===== AG Web Design Portfolio - Main Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';

  if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- Sticky Navbar ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // --- Back to Top ---
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
        document.body.classList.add('has-scroll');
      } else {
        backToTop.classList.remove('visible');
        document.body.classList.remove('has-scroll');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Animated Counters ---
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };
      update();
    });
    countersAnimated = true;
  }

  // --- Scroll Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters when hero stats are visible
        if (entry.target.classList.contains('hero-stats') ||
            entry.target.querySelector?.('.stat-number')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // Also observe hero stats specifically
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.5 });
    statsObserver.observe(heroStats);
  }

  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- Testimonials Slider ---
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (track && prevBtn && nextBtn) {
    const cards = track.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    const totalSlides = cards.length;

    function goToSlide(index) {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-advance testimonials
    setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.query
