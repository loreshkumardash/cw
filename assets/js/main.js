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
    const shape1 = document.querySelector(".shape-1");
    const shape2 = document.querySelector(".shape-2");
    const shape3 = document.querySelector(".shape-3");
    if (shape1) {
      gsap.to(shape1, {
        y: 100,
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    if (shape2) {
      gsap.to(shape2, {
        y: -80,
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    if (shape3) {
      gsap.to(shape3, {
        y: 60,
        scrollTrigger: {
          trigger: hero,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
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
      if (subtitle || title || description) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: "top bottom-=100",
            once: true,
          },
        });
        if (subtitle) {
          gsap.set(subtitle, { opacity: 0, y: 20 });
          tl.to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, 0);
        }
        if (title) {
          gsap.set(title, { opacity: 0, y: 20 });
          tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.4");
        }
        if (description) {
          gsap.set(description, { opacity: 0, y: 20 });
          tl.to(description, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          }, "-=0.4");
        }
      }
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
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.trigger === section ||
        (trigger.vars && trigger.vars.trigger === section)
      ) {
        trigger.kill();
      }
    });
    const pinSpacers = section.querySelectorAll(".pin-spacer");
    pinSpacers.forEach((spacer) => {
      spacer.style.cssText = "";
      spacer.classList.remove("pin-spacer");
    });
    gsap.set(track, { x: 0 });
    function setupScroll() {
      const trackWidth = track.scrollWidth;
      const viewportWidth = viewport.offsetWidth;
      const scrollDistance = trackWidth - viewportWidth;
      if (scrollDistance <= 0 || window.innerWidth <= 768) {
        const pinSpacers = document.querySelectorAll(".pin-spacer");
        pinSpacers.forEach((spacer) => {
          if (spacer.contains(section)) {
            spacer.replaceWith(section.cloneNode(true));
          }
        });
        return;
      }
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
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }
    setupScroll();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    });
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
          interactiveEl.classList.contains("magnetic") &&
          !interactiveEl.classList.contains("play-button") &&
          !interactiveEl.classList.contains("mega-item") &&
          !interactiveEl.closest(".mega-menu") &&
          !interactiveEl.closest(".mega-left") &&
          (interactiveEl.classList.contains("btn") ||
          interactiveEl.tagName === "A" ||
          interactiveEl.tagName === "BUTTON")
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
      if (!el.classList.contains("play-button") && 
          !el.classList.contains("mega-item") && 
          !el.closest(".mega-menu")) {
        el.classList.add("magnetic");
      }
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
    const servicesMegaMenuContainer =
      document.getElementById("mega-menu-services");
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
    const productsMegaMenuContainer =
      document.getElementById("mega-menu-products");
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
    const serviceShortOverview = document.getElementById("service-short-overview");
    const serviceOverviewFull = document.getElementById("service-overview-full");
    const viewMoreBtnServiceOverview = document.getElementById("view-more-btn-service-overview");
    if (service.fullDescription) {
      const paragraphs = service.fullDescription.split(/\n\s*\n/);
      if (paragraphs.length > 1) {
        if (serviceShortOverview) serviceShortOverview.textContent = paragraphs[0];
        if (serviceFullDesc) serviceFullDesc.textContent = paragraphs.slice(1).join("\n\n");
        if (viewMoreBtnServiceOverview) viewMoreBtnServiceOverview.style.display = "flex";
      } else {
        const OVERVIEW_TRUNCATE = 800;
        const text = service.fullDescription;
        if (text.length > OVERVIEW_TRUNCATE) {
          const breakPoint = text.lastIndexOf(" ", OVERVIEW_TRUNCATE);
          const splitIndex = breakPoint > 0 ? breakPoint : OVERVIEW_TRUNCATE;
          if (serviceShortOverview) serviceShortOverview.textContent = text.substring(0, splitIndex) + "\u2026";
          if (serviceFullDesc) serviceFullDesc.textContent = text.substring(splitIndex);
          if (viewMoreBtnServiceOverview) viewMoreBtnServiceOverview.style.display = "flex";
        } else {
          if (serviceShortOverview) serviceShortOverview.textContent = text;
          if (serviceOverviewFull) serviceOverviewFull.style.display = "none";
        }
      }
    }
    const whyChooseContainer = document.getElementById("service-why-choose");
    if (whyChooseContainer && service.whyChooseUs) {
      whyChooseContainer.innerHTML = service.whyChooseUs
        .map((item, index) => {
          const iconName = item.icon
            ? item.icon.replace("bi-", "")
            : "check-circle";
          return `
        <div class="why-choose-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="why-choose-icon">
            <i class="bi bi-${iconName}"></i>
          </div>
          <p>${item.text || item}</p>
        </div>
      `;
        })
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
    const productShortOverview = document.getElementById("product-short-overview");
    const overviewFull = document.getElementById("overview-full");
    const viewMoreBtnOverview = document.getElementById("view-more-btn-overview");
    if (product.fullDescription) {
      const paragraphs = product.fullDescription.split(/\n\s*\n/);
      if (paragraphs.length > 1) {
        if (productShortOverview) productShortOverview.textContent = paragraphs[0];
        if (productFullDesc) productFullDesc.textContent = paragraphs.slice(1).join("\n\n");
        if (viewMoreBtnOverview) viewMoreBtnOverview.style.display = "flex";
      } else {
        const OVERVIEW_TRUNCATE = 800;
        const text = product.fullDescription;
        if (text.length > OVERVIEW_TRUNCATE) {
          const breakPoint = text.lastIndexOf(" ", OVERVIEW_TRUNCATE);
          const splitIndex = breakPoint > 0 ? breakPoint : OVERVIEW_TRUNCATE;
          if (productShortOverview) productShortOverview.textContent = text.substring(0, splitIndex) + "\u2026";
          if (productFullDesc) productFullDesc.textContent = text.substring(splitIndex);
          if (viewMoreBtnOverview) viewMoreBtnOverview.style.display = "flex";
        } else {
          if (productShortOverview) productShortOverview.textContent = text;
          if (overviewFull) overviewFull.style.display = "none";
        }
      }
    }
    const whyChooseContainer = document.getElementById("product-why-choose");
    if (whyChooseContainer && product.whyChooseUs) {
      whyChooseContainer.innerHTML = product.whyChooseUs
        .map((item, index) => {
          const iconName = item.icon
            ? item.icon.replace("bi-", "")
            : "check-circle";
          return `
        <div class="why-choose-item" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="why-choose-icon">
            <i class="bi bi-${iconName}"></i>
          </div>
          <p>${item.text || item}</p>
        </div>
      `;
        })
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
        .map((feature, index) => {
          const iconName = feature.icon
            ? feature.icon.replace("bi-", "")
            : "check2";
          const hasDetails = feature.details && feature.details.trim() !== "";
          const accordionId = `feature-accordion-${index}`;
          return `
        <div class="feature-accordion-item" data-aos="fade-up" data-aos-delay="${index * 50}">
          <button class="feature-accordion-header" type="button" ${hasDetails ? `data-bs-toggle="collapse" data-bs-target="#${accordionId}" aria-expanded="false" aria-controls="${accordionId}"` : ""}>
            <span class="feature-accordion-icon"><i class="bi bi-${iconName}"></i></span>
            <span class="feature-accordion-title">${feature.text || feature}</span>
            ${hasDetails ? '<i class="bi bi-chevron-down feature-accordion-chevron"></i>' : ""}
          </button>
          ${hasDetails ? `<div id="${accordionId}" class="accordion-collapse collapse"><div class="feature-accordion-body">${feature.details}</div></div>` : ""}
        </div>
      `;
        })
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
    const sidebarProductTitle = document.getElementById(
      "sidebar-product-title",
    );
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
        <a href="${client.website || "#"}" target="_blank" rel="noopener noreferrer" class="client-logo">
          <div class="client-logo-icon">
            <img src="${client.logo || ""}" alt="${client.name}" loading="lazy">
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
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn, index) => {
      setTimeout(() => {
        btn.classList.add("shine-animation");
      }, index * 500);
    });
  }
  let careerData = null;
  let currentCategory = "all";
  let searchQuery = "";
  let locationFilterVar = "";
  let typeFilterVar = "";
  let experienceFilterVar = "";
  let currentJob = null;
  async function loadCareerData() {
    try {
      const response = await fetch("assets/json/career.json");
      if (!response.ok) throw new Error("Failed to load career data");
      careerData = await response.json();
      return careerData;
    } catch (error) {
      console.error("Error loading career data:", error);
      return null;
    }
  }
  function getActiveJobs() {
    if (!careerData) return [];
    return careerData.jobs.filter((job) => job.status === "active");
  }
  function getCategories() {
    if (!careerData) return [];
    return careerData.categories || [];
  }
  function formatDateCareer(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "Today";
    if (diffDays === 7) return "1 week ago";
    if (diffDays <= 30)
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
    if (diffDays <= 60) return "1 month ago";
    return `${Math.floor(diffDays / 30)} months ago`;
  }
  function formatDateDetails(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  function renderCategoryTabs() {
    const tabsContainer = document.getElementById("category-tabs");
    if (!tabsContainer || !careerData) return;
    const categories = getCategories();
    const activeJobs = getActiveJobs();
    tabsContainer.innerHTML = `
      <button class="category-tab active" data-category="all">
        <i class="bi bi-grid-3x3-gap"></i>
        <span>All Jobs</span>
        <span class="job-count" id="count-all">${activeJobs.length}</span>
      </button>
    `;
    categories.forEach((category) => {
      const count = activeJobs.filter(
        (job) => job.category === category.id,
      ).length;
      if (count > 0) {
        const tab = document.createElement("button");
        tab.className = "category-tab";
        tab.dataset.category = category.id;
        tab.innerHTML = `
          <i class="bi ${category.icon}"></i>
          <span>${category.name}</span>
          <span class="job-count">${count}</span>
        `;
        tabsContainer.appendChild(tab);
      }
    });
    tabsContainer.addEventListener("click", handleCategoryClick);
  }
  function handleCategoryClick(e) {
    const tab = e.target.closest(".category-tab");
    if (!tab) return;
    document
      .querySelectorAll(".category-tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentCategory = tab.dataset.category;
    renderJobs();
  }
  function populateFilters() {
    if (!careerData) return;
    const activeJobs = getActiveJobs();
    const locations = [
      ...new Set(activeJobs.map((job) => job.location)),
    ].sort();
    const types = [...new Set(activeJobs.map((job) => job.type))].sort();
    const experiences = [
      ...new Set(activeJobs.map((job) => job.experience)),
    ].sort();
    const locationFilterEl = document.getElementById("location-filter");
    const typeFilterEl = document.getElementById("type-filter");
    const experienceFilterEl = document.getElementById("experience-filter");
    if (locationFilterEl) {
      locations.forEach((location) => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationFilterEl.appendChild(option);
      });
    }
    if (typeFilterEl) {
      types.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typeFilterEl.appendChild(option);
      });
    }
    if (experienceFilterEl) {
      experiences.forEach((exp) => {
        const option = document.createElement("option");
        option.value = exp;
        option.textContent = exp;
        experienceFilterEl.appendChild(option);
      });
    }
    locationFilterEl?.addEventListener("change", (e) => {
      locationFilterVar = e.target.value;
      renderJobs();
    });
    typeFilterEl?.addEventListener("change", (e) => {
      typeFilterVar = e.target.value;
      renderJobs();
    });
    experienceFilterEl?.addEventListener("change", (e) => {
      experienceFilterVar = e.target.value;
      renderJobs();
    });
  }
  function filterJobs() {
    let jobs = getActiveJobs();
    if (currentCategory !== "all") {
      jobs = jobs.filter((job) => job.category === currentCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.shortDescription.toLowerCase().includes(query) ||
          job.skills.some((skill) => skill.toLowerCase().includes(query)) ||
          job.description.toLowerCase().includes(query),
      );
    }
    if (locationFilterVar) {
      jobs = jobs.filter((job) => job.location === locationFilterVar);
    }
    if (typeFilterVar) {
      jobs = jobs.filter((job) => job.type === typeFilterVar);
    }
    if (experienceFilterVar) {
      jobs = jobs.filter((job) => job.experience === experienceFilterVar);
    }
    return jobs;
  }
  function renderJobs() {
    const container = document.getElementById("jobs-container");
    const noResults = document.getElementById("no-results");
    const spinner = document.getElementById("loading-spinner");
    if (!container) return;
    if (spinner) {
      spinner.style.display = "none";
    }
    const filteredJobs = filterJobs();
    if (filteredJobs.length === 0) {
      container.innerHTML = "";
      if (noResults) {
        noResults.style.display = "block";
      }
      return;
    }
    if (noResults) {
      noResults.style.display = "none";
    }
    const categories = getCategories();
    const jobsByCategory = {};
    if (currentCategory === "all") {
      filteredJobs.forEach((job) => {
        if (!jobsByCategory[job.category]) {
          jobsByCategory[job.category] = [];
        }
        jobsByCategory[job.category].push(job);
      });
    } else {
      jobsByCategory[currentCategory] = filteredJobs;
    }
    container.innerHTML = "";
    Object.keys(jobsByCategory).forEach((categoryId) => {
      const category = categories.find((c) => c.id === categoryId);
      const jobs = jobsByCategory[categoryId];
      if (!category || jobs.length === 0) return;
      const categorySection = document.createElement("div");
      categorySection.className = "job-category-section";
      categorySection.setAttribute("data-aos", "fade-up");
      categorySection.innerHTML = `
        <div class="category-header">
          <i class="bi ${category.icon}"></i>
          <h3>${category.name}</h3>
          <span class="category-job-count">${jobs.length} job${jobs.length > 1 ? "s" : ""}</span>
        </div>
        <div class="jobs-grid">
          ${jobs.map((job) => renderJobCard(job)).join("")}
        </div>
      `;
      container.appendChild(categorySection);
    });
  }
  function renderJobCard(job) {
    const skillsHtml = job.skills
      .slice(0, 4)
      .map((skill) => `<span class="job-skill">${skill}</span>`)
      .join("");
    const moreSkills = job.skills.length > 4 ? `+${job.skills.length - 4}` : "";
    return `
      <div class="job-card" onclick="window.location.href='career-details.html?job=${job.slug}'" data-aos="fade-up">
        <div class="job-card-header">
          <div class="job-info">
            <h4 class="job-title">${job.title}</h4>
            <div class="job-meta">
              <span class="job-location">
                <i class="bi bi-geo-alt"></i>
                ${job.location}
              </span>
              <span class="job-type">${job.type}</span>
              <span class="job-experience">
                <i class="bi bi-briefcase"></i>
                ${job.experience}
              </span>
            </div>
          </div>
          <div class="job-salary">${job.salary}</div>
        </div>
        <p class="job-description">${job.shortDescription}</p>
        <div class="job-footer">
          <div class="job-skills">
            ${skillsHtml}
            ${moreSkills ? `<span class="job-skill more-skills">${moreSkills}</span>` : ""}
          </div>
          <div class="job-actions">
            <span class="job-posted">${formatDateCareer(job.posted)}</span>
            <button class="btn btn-apply" onclick="event.stopPropagation(); window.location.href='career-details.html?job=${job.slug}'">
              View Details <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
  function initCareerSearch() {
    const searchInput = document.getElementById("job-search");
    const searchBtn = document.getElementById("search-btn");
    const clearFiltersBtn = document.getElementById("clear-filters-btn");
    let searchTimeout;
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          searchQuery = e.target.value;
          renderJobs();
        }, 300);
      });
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          clearTimeout(searchTimeout);
          searchQuery = e.target.value;
          renderJobs();
        }
      });
    }
    if (searchBtn) {
      searchBtn.addEventListener("click", () => {
        searchQuery = searchInput?.value || "";
        renderJobs();
      });
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        const locationFilterEl = document.getElementById("location-filter");
        const typeFilterEl = document.getElementById("type-filter");
        const experienceFilterEl = document.getElementById("experience-filter");
        searchQuery = "";
        locationFilterVar = "";
        typeFilterVar = "";
        experienceFilterVar = "";
        if (locationFilterEl) locationFilterEl.value = "";
        if (typeFilterEl) typeFilterEl.value = "";
        if (experienceFilterEl) experienceFilterEl.value = "";
        currentCategory = "all";
        document
          .querySelectorAll(".category-tab")
          .forEach((t) => t.classList.remove("active"));
        document
          .querySelector('.category-tab[data-category="all"]')
          ?.classList.add("active");
        renderJobs();
      });
    }
  }
  function updateOpenPositionsCount() {
    const countElement = document.getElementById("open-positions-count");
    if (countElement) {
      const count = getActiveJobs().length;
      countElement.textContent = count;
    }
  }
  function getJobFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
      slug: params.get("job"),
      id: params.get("id"),
    };
  }
  function findJob(data, params) {
    if (!data || !data.jobs) return null;
    if (params.slug) {
      return data.jobs.find((job) => job.slug === params.slug);
    }
    if (params.id) {
      return data.jobs.find((job) => job.id === parseInt(params.id));
    }
    return null;
  }
  function getCategoryName(categoryId) {
    if (!careerData || !careerData.categories) return categoryId;
    const category = careerData.categories.find((c) => c.id === categoryId);
    return category ? category.name : categoryId;
  }
  function getCategoryIcon(categoryId) {
    if (!careerData || !careerData.categories) return "bi-briefcase";
    const category = careerData.categories.find((c) => c.id === categoryId);
    return category ? category.icon : "bi-briefcase";
  }
  function renderJobHeader(job) {
    const header = document.getElementById("career-details-header");
    if (!header) return;
    const skillsHtml = job.skills
      .map((skill) => `<span class="career-details-skill">${skill}</span>`)
      .join("");
    header.innerHTML = `
      <div class="career-details-info">
        <div class="career-details-category">
          <i class="bi ${getCategoryIcon(job.category)}"></i>
          <span>${getCategoryName(job.category)}</span>
        </div>
        <h1 class="career-details-title">${job.title}</h1>
        <div class="career-details-meta">
          <div class="career-details-meta-item">
            <i class="bi bi-geo-alt"></i>
            <span>${job.location}</span>
          </div>
          <div class="career-details-meta-item">
            <i class="bi bi-clock"></i>
            <span>${job.type}</span>
          </div>
          <div class="career-details-meta-item">
            <i class="bi bi-briefcase"></i>
            <span>${job.experience}</span>
          </div>
          <div class="career-details-meta-item">
            <i class="bi bi-calendar"></i>
            <span>Posted: ${formatDateDetails(job.posted)}</span>
          </div>
        </div>
        <p class="career-details-description">${job.description}</p>
        <div class="career-details-skills">
          ${skillsHtml}
        </div>
      </div>
      <div class="career-details-apply-bar">
        <div>
          <div class="career-details-salary-label">Salary Range</div>
          <div class="career-details-salary">${job.salary}</div>
        </div>
        <button class="btn btn-apply-now" onclick="window.openApplyModal('${job.title}', '${job.contactEmail}')">
          Apply Now <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    `;
  }
  window.openApplyModal = function (jobTitle, contactEmail) {
    const modal = document.getElementById("apply-modal");
    const modalJobTitle = document.getElementById("modal-job-title");
    if (modal) {
      modalJobTitle.textContent = jobTitle;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      modal.dataset.jobTitle = jobTitle;
      modal.dataset.contactEmail = contactEmail;
    }
  };
  function renderJobDetailsContent(job) {
    const container = document.getElementById("job-details-container");
    const sidebar = document.getElementById("job-sidebar");
    if (!container) return;
    const responsibilitiesHtml = job.responsibilities
      .map(
        (item, index) => `
        <li data-aos="fade-up" data-aos-delay="${index * 50}">
          <i class="bi bi-check-circle-fill"></i>
          <span>${item}</span>
        </li>
      `,
      )
      .join("");
    const requirementsHtml = job.requirements
      .map(
        (item, index) => `
        <li data-aos="fade-up" data-aos-delay="${index * 50}">
          <i class="bi bi-check2-circle"></i>
          <span>${item}</span>
        </li>
      `,
      )
      .join("");
    const preferredHtml = job.preferredQualifications
      ? job.preferredQualifications
          .map(
            (item, index) => `
        <li data-aos="fade-up" data-aos-delay="${index * 50}">
          <i class="bi bi-star-fill"></i>
          <span>${item}</span>
        </li>
      `,
          )
          .join("")
      : "";
    const benefitsHtml = job.benefits
      .map(
        (item, index) => `
        <div class="career-details-card" data-aos="fade-up" data-aos-delay="${index * 50}">
          <div class="career-details-card-icon">
            <i class="bi bi-gift"></i>
          </div>
          <h4>${item}</h4>
        </div>
      `,
      )
      .join("");
    container.innerHTML = `
      <div class="career-details-section" data-aos="fade-up">
        <h2 class="career-details-section-title"><i class="bi bi-list-check"></i> Key Responsibilities</h2>
        <ul class="career-details-list">
          ${responsibilitiesHtml}
        </ul>
      </div>
      <div class="career-details-section" data-aos="fade-up">
        <h2 class="career-details-section-title"><i class="bi bi-clipboard-check"></i> Requirements</h2>
        <ul class="career-details-list">
          ${requirementsHtml}
        </ul>
      </div>
      ${
        preferredHtml
          ? `
        <div class="career-details-section" data-aos="fade-up">
          <h2 class="career-details-section-title"><i class="bi bi-star"></i> Preferred Qualifications</h2>
          <ul class="career-details-list">
            ${preferredHtml}
          </ul>
        </div>
      `
          : ""
      }
      <div class="career-details-section" data-aos="fade-up">
        <h2 class="career-details-section-title"><i class="bi bi-heart"></i> Benefits & Perks</h2>
        <div class="career-details-grid">
          ${benefitsHtml}
        </div>
      </div>
      <div class="back-to-jobs" data-aos="fade-up">
        <a href="career.html" class="btn-back">
          <i class="bi bi-arrow-left"></i>
          Back to All Jobs
        </a>
      </div>
    `;
    if (sidebar) {
      const currentUrl = window.location.href;
      sidebar.innerHTML = `
        <div class="sidebar-card" data-aos="fade-up">
          <div class="sidebar-card-header">
            <i class="bi bi-info-circle"></i>
            <h3>Job Overview</h3>
          </div>
          <div class="sidebar-job-overview">
            <div class="sidebar-job-item">
              <i class="bi bi-geo-alt"></i>
              <div>
                <div class="sidebar-job-label">Location</div>
                <div class="sidebar-job-value">${job.location}</div>
              </div>
            </div>
            <div class="sidebar-job-item">
              <i class="bi bi-clock"></i>
              <div>
                <div class="sidebar-job-label">Job Type</div>
                <div class="sidebar-job-value">${job.type}</div>
              </div>
            </div>
            <div class="sidebar-job-item">
              <i class="bi bi-briefcase"></i>
              <div>
                <div class="sidebar-job-label">Experience</div>
                <div class="sidebar-job-value">${job.experience}</div>
              </div>
            </div>
            <div class="sidebar-job-item">
              <i class="bi bi-cash-stack"></i>
              <div>
                <div class="sidebar-job-label">Salary</div>
                <div class="sidebar-job-value">${job.salary}</div>
              </div>
            </div>
            <div class="sidebar-job-item">
              <i class="bi bi-calendar-event"></i>
              <div>
                <div class="sidebar-job-label">Deadline</div>
                <div class="sidebar-job-value">${formatDateDetails(job.applicationDeadline)}</div>
              </div>
            </div>
          </div>
          <button class="sidebar-apply-btn" onclick="window.openApplyModal('${job.title}', '${job.contactEmail}')">
            Apply for this Position <i class="bi bi-arrow-right"></i>
          </button>
        </div>
        <div class="sidebar-card" data-aos="fade-up" data-aos-delay="100">
          <div class="sidebar-card-header">
            <i class="bi bi-share"></i>
            <h3>Share This Job</h3>
          </div>
          <div class="sidebar-share-links">
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out: " + job.title + " at Cakiweb Solutions")}&url=${encodeURIComponent(currentUrl)}" target="_blank" class="sidebar-share-link" title="Share on Twitter">
              <i class="bi bi-twitter-x"></i>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}" target="_blank" class="sidebar-share-link" title="Share on Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(job.title)}" target="_blank" class="sidebar-share-link" title="Share on LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
            <a href="mailto:?subject=${encodeURIComponent("Job Opportunity: " + job.title)}&body=${encodeURIComponent("Check out this job: " + currentUrl)}" class="sidebar-share-link" title="Share via Email">
              <i class="bi bi-envelope"></i>
            </a>
          </div>
        </div>
      `;
    }
  }
  function renderJobNotFound() {
    const header = document.getElementById("career-details-header");
    const container = document.getElementById("job-details-container");
    if (header) {
      header.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <i class="bi bi-exclamation-circle" style="font-size: 4rem; color: var(--gray-300);"></i>
          <h1 style="font-size: 2rem; font-weight: var(--font-bold); color: var(--dark-900); margin: 20px 0 12px;">Job Not Found</h1>
          <p style="font-size: 1.1rem; color: var(--gray-500); margin-bottom: 32px;">The position you're looking for doesn't exist or has been removed.</p>
          <a href="career.html" class="btn btn-primary btn-lg">
            <i class="bi bi-arrow-left"></i>
            View All Open Positions
          </a>
        </div>
      `;
    }
    if (container) {
      container.innerHTML = "";
    }
  }
  async function initCareerPage() {
    if (
      !document.getElementById("job-search") &&
      !document.getElementById("category-tabs")
    )
      return;
    await loadCareerData();
    if (!careerData) {
      console.error("Failed to load career data");
      return;
    }
    updateOpenPositionsCount();
    renderCategoryTabs();
    populateFilters();
    initCareerSearch();
    renderJobs();
    if (typeof AOS !== "undefined") {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }
  async function initCareerDetails() {
    if (!document.getElementById("career-details-header")) return;
    await loadCareerData();
    if (!careerData) {
      console.error("Failed to load career data");
      return;
    }
    const params = getJobFromURL();
    currentJob = findJob(careerData, params);
    if (!currentJob) {
      renderJobNotFound();
      return;
    }
    document.title = `${currentJob.title} - Cakiweb Solutions`;
    renderJobHeader(currentJob);
    renderJobDetailsContent(currentJob);
    if (typeof AOS !== "undefined") {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
    initApplyModalHandlers();
  }
  function initApplyModalHandlers() {
    const modal = document.getElementById("apply-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const backdrop = document.querySelector(".modal-backdrop");
    const successCloseBtn = document.getElementById("success-close-btn");
    [closeBtn, cancelBtn].forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", closeApplyModal);
      }
    });
    if (backdrop) {
      backdrop.addEventListener("click", closeApplyModal);
    }
    if (successCloseBtn) {
      successCloseBtn.addEventListener("click", () => {
        closeApplyModal();
        window.location.href = "career.html";
      });
    }
    initFileUpload();
    const form = document.getElementById("apply-form");
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("active")) {
        closeApplyModal();
      }
    });
  }
  function closeApplyModal() {
    const modal = document.getElementById("apply-modal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      const form = document.getElementById("apply-form");
      if (form) {
        form.reset();
        form.style.display = "block";
      }
      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.style.display = "none";
      }
      resetFileUpload();
    }
  }
  function initFileUpload() {
    const fileUploadArea = document.getElementById("file-upload-area");
    const resumeFile = document.getElementById("resume-file");
    const uploadPlaceholder = document.getElementById("upload-placeholder");
    const filePreview = document.getElementById("file-preview");
    const fileName = document.getElementById("file-name");
    const fileSize = document.getElementById("file-size");
    const removeFileBtn = document.getElementById("remove-file-btn");
    if (!fileUploadArea || !resumeFile) return;
    fileUploadArea.addEventListener("click", (e) => {
      if (e.target !== removeFileBtn && !removeFileBtn?.contains(e.target)) {
        resumeFile.click();
      }
    });
    resumeFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFileSelect(file);
      }
    });
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      fileUploadArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      fileUploadArea.addEventListener(eventName, () => {
        fileUploadArea.classList.add("dragover");
      });
    });
    ["dragleave", "drop"].forEach((eventName) => {
      fileUploadArea.addEventListener(eventName, () => {
        fileUploadArea.classList.remove("dragover");
      });
    });
    fileUploadArea.addEventListener("drop", (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
        resumeFile.files = files;
      }
    });
    if (removeFileBtn) {
      removeFileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        resetFileUpload();
      });
    }
    function handleFileSelect(file) {
      const maxSize = 5 * 1024 * 1024; 
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, or DOCX file");
        return;
      }
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }
      if (uploadPlaceholder) uploadPlaceholder.style.display = "none";
      if (filePreview) filePreview.style.display = "flex";
      if (fileName) fileName.textContent = file.name;
      if (fileSize) fileSize.textContent = formatFileSize(file.size);
    }
    function resetFileUpload() {
      const uploadPlaceholder = document.getElementById("upload-placeholder");
      const filePreview = document.getElementById("file-preview");
      const resumeFile = document.getElementById("resume-file");
      if (uploadPlaceholder) uploadPlaceholder.style.display = "block";
      if (filePreview) filePreview.style.display = "none";
      if (resumeFile) resumeFile.value = "";
    }
    function formatFileSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    }
    window.resetFileUpload = resetFileUpload;
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = document.getElementById("submit-btn");
    const btnText = submitBtn?.querySelector(".btn-text");
    const btnLoading = submitBtn?.querySelector(".btn-loading");
    const successMessage = document.getElementById("success-message");
    const modal = document.getElementById("apply-modal");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.style.display = "none";
      if (btnLoading) btnLoading.style.display = "flex";
    }
    try {
      const formData = new FormData(form);
      const jobTitle = modal?.dataset.jobTitle || "";
      const contactEmail =
        modal?.dataset.contactEmail || "cakiweb.com@gmail.com";
      const templateParams = {
        to_email: contactEmail,
        job_title: jobTitle,
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location") || "Not provided",
        linkedin: formData.get("linkedin") || "Not provided",
        portfolio: formData.get("portfolio") || "Not provided",
        experience_years: formData.get("experienceYears"),
        current_ctc: formData.get("currentCTC") || "Not provided",
        expected_ctc: formData.get("expectedCTC"),
        notice_period: formData.get("noticePeriod"),
        cover_letter: formData.get("coverLetter") || "Not provided",
        reply_to: formData.get("email"),
        application_date: new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      if (typeof emailjs !== "undefined") {
        if (!emailjs.publicKey) {
          emailjs.init({ publicKey: 'O7t07Am9Hj1fkJonQ' });
        }
        await emailjs.send(
          "service_2pul7gz",
          "template_2oc5vxa",
          templateParams,
        );
      }
      if (form) form.style.display = "none";
      if (successMessage) successMessage.style.display = "block";
    } catch (error) {
      alert(
        "There was an error submitting your application. Please try again or contact us directly.",
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = "inline";
        if (btnLoading) btnLoading.style.display = "none";
      }
    }
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
    initCareerPage();
    initCareerDetails();
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
  window.toggleStory = function () {
    const storyFull = document.getElementById("story-full");
    const btn = document.getElementById("view-more-btn");
    const btnText = document.getElementById("view-more-text");
    if (storyFull.style.display === "none") {
      storyFull.style.display = "block";
      btnText.textContent = "View Less";
      btn.classList.add("expanded");
    } else {
      storyFull.style.display = "none";
      btnText.textContent = "View More";
      btn.classList.remove("expanded");
    }
  };
  window.toggleOverview = function () {
    const overviewFull = document.getElementById("overview-full");
    const btn = document.getElementById("view-more-btn-overview");
    const btnText = document.getElementById("view-more-text-overview");
    if (overviewFull.classList.contains("story-hidden")) {
      overviewFull.classList.remove("story-hidden");
      overviewFull.classList.add("story-visible");
      btnText.textContent = "View Less";
      btn.classList.add("expanded");
    } else {
      overviewFull.classList.remove("story-visible");
      overviewFull.classList.add("story-hidden");
      btnText.textContent = "View More";
      btn.classList.remove("expanded");
    }
  };
  window.toggleServiceOverview = function () {
    const overviewFull = document.getElementById("service-overview-full");
    const btn = document.getElementById("view-more-btn-service-overview");
    const btnText = document.getElementById("view-more-text-service-overview");
    if (overviewFull.classList.contains("story-hidden")) {
      overviewFull.classList.remove("story-hidden");
      overviewFull.classList.add("story-visible");
      btnText.textContent = "View Less";
      btn.classList.add("expanded");
    } else {
      overviewFull.classList.remove("story-visible");
      overviewFull.classList.add("story-hidden");
      btnText.textContent = "View More";
      btn.classList.remove("expanded");
    }
  };
})();
/* ================================
   BLOG PAGE - Dynamic Listing
   ================================ */
