import { browserLanguage, content } from "./content.js";

const defaults = { androidPackage: "", playStoreUrl: "https://play.google.com/store/search?q=KadeAki&c=apps", locationRoutes: ["location", "locatrion"], canonicalLocationRoute: "location" };
const config = { ...defaults, ...(window.KADEAKI_CONFIG || {}) };
let language = browserLanguage();
const privacyContent = {
  pt: {
    locale: "pt_BR", title: "Política de Privacidade — KadeAki", description: "Como o KadeAki trata os seus dados.", link: "Política de privacidade", updated: "Última atualização: 23 de setembro de 2026",
    sections: [
      ["Dados do aplicativo", "Localizações, itens, categorias, quantidades, descrições e identificadores de QR Code são armazenados no banco local do seu dispositivo. O KadeAki não exige conta, login ou servidor próprio para funcionar."],
      ["Fotos e reconhecimento por imagem", "Fotos escolhidas ou tiradas ficam no armazenamento privado do aplicativo. O reconhecimento por imagem usa um modelo incluído no próprio app; suas fotos não são enviadas ao KadeAki nem a um serviço de reconhecimento."],
      ["Backup e QR Codes", "O backup só é criado quando você escolhe onde salvá-lo e contém os dados e fotos locais. Ele não é enviado a servidores. O QR Code contém apenas um identificador de localização, nunca os itens, fotos ou descrições cadastrados."],
      ["Publicidade, pagamentos e terceiros", "O aplicativo pode exibir banners pelo Google Mobile Ads SDK e usa o Google User Messaging Platform para consentimento. Compras do Premium usam o Google Play Billing. Esses serviços podem tratar dados conforme suas próprias políticas. Itens e fotos nunca são usados para personalizar anúncios."],
      ["Permissões", "A câmera é usada apenas quando você escolhe fotografar ou escanear um QR Code. A seleção de imagens usa o seletor de mídia do sistema. A internet serve somente às integrações opcionais de anúncios e pagamentos; o inventário funciona offline."],
      ["Contato", "Em caso de dúvidas sobre privacidade, escreva para"],
    ],
  },
  en: {
    locale: "en_US", title: "Privacy Policy — KadeAki", description: "How KadeAki handles your data.", link: "Privacy policy", updated: "Last updated: September 23, 2026",
    sections: [
      ["App data", "Locations, items, categories, quantities, descriptions and QR code identifiers are stored in your device's local database. KadeAki does not require an account, sign-in or its own server to work."],
      ["Photos and image recognition", "Photos selected or taken are kept in the app's private storage. Image recognition uses a model included in the app; your photos are not sent to KadeAki or to a recognition service."],
      ["Backups and QR codes", "A backup is created only when you choose where to save it and contains local data and photos. It is not sent to servers. A QR code contains only a location identifier, never registered items, photos or descriptions."],
      ["Advertising, payments and third parties", "The app may show banner ads through the Google Mobile Ads SDK and uses the Google User Messaging Platform for consent. Premium purchases use Google Play Billing. These Google services may process data according to their own policies. Items and photos are never used to personalize ads."],
      ["Permissions", "The camera is used only when you choose to take a photo or scan a QR code. Photo selection uses the system media picker. Internet access is only for optional advertising and payment integrations; inventory works offline."],
      ["Contact", "For privacy questions, email"],
    ],
  },
  es: {
    locale: "es_ES", title: "Política de Privacidad — KadeAki", description: "Cómo KadeAki trata sus datos.", link: "Política de privacidad", updated: "Última actualización: 23 de septiembre de 2026",
    sections: [
      ["Datos de la aplicación", "Las ubicaciones, artículos, categorías, cantidades, descripciones e identificadores de códigos QR se almacenan en la base de datos local de su dispositivo. KadeAki no requiere cuenta, inicio de sesión ni servidor propio para funcionar."],
      ["Fotos y reconocimiento de imágenes", "Las fotos seleccionadas o tomadas se conservan en el almacenamiento privado de la aplicación. El reconocimiento de imágenes usa un modelo incluido en la app; sus fotos no se envían a KadeAki ni a un servicio de reconocimiento."],
      ["Copias de seguridad y códigos QR", "Una copia de seguridad se crea solo cuando usted elige dónde guardarla e incluye los datos y fotos locales. No se envía a servidores. Un código QR contiene solo un identificador de ubicación, nunca artículos, fotos o descripciones registrados."],
      ["Publicidad, pagos y terceros", "La aplicación puede mostrar anuncios de banner mediante Google Mobile Ads SDK y usa Google User Messaging Platform para el consentimiento. Las compras Premium usan Google Play Billing. Estos servicios de Google pueden procesar datos de acuerdo con sus propias políticas. Los artículos y las fotos nunca se usan para personalizar anuncios."],
      ["Permisos", "La cámara se usa solo cuando elige tomar una foto o escanear un código QR. La selección de fotos usa el selector multimedia del sistema. Internet se usa únicamente para integraciones opcionales de publicidad y pagos; el inventario funciona sin conexión."],
      ["Contacto", "Para consultas sobre privacidad, escriba a"],
    ],
  },
};

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
function bindLanguageSwitch(render) { document.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => { language = button.dataset.language; render(); })); }

