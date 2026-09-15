const IMAGE_BASE='https://raw.githubusercontent.com/nashhal/ROCK/main/assets/products/';
const img=name=>IMAGE_BASE+name;

const products=[
{id:'rkcb146',model:'RKCBL146',barcode:'850079508156',name:'ROCK Fast charging cable USB-A with Lightning connector 27W - 1.0M',cat:'Cables',price:6.25,image:null},
{id:'rkcb144',model:'RKCBL144',barcode:'850079508002',name:'ROCK Fast charging cable USB-C with Lightning connector 27W - 1.0M',cat:'Cables',price:6.25,image:img('c27l.webp')},
{id:'rkcb148',model:'RKCBL148',barcode:'850079508170',name:'ROCK Fast charging cable USB-A with USB-C connector 60W - 1.0M',cat:'Cables',price:6.25,image:img('a60c.webp')},
{id:'rkcb147',model:'RKCBL147',barcode:'850079508163',name:'ROCK Fast charging cable USB-C with USB-C connector 60W - 1.0M',cat:'Cables',price:6.25,image:img('cc60.webp')},
{id:'rkcb145',model:'RKCBL145',barcode:'850079508149',name:'ROCK Fast charging cable USB-A with Micro connector 12W - 1.0M',cat:'Cables',price:6.25,image:img('a12m.webp')},
{id:'rcb056',model:'RCB056',barcode:'6942433009752',name:'ROCK Fast charging cable USB-A with Lightning; Micro/Type-C charging support - 120cm',cat:'Cables',price:6.25,image:img('metal3in1.webp')},
{id:'rkch720',model:'RKCH720',barcode:'850079508101',name:'ROCK RKCH720 GaN20 Mini Size Family Series',cat:'Chargers',price:15,image:img('rkch720.webp')},
{id:'rkch735',model:'RKCH735',barcode:'850079508118',name:'ROCK RKCH735 GaN Mini Size Family Series',cat:'Chargers',price:20,image:img('rkch735.webp')},
{id:'rkch765',model:'RKCH765',barcode:'850079508125',name:'ROCK RKCH765 GaN Mini Size Family Series',cat:'Chargers',price:40,image:img('rkch765.webp')},
{id:'car30',model:'C43',barcode:'6942433007802',name:'ROCK H30 Car Charger with Retractable Type-C Cable',cat:'Car',price:46,image:img('car30.webp')},
{id:'sd017',model:'SD-017',barcode:'6974282124669',name:'ROCK SD-017 H16 Dual Port A+C PD72W Car Charger',cat:'Car',price:40,image:img('sd017.webp')},
{id:'nc20',model:'NC-20',barcode:'6975653086586',name:'ROCK NC-20 H0 Dual Port A+C 15W Car Charger',cat:'Car',price:12,image:img('nc20.webp')},
{id:'pods700',model:'RO-700W',barcode:'0002020070285',name:'ROCK Pods 700 Bluetooth Earphones',cat:'Audio',price:79,image:img('pods700.webp')},
{id:'eb200',model:'RAU0785',barcode:'6942433007826',name:'ROCK EB200 TWS Smart Earphones',cat:'Audio',price:59,image:img('eb200.webp')},
{id:'rau0785b',model:'RAU0785',barcode:'6942433007833',name:'ROCK EB TWS AI Smart Earphones (black)',cat:'Audio',price:59,image:img('eb200.webp')},
{id:'eb710',model:'RAU0788',barcode:'6942433007789',name:'ROCK EB710 Bluetooth Earphones',cat:'Audio',price:44,image:img('eb710.webp')},
{id:'s1',model:'RAU0790',barcode:'6942433007741',name:'ROCK S1 Smart Touch Screen TWS Earphones',cat:'Audio',price:50,image:img('s1.webp')},
{id:'a5pro',model:'RAU0782',barcode:'6942433002012',name:'ROCK A5 Pro Smart Touch Screen ANC TWS',cat:'Audio',price:65,image:img('a5pro.webp')},
{id:'ro701w',model:'RO-701W',barcode:'0020210110153',name:'ROCK Pods 701 Bluetooth Earphones (white)',cat:'Audio',price:69,image:null},
{id:'hp6030-silver',model:'HP-6030BT',barcode:'6942433007352',name:'ROCK 05 Wireless Headphones (Silver)',cat:'Audio',price:46,image:null},
{id:'hp6030-grey',model:'HP-6030BT',barcode:'6942433007345',name:'ROCK 05 Wireless Headphones (Grey)',cat:'Audio',price:46,image:null},
{id:'ro0545',model:'RO-0545',barcode:'1120200120090',name:'ROCK Wired Earphone iPhone lateral in-ear (white)',cat:'Audio',price:15,image:null},
{id:'ro0546t',model:'RO-0546T',barcode:'2509232512513',name:'ROCK RO-0546T Type-C Stereo Earphone',cat:'Audio',price:14,image:img('ro0546t.webp')},
{id:'aux139',model:'AUX-139',barcode:'850079508187',name:'ROCK AUX-139 Stereo Earphone',cat:'Audio',price:7,image:img('aux139.webp')},
{id:'y6',model:'RAU0768',barcode:'6975653083929',name:'ROCK Y6 Neckband Wireless Sports Earphone',cat:'Audio',price:39,image:img('y6.webp')},
{id:'es09',model:'RAU0791',barcode:'6942433007338',name:'ROCK ES09 Type-C Digital Wired Earphones',cat:'Audio',price:12,image:img('es09.webp')},
{id:'rph1003',model:'RPH1003',barcode:'6975653088580',name:'ROCK RPH1003 Metal Rotatable Desktop Phone Holder',cat:'Holders',price:20,image:img('rph1003.webp')},
{id:'rph0878',model:'RPH0878',barcode:'6971680474976',name:'ROCK RPH0878 Universal Adjustable Desktop Stand',cat:'Holders',price:48,image:img('rph0878.webp')},
{id:'ram0037',model:'RAM0037',barcode:'6942433001251',name:'ROCK RAM0037 Q08 Magnetic Car Mount',cat:'Holders',price:28,image:img('ram0037.webp')},
{id:'w31',model:'118A-15W',barcode:'6941402735197',name:'ROCK W31 15W Wireless Charger Car Mount',cat:'Car',price:15,image:img('w31.webp')},
{id:'pen',model:'RST10860',barcode:'6975653084131',name:'ROCK RST10860 B08 Active Magnetic Capacitance Pen',cat:'Lifestyle',price:39,image:img('pen.webp')},
{id:'laptop-bag',model:'RST10887',barcode:'6942433000049',name:'ROCK Laptop Bag',cat:'Lifestyle',price:28,image:img('laptop-bag.webp')},
{id:'trimmer',model:'RST10890',barcode:'6942433007383',name:'ROCK Trimmer Kit',cat:'Lifestyle',price:40,image:img('trimmer.webp')},
{id:'rocktag-beige',model:'ROCK Tag',barcode:'6942433005488',name:'ROCK Tag Wireless Smart Tracker (Beige)',cat:'Lifestyle',price:20,image:null},
{id:'rocktag-black',model:'ROCK Tag',barcode:'6942433006003',name:'ROCK Tag Wireless Smart Tracker (Black)',cat:'Lifestyle',price:20,image:null},
{id:'barcode-6822154851697',model:'',barcode:'6822154851697',name:'ROCK 120W Dual-Ended Cable USB + Type-C, retractable',cat:'Cables',price:13,image:null},
{id:'barcode-6815213515838',model:'',barcode:'6815213515838',name:'ROCK 68W Car Charger, 2 Type-C + USB, PD/QC',cat:'Car',price:28,image:null},
{id:'barcode-6815213515821',model:'',barcode:'6815213515821',name:'ROCK 50W GaN Wall Charger, USB + Type-C, built-in Type-C cable',cat:'Chargers',price:37,image:null},
{id:'barcode-6815213515845',model:'',barcode:'6815213515845',name:'ROCK 45W Car Charger, USB + Type-C, dual integrated cables',cat:'Car',price:36,image:null},
{id:'barcode-6815213515814',model:'',barcode:'6815213515814',name:'ROCK Wired Type-C Headphones, ergonomic ear hook, 120cm',cat:'Audio',price:19,image:null},
{id:'barcode-6658741587843',model:'',barcode:'6658741587843',name:'ROCK 45W GaN Wall Charger, Type-C PD + cut-resistant Type-C cable',cat:'Chargers',price:25,image:null}
];

