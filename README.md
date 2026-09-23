# KadeAki Landing

Landing page estática e fallback dos links de localização do KadeAki.

## Antes de publicar em kadeaki.com

1. Em `dist/app-config.js`, defina o `androidPackage` oficial e a URL oficial da ficha na Google Play.
2. Substitua o conteúdo de `dist/.well-known/assetlinks.json` pelo `package_name` e fingerprint SHA-256 reais da chave de assinatura do app.
3. Configure o domínio `kadeaki.com` e mantenha a regra de reescrita de `/location/*` para `/index.html` (já declarada em `_redirects`).

Enquanto a URL oficial da Google Play não for fornecida, os botões usam uma busca da loja por “KadeAki”, sem assumir um pacote inexistente.

## Rotas

- `/` — apresentação do aplicativo.
- `/location/{locationId}` — fallback da localização; o ID é validado no navegador e nunca é enviado a servidor.
- `/.well-known/assetlinks.json` — arquivo a completar com os dados de assinatura oficiais.

