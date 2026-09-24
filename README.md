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

1. Em `dist/app-config.js`, defina o `androidPackage` oficial e a URL oficial da ficha na Google Play. Este é o arquivo público de configuração: não inclua segredos nele.
2. Substitua o conteúdo de `dist/.well-known/assetlinks.json` pelo `package_name` e fingerprint SHA-256 reais da chave de assinatura do app.
3. Configure o domínio `kadeaki.com`; a regra de reescrita necessária para `/location/*` já está declarada no `vercel.json`.

Enquanto a URL oficial da Google Play não for fornecida, os botões usam uma busca da loja por “KadeAki”, sem assumir um pacote inexistente.

## Rotas

- `/` — apresentação do aplicativo.
- `/location/{locationId}` — rota oficial e fallback da localização; o ID é validado no navegador e nunca é enviado a servidor.
- `/locatrion/{locationId}` — alias de compatibilidade para QR Codes que usem essa grafia; a página sempre monta o deep link canônico `/location/{locationId}`.
- `/.well-known/assetlinks.json` — arquivo a completar com os dados de assinatura oficiais.

## Estrutura para manutenção

- `dist/app-config.js`: package Android, Google Play e rotas de QR Code.
- `dist/js/content.js`: todos os textos em Português, English e Español.
- `dist/js/app.js`: detecção de idioma, roteamento e construção das telas.
- `dist/styles/main.css`: tokens da identidade visual e estilos responsivos.

Em Android, o próprio **Android App Link** abre o app antes da página web quando
o domínio está associado. Se a página de fallback aparecer, o botão de abertura
usa o package configurado para tentar o mesmo destino no KadeAki.
