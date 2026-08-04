// ============================================
// AG Web Design - Main Script
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- 1. CONTACT FORM (Local) ----------
  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const data = {
        name: form.name.value.trim(),
        business: form.business.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        services: form.services.value,
        message: form.message.value.trim()
      };

      // Validation
      if (!data.name || !data.email || !data.message) {
        showFormMessage('Please fill in all required fields (Name, Email, and Message).', 'error');
        return;
      }

      // Log for testing
      console.log('Form submitted:', data);

      // Success message
      showFormMessage('Thank you! Your message has been received. We’ll get back to you within 24 hours.', 'success');

      // Optional: open email client (uncomment if you want this)
      /*
      const subject = encodeURIComponent('New Quote Request from ' + data.name);
      const body = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Business: ${data.business || 'N/A'}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone || 'N/A'}\n` +
        `Service: ${data.services || 'Not specified'}\n\n` +
        `Message:\n${data.message}`
      );
      window.location.href = `mailto:AAGilreath@student.fullsail.edu?subject=${subject}&body=${body}`;
      */

      form.reset();
    });
  }

  function showFormMessage(text, type) {
    if (!messageBox) return;

    messageBox.style.display = 'block';
    messageBox.textContent = text;

    if (type === 'success') {
      messageBox.style.background = '#ecfdf5';
      messageBox.style.color = '#065f46';
      messageBox.style.border = '1px solid #a7f3d0';
    } else {
      messageBox.style.background = '#fef2f2';
      messageBox.style.color = '#991b1b';
      messageBox.style.border = '1px solid #fecaca';
    }

    // Auto-hide after 6 seconds
    setTimeout(() => {
      messageBox.style.display = 'none';
      messageBox.textContent = '';
    }, 6000);
  }

  // ---------- 2. MOBILE NAV (Hamburger) ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ---------- 3. DARK / LIGHT THEME TOGGLE ----------
  const themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');

      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // ---------- 4. BACK TO TOP BUTTON ----------
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- 5. NAVBAR SCROLL EFFECT ----------
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---------- 6. PORTFOLIO FILTERS ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------- 7. TESTIMONIALS SLIDER ----------
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (track && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;

    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % total;
      updateSlider();
    });

    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + total) % total;
      updateSlider();
    });
  }

  // ---------- 8. FAQ ACCORDION ----------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Open clicked one (if it was closed)
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // ---------- 9. STATS COUNTER ----------
  const statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 30);
  }

  // Trigger counters when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));

  // ---------- 10. FADE-IN ON SCROLL ----------
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));

});
