(() => {
  'use strict';

  const OLD_ASSET = 'https://raw.githubusercontent.com/nashhal/ROCK/main/assets/products/';
  const VERSION = '20260915-images-v3';
  const externalFallbacks = {
    'hp6030-silver': 'assets/products/hp85.webp',
    'hp6030-grey': 'assets/products/hp85.webp',
    ro0545: 'assets/products/ro0546t.webp',
    rocktag: 'assets/products/catalog-placeholder.svg',
    'barcode-6822154851697': 'assets/products/retract70.webp'
  };

  const localize = (src) => {
    const value = String(src || '');
    if (value.startsWith(OLD_ASSET)) return `assets/products/${value.slice(OLD_ASSET.length)}`;
    return value;
  };
  const productId = (img) => img.closest('[data-product]')?.dataset.product || '';

  function cleanVisual(visual) {
    if (!visual) return;
    [...visual.children].forEach((node) => { if (!node.matches('img.product-image')) node.remove(); });
    Object.assign(visual.style, {position:'relative',display:'grid',placeItems:'center',overflow:'hidden',background:'#fff'});
  }

  function wire(img) {
    if (img.dataset.imageFix === VERSION) return;
    img.dataset.imageFix = VERSION;
    const id = productId(img);
    let src = externalFallbacks[id] || localize(img.getAttribute('src') || '');
    if (src && !src.includes('?')) src += `?v=${VERSION}`;
    cleanVisual(img.closest('.product-visual, .product-media'));
    img.loading='lazy'; img.decoding='async'; img.referrerPolicy='no-referrer'; img.alt=img.alt||'ROCK product';
    Object.assign(img.style,{display:'block',width:'100%',height:'100%',maxWidth:'100%',maxHeight:'100%',objectFit:'contain',objectPosition:'center',background:'transparent',mixBlendMode:'normal',filter:'none',transform:'none'});
    img.setAttribute('draggable','false');
    img.onerror=()=>{ if(img.dataset.fallbackUsed==='1') return; img.dataset.fallbackUsed='1'; img.src='assets/products/catalog-placeholder.svg'; };
    if(src && img.src !== new URL(src,document.baseURI).href) img.src=src;
  }

  function scan(root=document){ root.querySelectorAll?.('img.product-image').forEach(wire); }
  function start(){
    scan();
    const grid=document.getElementById('productGrid');
    if(grid){ const observer=new MutationObserver(()=>scan(grid)); observer.observe(grid,{childList:true,subtree:true}); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
