import { browserLanguage, content } from "./content.js";

const defaults = { androidPackage: "", playStoreUrl: "https://play.google.com/store/search?q=KadeAki&c=apps", locationRoutes: ["location", "locatrion"], canonicalLocationRoute: "location" };
const config = { ...defaults, ...(window.KADEAKI_CONFIG || {}) };
let language = browserLanguage();

function brand() { return `<a class="brand" href="/" aria-label="KadeAki"><img class="brand-mark" src="/assets/kadeaki-mark.svg" alt="" /><img class="brand-wordmark" src="/assets/kadeaki-wordmark.svg" alt="KadeAki" /></a>`; }
function heroQrLabel(position) { return `<span class="hero-qr-label ${position}" aria-hidden="true"><span class="hero-qr-title">KadeAki</span><span class="hero-qr-code"><svg viewBox="0 0 72 72" aria-hidden="true"><path fill="currentColor" d="M4 4h20v20H4V4Zm5 5v10h10V9H9Zm39-5h20v20H48V4Zm5 5v10h10V9H53ZM4 48h20v20H4V48Zm5 5v10h10V53H9Zm20-45h5v5h-5V8Zm8 0h5v5h-5V8Zm0 8h5v5h-5v-5Zm-8 8h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5Zm-16 8h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5ZM29 32h5v5h-5v-5Zm8 0h5v5h-5v-5Zm16 0h5v5h-5v-5Zm8 0h5v5h-5v-5ZM29 40h5v5h-5v-5Zm8 0h5v5h-5v-5Zm16 0h5v5h-5v-5Zm8 0h5v5h-5v-5ZM29 48h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5Zm16 0h5v5h-5v-5Zm-32 8h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5Zm16 0h5v5h-5v-5Zm-24 8h5v5h-5v-5Zm8 0h5v5h-5v-5Zm8 0h5v5h-5v-5Z"/></svg><img src="/assets/kadeaki-mark.svg" alt="" /></span></span>`; }
function featureIcon(name) {
  const icons = {
    box: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 8.5 8.5-4 8.5 4-8.5 4-8.5-4Z"/><path d="M3.5 8.5v8l8.5 4.5v-8.5M20.5 8.5v8L12 21"/></svg>`,
    pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10.2C20 15.6 12 21 12 21S4 15.6 4 10.2a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
    qr: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 4H5a1 1 0 0 0-1 1v3.5M15.5 4H19a1 1 0 0 1 1 1v3.5M20 15.5V19a1 1 0 0 1-1 1h-3.5M8.5 20H5a1 1 0 0 1-1-1v-3.5M8 12h8M12 8v8"/></svg>`,
    leaf: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19C5 9 11 4 20 4c0 9-5 15-15 15Z"/><path d="M5 18c3-4 7-7 12-10"/></svg>`,
  };
  return `<span class="feature-icon">${icons[name]}</span>`;
}
function setMetadata(t) { document.documentElement.lang = language === "pt" ? "pt-BR" : language; document.title = t.title; document.querySelector('meta[name="description"]').content = t.description; document.querySelector('meta[property="og:title"]').content = t.title; document.querySelector('meta[property="og:description"]').content = t.description; document.querySelector('meta[property="og:locale"]').content = t.locale; }
function appButton(label, extraClass = "") { return `<a class="button ${extraClass}" href="${config.playStoreUrl}" target="_blank" rel="noopener">${label}</a>`; }
function languageSwitch() { return `<div class="language-switch" aria-label="Language">${["pt", "en", "es"].map((item) => `<button data-language="${item}" aria-pressed="${language === item}">${item.toUpperCase()}</button>`).join("")}</div>`; }

function renderLanding() {
  const t = content[language]; setMetadata(t);
  document.querySelector("#app").innerHTML = `<main>
    <div class="shell"><nav class="nav">${brand()}${languageSwitch()}</nav>
    <section class="hero"><div class="hero-copy"><p class="eyebrow">KadeAki</p><h1>${t.hero}</h1><p>${t.heroText}</p>${appButton(t.download)}</div><div class="hero-visual"><div class="hero-photo"><img src="/assets/hero-stacked-boxes.png" alt="" />${heroQrLabel("hero-qr-top")}${heroQrLabel("hero-qr-middle")}${heroQrLabel("hero-qr-bottom")}</div><p class="floating-note">✓ ${t.organize}</p></div></section></div>
    <section class="section"><div class="shell"><p class="kicker">${t.howKicker}</p><h2>${t.howTitle}</h2><div class="steps">${t.steps.map(([name, text], index) => `<article class="step"><b>0${index + 1}</b><h3>${name}</h3><p>${text}</p></article>`).join("")}</div></div></section>
    <section class="section dark"><div class="shell qr-layout"><div><p class="kicker">${t.qrKicker}</p><h2>${t.qrTitle}</h2><p>${t.qrText}</p></div><div class="qr-card"><div class="storage-box"><div class="qr" aria-hidden="true"></div></div><p><span>KADEAKI</span><b>${t.box}</b></p></div></div></section>
    <section class="section"><div class="shell"><p class="kicker">${t.organize}</p><h2>${t.features[0][1]}</h2><div class="feature-grid">${t.features.map(([title, text], index) => `<article class="feature feature-${index + 1}">${featureIcon(["box", "pin", "qr", "leaf"][index])}<h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="languages"><p>${t.language}</p><div><span>Português</span><span>English</span><span>Español</span></div></div><section class="download"><h2>${t.installTitle}</h2>${appButton(t.download, "dark-button")}</section><footer>${brand()}<span>${t.footer}</span></footer></div></section>
  </main>`;
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; renderLanding(); }));
}

function locationFromPath() { const parts = location.pathname.split("/").filter(Boolean); const route = parts[0]; const id = decodeURIComponent(parts[1] || ""); return { id, isLocation: config.locationRoutes.includes(route), isValid: /^[A-Za-z0-9_-]{3,64}$/.test(id) }; }
function openAppHref(id) { if (!config.androidPackage) return ""; const path = `${config.canonicalLocationRoute}/${encodeURIComponent(id)}`; return `intent://${path}#Intent;scheme=https;package=${encodeURIComponent(config.androidPackage)};end`; }
function renderLocation(context) {
  const t = content[language]; setMetadata(t); const href = context.isValid ? openAppHref(context.id) : ""; const title = context.isValid ? t.locationTitle : t.invalidTitle; const text = context.isValid ? t.locationText : t.invalidText; const note = context.isValid ? (/android/i.test(navigator.userAgent) ? t.androidNote : t.locationText) : t.invalidNote;
  document.querySelector("#app").innerHTML = `<main class="location-page"><section class="location-card ${context.isValid ? "" : "invalid"}">${brand()}<div class="location-icon">${context.isValid ? featureIcon("pin") : "!"}</div><h1>${title}</h1><p>${text}</p>${context.isValid ? `<code>/${config.canonicalLocationRoute}/${context.id}</code>` : ""}<div class="location-actions">${href ? `<a class="button" href="${href}">${t.open}</a>` : ""}${appButton(t.install, href ? "secondary" : "")}</div><small>${note}</small></section></main>`;
}

const context = locationFromPath(); context.isLocation ? renderLocation(context) : renderLanding();
