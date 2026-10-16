const brand = window.IMPRIMA_BRAND;
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  document.body.classList.add('keyboard-mode', 'intro-complete');
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('pointerdown', () => document.body.classList.remove('keyboard-mode'));
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const form = document.querySelector('#project-form');
const type = document.querySelector('#project-type');
const description = document.querySelector('#project-description');
const quantity = document.querySelector('#quantity');
const size = document.querySelector('#size');
const deadline = document.querySelector('#deadline');
const whatsappLink = document.querySelector('#send-whatsapp');
const typeLabels = {
  personalizado: 'Chaveiros e lembranças com nome',
  decoracao: 'Decoração',
  tecnico: 'Peça técnica ou protótipo',
  setup: 'Mesa e setup',
  outro: 'Uma ideia diferente'
};
function updateWhatsApp() {
  const message = [
    'Olá, Imprima.se! Quero conversar sobre um pedido personalizado.',
    '',
    'Tipo: ' + (typeLabels[type.value] || 'A definir'),
    'Ideia: ' + (description.value.trim() || 'Quero explorar uma ideia.'),
    'Quantidade: ' + (quantity.value || 'A definir'),
    'Tamanho: ' + (size.value.trim() || 'A definir'),
    'Para quando: ' + (deadline.value.trim() || 'A combinar')
  ].join('\n');
  whatsappLink.href = 'https://wa.me/' + brand.whatsapp + '?text=' + encodeURIComponent(message);
}
form.addEventListener('input', () => { description.setCustomValidity(''); updateWhatsApp(); });
form.addEventListener('change', updateWhatsApp);
function validProject() {
  description.setCustomValidity(description.value.trim() ? '' : 'Conte um pouco sobre a sua ideia.');
  return form.reportValidity();
}
whatsappLink.addEventListener('click', event => {
  updateWhatsApp();
  if (!validProject()) event.preventDefault();
});
form.addEventListener('submit', event => {
  event.preventDefault();
  updateWhatsApp();
  if (validProject()) window.open(whatsappLink.href, '_blank', 'noopener,noreferrer');
});
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  type.value = button.dataset.project;
  description.value = button.dataset.idea || '';
  description.setCustomValidity('');
  updateWhatsApp();
  document.querySelector('#orcamento').scrollIntoView({
    behavior: document.body.classList.contains('keyboard-mode') || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  });
  description.focus({preventScroll:true});
}));
updateWhatsApp();
document.querySelectorAll('[data-store-links]').forEach(container => {
  const stores = [
    ['shopee', 'Ver na Shopee'],
    ['tiktok', 'TikTok Shop']
  ];
  stores.forEach(([id,label]) => {
    const url = brand.stores[id];
    if (!url) return;
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:') return;
      const link = document.createElement('a');
      link.href = parsed.href; link.textContent = label;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      container.append(link);
    } catch { /* Invalid store links remain unpublished. */ }
  });
  container.hidden = !container.children.length;
});

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const motionItems = [...document.querySelectorAll('.reveal, .brand-footer, .category-strip')];
let motionObserver;
function revealAll() {
  motionObserver?.disconnect();
  motionItems.forEach(item => {
    item.classList.remove('will-reveal');
    item.classList.add('is-visible');
  });
}
function initializeMotion() {
  if (motionPreference.matches) {
    document.body.classList.remove('motion-ready');
    revealAll();
    return;
  }
  document.body.classList.add('motion-ready');
  if (!('IntersectionObserver' in window)) { revealAll(); return; }
  motionObserver?.disconnect();
  motionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        motionObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.08,rootMargin:'0px 0px -30px 0px'});
  motionItems.forEach(item => {
    item.classList.add('reveal');
    if (item.getBoundingClientRect().top > innerHeight-30 && !item.classList.contains('is-visible')) {
      item.classList.add('will-reveal'); motionObserver.observe(item);
    } else { item.classList.add('is-visible'); }
  });
}
document.querySelectorAll('.collection-grid, .process-grid').forEach(group => {
  [...group.children].forEach((item,index) => item.style.setProperty('--reveal-delay', index*65+'ms'));
});
document.querySelectorAll('.category-strip .wrap>span').forEach((item,index) => item.style.setProperty('--part-delay',index*45+'ms'));
document.addEventListener('focusin',event => event.target.closest('.will-reveal')?.classList.add('is-visible'));
motionPreference.addEventListener('change',initializeMotion);
initializeMotion();

const signatureImage = document.querySelector('#signature-animation');
let signatureVersion = 0;
function playSignature() {
  signatureImage.src = motionPreference.matches ? 'assets/assinatura-estatica.svg' : signatureImage.dataset.motionSrc+'?play='+(++signatureVersion);
}
document.querySelector('.signature-play').addEventListener('click',playSignature);
motionPreference.addEventListener('change',() => {
  if (motionPreference.matches) signatureImage.src = 'assets/assinatura-estatica.svg';
});
if ('IntersectionObserver' in window) {
  const signatureObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      playSignature(); signatureObserver.disconnect();
    }
  },{threshold:.4});
  signatureObserver.observe(document.querySelector('.signature-visual'));
}
