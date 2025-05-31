var Qe=Object.defineProperty;var Ae=i=>{throw TypeError(i)};var Ye=(i,e,t)=>e in i?Qe(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Se=(i,e,t)=>Ye(i,typeof e!="symbol"?e+"":e,t),Ee=(i,e,t)=>e.has(i)||Ae("Cannot "+t);var s=(i,e,t)=>(Ee(i,e,"read from private field"),t?t.call(i):e.get(i)),n=(i,e,t)=>e.has(i)?Ae("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),r=(i,e,t,a)=>(Ee(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),d=(i,e,t)=>(Ee(i,e,"access private method"),t);import{o as Xe,h as Te}from"./vendor-D6IVKLb5.js";import{L as A}from"./vendor-leaflet-B5ybuIjN.js";import{c as pe}from"./vendor-maptiler-DCyfXkUK.js";import"./vendor-maplibre-BrX5Op9A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=t(o);fetch(o.href,c)}})();const Ze="https://story-api.dicoding.dev",I=`${Ze}/v1`,ge="KkyMgLJnVkWVvvcTUgxO",et="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",Y={"Content-Type":"application/json"};function tt(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),a=window.atob(t);return Uint8Array.from([...a].map(o=>o.charCodeAt(0)))}function De(){B.isLoggedIn()||(window.location.href="#/login")}function p(i,e="regular"){document.body.insertAdjacentHTML("beforeend",`<toast-message message="${i}" variant="${e}"></toast-message>`)}function qe(i){return i.charAt(0).toUpperCase()+i.slice(1)}async function st(){return await Notification.requestPermission()}async function Ce(){return!!await He()}async function He(){return await(await navigator.serviceWorker.getRegistration()).pushManager.getSubscription()}async function at(){const e=await(await navigator.serviceWorker.getRegistration()).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:tt(et)}),{endpoint:t,keys:a}=e.toJSON();return!!(await fetch(`${I}/notifications/subscribe`,{method:"POST",body:JSON.stringify({endpoint:t,keys:a}),headers:{...Y,Authorization:`Bearer ${B.getUser().token}`}})).ok}async function it(){const i=await He();return(await fetch(`${I}/notifications/subscribe`,{method:"DELETE",body:JSON.stringify({endpoint:i.endpoint}),headers:{...Y,Authorization:`Bearer ${B.getUser().token}`}})).ok?(await i.unsubscribe(),!0):!1}class ot{async register(e,t,a){const o=await(await fetch(`${I}/register`,{method:"POST",headers:Y,body:JSON.stringify({name:e,email:t,password:a})})).json();return o.error?{status:!1,message:o.message}:{status:!0,message:o.message}}async login(e,t){const a=await(await fetch(`${I}/login`,{method:"POST",headers:Y,body:JSON.stringify({email:e,password:t})})).json();return a.error?{status:!1,message:a.message}:(this.setUser(a.loginResult),{status:!0,message:a.message})}logout(){localStorage.removeItem("user")}setUser(e){localStorage.setItem("user",JSON.stringify(e))}getUser(){return JSON.parse(localStorage.getItem("user")||"{}")}isLoggedIn(){return!!this.getUser().token}}const B=new ot;var f,fe;class nt{constructor({view:e,model:t}){n(this,f);n(this,fe);r(this,f,e),r(this,fe,t)}async toggleNotification(){if(!("serviceWorker"in navigator&&"PushManager"in window)){s(this,f).showErrorMessage("Browser tidak mendukung notifikasi");return}if(await st()!="granted"){s(this,f).showErrorMessage("Notifikasi tidak diizinkan");return}if(!await Ce()){await at()?s(this,f).showSuccessMessage("Notifikasi diaktifkan"):s(this,f).showErrorMessage("Gagal mengaktifkan notifikasi");return}await it()?s(this,f).showSuccessMessage("Notifikasi dinonaktifkan"):s(this,f).showErrorMessage("Gagal menonaktifkan notifikasi")}logout(){B.logout(),s(this,f).onLogoutSuccess()}}f=new WeakMap,fe=new WeakMap;var D,C;class rt{constructor({view:e,model:t}){n(this,D);n(this,C);r(this,D,e),r(this,C,t)}async getBookmarks(){const e=await s(this,C).getBookmarks();s(this,D).renderBookmarks(e)}async deleteBookmark(e){await s(this,C).deleteBookmark(e),s(this,D).showSuccessMessage("Berhasil menghapus dari bookmark"),this.getBookmarks()}async getBookmarkDetail(e){const t=await s(this,C).getBookmark(e);s(this,D).renderBookmarkDetail(t)}}D=new WeakMap,C=new WeakMap;const ct="story-api",dt=1,L="bookmarks";var H,ee;class lt{constructor(){n(this,H)}async toggleBookmark(e){const o=(await d(this,H,ee).call(this)).transaction(L,"readwrite").objectStore(L);return await o.get(e.id)?(await o.delete(e.id),{status:!0,type:"delete"}):(await o.add({id:e.id,name:e.name,photoUrl:e.photoUrl,description:e.description,lat:e.lat,lon:e.lon,createdAt:e.createdAt,savedAt:new Date().toISOString()}),{status:!0,type:"add"})}async getBookmarks(){return await(await d(this,H,ee).call(this)).transaction(L,"readonly").objectStore(L).getAll()}async deleteBookmark(e){await(await d(this,H,ee).call(this)).transaction(L,"readwrite").objectStore(L).delete(e)}async getBookmark(e){return await(await d(this,H,ee).call(this)).transaction(L,"readonly").objectStore(L).get(e)}}H=new WeakSet,ee=async function(){return await Xe(ct,dt,{upgrade(e){e.createObjectStore(L,{keyPath:"id"})}})};const $e=new lt;var U,be,Ne;class ut{constructor(){n(this,be);n(this,U)}async render(){return`
      <section class="width-center" id="bookmark-section">
        <div class="bookmark-header">
            <h2 class="page-title">Bookmark</h2>
        </div>

        <div class="bookmark-posts">
        </div>
      </section>
    `}async afterRender(){r(this,U,new rt({view:this,model:$e})),s(this,U).getBookmarks()}renderBookmarks(e){const t=document.querySelector(".bookmark-posts"),a=document.querySelector(".bookmark-header");if(t.innerHTML="",e.length===0){a.classList.add("hidden"),t.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-bookmark-off"></i>
          <p>Tidak terdapat bookmark yang tersimpan</p>
        </div>
      `;return}e.forEach(o=>{const c=Te(o.createdAt).fromNow();t.insertAdjacentHTML("beforeend",`<div class="card">
          <div class="post-metadata">
            <div class="post-metadata-left">
              <div class="avatar">
                <span>${o.name.charAt(0).toUpperCase()}</span>
              </div>

              <div>
                <h2 class="author">${o.name}</h2>
                <p class="datetime">${c}</p>
              </div>
            </div>

            <span class="delete-span-${o.id}">
            </span>
          </div>

          <a href="#/feed/${o.id}" class="post-link">
            <img class="post-image" src="${o.photoUrl}" alt="${o.name} story" />
            <p class="post-text">${qe(o.description)}</p>
          </a>
        </div>`),d(this,be,Ne).call(this,o.id)})}showSuccessMessage(e){p(e,"success")}}U=new WeakMap,be=new WeakSet,Ne=function(e){const t=document.createElement("button"),a=document.querySelector(`.delete-span-${e}`);t.classList.add("btn-delete"),t.setAttribute("title","Hapus dari bookmark"),t.innerHTML='<i class="ti ti-trash"></i>',a.appendChild(t),t.addEventListener("click",()=>{s(this,U).deleteBookmark(e)})};class ht{static async getStoryDetail(e){try{const a=await(await fetch(`${I}/stories/${e}`,{headers:{...Y,Authorization:`Bearer ${B.getUser().token}`}})).json();if(a.error)throw new Error(a.message);return a.story}catch(t){throw console.error("Error fetching story detail:",t),t}}}var N,ae;class mt{constructor({view:e,model:t}){n(this,N);n(this,ae);r(this,N,e),r(this,ae,t)}async getStoryDetail(e){const t=await $e.getBookmark(e);if(!navigator.onLine&&t){s(this,N).renderStory(t);return}try{const a=await s(this,ae).getStoryDetail(e);s(this,N).renderStory(a)}catch(a){s(this,N).showError(a.message)}}}N=new WeakMap,ae=new WeakMap;var ie,F,ke,O;class pt{constructor(){n(this,ie);n(this,F);n(this,ke);n(this,O,{})}async render(){return De(),`
      <section class="width-center" id="feed-detail-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
      </section>
    `}async afterRender(){const{id:e}=Rt();r(this,ie,new mt({view:this,model:ht})),await s(this,ie).getStoryDetail(e)}initMapLayer(){const e=A.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),t=new pe({apiKey:ge,style:"landscape"}),a=new pe({apiKey:ge,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,O,{Default:e,Satellite:a,Landscape:t})}renderStory(e){const t=document.getElementById("feed-detail-section"),a=Te(e.createdAt).fromNow(),o=t.querySelector(".feed-loading");o&&o.remove(),t.innerHTML=`
      <div class="card">
        <div class="post-metadata">
          <div class="post-metadata-left">
            <div class="avatar">
              <span>${e.name.charAt(0).toUpperCase()}</span>
            </div>

            <div>
              <h2 class="author">${e.name} dsadas</h2>
              <p class="datetime">${a}</p>
            </div>
          </div>
        </div>

        <div class="post-content">
          <img class="post-image" src="${e.photoUrl}" alt="${e.name} story" />
          <p class="post-text">${qe(e.description)}</p>

          <div class="location-container">
            <div class="coord-row">
              <i class="ti ti-map-pin"></i>
              <span>${e.lat}, ${e.lon}</span>
            </div>
            <div class="map-container" id="story-map"></div>
          </div>
        </div>
      </div>
    `,this.initMapLayer(),r(this,F,A.map("story-map",{layers:[s(this,O).Default],center:[e.lat,e.lon],zoom:15})),A.control.layers(s(this,O)).addTo(s(this,F)),r(this,ke,A.marker([e.lat,e.lon]).bindPopup(`Latitude: ${e.lat}<br>Longitude: ${e.lon}`).addTo(s(this,F)))}showError(e){const t=document.getElementById("feed-detail-section"),a=t.querySelector(".feed-loading");a&&a.remove(),t.innerHTML=`
      <div class="error-state">
        <i class="ti ti-alert-circle"></i>
        <p>${e}</p>
      </div>
    `}}ie=new WeakMap,F=new WeakMap,ke=new WeakMap,O=new WeakMap;class gt{async fetchData(){const e=await(await fetch(`${I}/stories`,{method:"GET",headers:{...Y,Authorization:`Bearer ${B.getUser().token}`}})).json();return e.error?{status:!1,message:e.message}:{status:!0,data:e.listStory}}}const ft=new gt;var v,oe,_;class bt{constructor({view:e,model:t,bookmarkModel:a}){n(this,v);n(this,oe);n(this,_);r(this,v,e),r(this,oe,t),r(this,_,a)}async getFeed(){if(!navigator.onLine){s(this,v).showOfflineState();return}try{const e=await s(this,oe).fetchData();if(e.data.forEach(async t=>{const a=await s(this,_).getBookmark(t.id);t.isBookmarked=!!a,s(this,v).renderFeed(t)}),!e.status){s(this,v).showErrorMessage();return}}catch{s(this,v).showErrorMessage()}}async toggleBookmark(e){const t=await s(this,_).toggleBookmark(e);if(!t.status){s(this,v).showErrorToast("Gagal menyimpan");return}s(this,v).markAsBookmarked(e.id,t.type)}}v=new WeakMap,oe=new WeakMap,_=new WeakMap;var R;class kt{constructor(){n(this,R)}async render(){return De(),`
      <section class="width-center" id="feed-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
        <a class="btn primary" href="#/post" id="btn-add-section">
          <i class="ti ti-plus"></i>
        </a>
      </section>
    `}async afterRender(){r(this,R,new bt({view:this,model:ft,bookmarkModel:$e})),await s(this,R).getFeed()}renderFeed(e){const t=document.getElementById("feed-section"),a=Te(e.createdAt).fromNow(),o=t.querySelector(".feed-loading"),c=t.querySelector(".error-state");o&&o.remove(),c&&c.remove(),t.insertAdjacentHTML("beforeend",`
        <div class="card">
          <div class="post-metadata">
            <div class="post-metadata-left">
              <div class="avatar">
                <span>${e.name.charAt(0).toUpperCase()}</span>
              </div>

              <div>
                <h2 class="author">${e.name}</h2>
                <p class="datetime">${a}</p>
              </div>
            </div>

            <span class="bookmark-span-${e.id}">
            </span>
          </div>

          <a href="#/feed/${e.id}" class="post-link">
            <img class="post-image" src="${e.photoUrl}" alt="${e.name} story" />
            <p class="post-text">${qe(e.description)}</p>
          </a>
        </div>
      `);const l=document.createElement("button"),u=document.querySelector(`.bookmark-span-${e.id}`);l.classList.add("btn-bookmark"),l.setAttribute("title","Simpan ke bookmark"),l.innerHTML=`<i class="ti ti-bookmark${e.isBookmarked?"-filled":""}"></i>`,u.appendChild(l),l.addEventListener("click",()=>{s(this,R).toggleBookmark(e)})}markAsBookmarked(e,t){const a=document.querySelector(`.bookmark-span-${e} > .btn-bookmark`);a.innerHTML=`<i class="ti ti-bookmark${t==="add"?"-filled":""}"></i>`}showEmptyState(){const e=document.getElementById("feed-section"),t=e.querySelector(".feed-loading");t&&t.remove(),e.insertAdjacentHTML("beforeend",`
        <div class="empty-state">
          <i class="ti ti-news-off"></i>
          <p>Belum ada cerita</p>
          <a href="#/post" class="btn primary">Buat Cerita</a>
        </div>
      `)}showOfflineState(){const e=document.getElementById("feed-section"),t=document.querySelector(".feed-loading");t&&t.remove(),e.insertAdjacentHTML("beforeend",`
        <div class="offline-state">
          <i class="ti ti-wifi-off"></i>
          <p>Anda sedang offline</p>
        </div>
      `)}showErrorMessage(){const e=document.getElementById("feed-section"),t=document.querySelector(".feed-loading"),a=document.querySelector(".error-state");t&&t.remove(),a&&a.remove(),e.insertAdjacentHTML("beforeend",`
        <div class="error-state">
          <i class="ti ti-alert-circle"></i>
          <p>Gagal menampilkan feed</p>
          <button class="btn outline" id="btn-refresh-feed">
            <i class="ti ti-refresh"></i>
            Coba Lagi
          </button>
        </div>
      `),document.getElementById("btn-refresh-feed").addEventListener("click",()=>{s(this,R).getFeed()})}showErrorToast(e){p(e,"danger")}}R=new WeakMap;class vt{async render(){return`
      <section class="home-section">
        <h1 class="title">StoryShare</h1>
        <p class="description">Bagikan momenmu dengan foto, tuliskan story, dan tandai lokasi</p>

        <div class="auth-buttons">
          <a href="#/login" class="btn primary" aria-label="Masuk"><i class="ti ti-login-2"></i> Masuk</a>
          <a href="#/register" class="btn outline" aria-label="Daftar"><i class="ti ti-user-plus"></i>Daftar</a>
        </div>

        <div class="feature">
          <div class="feature-item">
            <i class="ti ti-camera"></i>
            <span>
              <h3>Bagikan Foto</h3>
              <p>Unggah foto-foto terbaikmu dan bagikan kepada teman-temanmu.</p>
            </span>
          </div>

          <div class="feature-item">
            <i class="ti ti-pencil"></i>
            <span>
              <h3>Tuliskan Story</h3>
              <p>Ceritakan kisah di balik foto-foto tersebut dengan tulisan yang menarik.</p>
            </span>
          </div>

          <div class="feature-item">
            <i class="ti ti-map-pin"></i>
            <span>
              <h3>Tandai Lokasi</h3>
              <p>Berikan informasi lokasi tempat di mana foto tersebut diambil.</p>
            </span>
          </div>
        </div>
      </section>
    `}async afterRender(){}}class wt extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){this.innerHTML=`
      <a href="#" class="back-to-home">
        <i class="ti ti-arrow-left"></i>
        <span>Kembali ke Beranda</span>
      </a>
    `}}customElements.define("back-to-home",wt);var P,j,ve,Re;class yt{constructor({view:e,model:t}){n(this,ve);n(this,P);n(this,j);r(this,P,e),r(this,j,t),d(this,ve,Re).call(this)}async login(e,t){const a=await s(this,j).login(e,t);if(s(this,P).hideLoading(),!a.status){s(this,P).showErrorMessage(a.message);return}s(this,P).onLoginSuccess()}}P=new WeakMap,j=new WeakMap,ve=new WeakSet,Re=function(){s(this,j).isLoggedIn()&&s(this,P).onLoginSuccess(!1)};var ne,x,we,xe;class Lt{constructor(){n(this,we);n(this,ne);n(this,x)}async render(){return`
      <section class="auth-section">
        <div class="card">
          <back-to-home></back-to-home>
          <h1 class="title">Masuk</h1>
          <p class="description">Selamat datang kembali! Silakan masuk untuk melanjutkan.</p>
          <form id="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" class="btn primary full" id="submit-button">Masuk</button>
          </form>
          <p class="auth-link">
            Belum punya akun? <a href="#/register">Daftar di sini</a>
          </p>
        </div>
      </section>
    `}async afterRender(){r(this,ne,new yt({view:this,model:B})),r(this,x,document.getElementById("submit-button")),d(this,we,xe).call(this)}showLoading(){s(this,x).classList.add("loading")}hideLoading(){s(this,x).classList.remove("loading")}onLoginSuccess(e=!0){e&&p("Berhasil masuk!","success"),window.location.href="#/feed"}showErrorMessage(e){p(e,"danger")}}ne=new WeakMap,x=new WeakMap,we=new WeakSet,xe=function(){document.getElementById("login-form").addEventListener("submit",t=>{t.preventDefault(),s(this,x).classList.add("loading");const a=new FormData(t.target);s(this,ne).login(a.get("email"),a.get("password"))})};var S,re,X,Ie,Ue;class St extends HTMLElement{constructor(){super();n(this,X);n(this,S);n(this,re);this.classList.add("take-photo-container","hidden"),r(this,re,new Event("closeCamera")),window.addEventListener("popstate",()=>this.closeCamera(!1)),window.addEventListener("beforeunload",()=>this.closeCamera(!1))}async previewCamera(){if(await d(this,X,Ie).call(this),!s(this,S))return p("Tidak dapat mengakses kamera","danger"),!1;this.innerHTML=`
      <video class="video-preview" autoplay>
      </video>

      <button type="button" class="btn danger small video-preview-close" id="close-camera-btn">
        <i class="ti ti-x"></i>
      </button>

      <button type="button" class="btn video-preview-take-photo" id="take-photo-btn"></button>

      <canvas class="hidden" id="photo-result"></canvas>
    `;const t=this.querySelector(".video-preview");return t.srcObject=s(this,S),this.querySelector("#close-camera-btn").addEventListener("click",()=>this.closeCamera()),this.querySelector("#take-photo-btn").addEventListener("click",()=>d(this,X,Ue).call(this)),this.classList.remove("hidden"),!0}closeCamera(t=!0){this.classList.add("hidden"),s(this,S)&&s(this,S).getTracks().forEach(a=>a.stop()),t&&this.dispatchEvent(s(this,re))}}S=new WeakMap,re=new WeakMap,X=new WeakSet,Ie=async function(){try{r(this,S,await navigator.mediaDevices.getUserMedia({video:!0}))}catch{r(this,S,null)}},Ue=function(){const t=this.querySelector("#photo-result"),a=this.querySelector(".video-preview");t.width=a.videoWidth,t.height=a.videoHeight,t.getContext("2d").drawImage(a,0,0,t.width,t.height),t.toBlob(o=>{const c=new File([o],"photo.jpg",{type:"image/jpeg"}),l=new CustomEvent("takePhoto",{detail:{file:c}});this.dispatchEvent(l)})};customElements.define("take-photo",St);var G,ce;class Et{constructor({view:e,model:t}){n(this,G);n(this,ce);r(this,G,e),r(this,ce,t)}async searchLocation(e){const t=await s(this,ce).getGeocode(e);if(!t){s(this,G).showGeocodeError("Gagal mengambil data geocode");return}s(this,G).renderGeocode(t)}}G=new WeakMap,ce=new WeakMap;const Bt="https://nominatim.openstreetmap.org/search";class Mt{async getGeocode(e){try{return await(await fetch(`${Bt}?q=${encodeURIComponent(e)}&format=json`)).json()}catch(t){return console.error("Error fetching geocode:",t),null}}}const Pt=new Mt;var g,b,k,z,de,Z,Fe,Oe;class Tt extends HTMLElement{constructor(){super();n(this,Z);n(this,g);n(this,b);n(this,k,[-6.208982,106.845172]);n(this,z,{});n(this,de);this.classList.add("pick-location","hidden"),r(this,de,new Et({view:this,model:Pt}))}render(t){this.innerHTML=`
      <div class="pick-location-header">
        <h2 class="title">Pilih Lokasi</h2>
        <button id="close-location-btn">
          <i class="ti ti-x"></i>
        </button>
      </div>
      <div class="pick-location-body">
        <form method="post" class="form-group search-box" id="geocoding-form">
          <input type="text" name="address" placeholder="Cari lokasi" class="form-control">
          <button type="submit" class="btn primary small" id="search-btn">
            <i class="ti ti-search"></i>
            <div class="loading-spinner hidden">
              <div class="spinner"></div>
            </div>
          </button>
        </form>

        <div class="map-view" id="map">
          <button class="btn icon primary btn-my-location" id="my-location-btn" title="My Location">
            <i class="ti ti-current-location"></i>
          </button>
        </div>

        <div class="result-container hidden">
          <h3 class="result-title">Hasil Pencarian</h3>
          <div class="geocode-result" id="geocode-result"></div>
        </div>
      </div>

      <div class="pick-location-footer">
        <button class="btn outline" id="cancel-location-btn">
          Batal
        </button>

        <button class="btn primary" id="pick-location-btn">
          Pilih Lokasi
        </button>
      </div>
    `,this.initMapLayer(),r(this,g,A.map("map",{layers:[s(this,z).Default],center:s(this,k),zoom:15})),A.control.layers(s(this,z)).addTo(s(this,g)),r(this,b,A.marker(s(this,k)).addTo(s(this,g))),this.setCurrentLocation(t),d(this,Z,Fe).call(this)}initMapLayer(){const t=A.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),a=new pe({apiKey:ge,style:"landscape"}),o=new pe({apiKey:ge,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,z,{Default:t,Satellite:o,Landscape:a})}setCurrentLocation(t){if(!navigator.geolocation){p("Maaf browser anda tidak mendukung penggunaan lokasi","danger");return}t[0]&&t[1]?(r(this,k,t),s(this,g).setView(s(this,k),15),s(this,b).setLatLng(s(this,k))):navigator.geolocation.getCurrentPosition(a=>{r(this,k,[a.coords.latitude,a.coords.longitude]),s(this,g).setView(s(this,k),15),s(this,b).setLatLng(s(this,k))})}renderGeocode(t){const a=this.querySelector(".result-container"),o=this.querySelector("#geocode-result");if(t.length==1&&(s(this,g).setView([t[0].lat,t[0].lon],15),s(this,b).setLatLng([t[0].lat,t[0].lon])),o.innerHTML="",a.classList.remove("hidden"),t.length===0){o.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-map-pin-off"></i>
          <p>Lokasi tidak ditemukan</p>
        </div>
      `;return}t.forEach(c=>{o.insertAdjacentHTML("beforeend",`<button class="geocode-item" data-lat="${c.lat}" data-lon="${c.lon}">
          <i class="ti ti-map-pin"></i>
          <span class="geocode-item-name">${c.display_name}</span>
        </button>`)}),this.scrollTo({top:133,behavior:"smooth"}),d(this,Z,Oe).call(this)}showLoadingGeocode(){const t=this.querySelector(".result-container"),a=this.querySelector("#geocode-result");t.classList.remove("hidden"),a.innerHTML=`
      <div class="loading-state">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <p>Mencari lokasi...</p>
      </div>
    `}showGeocodeError(t){p(t,"danger")}}g=new WeakMap,b=new WeakMap,k=new WeakMap,z=new WeakMap,de=new WeakMap,Z=new WeakSet,Fe=function(){const t=this.querySelector("#geocoding-form"),a=this.querySelector("#close-location-btn"),o=this.querySelector("#cancel-location-btn"),c=this.querySelector("#pick-location-btn"),l=this.querySelector("#my-location-btn"),u=this.querySelector("#search-btn"),M=this.querySelector('input[name="address"]');t.addEventListener("submit",async y=>{y.preventDefault();const h=y.target.address.value;u.disabled=!0,M.disabled=!0,u.querySelector(".ti-search").classList.add("hidden"),u.querySelector(".loading-spinner").classList.remove("hidden"),this.showLoadingGeocode();try{await s(this,de).searchLocation(h)}finally{u.disabled=!1,M.disabled=!1,u.querySelector(".ti-search").classList.remove("hidden"),u.querySelector(".loading-spinner").classList.add("hidden")}}),s(this,g).on("click",y=>{s(this,g).setView(y.latlng,15),s(this,b).setLatLng(y.latlng)}),a.addEventListener("click",()=>{this.classList.add("hidden")}),o.addEventListener("click",()=>{this.classList.add("hidden")}),c.addEventListener("click",()=>{const y=new CustomEvent("pick-location",{detail:{lat:s(this,b).getLatLng().lat,lon:s(this,b).getLatLng().lng}});this.dispatchEvent(y)}),l.addEventListener("click",()=>{this.setCurrentLocation([])})},Oe=function(){this.querySelectorAll(".geocode-item").forEach(a=>{a.addEventListener("click",o=>{const c=o.target.closest(".geocode-item"),l=c.dataset.lat,u=c.dataset.lon;s(this,g).setView([l,u],15),s(this,b).setLatLng([l,u])})})};customElements.define("pick-location",Tt);class qt{async createPost(e){const{description:t,photo:a,lat:o,lon:c}=e,l=new FormData;l.append("description",t),l.append("photo",a),l.append("lat",o.toString()),l.append("lon",c.toString());const M=await(await fetch(`${I}/stories`,{method:"POST",headers:{Authorization:`Bearer ${B.getUser().token}`},body:l})).json();return M.error?{status:!1,message:M.message}:{status:!0,message:M.message}}}const $t=new qt;var T,le;class At{constructor({view:e,model:t}){n(this,T);n(this,le);r(this,T,e),r(this,le,t)}async createPost({description:e,photo:t,lat:a,lon:o}){s(this,T).showLoading(),(await s(this,le).createPost({description:e,photo:t,lat:a,lon:o})).status?s(this,T).onPostSuccess():s(this,T).onPostError(),s(this,T).hideLoading()}}T=new WeakMap,le=new WeakMap;var q,ue,$,V,J,K,m,_e,te,se;class Dt{constructor(){n(this,m);n(this,q);n(this,ue);n(this,$);n(this,V);n(this,J);n(this,K)}get photo(){return s(this,q)}set photo(e){r(this,q,e),d(this,m,te).call(this)}get description(){return s(this,V)}set description(e){r(this,V,e),d(this,m,te).call(this)}get lat(){return s(this,J)}set lat(e){r(this,J,e),d(this,m,te).call(this)}get lon(){return s(this,K)}set lon(e){r(this,K,e),d(this,m,te).call(this)}async render(){return`
      <section class="width-center" id="post-section">
        <form class="card" id="post-form">
          <h1 class="title">Buat Story</h1>

          <div class="form-group">
            <p class="label">Photo</p>

            <div class="upload-container">
              <button type="button" class="btn-upload" aria-label="Ambil Foto" id="take-photo-btn">
                <i class="ti ti-camera"></i>
                <span>Ambil Foto</span>
              </button>

              <button type="button" class="btn-upload" aria-label="Unggah Gambar" id="upload-btn">
                <i class="ti ti-upload"></i>
                <span>Unggah Gambar</span>
              </button>

              <take-photo></take-photo>
              <div class="photo-preview hidden">
                <img src="" alt="Photo Preview" class="photo-preview-img">
                <button type="button" class="btn danger small photo-preview-close">
                  <i class="ti ti-x"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="description">Deskripsi</label>
            <textarea class="form-control" rows="4" id="description"></textarea>
          </div>

          <div class="form-group">
            <label for="location-btn">Lokasi</label>
            <button type="button" id="location-btn">
              <i class="ti ti-map-pin"></i>
              <span id="location-btn-text">Pilih Lokasi</span>
            </button>
          </div>

          <div class="form-group">
            <button type="submit" class="btn primary" disabled>Post Story</button>
          </div>

          <input type="file" id="photo-input" class="hidden" accept="image/*">
          <input type="hidden" id="lat" name="lat">
          <input type="hidden" id="lon" name="lon">
        </form>

        <pick-location></pick-location>
      </section>
    `}async afterRender(){r(this,ue,new At({view:this,model:$t})),r(this,$,document.querySelector("take-photo")),d(this,m,_e).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onPostSuccess(){p("Post berhasil dibagikan","success"),window.location.href="#/feed"}onPostError(){p("Gagal membagikan post","danger")}}q=new WeakMap,ue=new WeakMap,$=new WeakMap,V=new WeakMap,J=new WeakMap,K=new WeakMap,m=new WeakSet,_e=function(){const e=document.querySelector("#take-photo-btn"),t=document.querySelector("#upload-btn"),a=document.querySelector(".photo-preview-close"),o=document.querySelector("#photo-input"),c=document.querySelector("#description"),l=document.querySelector("#location-btn"),u=document.querySelector("pick-location"),M=document.querySelector("#location-btn-text"),y=document.querySelector("#post-form");e.addEventListener("click",async h=>{h.preventDefault();const We=await s(this,$).previewCamera();d(this,m,se).call(this,!We)}),t.addEventListener("click",h=>{h.preventDefault(),o.click()}),a.addEventListener("click",()=>{this.photo=null}),l.addEventListener("click",h=>{u.classList.remove("hidden"),u.render([this.lat,this.lon])}),s(this,$).addEventListener("closeCamera",()=>{d(this,m,se).call(this,!0)}),s(this,$).addEventListener("takePhoto",h=>{this.photo=h.detail.file}),o.addEventListener("change",h=>{this.photo=h.target.files[0]}),c.addEventListener("input",h=>{this.description=h.target.value.trim()}),u.addEventListener("pick-location",h=>{this.lat=h.detail.lat,this.lon=h.detail.lon,M.textContent=`${this.lat}, ${this.lon}`,u.classList.add("hidden")}),y.addEventListener("submit",h=>{h.preventDefault(),s(this,ue).createPost({description:this.description,photo:this.photo,lat:this.lat,lon:this.lon})})},te=function(){const e=document.querySelector(".photo-preview"),t=document.querySelector(".photo-preview-img"),a=document.querySelector('#post-form button[type="submit"]');s(this,q)?(s(this,$).closeCamera(!1),t.src=URL.createObjectURL(s(this,q)),e.classList.remove("hidden"),d(this,m,se).call(this,!1)):(t.src="",d(this,m,se).call(this,!0),e.classList.add("hidden")),a.disabled=!(s(this,q)&&s(this,V)&&s(this,J)&&s(this,K))},se=function(e){document.querySelectorAll(".btn-upload").forEach(a=>a.classList.toggle("hidden",!e))};var E,W,ye,je;class Ct{constructor({view:e,model:t}){n(this,ye);n(this,E);n(this,W);r(this,E,e),r(this,W,t),d(this,ye,je).call(this)}async register(e,t,a){s(this,E).showLoading();const o=await s(this,W).register(e,t,a);if(s(this,E).hideLoading(),!o.status){s(this,E).onRegisterError();return}s(this,E).onRegisterSuccess()}}E=new WeakMap,W=new WeakMap,ye=new WeakSet,je=function(){s(this,W).isLoggedIn()&&s(this,E).onRegisterSuccess(!1)};var he,Le,Ge;class Ht{constructor(){n(this,Le);n(this,he)}async render(){return`
    <section class="auth-section">
      <div class="card">
        <back-to-home></back-to-home>
        <h1 class="title">Daftar</h1>
        <p class="description">Bergabunglah dengan kami dan bagikan momenmu!</p>

        <form id="register-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" autofocus required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" class="btn primary full">Daftar</button>
        </form>

        <p class="auth-link">
          Sudah punya akun? <a href="#/login">Masuk di sini</a>
        </p>
      </div>
    </section>
    `}async afterRender(){r(this,he,new Ct({view:this,model:B})),d(this,Le,Ge).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onRegisterSuccess(e=!0){e&&p("Berhasil mendaftar, silahkan login!","success"),window.location.href="#/login"}onRegisterError(){p("Gagal mendaftar, silahkan coba lagi!","danger")}}he=new WeakMap,Le=new WeakSet,Ge=function(){document.getElementById("register-form").addEventListener("submit",t=>{t.preventDefault();const a=new FormData(t.target);s(this,he).register(a.get("name"),a.get("email"),a.get("password"))})};const ze={"/":()=>new vt,"/login":()=>new Lt,"/register":()=>new Ht,"/feed":()=>new kt,"/feed/:id":()=>new pt,"/post":()=>new Dt,"/bookmarks":()=>new ut};function Ve(){return location.hash.replace("#","")||"/"}function Je(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function Nt(i){let e="";return i.resource&&(e+=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function Be(){const i=Ve(),e=Je(i),t=Nt(e);return ze[t]?t:"/notfound"}function Rt(){const i=Ve();return Je(i)}var Q,w,Me,Ke,Pe;class xt extends HTMLElement{constructor(){super();n(this,w);n(this,Q);Se(this,"_hide",["/","/login","/register","/notfound"]);r(this,Q,new nt({view:this,model:null}))}connectedCallback(){this.render()}render(){this.innerHTML="",!this._hide.includes(Be())&&(this.innerHTML=`
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand">StoryShare</a>
          <ul class="navbar-menu">
            <li class="nav-item">
              <a href="#/feed" class="${d(this,w,Me).call(this,"/feed")?"active":""}" aria-label="Feed">
                <i class="ti ti-home"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#/bookmarks" class="${d(this,w,Me).call(this,"/bookmarks")?"active":""}" aria-label="Postingan Tersimpan">
                <i class="ti ti-bookmark"></i>
              </a>
            </li>
            <li class="nav-item">
              <button aria-label="Aktifkan Notifikasi" title="Aktifkan Notifikasi" id="notification-button">
                <i class="ti ti-bell"></i>
              </button>
            </li>
            <li class="nav-item">
              <a href="#/logout" aria-label="Profile" id="logout-button">
                <i class="ti ti-logout"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    `,d(this,w,Ke).call(this),d(this,w,Pe).call(this))}showErrorMessage(t){p(t,"danger")}showSuccessMessage(t){p(t,"success")}onLogoutSuccess(){p("Berhasil keluar","success"),window.location.hash="/login"}}Q=new WeakMap,w=new WeakSet,Me=function(t){return Be()===t},Ke=function(){const t=document.getElementById("logout-button"),a=document.getElementById("notification-button");t.addEventListener("click",o=>{o.preventDefault(),s(this,Q).logout()}),a.addEventListener("click",async o=>{a.innerHTML='<i class="ti ti-loader-2 loading"></i>',await s(this,Q).toggleNotification(),await d(this,w,Pe).call(this)})},Pe=async function(){const t=document.getElementById("notification-button"),a=await Ce();t.innerHTML=a?'<i class="ti ti-bell-ringing-filled"></i>':'<i class="ti ti-bell"></i>',t.setAttribute("aria-label",a?"Nonaktifkan Notifikasi":"Aktifkan Notifikasi"),t.setAttribute("title",a?"Nonaktifkan Notifikasi":"Berlangganan Notifikasi")};customElements.define("app-navbar",xt);class It extends HTMLElement{constructor(){super();Se(this,"_message");this._message=null,this.classList.add("toast"),this.classList.add("animate__animated")}connectedCallback(){this._message=this.getAttribute("message"),this.classList.add("animate__fadeInRight"),this.getAttribute("variant")&&this.classList.add(this.getAttribute("variant")),this.render()}render(){this.innerHTML=`
      <p>${this._message}</p>
    `,this._hide()}_hide(){setTimeout(()=>{this.classList.add("animate__fadeOut"),setTimeout(()=>{this.remove()},1e3)},2500)}}customElements.define("toast-message",It);class Ut{async render(){return`
      <section class="notfound-section">
        <h1 class="title">404</h1>
        <p class="description">Halaman tidak ditemukan</p>
        <a href="#/feed" class="btn primary">Kembali ke Beranda</a>
      </section>
    `}async afterRender(){}}var me;class Ft{constructor({content:e}){n(this,me);r(this,me,e)}async renderPage(){const e=Be(),t=ze[e],a=t?t():new Ut;if(!document.startViewTransition){this._render(a);return}document.startViewTransition(async()=>{document.documentElement.style.viewTransitionName=e,this._render(a)})}async _render(e){s(this,me).innerHTML=await e.render(),await e.afterRender()}}me=new WeakMap;document.addEventListener("DOMContentLoaded",async()=>{const i=document.querySelector("#content"),e=document.querySelector("app-navbar"),t=new Ft({content:i});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage(),e.render()})});
