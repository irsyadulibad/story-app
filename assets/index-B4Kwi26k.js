var Ke=Object.defineProperty;var qe=i=>{throw TypeError(i)};var We=(i,e,t)=>e in i?Ke(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Se=(i,e,t)=>We(i,typeof e!="symbol"?e+"":e,t),Ee=(i,e,t)=>e.has(i)||qe("Cannot "+t);var s=(i,e,t)=>(Ee(i,e,"read from private field"),t?t.call(i):e.get(i)),n=(i,e,t)=>e.has(i)?qe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),r=(i,e,t,a)=>(Ee(i,e,"write to private field"),a?a.call(i,t):e.set(i,t),t),d=(i,e,t)=>(Ee(i,e,"access private method"),t);import{o as Qe,h as Me}from"./vendor-D6IVKLb5.js";import{L as $}from"./vendor-leaflet-B5ybuIjN.js";import{c as pe}from"./vendor-maptiler-DCyfXkUK.js";import"./vendor-maplibre-BrX5Op9A.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=t(o);fetch(o.href,c)}})();const Ye="https://story-api.dicoding.dev",U=`${Ye}/v1`,ge="KkyMgLJnVkWVvvcTUgxO",Xe="BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk",Y={"Content-Type":"application/json"};function Ze(i){const e="=".repeat((4-i.length%4)%4),t=(i+e).replace(/-/g,"+").replace(/_/g,"/"),a=window.atob(t);return Uint8Array.from([...a].map(o=>o.charCodeAt(0)))}function $e(){S.isLoggedIn()||(window.location.href="#/login")}function p(i,e="regular"){document.body.insertAdjacentHTML("beforeend",`<toast-message message="${i}" variant="${e}"></toast-message>`)}function Pe(i){return i.charAt(0).toUpperCase()+i.slice(1)}async function et(){return await Notification.requestPermission()}async function Ae(){return!!await De()}async function De(){return await(await navigator.serviceWorker.getRegistration()).pushManager.getSubscription()}async function tt(){const e=await(await navigator.serviceWorker.getRegistration()).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ze(Xe)}),{endpoint:t,keys:a}=e.toJSON();return!!(await fetch(`${U}/notifications/subscribe`,{method:"POST",body:JSON.stringify({endpoint:t,keys:a}),headers:{...Y,Authorization:`Bearer ${S.getUser().token}`}})).ok}async function st(){const i=await De();return(await fetch(`${U}/notifications/subscribe`,{method:"DELETE",body:JSON.stringify({endpoint:i.endpoint}),headers:{...Y,Authorization:`Bearer ${S.getUser().token}`}})).ok?(await i.unsubscribe(),!0):!1}class at{async register(e,t,a){const o=await(await fetch(`${U}/register`,{method:"POST",headers:Y,body:JSON.stringify({name:e,email:t,password:a})})).json();return o.error?{status:!1,message:o.message}:{status:!0,message:o.message}}async login(e,t){const a=await(await fetch(`${U}/login`,{method:"POST",headers:Y,body:JSON.stringify({email:e,password:t})})).json();return a.error?{status:!1,message:a.message}:(this.setUser(a.loginResult),{status:!0,message:a.message})}logout(){localStorage.removeItem("user")}setUser(e){localStorage.setItem("user",JSON.stringify(e))}getUser(){return JSON.parse(localStorage.getItem("user")||"{}")}isLoggedIn(){return!!this.getUser().token}}const S=new at;var f,fe;class it{constructor({view:e,model:t}){n(this,f);n(this,fe);r(this,f,e),r(this,fe,t)}async toggleNotification(){if(!("serviceWorker"in navigator&&"PushManager"in window)){s(this,f).showErrorMessage("Browser tidak mendukung notifikasi");return}if(await et()!="granted"){s(this,f).showErrorMessage("Notifikasi tidak diizinkan");return}if(!await Ae()){await tt()?s(this,f).showSuccessMessage("Notifikasi diaktifkan"):s(this,f).showErrorMessage("Gagal mengaktifkan notifikasi");return}await st()?s(this,f).showSuccessMessage("Notifikasi dinonaktifkan"):s(this,f).showErrorMessage("Gagal menonaktifkan notifikasi")}logout(){S.logout(),s(this,f).onLogoutSuccess()}}f=new WeakMap,fe=new WeakMap;function Ce(){return location.hash.replace("#","")||"/"}function He(i){const e=i.split("/");return{resource:e[1]||null,id:e[2]||null}}function ot(i){let e="";return i.resource&&(e+=e.concat(`/${i.resource}`)),i.id&&(e=e.concat("/:id")),e||"/"}function xe(){const i=Ce(),e=He(i);return ot(e)}function nt(){const i=Ce();return He(i)}var R,N,Ie,Be;class rt extends HTMLElement{constructor(){super();n(this,N);n(this,R);Se(this,"_hide",["/","/login","/register"]);r(this,R,new it({view:this,model:null}))}connectedCallback(){this.render()}render(){this.innerHTML="",!this._hide.includes(xe())&&(this.innerHTML=`
      <nav class="navbar">
        <div class="container">
          <a href="#" class="navbar-brand">StoryShare</a>
          <ul class="navbar-menu">
            <li class="nav-item">
              <a href="#/feed" class="active" aria-label="Feed">
                <i class="ti ti-home"></i>
              </a>
            </li>
            <li class="nav-item">
              <a href="#/bookmarks" aria-label="Postingan Tersimpan">
                <i class="ti ti-bookmark"></i>
              </a>
            </li>
            <li class="nav-item">
              <button aria-label="Subscribe Notifikasi" title="Subscribe Notifikasi" id="notification-button">
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
    `,d(this,N,Ie).call(this),d(this,N,Be).call(this))}showErrorMessage(t){p(t,"danger")}showSuccessMessage(t){p(t,"success")}onLogoutSuccess(){p("Berhasil keluar","success"),window.location.hash="/login"}}R=new WeakMap,N=new WeakSet,Ie=function(){const t=document.getElementById("logout-button"),a=document.getElementById("notification-button");t.addEventListener("click",o=>{o.preventDefault(),s(this,R).logout()}),a.addEventListener("click",async o=>{a.innerHTML='<i class="ti ti-loader-2 loading"></i>',await s(this,R).toggleNotification(),await d(this,N,Be).call(this)})},Be=async function(){const t=document.getElementById("notification-button"),a=await Ae();t.innerHTML=a?'<i class="ti ti-bell-ringing-filled"></i>':'<i class="ti ti-bell"></i>'};customElements.define("app-navbar",rt);class ct extends HTMLElement{constructor(){super();Se(this,"_message");this._message=null,this.classList.add("toast"),this.classList.add("animate__animated")}connectedCallback(){this._message=this.getAttribute("message"),this.classList.add("animate__fadeInRight"),this.getAttribute("variant")&&this.classList.add(this.getAttribute("variant")),this.render()}render(){this.innerHTML=`
      <p>${this._message}</p>
    `,this._hide()}_hide(){setTimeout(()=>{this.classList.add("animate__fadeOut"),setTimeout(()=>{this.remove()},1e3)},2500)}}customElements.define("toast-message",ct);var A,D;class dt{constructor({view:e,model:t}){n(this,A);n(this,D);r(this,A,e),r(this,D,t)}async getBookmarks(){const e=await s(this,D).getBookmarks();s(this,A).renderBookmarks(e)}async deleteBookmark(e){await s(this,D).deleteBookmark(e),s(this,A).showSuccessMessage("Berhasil menghapus dari bookmark"),this.getBookmarks()}async getBookmarkDetail(e){const t=await s(this,D).getBookmark(e);s(this,A).renderBookmarkDetail(t)}}A=new WeakMap,D=new WeakMap;const lt="story-api",ht=1,w="bookmarks";var C,ee;class ut{constructor(){n(this,C)}async toggleBookmark(e){const o=(await d(this,C,ee).call(this)).transaction(w,"readwrite").objectStore(w);return await o.get(e.id)?(await o.delete(e.id),{status:!0,type:"delete"}):(await o.add({id:e.id,name:e.name,photoUrl:e.photoUrl,description:e.description,lat:e.lat,lon:e.lon,createdAt:e.createdAt,savedAt:new Date().toISOString()}),{status:!0,type:"add"})}async getBookmarks(){return await(await d(this,C,ee).call(this)).transaction(w,"readonly").objectStore(w).getAll()}async deleteBookmark(e){await(await d(this,C,ee).call(this)).transaction(w,"readwrite").objectStore(w).delete(e)}async getBookmark(e){return await(await d(this,C,ee).call(this)).transaction(w,"readonly").objectStore(w).get(e)}}C=new WeakSet,ee=async function(){return await Qe(lt,ht,{upgrade(e){e.createObjectStore(w,{keyPath:"id"})}})};const Te=new ut;var F,be,Ue;class mt{constructor(){n(this,be);n(this,F)}async render(){return`
      <section class="width-center" id="bookmark-section">
        <div class="bookmark-header">
            <h2 class="page-title">Bookmark</h2>
        </div>

        <div class="bookmark-posts">
        </div>
      </section>
    `}async afterRender(){r(this,F,new dt({view:this,model:Te})),s(this,F).getBookmarks()}renderBookmarks(e){const t=document.querySelector(".bookmark-posts"),a=document.querySelector(".bookmark-header");if(t.innerHTML="",e.length===0){a.classList.add("hidden"),t.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-bookmark-off"></i>
          <p>Tidak terdapat bookmark yang tersimpan</p>
        </div>
      `;return}e.forEach(o=>{const c=Me(o.createdAt).fromNow();t.insertAdjacentHTML("beforeend",`<div class="card">
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
            <p class="post-text">${Pe(o.description)}</p>
          </a>
        </div>`),d(this,be,Ue).call(this,o.id)})}showSuccessMessage(e){p(e,"success")}}F=new WeakMap,be=new WeakSet,Ue=function(e){const t=document.createElement("button"),a=document.querySelector(`.delete-span-${e}`);t.classList.add("btn-delete"),t.setAttribute("title","Hapus dari bookmark"),t.innerHTML='<i class="ti ti-trash"></i>',a.appendChild(t),t.addEventListener("click",()=>{s(this,F).deleteBookmark(e)})};class pt{static async getStoryDetail(e){try{const a=await(await fetch(`${U}/stories/${e}`,{headers:{...Y,Authorization:`Bearer ${S.getUser().token}`}})).json();if(a.error)throw new Error(a.message);return a.story}catch(t){throw console.error("Error fetching story detail:",t),t}}}var H,ae;class gt{constructor({view:e,model:t}){n(this,H);n(this,ae);r(this,H,e),r(this,ae,t)}async getStoryDetail(e){const t=await Te.getBookmark(e);if(!navigator.onLine&&t){s(this,H).renderStory(t);return}try{const a=await s(this,ae).getStoryDetail(e);s(this,H).renderStory(a)}catch(a){s(this,H).showError(a.message)}}}H=new WeakMap,ae=new WeakMap;var ie,O,ke,_;class ft{constructor(){n(this,ie);n(this,O);n(this,ke);n(this,_,{})}async render(){return $e(),`
      <section class="width-center" id="feed-detail-section">
        <div class="feed-loading">
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p>Memuat cerita...</p>
        </div>
      </section>
    `}async afterRender(){const{id:e}=nt();r(this,ie,new gt({view:this,model:pt})),await s(this,ie).getStoryDetail(e)}initMapLayer(){const e=$.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),t=new pe({apiKey:ge,style:"landscape"}),a=new pe({apiKey:ge,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,_,{Default:e,Satellite:a,Landscape:t})}renderStory(e){const t=document.getElementById("feed-detail-section"),a=Me(e.createdAt).fromNow(),o=t.querySelector(".feed-loading");o&&o.remove(),t.innerHTML=`
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
          <p class="post-text">${Pe(e.description)}</p>

          <div class="location-container">
            <div class="coord-row">
              <i class="ti ti-map-pin"></i>
              <span>${e.lat}, ${e.lon}</span>
            </div>
            <div class="map-container" id="story-map"></div>
          </div>
        </div>
      </div>
    `,this.initMapLayer(),r(this,O,$.map("story-map",{layers:[s(this,_).Default],center:[e.lat,e.lon],zoom:15})),$.control.layers(s(this,_)).addTo(s(this,O)),r(this,ke,$.marker([e.lat,e.lon]).bindPopup(`Latitude: ${e.lat}<br>Longitude: ${e.lon}`).addTo(s(this,O)))}showError(e){const t=document.getElementById("feed-detail-section"),a=t.querySelector(".feed-loading");a&&a.remove(),t.innerHTML=`
      <div class="error-state">
        <i class="ti ti-alert-circle"></i>
        <p>${e}</p>
      </div>
    `}}ie=new WeakMap,O=new WeakMap,ke=new WeakMap,_=new WeakMap;class bt{async fetchData(){const e=await(await fetch(`${U}/stories`,{method:"GET",headers:{...Y,Authorization:`Bearer ${S.getUser().token}`}})).json();return e.error?{status:!1,message:e.message}:{status:!0,data:e.listStory}}}const kt=new bt;var B,oe,j;class vt{constructor({view:e,model:t,bookmarkModel:a}){n(this,B);n(this,oe);n(this,j);r(this,B,e),r(this,oe,t),r(this,j,a)}async getFeed(){const e=await s(this,oe).fetchData();if(!e.status){s(this,B).showErrorMessage();return}e.data.forEach(async t=>{const a=await s(this,j).getBookmark(t.id);t.isBookmarked=!!a,s(this,B).renderFeed(t)})}async toggleBookmark(e){const t=await s(this,j).toggleBookmark(e);if(!t.status){s(this,B).showErrorToast("Gagal menyimpan");return}s(this,B).markAsBookmarked(e.id,t.type)}}B=new WeakMap,oe=new WeakMap,j=new WeakMap;var x;class wt{constructor(){n(this,x)}async render(){return $e(),`
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
    `}async afterRender(){r(this,x,new vt({view:this,model:kt,bookmarkModel:Te})),await s(this,x).getFeed()}renderFeed(e){const t=document.getElementById("feed-section"),a=Me(e.createdAt).fromNow(),o=t.querySelector(".feed-loading");o&&o.remove(),t.insertAdjacentHTML("beforeend",`
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
            <p class="post-text">${Pe(e.description)}</p>
          </a>
        </div>
      `);const c=document.createElement("button"),l=document.querySelector(`.bookmark-span-${e.id}`);c.classList.add("btn-bookmark"),c.setAttribute("title","Simpan ke bookmark"),c.innerHTML=`<i class="ti ti-bookmark${e.isBookmarked?"-filled":""}"></i>`,l.appendChild(c),c.addEventListener("click",()=>{s(this,x).toggleBookmark(e)})}markAsBookmarked(e,t){const a=document.querySelector(`.bookmark-span-${e} > .btn-bookmark`);a.innerHTML=`<i class="ti ti-bookmark${t==="add"?"-filled":""}"></i>`}showEmptyState(){const e=document.getElementById("feed-section"),t=e.querySelector(".feed-loading");t&&t.remove(),e.insertAdjacentHTML("beforeend",`
        <div class="empty-state">
          <i class="ti ti-news-off"></i>
          <p>Belum ada cerita</p>
          <a href="#/post" class="btn primary">Buat Cerita</a>
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
      `),document.getElementById("btn-refresh-feed").addEventListener("click",()=>{s(this,x).getFeed()})}showErrorToast(e){p(e,"danger")}}x=new WeakMap;class yt{async render(){return`
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
    `}async afterRender(){}}class Lt extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}render(){this.innerHTML=`
      <a href="#" class="back-to-home">
        <i class="ti ti-arrow-left"></i>
        <span>Kembali ke Beranda</span>
      </a>
    `}}customElements.define("back-to-home",Lt);var M,G,ve,Ne;class St{constructor({view:e,model:t}){n(this,ve);n(this,M);n(this,G);r(this,M,e),r(this,G,t),d(this,ve,Ne).call(this)}async login(e,t){const a=await s(this,G).login(e,t);if(s(this,M).hideLoading(),!a.status){s(this,M).showErrorMessage(a.message);return}s(this,M).onLoginSuccess()}}M=new WeakMap,G=new WeakMap,ve=new WeakSet,Ne=function(){s(this,G).isLoggedIn()&&s(this,M).onLoginSuccess(!1)};var ne,I,we,Re;class Et{constructor(){n(this,we);n(this,ne);n(this,I)}async render(){return`
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
    `}async afterRender(){r(this,ne,new St({view:this,model:S})),r(this,I,document.getElementById("submit-button")),d(this,we,Re).call(this)}showLoading(){s(this,I).classList.add("loading")}hideLoading(){s(this,I).classList.remove("loading")}onLoginSuccess(e=!0){e&&p("Berhasil masuk!","success"),window.location.href="#/feed"}showErrorMessage(e){p(e,"danger")}}ne=new WeakMap,I=new WeakMap,we=new WeakSet,Re=function(){document.getElementById("login-form").addEventListener("submit",t=>{t.preventDefault(),s(this,I).classList.add("loading");const a=new FormData(t.target);s(this,ne).login(a.get("email"),a.get("password"))})};var y,re,X,Fe,Oe;class Bt extends HTMLElement{constructor(){super();n(this,X);n(this,y);n(this,re);this.classList.add("take-photo-container","hidden"),r(this,re,new Event("closeCamera")),window.addEventListener("popstate",()=>this.closeCamera(!1)),window.addEventListener("beforeunload",()=>this.closeCamera(!1))}async previewCamera(){if(await d(this,X,Fe).call(this),!s(this,y))return p("Tidak dapat mengakses kamera","danger"),!1;this.innerHTML=`
      <video class="video-preview" autoplay>
      </video>

      <button type="button" class="btn danger small video-preview-close" id="close-camera-btn">
        <i class="ti ti-x"></i>
      </button>

      <button type="button" class="btn video-preview-take-photo" id="take-photo-btn"></button>

      <canvas class="hidden" id="photo-result"></canvas>
    `;const t=this.querySelector(".video-preview");return t.srcObject=s(this,y),this.querySelector("#close-camera-btn").addEventListener("click",()=>this.closeCamera()),this.querySelector("#take-photo-btn").addEventListener("click",()=>d(this,X,Oe).call(this)),this.classList.remove("hidden"),!0}closeCamera(t=!0){this.classList.add("hidden"),s(this,y)&&s(this,y).getTracks().forEach(a=>a.stop()),t&&this.dispatchEvent(s(this,re))}}y=new WeakMap,re=new WeakMap,X=new WeakSet,Fe=async function(){try{r(this,y,await navigator.mediaDevices.getUserMedia({video:!0}))}catch{r(this,y,null)}},Oe=function(){const t=this.querySelector("#photo-result"),a=this.querySelector(".video-preview");t.width=a.videoWidth,t.height=a.videoHeight,t.getContext("2d").drawImage(a,0,0,t.width,t.height),t.toBlob(o=>{const c=new File([o],"photo.jpg",{type:"image/jpeg"}),l=new CustomEvent("takePhoto",{detail:{file:c}});this.dispatchEvent(l)})};customElements.define("take-photo",Bt);var z,ce;class Mt{constructor({view:e,model:t}){n(this,z);n(this,ce);r(this,z,e),r(this,ce,t)}async searchLocation(e){const t=await s(this,ce).getGeocode(e);if(!t){s(this,z).showGeocodeError("Gagal mengambil data geocode");return}s(this,z).renderGeocode(t)}}z=new WeakMap,ce=new WeakMap;const Pt="https://nominatim.openstreetmap.org/search";class Tt{async getGeocode(e){try{return await(await fetch(`${Pt}?q=${encodeURIComponent(e)}&format=json`)).json()}catch(t){return console.error("Error fetching geocode:",t),null}}}const qt=new Tt;var g,b,k,V,de,Z,_e,je;class $t extends HTMLElement{constructor(){super();n(this,Z);n(this,g);n(this,b);n(this,k,[-6.208982,106.845172]);n(this,V,{});n(this,de);this.classList.add("pick-location","hidden"),r(this,de,new Mt({view:this,model:qt}))}render(t){this.innerHTML=`
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
    `,this.initMapLayer(),r(this,g,$.map("map",{layers:[s(this,V).Default],center:s(this,k),zoom:15})),$.control.layers(s(this,V)).addTo(s(this,g)),r(this,b,$.marker(s(this,k)).addTo(s(this,g))),this.setCurrentLocation(t),d(this,Z,_e).call(this)}initMapLayer(){const t=$.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),a=new pe({apiKey:ge,style:"landscape"}),o=new pe({apiKey:ge,style:"0196c7d2-afc8-7818-96b0-65b29c17df0d"});r(this,V,{Default:t,Satellite:o,Landscape:a})}setCurrentLocation(t){if(!navigator.geolocation){p("Maaf browser anda tidak mendukung penggunaan lokasi","danger");return}t[0]&&t[1]?(r(this,k,t),s(this,g).setView(s(this,k),15),s(this,b).setLatLng(s(this,k))):navigator.geolocation.getCurrentPosition(a=>{r(this,k,[a.coords.latitude,a.coords.longitude]),s(this,g).setView(s(this,k),15),s(this,b).setLatLng(s(this,k))})}renderGeocode(t){const a=this.querySelector(".result-container"),o=this.querySelector("#geocode-result");if(t.length==1&&(s(this,g).setView([t[0].lat,t[0].lon],15),s(this,b).setLatLng([t[0].lat,t[0].lon])),o.innerHTML="",a.classList.remove("hidden"),t.length===0){o.innerHTML=`
        <div class="empty-state">
          <i class="ti ti-map-pin-off"></i>
          <p>Lokasi tidak ditemukan</p>
        </div>
      `;return}t.forEach(c=>{o.insertAdjacentHTML("beforeend",`<button class="geocode-item" data-lat="${c.lat}" data-lon="${c.lon}">
          <i class="ti ti-map-pin"></i>
          <span class="geocode-item-name">${c.display_name}</span>
        </button>`)}),this.scrollTo({top:133,behavior:"smooth"}),d(this,Z,je).call(this)}showLoadingGeocode(){const t=this.querySelector(".result-container"),a=this.querySelector("#geocode-result");t.classList.remove("hidden"),a.innerHTML=`
      <div class="loading-state">
        <div class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <p>Mencari lokasi...</p>
      </div>
    `}showGeocodeError(t){p(t,"danger")}}g=new WeakMap,b=new WeakMap,k=new WeakMap,V=new WeakMap,de=new WeakMap,Z=new WeakSet,_e=function(){const t=this.querySelector("#geocoding-form"),a=this.querySelector("#close-location-btn"),o=this.querySelector("#cancel-location-btn"),c=this.querySelector("#pick-location-btn"),l=this.querySelector("#my-location-btn"),u=this.querySelector("#search-btn"),E=this.querySelector('input[name="address"]');t.addEventListener("submit",async v=>{v.preventDefault();const h=v.target.address.value;u.disabled=!0,E.disabled=!0,u.querySelector(".ti-search").classList.add("hidden"),u.querySelector(".loading-spinner").classList.remove("hidden"),this.showLoadingGeocode();try{await s(this,de).searchLocation(h)}finally{u.disabled=!1,E.disabled=!1,u.querySelector(".ti-search").classList.remove("hidden"),u.querySelector(".loading-spinner").classList.add("hidden")}}),s(this,g).on("click",v=>{s(this,g).setView(v.latlng,15),s(this,b).setLatLng(v.latlng)}),a.addEventListener("click",()=>{this.classList.add("hidden")}),o.addEventListener("click",()=>{this.classList.add("hidden")}),c.addEventListener("click",()=>{const v=new CustomEvent("pick-location",{detail:{lat:s(this,b).getLatLng().lat,lon:s(this,b).getLatLng().lng}});this.dispatchEvent(v)}),l.addEventListener("click",()=>{this.setCurrentLocation([])})},je=function(){this.querySelectorAll(".geocode-item").forEach(a=>{a.addEventListener("click",o=>{const c=o.target.closest(".geocode-item"),l=c.dataset.lat,u=c.dataset.lon;s(this,g).setView([l,u],15),s(this,b).setLatLng([l,u])})})};customElements.define("pick-location",$t);class At{async createPost(e){const{description:t,photo:a,lat:o,lon:c}=e,l=new FormData;l.append("description",t),l.append("photo",a),l.append("lat",o.toString()),l.append("lon",c.toString());const E=await(await fetch(`${U}/stories`,{method:"POST",headers:{Authorization:`Bearer ${S.getUser().token}`},body:l})).json();return E.error?{status:!1,message:E.message}:{status:!0,message:E.message}}}const Dt=new At;var P,le;class Ct{constructor({view:e,model:t}){n(this,P);n(this,le);r(this,P,e),r(this,le,t)}async createPost({description:e,photo:t,lat:a,lon:o}){s(this,P).showLoading(),(await s(this,le).createPost({description:e,photo:t,lat:a,lon:o})).status?s(this,P).onPostSuccess():s(this,P).onPostError(),s(this,P).hideLoading()}}P=new WeakMap,le=new WeakMap;var T,he,q,J,K,W,m,Ge,te,se;class Ht{constructor(){n(this,m);n(this,T);n(this,he);n(this,q);n(this,J);n(this,K);n(this,W)}get photo(){return s(this,T)}set photo(e){r(this,T,e),d(this,m,te).call(this)}get description(){return s(this,J)}set description(e){r(this,J,e),d(this,m,te).call(this)}get lat(){return s(this,K)}set lat(e){r(this,K,e),d(this,m,te).call(this)}get lon(){return s(this,W)}set lon(e){r(this,W,e),d(this,m,te).call(this)}async render(){return`
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
    `}async afterRender(){r(this,he,new Ct({view:this,model:Dt})),r(this,q,document.querySelector("take-photo")),d(this,m,Ge).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onPostSuccess(){p("Post berhasil dibagikan","success"),window.location.href="#/feed"}onPostError(){p("Gagal membagikan post","danger")}}T=new WeakMap,he=new WeakMap,q=new WeakMap,J=new WeakMap,K=new WeakMap,W=new WeakMap,m=new WeakSet,Ge=function(){const e=document.querySelector("#take-photo-btn"),t=document.querySelector("#upload-btn"),a=document.querySelector(".photo-preview-close"),o=document.querySelector("#photo-input"),c=document.querySelector("#description"),l=document.querySelector("#location-btn"),u=document.querySelector("pick-location"),E=document.querySelector("#location-btn-text"),v=document.querySelector("#post-form");e.addEventListener("click",async h=>{h.preventDefault();const Je=await s(this,q).previewCamera();d(this,m,se).call(this,!Je)}),t.addEventListener("click",h=>{h.preventDefault(),o.click()}),a.addEventListener("click",()=>{this.photo=null}),l.addEventListener("click",h=>{u.classList.remove("hidden"),u.render([this.lat,this.lon])}),s(this,q).addEventListener("closeCamera",()=>{d(this,m,se).call(this,!0)}),s(this,q).addEventListener("takePhoto",h=>{this.photo=h.detail.file}),o.addEventListener("change",h=>{this.photo=h.target.files[0]}),c.addEventListener("input",h=>{this.description=h.target.value.trim()}),u.addEventListener("pick-location",h=>{this.lat=h.detail.lat,this.lon=h.detail.lon,E.textContent=`${this.lat}, ${this.lon}`,u.classList.add("hidden")}),v.addEventListener("submit",h=>{h.preventDefault(),s(this,he).createPost({description:this.description,photo:this.photo,lat:this.lat,lon:this.lon})})},te=function(){const e=document.querySelector(".photo-preview"),t=document.querySelector(".photo-preview-img"),a=document.querySelector('#post-form button[type="submit"]');s(this,T)?(s(this,q).closeCamera(!1),t.src=URL.createObjectURL(s(this,T)),e.classList.remove("hidden"),d(this,m,se).call(this,!1)):(t.src="",d(this,m,se).call(this,!0),e.classList.add("hidden")),a.disabled=!(s(this,T)&&s(this,J)&&s(this,K)&&s(this,W))},se=function(e){document.querySelectorAll(".btn-upload").forEach(a=>a.classList.toggle("hidden",!e))};var L,Q,ye,ze;class xt{constructor({view:e,model:t}){n(this,ye);n(this,L);n(this,Q);r(this,L,e),r(this,Q,t),d(this,ye,ze).call(this)}async register(e,t,a){s(this,L).showLoading();const o=await s(this,Q).register(e,t,a);if(s(this,L).hideLoading(),!o.status){s(this,L).onRegisterError();return}s(this,L).onRegisterSuccess()}}L=new WeakMap,Q=new WeakMap,ye=new WeakSet,ze=function(){s(this,Q).isLoggedIn()&&s(this,L).onRegisterSuccess(!1)};var ue,Le,Ve;class It{constructor(){n(this,Le);n(this,ue)}async render(){return`
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
    `}async afterRender(){r(this,ue,new xt({view:this,model:S})),d(this,Le,Ve).call(this)}showLoading(){document.querySelector('button[type="submit"]').classList.add("loading")}hideLoading(){document.querySelector('button[type="submit"]').classList.remove("loading")}onRegisterSuccess(e=!0){e&&p("Berhasil mendaftar, silahkan login!","success"),window.location.href="#/login"}onRegisterError(){p("Gagal mendaftar, silahkan coba lagi!","danger")}}ue=new WeakMap,Le=new WeakSet,Ve=function(){document.getElementById("register-form").addEventListener("submit",t=>{t.preventDefault();const a=new FormData(t.target);s(this,ue).register(a.get("name"),a.get("email"),a.get("password"))})};const Ut={"/":()=>new yt,"/login":()=>new Et,"/register":()=>new It,"/feed":()=>new wt,"/feed/:id":()=>new ft,"/post":()=>new Ht,"/bookmarks":()=>new mt};var me;class Nt{constructor({content:e}){n(this,me);r(this,me,e)}async renderPage(){const e=xe(),t=Ut[e],a=t();if(!document.startViewTransition){this._render(a);return}document.startViewTransition(async()=>{document.documentElement.style.viewTransitionName=e,this._render(a)})}async _render(e){s(this,me).innerHTML=await e.render(),await e.afterRender()}}me=new WeakMap;document.addEventListener("DOMContentLoaded",async()=>{const i=document.querySelector("#content"),e=document.querySelector("app-navbar"),t=new Nt({content:i});await t.renderPage(),window.addEventListener("hashchange",async()=>{await t.renderPage(),e.render()})});