function renderLanding() {
  const t = content[language]; setMetadata(t);
  document.querySelector("#app").innerHTML = `<main>
    <div class="shell"><nav class="nav">${brand()}${languageSwitch()}</nav>
    <section class="hero"><div class="hero-copy"><p class="eyebrow">KadeAki</p><h1>${t.hero}</h1><p>${t.heroText}</p>${appButton(t.download)}</div><div class="hero-visual"><img src="/assets/hero-stacked-boxes-brand.png" alt="" /><p class="floating-note">✓ ${t.organize}</p></div></section></div>
    <section class="section"><div class="shell"><p class="kicker">${t.howKicker}</p><h2>${t.howTitle}</h2><div class="steps">${t.steps.map(([name, text], index) => `<article class="step"><b>0${index + 1}</b><h3>${name}</h3><p>${text}</p></article>`).join("")}</div></div></section>
    <section class="section dark"><div class="shell qr-layout"><div><p class="kicker">${t.qrKicker}</p><h2>${t.qrTitle}</h2><p>${t.qrText}</p></div><div class="qr-card"><div class="storage-box"><div class="qr" aria-hidden="true"></div></div><p><span>KADEAKI</span><b>${t.box}</b></p></div></div></section>
    <section class="section"><div class="shell"><p class="kicker">${t.organize}</p><h2>${t.features[0][1]}</h2><div class="feature-grid">${t.features.map(([title, text], index) => `<article class="feature feature-${index + 1}">${featureIcon(["box", "pin", "qr", "leaf"][index])}<h3>${title}</h3><p>${text}</p></article>`).join("")}</div><div class="languages"><p>${t.language}</p><div><span>Português</span><span>English</span><span>Español</span></div></div><section class="download"><h2>${t.installTitle}</h2>${appButton(t.download, "dark-button")}</section><footer>${brand()}<a class="footer-link" href="/privacy">${privacyContent[language].link}</a><span>${t.footer}</span></footer></div></section>
  </main>`;
  bindLanguageSwitch(renderLanding);
}

function locationFromPath() { const parts = location.pathname.split("/").filter(Boolean); const route = parts[0]; const id = decodeURIComponent(parts[1] || ""); return { id, isLocation: config.locationRoutes.includes(route), isValid: /^[A-Za-z0-9_-]{3,64}$/.test(id) }; }
function openAppHref(id) { if (!config.androidPackage) return ""; const path = `${config.canonicalLocationRoute}/${encodeURIComponent(id)}`; return `intent://${path}#Intent;scheme=https;package=${encodeURIComponent(config.androidPackage)};end`; }
function renderLocation(context) {
  const t = content[language]; setMetadata(t); const href = context.isValid ? openAppHref(context.id) : ""; const title = context.isValid ? t.locationTitle : t.invalidTitle; const text = context.isValid ? t.locationText : t.invalidText; const note = context.isValid ? (/android/i.test(navigator.userAgent) ? t.androidNote : t.locationText) : t.invalidNote;
  document.querySelector("#app").innerHTML = `<main class="location-page"><section class="location-card ${context.isValid ? "" : "invalid"}">${brand()}<div class="location-icon">${context.isValid ? featureIcon("pin") : "!"}</div><h1>${title}</h1><p>${text}</p>${context.isValid ? `<code>/${config.canonicalLocationRoute}/${context.id}</code>` : ""}<div class="location-actions">${href ? `<a class="button" href="${href}">${t.open}</a>` : ""}${appButton(t.install, href ? "secondary" : "")}</div><small>${note}</small></section></main>`;
}

function renderPrivacy() {
  const t = privacyContent[language] || privacyContent.pt;
  setMetadata(t);
  document.querySelector("#app").innerHTML = `<main class="location-page"><article class="location-card privacy-card"><nav class="privacy-nav">${brand()}${languageSwitch()}</nav><h1>${t.title.split(" — ")[0]}</h1><p class="privacy-updated">${t.updated}</p>${t.sections.map(([heading, body]) => `<section><h2>${heading}</h2><p>${body}${heading === t.sections[t.sections.length - 1][0] ? ` <a href="mailto:afmjuniors@gmail.com">afmjuniors@gmail.com</a>.` : ""}</p></section>`).join("")}</article></main>`;
  bindLanguageSwitch(renderPrivacy);
}

const context = locationFromPath();
if (location.pathname === "/privacy" || location.pathname === "/privacy/") renderPrivacy();
else if (context.isLocation) renderLocation(context);
else renderLanding();
