var Ye=Object.defineProperty;var Ce=i=>{throw TypeError(i)};var Xe=(i,e,t)=>e in i?Ye(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Be=(i,e,t)=>Xe(i,typeof e!="symbol"?e+"":e,t),Me=(i,e,t)=>e.has(i)||Ce("Cannot "+t);var s=(i,e,t)=>(Me(i,e,"read from private field"),t?t.call(i):e.get(i)),n=(i,e,t)=>e.has(i)?Ce("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),r=(i,e,t,a)=>(Me(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),d=(i,e,t)=>(Me(i,e,"access private method"),t);import{o as Ze,h as qe}from"./vendor-D6IVKLb5.js";import{L as f}from"./vendor-leaflet-B5ybuIjN.js";import{c as ge}from"./vendor-maptiler-DCyfXkUK.js";import"./vendor-maplibre-BrX5Op9A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=t(o);fetch(o.href,c)}})();const x="/story-app/",et="https://story-api.dicoding.dev",R=`${et}/v1`,fe="KkyMgLJnVkWVvvcTUgxO",tt="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",X={"Content-Type":"application/json"};function st(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),a=window.atob(t);return Uint8Array.from([...a].map(o=>o.charCodeAt(0)))}function Ee(){M.isLoggedIn()||(window.location.href="#/login")}function p(i,e="regular"){document.body.insertAdjacentHTML("beforeend",`<toast-message message="${i}" variant="${e}"></toast-message>`)}function Ae(i){return i.charAt(0).toUpperCase()+i.slice(1)}async function at(){return await Notification.requestPermission()}async function Ue(){return!!await He()}async function He(){return await(await navigator.serviceWorker.getRegistration()).pushManager.getSubscription()}async function it(){const e=await(await navigator.serviceWorker.getRegistration()).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:st(tt)}),{endpoint:t,keys:a}=e.toJSON();return!!(await fetch(`${R}/notifications/subscribe`,{method:"POST",body:JSON.stringify({endpoint:t,keys:a}),headers:{...X,Authorization:`Bearer ${M.getUser().token}`}})).ok}async function ot(){const i=await He();return(await fetch(`${R}/notifications/subscribe`,{method:"DELETE",body:JSON.stringify({endpoint:i.endpoint}),headers:{...X,Authorization:`Bearer ${M.getUser().token}`}})).ok?(await i.unsubscribe(),!0):!1}class nt{async register(e,t,a){const o=await(await fetch(`${R}/register`,{method:"POST",headers:X,body:JSON.stringify({name:e,email:t,password:a})})).json();return o.error?{status:!1,message:o.message}:{status:!0,message:o.message}}async login(e,t){const a=await(await fetch(`${R}/login`,{method:"POST",headers:X,body:JSON.stringify({email:e,password:t})})).json();return a.error?{status:!1,message:a.message}:(this.setUser(a.loginResult),{status:!0,message:a.message})}logout(){localStorage.removeItem("user")}setUser(e){localStorage.setItem("user",JSON.stringify(e))}getUser(){return JSON.parse(localStorage.getItem("user")||"{}")}isLoggedIn(){return!!this.getUser().token}}const M=new nt;var b,be;class rt{constructor({view:e,model:t}){n(this,b);n(this,be);r(this,b,e),r(this,be,t)}async toggleNotification(){if(!("serviceWorker"in navigator&&"PushManager"in window)){s(this,b).showErrorMessage("Browser tidak mendukung notifikasi");return}if(await at()!="granted"){s(this,b).showErrorMessage("Notifikasi tidak diizinkan");return}if(!await Ue()){await it()?s(this,b).showSuccessMessage("Notifikasi diaktifkan"):s(this,b).showErrorMessage("Gagal mengaktifkan notifikasi");return}await ot()?s(this,b).showSuccessMessage("Notifikasi dinonaktifkan"):s(this,b).showErrorMessage("Gagal menonaktifkan notifikasi")}logout(){M.logout(),s(this,b).onLogoutSuccess()}}b=new WeakMap,be=new WeakMap;var D,C;class ct{constructor({view:e,model:t}){n(this,D);n(this,C);r(this,D,e),r(this,C,t)}async getBookmarks(){const e=await s(this,C).getBookmarks();s(this,D).renderBookmarks(e)}async deleteBookmark(e){await s(this,C).deleteBookmark(e),s(this,D).showSuccessMessage("Berhasil menghapus dari bookmark"),this.getBookmarks()}async getBookmarkDetail(e){const t=await s(this,C).getBookmark(e);s(this,D).renderBookmarkDetail(t)}}D=new WeakMap,C=new WeakMap;const dt="story-api",lt=1,S="bookmarks";var U,te;class ut{constructor(){n(this,U)}async toggleBookmark(e){const o=(await d(this,U,te).call(this)).transaction(S,"readwrite").objectStore(S);return await o.get(e.id)?(await o.delete(e.id),{status:!0,type:"delete"}):(await o.add({id:e.id,name:e.name,photoUrl:e.photoUrl,description:e.description,lat:e.lat,lon:e.lon,createdAt:e.createdAt,savedAt:new Date().toISOString()}),{status:!0,type:"add"})}async getBookmarks(){return await(await d(this,U,te).call(this)).transaction(S,"readonly").objectStore(S).getAll()}async deleteBookmark(e){await(await d(this,U,te).call(this)).transaction(S,"readwrite").objectStore(S).delete(e)}async getBookmark(e){return await(await d(this,U,te).call(this)).transaction(S,"readonly").objectStore(S).get(e)}}U=new WeakSet,te=async function(){return await Ze(dt,lt,{upgrade(e){e.createObjectStore(S,{keyPath:"id"})}})};const De=new ut;var O,ke,Ie;class ht{constructor(){n(this,ke);n(this,O)}async render(){return Ee(),`
      <section class="width-center" id="bookmark-section">
        <div class="bookmark-header">
            <h2 class="page-title">Bookmark</h2>
        </div>

        <div class="bookmark-posts">
        </div>
      </section>
    `}async afterRender(){r(this,O,new ct({view:this,model:De})),s(this,O).getBookmarks()}renderBookmarks(e){const t=document.querySelector(".bookmark-posts"),a=document.querySelector(".bookmark-header");if(t.innerHTML="",e.length===0){a.classList.add("hidden"),t.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-bookmark-off"></i>
          <p>Tidak terdapat bookmark yang tersimpan</p>
        </div>
      `;return}e.forEach(o=>{const c=qe(o.createdAt).fromNow();t.insertAdjacentHTML("beforeend",`<div class="card">
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
            <p class="post-text">${Ae(o.description)}</p>
          </a>
        </div>`),d(this,ke,Ie).call(this,o.id)})}showSuccessMessage(e){p(e,"success")}}O=new WeakMap,ke=new WeakSet,Ie=function(e){const t=document.createElement("button"),a=document.querySelector(`.delete-span-${e}`);t.classList.add("btn-delete"),t.setAttribute("title","Hapus dari bookmark"),t.innerHTML='<i class="ti ti-trash"></i>',a.appendChild(t),t.addEventListener("click",()=>{s(this,O).deleteBookmark(e)})};class mt{static async getStoryDetail(e){try{const a=await(await fetch(`${R}/stories/${e}`,{headers:{...X,Authorization:`Bearer ${M.getUser().token}`}})).json();if(a.error)throw new Error(a.message);return a.story}catch(t){throw console.error("Error fetching story detail:",t),t}}}var H,ie;class pt{constructor({view:e,model:t}){n(this,H);n(this,ie);r(this,H,e),r(this,ie,t)}async getStoryDetail(e){const t=await De.getBookmark(e);if(!navigator.onLine&&t){s(this,H).renderStory(t);return}try{const a=await s(this,ie).getStoryDetail(e);s(this,H).renderStory(a)}catch(a){s(this,H).showError(a.message)}}}H=new WeakMap,ie=new WeakMap;delete f.Icon.Default.prototype._getIconUrl;f.Icon.Default.mergeOptions({iconRetinaUrl:`${x}/images/marker-icon-2x.png`,iconUrl:`${x}/images/marker-icon.png`,shadowUrl:`${x}/images/marker-shadow.png`});var oe,F,ve,_;class gt{constructor(){n(this,oe);n(this,F);n(this,ve);n(this,_,{})}async render(){return Ee(),`
      <section class="width-center" id="feed-detail-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
      </section>
    `}async afterRender(){const{id:e}=Nt();r(this,oe,new pt({view:this,model:mt})),await s(this,oe).getStoryDetail(e)}initMapLayer(){const e=f.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),t=new ge({apiKey:fe,style:"landscape"}),a=new ge({apiKey:fe,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,_,{Default:e,Satellite:a,Landscape:t})}renderStory(e){const t=document.getElementById("feed-detail-section"),a=qe(e.createdAt).fromNow(),o=t.querySelector(".feed-loading");o&&o.remove(),t.innerHTML=`
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
          <p class="post-text">${Ae(e.description)}</p>

          <div class="location-container">
            <div class="coord-row">
              <i class="ti ti-map-pin"></i>
              <span>${e.lat}, ${e.lon}</span>
            </div>
            <div class="map-container" id="story-map"></div>
          </div>
        </div>
      </div>
    `,this.initMapLayer(),r(this,F,f.map("story-map",{layers:[s(this,_).Default],center:[e.lat,e.lon],zoom:15})),f.control.layers(s(this,_)).addTo(s(this,F)),r(this,ve,f.marker([e.lat,e.lon]).bindPopup(`Latitude: ${e.lat}<br>Longitude: ${e.lon}`).addTo(s(this,F)))}showError(e){const t=document.getElementById("feed-detail-section"),a=t.querySelector(".feed-loading");a&&a.remove(),t.innerHTML=`
      <div class="error-state">
        <i class="ti ti-alert-circle"></i>
        <p>${e}</p>
      </div>
    `}}oe=new WeakMap,F=new WeakMap,ve=new WeakMap,_=new WeakMap;class ft{async fetchData(){const e=await(await fetch(`${R}/stories`,{method:"GET",headers:{...X,Authorization:`Bearer ${M.getUser().token}`}})).json();return e.error?{status:!1,message:e.message}:{status:!0,data:e.listStory}}}const bt=new ft;var w,ne,j;class kt{constructor({view:e,model:t,bookmarkModel:a}){n(this,w);n(this,ne);n(this,j);r(this,w,e),r(this,ne,t),r(this,j,a)}async getFeed(){if(!navigator.onLine){s(this,w).showOfflineState();return}try{const e=await s(this,ne).fetchData();if(e.data.forEach(async t=>{const a=await s(this,j).getBookmark(t.id);t.isBookmarked=!!a,s(this,w).renderFeed(t)}),!e.status){s(this,w).showErrorMessage();return}}catch{s(this,w).showErrorMessage()}}async toggleBookmark(e){const t=await s(this,j).toggleBookmark(e);if(!t.status){s(this,w).showErrorToast("Gagal menyimpan");return}s(this,w).markAsBookmarked(e.id,t.type)}}w=new WeakMap,ne=new WeakMap,j=new WeakMap;var I;class vt{constructor(){n(this,I)}async render(){return Ee(),`
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
    `}async afterRender(){r(this,I,new kt({view:this,model:bt,bookmarkModel:De})),await s(this,I).getFeed()}renderFeed(e){const t=document.getElementById("feed-section"),a=qe(e.createdAt).fromNow(),o=t.querySelector(".feed-loading"),c=t.querySelector(".error-state");o&&o.remove(),c&&c.remove(),t.insertAdjacentHTML("beforeend",`
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
            <p class="post-text">${Ae(e.description)}</p>
          </a>
        </div>
      `);const l=document.createElement("button"),u=document.querySelector(`.bookmark-span-${e.id}`);l.classList.add("btn-bookmark"),l.setAttribute("title","Simpan ke bookmark"),l.innerHTML=`<i class="ti ti-bookmark${e.isBookmarked?"-filled":""}"></i>`,u.appendChild(l),l.addEventListener("click",()=>{s(this,I).toggleBookmark(e)})}markAsBookmarked(e,t){const a=document.querySelector(`.bookmark-span-${e} > .btn-bookmark`);a.innerHTML=`<i class="ti ti-bookmark${t==="add"?"-filled":""}"></i>`}showEmptyState(){const e=document.getElementById("feed-section"),t=e.querySelector(".feed-loading");t&&t.remove(),e.insertAdjacentHTML("beforeend",`
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
      `)}showErrorMessage(){const e=document.getElementById("feed-section"),t=document.querySelector(".feed-loading"),a=document.querySelector(".error-state");if(!e)return;t&&t.remove(),a&&a.remove(),e.insertAdjacentHTML("beforeend",`
        <div class="error-state">
          <i class="ti ti-alert-circle"></i>
          <p>Gagal menampilkan feed</p>
          <button class="btn outline" id="btn-refresh-feed">
            <i class="ti ti-refresh"></i>
            Coba Lagi
          </button>
        </div>
      `),document.getElementById("btn-refresh-feed").addEventListener("click",()=>{s(this,I).getFeed()})}showErrorToast(e){p(e,"danger")}}I=new WeakMap;class wt{async render(){return`
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
    `}async afterRender(){}}class yt extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){this.innerHTML=`
      <a href="#" class="back-to-home">
        <i class="ti ti-arrow-left"></i>
        <span>Kembali ke Beranda</span>
      </a>
    `}}customElements.define("back-to-home",yt);var $,G,we,Ne;class Lt{constructor({view:e,model:t}){n(this,we);n(this,$);n(this,G);r(this,$,e),r(this,G,t),d(this,we,Ne).call(this)}async login(e,t){const a=await s(this,G).login(e,t);if(s(this,$).hideLoading(),!a.status){s(this,$).showErrorMessage(a.message);return}s(this,$).onLoginSuccess()}}$=new WeakMap,G=new WeakMap,we=new WeakSet,Ne=function(){s(this,G).isLoggedIn()&&s(this,$).onLoginSuccess(!1)};var re,N,ye,Re;class St{constructor(){n(this,ye);n(this,re);n(this,N)}async render(){return`
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
    `}async afterRender(){r(this,re,new Lt({view:this,model:M})),r(this,N,document.getElementById("submit-button")),d(this,ye,Re).call(this)}showLoading(){s(this,N).classList.add("loading")}hideLoading(){s(this,N).classList.remove("loading")}onLoginSuccess(e=!0){e&&p("Berhasil masuk!","success"),window.location.href="#/feed"}showErrorMessage(e){p(e,"danger")}}re=new WeakMap,N=new WeakMap,ye=new WeakSet,Re=function(){document.getElementById("login-form").addEventListener("submit",t=>{t.preventDefault(),s(this,N).classList.add("loading");const a=new FormData(t.target);s(this,re).login(a.get("email"),a.get("password"))})};var E,ce,Z,xe,Oe;class Et extends HTMLElement{constructor(){super();n(this,Z);n(this,E);n(this,ce);this.classList.add("take-photo-container","hidden"),r(this,ce,new Event("closeCamera")),window.addEventListener("popstate",()=>this.closeCamera(!1)),window.addEventListener("beforeunload",()=>this.closeCamera(!1))}async previewCamera(){if(await d(this,Z,xe).call(this),!s(this,E))return p("Tidak dapat mengakses kamera","danger"),!1;this.innerHTML=`
      <video class="video-preview" autoplay>
      </video>

      <button type="button" class="btn danger small video-preview-close" id="close-camera-btn">
        <i class="ti ti-x"></i>
      </button>

      <button type="button" class="btn video-preview-take-photo" id="take-photo-btn"></button>

      <canvas class="hidden" id="photo-result"></canvas>
    `;const t=this.querySelector(".video-preview");return t.srcObject=s(this,E),this.querySelector("#close-camera-btn").addEventListener("click",()=>this.closeCamera()),this.querySelector("#take-photo-btn").addEventListener("click",()=>d(this,Z,Oe).call(this)),this.classList.remove("hidden"),!0}closeCamera(t=!0){this.classList.add("hidden"),s(this,E)&&s(this,E).getTracks().forEach(a=>a.stop()),t&&this.dispatchEvent(s(this,ce))}}E=new WeakMap,ce=new WeakMap,Z=new WeakSet,xe=async function(){try{r(this,E,await navigator.mediaDevices.getUserMedia({video:!0}))}catch{r(this,E,null)}},Oe=function(){const t=this.querySelector("#photo-result"),a=this.querySelector(".video-preview");t.width=a.videoWidth,t.height=a.videoHeight,t.getContext("2d").drawImage(a,0,0,t.width,t.height),t.toBlob(o=>{const c=new File([o],"photo.jpg",{type:"image/jpeg"}),l=new CustomEvent("takePhoto",{detail:{file:c}});this.dispatchEvent(l)})};customElements.define("take-photo",Et);var z,de;class Bt{constructor({view:e,model:t}){n(this,z);n(this,de);r(this,z,e),r(this,de,t)}async searchLocation(e){const t=await s(this,de).getGeocode(e);if(!t){s(this,z).showGeocodeError("Gagal mengambil data geocode");return}s(this,z).renderGeocode(t)}}z=new WeakMap,de=new WeakMap;const Mt="https://nominatim.openstreetmap.org/search";class Pt{async getGeocode(e){try{return await(await fetch(`${Mt}?q=${encodeURIComponent(e)}&format=json`)).json()}catch(t){return console.error("Error fetching geocode:",t),null}}}const $t=new Pt;delete f.Icon.Default.prototype._getIconUrl;f.Icon.Default.mergeOptions({iconRetinaUrl:`${x}/images/marker-icon-2x.png`,iconUrl:`${x}/images/marker-icon.png`,shadowUrl:`${x}/images/marker-shadow.png`});var g,k,v,V,le,ee,Fe,_e;class Tt extends HTMLElement{constructor(){super();n(this,ee);n(this,g);n(this,k);n(this,v,[-6.208982,106.845172]);n(this,V,{});n(this,le);this.classList.add("pick-location","hidden"),r(this,le,new Bt({view:this,model:$t}))}render(t){this.innerHTML=`
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
    `,this.initMapLayer(),r(this,g,f.map("map",{layers:[s(this,V).Default],center:s(this,v),zoom:15})),f.control.layers(s(this,V)).addTo(s(this,g)),r(this,k,f.marker(s(this,v)).addTo(s(this,g))),this.setCurrentLocation(t),d(this,ee,Fe).call(this)}initMapLayer(){const t=f.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),a=new ge({apiKey:fe,style:"landscape"}),o=new ge({apiKey:fe,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,V,{Default:t,Satellite:o,Landscape:a})}setCurrentLocation(t){if(!navigator.geolocation){p("Maaf browser anda tidak mendukung penggunaan lokasi","danger");return}t[0]&&t[1]?(r(this,v,t),s(this,g).setView(s(this,v),15),s(this,k).setLatLng(s(this,v))):navigator.geolocation.getCurrentPosition(a=>{r(this,v,[a.coords.latitude,a.coords.longitude]),s(this,g).setView(s(this,v),15),s(this,k).setLatLng(s(this,v))})}renderGeocode(t){const a=this.querySelector(".result-container"),o=this.querySelector("#geocode-result");if(t.length==1&&(s(this,g).setView([t[0].lat,t[0].lon],15),s(this,k).setLatLng([t[0].lat,t[0].lon])),o.innerHTML="",a.classList.remove("hidden"),t.length===0){o.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-map-pin-off"></i>
          <p>Lokasi tidak ditemukan</p>
        </div>
      `;return}t.forEach(c=>{o.insertAdjacentHTML("beforeend",`<button class="geocode-item" data-lat="${c.lat}" data-lon="${c.lon}">
          <i class="ti ti-map-pin"></i>
          <span class="geocode-item-name">${c.display_name}</span>
        </button>`)}),this.scrollTo({top:133,behavior:"smooth"}),d(this,ee,_e).call(this)}showLoadingGeocode(){const t=this.querySelector(".result-container"),a=this.querySelector("#geocode-result");t.classList.remove("hidden"),a.innerHTML=`
      <div class="loading-state">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <p>Mencari lokasi...</p>
      </div>
    `}showGeocodeError(t){p(t,"danger")}}g=new WeakMap,k=new WeakMap,v=new WeakMap,V=new WeakMap,le=new WeakMap,ee=new WeakSet,Fe=function(){const t=this.querySelector("#geocoding-form"),a=this.querySelector("#close-location-btn"),o=this.querySelector("#cancel-location-btn"),c=this.querySelector("#pick-location-btn"),l=this.querySelector("#my-location-btn"),u=this.querySelector("#search-btn"),P=this.querySelector('input[name="address"]');t.addEventListener("submit",async L=>{L.preventDefault();const h=L.target.address.value;u.disabled=!0,P.disabled=!0,u.querySelector(".ti-search").classList.add("hidden"),u.querySelector(".loading-spinner").classList.remove("hidden"),this.showLoadingGeocode();try{await s(this,le).searchLocation(h)}finally{u.disabled=!1,P.disabled=!1,u.querySelector(".ti-search").classList.remove("hidden"),u.querySelector(".loading-spinner").classList.add("hidden")}}),s(this,g).on("click",L=>{s(this,g).setView(L.latlng,15),s(this,k).setLatLng(L.latlng)}),a.addEventListener("click",()=>{this.classList.add("hidden")}),o.addEventListener("click",()=>{this.classList.add("hidden")}),c.addEventListener("click",()=>{const L=new CustomEvent("pick-location",{detail:{lat:s(this,k).getLatLng().lat,lon:s(this,k).getLatLng().lng}});this.dispatchEvent(L)}),l.addEventListener("click",()=>{this.setCurrentLocation([])})},_e=function(){this.querySelectorAll(".geocode-item").forEach(a=>{a.addEventListener("click",o=>{const c=o.target.closest(".geocode-item"),l=c.dataset.lat,u=c.dataset.lon;s(this,g).setView([l,u],15),s(this,k).setLatLng([l,u])})})};customElements.define("pick-location",Tt);class qt{async createPost(e){const{description:t,photo:a,lat:o,lon:c}=e,l=new FormData;l.append("description",t),l.append("photo",a),l.append("lat",o.toString()),l.append("lon",c.toString());const P=await(await fetch(`${R}/stories`,{method:"POST",headers:{Authorization:`Bearer ${M.getUser().token}`},body:l})).json();return P.error?{status:!1,message:P.message}:{status:!0,message:P.message}}}const At=new qt;var T,ue;class Dt{constructor({view:e,model:t}){n(this,T);n(this,ue);r(this,T,e),r(this,ue,t)}async createPost({description:e,photo:t,lat:a,lon:o}){s(this,T).showLoading(),(await s(this,ue).createPost({description:e,photo:t,lat:a,lon:o})).status?s(this,T).onPostSuccess():s(this,T).onPostError(),s(this,T).hideLoading()}}T=new WeakMap,ue=new WeakMap;var q,he,A,J,K,W,m,je,se,ae;class Ct{constructor(){n(this,m);n(this,q);n(this,he);n(this,A);n(this,J);n(this,K);n(this,W)}get photo(){return s(this,q)}set photo(e){r(this,q,e),d(this,m,se).call(this)}get description(){return s(this,J)}set description(e){r(this,J,e),d(this,m,se).call(this)}get lat(){return s(this,K)}set lat(e){r(this,K,e),d(this,m,se).call(this)}get lon(){return s(this,W)}set lon(e){r(this,W,e),d(this,m,se).call(this)}async render(){return Ee(),`
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
    `}async afterRender(){r(this,he,new Dt({view:this,model:At})),r(this,A,document.querySelector("take-photo")),d(this,m,je).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onPostSuccess(){p("Post berhasil dibagikan","success"),window.location.href="#/feed"}onPostError(){p("Gagal membagikan post","danger")}}q=new WeakMap,he=new WeakMap,A=new WeakMap,J=new WeakMap,K=new WeakMap,W=new WeakMap,m=new WeakSet,je=function(){const e=document.querySelector("#take-photo-btn"),t=document.querySelector("#upload-btn"),a=document.querySelector(".photo-preview-close"),o=document.querySelector("#photo-input"),c=document.querySelector("#description"),l=document.querySelector("#location-btn"),u=document.querySelector("pick-location"),P=document.querySelector("#location-btn-text"),L=document.querySelector("#post-form");e.addEventListener("click",async h=>{h.preventDefault();const Qe=await s(this,A).previewCamera();d(this,m,ae).call(this,!Qe)}),t.addEventListener("click",h=>{h.preventDefault(),o.click()}),a.addEventListener("click",()=>{this.photo=null}),l.addEventListener("click",h=>{u.classList.remove("hidden"),u.render([this.lat,this.lon])}),s(this,A).addEventListener("closeCamera",()=>{d(this,m,ae).call(this,!0)}),s(this,A).addEventListener("takePhoto",h=>{this.photo=h.detail.file}),o.addEventListener("change",h=>{this.photo=h.target.files[0]}),c.addEventListener("input",h=>{this.description=h.target.value.trim()}),u.addEventListener("pick-location",h=>{this.lat=h.detail.lat,this.lon=h.detail.lon,P.textContent=`${this.lat}, ${this.lon}`,u.classList.add("hidden")}),L.addEventListener("submit",h=>{h.preventDefault(),s(this,he).createPost({description:this.description,photo:this.photo,lat:this.lat,lon:this.lon})})},se=function(){const e=document.querySelector(".photo-preview"),t=document.querySelector(".photo-preview-img"),a=document.querySelector('#post-form button[type="submit"]');s(this,q)?(s(this,A).closeCamera(!1),t.src=URL.createObjectURL(s(this,q)),e.classList.remove("hidden"),d(this,m,ae).call(this,!1)):(t.src="",d(this,m,ae).call(this,!0),e.classList.add("hidden")),a.disabled=!(s(this,q)&&s(this,J)&&s(this,K)&&s(this,W))},ae=function(e){document.querySelectorAll(".btn-upload").forEach(a=>a.classList.toggle("hidden",!e))};var B,Q,Le,Ge;class Ut{constructor({view:e,model:t}){n(this,Le);n(this,B);n(this,Q);r(this,B,e),r(this,Q,t),d(this,Le,Ge).call(this)}async register(e,t,a){s(this,B).showLoading();const o=await s(this,Q).register(e,t,a);if(s(this,B).hideLoading(),!o.status){s(this,B).onRegisterError();return}s(this,B).onRegisterSuccess()}}B=new WeakMap,Q=new WeakMap,Le=new WeakSet,Ge=function(){s(this,Q).isLoggedIn()&&s(this,B).onRegisterSuccess(!1)};var me,Se,ze;class Ht{constructor(){n(this,Se);n(this,me)}async render(){return`
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
    `}async afterRender(){r(this,me,new Ut({view:this,model:M})),d(this,Se,ze).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onRegisterSuccess(e=!0){e&&p("Berhasil mendaftar, silahkan login!","success"),window.location.href="#/login"}onRegisterError(){p("Gagal mendaftar, silahkan coba lagi!","danger")}}me=new WeakMap,Se=new WeakSet,ze=function(){document.getElementById("register-form").addEventListener("submit",t=>{t.preventDefault();const a=new FormData(t.target);s(this,me).register(a.get("name"),a.get("email"),a.get("password"))})};const Ve={"/":()=>new wt,"/login":()=>new St,"/register":()=>new Ht,"/feed":()=>new vt,"/feed/:id":()=>new gt,"/post":()=>new Ct,"/bookmarks":()=>new ht};function Je(){return location.hash.replace("#","")||"/"}function Ke(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function It(i){let e="";return i.resource&&(e+=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function Pe(){const i=Je(),e=Ke(i),t=It(e);return Ve[t]?t:"/notfound"}function Nt(){const i=Je();return Ke(i)}var Y,y,$e,We,Te;class Rt extends HTMLElement{constructor(){super();n(this,y);n(this,Y);Be(this,"_hide",["/","/login","/register","/notfound"]);r(this,Y,new rt({view:this,model:null}))}connectedCallback(){this.render()}render(){this.innerHTML="",!this._hide.includes(Pe())&&(this.innerHTML=`
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand">StoryShare</a>
          <ul class="navbar-menu">
            <li class="nav-item">
              <a href="#/feed" class="${d(this,y,$e).call(this,"/feed")?"active":""}" aria-label="Feed">
                <i class="ti ti-home"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#/bookmarks" class="${d(this,y,$e).call(this,"/bookmarks")?"active":""}" aria-label="Postingan Tersimpan">
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
    `,d(this,y,We).call(this),d(this,y,Te).call(this))}showErrorMessage(t){p(t,"danger")}showSuccessMessage(t){p(t,"success")}onLogoutSuccess(){p("Berhasil keluar","success"),window.location.hash="/login"}}Y=new WeakMap,y=new WeakSet,$e=function(t){return Pe()===t},We=function(){const t=document.getElementById("logout-button"),a=document.getElementById("notification-button");t.addEventListener("click",o=>{o.preventDefault(),s(this,Y).logout()}),a.addEventListener("click",async o=>{a.innerHTML='<i class="ti ti-loader-2 loading"></i>',await s(this,Y).toggleNotification(),await d(this,y,Te).call(this)})},Te=async function(){const t=document.getElementById("notification-button"),a=await Ue();t.innerHTML=a?'<i class="ti ti-bell-ringing-filled"></i>':'<i class="ti ti-bell"></i>',t.setAttribute("aria-label",a?"Nonaktifkan Notifikasi":"Aktifkan Notifikasi"),t.setAttribute("title",a?"Nonaktifkan Notifikasi":"Berlangganan Notifikasi")};customElements.define("app-navbar",Rt);class xt extends HTMLElement{constructor(){super();Be(this,"_message");this._message=null,this.classList.add("toast"),this.classList.add("animate__animated")}connectedCallback(){this._message=this.getAttribute("message"),this.classList.add("animate__fadeInRight"),this.getAttribute("variant")&&this.classList.add(this.getAttribute("variant")),this.render()}render(){this.innerHTML=`
      <p>${this._message}</p>
    `,this._hide()}_hide(){setTimeout(()=>{this.classList.add("animate__fadeOut"),setTimeout(()=>{this.remove()},1e3)},2500)}}customElements.define("toast-message",xt);class Ot{async render(){return`
      <section class="notfound-section">
        <h1 class="title">404</h1>
        <p class="description">Halaman tidak ditemukan</p>
        <a href="#/feed" class="btn primary">Kembali ke Beranda</a>
      </section>
    `}async afterRender(){}}var pe;class Ft{constructor({content:e}){n(this,pe);r(this,pe,e)}async renderPage(){const e=Pe(),t=Ve[e],a=t?t():new Ot;if(!document.startViewTransition){this._render(a);return}document.startViewTransition(async()=>{document.documentElement.style.viewTransitionName=e,this._render(a)})}async _render(e){s(this,pe).innerHTML=await e.render(),await e.afterRender()}}pe=new WeakMap;document.addEventListener("DOMContentLoaded",async()=>{const i=document.querySelector("#content"),e=document.querySelector("app-navbar"),t=new Ft({content:i});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage(),e.render()})});
