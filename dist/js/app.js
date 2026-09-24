import { browserLanguage, content } from "./content.js";

const defaults = { androidPackage: "", playStoreUrl: "https://play.google.com/store/search?q=KadeAki&c=apps", locationRoutes: ["location", "locatrion"], canonicalLocationRoute: "location" };
const config = { ...defaults, ...(window.KADEAKI_CONFIG || {}) };
let language = browserLanguage();

function brand() { return `<a class="brand" href="/" aria-label="KadeAki"><img class="brand-mark" src="/assets/kadeaki-mark.svg" alt="" /><img class="brand-wordmark" src="/assets/kadeaki-wordmark.svg" alt="KadeAki" /></a>`; }
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
    <section class="hero"><div class="hero-copy"><p class="eyebrow">KadeAki</p><h1>${t.hero}</h1><p>${t.heroText}</p>${appButton(t.download)}</div><div class="hero-visual"><img src="/assets/hero-stacked-boxes-brand.png" alt="" /><p class="floating-note">✓ ${t.organize}</p></div></section></div>
    <section class="section"><div class="shell"><p class="kicker">${t.howKicker}</p><h2>${t.howTitle}</h2><div class="steps">${t.steps.map(([name, text], index) => `<article class="step"><b>0${index + 1}</b><h3>${name}</h3><p>${text}</p></article>`).join("")}</div></div></section>
    <section class="section dark"><div class="shell qr-layout"><div><p class="kicker">${t.qrKicker}</p><h2>${t.qrTitle}</h2><p>${t.qrText}</p></div><div class="qr-card"><div class="storage-box"><div class="qr" aria-hidden="true"></div></div><p><span>KADEAKI</span><b>${t.box}</b></p></div></div></section>
    <section class="section"><div class="shell"><p class="kicker">${t.organize}</p><h2>${t.features[0][1]}</h2><div class="feature-grid">${t.features.map(([title, text], index) => `<article class="feature feature-${index + 1}">${featureIcon(["box", "pin", "qr", "leaf"][index])}<h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="languages"><p>${t.language}</p><div><span>Português</span><span>English</span><span>Español</span></div></div><section class="download"><h2>${t.installTitle}</h2>${appButton(t.download, "dark-button")}</section><footer>${brand()}<a class="footer-link" href="/privacy">Política de privacidade</a><span>${t.footer}</span></footer></div></section>
  </main>`;
  document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; renderLanding(); }));
}

function locationFromPath() { const parts = location.pathname.split("/").filter(Boolean); const route = parts[0]; const id = decodeURIComponent(parts[1] || ""); return { id, isLocation: config.locationRoutes.includes(route), isValid: /^[A-Za-z0-9_-]{3,64}$/.test(id) }; }
function openAppHref(id) { if (!config.androidPackage) return ""; const path = `${config.canonicalLocationRoute}/${encodeURIComponent(id)}`; return `intent://${path}#Intent;scheme=https;package=${encodeURIComponent(config.androidPackage)};end`; }
function renderLocation(context) {
  const t = content[language]; setMetadata(t); const href = context.isValid ? openAppHref(context.id) : ""; const title = context.isValid ? t.locationTitle : t.invalidTitle; const text = context.isValid ? t.locationText : t.invalidText; const note = context.isValid ? (/android/i.test(navigator.userAgent) ? t.androidNote : t.locationText) : t.invalidNote;
  document.querySelector("#app").innerHTML = `<main class="location-page"><section class="location-card ${context.isValid ? "" : "invalid"}">${brand()}<div class="location-icon">${context.isValid ? featureIcon("pin") : "!"}</div><h1>${title}</h1><p>${text}</p>${context.isValid ? `<code>/${config.canonicalLocationRoute}/${context.id}</code>` : ""}<div class="location-actions">${href ? `<a class="button" href="${href}">${t.open}</a>` : ""}${appButton(t.install, href ? "secondary" : "")}</div><small>${note}</small></section></main>`;
}

function renderPrivacy() {
  const t = { title: "Política de Privacidade — KadeAki", description: "Como o KadeAki trata os seus dados." };
  setMetadata({ ...t, locale: "pt_BR" });
  document.querySelector("#app").innerHTML = `<main class="location-page"><article class="location-card privacy-card">${brand()}<h1>Política de Privacidade</h1><p class="privacy-updated">Última atualização: 23 de setembro de 2026</p><section><h2>Dados do aplicativo</h2><p>Localizações, itens, categorias, quantidades, descrições e identificadores de QR Code são armazenados no banco local do seu dispositivo. O KadeAki não exige conta, login ou servidor próprio para funcionar.</p></section><section><h2>Fotos e reconhecimento por imagem</h2><p>Fotos escolhidas ou tiradas ficam no armazenamento privado do aplicativo. O reconhecimento por imagem usa um modelo incluído no próprio app; suas fotos não são enviadas ao KadeAki nem a um serviço de reconhecimento.</p></section><section><h2>Backup e QR Codes</h2><p>O backup só é criado quando você escolhe onde salvá-lo e contém os dados e fotos locais. Ele não é enviado a servidores. O QR Code contém apenas um identificador de localização, nunca os itens, fotos ou descrições cadastrados.</p></section><section><h2>Publicidade, pagamentos e terceiros</h2><p>O aplicativo pode exibir banners pelo Google Mobile Ads SDK e usa o Google User Messaging Platform para consentimento. Compras do Premium usam o Google Play Billing. Esses serviços podem tratar dados conforme suas próprias políticas. Itens e fotos nunca são usados para personalizar anúncios.</p></section><section><h2>Permissões</h2><p>A câmera é usada apenas quando você escolhe fotografar ou escanear um QR Code. A seleção de imagens usa o seletor de mídia do sistema. A internet serve somente às integrações opcionais de anúncios e pagamentos; o inventário funciona offline.</p></section><section><h2>Contato</h2><p>Em caso de dúvidas sobre privacidade, escreva para <a href="mailto:afmjuniors@gmail.com">afmjuniors@gmail.com</a>.</p></section></article></main>`;
}

const context = locationFromPath();
if (location.pathname === "/privacy" || location.pathname === "/privacy/") renderPrivacy();
else if (context.isLocation) renderLocation(context);
else renderLanding();