(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const grid=$('#productGrid'),count=$('#cartCount'),total=$('#cartTotal'),drawer=$('#cartDrawer'),overlay=$('#overlay'),modal=$('#productModal'),searchLayer=$('#searchLayer'),filterPanel=$('.filter-panel'),menuNav=$('#mobileNav'),searchInput=$('#searchInput');
if(!grid||!count||!total||!drawer||!overlay||!modal||!searchLayer||!filterPanel||!menuNav)return;
let cart=[];try{const v=JSON.parse(localStorage.getItem('rock2-cart-final')||'[]');if(Array.isArray(v))cart=v.map(String)}catch{}
let activeCategories=[],priceRange='all',stockOnly=false,searchTerm='',sortMode='featured';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const priceText=p=>Number(p).toFixed(2).replace(/\.00$/,'');
const filtered=()=>products.filter(p=>!activeCategories.length||activeCategories.includes(p.cat)).filter(p=>priceRange==='all'||(priceRange==='0-99'?p.price<100:priceRange==='100-149'?p.price>=100&&p.price<=149:p.price>=150)).filter(p=>!stockOnly).filter(p=>!searchTerm||[p.name,p.model,p.barcode,p.cat].join(' ').toLowerCase().includes(searchTerm.toLowerCase())).sort((a,b)=>sortMode==='price-asc'?a.price-b.price:sortMode==='price-desc'?b.price-a.price:sortMode==='newest'?String(b.id).localeCompare(String(a.id)):0);
const imageHtml=p=>p.image?`<img class="product-image" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`:'<div class="product-image-missing">الصورة غير متوفرة</div>';
const render=()=>{const list=filtered();grid.innerHTML=list.map(p=>`<article class="product-card" data-product="${esc(p.id)}"><div class="product-media"><div class="product-visual">${imageHtml(p)}</div></div><div class="product-info"><h3 class="product-name">${esc(p.name)}</h3><p class="product-desc">${esc(p.model||'')}</p><div class="product-bottom"><strong class="price">${priceText(p.price)} SAR</strong><button class="add" type="button" data-add="${esc(p.id)}">أضف للسلة</button></div></div></article>`).join('');$('#resultSummary').textContent=`${list.length} منتج`;const empty=$('#emptyState');if(empty)empty.hidden=list.length>0;};
const renderFilters=()=>{const cats=[...new Set(products.map(p=>p.cat))];filterPanel.innerHTML=`<div class="filter-head"><strong>تصفية</strong><button type="button" data-action="clearFilters">مسح</button></div><fieldset><legend>الفئة</legend>${cats.map(c=>`<label><input type="checkbox" value="${esc(c)}" data-category> ${esc(c)}</label>`).join('')}</fieldset><fieldset><legend>النطاق السعري</legend><label><input type="radio" name="price" value="all" checked> كل الأسعار</label><label><input type="radio" name="price" value="0-99"> أقل من 100 SAR</label><label><input type="radio" name="price" value="100-149"> 100–149 SAR</label><label><input type="radio" name="price" value="150-999"> 150 SAR فأكثر</label></fieldset><label class="availability"><input id="stockOnly" type="checkbox"> متوفر الآن فقط</label>`};
const renderCategories=()=>{$('#categories .category-grid').innerHTML=[...new Set(products.map(p=>p.cat))].map((c,i)=>`<button class="category-card" data-filter="${esc(c)}"><span class="category-number">${String(i+1).padStart(2,'0')}</span><strong>${esc(c)}</strong><small>عرض المنتجات</small></button>`).join('')};
const sync=()=>{const a=drawer.classList.contains('open')||!modal.hidden||!searchLayer.hidden||filterPanel.classList.contains('open');overlay.hidden=!a;document.body.classList.toggle('no-scroll',a)};
const clear=()=>{activeCategories=[];priceRange='all';stockOnly=false;searchTerm='';$$('[data-category]').forEach(x=>x.checked=false);$$('input[name="price"]').forEach(x=>x.checked=x.value==='all');if($('#stockOnly'))$('#stockOnly').checked=false;searchInput.value='';render()};
const updateCart=()=>{const q=new Map();cart.forEach(id=>q.set(id,(q.get(id)||0)+1));count.textContent=String(cart.length);total.textContent=`${[...q].reduce((s,[id,n])=>{const p=products.find(x=>x.id===id);return s+(p?p.price*n:0)},0).toFixed(2).replace(/\.00$/,'')} SAR`;const target=$('#cartItems');if(target)target.innerHTML=q.size?[...q].map(([id,n])=>{const p=products.find(x=>x.id===id);return p?`<div class="cart-line"><div><strong>${esc(p.name)}</strong><small>${priceText(p.price)} SAR</small><div class="qty"><button data-qty="${esc(id)}" data-delta="-1">−</button><b>${n}</b><button data-qty="${esc(id)}" data-delta="1">+</button><button class="cart-remove" data-remove="${esc(id)}">حذف</button></div></div></div>`:''}).join(''):'<p class="empty-state">السلة فارغة حاليًا</p>';try{localStorage.setItem('rock2-cart-final',JSON.stringify(cart))}catch{}};
const openModal=id=>{const p=products.find(x=>x.id===id);if(!p)return;$('#modalContent').innerHTML=`<div class="modal-product"><div class="modal-media">${imageHtml(p)}</div><div class="modal-copy"><span class="eyebrow">${esc(p.cat)}</span><h2 id="modalTitle">${esc(p.name)}</h2>${p.model?`<p class="model-line">Model: ${esc(p.model)}</p>`:''}<p>Barcode: ${esc(p.barcode)}</p><div class="modal-price">${priceText(p.price)} SAR</div><button class="btn btn-primary" data-modal-add="${esc(p.id)}">أضف للسلة</button></div></div>`;modal.hidden=false;sync()};

document.addEventListener('click',e=>{const t=e.target instanceof Element?e.target:null;if(!t)return;const a=t.closest('[data-action]')?.dataset.action;if(a==='cart'){drawer.classList.add('open');sync();return}if(a==='closeCart'){drawer.classList.remove('open');sync();return}if(a==='search'){searchLayer.hidden=false;searchInput.value=searchTerm;requestAnimationFrame(()=>searchInput.focus());sync();return}if(a==='closeSearch'){searchLayer.hidden=true;sync();return}if(a==='filters'){filterPanel.classList.toggle('open');sync();return}if(a==='clearFilters'){clear();filterPanel.classList.remove('open');sync();return}if(a==='closeModal'){modal.hidden=true;sync();return}if(a==='checkout'){alert('صفحة الدفع ستُفعّل عند ربط بوابة الدفع');return}if(a==='menu'){const open=menuNav.hidden;menuNav.hidden=!open;t.closest('[data-action]')?.setAttribute('aria-expanded',String(open));return}const add=t.closest('[data-add]');if(add){cart.push(add.dataset.add);updateCart();drawer.classList.add('open');sync();return}const ma=t.closest('[data-modal-add]');if(ma){cart.push(ma.dataset.modalAdd);updateCart();modal.hidden=true;sync();return}const qty=t.closest('[data-qty]');if(qty){const id=qty.dataset.qty;if(Number(qty.dataset.delta)>0)cart.push(id);else{const i=cart.indexOf(id);if(i>=0)cart.splice(i,1)}updateCart();return}const rm=t.closest('[data-remove]');if(rm){cart=cart.filter(id=>id!==rm.dataset.remove);updateCart();return}const fc=t.closest('[data-filter]');if(fc){activeCategories=[fc.dataset.filter];render();document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'});return}});
document.addEventListener('change',e=>{if(!(e.target instanceof Element))return;const t=e.target;if(t.matches('[data-category]'))activeCategories=$$('[data-category]').filter(x=>x.checked).map(x=>x.value);if(t.matches('input[name="price"]'))priceRange=t.value;if(t.id==='stockOnly')stockOnly=t.checked;if(t.id==='sortSelect')sortMode=t.value;render()});
document.addEventListener('input',e=>{if(e.target===searchInput){searchTerm=searchInput.value.trim();render()}});
renderFilters();renderCategories();render();updateCart();
})();
