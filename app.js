const products=[
  {id:1,name:'ROCK Fast Charger',cat:'Chargers',price:99,desc:'شحن سريع للاستخدام اليومي',badge:'BEST SELLER'},
  {id:2,name:'ROCK Power Bank',cat:'Power Banks',price:149,desc:'طاقة إضافية بحجم عملي',badge:'NEW'},
  {id:3,name:'ROCK Braided Cable',cat:'Cables',price:59,desc:'كابل متين للاتصال والشحن',badge:'ROCK'},
  {id:4,name:'ROCK Wireless Audio',cat:'Audio',price:179,desc:'صوت واضح في كل يوم',badge:'FEATURED'},
  {id:5,name:'ROCK Car Charger',cat:'Car',price:89,desc:'شحن عملي أثناء القيادة',badge:'ROCK'},
  {id:6,name:'ROCK Phone Protection',cat:'Protection',price:79,desc:'حماية أنيقة لهاتفك',badge:'NEW'},
  {id:7,name:'ROCK Dual Charger',cat:'Chargers',price:119,desc:'منفذان في شاحن واحد',badge:'ROCK'},
  {id:8,name:'ROCK Power Bank Pro',cat:'Power Banks',price:199,desc:'سعة أكبر للأيام الطويلة',badge:'POPULAR'}
];
let cart=[];
const grid=document.getElementById('productGrid');
const count=document.getElementById('cartCount');
const total=document.getElementById('cartTotal');
const drawer=document.getElementById('cartDrawer');
const overlay=document.getElementById('overlay');
function renderProducts(filter='All'){
  const list=filter==='All'?products:products.filter(p=>p.cat===filter);
  grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-media"><div class="mock-product" aria-label="${p.name}"></div></div><div class="product-info"><div class="product-top"><div><h3 class="product-name">${p.name}</h3><p class="product-desc">${p.desc}</p></div><span class="badge">${p.badge}</span></div><div class="product-bottom"><strong class="price">${p.price} SAR</strong><button class="add" data-add="${p.id}">أضف للسلة</button></div></div></article>`).join('');
}
function updateCart(){
  count.textContent=cart.length;
  total.textContent=`${cart.reduce((s,p)=>s+p.price,0)} SAR`;
  const area=document.getElementById('cartItems');
  area.innerHTML=cart.length?cart.map((p,i)=>`<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 0;border-bottom:1px solid #e5e7eb"><div><strong>${p.name}</strong><div style="color:#6b7280;font-size:12px">${p.price} SAR</div></div><button class="close-btn" data-remove="${i}" aria-label="Remove">×</button></div>`).join(''):'<p class="empty-state">السلة فارغة حاليًا</p>';
}
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');overlay.hidden=false;document.body.style.overflow='hidden'}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');overlay.hidden=true;document.body.style.overflow=''}

document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){const p=products.find(x=>x.id===Number(add.dataset.add));if(p){cart.push(p);updateCart();openCart()}}
  const remove=e.target.closest('[data-remove]');
  if(remove){cart.splice(Number(remove.dataset.remove),1);updateCart()}
  const filter=e.target.closest('[data-filter]');
  if(filter){renderProducts(filter.dataset.filter);document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===filter));}
  if(e.target.matches('[data-action="cart"]'))openCart();
  if(e.target.matches('[data-action="closeCart"]')||e.target===overlay)closeCart();
});

document.querySelector('[data-action="menu"]').addEventListener('click',()=>{
  const nav=document.querySelector('.desktop-nav');
  nav.style.display=nav.style.display==='flex'?'none':'flex';
  nav.style.position='absolute';nav.style.top='68px';nav.style.insetInline='14px';nav.style.padding='18px';nav.style.background='#fff';nav.style.border='1px solid #e5e7eb';nav.style.borderRadius='18px';nav.style.flexDirection='column';nav.style.alignItems='stretch';nav.style.boxShadow='0 20px 50px rgba(15,23,42,.12)';
});

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderProducts(btn.dataset.filter)}));
document.querySelector('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.querySelector('button').textContent='تم الاشتراك ✓'});
renderProducts();updateCart();
