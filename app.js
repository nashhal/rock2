const products=[
{id:1,name:'ROCK Fast Charger 65W',cat:'Chargers',price:99,rating:4.8,badge:'BEST SELLER',stock:true,desc:'شحن سريع متعدد الاستخدامات للمنزل والمكتب.',uses:['Fast charging'],specs:{Power:'65W',Ports:'USB-C + USB-A',Type:'Fast Charger'}},
{id:2,name:'ROCK Power Bank 20K',cat:'Power Banks',price:149,rating:4.7,badge:'NEW',stock:true,desc:'طاقة إضافية بسعة عملية للأيام الطويلة.',uses:['Travel'],specs:{Capacity:'20,000mAh',Output:'20W',Type:'Power Bank'}},
{id:3,name:'ROCK Braided Cable',cat:'Cables',price:59,rating:4.6,badge:'ROCK',stock:true,desc:'كابل متين للشحن ونقل البيانات.',uses:['Fast charging','Protection'],specs:{Length:'1.5m',Connector:'USB-C',Type:'Braided Cable'}},
{id:4,name:'ROCK Wireless Audio',cat:'Audio',price:179,rating:4.7,badge:'FEATURED',stock:true,desc:'صوت واضح وتجربة مريحة للاستخدام اليومي.',uses:['Everyday'],specs:{Connection:'Bluetooth',Battery:'24h',Type:'Wireless Audio'}},
{id:5,name:'ROCK Car Charger',cat:'Car',price:89,rating:4.5,badge:'ROCK',stock:true,desc:'شحن عملي أثناء القيادة مع تصميم صغير.',uses:['Car'],specs:{Power:'30W',Ports:'Dual USB-C',Type:'Car Charger'}},
{id:6,name:'ROCK Phone Protection',cat:'Protection',price:79,rating:4.6,badge:'NEW',stock:false,desc:'حماية أنيقة مع تصميم يحافظ على سهولة الاستخدام.',uses:['Protection'],specs:{Material:'Impact Shield',Fit:'Device specific',Type:'Protection'}},
{id:7,name:'ROCK Dual Charger',cat:'Chargers',price:119,rating:4.7,badge:'ROCK',stock:true,desc:'منفذان لشحن جهازين في الوقت نفسه.',uses:['Fast charging'],specs:{Power:'40W',Ports:'2× USB-C',Type:'Wall Charger'}},
{id:8,name:'ROCK Power Bank Pro',cat:'Power Banks',price:199,rating:4.9,badge:'POPULAR',stock:true,desc:'سعة أكبر وأداء مناسب للسفر والأيام الطويلة.',uses:['Travel'],specs:{Capacity:'27,000mAh',Output:'65W',Type:'Power Bank'}}
];

function safeLoadCart(){
  try{
    const raw=localStorage.getItem('rock2-cart');
    const parsed=JSON.parse(raw||'[]');
    return Array.isArray(parsed)?parsed.map(Number).filter(Number.isFinite):[];
  }catch{return[];}
}

let cart=safeLoadCart();
let activeCategories=[];
let priceRange='all';
let stockOnly=false;
let searchTerm='';
let sortMode='featured';

const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
const grid=$('#productGrid');
const count=$('#cartCount');
const total=$('#cartTotal');
const drawer=$('#cartDrawer');
const overlay=$('#overlay');
const modal=$('#productModal');
const searchLayer=$('#searchLayer');
const filterPanel=$('.filter-panel');
const menuNav=$('#mobileNav');

const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));

function scrollToShop(){document.querySelector('#shop')?.scrollIntoView({behavior:'smooth',block:'start'});}
function persistCart(){try{localStorage.setItem('rock2-cart',JSON.stringify(cart));}catch{}}

function selectedProducts(){
  return products
    .filter(product=>!activeCategories.length||activeCategories.includes(product.cat))
    .filter(product=>{
      if(priceRange==='all') return true;
      const [min,max]=priceRange.split('-').map(Number);
      return product.price>=min&&product.price<=max;
    })
    .filter(product=>!stockOnly||product.stock)
    .filter(product=>{
      if(!searchTerm) return true;
      const haystack=[product.name,product.cat,product.desc,...product.uses].join(' ').toLowerCase();
      return haystack.includes(searchTerm.toLowerCase());
    })
    .sort((a,b)=>{
      switch(sortMode){
        case 'price-asc':return a.price-b.price;
        case 'price-desc':return b.price-a.price;
        case 'rating':return b.rating-a.rating;
        case 'newest':return b.id-a.id;
        default:return a.id-b.id;
      }
    });
}

function priceLabel(){return priceRange==='0-99'?'أقل من 100 SAR':priceRange==='100-149'?'100–149 SAR':'150 SAR فأكثر';}

