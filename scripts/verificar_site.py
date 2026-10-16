"""Auditoria estática básica, sem dependências: python scripts/verificar_site.py."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.assets, self.anchors, self.images = [], [], [], []
        self.tags = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if 'id' in a:
            self.ids.append(a['id'])
        if tag == 'img':
            self.images.append(a)
        for key in ('src', 'href'):
            value = a.get(key, '')
            if value.startswith('#'):
                self.anchors.append(value[1:])
            elif value and not urlsplit(value).scheme:
                self.assets.append(urlsplit(value).path)

page = Page()
html = (ROOT / 'index.html').read_text(encoding='utf-8')
page.feed(html)
assert len(page.ids) == len(set(page.ids)), 'IDs repetidos'
assert all((ROOT / name).is_file() for name in page.assets), 'Arquivo inexistente'
assert all(a in page.ids for a in page.anchors), 'Âncora inexistente'
assert all('alt' in a for a in page.images), 'Imagem sem alt'
assert all('width' in a and 'height' in a for a in page.images), 'Imagem sem dimensões'
assert len([a for tag, a in page.tags if tag == 'h1']) == 1, 'Conferir H1'
assert any(tag == 'html' and a.get('lang') == 'pt-BR' for tag, a in page.tags)
assert any(tag == 'meta' and a.get('name') == 'description' for tag, a in page.tags)
assert any(tag == 'link' and a.get('rel') == 'canonical' and a.get('href') == 'https://imprimase.imaguiar.com.br/' for tag, a in page.tags)
assert (ROOT / 'CNAME').read_text().strip() == 'imprimase.imaguiar.com.br'
assert 'creation-stamp' not in html
assert 'Rebecca' in html
assert 'SEJA CRIATIVO, SEJA ÚNICO, SEJA IMPRIMA.SE!' in html
assert all((ROOT / f).stat().st_size < 500_000 for f in page.assets), 'Revisar asset pesado'
print(f'OK: {len(page.assets)} assets locais, {len(page.anchors)} âncoras, {len(page.images)} imagens com alt/dimensões, IDs únicos, H1, idioma e SEO.')
print('Complementar com teste visual em 360/412 px, teclado, movimento e formulário no navegador.')
