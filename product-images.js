(() => {
  const ASSET_BASE = 'https://nashhal.github.io/ROCK/assets/products/';
  const imageByProduct = {
    'ROCK Fast Charger 65W': 'rkch765.webp',
    'ROCK Power Bank 20K': 'a5pro.webp',
    'ROCK Braided Cable': 'c27l.webp',
    'ROCK Wireless Audio': 'eb200.webp',
    'ROCK Car Charger': 'car30.webp',
    'ROCK Phone Protection': 'a12l.webp',
    'ROCK Dual Charger': 'cc60.webp',
    'ROCK Power Bank Pro': 'a60c.webp'
  };

  const css = document.createElement('style');
  css.textContent = `
    .product-media,.modal-media{overflow:hidden}
    .product-visual{width:100%;height:100%;min-height:0}
    .product-visual .product-real-image{display:block;width:100%;height:100%;object-fit:contain;object-position:center;mix-blend-mode:normal}
    .modal-media .product-real-image{display:block;width:88%;height:88%;object-fit:contain;object-position:center;mix-blend-mode:normal}
    .product-media .product-real-image{filter:none}
    .product-media .mock-product,.modal-media .mock-product{display:none!important}
    @media(max-width:760px){.product-media .product-real-image{width:96%;height:96%}}
  `;
  document.head.appendChild(css);

  const imageForName = name => imageByProduct[name] ? ASSET_BASE + imageByProduct[name] : null;

  const hydrate = root => {
    (root || document).querySelectorAll('.mock-product').forEach(node => {
      const name = node.getAttribute('aria-label');
      const src = imageForName(name);
      if (!src || node.dataset.imageHydrated === '1') return;
      const img = document.createElement('img');
      img.className = 'product-real-image';
      img.src = src;
      img.alt = name || 'ROCK product';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.referrerPolicy = 'no-referrer';
      img.addEventListener('error', () => {
        img.remove();
        node.dataset.imageHydrated = '0';
      }, {once:true});
      node.dataset.imageHydrated = '1';
      node.parentNode.insertBefore(img, node);
    });
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1) hydrate(node);
    }));
  });

  observer.observe(document.body, {childList:true, subtree:true});
  hydrate(document);
})();
