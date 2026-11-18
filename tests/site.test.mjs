import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const file = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = file('public/index.html');

test('publica a vitrine com os 15 produtos do snapshot', () => {
  assert.match(html, /<title>AM Med \|/);
  assert.equal((html.match(/<article class="product-card"(?:\s|>)/g) ?? []).length, 15);
});

test('preserva canonical, robots e sitemap do domínio oficial', () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/ammedaju\.com\.br\/"/);
  assert.doesNotMatch(html, /<meta name="robots" content="noindex/);
  assert.match(file('public/robots.txt'), /Sitemap: https:\/\/ammedaju\.com\.br\/sitemap\.xml/);
  assert.match(file('public/sitemap.xml'), /<loc>https:\/\/ammedaju\.com\.br\/<\/loc>/);
});

test('mantém o fluxo de orçamento WhatsApp', () => {
  assert.match(html, /WHATSAPP_NUMBER='5579999672277'/);
  assert.match(html, /https:\/\/wa\.me\//);
  assert.match(html, /'whatsapp_click'/);
});

test('mantém GA4 com consentimento e visualização de itens', () => {
  assert.match(html, /G-HSW32LGR9K/);
  assert.match(html, /ammed_analytics_consent_v1/);
  assert.match(html, /'view_item'/);
  assert.match(html, /analyticsAllowed/);
});

test('mantém a identidade da loja', () => {
  assert.ok(existsSync(new URL('../public/assets/ammed-marca.jpg', import.meta.url)));
});
