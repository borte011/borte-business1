const translations = {
  so: {
    "nav.home": "Guriga",
    "nav.shops": "Dukaamada",
    "nav.about": "Nagu saabsan",
    "nav.contact": "Nala soo xiriir",
    "nav.cta": "WhatsApp",
    "hero.title": "Shopping sahlan, qiimo wanaagsan",
    "hero.lead":
      "Ku soo dhowow BORTE - dukaamo kala duwan, alaab tayo leh, iyo qiimo ku raali geliya.",
    "hero.cta": "Eeg dukaamada",
    "hero.secondary": "Nala soo xiriir",
    "shops.eyebrow": "Dukaamada",
    "shops.title": "Shopino tijaabo ah",
    "shops.lead": "Dooro dukaanka aad rabto oo arag alaabta iyo qiimaha.",
    "shop1.name": "Borte Fashion",
    "shop1.tag": "Dharka & kabaha",
    "shop1.p1": "Shirt",
    "shop1.p2": "Kabaha",
    "shop1.p3": "Boorsada",
    "shop2.name": "Borte Electronics",
    "shop2.tag": "Elektaroonig",
    "shop2.p1": "Phone case",
    "shop2.p2": "Earphones",
    "shop2.p3": "Charger",
    "shop3.name": "Borte Food Market",
    "shop3.tag": "Cunto & raashin",
    "shop3.p1": "Bariis 25kg",
    "shop3.p2": "Saliid",
    "shop3.p3": "Sonkor",
    "shop4.name": "Borte Home Store",
    "shop4.tag": "Guriga alaabta",
    "shop4.p1": "Bustee",
    "shop4.p2": "Koob set",
    "shop4.p3": "Laambad",
    "shop.order": "Dalbo WhatsApp",
    "about.eyebrow": "Nagu saabsan",
    "about.title": "BORTE waa shopping kalsooni leh",
    "about.text":
      "BORTE waa platform shopping oo kuu ogolaanaysa inaad ka iibsato dukaamo kala duwan. Waxaan bixinaa alaab wanaagsan, qiimo macquul ah, iyo adeeg degdeg ah.",
    "contact.eyebrow": "Nala soo xiriir",
    "contact.title": "Bilow shopping-kaaga maanta",
    "contact.text":
      "Nala soo xiriir WhatsApp, telefoon, ama email - waxaan kuu jawaabi doonaa si degdeg ah.",
    "contact.phone": "Telefoon",
    "footer.note": "Shopping | Qiimo | Kalsooni",
  },
  en: {
    "nav.home": "Home",
    "nav.shops": "Shops",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cta": "WhatsApp",
    "hero.title": "Easy shopping, fair prices",
    "hero.lead":
      "Welcome to BORTE - different shops, quality products, and prices that satisfy you.",
    "hero.cta": "View shops",
    "hero.secondary": "Contact us",
    "shops.eyebrow": "Shops",
    "shops.title": "Trial shops",
    "shops.lead": "Choose a shop and see products with prices.",
    "shop1.name": "Borte Fashion",
    "shop1.tag": "Clothing & shoes",
    "shop1.p1": "Shirt",
    "shop1.p2": "Shoes",
    "shop1.p3": "Bag",
    "shop2.name": "Borte Electronics",
    "shop2.tag": "Electronics",
    "shop2.p1": "Phone case",
    "shop2.p2": "Earphones",
    "shop2.p3": "Charger",
    "shop3.name": "Borte Food Market",
    "shop3.tag": "Food & groceries",
    "shop3.p1": "Rice 25kg",
    "shop3.p2": "Cooking oil",
    "shop3.p3": "Sugar",
    "shop4.name": "Borte Home Store",
    "shop4.tag": "Home items",
    "shop4.p1": "Blanket",
    "shop4.p2": "Cup set",
    "shop4.p3": "Lamp",
    "shop.order": "Order on WhatsApp",
    "about.eyebrow": "About",
    "about.title": "BORTE is trusted shopping",
    "about.text":
      "BORTE is a shopping platform where you can buy from different stores. We offer good products, fair prices, and fast service.",
    "contact.eyebrow": "Contact",
    "contact.title": "Start shopping today",
    "contact.text":
      "Reach us on WhatsApp, phone, or email - we respond quickly.",
    "contact.phone": "Phone",
    "footer.note": "Shopping | Value | Trust",
  },
};

let currentLang = "so";

const langToggle = document.getElementById("langToggle");
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];
  document.documentElement.lang = lang === "so" ? "so" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });

  if (langToggle) {
    langToggle.textContent = lang === "so" ? "EN" : "SO";
  }

  try {
    localStorage.setItem("borte-lang", lang);
  } catch (_) {
    /* ignore */
  }
}

function toggleMenu(forceClose) {
  if (!menuBtn || !mobileNav) return;
  const open =
    forceClose === true ? false : menuBtn.getAttribute("aria-expanded") !== "true";
  menuBtn.setAttribute("aria-expanded", String(open));
  mobileNav.hidden = !open;
  mobileNav.classList.toggle("is-open", open);
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    applyLanguage(currentLang === "so" ? "en" : "so");
  });
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => toggleMenu());
}

mobileNav &&
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(true));
  });

try {
  const saved = localStorage.getItem("borte-lang");
  applyLanguage(saved === "en" || saved === "so" ? saved : "so");
} catch (_) {
  applyLanguage("so");
}

const revealTargets = Array.prototype.slice.call(
  document.querySelectorAll(
    ".about-copy, .contact .section-inner, .shops-intro, .shop-card"
  )
);

revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
  );
  revealTargets.forEach((el) => observer.observe(el));
}

window.setTimeout(() => {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("is-visible");
  });
}, 400);