function renderActiveFilters(){
  const chips=[];
  activeCategories.forEach(category=>chips.push(`<span>${esc(category)} <button type="button" data-remove-filter="${esc(category)}" aria-label="إزالة ${esc(category)}">×</button></span>`));
  if(priceRange!=='all')chips.push(`<span>${esc(priceLabel())} <button type="button" data-remove-price aria-label="إزالة فلتر السعر">×</button></span>`);
  if(stockOnly)chips.push(`<span>متوفر الآن <button type="button" data-remove-stock aria-label="إزالة فلتر التوفر">×</button></span>`);
  if(searchTerm)chips.push(`<span>بحث: ${esc(searchTerm)} <button type="button" data-clear-search aria-label="إزالة البحث">×</button></span>`);
  $('#activeFilters').innerHTML=chips.join('');
}

function renderProducts(){
  const list=selectedProducts();
  grid.innerHTML=list.map(product=>`<article class="product-card" data-product="${product.id}"><div class="product-media"><span class="badge">${esc(product.badge)}</span><div class="product-visual"><div class="mock-product" role="img" aria-label="${esc(product.name)}">ROCK</div></div></div><div class="product-info"><div><h3 class="product-name">${esc(product.name)}</h3><p class="product-desc">${esc(product.desc)}</p></div><div class="rating" aria-label="التقييم ${product.rating} من 5">★★★★★ <span>${product.rating}</span></div><div class="product-bottom"><strong class="price">${product.price} SAR</strong><button class="add" type="button" data-add="${product.id}" ${product.stock?'':'disabled'}>${product.stock?'أضف للسلة':'غير متوفر'}</button></div></div></article>`).join('');
  $('#resultSummary').textContent=`${list.length} ${list.length===1?'منتج':'منتجات'}`;
  $('#emptyState').hidden=list.length>0;
  renderActiveFilters();
}

function cartGroups(){
  const quantities=new Map();
  cart.forEach(id=>quantities.set(id,(quantities.get(id)||0)+1));
  return [...quantities.entries()].map(([id,qty])=>({product:products.find(product=>product.id===id),qty})).filter(item=>item.product);
}

function updateCart(){
  cart=cart.filter(id=>products.some(product=>product.id===id));
  const groups=cartGroups();
  count.textContent=cart.length;
  total.textContent=`${groups.reduce((sum,item)=>sum+item.product.price*item.qty,0)} SAR`;
  $('#cartItems').innerHTML=groups.length?groups.map(({product,qty})=>`<div class="cart-line"><div><strong>${esc(product.name)}</strong><small>${product.price} SAR</small><div class="qty"><button type="button" data-qty="${product.id}" data-delta="-1" aria-label="تقليل الكمية">−</button><b>${qty}</b><button type="button" data-qty="${product.id}" data-delta="1" aria-label="زيادة الكمية">+</button><button class="cart-remove" type="button" data-remove-cart="${product.id}">حذف</button></div></div><strong>${product.price*qty} SAR</strong></div>`).join(''):'<p class="empty-state">السلة فارغة حاليًا</p>';
  persistCart();
}

function showOverlay(){overlay.hidden=false;document.body.classList.add('no-scroll');}
function hideOverlayIfIdle(){
  const active=drawer.classList.contains('open')||!modal.hidden||!searchLayer.hidden||filterPanel.classList.contains('open');
  if(!active){overlay.hidden=true;document.body.classList.remove('no-scroll');}
}
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');showOverlay();}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');hideOverlayIfIdle();}
function openSearch(){searchLayer.hidden=false;$('#searchInput').value=searchTerm;showOverlay();requestAnimationFrame(()=>$('#searchInput').focus());}
function closeSearch(){searchLayer.hidden=true;hideOverlayIfIdle();}

function openModal(id){
  const product=products.find(item=>item.id===id);
  if(!product)return;
  $('#modalContent').innerHTML=`<div class="modal-product"><div class="modal-media"><div class="mock-product" role="img" aria-label="${esc(product.name)}">ROCK</div></div><div class="modal-copy"><span class="eyebrow">${esc(product.cat)}</span><h2 id="modalTitle">${esc(product.name)}</h2><div class="rating" aria-label="التقييم ${product.rating} من 5">★★★★★ <span>${product.rating}</span></div><p>${esc(product.desc)}</p><div class="modal-price">${product.price} SAR</div><div class="modal-specs">${Object.entries(product.specs).map(([key,value])=>`<div class="spec"><small>${esc(key)}</small><strong>${esc(value)}</strong></div>`).join('')}</div><button class="btn btn-primary" type="button" data-modal-add="${product.id}" ${product.stock?'':'disabled'}>${product.stock?'أضف للسلة':'غير متوفر'}</button></div></div>`;
  modal.hidden=false;
  showOverlay();
}
function closeModal(){modal.hidden=true;hideOverlayIfIdle();}
function toggleFilters(force){
  const shouldOpen=typeof force==='boolean'?force:!filterPanel.classList.contains('open');
  filterPanel.classList.toggle('open',shouldOpen);
  if(shouldOpen)showOverlay();else hideOverlayIfIdle();
}
function toast(message){
  $('.toast')?.remove();
  const element=document.createElement('div');
  element.className='toast';
  element.textContent=message;
  document.body.appendChild(element);
  setTimeout(()=>element.remove(),1800);
}
function clearFilters(){
  activeCategories=[];priceRange='all';stockOnly=false;searchTerm='';
  $$('[data-category]').forEach(input=>{input.checked=false;});
  $$('input[name="price"]').forEach(input=>{input.checked=input.value==='all';});
  $('#stockOnly').checked=false;
  $('#searchInput').value='';
  renderProducts();
}
function addToCart(id){
  const product=products.find(item=>item.id===id);
  if(!product||!product.stock)return;
  cart.push(product.id);updateCart();toast('تمت إضافة المنتج إلى السلة');openCart();
}

