/* Componente raiz del sitio. Vivia como <script type="text/babel"> dentro de
   index.html; se movio a su propio archivo para que scripts/build-js.js lo
   compile junto con el resto y el navegador ya no necesite un compilador. */
function Site(){
  const modoCaptura=new URLSearchParams(location.search).get('canal')==='whatsapp';
  const canal=modoCaptura?'WhatsApp':'Web';
  const [lines,setLines]=React.useState([]);
  // El folio del ultimo pedido se guarda en este navegador para que el cliente
  // pueda seguir su pizza aunque cierre la pestaña.
  const FOLIO_KEY='mextizza.web.folio';
  const [folio,setFolio]=React.useState(()=>{ try{return localStorage.getItem(FOLIO_KEY)||null;}catch(e){return null;} });
  React.useEffect(()=>{ try{ folio?localStorage.setItem(FOLIO_KEY,folio):localStorage.removeItem(FOLIO_KEY); }catch(e){} },[folio]);
  const [open,setOpen]=React.useState(false);
  const [step,setStep]=React.useState('cart');
  const [added,setAdded]=React.useState(null);
  const [view,setView]=React.useState('home');
  const [custom,setCustom]=React.useState(null);
  const add=(it,q=1,extra={},mantenerPaso=false)=>{
    const key=it.id+(extra.addonNames&&extra.addonNames.length?':'+extra.addonNames.join('|'):'');
    setLines(ls=>{const e=ls.find(l=>l.key===key);return e?ls.map(l=>l.key===key?{...l,qty:l.qty+q}:l):[...ls,{...it,...extra,key,qty:q}];});
    setAdded(it.id); setTimeout(()=>setAdded(null),900);
    // Agregar desde el menu lleva al carrito; agregar el premio desde el
    // checkout no, o sacaria al cliente de la pantalla donde va a pagar.
    if(!mantenerPaso) setStep('cart');
    setCustom(null);
  };
  const qty=(key,n)=>setLines(ls=>n<=0?ls.filter(l=>l.key!==key):ls.map(l=>l.key===key?{...l,qty:n}:l));
  /* La altura del encabezado se mide, no se supone. Estaba fija en 90 px, que ya
     fallaba en movil —ahi mide 72— y habria fallado mas al anclarle la cinta de
     promocion, que lo hace crecer: la seccion aterrizaba tapada. */
  const altoEncabezado=()=>{
    const h=document.querySelector('header');
    return h?Math.round(h.getBoundingClientRect().height):90;
  };
  const nav=(k)=>{setView(k);const el=document.getElementById(k);
    window.scrollTo({top:el?Math.max(0,el.offsetTop-altoEncabezado()-8):0,behavior:'smooth'});};

  /* El navegador necesita saberlo tambien: sin scroll-padding, al saltar a un
     ancla o al llegar con Tab a un control cerca del borde, el encabezado pegado
     lo tapa. Se remide cuando el encabezado cambia de tamaño. */
  React.useEffect(()=>{
    const h=document.querySelector('header');
    if(!h) return;
    const aplicar=()=>{ document.documentElement.style.scrollPaddingTop=(altoEncabezado()+8)+'px'; };
    aplicar();
    if(typeof ResizeObserver!=='function') return;
    const ro=new ResizeObserver(aplicar);
    ro.observe(h);
    return ()=>ro.disconnect();
  },[]);
  const count=lines.reduce((s,l)=>s+l.qty,0);
  React.useEffect(()=>{
    const els=document.querySelectorAll('.reveal');
    if(!els.length) return;
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    },{threshold:0.15,rootMargin:'0px 0px -60px 0px'});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
  return <>
    {modoCaptura && <div style={{background:'#1A1A1A',color:'#F5F0E8',textAlign:'center',padding:'8px 12px',fontFamily:'var(--font-label)',fontSize:11,letterSpacing:1,textTransform:'uppercase'}}>Modo captura · WhatsApp — este pedido se registra como canal WhatsApp</div>}
    <WebHeader count={count} view={view} onNav={nav} onCart={()=>{setOpen(true);setStep('cart');}}
      folio={folio} onSeguir={()=>{setOpen(true);setStep(folio?'done':'buscar');}}
      /* Dentro del encabezado, para que quede a la vista mientras se navega: es
         lo primero que ve quien llega y ahi todavia puede decidir pedir dos
         pizzas. En el checkout el aviso llega tarde. */
      cinta={<CintaPromo activo={typeof mextizzaEs2x1 === 'function' && mextizzaEs2x1()}
        vistaPrevia={typeof mextizzaVistaPrevia === 'function' && mextizzaVistaPrevia('2x1')} />} />
    <WebHero onNav={nav} />
    <WebMenu onAdd={add} onCustomize={setCustom} added={added} />
    <WebProcess />
    <WebCatering />
    <WebSocial />
    <WebFooter />
    <AddonsDialog item={custom} onClose={()=>setCustom(null)} onAdd={add} />
    <CartDrawer open={open} lines={lines} step={step} setStep={setStep} onQty={qty} onClose={()=>setOpen(false)} canal={canal}
      folioActivo={folio} onOrdenCreada={(f)=>{setFolio(f);setLines([]);}} onFolioEncontrado={setFolio}
      onAgregarPremio={(it)=>add(it,1,{},true)} />
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Site/>);
