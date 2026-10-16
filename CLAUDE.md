# Imprima.se — Guia de manutenção para Claude e outros agentes

## Projeto e localização

Site da marca de impressão 3D Imprima.se, de propriedade do usuário.
Pasta principal de manutenção: `C:\Users\Gaah_\OneDrive\Área de Trabalho\Impressão 3D\Imprima.se - Site`.
Repositório público autorizado: https://github.com/Raiugami/imprimase-site
Endereço autorizado: https://imprimase.imaguiar.com.br/
GitHub Pages publica a branch `main`, pasta raiz. DNS na Cloudflare.

O site usa HTML, CSS, JavaScript e SVG puros. Não há build, servidor de aplicação, banco de dados ou dependências de execução. Não adicionar framework, analytics ou monitoramento sem necessidade e autorização do proprietário.

## Preferências já aprovadas pelo proprietário

- Slogan principal, com esta redação: **SEJA CRIATIVO, SEJA ÚNICO, SEJA IMPRIMA.SE!**
- Capa clara com logo vetorial centralizado e grande; sete peças se formando em camadas. Manter a composição aprovada.
- O selo preto em estrela foi removido a pedido do proprietário. Não reintroduzir.
- Demais seções: fundo escuro, tipografia editorial, contraste creme/preto, galeria em alturas alternadas, assinatura animada, processo, Instagram e slogan monumental.
- Formulário de pedido em fundo claro. As imagens de peças são ilustrações geradas por IA, identificadas como tal. Não apresentá-las como fotos de produção ou depoimentos reais.
- Exemplos personalizados usam **Rebecca**, não Ana. O logo usa curvas SVG; não o recriar por digitação nem substituir a fonte do desenho.
- Sem preços inventados, avaliações inventadas ou promessas comerciais não confirmadas. Região de atendimento ainda não foi informada; não inventar cidade.

## Contatos e pendências

Configuração central em `brand.config.js`:
- WhatsApp confirmado: `5511966360508`, exibido como (11) 96636-0508.
- Instagram confirmado: https://www.instagram.com/imprimase.3d/
- Shopee e TikTok Shop aguardam os links do proprietário. Manter `null` até recebê-los; os botões ficam ocultos. Ao receber URLs oficiais HTTPS, preencher `stores.shopee` e `stores.tiktok`.

O formulário só prepara uma mensagem para o visitante revisar e enviar no WhatsApp. Não armazena dados nem envia mensagens automaticamente. Não disparar mensagens reais durante testes.

## Mapa dos arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo, formulário, metadados de busca e compartilhamento |
| `style.css` | Base e navegação |
| `motion.css` | Entradas e microinterações |
| `hero-stage.css` | Layout da capa e da cena de impressão |
| `editorial.css` | Seções escuras, contato e ajustes responsivos |
| `printing.js` | Simulação de impressão por máscaras SVG e controles |
| `script.js` | Menu, formulário, links, assinatura e entradas ao rolar |
| `brand.config.js` | Contatos e links das lojas |
| `assets/` | Imagens WebP, logos e motion SVG, fontes e seus créditos |
| `CNAME` | Domínio personalizado do GitHub Pages |
| `robots.txt`, `sitemap.xml` | Indexação e URL canônica |

CSS carrega na ordem base → motion → capa → editorial; conferir a cascata antes de alterar regras. A fonte editorial Instrument Serif é local e sua licença está em `assets/fonts/OFL-InstrumentSerif.txt`.

## Preview e verificações

Na pasta do site: `python -m http.server 4174 --bind 127.0.0.1`, depois abrir http://127.0.0.1:4174/.
Checar sintaxe com `node --check script.js`, `node --check printing.js` e `node --check brand.config.js`.
Executar `python scripts/verificar_site.py` para checar referências locais, IDs, âncoras e metadados.

Antes de publicar alterações de interface:
1. Conferir desktop e celulares de 360 e 412 px, menu, contraste, foco e navegação por teclado.
2. Conferir impressão das sete peças, pausa/repetição e assinatura do logo. Respeitar `prefers-reduced-motion`; evitar loops pesados. A animação deve pausar fora da tela ou em aba oculta.
3. Conferir fotos sem distorção, texto Rebecca legível e ausência de rolagem horizontal da página.
4. Testar formulário e URL do WhatsApp sem enviar mensagem. Conferir contatos e links das lojas quando disponíveis.
5. Rodar Lighthouse ou auditoria equivalente; corrigir falhas críticas. Não instalar ferramentas de build no projeto só para auditar.

## Fluxo de GitHub e publicação

Manter uma Issue por melhoria/correção, uma branch própria e um Pull Request com `Closes #N`. Usar rótulos `melhoria`, `correção` ou `nova função`. Alterações de texto/documentação podem ir direto para `main`. Revisar o diff e testar antes do merge; merge em `main` publica o site. Não publicar arquivos de orçamento, credenciais, `.mcp.json`, `.env`, backups, screenshots de QA ou pastas pessoais da marca. Não usar `git add .` na pasta pai.

Repositório, nome público e domínio acima foram autorizados. Não pedir a mesma confirmação em cada deploy de uma tarefa já aprovada. Confirmar apenas novo destino, alteração de visibilidade/domínio ou ação fora do escopo. Nunca salvar tokens nos arquivos ou documentos.

Cloudflare: registro CNAME `imprimase` → `raiugami.github.io`, proxy ativado, conforme padrão do proprietário. Conferir registros existentes antes de modificar e não alterar outros subdomínios. SSL/TLS Full e redirecionamento HTTPS seguem a configuração da zona; não reduzir segurança para corrigir erros. Verificar HTTPS e redirecionamento HTTP depois da publicação. Manter `CNAME`, canonical, Open Graph e sitemap coerentes.

Após cada deploy, verificar a página publicada e o status do GitHub Pages. Documentar qualquer etapa pendente com precisão; não confundir preview local com produção.

## Arquivos da marca fora do repositório

As pastas irmãs `identidade visual`, `instagram` e `narracoes` pertencem ao proprietário. Preservá-las; não copiar todas para o GitHub. Logos e motion de divulgação estão em `identidade visual`. O repositório contém apenas os assets necessários ao site e a documentação de manutenção.