(function () {
  "use strict";
  const BLOGS_PER_PAGE = 6;
  let allBlogs = [];
  let filteredBlogs = [];
  let currentPage = 1;
  let activeCategory = "all";
  let searchQuery = "";
  let sortValue = "newest";
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const blogSearch = document.getElementById("blogSearch");
  const categoryPills = document.getElementById("categoryPills");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");
  const loadMoreWrapper = document.getElementById("loadMoreWrapper");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const clearFiltersBtn = document.getElementById("clearFilters");
  async function fetchBlogs() {
    try {
      const response = await fetch("assets/json/blog.json");
      if (!response.ok) throw new Error("Failed to load blog data");
      const data = await response.json();
      allBlogs = data.blogs || [];
      loadVisitorCounts();
      initBlogPage();
    } catch (error) {
      console.error("Error loading blog data:", error);
      if (blogGrid) {
        blogGrid.innerHTML =
          '<div class="col-12 text-center py-5"><i class="bi bi-exclamation-circle" style="font-size:48px;color:var(--gray-400);"></i><h4 class="mt-3">Unable to load blog posts</h4><p class="text-muted">Please try again later.</p></div>';
      }
    }
  }
  function loadVisitorCounts() {
    const storedVisitors = localStorage.getItem("blogVisitors");
    const visitorCounts = storedVisitors ? JSON.parse(storedVisitors) : {};
    allBlogs.forEach((blog) => {
      if (visitorCounts[blog.id] !== undefined) {
        blog.visitors = visitorCounts[blog.id];
      }
    });
  }
  function initBlogPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get("category");
    if (urlCategory) {
      activeCategory = urlCategory.toLowerCase();
    }
    populateCategories();
    applyFiltersAndSort();
    bindEvents();
  }
  function populateCategories() {
    const categories = [...new Set(allBlogs.map((blog) => blog.category))];
    if (categoryFilter) {
      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase();
        option.textContent = cat;
        categoryFilter.appendChild(option);
      });
      if (activeCategory !== "all") {
        categoryFilter.value = activeCategory;
      }
    }
    if (categoryPills) {
      const allPill = document.createElement("button");
      allPill.className = `category-pill ${activeCategory === "all" ? "active" : ""}`;
      allPill.dataset.category = "all";
      allPill.textContent = "All";
      categoryPills.appendChild(allPill);
      categories.forEach((cat) => {
        const pill = document.createElement("button");
        pill.className = `category-pill ${activeCategory === cat.toLowerCase() ? "active" : ""}`;
        pill.dataset.category = cat.toLowerCase();
        pill.textContent = cat;
        categoryPills.appendChild(pill);
      });
    }
  }
  function applyFiltersAndSort() {
    filteredBlogs = [...allBlogs];
    if (activeCategory !== "all") {
      filteredBlogs = filteredBlogs.filter(
        (blog) => blog.category.toLowerCase() === activeCategory,
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredBlogs = filteredBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query) ||
          blog.category.toLowerCase().includes(query) ||
          blog.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          blog.author.toLowerCase().includes(query),
      );
    }
    switch (sortValue) {
      case "newest":
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        filteredBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "popular":
        filteredBlogs.sort((a, b) => b.visitors - a.visitors);
        break;
      case "az":
        filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    currentPage = 1;
    renderBlogs();
    updateResultsCount();
  }
  function renderBlogs() {
    if (!blogGrid) return;
    const blogsToShow = filteredBlogs.slice(0, currentPage * BLOGS_PER_PAGE);
    if (blogsToShow.length === 0) {
      blogGrid.innerHTML = "";
      if (noResults) noResults.classList.remove("d-none");
      if (loadMoreWrapper) loadMoreWrapper.classList.add("d-none");
      return;
    }
    if (noResults) noResults.classList.add("d-none");
    blogGrid.innerHTML = blogsToShow
      .map((blog, index) => createBlogCard(blog, index))
      .join("");
    if (loadMoreWrapper) {
      if (blogsToShow.length >= filteredBlogs.length) {
        loadMoreWrapper.classList.add("d-none");
      } else {
        loadMoreWrapper.classList.remove("d-none");
      }
    }
    if (typeof AOS !== "undefined") {
      setTimeout(() => AOS.refresh(), 100);
    }
  }
  function createBlogCard(blog, index) {
    const date = new Date(blog.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const initials = blog.author
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    return `
      <div class="blog-card-dynamic" data-aos="fade-up" data-aos-delay="${(index % BLOGS_PER_PAGE) * 100}">
        <a href="blog-details.html?blog=${blog.slug}" class="blog-card-link">
          <div class="blog-card-image">
            <img src="${blog.image}" alt="${blog.title}" loading="lazy">
            <span class="blog-card-category">${blog.category}</span>
          </div>
        </a>
        <div class="blog-card-body">
          <a href="blog-details.html?blog=${blog.slug}">
            <h3 class="blog-card-title">${blog.title}</h3>
          </a>
          <p class="blog-card-excerpt">${blog.excerpt}</p>
          <div class="blog-card-meta">
            <div class="blog-card-author">
              <div class="blog-card-author-avatar">${initials}</div>
              <span class="blog-card-author-name">${blog.author}</span>
            </div>
            <div class="blog-card-stats">
              <span><i class="bi bi-eye"></i> ${formatNumber(blog.visitors)}</span>
              <span><i class="bi bi-clock"></i> ${blog.readTime}</span>
            </div>
          </div>
        </div>
        <div class="blog-card-footer">
          <a href="blog-details.html?blog=${blog.slug}" class="blog-card-read-more">
            Read More <i class="bi bi-arrow-right"></i>
          </a>
          <span class="blog-card-date">${formattedDate}</span>
        </div>
      </div>
    `;
  }
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }
  function updateResultsCount() {
    if (resultsCount) {
      const showing = Math.min(
        currentPage * BLOGS_PER_PAGE,
        filteredBlogs.length,
      );
      resultsCount.textContent = `Showing ${showing} of ${filteredBlogs.length} articles`;
    }
  }
  function bindEvents() {
    if (categoryFilter) {
      categoryFilter.addEventListener("change", (e) => {
        activeCategory = e.target.value;
        applyFiltersAndSort();
      });
    }
    if (sortFilter) {
      sortFilter.addEventListener("change", (e) => {
        sortValue = e.target.value;
        applyFiltersAndSort();
      });
    }
    if (blogSearch) {
      let searchTimeout;
      blogSearch.addEventListener("input", (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          searchQuery = e.target.value.trim();
          applyFiltersAndSort();
        }, 300);
      });
    }
    if (categoryPills) {
      categoryPills.addEventListener("click", (e) => {
        const pill = e.target.closest(".category-pill");
        if (!pill) return;
        categoryPills
          .querySelectorAll(".category-pill")
          .forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        activeCategory = pill.dataset.category;
        if (categoryFilter) {
          categoryFilter.value = activeCategory;
        }
        applyFiltersAndSort();
      });
    }
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        currentPage++;
        renderBlogs();
        updateResultsCount();
      });
    }
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener("click", () => {
        activeCategory = "all";
        searchQuery = "";
        sortValue = "newest";
        if (blogSearch) blogSearch.value = "";
        if (categoryFilter) categoryFilter.value = "all";
        if (sortFilter) sortFilter.value = "newest";
        categoryPills.querySelectorAll(".category-pill").forEach((p) => {
          p.classList.toggle("active", p.dataset.category === "all");
        });
        applyFiltersAndSort();
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchBlogs);
  } else {
    fetchBlogs();
  }
})();
/* ================================
   BLOG DETAIL PAGE
   ================================ */
