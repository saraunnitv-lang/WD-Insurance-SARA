const CACHE='wd-kit-test-v1';
const ASSETS=['./','./index.html','./manifest.json','./icons/wd-app-icon-192.png','./icons/wd-app-icon-512.png','./icons/wd-app-icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin) return;          // Supabase/CDN 등 외부는 그대로 통과
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));  // 네트워크 우선, 실패 시 캐시
});
