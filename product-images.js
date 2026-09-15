/* Final product-media normalization. Images are rendered directly by app.js. */
(() => {
  if (Array.isArray(window.products)) window.products.forEach(p => { p.stock = true; });
  const style=document.createElement('style');
  style.textContent=`
    .product-media,.modal-media{overflow:hidden}
    .product-visual{width:100%!important;height:100%!important;min-width:0;min-height:0;display:grid!important;place-items:center!important}
    .product-image{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;object-position:center!important;mix-blend-mode:normal!important;filter:none!important}
    .product-image-missing{display:grid!important;place-items:center!important}
    .mock-product{display:none!important}
  `;
  document.head.appendChild(style);
})();