(function () {
  "use strict";
  const detailTitle = document.getElementById("detailTitle");
  if (!detailTitle) return;
  let allBlogs = [];
  let currentBlog = null;
  function getBlogSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("blog");
  }
  async function fetchBlogs() {
    try {
      const response = await fetch("assets/json/blog.json");
      if (!response.ok) throw new Error("Failed to load blog data");
      const data = await response.json();
      allBlogs = data.blogs || [];
      loadVisitorCounts();
      initBlogDetail();
    } catch (error) {
      console.error("Error loading blog data:", error);
      showErrorMessage();
    }
  }
  function loadVisitorCounts() {
    const storedVisitors = localStorage.getItem("blogVisitors");
    const visitorCounts = storedVisitors ? JSON.parse(storedVisitors) : {};
    allBlogs.forEach((blog) => {
      if (visitorCounts[blog.id] !== undefined) {
        blog.visitors = visitorCounts[blog.id];
      }
    });
  }
  function saveVisitorCounts() {
    const visitorCounts = {};
    allBlogs.forEach((blog) => {
      visitorCounts[blog.id] = blog.visitors;
    });
    localStorage.setItem("blogVisitors", JSON.stringify(visitorCounts));
  }
  function incrementVisitorCount(blogId) {
    const blog = allBlogs.find((b) => b.id === blogId);
    if (blog) {
      blog.visitors++;
      saveVisitorCounts();
    }
    return blog ? blog.visitors : 0;
  }
  function initBlogDetail() {
    const slug = getBlogSlugFromURL();
    if (!slug) {
      showErrorMessage();
      return;
    }
    currentBlog = allBlogs.find((blog) => blog.slug === slug);
    if (!currentBlog) {
      showErrorMessage();
      return;
    }
    const visitorCount = incrementVisitorCount(currentBlog.id);
    renderBlogDetail(visitorCount);
    renderSidebar();
    renderRelatedPosts();
    bindShareEvents();
  }
  function renderBlogDetail(visitorCount) {
    const pageTitle = document.getElementById("page-title");
    const pageDescription = document.getElementById("page-description");
    const detailCategory = document.getElementById("detailCategory");
    const detailDate = document.getElementById("detailDate");
    const detailReadTime = document.getElementById("detailReadTime");
    const detailVisitors = document.getElementById("detailVisitors");
    const detailImage = document.getElementById("detailImage");
    const detailContent = document.getElementById("detailContent");
    const detailAuthor = document.getElementById("detailAuthor");
    const detailAuthorRole = document.getElementById("detailAuthorRole");
    const detailTags = document.getElementById("detailTags");
    if (pageTitle) {
      pageTitle.textContent = `${currentBlog.title} - Cakiweb Solutions`;
    }
    if (pageDescription) {
      pageDescription.textContent = currentBlog.excerpt;
    }
    if (detailCategory) {
      detailCategory.textContent = currentBlog.category;
    }
    if (detailTitle) {
      detailTitle.textContent = currentBlog.title;
    }
    const date = new Date(currentBlog.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    if (detailDate) {
      detailDate.textContent = formattedDate;
    }
    if (detailReadTime) {
      detailReadTime.textContent = currentBlog.readTime;
    }
    if (detailVisitors) {
      detailVisitors.textContent = formatNumber(visitorCount);
    }
    if (detailAuthor) {
      detailAuthor.textContent = currentBlog.author;
    }
    if (detailAuthorRole) {
      detailAuthorRole.textContent = currentBlog.authorRole;
    }
    if (detailImage) {
      detailImage.src = currentBlog.image;
      detailImage.alt = currentBlog.title;
    }
    if (detailContent) {
      detailContent.innerHTML = currentBlog.content;
    }
    if (detailTags) {
      detailTags.innerHTML = currentBlog.tags
        .map((tag) => `<span class="tag-item">${tag}</span>`)
        .join("");
    }
    updateShareURLs();
  }
  function renderSidebar() {
    const sidebarCategories = document.getElementById("sidebarCategories");
    const sidebarRecent = document.getElementById("sidebarRecent");
    const sidebarPopular = document.getElementById("sidebarPopular");
    if (sidebarCategories) {
      const categories = [...new Set(allBlogs.map((blog) => blog.category))];
      sidebarCategories.innerHTML = categories
        .map((cat) => {
          const count = allBlogs.filter((b) => b.category === cat).length;
          const isActive = cat === currentBlog.category;
          return `
            <div class="sidebar-category-item ${isActive ? "active" : ""}" data-category="${cat.toLowerCase()}">
              <span>${cat}</span>
              <span class="sidebar-category-count">${count}</span>
            </div>
          `;
        })
        .join("");
      sidebarCategories.addEventListener("click", (e) => {
        const item = e.target.closest(".sidebar-category-item");
        if (!item) return;
        window.location.href = `blog.html?category=${item.dataset.category}`;
      });
    }
    if (sidebarRecent) {
      const recentPosts = [...allBlogs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .filter((blog) => blog.id !== currentBlog.id)
        .slice(0, 4);
      sidebarRecent.innerHTML = recentPosts
        .map(
          (blog) => `
          <div class="sidebar-post-item" data-slug="${blog.slug}">
            <div class="sidebar-post-image">
              <img src="${blog.image}" alt="${blog.title}" loading="lazy">
            </div>
            <div class="sidebar-post-content">
              <h5 class="sidebar-post-title">${blog.title}</h5>
              <div class="sidebar-post-meta">
                <span><i class="bi bi-calendar3"></i> ${formatDateShort(blog.date)}</span>
                <span><i class="bi bi-eye"></i> ${formatNumber(blog.visitors)}</span>
              </div>
            </div>
          </div>
        `,
        )
        .join("");
      sidebarRecent.querySelectorAll(".sidebar-post-item").forEach((item) => {
        item.addEventListener("click", () => {
          window.location.href = `blog-details.html?blog=${item.dataset.slug}`;
        });
      });
    }
    if (sidebarPopular) {
      const popularPosts = [...allBlogs]
        .sort((a, b) => b.visitors - a.visitors)
        .filter((blog) => blog.id !== currentBlog.id)
        .slice(0, 4);
      sidebarPopular.innerHTML = popularPosts
        .map(
          (blog) => `
          <div class="sidebar-post-item" data-slug="${blog.slug}">
            <div class="sidebar-post-image">
              <img src="${blog.image}" alt="${blog.title}" loading="lazy">
            </div>
            <div class="sidebar-post-content">
              <h5 class="sidebar-post-title">${blog.title}</h5>
              <div class="sidebar-post-meta">
                <span><i class="bi bi-eye"></i> ${formatNumber(blog.visitors)} views</span>
              </div>
            </div>
          </div>
        `,
        )
        .join("");
      sidebarPopular.querySelectorAll(".sidebar-post-item").forEach((item) => {
        item.addEventListener("click", () => {
          window.location.href = `blog-details.html?blog=${item.dataset.slug}`;
        });
      });
    }
  }
  function renderRelatedPosts() {
    const relatedPosts = document.getElementById("relatedPosts");
    if (!relatedPosts) return;
    const relatedPostsList = allBlogs
      .filter(
        (blog) =>
          blog.id !== currentBlog.id &&
          (blog.category === currentBlog.category ||
            blog.tags.some((tag) => currentBlog.tags.includes(tag))),
      )
      .slice(0, 3);
    if (relatedPostsList.length === 0) {
      const randomPosts = allBlogs
        .filter((blog) => blog.id !== currentBlog.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      relatedPosts.innerHTML = randomPosts
        .map((blog) => createRelatedPostCard(blog))
        .join("");
    } else {
      relatedPosts.innerHTML = relatedPostsList
        .map((blog) => createRelatedPostCard(blog))
        .join("");
    }
    relatedPosts.querySelectorAll(".related-post-card").forEach((card) => {
      card.addEventListener("click", () => {
        window.location.href = `blog-details.html?blog=${card.dataset.slug}`;
      });
    });
    if (typeof AOS !== "undefined") {
      setTimeout(() => AOS.refresh(), 100);
    }
  }
  function createRelatedPostCard(blog) {
    const date = new Date(blog.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `
      <div class="related-post-card" data-slug="${blog.slug}" data-aos="fade-up">
        <div class="related-post-image">
          <img src="${blog.image}" alt="${blog.title}" loading="lazy">
        </div>
        <div class="related-post-body">
          <span class="related-post-category">${blog.category}</span>
          <h4 class="related-post-title">${blog.title}</h4>
          <div class="related-post-meta">
            <span><i class="bi bi-calendar3"></i> ${formattedDate}</span>
            <span><i class="bi bi-eye"></i> ${formatNumber(blog.visitors)}</span>
          </div>
        </div>
      </div>
    `;
  }
  function updateShareURLs() {
    const shareTwitter = document.getElementById("shareTwitter");
    const shareFacebook = document.getElementById("shareFacebook");
    const shareLinkedin = document.getElementById("shareLinkedin");
    const shareWhatsapp = document.getElementById("shareWhatsapp");
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentBlog.title);
    if (shareTwitter) {
      shareTwitter.href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    }
    if (shareFacebook) {
      shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    if (shareLinkedin) {
      shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    }
    if (shareWhatsapp) {
      shareWhatsapp.href = `https://wa.me/?text=${text}%20${url}`;
    }
  }
  function bindShareEvents() {
    const shareCopy = document.getElementById("shareCopy");
    if (shareCopy) {
      shareCopy.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(window.location.href);
          const icon = shareCopy.querySelector("i");
          icon.className = "bi bi-check-lg";
          setTimeout(() => {
            icon.className = "bi bi-link-45deg";
          }, 2000);
        } catch (err) {
          console.error("Failed to copy:", err);
        }
      });
    }
  }
  function formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }
  function formatDateShort(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  function showErrorMessage() {
    const container = document.querySelector(".blog-detail-hero-content");
    if (container) {
      container.innerHTML =
        '<div class="text-center py-5"><i class="bi bi-exclamation-circle" style="font-size:64px;color:var(--gray-400);"></i><h3 class="mt-3">Blog Post Not Found</h3><p class="text-muted">The article you\'re looking for doesn\'t exist.</p><a href="blog.html" class="btn btn-primary mt-3"><i class="bi bi-arrow-left"></i> Back to Blog</a></div>';
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchBlogs);
  } else {
    fetchBlogs();
  }
})();
/* ================================
   PORTFOLIO PAGE - Dynamic Listing
   ================================ */
