/*
 * Configuração pública de publicação.
 *
 * Este é o único arquivo que precisa ser alterado quando a ficha Android,
 * os caminhos de QR Code ou a página na Google Play mudarem. Não inclua
 * senhas, tokens ou qualquer segredo aqui — este arquivo é entregue ao navegador.
 */
window.KADEAKI_CONFIG = {
  // Ex.: "com.suaempresa.kadeaki". Necessário para o botão "Abrir no app".
  androidPackage: "",

  // Substitua pela ficha oficial quando ela estiver publicada.
  playStoreUrl: "https://play.google.com/store/search?q=KadeAki&c=apps",

  // "location" é a rota oficial. "locatrion" é mantida como alias seguro
  // para QR Codes que tenham sido impressos com essa grafia.
  locationRoutes: ["location", "locatrion"],
  canonicalLocationRoute: "location"
};
