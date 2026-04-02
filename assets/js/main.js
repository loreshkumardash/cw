(function () {
  "use strict";


  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }


  function initNavbar() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }


  function initMobileMenu() {
    const toggle = document.querySelector(".mobile-toggle");
    const menu = document.querySelector(".nav-menu");
    const services = document.querySelector(".has-mega");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
      const icon = toggle.querySelector("i");
      icon.classList.toggle("bi-list");
      icon.classList.toggle("bi-x");
    });


    menu.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {

        if (link.closest(".has-mega") && window.innerWidth < 992) {
          return;
        }
        menu.classList.remove("active");
        toggle.querySelector("i").classList.add("bi-list");
        toggle.querySelector("i").classList.remove("bi-x");
      });
    });


    document.querySelectorAll(".has-mega").forEach(function (megaItem) {
      const megaLink = megaItem.querySelector("a");
      if (megaLink) {
        megaLink.addEventListener("click", function (e) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            e.stopPropagation();

            document.querySelectorAll(".has-mega").forEach(function (other) {
              if (other !== megaItem) {
                other.classList.remove("active");
              }
            });
            megaItem.classList.toggle("active");
          }
        });
      }
    });
  }


  function initScrollTop() {
    const scrollTop = document.querySelector(".scroll-top");
    if (!scrollTop) return;

    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    });

    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0 },
        ease: "power2.inOut",
      });
    });
  }


  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || href === "") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power2.inOut",
          });
        }
      });
    });
  }


  function initHeroAnimations() {
    const hero = document.querySelector("#hero");
    if (!hero) return;


    gsap.to(".shape-1", {
      y: 100,
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".shape-2", {
      y: -80,
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".shape-3", {
      y: 60,
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });


    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      if (isNaN(target)) return;


      stat.innerText = "0";


      const rect = stat.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight * 0.85;

      if (isInViewport) {

        gsap.to(stat, {
          innerText: target,
          duration: 2,
          delay: 0.5,
          snap: { innerText: 1 },
          ease: "power1.out",
          modifiers: {
            innerText: function (value) {
              return Math.floor(value);
            },
          },
        });
      } else {

        gsap.to(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
            once: true,
          },
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power1.out",
          modifiers: {
            innerText: function (value) {
              return Math.floor(value);
            },
          },
        });
      }
    });
  }


  function initSectionAnimations() {
    const sectionHeaders = document.querySelectorAll(".section-header");

    sectionHeaders.forEach((header) => {
      const subtitle = header.querySelector(".section-subtitle");
      const title = header.querySelector(".section-title");
      const description = header.querySelector(".section-description");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: header,
            start: "top bottom-=100",
            once: true,
          },
        })
        .to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0,
        )
        .to(
          title,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );


      if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 });
      if (title) gsap.set(title, { opacity: 0, y: 20 });
      if (description) gsap.set(description, { opacity: 0, y: 20 });
    });
  }


  function initServicesAnimations() {
    const services = document.querySelector("#services");
    if (!services) return;

    const serviceCards = services.querySelectorAll(".service-card");


    gsap.set(serviceCards, { opacity: 0, y: 60 });

    gsap.to(serviceCards, {
      scrollTrigger: {
        trigger: services,
        start: "top bottom-=200",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: "start",
      },
      ease: "power2.out",
    });
  }


  function initAboutAnimations() {
    const about = document.querySelector("#about");
    if (!about) return;

    const aboutImage = about.querySelector(".about-image-main img");
    if (aboutImage) {
      gsap.from(aboutImage, {
        scale: 1.1,
        scrollTrigger: {
          trigger: about,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }


    const badge = about.querySelector(".experience-badge");
    if (badge) {
      gsap.set(badge, { opacity: 0, scale: 0.8 });
      gsap.to(badge, {
        scrollTrigger: {
          trigger: badge,
          start: "top bottom-=50",
          once: true,
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }
  }


  function initCTAAnimations() {
    const cta = document.querySelector("#cta");
    if (!cta) return;

    const ctaCard = cta.querySelector(".cta-card");

    gsap.set(ctaCard, { opacity: 0, scale: 0.95 });
    gsap.to(ctaCard, {
      scrollTrigger: {
        trigger: cta,
        start: "top bottom-=100",
        once: true,
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }


  function initFooterAnimations() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    const footerCols = footer.querySelectorAll(".footer-top .row > div");

    gsap.set(footerCols, { opacity: 0, y: 30 });
    gsap.to(footerCols, {
      scrollTrigger: {
        trigger: footer,
        start: "top bottom-=100",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
    });


    const socialLinks = footer.querySelectorAll(".social-links a");
    socialLinks.forEach((link, i) => {
      gsap.set(link, { opacity: 0, scale: 0, rotation: -180 });
      gsap.to(link, {
        scrollTrigger: {
          trigger: footer,
          start: "top bottom-=50",
          once: true,
        },
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        delay: 0.5 + i * 0.1,
        ease: "back.out(1.7)",
      });
    });
  }


  function initTestimonialAnimations() {
    const testimonials = document.querySelector("#testimonials");
    if (!testimonials) return;

    const sectionTitle = testimonials.querySelector(".section-title");
    const sectionSubtitle = testimonials.querySelector(".section-subtitle");
    const sectionDesc = testimonials.querySelector(".section-description");


    gsap.set([sectionSubtitle, sectionTitle, sectionDesc], {
      opacity: 0,
      y: 30,
    });


    gsap.to([sectionSubtitle, sectionTitle, sectionDesc], {
      scrollTrigger: {
        trigger: testimonials,
        start: "top bottom-=100",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }
  function initProductsHorizontalScroll() {
    const section = document.querySelector("#products");
    const track = document.querySelector(".products-scroll-track");
    const viewport = document.querySelector(".products-scroll-viewport");

    if (!section || !track || !viewport) return;

    const cards = track.querySelectorAll(".product-scroll-card");


    function setupScroll() {
      const trackWidth = track.scrollWidth;
      const viewportWidth = viewport.offsetWidth;
      const scrollDistance = trackWidth - viewportWidth;

      if (scrollDistance <= 0 || window.innerWidth <= 768) return;


      gsap.set(cards, { opacity: 0, x: 60 });

      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });


      gsap.to(track, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    setupScroll();


    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }


  function initLightbox() {
    if (typeof GLightbox !== "undefined") {
      GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: false,
        autoplayVideos: true,
      });
    }
  }


  function initTestimonialSlider() {
    const testimonialSwiper = document.querySelector(".testimonial-swiper");
    if (!testimonialSwiper || typeof Swiper === "undefined") return;

    new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  }


  function initAOS() {
    if (typeof AOS !== "undefined") {

      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 50,

        startEvent: "DOMContentLoaded",

        disable: function () {

          return false;
        },
      });


      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }


  function fixAnimationVisibility() {

    window.addEventListener("load", () => {

      setTimeout(() => {
        ScrollTrigger.refresh();


        ScrollTrigger.update();
      }, 100);


      setTimeout(() => {
        ScrollTrigger.refresh();
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      }, 500);
    });
  }


  function initCustomCursor() {

    if (window.innerWidth <= 768) return;


    const cursorDot = document.createElement("div");
    const cursorOutline = document.createElement("div");
    const cursorGlow = document.createElement("div");

    cursorDot.className = "cursor-dot";
    cursorOutline.className = "cursor-outline";
    cursorGlow.className = "cursor-glow";

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);
    document.body.appendChild(cursorGlow);


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;


    let dotX = mouseX;
    let dotY = mouseY;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;


    const dotSmoothing = 0.5;
    const outlineSmoothing = 0.15;
    const glowSmoothing = 0.1;


    let magneticElement = null;


    const interactiveSelector =
      'a, button, .btn, input, textarea, [role="button"], .nav-links a, .navbar-brand, .mobile-toggle';


    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });


    document.addEventListener("mouseover", (e) => {
      const interactiveEl = e.target.closest(interactiveSelector);
      if (interactiveEl) {
        cursorOutline.classList.add("hovered");


        if (
          interactiveEl.classList.contains("magnetic") ||
          interactiveEl.classList.contains("btn") ||
          interactiveEl.tagName === "A" ||
          interactiveEl.tagName === "BUTTON"
        ) {
          magneticElement = interactiveEl;
        }
      }
    });

    document.addEventListener("mouseout", (e) => {
      const interactiveEl = e.target.closest(interactiveSelector);
      if (interactiveEl) {
        cursorOutline.classList.remove("hovered");
        magneticElement = null;


        if (interactiveEl.classList.contains("magnetic")) {
          interactiveEl.style.transform = "translate(0, 0)";
        }
      }
    });


    document.addEventListener("click", (e) => {
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);


      setTimeout(() => {
        ripple.remove();
      }, 600);
    });


    function animate() {

      dotX += (mouseX - dotX) * dotSmoothing;
      dotY += (mouseY - dotY) * dotSmoothing;


      outlineX += (mouseX - outlineX) * outlineSmoothing;
      outlineY += (mouseY - outlineY) * outlineSmoothing;


      glowX += (mouseX - glowX) * glowSmoothing;
      glowY += (mouseY - glowY) * glowSmoothing;


      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";

      cursorOutline.style.left = outlineX + "px";
      cursorOutline.style.top = outlineY + "px";

      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";


      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = mouseX - centerX;
        const distanceY = mouseY - centerY;

        const maxDistance = 100;
        const distance = Math.sqrt(
          distanceX * distanceX + distanceY * distanceY,
        );

        if (distance < maxDistance) {
          const pullX = (distanceX / maxDistance) * 20;
          const pullY = (distanceY / maxDistance) * 20;

          magneticElement.style.transform = `translate(${pullX}px, ${pullY}px)`;


          outlineX += (centerX - outlineX) * 0.1;
          outlineY += (centerY - outlineY) * 0.1;
        }
      }

      requestAnimationFrame(animate);
    }


    animate();


    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
      cursorGlow.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1";
      cursorOutline.style.opacity = "1";
      cursorGlow.style.opacity = "1";
    });


    document.querySelectorAll(".btn, button, a[href]").forEach((el) => {
      el.classList.add("magnetic");
    });
  }


  function setCurrentYear() {
    const yearElement = document.getElementById("current-year");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }


  let serviceData = null;
  let currentService = null;


  let productData = null;
  let currentProduct = null;

  function getServiceFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
      slug: params.get("service"),
      id: params.get("id"),
    };
  }

  function getProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
      slug: params.get("product"),
      id: params.get("id"),
    };
  }

  function findService(data, params) {
    if (params.slug) {
      return data.services.find((s) => s.slug === params.slug);
    }
    if (params.id) {
      return data.services.find((s) => s.id === parseInt(params.id));
    }
    return data.services[0];
  }

  function findProduct(data, params) {
    if (params.slug) {
      return data.products.find((p) => p.slug === params.slug);
    }
    if (params.id) {
      return data.products.find((p) => p.id === parseInt(params.id));
    }
    return data.products[0];
  }

  function renderMegaMenu(services, activeServiceSlug = null) {
    const container = document.getElementById("mega-menu-services");
    if (!container) return;

    const descriptions = {
      "Web Development": "Custom web solutions",
      "Website Design": "Modern UI design",
      "Software Development": "Business software systems",
      "Ecommerce Development": "Online store development",
      "SEO Optimization": "Improve search rankings",
      "ERP Development": "Enterprise resource planning",
      "Mobile Application": "Android & iOS apps",
      "Digital Marketing": "Online brand promotion",
      "SMO Service": "Social profile optimization",
      "SMM Service": "Social media marketing",
    };

    container.innerHTML = services
      .map((service) => {

        const iconName = service.icon
          ? service.icon.replace("bi-", "")
          : "code-slash";
        return `
      <a href="service-details.html?service=${service.slug}" class="mega-item ${activeServiceSlug === service.slug ? "active" : ""}">
        <span class="mega-icon"><i class="bi bi-${iconName}"></i></span>
        <div>
          <h6>${service.title}</h6>
          <p>${service.shortDescription || descriptions[service.title] || "Learn more"}</p>
        </div>
      </a>
    `;
      })
      .join("");
  }

  function renderProductsMegaMenu(products, activeProductSlug = null) {
    const container = document.getElementById("mega-menu-products");
    if (!container) return;

    container.innerHTML = products
      .map((product) => {

        const iconName = product.icon
          ? product.icon.replace("bi-", "")
          : "mortarboard";
        return `
      <a href="product-details.html?product=${product.slug}" class="mega-item ${activeProductSlug === product.slug ? "active" : ""}">
        <span class="mega-icon"><i class="bi bi-${iconName}"></i></span>
        <div>
          <h6>${product.title}</h6>
          <p>${product.shortDescription || "Learn more"}</p>
        </div>
      </a>
    `;
      })
      .join("");
  }


  async function initMegaMenu() {

    const servicesMegaMenuContainer = document.getElementById("mega-menu-services");
    if (servicesMegaMenuContainer) {
      try {
        const response = await fetch("assets/json/service.json");
        if (!response.ok) throw new Error("Failed to load service data");

        serviceData = await response.json();


        const params = getServiceFromURL();
        let activeServiceSlug = null;

        if (params.slug || params.id) {
          const currentService = findService(serviceData, params);
          activeServiceSlug = currentService ? currentService.slug : null;
        }

        renderMegaMenu(serviceData.services, activeServiceSlug);
      } catch (error) {
        console.error("Error loading services mega menu:", error);
      }
    }


    const productsMegaMenuContainer = document.getElementById("mega-menu-products");
    if (productsMegaMenuContainer) {
      try {
        const response = await fetch("assets/json/product.json");
        if (!response.ok) throw new Error("Failed to load product data");

        productData = await response.json();


        const params = getProductFromURL();
        let activeProductSlug = null;

        if (params.slug || params.id) {
          const currentProduct = findProduct(productData, params);
          activeProductSlug = currentProduct ? currentProduct.slug : null;
        }

        renderProductsMegaMenu(productData.products, activeProductSlug);
      } catch (error) {
        console.error("Error loading products mega menu:", error);
      }
    }
  }

  function renderServiceDetails(service) {

    document.title = `${service.title} - Cakiweb Solutions`;
    const pageTitle = document.getElementById("page-title");
    if (pageTitle)
      pageTitle.textContent = `${service.title} - Cakiweb Solutions`;

    const pageDescription = document.getElementById("page-description");
    if (pageDescription) pageDescription.textContent = service.fullDescription;


    const serviceTitle = document.getElementById("service-title");
    if (serviceTitle) serviceTitle.textContent = service.title;

    const serviceShortDesc = document.getElementById("service-short-desc");
    if (serviceShortDesc)
      serviceShortDesc.textContent = service.shortDescription;


    const serviceFullDesc = document.getElementById("service-full-desc");
    if (serviceFullDesc) serviceFullDesc.textContent = service.fullDescription;


    const whyChooseContainer = document.getElementById("service-why-choose");
    if (whyChooseContainer && service.whyChooseUs) {
      whyChooseContainer.innerHTML = service.whyChooseUs
        .map(
          (item, index) => {
            const iconName = item.icon ? item.icon.replace("bi-", "") : "check-circle";
            return `
        <div class="why-choose-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="why-choose-icon">
            <i class="bi bi-${iconName}"></i>
          </div>
          <p>${item.text || item}</p>
        </div>
      `;
          }
        )
        .join("");
    }


    const benefitsContainer = document.getElementById("service-benefits");
    if (benefitsContainer && service.benefits) {
      benefitsContainer.innerHTML = service.benefits
        .map(
          (benefit, index) => `
        <div class="benefit-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="benefit-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <p>${benefit}</p>
        </div>
      `,
        )
        .join("");
    }


    const featuresContainer = document.getElementById("service-features");
    if (featuresContainer && service.features) {
      featuresContainer.innerHTML = service.features
        .map(
          (feature) => `
        <li><i class="bi bi-check2"></i> ${feature}</li>
      `,
        )
        .join("");
    }


    const deliverablesContainer = document.getElementById(
      "service-deliverables",
    );
    if (deliverablesContainer && service.deliverables) {
      deliverablesContainer.innerHTML = service.deliverables
        .map(
          (item, index) => `
        <li data-aos="fade-up" data-aos-delay="${index * 100}">
          <i class="bi bi-box-seam"></i> ${item}
        </li>
      `,
        )
        .join("");
    }


    const industriesContainer = document.getElementById("service-industries");
    if (industriesContainer && service.industries) {
      industriesContainer.innerHTML = service.industries
        .map(
          (industry, index) => `
        <div class="industry-tag" data-aos="fade-up" data-aos-delay="${index * 100}">
          <i class="bi bi-briefcase"></i> ${industry}
        </div>
      `,
        )
        .join("");
    }


    const processContainer = document.getElementById("service-process");
    if (processContainer && service.process) {
      processContainer.innerHTML = service.process
        .map(
          (step, index) => `
        <div class="process-step" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="step-number">${step.step}</div>
          <div class="step-content">
            <h4>${step.title}</h4>
            <p>${step.description}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }


    const faqContainer = document.getElementById("service-faq");
    if (faqContainer && service.faq) {
      faqContainer.innerHTML = service.faq
        .map(
          (faq, index) => `
        <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="faq-question" onclick="toggleFaq(this)">
            <h4>${faq.question}</h4>
            <i class="bi bi-plus-lg"></i>
          </div>
          <div class="faq-answer">
            <p>${faq.answer}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }


    const iconLarge = document.getElementById("service-icon-large");
    if (iconLarge) {

      const iconName = service.icon.replace("bi-", "");
      iconLarge.innerHTML = `<i class="bi bi-${iconName}"></i>`;
    }


    const sidebarServiceTitle = document.getElementById(
      "sidebar-service-title",
    );
    if (sidebarServiceTitle) sidebarServiceTitle.textContent = service.title;


    const techContainer = document.getElementById("service-technologies");
    if (techContainer && service.technologies) {
      techContainer.innerHTML = service.technologies
        .map((tech) => {
          const iconName = tech.icon || "bi-circle-fill";
          return `<span class="tech-tag"><i class="bi ${iconName}"></i> ${tech.name}</span>`;
        })
        .join("");
    }


    const allServicesContainer = document.getElementById("all-services-list");
    if (allServicesContainer) {
      allServicesContainer.innerHTML = serviceData.services
        .map(
          (s) => `
        <li>
          <a href="service-details.html?service=${s.slug}" class="${s.slug === service.slug ? "active" : ""}">
            <i class="bi bi-chevron-right"></i> ${s.title}
          </a>
        </li>
      `,
        )
        .join("");
    }
  }


  async function initServiceDetails() {

    if (!document.getElementById("service-title")) return;

    try {

      if (!serviceData || !serviceData.services) {
        const response = await fetch("assets/json/service.json");
        if (!response.ok) throw new Error("Failed to load service data");
        serviceData = await response.json();
      }

      const params = getServiceFromURL();
      currentService = findService(serviceData, params);

      if (!currentService) {
        const serviceTitle = document.getElementById("service-title");
        const serviceShortDesc = document.getElementById("service-short-desc");
        if (serviceTitle) serviceTitle.textContent = "Service Not Found";
        if (serviceShortDesc)
          serviceShortDesc.textContent =
            "The requested service could not be found.";
        return;
      }

      renderServiceDetails(currentService);


      if (typeof AOS !== "undefined") {
        setTimeout(() => AOS.refresh(), 100);
      }
    } catch (error) {
      console.error("Error loading service details:", error);
      const serviceTitle = document.getElementById("service-title");
      const serviceShortDesc = document.getElementById("service-short-desc");
      if (serviceTitle) serviceTitle.textContent = "Error Loading Service";
      if (serviceShortDesc)
        serviceShortDesc.textContent =
          "Unable to load service details. Please try again later.";
    }
  }


  function toggleFaq(element) {
    const faqItem = element.parentElement;
    const faqAnswer = element.nextElementSibling;
    const icon = element.querySelector("i");

    faqItem.classList.toggle("active");

    if (faqItem.classList.contains("active")) {
      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      icon.classList.remove("bi-plus-lg");
      icon.classList.add("bi-dash-lg");
    } else {
      faqAnswer.style.maxHeight = "0";
      icon.classList.remove("bi-dash-lg");
      icon.classList.add("bi-plus-lg");
    }
  }


  function renderProductDetails(product) {

    document.title = `${product.title} - Cakiweb Solutions`;
    const pageTitle = document.getElementById("page-title");
    if (pageTitle)
      pageTitle.textContent = `${product.title} - Cakiweb Solutions`;

    const pageDescription = document.getElementById("page-description");
    if (pageDescription) pageDescription.textContent = product.fullDescription;


    const productTitle = document.getElementById("product-title");
    if (productTitle) productTitle.textContent = product.title;

    const productShortDesc = document.getElementById("product-short-desc");
    if (productShortDesc)
      productShortDesc.textContent = product.shortDescription;


    const productFullDesc = document.getElementById("product-full-desc");
    if (productFullDesc) productFullDesc.textContent = product.fullDescription;


    const whyChooseContainer = document.getElementById("product-why-choose");
    if (whyChooseContainer && product.whyChooseUs) {
      whyChooseContainer.innerHTML = product.whyChooseUs
        .map(
          (item, index) => {
            const iconName = item.icon ? item.icon.replace("bi-", "") : "check-circle";
            return `
        <div class="why-choose-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="why-choose-icon">
            <i class="bi bi-${iconName}"></i>
          </div>
          <p>${item.text || item}</p>
        </div>
      `;
          }
        )
        .join("");
    }


    const benefitsContainer = document.getElementById("product-benefits");
    if (benefitsContainer && product.benefits) {
      benefitsContainer.innerHTML = product.benefits
        .map(
          (benefit, index) => `
        <div class="benefit-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="benefit-icon">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <p>${benefit}</p>
        </div>
      `,
        )
        .join("");
    }


    const featuresContainer = document.getElementById("product-features");
    if (featuresContainer && product.features) {
      featuresContainer.innerHTML = product.features
        .map(
          (feature) => {
            const iconName = feature.icon ? feature.icon.replace("bi-", "") : "check2";
            return `
        <li><i class="bi bi-${iconName}"></i> ${feature.text || feature}</li>
      `;
          }
        )
        .join("");
    }


    const deliverablesContainer = document.getElementById(
      "product-deliverables",
    );
    if (deliverablesContainer && product.deliverables) {
      deliverablesContainer.innerHTML = product.deliverables
        .map(
          (item, index) => `
        <li data-aos="fade-up" data-aos-delay="${index * 100}">
          <i class="bi bi-box-seam"></i> ${item}
        </li>
      `,
        )
        .join("");
    }


    const industriesContainer = document.getElementById("product-industries");
    if (industriesContainer && product.industries) {
      industriesContainer.innerHTML = product.industries
        .map(
          (industry, index) => `
        <div class="industry-tag" data-aos="fade-up" data-aos-delay="${index * 100}">
          <i class="bi bi-briefcase"></i> ${industry}
        </div>
      `,
        )
        .join("");
    }


    const faqContainer = document.getElementById("product-faq");
    if (faqContainer && product.faq) {
      faqContainer.innerHTML = product.faq
        .map(
          (faq, index) => `
        <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="faq-question" onclick="toggleFaq(this)">
            <h4>${faq.question}</h4>
            <i class="bi bi-plus-lg"></i>
          </div>
          <div class="faq-answer">
            <p>${faq.answer}</p>
          </div>
        </div>
      `,
        )
        .join("");
    }


    const iconLarge = document.getElementById("product-icon-large");
    if (iconLarge) {
      const iconName = product.icon.replace("bi-", "");
      iconLarge.innerHTML = `<i class="bi bi-${iconName}"></i>`;
    }


    const sidebarProductTitle = document.getElementById("sidebar-product-title");
    if (sidebarProductTitle) sidebarProductTitle.textContent = product.title;


    const allProductsContainer = document.getElementById("all-products-list");
    if (allProductsContainer) {
      allProductsContainer.innerHTML = productData.products
        .map(
          (p) => `
        <li>
          <a href="product-details.html?product=${p.slug}" class="${p.slug === product.slug ? "active" : ""}">
            <i class="bi bi-chevron-right"></i> ${p.title}
          </a>
        </li>
      `,
        )
        .join("");
    }


    const websiteSection = document.getElementById("product-website-section");
    const websiteLink = document.getElementById("product-website-link");
    if (websiteSection && websiteLink) {
      if (product.productWebsite) {
        websiteSection.style.display = "block";
        websiteLink.href = product.productWebsite;
      } else {
        websiteSection.style.display = "none";
      }
    }


    const clientsTrack = document.getElementById("clients-track");
    if (clientsTrack && product.clients && product.clients.length > 0) {

      const allClients = [...product.clients, ...product.clients];
      clientsTrack.innerHTML = allClients
        .map(
          (client) => `
        <a href="${client.website || '#'}" target="_blank" rel="noopener noreferrer" class="client-logo">
          <div class="client-logo-icon">
            <img src="${client.logo || ''}" alt="${client.name}" loading="lazy">
          </div>
          <span class="client-logo-name">${client.name}</span>
        </a>
      `,
        )
        .join("");
    }
  }


  async function initProductDetails() {

    if (!document.getElementById("product-title")) return;

    try {

      if (!productData || !productData.products) {
        const response = await fetch("assets/json/product.json");
        if (!response.ok) throw new Error("Failed to load product data");
        productData = await response.json();
      }

      const params = getProductFromURL();
      currentProduct = findProduct(productData, params);

      if (!currentProduct) {
        const productTitle = document.getElementById("product-title");
        const productShortDesc = document.getElementById("product-short-desc");
        if (productTitle) productTitle.textContent = "Product Not Found";
        if (productShortDesc)
          productShortDesc.textContent =
            "The requested product could not be found.";
        return;
      }

      renderProductDetails(currentProduct);


      if (typeof AOS !== "undefined") {
        setTimeout(() => AOS.refresh(), 100);
      }
    } catch (error) {
      console.error("Error loading product details:", error);
      const productTitle = document.getElementById("product-title");
      const productShortDesc = document.getElementById("product-short-desc");
      if (productTitle) productTitle.textContent = "Error Loading Product";
      if (productShortDesc)
        productShortDesc.textContent =
          "Unable to load product details. Please try again later.";
    }
  }


  window.toggleFaq = toggleFaq;


  function initButtonShine() {

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {

      setTimeout(() => {
        btn.classList.add('shine-animation');
      }, index * 500);
    });
  }


  function init() {
    initNavbar();
    initMobileMenu();
    initScrollTop();
    initSmoothScroll();
    initHeroAnimations();
    initSectionAnimations();
    initServicesAnimations();
    initAboutAnimations();
    initCTAAnimations();
    initFooterAnimations();
    initTestimonialAnimations();
    initProductsHorizontalScroll();
    initLightbox();
    initTestimonialSlider();
    initAOS();
    fixAnimationVisibility();
    initCustomCursor();
    setCurrentYear();
    initMegaMenu();
    initServiceDetails();
    initProductDetails();
    initButtonShine();


    window.addEventListener("load", () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });


    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }


  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

