console.log("✅ script.js loaded");
/* =========================
   NAVIGATION
========================= */
// hamburger, scroll, etc.

/* =========================
   PROJECT OVERLAY LOGIC
========================= */

const PROJECTS = {
  sales: {
    title: "Sales Performance Dashboard",
    tech: ["Power BI", "SQL", "Pandas"],
    desc: "Executive-level sales dashboard delivering YoY growth and margin insights.",
    details: `
      <h4>Key Highlights</h4>
      <ul>
        <li>40+ hrs/month saved</li>
        <li>SQL-powered live refresh</li>
        <li>Executive-ready KPIs</li>
      </ul>
    `,
    iframe:
      "https://app.powerbi.com/view?r=eyJrIjoiYjFkMmYzYTYtMGVlNC00Nzk2LWFiMTYtMjUwN2RlYWJkZDYxIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9"
  },

  churn: {
    title: "Customer Churn Prediction",
    tech: ["Python", "Scikit-learn"],
    desc: "Machine learning model predicting customer churn with actionable insights.",
    details: `
      <ul>
        <li>Feature engineering</li>
        <li>Retention uplift: 15%</li>
      </ul>
    `,
    iframe: ""
  },

  risk: {
    title: "Financial Risk Dashboard",
    tech: ["Tableau", "MySQL"],
    desc: "Risk monitoring dashboard for finance stakeholders.",
    details: `
      <ul>
        <li>Heatmaps & prioritization</li>
        <li>Early risk detection</li>
      </ul>
    `,
    iframe: ""
  }
};


let scrollY = 0;



/* =========================
   EVENT LISTENERS
========================= */
// Basic interactivity for multi-page dashboard

document.addEventListener('DOMContentLoaded', () => {
  // set years
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  const yearEl2 = document.getElementById('year2');
  if (yearEl2) yearEl2.textContent = y;


  // reveal on scroll
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Smooth scroll internal links (on same page)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1 && document.querySelector(href)) {
        ev.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav-menu a');

  function markActive() {
    const current = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }

  markActive();

  // Close menu on link click (mobile UX)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });




  const box = document.getElementById("floating-video");
  const handle = document.getElementById("dragHandle");
  const closeBtn = document.getElementById("closeVideo");

  if (!box || !handle || !closeBtn) {
    console.error("Floating video elements not found");
  } else {

    const box = document.getElementById("floating-video");
    const video = document.getElementById("videoPlayer");
    const closeBtn = document.getElementById("closeVideo");

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    box.addEventListener("mousedown", (e) => {
      isDragging = true;
      const rect = box.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      box.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      box.style.left = e.clientX - offsetX + "px";
      box.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      box.style.cursor = "grab";
    });

    /* TOUCH */
    box.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      const rect = box.getBoundingClientRect();
      offsetX = t.clientX - rect.left;
      offsetY = t.clientY - rect.top;
      isDragging = true;
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const t = e.touches[0];
      box.style.left = t.clientX - offsetX + "px";
      box.style.top = t.clientY - offsetY + "px";
    }, { passive: false });

    document.addEventListener("touchend", () => {
      isDragging = false;
    });

    /* CLOSE */
    if (box && video && closeBtn) {
      closeBtn.addEventListener("click", () => {
        video.pause();
        video.currentTime = 0;
        box.style.display = "none";
      });
    }

  }



  // contact form: mailto fallback + toast
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();

      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }

      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        `${message}\n\nFrom: ${name} (${email})`
      );

      showToast?.('Opening your mail client…');

      setTimeout(() => {
        window.location.href =
          `mailto:harshitpawar0103@gmail.com?subject=${subject}&body=${body}`;
        form.reset();
      }, 300);
    });
  });


  // toast helper
  function showToast(text = 'Message sent') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // expose showToast globally if needed
  window.showToast = showToast;





  //Open overlay dynamically
  /* ================= OVERLAY LOGIC ================= */

  function openProject() {
    document.getElementById('projectOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }



  const blocks = document.querySelectorAll(".project-block");
  console.log("Project blocks found:", blocks.length);
  blocks.forEach(b => {
    console.log("Project key:", b.dataset.project);
  });
  const overlay = document.getElementById("projectOverlay");
  const titleEl = document.getElementById("overlayTitle");
  const techEl = document.getElementById("overlayTech");
  const descEl = document.getElementById("overlayDesc");
  const detailsEl = document.getElementById("overlayDetails");
  const frameEl = document.getElementById("overlayFrame");
  const overlaycloseBtn = document.getElementById("closeOverlay");

  /* Open overlay on project click */
  document.querySelectorAll(".project-block").forEach(block => {
    block.addEventListener("click", () => {
      const key = block.dataset.project;
      const data = PROJECTS[key];
      if (!data) return;

      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      detailsEl.innerHTML = data.details;

      techEl.innerHTML = "";
      data.tech.forEach(t => {
        const span = document.createElement("span");
        span.textContent = t;
        techEl.appendChild(span);
      });

      if (data.iframe) {
        frameEl.src = data.iframe;
        frameEl.style.display = "block";
      } else {
        frameEl.style.display = "none";
      }

      /* SAVE scroll */
      scrollY = window.scrollY;

      /* LOCK body */
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      overlay.classList.add("active");
    });
  });

  /* Close overlay */
  function closeOverlay() {
    overlay.classList.remove("active");
    frameEl.src = "";

    /* UNLOCK body */
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    /* RESTORE scroll */
    window.scrollTo(0, scrollY);
  }



  overlaycloseBtn.addEventListener("click", closeOverlay);

  /* ESC key */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeOverlay();
  });



});