document.addEventListener('click',event=>{
  const target=event.target;
  const action=target.closest('[data-action]')?.dataset.action;
  if(action==='cart'){openCart();return;}
  if(action==='closeCart'){closeCart();return;}
  if(action==='search'){openSearch();return;}
  if(action==='closeSearch'){closeSearch();return;}
  if(action==='filters'){toggleFilters();return;}
  if(action==='clearFilters'){clearFilters();toggleFilters(false);return;}
  if(action==='menu'){
    const opening=menuNav.hidden;
    menuNav.hidden=!opening;
    target.setAttribute('aria-expanded',String(opening));
    return;
  }
  if(action==='closeModal'){closeModal();return;}
  if(action==='checkout'){toast('صفحة الدفع ستُفعّل في المرحلة التالية');return;}

  const add=target.closest('[data-add]');
  if(add){addToCart(Number(add.dataset.add));return;}
  const modalAdd=target.closest('[data-modal-add]');
  if(modalAdd){addToCart(Number(modalAdd.dataset.modalAdd));closeModal();return;}

  const quantityButton=target.closest('[data-qty]');
  if(quantityButton){
    const id=Number(quantityButton.dataset.qty);
    const delta=Number(quantityButton.dataset.delta);
    if(delta>0){const product=products.find(item=>item.id===id);if(product?.stock)cart.push(product.id);}
    else{const index=cart.indexOf(id);if(index>=0)cart.splice(index,1);}
    updateCart();return;
  }
  const removeButton=target.closest('[data-remove-cart]');
  if(removeButton){cart=cart.filter(id=>id!==Number(removeButton.dataset.removeCart));updateCart();return;}

  const card=target.closest('.product-card');
  if(card){openModal(Number(card.dataset.product));return;}

  const category=target.closest('[data-filter]');
  if(category){
    const filter=category.dataset.filter;
    if(filter){
      activeCategories=filter==='All'?[]:[filter];
      $$('[data-category]').forEach(input=>{input.checked=activeCategories.includes(input.value);});
      renderProducts();scrollToShop();return;
    }
  }

  const need=target.closest('[data-need]');
  if(need){
    const map={'Fast charging':'charger','Travel':'power','Protection':'protection','Car':'car'};
    activeCategories=[];searchTerm=map[need.dataset.need]||'';
    $$('[data-category]').forEach(input=>{input.checked=false;});
    renderProducts();scrollToShop();return;
  }

  const removeCategory=target.closest('[data-remove-filter]');
  if(removeCategory){activeCategories=activeCategories.filter(category=>category!==removeCategory.dataset.removeFilter);$$('[data-category]').forEach(input=>{input.checked=activeCategories.includes(input.value);});renderProducts();return;}
  if(target.closest('[data-remove-price]')){priceRange='all';$$('input[name="price"]').forEach(input=>{input.checked=input.value==='all';});renderProducts();return;}
  if(target.closest('[data-remove-stock]')){stockOnly=false;$('#stockOnly').checked=false;renderProducts();return;}
  if(target.closest('[data-clear-search]')){searchTerm='';$('#searchInput').value='';renderProducts();}
});

$$('[data-category]').forEach(input=>input.addEventListener('change',()=>{activeCategories=$$('[data-category]:checked').map(item=>item.value);renderProducts();}));
$$('input[name="price"]').forEach(input=>input.addEventListener('change',()=>{priceRange=input.value;renderProducts();}));
$('#stockOnly').addEventListener('change',event=>{stockOnly=event.target.checked;renderProducts();});
$('#sortSelect').addEventListener('change',event=>{sortMode=event.target.value;renderProducts();});
$('#searchInput').addEventListener('input',event=>{searchTerm=event.target.value.trim();renderProducts();});
$('#newsletterForm').addEventListener('submit',event=>{event.preventDefault();const button=event.currentTarget.querySelector('button');button.textContent='تم الاشتراك ✓';event.currentTarget.reset();});

overlay.addEventListener('click',()=>{closeCart();closeModal();closeSearch();toggleFilters(false);});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
    closeCart();closeModal();closeSearch();toggleFilters(false);
    if(menuNav&&!menuNav.hidden){menuNav.hidden=true;$('.menu-btn')?.setAttribute('aria-expanded','false');}
  }
});

renderProducts();
updateCart();
