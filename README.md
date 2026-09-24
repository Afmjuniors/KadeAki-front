# KadeAki Landing

Landing page estática e fallback dos links de localização do KadeAki.

## Publicação no Vercel

O repositório está preparado para importação direta no Vercel. Selecione o
framework **Other** e mantenha a configuração detectada no `vercel.json`:

- sem comando de build;
- diretório de saída: `dist`;
- reescrita de `/location/{locationId}` para a página de fallback.

Conecte a branch `main` ao projeto Vercel para que cada merge gere uma nova
implantação.

## Antes de publicar em kadeaki.com

1. Em `dist/app-config.js`, defina o `androidPackage` oficial e a URL oficial da ficha na Google Play.
2. Substitua o conteúdo de `dist/.well-known/assetlinks.json` pelo `package_name` e fingerprint SHA-256 reais da chave de assinatura do app.
3. Configure o domínio `kadeaki.com`; a regra de reescrita necessária para `/location/*` já está declarada no `vercel.json`.

Enquanto a URL oficial da Google Play não for fornecida, os botões usam uma busca da loja por “KadeAki”, sem assumir um pacote inexistente.

## Rotas

- `/` — apresentação do aplicativo.
- `/location/{locationId}` — fallback da localização; o ID é validado no navegador e nunca é enviado a servidor.
- `/.well-known/assetlinks.json` — arquivo a completar com os dados de assinatura oficiais.
