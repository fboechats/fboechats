# Design — repositório próprio e validação antes da produção (18/11/2026)

## Objetivo

Separar o site institucional da AM Med do repositório de perfil pessoal. Permitir revisão e teste de novas páginas do catálogo sem atualizar `ammedaju.com.br` imediatamente.

## Escopo aprovado

- Repositório privado `fboechats/ammed-site`, com `main` como branch estável.
- Preservar a vitrine existente, 15 produtos, WhatsApp, consentimento de cookies, eventos GA4, canonical, robots.txt e sitemap.
- Separar código e documentação da AM Med de arquivos pessoais.
- Validar alterações via Pull Request e prévia isolada antes de integrar na `main`.
- Preservar Render e o domínio; não mexer na produção durante a preparação.
- Depois da migração, refatorar catálogo em fonte de dados única e gerar páginas estáticas automaticamente.

## Não escopo

Trocar framework, introduzir banco de dados, checkout, pagamentos, conta de clientes, Smallsoft ou gastos adicionais; criar um segundo projeto pago no Render sem aprovação.

## Abordagens consideradas

1. Continuar na branch do repositório pessoal: mínimo trabalho, separação insuficiente.
2. **Separar em repositório privado, testes de arquivos estáticos e previews por PR:** escolhido por clareza e segurança.
3. Reestruturar tudo como uma nova aplicação: custo e risco desnecessários agora.

## Fluxo-alvo

`feature/*` -> PR -> checagens automáticas -> prévia não indexável -> revisão humana -> merge em `main` -> domínio de produção.

O Render atual ainda aponta para o repositório pessoal e uma branch com deploy automático. A migração do serviço será a última etapa, após validar a cópia. A ferramenta conectada não expõe criação de repositórios nem habilitação de previews; as duas mudanças podem exigir ação manual no GitHub/Render.

## Cuidados

- Manter o domínio e os dados de Analytics intactos até o cutover.
- Validar configuração de preview para **não indexar páginas duplicadas** e **não enviar eventos para o GA4 de produção**.
- Não ligar previews de plano cobrado sem autorização de custo.
- Em falha, manter origem e branch anteriores como opção de reversão.
- Imagens externas e direitos de uso continuam sendo uma pendência independente.
