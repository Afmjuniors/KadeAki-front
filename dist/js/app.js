import { browserLanguage, content } from "./content.js";

const defaults = { androidPackage: "", playStoreUrl: "https://play.google.com/store/search?q=KadeAki&c=apps", locationRoutes: ["location", "locatrion"], canonicalLocationRoute: "location" };
const config = { ...defaults, ...(window.KADEAKI_CONFIG || {}) };
let language = browserLanguage();

function brand() { return `<a class="brand" href="/" aria-label="KadeAki"><span class="brand-symbol">⌑</span><span>Kade<span>Aki</span></span></a>`; }
function setMetadata(t) { document.documentElement.lang = language === "pt" ? "pt-BR" : language; document.title = t.title; document.querySelector('meta[name="description"]').content = t.description; document.querySelector('meta[property="og:title"]').content = t.title; document.querySelector('meta[property="og:description"]').content = t.description; document.querySelector('meta[property="og:locale"]').content = t.locale; }
function appButton(label, extraClass = "") { return `<a class="button ${extraClass}" href="${config.playStoreUrl}" target="_blank" rel="noopener"><span aria-hidden="true">▶</span>${label}</a>`; }
function languageSwitch() { return `<div class="language-switch" aria-label="Language">${["pt", "en", "es"].map((item) => `<button data-language="${item}" aria-pressed="${language === item}">${item.toUpperCase()}</button>`).join("")}</div>`; }

function renderLanding() {
  const t = content[language]; setMetadata(t);
  document.querySelector("#app").innerHTML = `<main>
    <div class="shell"><nav class="nav">${brand()}${languageSwitch()}</nav>
    <section class="hero"><div class="hero-copy"><p class="eyebrow">KadeAki</p><h1>${t.hero}</h1><p>${t.heroText}</p>${appButton(t.download)}</div><div class="hero-visual"><img src="/assets/hero-storage.png" alt="" /><p class="floating-note">✓ ${t.organize}</p></div></section></div>
    <section class="section"><div class="shell"><p class="kicker">${t.howKicker}</p><h2>${t.howTitle}</h2><div class="steps">${t.steps.map(([name, text], index) => `<article class="step"><b>0${index + 1}</b><h3>${name}</h3><p>${text}</p></article>`).join("")}</div></div></section>
    <section class="section dark"><div class="shell qr-layout"><div><p class="kicker">${t.qrKicker}</p><h2>${t.qrTitle}</h2><p>${t.qrText}</p></div><div class="qr-card"><div class="storage-box"><div class="qr" aria-hidden="true"></div></div><p><span>KADEAKI</span><b>${t.box}</b></p></div></div></section>
    <section class="section"><div class="shell"><p class="kicker">${t.organize}</p><h2>${t.features[0][1]}</h2><div class="feature-grid">${t.features.map(([title, text], index) => `<article class="feature feature-${index + 1}"><span>${["⌑", "◌", "⌁", "◎"][index]}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="languages"><p>${t.language}</p><div><span>Português</span><span>English</span><span>Español</span></div></div><section class="download"><h2>${t.installTitle}</h2>${appButton(t.download, "dark-button")}</section><footer>${brand()}<span>${t.footer}</span></footer></div></section>
  </main>`;
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; renderLanding(); }));
}

function locationFromPath() { const parts = location.pathname.split("/").filter(Boolean); const route = parts[0]; const id = decodeURIComponent(parts[1] || ""); return { id, isLocation: config.locationRoutes.includes(route), isValid: /^[A-Za-z0-9_-]{3,64}$/.test(id) }; }
function openAppHref(id) { if (!config.androidPackage) return ""; const path = `${config.canonicalLocationRoute}/${encodeURIComponent(id)}`; return `intent://${path}#Intent;scheme=https;package=${encodeURIComponent(config.androidPackage)};end`; }
function renderLocation(context) {
  const t = content[language]; setMetadata(t); const href = context.isValid ? openAppHref(context.id) : ""; const title = context.isValid ? t.locationTitle : t.invalidTitle; const text = context.isValid ? t.locationText : t.invalidText; const note = context.isValid ? (/android/i.test(navigator.userAgent) ? t.androidNote : t.locationText) : t.invalidNote;
  document.querySelector("#app").innerHTML = `<main class="location-page"><section class="location-card ${context.isValid ? "" : "invalid"}">${brand()}<div class="location-icon">${context.isValid ? "⌖" : "!"}</div><h1>${title}</h1><p>${text}</p>${context.isValid ? `<code>/${config.canonicalLocationRoute}/${context.id}</code>` : ""}<div class="location-actions">${href ? `<a class="button" href="${href}">${t.open}</a>` : ""}${appButton(t.install, href ? "secondary" : "")}</div><small>${note}</small></section></main>`;
}

const context = locationFromPath(); context.isLocation ? renderLocation(context) : renderLanding();
