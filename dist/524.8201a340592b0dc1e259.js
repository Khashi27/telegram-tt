(()=>{"use strict";const e="tt-media-progressive",t="tt-assets";"undefined"!=typeof window&&window.innerHeight,Math.round(425),new Set(["newMessage","newScheduledMessage","deleteMessages","deleteScheduledMessages","deleteHistory"]),new Set(["image/png","image/gif","image/jpeg","video/mp4","video/avi","video/quicktime"]);const n=524288,s=new Map;var a,i;self.addEventListener("message",(e=>{const{type:t,messageId:n,result:a}=e.data;if("partResponse"===t){const e=s.get(n);e&&e.resolve(a)}})),(i=a||(a={})).True="1",i.False="0";let r=(new Date).valueOf();const o={},c=new Set;function d(e){return e.custom.from_id?parseInt(e.custom.from_id,10):e.custom.chat_id?-1*parseInt(e.custom.chat_id,10):e.custom.channel_id?-1*parseInt(e.custom.channel_id,10):void 0}function l(e){if(e.custom.msg_id)return parseInt(e.custom.msg_id,10)}async function u({chatId:e,messageId:t,body:n,title:s,icon:a}){await self.registration.showNotification(s,{body:n,data:{chatId:e,messageId:t},icon:a||"icon-192x192.png",badge:a||"icon-192x192.png",vibrate:[200,100,200]}),await async function(e){const t=(await self.clients.matchAll({type:"window"})).filter((e=>e.url===self.registration.scope)),n=t[0];n&&0!==t.length&&n.postMessage({type:"playNotificationSound",payload:{id:e}})}(t||e||0)}async function f(e,t){const{chatId:n,messageId:s}=t;if(n){e.postMessage({type:"focusMessage",payload:{chatId:n,messageId:s}});try{await e.focus()}catch(e){}}}self.onsync=()=>{r=(new Date).valueOf()};const p=/[0-9a-f]{20}.*\.(js|css|woff2?|svg|png|jpg|jpeg|json|wasm)$/;self.addEventListener("install",(e=>{e.waitUntil(self.skipWaiting())})),self.addEventListener("activate",(e=>{e.waitUntil(self.caches.delete(t)),e.waitUntil(self.clients.claim())})),self.addEventListener("fetch",(a=>{const{url:i}=a.request;return i.includes("/progressive/")?(a.respondWith(async function(t){const{url:a}=t.request,i=t.request.headers.get("range"),r=/^bytes=(\d+)-(\d+)?$/g.exec(i||""),o=Number(r[1]);let c=Number(r[2]);if((!c||c-o+1>n)&&(c=o+n-1),0===o&&1===c){const e=t.request.url.match(/fileSize=(\d+)&mimeType=([\w/]+)/),n=e&&Number(e[1]),s=e&&e[2];if(n&&s)return new Response(new Uint8Array(2).buffer,{status:206,statusText:"Partial Content",headers:[["Content-Range",`bytes 0-1/${n}`],["Accept-Ranges","bytes"],["Content-Length","2"],["Content-Type",s]]})}const d=`${a}?start=${o}&end=${c}`,[l,u]=await async function(t){const n=await self.caches.open(e);return Promise.all([n.match(`${t}&type=arrayBuffer`).then((e=>e?e.arrayBuffer():void 0)),n.match(`${t}&type=headers`).then((e=>e?e.json():void 0))])}(d);if(l)return new Response(l,{status:206,statusText:"Partial Content",headers:u});let f;try{f=await async function(e,t){if(!e.clientId)return;const n=await self.clients.get(e.clientId);if(!n)return;const a=(e=>{let t;do{t=String(Math.random()).replace("0.","id")}while(e.hasOwnProperty(t));return t})(s),i={},r=Promise.race([(o=6e4,new Promise((e=>{setTimeout((()=>e()),o)}))).then((()=>Promise.reject(new Error("ERROR_PART_TIMEOUT")))),new Promise(((e,t)=>{Object.assign(i,{resolve:e,reject:t})}))]);var o;return s.set(a,i),r.catch((()=>{})).finally((()=>{s.delete(a)})),n.postMessage({type:"requestPart",messageId:a,params:t}),r}(t,{url:a,start:o,end:c})}catch(e){}if(!f)return new Response("",{status:500,statusText:"Failed to fetch progressive part"});const{arrayBuffer:p,fullSize:g,mimeType:w}=f,m=Math.min(c-o+1,p.byteLength);c=o+m-1;const h=p.slice(0,m),y=[["Content-Range",`bytes ${o}-${c}/${g}`],["Accept-Ranges","bytes"],["Content-Length",String(m)],["Content-Type",w]];return m<=524288&&c<2097151&&async function(t,n,s){const a=await self.caches.open(e);Promise.all([a.put(new Request(`${t}&type=arrayBuffer`),new Response(n)),a.put(new Request(`${t}&type=headers`),new Response(JSON.stringify(s)))])}(d,h,y),new Response(h,{status:206,statusText:"Partial Content",headers:y})}(a)),!0):!(!i.startsWith("http")||!i.match(p)||(a.respondWith(async function(e){const n=await self.caches.open(t),s=await n.match(e.request);if(s)return s;const a=await fetch(e.request);return n.put(e.request,a.clone()),a}(a)),0))})),self.addEventListener("push",(function(e){if((new Date).valueOf()-r<3e3)return;const t=function(e){try{return e.data.json()}catch(e){return}}(e);if(!t||t.mute===a.True)return;const n=function(e){return{chatId:d(e),messageId:l(e),title:e.title||"Telegram WebZ",body:e.description}}(t);c.has(n.messageId)?c.delete(n.messageId):e.waitUntil(u(n))})),self.addEventListener("notificationclick",(function(e){const t=new URL(self.registration.scope).origin;e.notification.close();const{data:n}=e.notification;e.waitUntil((async()=>{const s=(await self.clients.matchAll({type:"window"})).filter((e=>new URL(e.url).origin===t));if(e.waitUntil(Promise.all(s.map((e=>(o[e.id]=n,f(e,n)))))),!self.clients.openWindow||s.length>0)return;const a=await self.clients.openWindow(t);a&&(o[a.id]=n)})())})),self.addEventListener("message",(function(e){if(!e.data)return;const t=e.source;if("clientReady"===e.data.type&&o[t.id]&&(e.waitUntil(f(t,o[t.id])),delete o[t.id]),"newMessageNotification"===e.data.type){const t=e.data.payload;e.waitUntil(u(t)),c.add(t.messageId)}if("notificationHandled"===e.data.type){const t=e.data.payload;c.add(t.messageId)}}))})();
//# sourceMappingURL=524.8201a340592b0dc1e259.js.map