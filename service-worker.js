"use strict";var precacheConfig=[["/ra-13-maksim-maslov/index.html","ff09d2c191cce3875a93660a9a99942f"],["/ra-13-maksim-maslov/static/css/main.3c7f1f9c.css","acb1df81fe2a1e82253eac3a5d51dfd8"],["/ra-13-maksim-maslov/static/js/main.650919ae.js","4c0ae2e5ec4de16ddbe9da7225566e8a"],["/ra-13-maksim-maslov/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/ra-13-maksim-maslov/static/media/fontawesome-webfont.acf3dcb7.svg","acf3dcb7ff752b5296ca23ba2c7c2606"],["/ra-13-maksim-maslov/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/ra-13-maksim-maslov/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/ra-13-maksim-maslov/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/ra-13-maksim-maslov/static/media/product-card__similar-products-slider-item-1.5a94f6d4.png","5a94f6d446e8f2be4d70575390f1d0e5"],["/ra-13-maksim-maslov/static/media/product-card__similar-products-slider-item-2.abb550c1.png","abb550c1937bcf564723393993a93f88"],["/ra-13-maksim-maslov/static/media/product-card__similar-products-slider-item-3.e8f810fd.png","e8f810fd66c7ebcc28d99fd6247e1828"],["/ra-13-maksim-maslov/static/media/product-catalogue__overlooked-slider-item-1.f423f579.png","f423f579d1dd97c25a0c6585c906133b"],["/ra-13-maksim-maslov/static/media/product-catalogue__overlooked-slider-item-2.91cb383f.png","91cb383f3f1fb775254bf2e9d96f7f5e"],["/ra-13-maksim-maslov/static/media/product-catalogue__overlooked-slider-item-3.9f375324.png","9f375324f5dec4499d102cca7adbe753"],["/ra-13-maksim-maslov/static/media/product-catalogue__overlooked-slider-item-4.5e842c73.png","5e842c7301a612fb2632fdbcbcb5dee2"],["/ra-13-maksim-maslov/static/media/product-catalogue__overlooked-slider-item-5.350013cd.png","350013cd87b92b71a4e7adb49ee6bd09"],["/ra-13-maksim-maslov/static/media/sales-and-news__item_1.5e217ba5.jpg","5e217ba5253e6079c243bef0b195aabd"],["/ra-13-maksim-maslov/static/media/sales-and-news__item_2.57c5128c.jpg","57c5128c1752d71448ee3223b456e52e"],["/ra-13-maksim-maslov/static/media/sales-and-news__item_3.f53060a0.jpg","f53060a0f4f10f211dd12521c15b9fd4"],["/ra-13-maksim-maslov/static/media/sales-and-news__item_4.b11b7687.jpg","b11b7687a55b887bdd2ea3ea1eaa1687"],["/ra-13-maksim-maslov/static/media/slider.d613d452.jpg","d613d452bebe22d8b7d737ec12001e04"],["/ra-13-maksim-maslov/static/media/slider180deg.54638011.jpeg","54638011c75501dec7517369019fc591"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,s){var r=new URL(e);return s&&r.pathname.match(s)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],s=new URL(a,self.location),r=createCacheKey(s,hashParamName,t,/\.\w{8}\./);return[s.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(s){return setOfCachedUrls(s).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return s.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),s="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,s),e=urlsToCacheKeys.has(t));var r="/ra-13-maksim-maslov/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});