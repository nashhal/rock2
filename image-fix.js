(() => {
  'use strict';

  const OLD_ASSET = 'https://raw.githubusercontent.com/nashhal/ROCK/main/assets/products/';
  const VERSION = '20260915-images-v2';
  const externalFallbacks = {
    'hp6030-silver': 'assets/products/hp85.webp',
    'hp6030-grey': 'assets/products/hp85.webp',
    ro0545: 'assets/products/ro0546t.webp',
    rocktag: 'assets/products/catalog-placeholder.svg',
    'barcode-6822154851697': 'assets/products/retract70.webp'
  };

  const localize = (src) => {
    const value = String(src || '');
    if (value.startsWith(OLD_ASSET)) {
      return `assets/products/${value.slice(OLD_ASSET.length)}`;
    }
    return value;
  };

  const productId = (img) => img.closest('[data-product]')?.dataset.product || '';

  function cleanVisual(visual) {
    if (!visual) return;
    [...visual.children].forEach((node) => {
      if (!node.matches('img.product-image')) node.remove();
    });
    visual.style.position = 'relative';
    visual.style.display = 'grid';
    visual.style.placeItems = 'center';
    visual.style.overflow = 'hidden';
    visual.style.background = '#fff';
  }

  function wire(img) {
    if (img.dataset.imageFix === VERSION) return;
    img.dataset.imageFix = VERSION;

    const id = productId(img);
    const current = img.getAttribute('src') || '';
    let src = externalFallbacks[id] || localize(current);
    if (src && !src.includes('?')) src += `?v=${VERSION}`;

    const visual = img.closest('.product-visual, .product-media');
    cleanVisual(visual);

    img.alt = img.alt || 'ROCK product';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.referrerPolicy = 'no-referrer';
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.objectPosition = 'center';
    img.style.background = 'transparent';
    img.style.mixBlendMode = 'normal';
    img.style.filter = 'none';
    img.style.transform = 'none';
    img.setAttribute('draggable', 'false');

    img.onerror = () => {
      if (img.dataset.fallbackUsed === '1') return;
      img.dataset.fallbackUsed = '1';
      img.src = 'assets/products/catalog-placeholder.svg';
    };

    if (src && img.src !== new URL(src, document.baseURI).href) img.src = src;
  }

  function scan(root = document) {
    root.querySelectorAll?.('img.product-image').forEach(wire);
  }

  function start() {
    scan();
    const grid = document.getElementById('productGrid');
    if (grid) {
      const observer = new MutationObserver(() => scan(grid));
      observer.observe(grid, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
