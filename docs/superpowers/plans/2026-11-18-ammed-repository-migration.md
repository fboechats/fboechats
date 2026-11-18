# AM Med Repository Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar a vitrine atual da AM Med para um repositório próprio e garantir validação prévia sem alterar produção até aprovação.

**Architecture:** Manter o site estático em `public/`, introduzir verificação Node.js sem dependências e fluxo Pull Request. A origem do Render só será modificada depois que a cópia e a prévia funcionarem.

**Tech Stack:** HTML/CSS/JS estáticos, Node.js (testes integrados), GitHub Actions, Render Static Site.

**Spec:** `docs/superpowers/specs/2026-11-18-ammed-repository-design.md`

## Global Constraints

- Branch de origem `ammed-vitrine-preview`, SHA `27c8b01055d65e400d5fc76179022d78eb56de35`.
- Produção permanece em `https://ammedaju.com.br/`.
- Nada de gastos extras, banco, e-commerce ou mudança de domínio.
- O serviço Render existente publica automaticamente a branch antiga; não tocar nela agora.
- Proteger GA4/SEO de ambientes de prévia.

## Review Focus

- Se o HTML perder os 15 produtos, falhar teste da vitrine.
- Se canonical, sitemap ou robots apontarem para domínio errado, falhar teste de SEO.
- Se eventos `view_item` e `whatsapp_click` desaparecerem, falhar teste de analytics.
- Se banner/identificador de consentimento desaparecer, falhar teste de privacidade.
- Se mudar a origem Render antes de validar, cancelar cutover e manter produção atual.

---

### Task 1: Snapshot e checagens estáticas

**Files:** `public/index.html`, `public/robots.txt`, `public/sitemap.xml`, `public/assets/ammed-marca.jpg` (preservar); `tests/site.test.mjs`, `.github/workflows/validate.yml` (criar).

**Interfaces:** `node --test tests/site.test.mjs` retorna exit code 0 somente se os invariantes mínimos do snapshot forem atendidos.

- [x] **Step 1:** Registrar commit e conteúdo da origem, sem alterar produção.
- [x] **Step 2:** Adicionar testes que falham se os produtos, SEO, WhatsApp ou GA4 sumirem.
- [ ] **Step 3:** Executar e validar o workflow no GitHub.
- [ ] **Step 4:** Revisar os arquivos e consolidar o snapshot.

### Task 2: Criar repositório privado e copiar conteúdo

**Files:** copiar apenas `public/`, `tests/`, `.github/workflows/`, `README.md` e `docs/` preparados.

- [ ] **Step 1:** Criar `fboechats/ammed-site` privado, branch padrão `main` (ação GitHub que pode requerer interface).
- [ ] **Step 2:** Liberar acesso da integração GitHub ao novo repositório, se necessário.
- [ ] **Step 3:** Copiar arquivos da branch isolada; não copiar o README do perfil.
- [ ] **Step 4:** Verificar hashes dos arquivos `public/` e sucesso do workflow na `main`.
- [ ] **Step 5:** Criar primeira branch de feature e PR de teste; nada de merge em produção ainda.

### Task 3: Testar preview

**Files:** configurar Render sem mudar origem da produção até haver ambiente de teste funcional.

- [ ] **Step 1:** Confirmar limitações e custo dos previews no plano atual.
- [ ] **Step 2:** Configurar um preview em URL separada; bloqueio de indexação e GA4 de produção.
- [ ] **Step 3:** Validar desktop, mobile, imagens, formulários/interações, links WhatsApp e canonical.
- [ ] **Step 4:** Registrar resultado e obter aprovação para cutover.

### Task 4: Cutover controlado do Render

- [ ] **Step 1:** Registrar origem, branch e último deploy que funcionam; preparar rollback.
- [ ] **Step 2:** Alterar o serviço Render existente para o novo repositório `main`, preservando domínio e publishPath.
- [ ] **Step 3:** Verificar deploy final e https://ammedaju.com.br/ em produção.
- [ ] **Step 4:** Confirmar que branch de desenvolvimento não dispara deploy para o domínio.
- [ ] **Step 5:** Manter branch antiga como fallback até estabilidade confirmada.
