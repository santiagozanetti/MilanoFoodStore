document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (window.innerWidth > 992) {
    document.addEventListener("mousemove", function (e) {
      cursor.style.opacity = "1";
      cursorFollower.style.opacity = "1";

      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", function () {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursorFollower.style.width = "30px";
      cursorFollower.style.height = "30px";
    });

    document.addEventListener("mouseup", function () {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursorFollower.style.width = "40px";
      cursorFollower.style.height = "40px";
    });

    // Cursor hover effect on links and buttons
    const links = document.querySelectorAll(
      "a, button, .gallery-item, .menu-item"
    );
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.width = "0";
        cursor.style.height = "0";
        cursorFollower.style.width = "60px";
        cursorFollower.style.height = "60px";
        cursorFollower.style.borderColor = "var(--primary-color)";
        cursorFollower.style.backgroundColor = "rgba(198, 40, 40, 0.1)";
      });

      link.addEventListener("mouseleave", () => {
        cursor.style.width = "8px";
        cursor.style.height = "8px";
        cursorFollower.style.width = "40px";
        cursorFollower.style.height = "40px";
        cursorFollower.style.borderColor = "var(--primary-color)";
        cursorFollower.style.backgroundColor = "transparent";
      });
    });
  } else {
    cursor.style.display = "none";
    cursorFollower.style.display = "none";
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Menu Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      menuItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Gallery Lightbox
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeLightbox = document.querySelector(".close-lightbox");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  let currentImgIndex = 0;

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const imgSrc = item.getAttribute("data-src");
      const imgAlt = item.querySelector("img").getAttribute("alt");
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = imgAlt;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
      currentImgIndex = index;

      // Fade in animation
      setTimeout(() => {
        lightbox.style.opacity = "1";
      }, 10);
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  });

  lightboxPrev.addEventListener("click", () => {
    currentImgIndex =
      (currentImgIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentImgIndex].getAttribute("data-src");
    const imgAlt = galleryItems[currentImgIndex]
      .querySelector("img")
      .getAttribute("alt");

    // Fade out/in animation
    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = imgAlt;
      lightboxImg.style.opacity = "1";
    }, 300);
  });

  lightboxNext.addEventListener("click", () => {
    currentImgIndex = (currentImgIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentImgIndex].getAttribute("data-src");
    const imgAlt = galleryItems[currentImgIndex]
      .querySelector("img")
      .getAttribute("alt");

    // Fade out/in animation
    lightboxImg.style.opacity = "0";
    setTimeout(() => {
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = imgAlt;
      lightboxImg.style.opacity = "1";
    }, 300);
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.opacity = "0";
      setTimeout(() => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      }, 300);
    }
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      showTestimonial(index);
    });
  });

  prevBtn.addEventListener("click", () => {
    currentTestimonial =
      (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  nextBtn.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });

  // Auto rotate testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }, 8000);

  // Pause auto rotation on hover
  const testimonialContainer = document.querySelector(".testimonial-container");
  testimonialContainer.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialContainer.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 8000);
  });

  // Contact Form Submission
  const contactForm = document.getElementById("event-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      setTimeout(() => {
        formSuccess.classList.add("active");
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.remove("active");
        }, 5000);
      }, 1000);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const input = this.querySelector("input");
      const originalValue = input.value;

      input.value = "¡Gracias por suscribirte!";
      input.disabled = true;

      setTimeout(() => {
        input.value = "";
        input.disabled = false;
        input.placeholder = "Tu email";
        this.reset();
      }, 3000);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".reveal-text, .reveal-element");

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const delay = element.getAttribute("data-delay") || 0;

      if (elementPosition < windowHeight - 100) {
        setTimeout(() => {
          element.classList.add("active");
        }, delay * 1000);
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Parallax effect
  const parallaxElements = document.querySelectorAll(".parallax-element");

  window.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    parallaxElements.forEach((element) => {
      const speed = 20;
      const xPos = (x - 0.5) * speed;
      const yPos = (y - 0.5) * speed;

      element.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
  });

  // Stats counter animation
  const stats = document.querySelectorAll(".stat-number");
  let statsAnimated = false;

  function animateStats() {
    if (statsAnimated) return;

    const statsSection = document.querySelector(".stats");
    const statsSectionPosition = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsSectionPosition < windowHeight - 100) {
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-count"));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
          if (count < target) {
            count += increment;
            stat.textContent = Math.floor(count);
            requestAnimationFrame(updateCount);
          } else {
            stat.textContent = target;
          }
        };

        updateCount();
      });

      statsAnimated = true;
    }
  }

  window.addEventListener("scroll", animateStats);
  animateStats(); // Run once on page load

  // Events Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and panels
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Show corresponding panel
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Category filtering
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Show/hide FAQ items based on category
      faqItems.forEach((item) => {
        if (
          category === "all" ||
          item.getAttribute("data-category") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Search functionality
  const searchInput = document.getElementById("faq-search-input");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    faqItems.forEach((item) => {
      const questionText = item
        .querySelector(".faq-question h3")
        .textContent.toLowerCase();
      const answerText = item
        .querySelector(".faq-answer")
        .textContent.toLowerCase();

      if (
        questionText.includes(searchTerm) ||
        answerText.includes(searchTerm)
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // Reset category buttons if searching
    if (searchTerm.length > 0) {
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      document.querySelector('[data-category="all"]').classList.add("active");
    }
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
  }
});
