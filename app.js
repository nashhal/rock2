const products = [
  {id:1,name:'ROCK Fast Charger 65W',cat:'Chargers',price:99,rating:4.8,badge:'BEST SELLER',stock:true,desc:'شحن سريع متعدد الاستخدامات للمنزل والمكتب.',uses:['Fast charging'],specs:{Power:'65W',Ports:'USB-C + USB-A',Type:'Fast Charger'}},
  {id:2,name:'ROCK Power Bank 20K',cat:'Power Banks',price:149,rating:4.7,badge:'NEW',stock:true,desc:'طاقة إضافية بسعة عملية للأيام الطويلة.',uses:['Travel'],specs:{Capacity:'20,000mAh',Output:'20W',Type:'Power Bank'}},
  {id:3,name:'ROCK Braided Cable',cat:'Cables',price:59,rating:4.6,badge:'ROCK',stock:true,desc:'كابل متين للشحن ونقل البيانات.',uses:['Fast charging','Protection'],specs:{Length:'1.5m',Connector:'USB-C',Type:'Braided Cable'}},
  {id:4,name:'ROCK Wireless Audio',cat:'Audio',price:179,rating:4.7,badge:'FEATURED',stock:true,desc:'صوت واضح وتجربة مريحة للاستخدام اليومي.',uses:['Everyday'],specs:{Connection:'Bluetooth',Battery:'24h',Type:'Wireless Audio'}},
  {id:5,name:'ROCK Car Charger',cat:'Car',price:89,rating:4.5,badge:'ROCK',stock:true,desc:'شحن عملي أثناء القيادة مع تصميم صغير.',uses:['Car'],specs:{Power:'30W',Ports:'Dual USB-C',Type:'Car Charger'}},
  {id:6,name:'ROCK Phone Protection',cat:'Protection',price:79,rating:4.6,badge:'NEW',stock:false,desc:'حماية أنيقة مع تصميم يحافظ على سهولة الاستخدام.',uses:['Protection'],specs:{Material:'Impact Shield',Fit:'Device specific',Type:'Protection'}},
  {id:7,name:'ROCK Dual Charger',cat:'Chargers',price:119,rating:4.7,badge:'ROCK',stock:true,desc:'منفذان لشحن جهازين في الوقت نفسه.',uses:['Fast charging'],specs:{Power:'40W',Ports:'2× USB-C',Type:'Wall Charger'}},
  {id:8,name:'ROCK Power Bank Pro',cat:'Power Banks',price:199,rating:4.9,badge:'POPULAR',stock:true,desc:'سعة أكبر وأداء مناسب للسفر والأيام الطويلة.',uses:['Travel'],specs:{Capacity:'27,000mAh',Output:'65W',Type:'Power Bank'}}
];

