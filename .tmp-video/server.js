const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..'),PORT=5514;
const MIME={'.html':'text/html; charset=utf-8','.mp4':'video/mp4','.png':'image/png','.js':'text/javascript'};
http.createServer((req,res)=>{
  if(req.method==='POST'&&req.url==='/__save'){
    let b='';req.on('data',c=>b+=c);
    req.on('end',()=>{try{
      const {path:rel,b64}=JSON.parse(b);
      const dest=path.join(ROOT,rel);
      if(!dest.startsWith(ROOT))throw new Error('fuera del repo');
      fs.mkdirSync(path.dirname(dest),{recursive:true});
      fs.writeFileSync(dest,Buffer.from(b64,'base64'));
      res.writeHead(200,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:true,bytes:fs.statSync(dest).size}));
    }catch(e){res.writeHead(500);res.end(JSON.stringify({ok:false,error:String(e)}));}});
    return;
  }
  const f=path.join(ROOT,decodeURIComponent(req.url.split('?')[0]));
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end('404');return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
}).listen(PORT,()=>console.log('listo en '+PORT));
