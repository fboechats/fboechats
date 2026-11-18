# AM Med — Site institucional e catálogo

Site da AM Med (Aracaju, SE): https://ammedaju.com.br/

## Estado atual

Vitrine estática de produtos, busca e filtros, galeria, pedidos de orçamento por WhatsApp, dados básicos de SEO, consentimento para Google Analytics 4 e eventos `view_item`/`whatsapp_click`.

**Sem e-commerce, backend, pagamentos ou integração com ERP.** A decisão comercial futura permanece em aberto.

## Desenvolvimento local

- Requisito para os testes: Node.js 20+.
- Testes sem dependências: `node --test tests/site.test.mjs`
- Prévia local: `python3 -m http.server 8000 --directory public` e abrir http://localhost:8000
- Arquivos publicados ficam em `public/`; build estático atual: nenhum (`publishPath=public`).

## Fluxo de alterações

1. Criar uma branch a partir de `main` e enviar Pull Request.
2. Executar os testes automáticos e revisar diferenças, SEO, imagens, responsividade e interações.
3. Validar em uma prévia separada **sem poluir os dados GA4 de produção**.
4. Publicar apenas após aprovação: merge em `main` e deploy automático no Render.

A configuração de previews do Render e eventuais custos devem ser avaliados antes de ativá-los. Nunca conectar uma branch de desenvolvimento diretamente ao domínio oficial.

## Migração inicial

Código de origem: `fboechats/fboechats`, branch `ammed-vitrine-preview`, commit `27c8b01055d65e400d5fc76179022d78eb56de35`.
Apenas os arquivos da AM Med devem ser copiados. O README pessoal do repositório anterior não faz parte do projeto.

Até validar o novo repositório e o ambiente de prévia, **não alterar** o serviço existente no Render nem o domínio oficial.

Ver `docs/superpowers/specs/2026-11-18-ammed-repository-design.md` e `docs/superpowers/plans/2026-11-18-ammed-repository-migration.md`.