(function () {
  "use strict";
  const portfolioGrid = document.getElementById("portfolioGrid");
  if (!portfolioGrid) return;
  const portfolioFilters = document.getElementById("portfolioFilters");
  const portfolioNoResults = document.getElementById("portfolioNoResults");
  const portfolioResultsCount = document.getElementById(
    "portfolioResultsCount",
  );
  const totalProjectsEl = document.getElementById("totalProjects");
  const totalCategoriesEl = document.getElementById("totalCategories");
  let allProjects = [];
  let activeFilter = "all";
  async function fetchProjects() {
    try {
      const response = await fetch("assets/json/portfolio.json");
      if (!response.ok) throw new Error("Failed to load portfolio data");
      const data = await response.json();
      allProjects = data.projects || [];
      initPortfolio();
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      portfolioGrid.innerHTML =
        '<div class="col-12 text-center py-5"><i class="bi bi-exclamation-circle" style="font-size:48px;color:var(--gray-400);"></i><h4 class="mt-3">Unable to load projects</h4><p class="text-muted">Please try again later.</p></div>';
    }
  }
  function initPortfolio() {
    buildFilters();
    renderProjects();
    bindEvents();
    updateStats();
  }
  function buildFilters() {
    if (!portfolioFilters) return;
    const categories = [...new Set(allProjects.map((p) => p.category))];
    const filterKeys = [...new Set(allProjects.map((p) => p.filterKey))];
    const allBtn = document.createElement("button");
    allBtn.className = `portfolio-filter-btn ${activeFilter === "all" ? "active" : ""}`;
    allBtn.dataset.filter = "all";
    allBtn.textContent = "All Projects";
    portfolioFilters.appendChild(allBtn);
    filterKeys.forEach((key) => {
      const project = allProjects.find((p) => p.filterKey === key);
      const btn = document.createElement("button");
      btn.className = `portfolio-filter-btn ${activeFilter === key ? "active" : ""}`;
      btn.dataset.filter = key;
      btn.textContent = project.category;
      portfolioFilters.appendChild(btn);
    });
  }
  function renderProjects() {
    let filtered =
      activeFilter === "all"
        ? [...allProjects]
        : allProjects.filter((p) => p.filterKey === activeFilter);
    if (filtered.length === 0) {
      portfolioGrid.innerHTML = "";
      if (portfolioNoResults) portfolioNoResults.classList.remove("d-none");
      if (portfolioResultsCount)
        portfolioResultsCount.textContent = "0 projects";
      return;
    }
    if (portfolioNoResults) portfolioNoResults.classList.add("d-none");
    if (portfolioResultsCount)
      portfolioResultsCount.textContent = `${filtered.length} project${filtered.length !== 1 ? "s" : ""}`;
    portfolioGrid.innerHTML = filtered
      .map((project, index) => createProjectCard(project, index))
      .join("");
    if (typeof AOS !== "undefined") {
      setTimeout(() => AOS.refresh(), 100);
    }
  }
  function createProjectCard(project, index) {
    return `
      <div class="portfolio-item-js" data-aos="fade-up" data-aos-delay="${index * 80}">
        <div class="portfolio-card-js">
          <div class="portfolio-card-image-js">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="portfolio-card-overlay-js">
              <div class="portfolio-card-content-js">
                <span class="portfolio-card-category-js">${project.category}</span>
                <h4>${project.title}</h4>
                <p>${project.shortDescription}</p>
                <div class="portfolio-card-actions-js">
                  <a href="portfolio-details.html?project=${project.slug}" class="portfolio-view-btn">
                    <i class="bi bi-arrow-right"></i> View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="portfolio-card-info-js">
            <span class="portfolio-card-tag-js">${project.role}</span>
            <h4>${project.title}</h4>
          </div>
        </div>
      </div>
    `;
  }
  function bindEvents() {
    if (!portfolioFilters) return;
    portfolioFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".portfolio-filter-btn");
      if (!btn) return;
      portfolioFilters
        .querySelectorAll(".portfolio-filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderProjects();
    });
  }
  function updateStats() {
    if (totalProjectsEl) totalProjectsEl.textContent = allProjects.length;
    if (totalCategoriesEl) {
      const cats = new Set(allProjects.map((p) => p.category));
      totalCategoriesEl.textContent = cats.size;
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchProjects);
  } else {
    fetchProjects();
  }
})();
/* ================================
   PORTFOLIO DETAIL PAGE
   ================================ */
