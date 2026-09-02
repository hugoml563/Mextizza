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
  const add=(it,q=1,extra={})=>{
    const key=it.id+(extra.addonNames&&extra.addonNames.length?':'+extra.addonNames.join('|'):'');
    setLines(ls=>{const e=ls.find(l=>l.key===key);return e?ls.map(l=>l.key===key?{...l,qty:l.qty+q}:l):[...ls,{...it,...extra,key,qty:q}];});
    setAdded(it.id); setTimeout(()=>setAdded(null),900); setStep('cart'); setCustom(null);
  };
  const qty=(key,n)=>setLines(ls=>n<=0?ls.filter(l=>l.key!==key):ls.map(l=>l.key===key?{...l,qty:n}:l));
  const nav=(k)=>{setView(k);const el=document.getElementById(k);window.scrollTo({top:el?el.offsetTop-90:0,behavior:'smooth'});};
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
      folio={folio} onSeguir={()=>{setOpen(true);setStep(folio?'done':'buscar');}} />
    <WebHero onNav={nav} />
    <WebMenu onAdd={add} onCustomize={setCustom} added={added} />
    <WebProcess />
    <WebCatering />
    <WebSocial />
    <WebFooter />
    <AddonsDialog item={custom} onClose={()=>setCustom(null)} onAdd={add} />
    <CartDrawer open={open} lines={lines} step={step} setStep={setStep} onQty={qty} onClose={()=>setOpen(false)} canal={canal}
      folioActivo={folio} onOrdenCreada={(f)=>{setFolio(f);setLines([]);}} onFolioEncontrado={setFolio} />
  </>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Site/>);
