// Configuração inicial
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeScrollEffects();
  initializeMobileMenu();
  initializeSmoothScroll();
});

// Função para scroll suave entre seções
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const elementPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Inicializar scroll suave para links de navegação
function initializeSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
}

// Inicializar animações de fade-in
function initializeAnimations() {
  // Adicionar classe fade-in para elementos que devem ser animados
  const animatedElements = document.querySelectorAll(
    ".platform-card, .step, .hero-content"
  );

  animatedElements.forEach((element) => {
    element.classList.add("fade-in");
  });

  // Animar cards do comparativo com delay
  const platformCards = document.querySelectorAll(".platform-card");
  platformCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Animar steps com delay
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.3}s`;
  });
}

// Inicializar efeitos de scroll
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animar barras do gráfico quando a seção de recomendação for visível
        if (entry.target.classList.contains("recomendacao")) {
          animateChartBars();
        }
      }
    });
  }, observerOptions);

  // Observar elementos que devem ser animados
  const elementsToObserve = document.querySelectorAll(
    ".fade-in, .recomendacao"
  );
  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });

  // Efeito de transparência no header durante scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const scrolled = window.pageYOffset;

    if (scrolled > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });
}

// Animar barras do gráfico
function animateChartBars() {
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar, index) => {
    setTimeout(() => {
      bar.style.width = bar.style.width || "0%";
      bar.style.transition = "width 2s ease";
      bar.style.width = bar.getAttribute("data-width") || bar.style.width;
    }, index * 300);
  });
}

// Inicializar menu mobile
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector(".nav");

  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        nav.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
  }
}

// Efeito parallax sutil no hero
function initializeParallax() {
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");

    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Adicionar efeitos de hover nos cards
function initializeCardHovers() {
  const cards = document.querySelectorAll(".platform-card, .step");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Inicializar todos os efeitos
document.addEventListener("DOMContentLoaded", function () {
  initializeParallax();
  initializeCardHovers();

  // Adicionar dados de largura para as barras do gráfico
  const nuvemshopBar = document.querySelector(".nuvemshop-bar .bar");
  const lojaIntegradaBar = document.querySelector(".loja-integrada-bar .bar");

  if (nuvemshopBar) nuvemshopBar.setAttribute("data-width", "95%");
  if (lojaIntegradaBar) lojaIntegradaBar.setAttribute("data-width", "70%");
});

// Função para animar contadores (se necessário)
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current);

      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  });
}

// Adicionar efeito de typing no título principal
function initializeTypingEffect() {
  const title = document.querySelector(".hero-title");
  if (!title) return;

  const text = title.textContent;
  title.textContent = "";
  title.style.borderRight = "2px solid #007aff";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    } else {
      title.style.borderRight = "none";
    }
  };

  // Iniciar efeito após um pequeno delay
  setTimeout(typeWriter, 500);
}

// Inicializar efeito de typing
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeTypingEffect, 1000);
});

// Adicionar suporte para teclado (acessibilidade)
document.addEventListener("keydown", function (e) {
  // ESC para fechar menu mobile
  if (e.key === "Escape") {
    const nav = document.querySelector(".nav");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    }
  }
});

// Otimização de performance - throttling para eventos de scroll
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Aplicar throttling aos eventos de scroll
window.addEventListener(
  "scroll",
  throttle(function () {
    // Efeitos de scroll otimizados
    const scrolled = window.pageYOffset;
    const header = document.querySelector(".header");

    if (scrolled > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }, 16)
);

// Adicionar estilos para menu mobile ativo
const style = document.createElement("style");
style.textContent = `
    @media (max-width: 768px) {
        .nav.active {
            display: block;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            z-index: 999;
        }
        
        .nav.active .nav-list {
            flex-direction: column;
            gap: 20px;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