(function () {
  "use strict";
  const detailTitle = document.getElementById("detailTitle");
  if (!detailTitle) return;
  let allProjects = [];
  let currentProject = null;
  function getProjectSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("project");
  }
  async function fetchProjects() {
    try {
      const response = await fetch("assets/json/portfolio.json");
      if (!response.ok) throw new Error("Failed to load portfolio data");
      const data = await response.json();
      allProjects = data.projects || [];
      initPortfolioDetail();
    } catch (error) {
      console.error("Error loading portfolio data:", error);
      showErrorMessage();
    }
  }
  function initPortfolioDetail() {
    const slug = getProjectSlugFromURL();
    if (!slug) {
      showErrorMessage();
      return;
    }
    currentProject = allProjects.find((p) => p.slug === slug);
    if (!currentProject) {
      showErrorMessage();
      return;
    }
    renderDetail();
    renderSidebar();
    renderRelatedProjects();
  }
  function renderDetail() {
    const pageTitle = document.getElementById("page-title");
    const pageDescription = document.getElementById("page-description");
    if (pageTitle)
      pageTitle.textContent = `${currentProject.title} - Cakiweb Solutions`;
    if (pageDescription)
      pageDescription.textContent = currentProject.shortDescription;
    const detailCategory = document.getElementById("detailCategory");
    const detailClient = document.getElementById("detailClient");
    const detailDate = document.getElementById("detailDate");
    const detailDuration = document.getElementById("detailDuration");
    const detailRole = document.getElementById("detailRole");
    if (detailCategory) detailCategory.textContent = currentProject.category;
    if (detailTitle) detailTitle.textContent = currentProject.title;
    if (detailClient) detailClient.textContent = currentProject.client;
    if (detailDate)
      detailDate.textContent = formatDate(currentProject.projectDate);
    if (detailDuration) detailDuration.textContent = currentProject.duration;
    if (detailRole) detailRole.textContent = currentProject.role;
    const detailMainImage = document.getElementById("detailMainImage");
    const portfolioThumbs = document.getElementById("portfolioThumbs");
    if (detailMainImage) {
      detailMainImage.src = currentProject.image;
      detailMainImage.alt = currentProject.title;
    }
    if (portfolioThumbs && currentProject.gallery) {
      portfolioThumbs.innerHTML = currentProject.gallery
        .map(
          (img, i) => `
          <div class="portfolio-thumb-item ${i === 0 ? "active" : ""}" data-index="${i}">
            <img src="${img}" alt="Gallery image ${i + 1}">
          </div>
        `,
        )
        .join("");
      portfolioThumbs.addEventListener("click", (e) => {
        const thumb = e.target.closest(".portfolio-thumb-item");
        if (!thumb) return;
        portfolioThumbs
          .querySelectorAll(".portfolio-thumb-item")
          .forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        if (detailMainImage) {
          detailMainImage.src =
            currentProject.gallery[parseInt(thumb.dataset.index)];
        }
      });
    }
    const detailDescription = document.getElementById("detailDescription");
    if (detailDescription)
      detailDescription.innerHTML = currentProject.fullDescription;
    const detailTechnologies = document.getElementById("detailTechnologies");
    if (detailTechnologies && currentProject.technologies) {
      detailTechnologies.innerHTML = currentProject.technologies
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join("");
    }
    const detailTestimonialWrap = document.getElementById(
      "detailTestimonialWrap",
    );
    if (detailTestimonialWrap && currentProject.testimonial) {
      detailTestimonialWrap.innerHTML = `
        <div class="testimonial-quote-box">
          <i class="bi bi-quote quote-icon-left"></i>
          <p class="testimonial-text">${currentProject.testimonial.text}</p>
          <div class="testimonial-author">
            <div class="author-avatar-icon"><i class="bi bi-person-circle"></i></div>
            <div class="author-details">
              <strong>${currentProject.testimonial.author}</strong>
              <span>${currentProject.testimonial.position}</span>
            </div>
          </div>
        </div>
      `;
    }
    const infoCategory = document.getElementById("infoCategory");
    const infoClient = document.getElementById("infoClient");
    const infoDate = document.getElementById("infoDate");
    const infoDuration = document.getElementById("infoDuration");
    const infoRole = document.getElementById("infoRole");
    const detailProjectUrl = document.getElementById("detailProjectUrl");
    if (infoCategory) infoCategory.textContent = currentProject.category;
    if (infoClient) infoClient.textContent = currentProject.client;
    if (infoDate) infoDate.textContent = formatDate(currentProject.projectDate);
    if (infoDuration) infoDuration.textContent = currentProject.duration;
    if (infoRole) infoRole.textContent = currentProject.role;
    if (detailProjectUrl) detailProjectUrl.href = currentProject.projectUrl;
  }
  function renderSidebar() {
    const allProjectsList = document.getElementById("allProjectsList");
    if (!allProjectsList) return;
    allProjectsList.innerHTML = allProjects
      .filter((p) => p.id !== currentProject.id)
      .map(
        (p) => `
        <div class="all-project-item" data-slug="${p.slug}">
          <div class="all-project-thumb">
            <img src="${p.image}" alt="${p.title}">
          </div>
          <div class="all-project-info">
            <h5>${p.title}</h5>
            <span>${p.category}</span>
          </div>
        </div>
      `,
      )
      .join("");
    allProjectsList.querySelectorAll(".all-project-item").forEach((item) => {
      item.addEventListener("click", () => {
        window.location.href = `portfolio-details.html?project=${item.dataset.slug}`;
      });
    });
  }
  function renderRelatedProjects() {
    const relatedProjects = document.getElementById("relatedProjects");
    if (!relatedProjects) return;
    const related = allProjects
      .filter((p) => p.id !== currentProject.id)
      .sort((a, b) => {
        const aMatch = a.filterKey === currentProject.filterKey ? 1 : 0;
        const bMatch = b.filterKey === currentProject.filterKey ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
    relatedProjects.innerHTML = related
      .map(
        (p, i) => `
        <div class="related-project-card" data-slug="${p.slug}" data-aos="fade-up" data-aos-delay="${i * 100}">
          <div class="related-project-image">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </div>
          <div class="related-project-body">
            <span class="related-project-category">${p.category}</span>
            <h4 class="related-project-title">${p.title}</h4>
            <p class="related-project-desc">${p.shortDescription}</p>
          </div>
        </div>
      `,
      )
      .join("");
    relatedProjects
      .querySelectorAll(".related-project-card")
      .forEach((card) => {
        card.addEventListener("click", () => {
          window.location.href = `portfolio-details.html?project=${card.dataset.slug}`;
        });
      });
    if (typeof AOS !== "undefined") {
      setTimeout(() => AOS.refresh(), 100);
    }
  }
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  function showErrorMessage() {
    const container = document.querySelector(".portfolio-detail-hero-content");
    if (container) {
      container.innerHTML =
        '<div class="text-center py-5"><i class="bi bi-exclamation-circle" style="font-size:64px;color:var(--gray-400);"></i><h3 class="mt-3">Project Not Found</h3><p class="text-muted">The project you\'re looking for doesn\'t exist.</p><a href="portfolio.html" class="btn btn-primary mt-3"><i class="bi bi-arrow-left"></i> Back to Portfolio</a></div>';
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchProjects);
  } else {
    fetchProjects();
  }
})();
/* ================================
   INDEX PAGE - Blog Preview
   ================================ */
(function () {
  "use strict";
  const indexBlogGrid = document.getElementById("indexBlogGrid");
  if (!indexBlogGrid) return;
  async function fetchAndRender() {
    try {
      const response = await fetch("assets/json/blog.json");
      if (!response.ok) throw new Error("Failed to load blog data");
      const data = await response.json();
      const blogs = (data.blogs || [])
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
      indexBlogGrid.innerHTML = blogs
        .map((blog, i) => {
          const date = new Date(blog.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });
          return `
          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${(i + 1) * 100}">
            <article class="blog-card">
              <div class="blog-img">
                <img src="${blog.image}" alt="${blog.title}" loading="lazy">
                <span class="blog-date">${formattedDate}</span>
              </div>
              <div class="blog-content">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <a href="blog-details.html?blog=${blog.slug}" class="read-more">
                  Read More <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </article>
          </div>
        `;
        })
        .join("");
      if (typeof AOS !== "undefined") {
        setTimeout(() => AOS.refresh(), 100);
      }
    } catch (error) {
      console.error("Error loading blog preview:", error);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fetchAndRender);
  } else {
    fetchAndRender();
  }
  /* ========================================
     Legal Pages - Smooth Scroll & Active Navigation
     ======================================== */
  function initLegalPagesNav() {
    const legalNav = document.querySelectorAll(".legal-nav a");
    const contentBlocks = document.querySelectorAll(".content-block[id]");
    if (legalNav.length === 0 || contentBlocks.length === 0) return;
    legalNav.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetBlock = document.getElementById(targetId);
        if (targetBlock) {
          const offsetTop = targetBlock.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
    let ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    });
    function updateActiveNav() {
      const scrollPosition = window.pageYOffset + 150;
      let currentSection = "";
      contentBlocks.forEach((block, index) => {
        const blockTop = block.offsetTop;
        const blockBottom = blockTop + block.offsetHeight;
        if (scrollPosition >= blockTop && scrollPosition < blockBottom) {
          currentSection = block.getAttribute("id");
        }
      });
      if (!currentSection) {
        for (let i = contentBlocks.length - 1; i >= 0; i--) {
          if (scrollPosition >= contentBlocks[i].offsetTop) {
            currentSection = contentBlocks[i].getAttribute("id");
            break;
          }
        }
      }
      legalNav.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    }
    updateActiveNav();
  }
  (function initWhatsAppPopupImmediately() {
    if (!document.getElementById('whatsapp-popup')) return;
    window.toggleWhatsAppPopup = function() {
      const popup = document.getElementById('whatsapp-popup');
      if (popup) popup.classList.toggle('active');
    };
    window.sendToWhatsApp = function(event) {
      event.preventDefault();
      const nameEl = document.getElementById('wa-name');
      const emailEl = document.getElementById('wa-email');
      const messageEl = document.getElementById('wa-message');
      if (!nameEl || !emailEl || !messageEl) return;
      const name = nameEl.value;
      const email = emailEl.value;
      const message = messageEl.value;
      const phoneNumber = '919437368484';
      const whatsappMessage = `*New Message from Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      window.open(whatsappURL, '_blank');
      const popup = document.getElementById('whatsapp-popup');
      if (popup) popup.classList.remove('active');
      nameEl.value = '';
      emailEl.value = '';
      messageEl.value = '';
    };
    document.addEventListener('click', function(e) {
      const popup = document.getElementById('whatsapp-popup');
      const floatBtn = document.querySelector('.whatsapp-float');
      if (popup && !popup.contains(e.target) && floatBtn && !floatBtn.contains(e.target)) {
        popup.classList.remove('active');
      }
    });
  })();
  (function initStoryTogglesImmediately() {
    if (!document.getElementById('view-more-btn-cost')) return;
    function toggleCardStory(storyId, btnId, textId) {
      const storyFull = document.getElementById(storyId);
      const btn = document.getElementById(btnId);
      const btnText = document.getElementById(textId);
      if (!storyFull || !btn || !btnText) return;
      if (storyFull.classList.contains("story-hidden")) {
        storyFull.classList.remove("story-hidden");
        storyFull.classList.add("story-visible");
        btnText.textContent = "View Less";
        btn.classList.add("expanded");
      } else {
        storyFull.classList.remove("story-visible");
        storyFull.classList.add("story-hidden");
        btnText.textContent = "View More";
        btn.classList.remove("expanded");
      }
    }
    window.toggleStoryCost = function() {
      toggleCardStory("story-full-cost", "view-more-btn-cost", "view-more-text-cost");
    };
    window.toggleStoryVariety = function() {
      toggleCardStory("story-full-variety", "view-more-btn-variety", "view-more-text-variety");
    };
    window.toggleStorySecure = function() {
      toggleCardStory("story-full-secure", "view-more-btn-secure", "view-more-text-secure");
    };
    window.toggleStorySupport = function() {
      toggleCardStory("story-full-support", "view-more-btn-support", "view-more-text-support");
    };
  })();
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    const formMessage = document.getElementById('form-message');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      if (!data.name || !data.email || !data.message || !data.subject) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
      submitBtn.disabled = true;
      setTimeout(() => {
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
    function showMessage(text, type) {
      formMessage.textContent = text;
      formMessage.style.display = 'block';
      formMessage.style.background = type === 'success'
        ? 'rgba(16, 185, 129, 0.1)'
        : 'rgba(239, 68, 68, 0.1)';
      formMessage.style.color = type === 'success' ? '#059669' : '#dc2626';
      formMessage.style.border = `1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`;
      setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
    }
  }
  (function initEmailJSImmediately() {
    if (typeof emailjs === 'undefined') return;
    emailjs.init({ publicKey: 'O7t07Am9Hj1fkJonQ' });
  })();
  function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
      emailjs.init({ publicKey: 'O7t07Am9Hj1fkJonQ' });
    }
  }
  function initCareerApplicationForm() {
    const applyModal = document.getElementById('apply-modal');
    const applyForm = document.getElementById('apply-form');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const successCloseBtn = document.getElementById('success-close-btn');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const fileUploadArea = document.getElementById('file-upload-area');
    const resumeFileInput = document.getElementById('resume-file');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const removeFileBtn = document.getElementById('remove-file-btn');
    if (!applyModal || !applyForm) return;
    if (fileUploadArea && resumeFileInput) {
      fileUploadArea.addEventListener('click', (e) => {
        if (e.target !== removeFileBtn && !removeFileBtn?.contains(e.target)) {
          resumeFileInput.click();
        }
      });
      resumeFileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          const file = this.files[0];
          if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            this.value = '';
            return;
          }
          const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          if (!allowedTypes.includes(file.type)) {
            alert('Only PDF, DOC, and DOCX files are allowed');
            this.value = '';
            return;
          }
          if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
          if (filePreview) {
            filePreview.style.display = 'flex';
            if (fileName) fileName.textContent = file.name;
            if (fileSize) fileSize.textContent = (file.size / 1024).toFixed(2) + ' KB';
          }
        }
      });
      if (removeFileBtn) {
        removeFileBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          resumeFileInput.value = '';
          if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
          if (filePreview) filePreview.style.display = 'none';
        });
      }
    }
    applyForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (typeof emailjs === 'undefined') {
        alert('EmailJS not loaded. Please try again.');
        return;
      }
      const btnText = submitBtn?.querySelector('.btn-text');
      const btnLoading = submitBtn?.querySelector('.btn-loading');
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'flex';
      if (submitBtn) submitBtn.disabled = true;
      try {
        const formData = {
          firstName: document.getElementById('first-name')?.value || '',
          lastName: document.getElementById('last-name')?.value || '',
          email: document.getElementById('email')?.value || '',
          phone: document.getElementById('phone')?.value || '',
          location: document.getElementById('location')?.value || '',
          linkedin: document.getElementById('linkedin')?.value || '',
          portfolio: document.getElementById('portfolio')?.value || '',
          experienceYears: document.getElementById('experience-years')?.value || '',
          currentCTC: document.getElementById('current-ctc')?.value || '',
          expectedCTC: document.getElementById('expected-ctc')?.value || '',
          noticePeriod: document.getElementById('notice-period')?.value || '',
          coverLetter: document.getElementById('cover-letter')?.value || '',
          jobTitle: document.getElementById('modal-job-title')?.textContent || ''
        };
        await emailjs.send('service_cakiweb', 'template_career_application', formData);
        applyForm.style.display = 'none';
        if (successMessage) successMessage.style.display = 'block';
        applyForm.reset();
        if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
        if (filePreview) filePreview.style.display = 'none';
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
      } finally {
        if (btnText) btnText.style.display = 'flex';
        if (btnLoading) btnLoading.style.display = 'none';
        if (submitBtn) submitBtn.disabled = false;
      }
    });
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', function() {
        applyModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        applyModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    if (successCloseBtn) {
      successCloseBtn.addEventListener('click', function() {
        applyModal.classList.remove('active');
        document.body.style.overflow = '';
        if (successMessage) successMessage.style.display = 'none';
        if (applyForm) applyForm.style.display = 'block';
      });
    }
    const backdrop = applyModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', function() {
        applyModal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initEmailJS();
  });
})();
