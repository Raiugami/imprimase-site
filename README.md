# Imprima.se — Landing Page

Site da marca de impressão 3D. Cliente: Imprima.se.
Site: https://imprimase.imaguiar.com.br/ · GitHub Pages: https://raiugami.github.io/imprimase-site/
Repositório: https://github.com/Raiugami/imprimase-site
Slogan principal confirmado: **SEJA CRIATIVO, SEJA ÚNICO, SEJA IMPRIMA.SE!**

## Abrir

Execute `python -m http.server 4174 --bind 127.0.0.1` nesta pasta e abra http://127.0.0.1:4174.

## Experiência

A capa mantém o logotipo centralizado e sete peças se formando em camadas, com pausa e repetição. O selo em estrela foi retirado. A sequência termina, pausa quando está fora de vista e respeita a preferência por movimento reduzido.

Abaixo da capa: assinatura animada, coleção de quatro categorias em alturas alternadas, processo, Instagram, encerramento com o slogan e pedido personalizado. Os exemplos com nome usam Rebecca.

O formulário e os botões das coleções montam uma mensagem para o WhatsApp. O visitante revisa e envia no aplicativo; o site não faz envio automático nem armazena os dados do formulário.

## Contatos confirmados

- WhatsApp: (11) 96636-0508 — https://wa.me/5511966360508
- Instagram: @imprimase.3d — https://www.instagram.com/imprimase.3d/
- Shopee e TikTok Shop: aguardam os links do proprietário. Configuração em brand.config.js; os links só aparecem após o preenchimento.

## Arquivos

- index.html: conteúdo e estrutura.
- style.css: base do layout.
- motion.css: entradas e microinterações.
- hero-stage.css e printing.js: capa e impressão das peças.
- editorial.css: parte editorial e responsividade.
- brand.config.js: contatos e lojas.
- script.js: navegação, assinatura, entradas e mensagem do pedido.
- assets/: imagens WebP, SVGs vetoriais, fontes e prompts.
- scripts/verificar_site.py: verificações estáticas sem dependências.
- CLAUDE.md e AGENTS.md: instruções de manutenção para agentes.
- CNAME, robots.txt e sitemap.xml: domínio e indexação.

HTML, CSS, SVG e JavaScript puros, sem build ou bibliotecas externas no navegador.

## Imagens e fontes

As peças são estudos ilustrativos gerados por IA; não constituem portfólio de produção. O arquivo final dos chaveiros é assets/chaveiros-rebecca.webp. O prompt de geração e edição está em assets/prompt-chaveiros-rebecca.txt.

Os logos preservam o desenho vetorial do kit da marca. Títulos editoriais usam Instrument Serif, servida localmente; o logo e a capa mantêm sua tipografia. Fonte obtida do [repositório oficial do Google Fonts](https://github.com/google/fonts/tree/main/ofl/instrumentserif), com licença incluída em assets/fonts/OFL-InstrumentSerif.txt.

## Verificação

JavaScript validado com node --check. Verificados arquivos locais, âncoras e IDs únicos. No navegador: assinatura completa/repetição, galeria, botões de categoria, preenchimento do formulário e URL do WhatsApp com nome Rebecca, quantidade, tamanho e prazo. Nenhuma mensagem de teste foi enviada. Sem transbordamento horizontal em 360 e 412 px. A preferência por movimento reduzido é tratada em CSS/JS; sua emulação não está disponível na ferramenta de navegador utilizada.

## Publicação

GitHub Pages, branch main, pasta raiz, com domínio personalizado e DNS na Cloudflare. Nome imprimase-site, visibilidade pública e endereço imprimase.imaguiar.com.br autorizados pelo proprietário. Consulte CLAUDE.md para manutenção, preferências aprovadas e fluxo de Issue/branch/PR.

Pasta principal: `C:\Users\Gaah_\OneDrive\Área de Trabalho\Impressão 3D\Imprima.se - Site`. O kit de identidade visual fica na pasta irmã `identidade visual` e não faz parte deste repositório. Links da Shopee/TikTok Shop e região de atendimento aguardam informação do proprietário.