(() => {
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

  const grid = $('#productGrid');
  const count = $('#cartCount');
  const total = $('#cartTotal');
  const drawer = $('#cartDrawer');
  const overlay = $('#overlay');
  const modal = $('#productModal');
  const searchLayer = $('#searchLayer');
  const filterPanel = $('.filter-panel');
  const menuNav = $('#mobileNav');
  const searchInput = $('#searchInput');

  if (!grid || !count || !total || !drawer || !overlay || !modal || !searchLayer || !filterPanel || !menuNav) return;

  const loadCart = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem('rock2-cart-v2') || '[]');
      return Array.isArray(parsed) ? parsed.map(Number).filter(id => products.some(product => product.id === id)) : [];
    } catch {
      return [];
    }
  };

  let cart = loadCart();
  let activeCategories = [];
  let priceRange = 'all';
  let stockOnly = false;
  let searchTerm = '';
  let sortMode = 'featured';

  const persistCart = () => {
    try { localStorage.setItem('rock2-cart-v2', JSON.stringify(cart)); } catch {}
  };

  const scrollToShop = () => $('#shop')?.scrollIntoView({behavior:'smooth',block:'start'});

  const selectedProducts = () => products
    .filter(product => !activeCategories.length || activeCategories.includes(product.cat))
    .filter(product => {
      if (priceRange === 'all') return true;
      if (priceRange === '0-99') return product.price < 100;
      if (priceRange === '100-149') return product.price >= 100 && product.price <= 149;
      return product.price >= 150;
    })
    .filter(product => !stockOnly || product.stock)
    .filter(product => {
      if (!searchTerm) return true;
      const haystack = [product.name, product.cat, product.desc, ...product.uses].join(' ').toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    })
    .sort((a,b) => {
      if (sortMode === 'price-asc') return a.price - b.price;
      if (sortMode === 'price-desc') return b.price - a.price;
      if (sortMode === 'rating') return b.rating - a.rating;
      if (sortMode === 'newest') return b.id - a.id;
      return a.id - b.id;
    });

  const priceLabel = () => ({'0-99':'أقل من 100 SAR','100-149':'100–149 SAR','150-999':'150 SAR فأكثر'}[priceRange] || '');

  const renderActiveFilters = () => {
    const chips = activeCategories.map(category => `<span>${esc(category)} <button type="button" data-remove-category="${esc(category)}" aria-label="إزالة ${esc(category)}">×</button></span>`);
    if (priceRange !== 'all') chips.push(`<span>${esc(priceLabel())} <button type="button" data-remove-price aria-label="إزالة فلتر السعر">×</button></span>`);
    if (stockOnly) chips.push('<span>متوفر الآن <button type="button" data-remove-stock aria-label="إزالة فلتر التوفر">×</button></span>');
    if (searchTerm) chips.push(`<span>بحث: ${esc(searchTerm)} <button type="button" data-clear-search aria-label="إزالة البحث">×</button></span>`);
    const target = $('#activeFilters');
    if (target) target.innerHTML = chips.join('');
  };

  const renderProducts = () => {
    const list = selectedProducts();
    grid.innerHTML = list.map(product => `
      <article class="product-card" data-product="${product.id}">
        <div class="product-media"><span class="badge">${esc(product.badge)}</span><div class="product-visual"><div class="mock-product" role="img" aria-label="${esc(product.name)}">ROCK</div></div></div>
        <div class="product-info"><div><h3 class="product-name">${esc(product.name)}</h3><p class="product-desc">${esc(product.desc)}</p></div>
          <div class="rating" aria-label="التقييم ${product.rating} من 5">★★★★★ <span>${product.rating}</span></div>
          <div class="product-bottom"><strong class="price">${product.price} SAR</strong><button class="add" type="button" data-add="${product.id}" ${product.stock ? '' : 'disabled'}>${product.stock ? 'أضف للسلة' : 'غير متوفر'}</button></div>
        </div>
      </article>`).join('');
    const summary = $('#resultSummary');
    if (summary) summary.textContent = `${list.length} ${list.length === 1 ? 'منتج' : 'منتجات'}`;
    const empty = $('#emptyState');
    if (empty) empty.hidden = list.length > 0;
    renderActiveFilters();
  };

  const cartGroups = () => {
    const quantities = new Map();
    cart.forEach(id => quantities.set(id, (quantities.get(id) || 0) + 1));
    return [...quantities.entries()].map(([id, qty]) => ({product:products.find(p => p.id === id), qty})).filter(item => item.product);
  };

  const updateCart = () => {
    cart = cart.filter(id => products.some(product => product.id === id));
    const groups = cartGroups();
    count.textContent = String(cart.length);
    total.textContent = `${groups.reduce((sum,item) => sum + item.product.price * item.qty, 0)} SAR`;
    const target = $('#cartItems');
    if (target) target.innerHTML = groups.length ? groups.map(({product,qty}) => `
      <div class="cart-line"><div><strong>${esc(product.name)}</strong><small>${product.price} SAR</small>
      <div class="qty"><button type="button" data-qty="${product.id}" data-delta="-1" aria-label="تقليل الكمية">−</button><b>${qty}</b><button type="button" data-qty="${product.id}" data-delta="1" aria-label="زيادة الكمية">+</button><button class="cart-remove" type="button" data-remove-cart="${product.id}">حذف</button></div></div><strong>${product.price * qty} SAR</strong></div>`).join('') : '<p class="empty-state">السلة فارغة حاليًا</p>';
    persistCart();
  };

  const syncOverlay = () => {
    const active = drawer.classList.contains('open') || !modal.hidden || !searchLayer.hidden || filterPanel.classList.contains('open');
    overlay.hidden = !active;
    document.body.classList.toggle('no-scroll', active);
  };

  const closeAll = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
    modal.hidden = true;
    searchLayer.hidden = true;
    filterPanel.classList.remove('open');
    if (menuNav) { menuNav.hidden = true; $('.menu-btn')?.setAttribute('aria-expanded','false'); }
    syncOverlay();
  };

  const openCart = () => { drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); syncOverlay(); };
  const openSearch = () => { searchLayer.hidden = false; if (searchInput) { searchInput.value = searchTerm; requestAnimationFrame(() => searchInput.focus()); } syncOverlay(); };

  const openModal = id => {
    const product = products.find(item => item.id === id);
    if (!product) return;
    const content = $('#modalContent');
    if (!content) return;
    content.innerHTML = `<div class="modal-product"><div class="modal-media"><div class="mock-product" role="img" aria-label="${esc(product.name)}">ROCK</div></div><div class="modal-copy"><span class="eyebrow">${esc(product.cat)}</span><h2 id="modalTitle">${esc(product.name)}</h2><div class="rating" aria-label="التقييم ${product.rating} من 5">★★★★★ <span>${product.rating}</span></div><p>${esc(product.desc)}</p><div class="modal-price">${product.price} SAR</div><div class="modal-specs">${Object.entries(product.specs).map(([key,value]) => `<div class="spec"><small>${esc(key)}</small><strong>${esc(value)}</strong></div>`).join('')}</div><button class="btn btn-primary" type="button" data-modal-add="${product.id}" ${product.stock ? '' : 'disabled'}>${product.stock ? 'أضف للسلة' : 'غير متوفر'}</button></div></div>`;
    modal.hidden = false;
    syncOverlay();
  };

  const clearFilters = () => {
    activeCategories = [];
    priceRange = 'all';
    stockOnly = false;
    searchTerm = '';
    $$('[data-category]').forEach(input => input.checked = false);
    $$('input[name="price"]').forEach(input => input.checked = input.value === 'all');
    const stock = $('#stockOnly'); if (stock) stock.checked = false;
    if (searchInput) searchInput.value = '';
    renderProducts();
  };

  const addToCart = id => {
    const product = products.find(item => item.id === id);
    if (!product?.stock) return;
    cart.push(id); updateCart(); openCart();
  };

  document.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const actionEl = target.closest('[data-action]');
    const action = actionEl?.dataset.action;

    if (action === 'cart') { openCart(); return; }
    if (action === 'closeCart') { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); syncOverlay(); return; }
    if (action === 'search') { openSearch(); return; }
    if (action === 'closeSearch') { searchLayer.hidden = true; syncOverlay(); return; }
    if (action === 'filters') { filterPanel.classList.toggle('open'); syncOverlay(); return; }
    if (action === 'clearFilters') { clearFilters(); filterPanel.classList.remove('open'); syncOverlay(); return; }
    if (action === 'closeModal') { modal.hidden = true; syncOverlay(); return; }
    if (action === 'checkout') { alert('صفحة الدفع ستُفعّل عند ربط بوابة الدفع'); return; }
    if (action === 'menu') { const open = menuNav.hidden; menuNav.hidden = !open; actionEl.setAttribute('aria-expanded', String(open)); return; }

    const add = target.closest('[data-add]');
    if (add) { event.stopPropagation(); addToCart(Number(add.dataset.add)); return; }
    const modalAdd = target.closest('[data-modal-add]');
    if (modalAdd) { addToCart(Number(modalAdd.dataset.modalAdd)); modal.hidden = true; syncOverlay(); return; }
    const qty = target.closest('[data-qty]');
    if (qty) {
      const id = Number(qty.dataset.qty);
      if (Number(qty.dataset.delta) > 0) addToCart(id);
      else { const index = cart.indexOf(id); if (index >= 0) cart.splice(index,1); updateCart(); }
      return;
    }
    const remove = target.closest('[data-remove-cart]');
    if (remove) { cart = cart.filter(id => id !== Number(remove.dataset.removeCart)); updateCart(); return; }
    const removeCategory = target.closest('[data-remove-category]');
    if (removeCategory) { activeCategories = activeCategories.filter(category => category !== removeCategory.dataset.removeCategory); $$('[data-category]').forEach(input => input.checked = activeCategories.includes(input.value)); renderProducts(); return; }
    if (target.closest('[data-remove-price]')) { priceRange='all'; $$('input[name="price"]').forEach(input => input.checked=input.value==='all'); renderProducts(); return; }
    if (target.closest('[data-remove-stock]')) { stockOnly=false; const stock=$('#stockOnly'); if(stock) stock.checked=false; renderProducts(); return; }
    if (target.closest('[data-clear-search]')) { searchTerm=''; if(searchInput) searchInput.value=''; renderProducts(); return; }

    const category = target.closest('[data-filter]');
    if (category) { activeCategories = [category.dataset.filter]; $$('[data-category]').forEach(input => input.checked=activeCategories.includes(input.value)); renderProducts(); scrollToShop(); return; }
    const need = target.closest('[data-need]');
    if (need) { const terms={'Fast charging':'charger','Travel':'power','Protection':'protection','Car':'car'}; activeCategories=[]; searchTerm=terms[need.dataset.need] || ''; $$('[data-category]').forEach(input=>input.checked=false); renderProducts(); scrollToShop(); return; }
    const card = target.closest('.product-card');
    if (card) openModal(Number(card.dataset.product));
  });

  $$('[data-category]').forEach(input => input.addEventListener('change', () => { activeCategories=$$('[data-category]:checked').map(item=>item.value); renderProducts(); }));
  $$('input[name="price"]').forEach(input => input.addEventListener('change', () => { priceRange=input.value; renderProducts(); }));
  $('#stockOnly')?.addEventListener('change', event => { stockOnly=event.target.checked; renderProducts(); });
  $('#sortSelect')?.addEventListener('change', event => { sortMode=event.target.value; renderProducts(); });
  searchInput?.addEventListener('input', event => { searchTerm=event.target.value.trim(); renderProducts(); });
  $('#newsletterForm')?.addEventListener('submit', event => { event.preventDefault(); const button=event.currentTarget.querySelector('button'); if(button) button.textContent='تم الاشتراك ✓'; event.currentTarget.reset(); });
  overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', event => { if(event.key === 'Escape') closeAll(); });

  renderProducts();
  updateCart();
})();
