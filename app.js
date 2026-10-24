/* Tracker de visitas (anónimo) → Supabase (RPC registrar_visita). No guarda IP ni datos personales:
   solo un id aleatorio por navegador, la página, el origen y el tipo de dispositivo. Aparece en el widget de tráfico del CRM. */
(function () {
  var SUPABASE_URL = "https://ypudvitlqobnfpqdrbby.supabase.co";
  var SUPABASE_KEY = "sb_publishable_2dwNHlj0GpRZcoO6LSwcAg_oEYvoA0b"; // clave pública (la misma de api.js)
  var APP = "web";            // nombre con el que aparece en la gráfica del CRM
  var TRACK_LOCAL = false;    // true para probar desde localhost / 127.0.0.1
  try {
    if (!TRACK_LOCAL && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) return;
    if (navigator.doNotTrack === "1") return; // respeta "No rastrear"
    if (/bot|crawl|spider|headless|lighthouse/i.test(navigator.userAgent)) return;
    var vid;
    try {
      vid = localStorage.getItem("ep_vid");
      if (!vid) {
        vid = window.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 12);
        localStorage.setItem("ep_vid", vid);
      }
    } catch (e) { vid = "sin-storage-" + Math.random().toString(36).slice(2, 12); }
    var w = window.innerWidth || 1200;
    var device = w < 768 ? "movil" : w < 1100 ? "tablet" : "escritorio";
    var ref = "";
    try { ref = document.referrer && new URL(document.referrer).origin !== location.origin ? document.referrer : ""; } catch (e) {}
    fetch(SUPABASE_URL + "/rest/v1/rpc/registrar_visita", {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
      body: JSON.stringify({ p_app: APP, p_path: (location.pathname + location.hash).slice(0, 300), p_visitor: vid, p_referrer: ref.slice(0, 300) || null, p_device: device }),
    }).catch(function () {});
  } catch (e) { /* el tracker nunca debe romper la página */ }
})();
"scrollRestoration"in history&&(history.scrollRestoration="manual");const $=e=>document.querySelector(e),$$=e=>[...document.querySelectorAll(e)];const EP_IS_MOBILE=matchMedia("(max-width:820px) and (pointer:coarse)").matches;!function(){const e={Numpad0:"0",Numpad1:"1",Numpad2:"2",Numpad3:"3",Numpad4:"4",Numpad5:"5",Numpad6:"6",Numpad7:"7",Numpad8:"8",Numpad9:"9",NumpadDecimal:".",NumpadAdd:"+",NumpadSubtract:"-",NumpadMultiply:"*",NumpadDivide:"/"};function t(e){if(!e)return!1;if("TEXTAREA"===e.tagName)return!e.disabled&&!e.readOnly;if(e.isContentEditable)return!0;if("INPUT"===e.tagName){return!["checkbox","radio","button","submit","file","range","color","image","reset"].includes(e.type)&&!e.disabled&&!e.readOnly}return!1}document.addEventListener("keydown",function(a){const i=document.activeElement;if("NumpadEnter"===a.code)return void(t(i)&&"INPUT"===i.tagName&&i.form&&(a.preventDefault(),"function"==typeof i.form.requestSubmit?i.form.requestSubmit():i.form.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))));const s=e[a.code];if(!s||!t(i))return;if(a.key===s)return;a.preventDefault();const n=null!=i.selectionStart?i.selectionStart:i.value.length,o=null!=i.selectionEnd?i.selectionEnd:i.value.length,r=i.value;i.value=r.slice(0,n)+s+r.slice(o),i.selectionStart=i.selectionEnd=n+s.length,i.dispatchEvent(new Event("input",{bubbles:!0}))},!0)}();const KEY="escritorio.publico.formulario-requisitos.v1",LEGACY_SHARED_KEY="escritorio.publico.v1",WA_NUM="529813836271",DEFAULT_REQ_NOTE="📋 Ningún dato se guarda en el navegador de terceros: solo viaja dentro del mensaje de WhatsApp.",DURATION_OPTIONS=[{key:"1m",months:1,label:"1 Mes"},{key:"2m",months:2,label:"2 Meses"},{key:"3m",months:3,label:"3 Meses"},{key:"4m",months:4,label:"4 Meses"},{key:"6m",months:6,label:"6 Meses"},{key:"12m",months:12,label:"12 Meses"}],EMOJIS=["🦊","🐼","🐸","🦄","🐙","🦋","🌵","🚀","🌙","⚡","🍋","🫧","🐶","🐱","🐭","🐹","🐰","🐻","🐨","🐯","🦁","🐮","🐷","🐵","🐔","🐧","🐦","🦉","🦅","🦆","🐺","🐗","🐴","🐝","🐞","🐢","🐍","🦎","🐊","🐳","🐬","🦈","🐠","🦀","🦞","🦑","🐘","🦒","🦓","🦘","🦥","🦦","🦔","🦜","🦩","🦚","🦢","🐲","🦖","🌸","🌻","🌹","🌴","🍀","🍁","🌈","☀️","⭐","🔥","❄️","🌊","🌎","🪐","☄️","🌟","💎","👑","🎯","🎮","🎧","🎸","🎨","📚","💡","🔮","🧩","🏆","⚽","🏀","🎲","🍕","🍔","🌮","🍩","🍪","🍓","🍉","🍍","🥑","🍒","🍇","☕","🧋","🍿","😎","🤓","🥳","😺","🤖","👻","👽","🎃","🤠","🥷","🧙","🧛","🧞","🦸"],hash=e=>{const t="prisma·"+e;let a=5381;for(let e=0;e<t.length;e++)a=(a<<5)+a^t.charCodeAt(e),a>>>=0;return a.toString(36)+"."+t.length},uid=()=>Math.random().toString(36).slice(2,9),defPrefs=()=>({theme:"random",blur:22,motion:!0,cats:{music:!0,services:!0,actions:!0,informatica:!0},recents:[],themeLocks:{}}),roleLabel=e=>"admin"===e?"👑 Admin":"subadmin"===e?"🛡️ Subadmin":"guest"===e?"🙂 Invitado":"👤 Estándar",roleIcon=e=>"admin"===e?" 👑":"subadmin"===e?" 🛡️":"",isGuest=()=>me()&&"guest"===me().role,priceForRole=e=>{if(isGuest())return e.price;const t=me()&&me().role;return"subadmin"===t||"admin"===t?null!=e.price3&&""!==e.price3?e.price3:e.price2:null!=e.price2&&""!==e.price2?e.price2:e.price},searchStdPrice=e=>e.price,canEdit=()=>false;document.addEventListener("click",e=>{const t=e.target.closest(".pw-toggle");if(!t)return;const a=document.getElementById(t.dataset.pwFor);if(!a)return;const i="password"===a.type;a.type=i?"text":"password",t.textContent=i?"🙈":"👁️",t.title=i?"Ocultar contraseña":"Mostrar contraseña"});const canSeeCodigo=()=>{const e=me()&&me().role;return"admin"===e||!!(db.streamVis&&db.streamVis.codigo&&db.streamVis.codigo[e])},STREAM_VIS_DEFAULTS={reporte:{subadmin:!0,user:!1,guest:!1},codigo:{subadmin:!0,user:!1,guest:!1},registros:{subadmin:!0,user:!1,guest:!1}},canSeeAccesos=()=>{const e=me()&&me().role;return"guest"!==e&&"user"!==e&&("admin"===e||!(!db.accVis||!db.accVis.subadmin))};function codeFor(e){const t=(db.code||"MURCIELAGO").toUpperCase();return String(e).split("").map(e=>/\d/.test(e)&&t[+e]||e).join("")}function numFromCode(e){const t=(db.code||"MURCIELAGO").toUpperCase();return String(e).toUpperCase().split("").map(e=>{const a=t.indexOf(e);return a>-1?String(a):e}).join("")}function renderMurc(){const e=me()&&me().role,t=("admin"===e||"subadmin"===e)&&!(!db.murcTool||!db.murcTool[e]);if($("#murc-block").classList.toggle("hidden",!t),!t)return;const a=(db.code||"MURCIELAGO").toUpperCase();$("#murc-word").textContent=a,$("#murc-map").innerHTML=[...a].map((e,t)=>`<span><b>${e}</b>=${t}</span>`).join("")}const p2of=e=>Math.max(10,Math.round(.8*e)),p3of=e=>Math.max(10,Math.round(.65*e)),SRV_ICONS=["🧾","📄","📋","🆔","💳","📅","💰","💵","🔑","🔒","🔓","✅","🏢","🎓","⚡","🔍","📊","🏥","💍","👶","📜","🕊","📁","📂","🪪","📇","🖨","☎️","📱","✉️","🌐","💡","🔌","🚰","🚗","🏠","💼","⚖️","🖋","📮","🧮","🩺","💒","🏷"],SRV_ICON_MAP=[[/RFC PERSONA F[IÍ]SICA/,"🆔"],[/RFC PERSONA MORAL/,"🏢"],[/RFC SOLO CON LA CURP/,"🆔"],[/^CITAS?$/,"📅"],[/N[OÓ]MINA/,"💵"],[/CUMPLIMIENTO/,"✅"],[/CERTIFICADOS DIGITALES/,"🔒"],[/LOCALIZAR ?ID ?CIF/i,"🔍"],[/^SOLO RFC$/,"🆔"],[/LOCALIZACI[OÓ]N DE NSS/,"🔍"],[/SEMANAS COTIZADAS/,"📊"],[/VIGENCIA DE DERECHOS/,"🏥"],[/NO DERECHOHABIENTE/,"📋"],[/^CURP$/,"🆔"],[/^CFE$/,"⚡"],[/ACTA DE NACIMIENTO/,"👶"],[/ACTA DE DEFUNCI[OÓ]N/,"🕊"],[/ACTA DE MATRIMONIO/,"💍"],[/ACTA DE DIVORCIO/,"📜"],[/ANTECEDENTES NO PENALES/,"📜"],[/CR[EÉ]DITO/,"💳"],[/INEA|BACHILLERATO/,"🎓"],[/AFORE/,"💰"],[/CONTRASE[ÑN]A/,"🔑"],[/DESBLOQUEO/,"🔓"],[/HISTORIAL LABORAL/,"📁"]];function defaultSrvIcon(e){const t=(e||"").toUpperCase();for(const[e,a]of SRV_ICON_MAP)if(e.test(t))return a;return"🧾"}const INFO_GROUP_ORDER=[/office\s*365/i,/instalaci[oó]n\s*office.*windows/i,/instalaci[oó]n\s*office.*mac/i,/instalaci[oó]n\s*windows/i,/programas/i,/soporte/i,/juegos/i,/pelicula/i];function applyInformaticaOrder(){const e=e=>{const t=INFO_GROUP_ORDER.findIndex(t=>t.test(e||""));return-1===t?INFO_GROUP_ORDER.length:t};db.informatica=db.informatica.map((t,a)=>({it:t,i:a,r:e(t.grupo||t.title)})).sort((e,t)=>e.r-t.r||e.i-t.i).map(e=>e.it)}const COVER=[["#ff6ec7","#8b5cf6"],["#38b6ff","#4f6dff"],["#2fe0c0","#12b5a5"],["#ffb347","#ff6b5e"],["#9d8cff","#5e7bff"],["#7cf5d4","#38b6ff"]],COVER_MAP={n1:["#000000","#831010"],n4:["#1a0a2e","#4a1d6a"],n5:["#0e1a3a","#1a3a7a"],n6:["#0f1419","#1a2a3a"],n7:["#000000","#333333"],n8:["#0a0a0a","#f47521"],n10:["#0064ff","#003087"],n11:["#0a0a0a","#1db954"],n12:["#1a0000","#cc0000"],n2:["#0d0d0d","#5c3a00"],n3:["#0d0d0d","#5c4200"],n21:["#1a1030","#3d1f6b"],n22:["#0f0d05","#5c4300"],n19:["#0a0a0a","#2b2b2b"],n16:["#0a1f0a","#107c10"],gfrc0ef:["#f5f5f5","#d4d4d4"],"0s8bl19":["#ff6a00","#c43e00"],j0o20p2:["#ff6a00","#c43e00"]},COVER_BY_NAME={"game pass":["#0a1f0a","#107c10"],"xbox game pass":["#0a1f0a","#107c10"],mubi:["#f5f5f5","#d4d4d4"],"magis tv":["#ff6a00","#c43e00"],"office 365":["#ff6a00","#c43e00"],office365:["#ff6a00","#c43e00"]},SVG_ICONS={netflix:{label:"Netflix",glyph:"📺",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Netflix"><text x="30" y="42" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="40" font-weight="900" fill="#e50914">N</text></svg>'},youtube:{label:"YouTube",glyph:"📹",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="YouTube Premium"><rect x="6" y="12" width="48" height="36" rx="10" fill="#ff0033"/><path d="M26 21l16 9-16 9z" fill="#fff"/></svg>'},spotify:{label:"Spotify",glyph:"🎵",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Spotify"><circle cx="30" cy="30" r="22" fill="#1ed760"/><path d="M18 24c9-3 19-2 26 1M19 31c8-2 17-1 24 2M21 38c6-1 13 0 18 2" fill="none" stroke="#07110a" stroke-width="3.4" stroke-linecap="round"/></svg>'},paramount:{label:"Paramount+",glyph:"🎥",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Paramount Plus"><circle cx="30" cy="29" r="21" fill="none" stroke="#69aefc" stroke-width="2.6"/><path d="M17 37 30 15l13 22" fill="none" stroke="#69aefc" stroke-width="3.6"/></svg>'},crunchyroll:{label:"Crunchyroll",glyph:"🎌",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Crunchyroll"><circle cx="30" cy="30" r="19" fill="#f47521"/><path d="M22 40c11-1 17-8 17-18-9 2-15 8-17 18Z" fill="#111722"/></svg>'},appletv:{label:"Apple TV+",glyph:"🍎",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Apple TV Plus"><rect x="4" y="4" width="52" height="52" rx="14" fill="#000"/><text x="30" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-size="24" font-weight="800" fill="#fff">tv</text></svg>'},emby:{label:"Emby",glyph:"📡",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Emby"><rect x="4" y="4" width="52" height="52" rx="14" fill="#0d2436"/><text x="30" y="40" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="28" font-weight="900" fill="#52b5e8">e</text></svg>'},applemusic:{label:"Apple Music",glyph:"🎶",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Apple Music"><rect x="4" y="4" width="52" height="52" rx="14" fill="#fa2d48"/><text x="30" y="40" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#fff">♫</text></svg>'},picsart:{label:"PicsArt",glyph:"🎨",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Picsart"><circle cx="30" cy="29" r="20" fill="none" stroke="#fff" stroke-width="5.5"/><circle cx="30" cy="29" r="5.5" fill="#fff"/></svg>'},plex:{label:"Plex",glyph:"📀",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Plex"><path d="M15 11h30L31 27l14 17H15l13-17z" fill="#e5a11b"/></svg>'},deezer:{label:"Deezer Music",glyph:"🎧",svg:'<svg viewBox="0 0 60 60" aria-label="Deezer Music" role="img"><rect x="4" y="4" width="52" height="52" rx="14" fill="#1a1030"/><rect x="11.5" y="36" width="7" height="10" rx="1.5" fill="#a7d9ff"/><rect x="21.5" y="30" width="7" height="16" rx="1.5" fill="#70b9ff"/><rect x="31.5" y="24" width="7" height="22" rx="1.5" fill="#3d91ff"/><rect x="41.5" y="18" width="7" height="28" rx="1.5" fill="#8b5cf6"/></svg>'},pornhub:{label:"Pornhub Premium",glyph:"🔞",svg:'<svg viewBox="0 0 60 60" aria-label="Pornhub Premium" role="img"><rect x="4" y="4" width="52" height="52" rx="14" fill="#ff9000"/><text x="30" y="41" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#111">P</text></svg>'},brazzers:{label:"Brazzers Premium",glyph:"🔞",svg:'<svg viewBox="0 0 60 60" aria-label="Brazzers Premium" role="img"><rect x="4" y="4" width="52" height="52" rx="14" fill="#0d0d0d"/><text x="30" y="41" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="34" font-weight="900" fill="#f3b21b">B</text></svg>'},windows:{label:"Windows",glyph:"🪟",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Windows"><g fill="#00A4EF"><rect x="5" y="5" width="23" height="23" rx="2"/><rect x="32" y="5" width="23" height="23" rx="2"/><rect x="5" y="32" width="23" height="23" rx="2"/><rect x="32" y="32" width="23" height="23" rx="2"/></g></svg>'},office365:{label:"Office 365",glyph:"📎",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Office 365"><rect x="4" y="4" width="24" height="24" rx="4" fill="#2B579A"/><text x="16" y="21" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">W</text><rect x="32" y="4" width="24" height="24" rx="4" fill="#217346"/><text x="44" y="21" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">X</text><rect x="4" y="32" width="24" height="24" rx="4" fill="#D24726"/><text x="16" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">P</text><rect x="32" y="32" width="24" height="24" rx="4" fill="#0078D4"/><text x="44" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">O</text></svg>'},windowsoffice:{label:"Windows + Office",glyph:"🪟",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Windows mas Office"><g fill="#00A4EF" transform="translate(0,0) scale(0.40)"><rect x="5" y="5" width="23" height="23" rx="2"/><rect x="32" y="5" width="23" height="23" rx="2"/><rect x="5" y="32" width="23" height="23" rx="2"/><rect x="32" y="32" width="23" height="23" rx="2"/></g><text x="29" y="34" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="900" fill="currentColor" opacity=".85">+</text><g transform="translate(35,35) scale(0.40)"><rect x="4" y="4" width="24" height="24" rx="4" fill="#2B579A"/><text x="16" y="21" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">W</text><rect x="32" y="4" width="24" height="24" rx="4" fill="#217346"/><text x="44" y="21" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">X</text><rect x="4" y="32" width="24" height="24" rx="4" fill="#D24726"/><text x="16" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">P</text><rect x="32" y="32" width="24" height="24" rx="4" fill="#0078D4"/><text x="44" y="49" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="800" fill="#fff">O</text></g></svg>'},mac:{label:"macOS",glyph:"🍎",svg:'<svg viewBox="0 0 384 512" role="img" aria-label="macOS"><path fill="#e5e5e7" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>'},gamepad:{label:"Videojuegos",glyph:"🎮",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Videojuegos"><path d="M17 20h26c7 0 12 6 13 13l1 9c.6 5-3 9-7 9-3 0-5-1.6-7-4l-3-4H24l-3 4c-2 2.4-4 4-7 4-4 0-7.6-4-7-9l1-9c1-7 6-13 13-13z" fill="#9aa4bb"/><rect x="14" y="28" width="10" height="3.2" rx="1.4" fill="#fff"/><rect x="17.4" y="24.6" width="3.2" height="10" rx="1.4" fill="#fff"/><circle cx="44" cy="26" r="3" fill="#ff6ec7"/><circle cx="38" cy="32" r="3" fill="#8b5cf6"/></svg>'},gamepass:{label:"Xbox Game Pass",glyph:"🎮",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Xbox Game Pass"><rect x="4" y="4" width="52" height="52" rx="14" fill="#107C10"/><path d="M14 30c0-3.5 1-6.5 3-9 1.4-1.7 3.4-1 4.6.6L26 27h8l4.4-5.4c1.2-1.6 3.2-2.3 4.6-.6 2 2.5 3 5.5 3 9 0 5.2-1 10-3 14-1 2-3.5 2.6-5.2.8L33 36h-6l-4.8 8.8c-1.7 1.8-4.2 1.2-5.2-.8-2-4-3-8.8-3-14Z" fill="#fff"/><circle cx="21" cy="24" r="2.4" fill="#107C10"/><circle cx="39" cy="24" r="2.4" fill="#107C10"/></svg>'},vix:{label:"Vix",glyph:"📺",svg:'<svg viewBox="0 0 60 60" role="img" aria-label="Vix"><rect x="4" y="4" width="52" height="52" rx="14" fill="#ff6a00"/><text x="30" y="41" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-size="26" font-weight="900" fill="#fff">vix</text></svg>'}},TITLE_ICON_MAP=[[/netflix/i,"svg:netflix"],[/youtube/i,"svg:youtube"],[/spotify/i,"svg:spotify"],[/paramount/i,"svg:paramount"],[/crunchyroll/i,"svg:crunchyroll"],[/apple\s*tv/i,"svg:appletv"],[/\bemby\b/i,"svg:emby"],[/apple\s*music/i,"svg:applemusic"],[/pics?\s*art/i,"svg:picsart"],[/\bplex\b/i,"svg:plex"],[/\bvix\b/i,"svg:vix"],[/deezer/i,"svg:deezer"],[/porn\s*hub/i,"svg:pornhub"],[/brazzers/i,"svg:brazzers"],[/hbo/i,"if:simple-icons:hbo"],[/disney/i,"if:simple-icons:disneyplus"],[/prime\s*video/i,"if:simple-icons:primevideo"],[/game\s*pass/i,"svg:gamepass"],[/duolingo/i,"if:simple-icons:duolingo"],[/cap\s*cut/i,"if:simple-icons:capcut"],[/canva/i,"if:simple-icons:canva"]];function iconifyBase(){return(db&&db.iconifyApi||"https://api.iconify.design").replace(/\/+$/,"")}function iconifyUrl(e){const t=e.indexOf(":"),a=t>-1?e.slice(0,t):e,i=t>-1?e.slice(t+1):"";return`${iconifyBase()}/${a}/${i}.svg`}function iconHTML(e){if(e&&e.startsWith("svg:")){const t=SVG_ICONS[e.slice(4)];if(t)return`<span class="svc-svg svc-svg-inline">${t.svg}</span>`}if(e&&e.startsWith("if:")){const t=e.slice(3);return`<span class="svc-svg svc-svg-inline"><img src="${esc(iconifyUrl(t))}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:contain"></span>`}if(e&&/^(https?:)?\/\/|^data:image\//i.test(e))return`<img class="cover-img" src="${esc(e)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">`;return esc(e||"")}function iconGlyph(e){if(e&&e.startsWith("svg:")){const t=SVG_ICONS[e.slice(4)];if(t)return t.glyph}return e&&(e.startsWith("if:")||/^(https?:)?\/\/|^data:image\//i.test(e))?"🖼️":e||""}function autoUpgradeStreamingIcons(){let e=!1;return(db.streaming||[]).forEach(t=>{const a=TITLE_ICON_MAP.find(([e])=>e.test(t.title));!a||t.icon===a[1]||t.icon.startsWith("if:")||t.icon.startsWith("svg:")||(t.icon=a[1],e=!0)}),e}const CREATIVIDAD_PROD_IDS=new Set(["n17","n18","n19","n20","cyc022z"]),CREATIVIDAD_PROD_RX=/picsart|duolingo|capcut|canva|chatgpt|notion|grammarly|midjourney|office ?365|photoshop|illustrator|premiere/i;function ensureStreamCategories(){Array.isArray(db.streamCats)||(db.streamCats=[]);let e=db.streamCats.find(e=>norm(e.name)===norm("Streaming"));e||(e={id:uid(),name:"Streaming"},db.streamCats.unshift(e));let t=db.streamCats.find(e=>norm(e.name)===norm("Creatividad y Productividad"));t||(t={id:uid(),name:"Creatividad y Productividad"},db.streamCats.push(t)),(db.streaming||[]).forEach(a=>{if(a.catId)return;const i=CREATIVIDAD_PROD_IDS.has(a.id)||CREATIVIDAD_PROD_RX.test(a.title||"");a.catId=i?t.id:e.id})}function readEmbeddedDb(){try{const e=$("#ep-embedded-db").textContent.trim();if(!e||"null"===e)return null;const t=JSON.parse(e);return t&&Array.isArray(t.users)?t:null}catch(e){return null}}function normalizeCodigoMsg(e){if("string"!=typeof e||!e.includes("{codigo}"))return e;if(/\(\s*c[oó]digo\s*:\s*\{codigo\}\s*\)/i.test(e))return e;let t=e.replace(/\s*\{codigo\}/g,"").replace(/\s*con\s*codigo\s*:\s*/gi," ");return t=t.includes("{titulo}")?t.replace("{titulo}","{titulo} (código: {codigo})"):t.trim()+" (código: {codigo})",t.replace(/\s{2,}/g," ")}let db;function load(){try{db=JSON.parse(localStorage.getItem(KEY))}catch(e){}const e=readEmbeddedDb();if(!e||!e.savedAt||db&&db.users&&db.users.length&&db.savedAt&&!(e.savedAt>db.savedAt)||(db=e,localStorage.setItem(KEY,JSON.stringify(db))),!db||!db.users||!db.users.length){let t=null;try{t=JSON.parse(localStorage.getItem(LEGACY_SHARED_KEY))}catch(e){}db=t&&t.users&&t.users.length?t:e||seed(),localStorage.setItem(KEY,JSON.stringify(db))}if(db.users.forEach((e,t)=>{e.role||(e.role=0===t?"admin":"user"),"Sofía"===e.name&&(e.name="Izra"),e.username||(e.username=e.name),e.prefs&&e.prefs.cats&&void 0===e.prefs.cats.services&&(e.prefs.cats.services=!0),e.prefs&&e.prefs.cats&&void 0===e.prefs.cats.informatica&&(e.prefs.cats.informatica=!0),e.prefs&&!e.prefs.themeLocks&&(e.prefs.themeLocks={})}),Array.isArray(db.streaming)&&db.streaming.length&&void 0!==db.streaming[0].price||(db.streaming=[]),db.streaming.forEach(e=>{void 0===e.price2&&(e.price2=p2of(e.price)),void 0===e.price3&&(e.price3=p3of(e.price))}),db.streaming.forEach(e=>{e.durations&&"object"==typeof e.durations||(e.durations={}),DURATION_OPTIONS.forEach(t=>{e.durations[t.key]||(e.durations[t.key]={enabled:!1,price:null})})}),Array.isArray(db.streamCats)||(db.streamCats=[]),autoUpgradeStreamingIcons(),ensureStreamCategories(),(db.streaming||[]).forEach(e=>{"if:token:vix"===e.icon&&(e.icon="svg:vix")}),Array.isArray(db.servicios)||(db.servicios=[]),Array.isArray(db.documentos)||(db.documentos=[]),db.waNum||(db.waNum=WA_NUM),db.servicios.forEach(e=>e.items.forEach(e=>{void 0===e.disponible&&(e.disponible=!0),e.checklist||"constancia rfc"!==norm(e.title)||(e.checklist="Tengo una foto de mi CSF"),e.checklist||"hjo7vdn"!==e.id||(e.checklist="Tengo foto de mi CFE antiguo"),e.checklist||"w93meaw"!==e.id||(e.checklist="Tengo foto antigua")})),Array.isArray(db.informatica)||(db.informatica=[]),db.informatica.forEach(e=>{void 0===e.disponible&&(e.disponible=!0),e.grupo||(e.grupo=e.title)}),!db._migInformatica){const e=db.servicios.findIndex(e=>norm(e.name).includes("informatica"));if(e>-1){db.servicios[e].items.forEach(e=>{db.informatica.some(t=>norm(t.title)===norm(e.title)&&norm(t.sub||"")===norm(e.sub||""))||db.informatica.push({id:uid(),grupo:e.title,title:e.title,sub:e.sub||"",price:e.price??null,disponible:!1!==e.disponible})}),db.servicios.splice(e,1)}db._migInformatica=!0}applyInformaticaOrder(),Array.isArray(db.accesos)||(db.accesos=[]),Array.isArray(db.registros)||(db.registros=[]),Array.isArray(db.ventas)||(db.ventas=[]),db.waMsgs||(db.waMsgs={servicio:"HOLA, QUIERO EL SERVICIO {titulo} DE ${precio} (CODIGO: {codigo}) EN _ESCRITORIO PUBLICO_"}),db.waMsgs.streaming||(db.waMsgs.streaming="HOLA, TIENE EL SERVICIO {titulo} DE ${precio} (CÓDIGO: {codigo}) EN _ESCRITORIO PUBLICO_"),function(){const e=/\bESCRITORIO P[UÚ]BLICO\b/;["servicio","streaming"].forEach(t=>{db.waMsgs[t]&&e.test(db.waMsgs[t])&&(db.waMsgs[t]=db.waMsgs[t].replace(e,"_ESCRITORIO PUBLICO_"))}),(db.streaming||[]).forEach(t=>{[t.msg0,t.msg1,t.msg2].forEach(t=>{t&&t.text&&e.test(t.text)&&(t.text=t.text.replace(e,"_ESCRITORIO PUBLICO_"))})})}(),function(){db.waMsgs.streaming&&(db.waMsgs.streaming=db.waMsgs.streaming.replace(/\{precio2\}/g,"{precio}"));const e=e=>normalizeCodigoMsg(e);["servicio","streaming"].forEach(t=>{db.waMsgs[t]&&(db.waMsgs[t]=e(db.waMsgs[t]))});const t=t=>{[t.msg0,t.msg1,t.msg2].forEach(t=>{t&&t.text&&(t.text=e(t.text))})};(db.streaming||[]).forEach(t2=>t(t2)),(db.servicios||[]).forEach(e=>{(e.items||[]).forEach(e=>t(e))}),(db.informatica||[]).forEach(e=>t(e))}(),db.streamVis?["reporte","codigo","registros"].forEach(e=>{const t=STREAM_VIS_DEFAULTS[e],a=db.streamVis[e];"boolean"==typeof a?db.streamVis[e]={subadmin:!0,user:a,guest:a}:a&&"object"==typeof a?(void 0===a.subadmin&&(a.subadmin=t.subadmin),void 0===a.user&&(a.user=t.user),void 0===a.guest&&(a.guest=t.guest)):db.streamVis[e]={...t}}):db.streamVis={reporte:{...STREAM_VIS_DEFAULTS.reporte},codigo:{...STREAM_VIS_DEFAULTS.codigo},registros:{...STREAM_VIS_DEFAULTS.registros}},db.accVis||(db.accVis={admin:!0,subadmin:!1,user:!1}),db.seguridad?(void 0===db.seguridad.rightclick&&(db.seguridad.rightclick=!0),void 0===db.seguridad.soloMovil&&(db.seguridad.soloMovil=!0)):db.seguridad={rightclick:!0,soloMovil:!0},db.anuncio||(db.anuncio={text:"✨ Bienvenido a Escritorio Público . 🤝 Te acompañamos paso a paso y de la mano, para que todo sea fácil, claro y seguro.",by:"Sistema",fecha:Date.now()}),db.auth||(db.auth={fails:0,until:0}),db.code||(db.code="MURCIELAGO"),db.iconifyApi||(db.iconifyApi="https://api.iconify.design"),db.murcTool&&"object"==typeof db.murcTool?(void 0===db.murcTool.admin&&(db.murcTool.admin=!0),void 0===db.murcTool.subadmin&&(db.murcTool.subadmin=!1)):db.murcTool={admin:!0,subadmin:!1},db.negocio||(db.negocio={version:"2.4",direccion:"Calle 9 entre 16 y 18, Col. La Playa, Champotón, Campeche",tel:"9813836271",mapsUrl:"https://maps.app.goo.gl/ZWBpjFfNnL1Sdgj89",hLV:"10:00 a.m. a 5:00 p.m.",hSab:"10:00 a.m. a 4:30 p.m.",hDom:"No laboramos",conocenos:"ESCRITORIO PÚBLICO es un servicio independiente de gestoría, contabilidad, informática y soluciones digitales, enfocado en facilitar trámites y ofrecer soluciones prácticas para el día a día. \nBrindamos atención personalizada en trámites administrativos y fiscales, servicios contables, soporte y mantenimiento informático, programación, desarrollo y diseño de sitios web y herramientas digitales."}),db.negocio&&!db.negocio.conocenos&&(db.negocio.conocenos="ESCRITORIO PÚBLICO es un servicio independiente de gestoría, contabilidad, informática y soluciones digitales, enfocado en facilitar trámites y ofrecer soluciones prácticas para el día a día. \nBrindamos atención personalizada en trámites administrativos y fiscales, servicios contables, soporte y mantenimiento informático, programación, desarrollo y diseño de sitios web y herramientas digitales."),db.session=null,save()}function isDesktopDevice(){return window.innerWidth>1024}function isDesktopBlocked(){return!!((!db||!db.seguridad||db.seguridad.soloMovil!==!1)&&isDesktopDevice())}function showDeviceLockScreen(){document.body.innerHTML='<div style="position:fixed;inset:0;z-index:99999;display:grid;place-items:center;text-align:center;padding:32px;background:#05060c;color:#fff;font-family:inherit">\n    <div style="max-width:380px">\n      <div style="font-size:3rem;margin-bottom:14px">📵</div>\n      <h2 style="margin:0 0 10px;font-size:1.3rem">Solo disponible en celular o tablet</h2>\n      <p style="opacity:.7;font-size:.95rem;line-height:1.5;margin:0">Esta aplicación está restringida a dispositivos móviles. Ábrela desde tu celular o tablet para continuar.</p>\n    </div>\n  </div>'}function seed(){return{users:[],session:null,streaming:[],streamCats:[],servicios:[],informatica:[],accesos:[],registros:[],anuncio:{text:"✨ Bienvenido a Escritorio Público . 🤝 Te acompañamos paso a paso y de la mano, para que todo sea fácil, claro y seguro.",by:"Sistema",fecha:Date.now()},auth:{fails:0,until:0},code:"MURCIELAGO",murcTool:{admin:!0,subadmin:!1},waNum:WA_NUM}}/* ===== Frase de inicio con palabra rotativa (texto y palabras vienen del CRM) ===== */
const HERO_DEFAULT = { texto: "Haz tus trámites", palabras: ["fácil", "rápido", "seguro", "simple", "desde casa"] };
let __heroSig = "";
function heroConfig() {
  const c = (db && db.heroPalabras) || {};
  const texto = (typeof c.texto === "string" && c.texto.trim()) ? c.texto.trim() : HERO_DEFAULT.texto;
  const palabras = Array.isArray(c.palabras)
    ? c.palabras.map(x => String(x).trim()).filter(Boolean).slice(0, 12)
    : HERO_DEFAULT.palabras.slice();
  return { texto, palabras };
}
function renderHeroHeadline(force) {
  const el = document.getElementById("greet-title"); if (!el) return;
  const { texto, palabras } = heroConfig();
  const sig = JSON.stringify([texto, palabras]);
  if (!force && sig === __heroSig && el.querySelector(".rot-fixed")) return; // sin cambios: no reinicia la animación
  __heroSig = sig;
  const n = palabras.length;
  el.setAttribute("aria-label", texto + (n ? " " + palabras.join(", ") : ""));
  let html = '<span class="rot-fixed">' + esc(texto) + '</span>';
  let kf = "";
  if (n) {
    const list = n > 1 ? palabras.concat(palabras[0]) : palabras; // la primera se repite para que el ciclo sea continuo
    const anim = n > 1 ? ' style="--rot-dur:' + (n * 2.2) + 's;animation:heroRotate var(--rot-dur) cubic-bezier(.65,0,.35,1) infinite"' : "";
    html += ' <span class="rot-window" aria-hidden="true"><span class="rot-track"' + anim + '>' +
      list.map(w => '<span class="rot-word">' + esc(w) + '</span>').join("") + '</span></span>';
    if (n > 1) {
      const step = 100 / n, H = 1.18, fr = [];
      for (let i = 0; i < n; i++) fr.push((i * step).toFixed(3) + "%," + (i * step + step * 0.85).toFixed(3) + "%{transform:translateY(-" + (i * H).toFixed(2) + "em)}");
      fr.push("100%{transform:translateY(-" + (n * H).toFixed(2) + "em)}");
      kf = "@keyframes heroRotate{" + fr.join("") + "}";
    }
  }
  let st = document.getElementById("hero-rot-style");
  if (!st) { st = document.createElement("style"); st.id = "hero-rot-style"; document.head.appendChild(st); }
  st.textContent = kf;
  el.innerHTML = html;
}

function save(){localStorage.setItem(KEY,JSON.stringify(db))}const GUEST_USER={id:"guest",name:"Invitado",emoji:"🙂",role:"guest",created:Date.now(),prefs:{...defPrefs(),theme:"random"}},me=()=>"guest"===db.session?GUEST_USER:db.users.find(e=>e.id===db.session),prefs=()=>me().prefs,TINT={music:["#2fe0c0","#12b5a5"],services:["#7dd3fc","#38b6ff"],actions:["#ff6ec7","#8b5cf6"],informatica:["#ffb347","#ff7a59"]},CATS={music:{label:"Streaming",icon:"📺"},services:{label:"Trámites",icon:"🧾"},informatica:{label:"Informática",icon:"💻"},actions:{label:"Personalizados",icon:"⚡"}};function getActions(){return[{id:"act-compras",cat:"actions",icon:"🛍️",title:"COMPRAS",sub:"Accesos rápidos de compra"},{id:"act-perfil",cat:"actions",icon:"👤",title:"CONÓCENOS",sub:"Tu perfil y sesión"}]}const dataset=()=>[...db.streaming.filter(e=>!1!==e.disponible||canEdit()).map(e=>({id:"mus-"+e.id,cat:"music",icon:e.icon,title:e.title,sub:`💲${searchStdPrice(e)} · Streaming`})),...db.servicios.flatMap(e=>e.items.filter(e=>!1!==e.disponible||canEdit()).map(t=>({id:"srv-"+t.id,cat:"services",icon:"🧾",title:t.title,sub:`${t.badge?t.badge.split(",").map(e=>e.trim()).filter(Boolean).join(" · "):e.name} · 💲${searchStdPrice(t)}`}))),...db.informatica.filter(e=>!1!==e.disponible||canEdit()).map(e=>({id:"inf-"+e.id,cat:"informatica",icon:"💻",title:e.title,sub:`${e.grupo&&e.grupo!==e.title?e.grupo+" · ":""}${e.sub||"Informática"} · 💲${searchStdPrice(e)??"Cotizar"}`})),...getActions()].filter(e=>prefs().cats[e.cat]);function hexPalette(e){return{"act-stream":["#ff6ec7","#8b5cf6"],"act-services":["#ffd76f","#ff8a3d"],"act-perfil":["#7dd3fc","#5ed1ff"],"act-compras":["#7cf5d4","#2fe0c0"]}[e.id]||TINT.actions}const esc=e=>e.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[e])),norm=e=>e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");function highlight(e,t){const a=norm(t);if(!a)return esc(e);const i=[...e];let s="",n=[];i.forEach((e,t)=>{for(const a of norm(e))s+=a,n.push(t)});const o=s.indexOf(a);if(o<0)return esc(e);const r=n[o],c=n[o+a.length-1]+1;return esc(i.slice(0,r).join(""))+"<mark>"+esc(i.slice(r,c).join(""))+"</mark>"+esc(i.slice(c).join(""))}function confettiBurst(e){const t=document.createElement("canvas");t.style.cssText="position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:99999",document.body.appendChild(t);const a=Math.min(window.devicePixelRatio||1,2);t.width=innerWidth*a,t.height=innerHeight*a;const i=t.getContext("2d");if(!i)return void t.remove();i.scale(a,a);let s=innerWidth/2,n=.5*innerHeight;if(e&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=t.left+t.width/2,n=t.top+t.height/2}const o=["#5ed1ff","#7cf5d4","#ffd166","#ff6b7a","#c792ea","#ffffff"],r=Array.from({length:110},()=>({x:s+30*(Math.random()-.5),y:n+20*(Math.random()-.5),vx:14*(Math.random()-.5),vy:-(11*Math.random()+6),g:.32+.14*Math.random(),size:4+5*Math.random(),color:o[Math.floor(Math.random()*o.length)],rot:Math.random()*Math.PI*2,vr:.35*(Math.random()-.5),life:1,decay:.008+.01*Math.random()}));let c=0;!function e(){c++,i.clearRect(0,0,innerWidth,innerHeight);let a=!1;for(const e of r)e.vy+=e.g,e.x+=e.vx,e.y+=e.vy,e.rot+=e.vr,e.life-=e.decay,e.life>0&&(a=!0,i.save(),i.globalAlpha=Math.max(e.life,0),i.translate(e.x,e.y),i.rotate(e.rot),i.fillStyle=e.color,i.fillRect(-e.size/2,-e.size/2,e.size,.6*e.size),i.restore());a&&c<220?requestAnimationFrame(e):t.remove()}()}let __rbN = 0;
/* Robotito del CRM (mismo dibujo). Cada instancia lleva su propio id de degradado para que no se pierda si otra copia queda oculta. */
function robotSVG(bad) {
  const id = "rbg" + (++__rbN), a = bad ? "#e08a8a" : "#7fd4c8", b = bad ? "#5f2323" : "#2d4a4a", k = "#1a2a2a";
  const face = bad
    ? '<line x1="35" y1="28" x2="45" y2="33" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/><line x1="65" y1="28" x2="55" y2="33" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/><circle cx="41" cy="38" r="3" fill="' + k + '"/><circle cx="59" cy="38" r="3" fill="' + k + '"/><path d="M42 46 Q50 41 58 46" fill="none" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/>'
    : '<path d="M35 33 Q40 26 45 33" fill="none" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/><path d="M55 33 Q60 26 65 33" fill="none" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/><path d="M40 41 Q50 47 60 41" fill="none" stroke="' + k + '" stroke-width="3" stroke-linecap="round"/>';
  return '<svg viewBox="0 0 100 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + a + '"/><stop offset="100%" stop-color="' + b + '"/></linearGradient></defs>' +
    '<path d="M25 55 Q10 40 20 20" fill="none" stroke="' + k + '" stroke-width="5" stroke-linecap="round"/><path d="M75 55 Q90 40 80 20" fill="none" stroke="' + k + '" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="34" y="50" width="32" height="30" rx="9" fill="url(#' + id + ')" stroke="' + k + '" stroke-width="4"/><rect x="24" y="14" width="52" height="37" rx="13" fill="url(#' + id + ')" stroke="' + k + '" stroke-width="4"/>' +
    '<line x1="50" y1="14" x2="50" y2="4" stroke="' + k + '" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="3" r="4.5" fill="' + (bad ? "#dc2626" : "#c9a227") + '" stroke="' + k + '" stroke-width="2"/>' + face + '</svg>';
}
/* Toast con el robotito del CRM: escribe el mensaje letra por letra. Un 3er parámetro opcional hace el aviso clicable. */
function toast(e, t = "✨", onClick) {
  const bad = ["⚠️", "❌", "🚫", "⛔"].includes(t), a = document.createElement("div");
  a.className = "toast glass toast-bot-on" + (bad ? " toast-err" : "");
  a.innerHTML = '<span class="toast-bot">' + robotSVG(bad) + '</span><span class="toast-msg"></span>';
  const m = a.querySelector(".toast-msg"), caret = document.createElement("span"); caret.className = "toast-caret"; m.appendChild(caret);
  $("#toast-root").appendChild(a); requestAnimationFrame(() => a.classList.add("show"));
  const close = () => { a.classList.remove("show"); setTimeout(() => a.remove(), 400); };
  if (onClick) { a.style.cursor = "pointer"; a.onclick = () => { close(); onClick(); }; }
  const chars = Array.from((t ? t + " " : "") + String(e)), per = 28; let i = 0;
  const tm = setInterval(() => { if (i < chars.length) caret.insertAdjacentText("beforebegin", chars[i++]); else clearInterval(tm); }, per);
  setTimeout(() => { clearInterval(tm); close(); }, Math.max(2600, chars.length * per + 1800));
}
function formatReqForCopy(e,t,a){const i=parseRequisitos(t),s=(i.length?i.map(e=>`${e.label}:`):t.split(/[,;+]|\.(?=\s|$)|\?/).map(e=>stripLeadConj(e.trim())).filter(Boolean).map(e=>`${e}:`)).map((e,t)=>`${t+1}. \`\`\`${e}\`\`\``),n=null!=a&&""!==a?`\n\n💲 \`Precio: $${a}\nenviar captura de trasferencia\``:"";return`*REQUISITOS PARA ${(e||"").toUpperCase()}*\n\n${s.join("\n")}${n}`}function copyText(e,t="Copiado al portapapeles"){const a=()=>toast(t,"📋"),i=()=>toast("No se pudo copiar, selecciona el texto manualmente","⚠️");navigator.clipboard&&window.isSecureContext?navigator.clipboard.writeText(e).then(a).catch(()=>{legacyCopy(e)?a():i()}):legacyCopy(e)?a():i()}function legacyCopy(e){try{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();const a=document.execCommand("copy");return document.body.removeChild(t),a}catch(e){return!1}}function openModal(e,t={}){const a=t.extraClass?` ${t.extraClass}`:"";$("#modal-root").innerHTML=`<div class="modal-ov"><div class="modal-card glass${a}">${e}</div></div>`,$$("#modal-root [data-close]").forEach(e=>e.onclick=closeModal)}function closeModal(){$("#modal-root").innerHTML=""}function shakeField(e){e.classList.remove("err"),e.offsetWidth,e.classList.add("err");try{navigator.vibrate&&navigator.vibrate([90,40,90])}catch(t){}}const waLink=e=>"https://wa.me/"+(db.waNum||WA_NUM)+"?text="+encodeURIComponent(e);function fillTemplate(e,t){return String(e||"").replace(/\{(\w+)\}/g,(e,a)=>void 0!==t[a]&&null!==t[a]&&""!==t[a]?t[a]:e)}function logRegistro(e,t){const a=me();a&&(db.registros.push({id:uid(),userId:a.id,userName:a.name,userEmoji:a.emoji,service:e,price:+t||0,fecha:Date.now()}),save())}function serviceModal(e){const t=null!=e.price&&""!==e.price,a=null!=e.price2&&""!==e.price2?priceForRole({price:e.price,price2:e.price2,price3:e.price3}):e.price,i=null!=e.code&&""!==e.code?e.code:t?codeFor(a):"",s={icono:iconGlyph(e.icon),titulo:"`"+(e.title||"")+"`",precio:"`"+(t?a:"Cotizar")+"`",precio2:e.price2||"",precio3:e.price3||"",codigo:i,periodo:e.periodo||""},n={icono:iconGlyph(e.icon),titulo:e.title||"",precio:t?a:"Cotizar",precio2:e.price2||"",precio3:e.price3||"",codigo:i,periodo:e.periodo||""},o=me(),r=isGuest()?"invitado":o&&"user"===o.role?"estandar":"subadmin",c={invitado:e.popup0,estandar:e.popup1,subadmin:e.popup2},l=null!=c[r]&&""!==c[r]?c[r]:e.popup,d=[e.msg0,e.msg1,e.msg2].find(e=>e&&e.target===r&&e.text&&e.text.trim()),u=(e.periodo&&!/\{periodo\}/i.test(d?d.text:e.fallback||db.waMsgs.servicio)?x=>x+" POR "+e.periodo:x=>x)(fillTemplate(d?d.text:e.fallback||db.waMsgs.servicio,s).replace(/\(\s*c[oó]digo\s*:\s*[^)]*\)/gi,x=>"`"+x+"`")),p=waLink(u),m=!1===e.reqForm?[]:parseRequisitos(e.req);openModal(`<div class="m-ico">${iconHTML(e.icon)}</div><h4>${esc(e.title)}</h4>\n   ${e.sub?`<div class="m-sub-chips">${String(e.sub).split(/[·.,]+/).map(e=>e.trim()).filter(Boolean).map(e=>`<span class="m-sub-chip">${esc(e)}</span>`).join("")}</div>`:""}\n   ${l?`<div class="m-note">${esc(l)}</div>`:""}\n   ${e.extraHTML||""}\n   <div class="m-prices"><span class="m-price display">${t?"💲"+a:"Cotizar"}</span></div>\n   ${t?`<div class="m-code">🔑 Código: <b>${esc(i)}</b></div>`:""}\n   ${e.entrega?`<div class="m-entrega-row"><div class="m-entrega"><span class="m-entrega-ico">⏱️</span><span class="m-entrega-txt"><span class="m-entrega-label">Entrega estimada</span><span class="m-entrega-value">${esc(e.entrega)}</span></span></div>${e.isInv?'<button type="button" class="m-copy-compact m-play-compact'+(e.video?"":" is-off")+'" id="m-play" title="'+(e.video?"Ver video":"Aún sin video")+'" aria-label="Ver video"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg></button>':e.req?'<button class="m-copy-compact" id="m-copy-req" title="Copiar requisitos">📋</button>':""}</div>`:e.isInv?(e.video?'<div class="m-row"><button type="button" class="btn ghost small" id="m-play">▶ Ver video</button></div>':""):e.req?'<div class="m-row"><button class="btn ghost small" id="m-copy-req">📋 Copiar requisitos</button></div>':""}\n   <div class="m-row"><button class="btn-plane" id="m-wa" type="button"><span class="default"><span class="svc-svg svc-svg-inline" style="width:1.5em;height:1.5em"><img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366" alt="WhatsApp" loading="lazy" style="width:100%;height:100%;object-fit:contain"></span>SOLICITAR</span><span class="success"><svg viewBox="0 0 16 16"><polyline points="3.75 9 7 12 13 5"></polyline></svg>¡Listo!</span><svg class="trails" viewBox="0 0 33 64"><path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path><path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path></svg><div class="plane"><div class="left"></div><div class="right"></div></div></button></div>\n   ${e.adminRow?`<div class="m-row">${e.adminRow}</div>`:""}\n   <div class="m-row"><button class="btn ghost" data-close>Cerrar</button></div>`),$("#m-play")&&($("#m-play").onclick=()=>e.video?epPlayVideo(e.video,e.title,e.back):toast("Esta invitación aún no tiene video","🎬")),$("#m-copy-req")&&($("#m-copy-req").onclick=()=>copyText(formatReqForCopy(e.title,e.req,t?a:null),`Requisitos de «${e.title}» copiados`)),e.onEdit&&$("#mi-edit")&&($("#mi-edit").onclick=e.onEdit),e.onDel&&$("#mi-del")&&($("#mi-del").onclick=e.onDel),$("#m-wa").onclick=()=>{const _b=$("#m-wa");if(_b.classList.contains("active"))return;try{confettiBurst(_b)}catch(e){}if(m.length)return void sendPlane(_b,()=>{closeModal(),requisitosModal(e,m,e.msgFn?e.msgFn(u):u,t,n,e.totalFn?e.totalFn():a)});const _wt=window.open("","_blank");logRegistro(e.title+(e.periodo?" ("+e.periodo+")":""),e.totalFn?e.totalFn():(t?e.price:0)),sendPlane(_b,()=>{toast("Solicitud registrada","📁"),_wt?_wt.location.href=(e.msgFn?waLink(e.msgFn(u)):p):location.href=(e.msgFn?waLink(e.msgFn(u)):p)})}}const stripLeadConj=e=>e.replace(/^\s*(?:y|o|e|u)\s+/i,"").trim(),normReq=e=>e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),REQ_MULTI=[{test:e=>/usuario/.test(e)&&/contrase/.test(e),fields:()=>[{key:"usuario",label:"Usuario",order:18,type:"text"},{key:"contrasena",label:"Contraseña",order:19,type:"password"}]}],REQ_SINGLE=[{test:e=>/nombre completo/.test(e)&&/razon social/.test(e),mk:()=>({key:"nombre",label:"Nombre completo o razón social",order:1,type:"text"})},{test:e=>/nombre completo/.test(e),mk:()=>({key:"nombre",label:"Nombre completo",order:1,type:"text"})},{test:e=>/^apellidos?$/.test(e),mk:()=>({key:"apellidos",label:"Apellidos",order:2,type:"text"})},{test:e=>/fecha.*nacim/.test(e),mk:()=>({key:"fecha_nac",label:"Fecha de nacimiento",order:3,type:"date"})},{test:e=>/fecha.*conclu/.test(e),mk:()=>({key:"fecha_conclu",label:"Fecha en que concluyó",order:4,type:"date"})},{test:e=>/^fecha$/.test(e),mk:()=>({key:"fecha",label:"Fecha",order:4,type:"date"})},{test:e=>/^edo\.?$|^estado$/.test(e),mk:()=>({key:"estado",label:"Estado",order:5,type:"text"})},{test:e=>/sexo/.test(e),mk:()=>({key:"sexo",label:"Sexo",order:6,type:"select",opts:["Masculino","Femenino"]})},{test:e=>/\bcurp\b/.test(e),mk:()=>({key:"curp",label:"CURP",order:7,type:"text",maxlength:18,upper:!0})},{test:e=>/\bine\b/.test(e),mk:()=>({key:"ine",label:"INE",order:8,type:"text"})},{test:e=>/rfc.*original/.test(e),mk:()=>({key:"rfc_original",label:"RFC (documento original)",order:10,type:"text",maxlength:13,upper:!0})},{test:e=>/\brfc\b/.test(e),mk:()=>({key:"rfc",label:"RFC",order:9,type:"text",maxlength:13,upper:!0})},{test:e=>/tarjeta.*credito/.test(e),mk:()=>({key:"tarjeta_credito",label:"¿Tiene tarjeta de crédito?",order:10.5,type:"radio",opts:["Sí","No"]})},{test:e=>/otro.*credito/.test(e),mk:()=>({key:"otro_credito",label:"¿Tiene otro crédito?",order:10.6,type:"radio",opts:["Sí","No"]})},{test:e=>/idcif/.test(e),mk:()=>({key:"idcif",label:"idCIF",order:11,type:"text"})},{test:e=>/\bnss\b/.test(e),mk:()=>({key:"nss",label:"NSS",order:12,type:"text",maxlength:11,numeric:!0})},{test:e=>/^acta$/.test(e),mk:()=>({key:"acta",label:"Tipo de acta que necesita",order:13,type:"text"})},{test:e=>/instituci/.test(e),mk:()=>({key:"institucion",label:"Institución que solicita",order:14,type:"text"})},{test:e=>/rpu|numero de ser?cio|numero de servicio/.test(e),mk:()=>({key:"rpu",label:"Número de servicio (RPU)",order:15,type:"text"})},{test:e=>/correo/.test(e),mk:()=>({key:"correo",label:"Correo electrónico",order:16,type:"email"})},{test:e=>/acceso a la mano tel|numero telf|n\.?\s?tel\b/.test(e),mk:()=>({key:"telefono",label:"Número de teléfono",order:17,type:"tel",maxlength:10,numeric:!0})},{test:e=>/usuario/.test(e),mk:()=>({key:"usuario",label:"Usuario",order:18,type:"text"})},{test:e=>/contrase/.test(e),mk:()=>({key:"contrasena",label:"Contraseña",order:19,type:"password"})},{test:e=>/para que quiere la cita|motivo/.test(e),mk:()=>({key:"motivo",label:"Motivo de la cita",order:20,type:"text"})}],REQ_SKIP=[/^acudir/,/porque se manejan/,/^acceso a su efirma/,/personal\s*\/?\s*presencial/,/debe ser de manera/];function parseRequisitos(e){if(!e)return[];const t=e.split(/[,;+]|\.(?=\s|$)|\?/).map(e=>stripLeadConj(e.trim())).filter(Boolean),a=[],i={},s={},n=e=>{const t=i[e.key]=(i[e.key]||0)+1,n=1===t?e.key:`${e.key}_${t}`;let o=e.label;s[o]=(s[o]||0)+1,s[o]>1&&(o=`${e.label} (${s[o]})`),a.push({...e,key:n,label:o})};return t.forEach(e=>{const t=normReq(e),a=REQ_MULTI.find(e=>e.test(t));if(a)return void a.fields().forEach(n);if(/\s+o\s+/i.test(e)){const t=e.split(/\s+o\s+/i).map(e=>e.trim()).filter(Boolean);if(2===t.length&&t[0].split(/\s+/).length<=3&&t[1].split(/\s+/).length<=3){const e=REQ_SINGLE.find(e=>e.test(normReq(t[0]))),a=REQ_SINGLE.find(e=>e.test(normReq(t[1])));if(e&&a){const i=e.mk(),s=a.mk();return void n({key:i.key+"_o_"+s.key,label:`${t[0]} o ${t[1]}`,order:Math.min(i.order,s.order),type:"text",maxlength:Math.max(i.maxlength||60,s.maxlength||60)})}}}if(/\s+y\s+/i.test(e)){const t=e.split(/\s+y\s+/i).map(e=>e.trim()).filter(Boolean),a=[];let i=!0;for(const e of t){const t=normReq(e),s=REQ_SINGLE.find(e=>e.test(t));if(!s){i=!1;break}{const t=s.mk();t.label=e,a.push(t)}}if(i&&a.length)return void a.forEach(n)}const i=REQ_SINGLE.find(e=>e.test(t));if(i){const t=i.mk();return t.label=e,void n(t)}REQ_SKIP.some(e=>e.test(t))||e.length<=40&&n({key:"x_"+t.replace(/[^a-z0-9]+/g,"_").slice(0,24),label:e,order:80,type:"text"})}),a.sort((e,t)=>e.order-t.order)}function requisitosModal(e,t,a,i,s,n){const o=e.note&&e.note.trim()?e.note:DEFAULT_REQ_NOTE,r=s?fillTemplate(o,s):o;openModal(`<div class="m-ico">${iconHTML(e.icon)}</div><h4>${esc(e.title)}</h4>\n   <p>Completa tus datos en orden para enviar la solicitud por WhatsApp</p>\n   <div class="m-note">${esc(r)}</div>
   ${e.entregaInv?`<p class="fine" style="text-align:center;margin:-2px 0 12px;font-weight:800;color:var(--tx);opacity:1">⏱ Entrega estimada: ${esc(e.entregaInv)}</p>`:""}\n   ${e.req?'<div class="m-row"><button class="btn ghost small" id="rf-copy-req">📋 Copiar requisitos</button></div>':""}\n   <div id="req-form">${t.map(e=>"select"===e.type?`<div class="field glass-in"><select id="rf-${e.key}"><option value="" disabled selected>${esc(e.label)}</option>${e.opts.map(e=>`<option value="${esc(e)}">${esc(e)}</option>`).join("")}</select></div>`:"radio"===e.type?`<div class="field glass-in rf-radio-row" id="rf-${e.key}"><span class="rf-radio-label">${esc(e.label)}</span><span class="rf-radio-opts">${e.opts.map((t,a)=>`<label class="rf-radio-pill"><input type="radio" name="rf-${e.key}" value="${esc(t)}"${a===e.opts.length-1?" checked":""}><span>${esc(t)}</span></label>`).join("")}</span></div>`:"date"===e.type?`<div class="fine" style="margin:0 0 6px 4px;font-weight:800;color:var(--tx);opacity:1">📅 ${esc(e.label)}</div><div class="field glass-in"><input id="rf-${e.key}" type="date" autocomplete="off"></div>`:`<div class="field glass-in"><input id="rf-${e.key}" type="${"password"===e.type?"text":e.type}" maxlength="${e.maxlength||60}" placeholder="${esc(e.label)}" ${e.upper?'style="text-transform:uppercase"':""} autocomplete="off"></div>`).join("")}</div>\n   ${e.checklist?`<label class="field glass-in req-checklist-row" id="rf-checklist-wrap"><input type="checkbox" id="rf-checklist"><span>${esc(e.checklist)}</span></label>`:""}
   <div class="m-row"><button class="btn ghost" id="rf-back">← Volver</button><button class="btn btn-primary" id="rf-ok"><span class="svc-svg svc-svg-inline" style="width:2.3em;height:2.3em"><img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366" alt="WhatsApp" loading="lazy" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.7)) drop-shadow(0 0 7px rgba(0,0,0,.45))"></span> Enviar por WhatsApp</button></div>`),$("#rf-copy-req")&&($("#rf-copy-req").onclick=()=>copyText(formatReqForCopy(e.title,e.req,i?n:null),`Requisitos de «${e.title}» copiados`)),$("#rf-back").onclick=()=>{closeModal(),e.backFn?e.backFn():serviceModal(e)},$("#rf-checklist")&&$("#rf-checklist").addEventListener("change",function(){const on=this.checked;$$("#req-form .field").forEach(f=>f.classList.toggle("req-locked",on)),$$("#req-form input,#req-form select").forEach(inp=>inp.disabled=on)}),$$('#req-form input[style*="uppercase"]').forEach(e=>e.addEventListener("input",()=>{e.value=e.value.toUpperCase()})),$$('#req-form input[maxlength="11"],#req-form input[maxlength="10"]').forEach(e=>{t.find(t=>t.key===e.id.slice(3)&&t.numeric)&&e.addEventListener("input",()=>{e.value=e.value.replace(/\D/g,"")})});$("#rf-ok").onclick=()=>{const clBox=$("#rf-checklist"),clOn=!!(clBox&&clBox.checked);if(!clOn)for(const e of t){if("radio"===e.type)continue;const t=$("#rf-"+e.key);if(!t.value.trim())return shakeField(t),toast("Completa: "+e.label,"✍️")}const s=clOn?`✅ ${e.checklist}`:t.map(e=>`*${e.label.toUpperCase()}:* ${(e=>{if("radio"===e.type){const t=document.querySelector(`input[name="rf-${e.key}"]:checked`);return t?t.value:""}const t=$("#rf-"+e.key);return t?t.value.trim():""})(e)}`).join("\n"),n=`${a}\n\n\`DATOS DEL SOLICITANTE\`\n\n${s}`;const _wt=window.open("","_blank");logRegistro(e.title,i?e.price:0),closeModal(),toast("Solicitud enviada","📁"),_wt?_wt.location.href=waLink(n):location.href=waLink(n)}}const THEME_OPTS=["dark","light","green","vivid"];let sessionTheme=null;function pickSessionTheme(){const e=prefs();if("random"===e.theme){const t=e.themeLocks||{},a=THEME_OPTS.filter(e=>!t[e]),i=a.length?a:THEME_OPTS;sessionTheme=i[Math.floor(Math.random()*i.length)]}else sessionTheme=e.theme;return sessionTheme}function toggleThemeLock(e){const t=prefs();t.themeLocks||(t.themeLocks={}),t.themeLocks[e]=!t.themeLocks[e],save(),applyPrefs(),toast(t.themeLocks[e]?"Fondo excluido del aleatorio":"Fondo incluido en el aleatorio","🔒")}function applyPrefs(){const e=prefs();sessionTheme||pickSessionTheme(),document.documentElement.dataset.theme=sessionTheme,document.documentElement.dataset.motion=(!EP_IS_MOBILE&&e.motion)?"on":"off",document.documentElement.style.setProperty("--blur",e.blur+"px"),$("#seg-theme").querySelectorAll("button[data-t]").forEach(t=>t.classList.toggle("on",t.dataset.t===e.theme)),$("#seg-theme").querySelectorAll(".lock-btn").forEach(t=>{const a=!(!e.themeLocks||!e.themeLocks[t.dataset.lock]);t.classList.toggle("locked-on",a);const i=t.previousElementSibling;i&&i.classList.toggle("theme-locked",a)});const t=$("#rng-blur");t.value=e.blur,t.style.setProperty("--fill",(e.blur-6)/38*100+"%"),$("#val-blur").textContent=e.blur+"px",$("#sw-motion").checked=e.motion,$$("#cats-list input").forEach(e=>e.checked=prefs().cats[e.dataset.cat]),e.motion&&startNet()}function setTheme(e){prefs().theme=e,save(),pickSessionTheme(),applyPrefs(),renderIdle(),$("#search-input").value&&runQuery($("#search-input").value)}const cvs=$("#net"),ctx=cvs.getContext("2d"),DPR=Math.min(EP_IS_MOBILE?1:2,window.devicePixelRatio||1);let PW=0,PH=0,pts=[],netOn=!1;const mouse={x:-9999,y:-9999};function netSize(){PW=cvs.width=innerWidth*DPR,PH=cvs.height=innerHeight*DPR,cvs.style.width=innerWidth+"px",cvs.style.height=innerHeight+"px";const e=Math.min(110,Math.round(innerWidth*innerHeight/16e3));pts=Array.from({length:e},()=>({x:Math.random()*PW,y:Math.random()*PH,vx:.4*(Math.random()-.5)*DPR,vy:.4*(Math.random()-.5)*DPR,r:(1.5*Math.random()+.8)*DPR}))}function netDraw(){ctx.clearRect(0,0,PW,PH);const e="light"!==document.documentElement.dataset.theme,t=e?"160,215,255":"30,80,160",a=130*DPR;for(const a of pts){a.x+=a.vx,a.y+=a.vy,(a.x<0||a.x>PW)&&(a.vx*=-1),(a.y<0||a.y>PH)&&(a.vy*=-1);const i=Math.hypot(a.x-mouse.x,a.y-mouse.y);i<160*DPR&&i>1&&(a.vx+=8e-6*(mouse.x-a.x),a.vy+=8e-6*(mouse.y-a.y)),ctx.beginPath(),ctx.arc(a.x,a.y,a.r,0,7),ctx.fillStyle=`rgba(${t},${e?.75:.55})`,ctx.fill()}ctx.lineWidth=.7*DPR;for(let i=0;i<pts.length;i++)for(let s=i+1;s<pts.length;s++){const n=pts[i],o=pts[s],r=Math.hypot(n.x-o.x,n.y-o.y);r<a&&(ctx.beginPath(),ctx.moveTo(n.x,n.y),ctx.lineTo(o.x,o.y),ctx.strokeStyle=`rgba(${t},${(1-r/a)*(e?.3:.22)})`,ctx.stroke())}for(const e of pts){const a=Math.hypot(e.x-mouse.x,e.y-mouse.y);a<170*DPR&&(ctx.beginPath(),ctx.moveTo(e.x,e.y),ctx.lineTo(mouse.x,mouse.y),ctx.strokeStyle=`rgba(${t},${.35*(1-a/(170*DPR))})`,ctx.stroke())}}function netLoop(){document.hidden||"off"===document.documentElement.dataset.motion?netOn=!1:(netDraw(),requestAnimationFrame(netLoop))}function startNet(){netOn||document.hidden||"off"===document.documentElement.dataset.motion||(netOn=!0,requestAnimationFrame(netLoop))}addEventListener("resize",netSize);addEventListener("visibilitychange",()=>{document.hidden?netOn=!1:startNet()});let selLogin=null,caEmoji="🫧";const lockRemaining=()=>Math.max(0,(db.auth.until||0)-Date.now()),fmtLock=e=>{const t=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3);return t+":"+String(a).padStart(2,"0")};function applyLockUI(){const e=$("#screen-login");lockRemaining()>0?(e.classList.add("locked"),$("#lock-timer").classList.remove("hidden"),$("#lt-time").textContent=fmtLock(lockRemaining()),$("#login-pass").disabled=!0,$("#btn-login").disabled=!0,$("#login-error").classList.remove("show")):(e.classList.remove("locked"),$("#lock-timer").classList.add("hidden"),$("#login-pass").disabled=!1,$("#btn-login").disabled=!1)}function spawnFireworks(){const e=$("#fw-layer");if(!e)return;e.innerHTML="";const t=["#FFD76A","#FFE9A8","#FFB347","#FFF3C4","#FFC24A"];for(let a=0;a<18;a++){const i=document.createElement("span");i.className="fw-spark";const s=2*Math.PI*a/18+(.35*Math.random()-.175),n=30+40*Math.random();i.style.setProperty("--tx",(Math.cos(s)*n).toFixed(1)+"px"),i.style.setProperty("--ty",(Math.sin(s)*n).toFixed(1)+"px"),i.style.setProperty("--sc",t[a%t.length]),i.style.setProperty("--fd",(.1*Math.random()).toFixed(2)+"s"),e.appendChild(i)}const a=document.createElement("span");a.className="fw-glow",e.appendChild(a),clearTimeout(e._fwTimer),e._fwTimer=setTimeout(()=>{e.innerHTML=""},1250)}function setLoginName(e){const t=$("#login-name");t&&(t.classList.remove("pop"),t.offsetWidth,t.classList.add("pop"),t.textContent=e.name,spawnFireworks())}function buildLogin(){const e=$("#ca-emojis");e.innerHTML="",EMOJIS.forEach(t=>{const a=document.createElement("button");a.textContent=t,a.onclick=()=>{caEmoji=t,e.querySelectorAll("button").forEach(e=>e.classList.remove("sel")),a.classList.add("sel")},t===caEmoji&&a.classList.add("sel"),e.appendChild(a)}),applyLockUI(),initLoginSlider()}let loginPanelIdx=0,loginSliding=false;
const sliderTrack=$("#slider-track"),sliderViewport=$("#slider-viewport");
function measureLoginPanels(){
  const gate=$("#panel-gate"),res=$("#panel-resellers");
  gate.style.minHeight="";res.style.minHeight="";
  const gateH=gate.scrollHeight,resH=res.scrollHeight;
  const maxH=Math.max(gateH,resH);
  gate.style.minHeight=maxH+"px";
  res.style.minHeight=maxH+"px";
  return[maxH,maxH];
}
function initLoginSlider(){
  loginPanelIdx=0;
  const[gateH]=measureLoginPanels();
  sliderViewport.style.height=gateH+"px";
  sliderTrack.style.transform="translateY(0px)";
}
function goLoginPanel(toIdx){
  if(loginSliding||toIdx===loginPanelIdx)return;
  loginSliding=true;
  const[gateH,resH]=measureLoginPanels();
  const offsets=[0,-gateH];
  const fromPx=offsets[loginPanelIdx],toPx=offsets[toIdx];
  const targetH=0===toIdx?gateH:resH;
  sliderViewport.style.height=targetH+"px";
  sliderTrack.style.setProperty("--from",fromPx+"px");
  sliderTrack.style.setProperty("--to",toPx+"px");
  sliderTrack.style.transform=`translateY(${fromPx}px)`;
  sliderTrack.classList.remove("jelly-anim");
  void sliderTrack.offsetWidth;
  sliderTrack.classList.add("jelly-anim");
  loginPanelIdx=toIdx;
  setTimeout(()=>{
    sliderTrack.classList.remove("jelly-anim");
    sliderTrack.style.transform=`translateY(${toPx}px)`;
    loginSliding=false;
  },760);
}
function showGate(){goLoginPanel(0),applyLockUI()}
function showResellers(){goLoginPanel(1),applyLockUI()}
function curtainSwap(e){const t=$("#app-curtains"),a=EP_IS_MOBILE?180:780;t.classList.add("active","closing"),t.setAttribute("aria-hidden","false"),setTimeout(()=>{t.classList.remove("closing"),requestAnimationFrame(()=>requestAnimationFrame(e))},a),setTimeout(()=>{t.classList.remove("active"),t.setAttribute("aria-hidden","true")},2*a)}function enterWithCurtains(){const e=$("#login-card");e.classList.add("zoom-out"),curtainSwap(()=>{db.session="guest",save(),$("#screen-login").classList.add("hidden"),$("#screen-login").classList.remove("locked"),e.classList.remove("zoom-out"),enterApp()})}$("#btn-resellers").onclick=()=>showResellers(),$("#btn-back-gate").onclick=()=>{$("#create-wrap").classList.add("hidden"),$("#login-error").classList.remove("show"),showGate()},$("#btn-create-toggle").onclick=()=>{$("#create-wrap").classList.toggle("hidden"),$("#create-wrap").classList.contains("hidden")||$("#ca-name").focus()},$("#login-user").addEventListener("input",()=>{const e=$("#login-user").value.trim().toLowerCase(),t=e?db.users.find(t=>(t.username||t.name).toLowerCase()===e):null;t?setLoginName(t):$("#login-name").textContent=""}),$("#btn-guest").onclick=()=>enterWithCurtains(),$("#login-form").addEventListener("submit",e=>{e.preventDefault();const t=$("#login-error");if(lockRemaining()>0)return applyLockUI(),void shakeField($("#login-field"));const a=$("#login-user").value.trim(),i=db.users.find(e=>(e.username||e.name).toLowerCase()===a.toLowerCase());if(!i)return t.textContent="⚠️ Usuario no encontrado",t.classList.add("show"),shakeField($("#login-user-field")),void $("#login-user").select();selLogin=i.id;const s=$("#login-pass").value.replace(/\s/g,"");if(i.remote)return void epLoginRemote(i,s,t);if(hash(s)!==i.pass){db.auth.fails=(db.auth.fails||0)+1;const e=3-db.auth.fails;return e<=0?(db.auth.until=Date.now()+18e4,db.auth.fails=0,save(),applyLockUI(),toast("Demasiados intentos · bloqueado 3 minutos","🔒")):(save(),t.textContent=`⚠️ Contraseña incorrecta · te queda${1!==e?"n":""} ${e} intento${1!==e?"s":""}`,t.classList.add("show"),toast(`Contraseña incorrecta · ${e} intento${1!==e?"s":""} restante${1!==e?"s":""}`,"⚠️")),shakeField($("#login-field")),void $("#login-pass").select()}db.auth={fails:0,until:0},save(),t.classList.remove("show"),t.textContent="",db.session=i.id,save(),$("#login-card").classList.add("zoom-out"),curtainSwap(()=>{$("#login-pass").value="",$("#login-pass").type="password",$("#screen-login").classList.add("hidden"),$("#screen-login").classList.remove("locked"),$("#login-card").classList.remove("zoom-out"),enterApp()})}),setInterval(()=>{if($("#screen-login").classList.contains("hidden"))return;const e=$("#login-pass").disabled;applyLockUI(),e&&0===lockRemaining()&&toast("Bloqueo terminado · ya puedes entrar","🔓")},1e3),$("#login-eye").onclick=()=>{const e=$("#login-pass"),t="password"===e.type;e.type=t?"text":"password",$("#login-eye").setAttribute("aria-label",t?"Ocultar contraseña":"Mostrar contraseña")},$("#ca-ok").onclick=()=>{const e=$("#ca-name").value.trim(),t=$("#ca-pass").value,a=$("#ca-pass2").value;if(e.length<2)return toast("Escribe un nombre (mín. 2 letras)","✍️");if(t.length<4)return toast("La contraseña necesita 4+ caracteres","🔑");if(t!==a)return toast("Las contraseñas no coinciden","⚠️");const i={id:uid(),name:e,username:e,emoji:caEmoji,pass:hash(t),role:"user",created:Date.now(),prefs:defPrefs()};db.users.push(i),save(),selLogin=i.id,$("#create-wrap").classList.add("hidden"),$("#ca-name").value=$("#ca-pass").value=$("#ca-pass2").value="",buildLogin(),toast(`Cuenta de ${e} creada (Estándar)`,"🎉"),$("#login-user").value=e,setLoginName(i),$("#login-pass").focus()},$("#ca-cancel").onclick=()=>$("#create-wrap").classList.add("hidden");const card=$("#login-card");card.addEventListener("mousemove",e=>{if("off"===document.documentElement.dataset.motion)return;if(loginSliding)return;const t=card.getBoundingClientRect(),a=(e.clientX-t.left)/t.width-.5,i=(e.clientY-t.top)/t.height-.5;card.style.transform=`rotateY(${7*a}deg) rotateX(${7*-i}deg)`}),card.addEventListener("mouseleave",()=>{loginSliding||(card.style.transform="")});let _flowRT,tx=0,ty=0,cx=0,cy=0;function enterApp(){window.scrollTo(0,0),$("#screen-app").classList.remove("hidden"),pickSessionTheme(),applyPrefs(),renderApp(),setView("search"),setTimeout(()=>{renderInformatica()},0),setTimeout(()=>$("#search-input").focus(),450)}function renderApp(){__syncCodigoCard();const e=me();$("#chip-avatar").textContent=e.emoji,$("#chip-name").textContent=e.name+roleIcon(e.role),renderHeroHeadline(),$("#pf-avatar").textContent=e.emoji,$("#pf-name").value=e.name,$("#pf-badge").textContent=roleLabel(e.role)+" · activa",$("#pf-created").textContent=`Cuenta creada el ${new Date(e.created).toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}`;const t=canEdit();$("#tab-settings").classList.toggle("hidden",!t),$("#tabbar").classList.toggle("solo",!t),t||$("#view-settings").classList.contains("hidden")||setView("search"),renderCats(),renderIdle(),EP_IS_MOBILE?setTimeout(()=>{renderStreaming($("#str-search").value),renderServicios($("#srv-search").value)},0):(renderStreaming($("#str-search").value),renderServicios($("#srv-search").value)),renderAccesos($("#acc-row-home")),renderAccesos($("#acc-row-srv")),renderAnuncio(),renderMurc(),setStreamTab("ventas"),applyPrefs(),$("#search-input").value="",runQuery("")}function logout(){curtainSwap(()=>{db.session=null,save(),$("#screen-app").classList.add("hidden"),$("#screen-login").classList.remove("hidden"),$("#login-pass").value="",$("#login-pass").type="password",$("#login-user").value="",$("#login-name").textContent="",buildLogin()})}function updateFlowPaths(){__syncCodigoCard();const e=$(".compras-flow");if(!e)return;const t=e.querySelector(".flow-svg");if(!t)return;const a=[...e.querySelectorAll(".flow-card")].filter(e=>e.offsetWidth>0);if(!a.length)return;const i=e.getBoundingClientRect();if(!i.width||!i.height)return;const s=a.map(e=>{const t=e.getBoundingClientRect();return{x:(e.classList.contains("flow-l")?t.right:t.left)-i.left,y:t.top-i.top+t.height/2}});t.setAttribute("viewBox",`0 0 ${i.width} ${i.height}`),t.removeAttribute("preserveAspectRatio");let n=`M${s[0].x},${s[0].y}`;for(let e=1;e<s.length;e++){const t=s[e-1],a=s[e],i=(t.y+a.y)/2;n+=` C${t.x},${i} ${a.x},${i} ${a.x},${a.y}`}t.querySelectorAll("path").forEach(e=>{e.setAttribute("d",n),e.removeAttribute("vector-effect")});const o=t.querySelectorAll("circle");s.forEach((e,t)=>{const a=o[2*t],i=o[2*t+1];a&&(a.setAttribute("cx",e.x),a.setAttribute("cy",e.y)),i&&(i.setAttribute("cx",e.x),i.setAttribute("cy",e.y))}),o.forEach((e,t)=>{e.style.display=t<2*s.length?"":"none"})}function setView(e){window.scrollTo(0,0),"settings"!==e||canEdit()||(e="search",toast("Ajustes disponible solo para 👑 Admin y 🛡️ Subadmin","🔒")),$("#view-search").classList.toggle("hidden","search"!==e),$("#view-streaming").classList.toggle("hidden","streaming"!==e),$("#view-servicios").classList.toggle("hidden","servicios"!==e),$("#view-documentos").classList.toggle("hidden","documentos"!==e),$("#view-informatica").classList.toggle("hidden","informatica"!==e),$("#view-compras").classList.toggle("hidden","compras"!==e),$("#view-personalizados").classList.toggle("hidden","personalizados"!==e),$("#view-settings").classList.toggle("hidden","settings"!==e);const t="streaming"===e||"servicios"===e||"documentos"===e||"informatica"===e||"compras"===e||"personalizados"===e||"zona"===e?"search":e;$("#tabbar").dataset.active=t,$$(".tab").forEach(e=>e.classList.toggle("active",e.dataset.view===t)),"search"===e&&setTimeout(()=>$("#search-input").focus(),200),"streaming"===e&&setStreamTab("ventas"),"informatica"===e&&(renderInformatica(),renderInfCreativityGrid()),"compras"===e&&(__syncCodigoCard(),requestAnimationFrame(updateFlowPaths)),"documentos"===e&&renderServicios($("#doc-search")?$("#doc-search").value:"","documentos")}function renderAnuncio(){}function anuncioModal(){const editable=canEdit();let masked=false;const viewHTML=()=>`<div id="anu-view"><p class="fine" id="anu-text-view" style="font-size:.95rem;font-weight:700;line-height:1.55;margin:0 0 18px;text-align:center${masked?";filter:blur(6px);user-select:none":""}">${esc((db.anuncio&&db.anuncio.text)||"Sin anuncio todavía.")}</p></div>`,editHTML=()=>{const d=db.anuncio||{text:""};return`<div id="anu-view"><div class="field glass-in ta"><textarea id="anu-input" maxlength="160" placeholder="Escribe el anuncio para todos los usuarios…">${esc(d.text||"")}</textarea></div><div class="m-row"><button class="btn ghost small" id="anu-cancel-edit" type="button">Cancelar</button><button class="btn btn-primary small" id="anu-save" type="button">Publicar</button></div></div>`};openModal(`${editable?'<button type="button" class="modal-eye-toggle" id="anu-vis-toggle" title="Ocultar/mostrar anuncio">👁️</button>':""}<div class="m-ico m-ico-bot">${robotSVG()}</div><h4>Anuncio</h4>${viewHTML()}<div class="m-row">${editable?'<button class="btn ghost small" id="anu-edit-btn" type="button">✎ Editar</button>':""}<button class="btn ghost" data-close type="button">Cerrar</button></div>`),editable&&($("#anu-vis-toggle").onclick=()=>{masked=!masked;const e=$("#anu-vis-toggle");e.textContent=masked?"🙈":"👁️",e.classList.toggle("off",masked);const t=$("#anu-view");t&&(t.outerHTML=viewHTML())},$("#anu-edit-btn").onclick=()=>{$("#anu-view").outerHTML=editHTML(),$("#anu-input").focus(),$("#anu-cancel-edit").onclick=()=>{$("#anu-view").outerHTML=viewHTML()},$("#anu-save").onclick=()=>{const v=$("#anu-input").value.trim();if(v.length<3)return toast("Escribe el anuncio (mín. 3 letras)","✍️");db.anuncio={text:v,by:me().name,fecha:Date.now()},save(),$("#anu-view").outerHTML=viewHTML(),toast("Anuncio publicado para todos los usuarios","📢")}})}function setStreamTab(e){"reporte"!==e&&"registros"!==e&&"hub"!==e||(e="ventas"),"codigo"!==e||canSeeCodigo()||(e="ventas",toast("Código no disponible para tu cuenta","🔒")),["hub","ventas","codigo","biblioteca"].forEach(t=>{const a=$("#stream-"+t);a&&a.classList.toggle("hidden",t!==e)}),renderStreamHub(),(()=>{const t=$("#view-streaming .hero .display");t&&(t.textContent="biblioteca"===e?"Todo Digital":"codigo"===e?"Código":"Streaming")})(),"ventas"===e&&renderStreaming($("#str-search").value),"biblioteca"===e&&renderBiblioteca(($("#bib-search")||{}).value||"")}function renderStreamHub(){const e=$("#btn-go-codigo");e&&e.classList.toggle("hidden",!canSeeCodigo())}function __syncCodigoCard(){const e=$("#flip-codigo");e&&e.classList.toggle("hidden",!canSeeCodigo())}function __goFlip(e){window.__codigoFromHome="codigo"===e&&"compras","zona"===e?setView("zona"):"codigo"===e?(setView("streaming"),setStreamTab("codigo")):setView(e)}addEventListener("pointermove",e=>{tx=26*(e.clientX/innerWidth-.5),ty=26*(e.clientY/innerHeight-.5),mouse.x=e.clientX*DPR,mouse.y=e.clientY*DPR}),function e(){cx+=.04*(tx-cx),cy+=.04*(ty-cy),"off"!==document.documentElement.dataset.motion&&($("#orbs").style.transform=`translate(${cx}px,${cy}px)`),requestAnimationFrame(e)}(),$("#btn-logout").onclick=()=>{logout(),toast("Sesión cerrada","🔒")},setInterval(()=>{const e=new Date;$("#tb-time").textContent=e.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"}),$("#tb-date").textContent=e.toLocaleDateString("es-ES",{weekday:"short",day:"numeric",month:"short"})},1e3),$("#chip-btn").onclick=e=>{e.stopPropagation();const t=$("#chip-menu");if(!t.classList.contains("hidden"))return void t.classList.add("hidden");t.innerHTML='<button class="out" id="menu-out">🔒 Cerrar sesión</button>',t.classList.remove("hidden"),$("#menu-out").onclick=()=>{t.classList.add("hidden"),logout()}},document.addEventListener("click",e=>{e.target.closest("#chip-menu")||e.target.closest("#chip-btn")||$("#chip-menu").classList.add("hidden")}),window.addEventListener("resize",()=>{clearTimeout(_flowRT),_flowRT=setTimeout(updateFlowPaths,120)}),window.addEventListener("resize",()=>{if(loginSliding)return;const[e,t]=measureLoginPanels(),a=0===loginPanelIdx?e:t;sliderViewport.style.height=a+"px",sliderTrack.style.transform=`translateY(${0===loginPanelIdx?0:-e}px)`}),$$(".tab").forEach(e=>e.onclick=()=>setView(e.dataset.view)),$$(".rail-btn").forEach(e=>e.onclick=()=>{$$(".rail-btn").forEach(e=>e.classList.remove("active")),e.classList.add("active");const t=document.getElementById(e.dataset.panel);$$("#view-settings .panel").forEach(e=>e.classList.toggle("open",e===t)),t.scrollIntoView({behavior:"smooth",block:"start"})}),window.epInitSettingsAccordion=function(){$$("#view-settings .panel").forEach(e=>{const t=e.firstElementChild;if(!t||!t.classList.contains("p-head"))return;if(e.dataset.epAccordionInit)return;e.dataset.epAccordionInit="1";t.querySelectorAll(".panel-caret").forEach(c=>c.remove());const a=document.createElement("span");a.className="panel-caret";a.textContent="▾";t.appendChild(a);const i=[...e.children].filter(c=>c!==t&&!c.classList.contains("panel-body")),s=document.createElement("div");s.className="panel-body";const n=document.createElement("div");i.forEach(c=>n.appendChild(c));s.appendChild(n);e.appendChild(s);t.addEventListener("click",()=>e.classList.toggle("open"))})},window.epResetSettingsAccordion=function(){$$("#view-settings .panel").forEach(e=>{if(!e.dataset.epAccordionInit)return;const t=e.firstElementChild;if(t)t.querySelectorAll(".panel-caret").forEach(c=>c.remove());const body=e.querySelector(":scope > .panel-body");if(body){const inner=body.firstElementChild;if(inner){while(inner.firstChild)e.insertBefore(inner.firstChild,body);}body.remove();}delete e.dataset.epAccordionInit;e.classList.remove("open")})},epInitSettingsAccordion(),$$(".flip[data-tab]").forEach(e=>{e.addEventListener("click",()=>setStreamTab(e.dataset.tab)),e.addEventListener("keydown",t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),setStreamTab(e.dataset.tab))})}),$$(".flip[data-go]").forEach(e=>{e.addEventListener("click",()=>__goFlip(e.dataset.go)),e.addEventListener("keydown",t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),__goFlip(e.dataset.go))})}),function(){const items={"pers-appweb":{icon:"📱",title:"App/Web",desc:"Desarrollo de aplicaciones y sitios web a la medida.",msg:"Hola, quiero cotizar el desarrollo de una App/Web personalizada."},"pers-invitaciones":{icon:"💌",title:"Invitaciones digitales",desc:"Diseños personalizados de invitaciones digitales para tus eventos.",msg:"Hola, quiero cotizar una invitación digital personalizada."}};Object.keys(items).forEach(id=>{const el=$("#"+id);if(!el)return;const open=()=>{const it=items[id];openModal(`<div class="m-ico">${it.icon}</div><h4>${esc(it.title)}</h4><p>${esc(it.desc)}</p><div class="m-row"><button class="btn btn-primary" id="m-wa-pers"><span class="svc-svg svc-svg-inline" style="width:1.7em;height:1.7em"><img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366" alt="WhatsApp" loading="lazy" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.7)) drop-shadow(0 0 7px rgba(0,0,0,.45))"></span> Pedir por WhatsApp</button></div><div class="m-row"><button class="btn ghost" data-close>Cerrar</button></div>`),$("#m-wa-pers").onclick=()=>{const _wt=window.open("","_blank");try{confettiBurst($("#m-wa-pers"))}catch(e){}toast("Solicitud enviada","📁"),_wt?_wt.location.href=waLink(it.msg):location.href=waLink(it.msg)}};el.addEventListener("click",open),el.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),open())})})}(),function(){const el=document.getElementById("pers-documentos");if(!el)return;const go=()=>setView("documentos");el.addEventListener("click",go),el.addEventListener("keydown",e=>{"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),go())})}(),$$("[data-back]").forEach(e=>e.onclick=()=>{const t=window.__codigoFromHome;t?(window.__codigoFromHome=!1,setView(t)):setStreamTab("ventas")});$$("[data-back-view]").forEach(e=>e.onclick=()=>setView(e.dataset.backView));/* ===== Botón "Volver" junto a Inicio (barra inferior) =====
   Aparece al hacer scroll hacia abajo (>40 px) cuando la vista abierta tiene un botón "← Volver" en su parte superior,
   y se oculta al regresar arriba o al subir 40 px. Al tocarlo, ejecuta el mismo "Volver" de esa vista. */
!function(){
  let lastY=Math.max(0,window.scrollY||0),floating=false,accum=0,ticking=false;
  const tb=document.getElementById("tabbar"),btnBack=document.getElementById("tab-back");
  // limpia posiciones fijas que versiones anteriores dejaron guardadas en el HTML
  $$(".back-btn").forEach(function(b){b.classList.remove("back-btn-floating");["position","top","left","bottom","zIndex","margin"].forEach(function(k){b.style[k]=""})});
  function activeBack(){return $$(".back-btn").find(function(b){return !b.closest("#view-settings")&&b.getClientRects().length>0})||null}
  function update(){
    if(!tb||!btnBack)return;
    const show=floating&&!!activeBack();
    tb.classList.toggle("has-back",show);
    btnBack.setAttribute("aria-hidden",show?"false":"true");
    btnBack.tabIndex=show?0:-1;
    const ini=tb.querySelector('.tab[data-view="search"]');
    if(ini&&ini.offsetWidth){tb.style.setProperty("--ind-w",ini.offsetWidth+"px");tb.style.setProperty("--ind-x",Math.max(0,ini.offsetLeft-6)+"px")}
  }
  window.__epBackSync=function(reset){
    if(reset){floating=false;accum=0;lastY=Math.max(0,window.scrollY||0)}
    update();
  };
  if(btnBack)btnBack.addEventListener("click",function(){const b=activeBack();if(b)b.click()});
  window.addEventListener("resize",update);
  window.addEventListener("load",update);
  window.visualViewport&&window.visualViewport.addEventListener("resize",update);
  window.addEventListener("scroll",function(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){
      const y=Math.max(0,window.scrollY||0),d=y-lastY;
      if(d>0)accum=accum>0?accum+d:d;else if(d<0)accum=accum<0?accum+d:d;
      if(y<=10){if(floating){floating=false;update()}accum=0}
      else if(accum>40&&!floating){floating=true;update();accum=0}
      else if(accum<-40&&floating){floating=false;update();accum=0}
      lastY=y;ticking=false;
    });
  },{passive:true});
  // cada vez que cambia de vista o de pestaña de Streaming, se recalcula si hay botón "Volver" disponible
  ["setView","setStreamTab"].forEach(function(n){
    const f=window[n];if(typeof f!=="function"||f.__epBack)return;
    const w=function(){const r=f.apply(this,arguments);try{window.__epBackSync(true)}catch(e){}return r};
    w.__epBack=true;window[n]=w;
  });
  update();
}();let activeStreamCat="__all__";function renderStreamCatTabs(){const e=$("#stream-cat-tabs");if(!e)return;const t=canEdit(),a=db.streamCats||[];if(!a.length&&!t)return void(e.innerHTML="");const i=(e,t,a="")=>`<button type="button" class="stream-cat-pill${activeStreamCat===e?" active":""}" data-cat="${e}">${a?a+" ":""}${esc(t)}</button>`;e.innerHTML=i("__all__","Todas")+a.map(e=>i(e.id,e.name)).join("")+(db.streaming.some(e=>!e.catId)?i("__none__","Sin categoría"):"")+(t?'<button type="button" class="stream-cat-pill add-cat" id="stream-cat-manage">🗂️ Categorías</button>':""),e.querySelectorAll("[data-cat]").forEach(e=>e.onclick=()=>{activeStreamCat=e.dataset.cat,renderStreaming($("#str-search").value)});const s=$("#stream-cat-manage");s&&(s.onclick=streamCatManageModal)}function streamCatManageModal(){const e=()=>(db.streamCats||[]).map(e=>{const t=db.streaming.filter(t=>t.catId===e.id).length;return`<div class="set-row" data-scid="${e.id}"><div class="lbl"><b>${esc(e.name)}</b><small>${t} servicio(s)</small></div>\n      <button type="button" class="btn small ghost" data-screname="${e.id}">✏️</button>\n      <button type="button" class="btn small danger" data-scdel="${e.id}">🗑</button></div>`}).join("")||'<p class="fine">Aún no tienes categorías. Crea una abajo.</p>';openModal(`<div class="m-ico">🗂️</div><h4>Categorías de Streaming</h4><p>Divide tu catálogo en secciones (ej. Cine, Música, XxX…).</p>\n  <div id="stream-cat-list" style="text-align:left;margin-bottom:14px">${e()}</div>\n  <div class="field glass-in inline"><input id="stream-cat-new" placeholder="Nombre de la nueva categoría" maxlength="30"><button type="button" class="btn small btn-primary" id="stream-cat-add">＋ Crear</button></div>\n  <div class="m-row"><button class="btn ghost" data-close>Cerrar</button></div>`);const t=()=>{$("#stream-cat-list").innerHTML=e(),a()};function a(){$$("#stream-cat-list [data-screname]").forEach(e=>e.onclick=()=>{const a=db.streamCats.find(t=>t.id===e.dataset.screname);if(!a)return;const i=prompt("Nuevo nombre de la categoría:",a.name);i&&i.trim()&&(a.name=i.trim(),save(),t(),renderStreamCatTabs(),renderStreaming($("#str-search").value),toast("Categoría renombrada","✏️"))}),$$("#stream-cat-list [data-scdel]").forEach(e=>e.onclick=()=>{const a=e.dataset.scdel,i=db.streamCats.find(e=>e.id===a);i&&confirm(`¿Eliminar la categoría «${i.name}»? Los servicios quedarán sin categoría.`)&&(db.streamCats=db.streamCats.filter(e=>e.id!==a),db.streaming.forEach(e=>{e.catId===a&&(e.catId=null)}),activeStreamCat===a&&(activeStreamCat="__all__"),save(),t(),renderStreamCatTabs(),renderStreaming($("#str-search").value),toast("Categoría eliminada","🗑"))})}a(),$("#stream-cat-add").onclick=()=>{const e=$("#stream-cat-new").value.trim();if(!e)return toast("Escribe un nombre","✍️");db.streamCats.push({id:uid(),name:e}),save(),$("#stream-cat-new").value="",t(),renderStreamCatTabs(),toast(`Categoría «${e}» creada`,"🗂️")}}function renderStreaming(e=""){const t=norm(e.trim()),a=canEdit(),i=e=>!(t&&!norm(e.title).includes(t))&&!(!1===e.disponible&&!a),s=t?`<p class="grid-empty">Sin coincidencias para «${esc(e)}».</p>`:`<p class="grid-empty">Catálogo vacío${a?" · usa ＋ para añadir":""}.</p>`,n=a&&!t?'<button class="scard add-card" id="add-service"><span class="s-cover dashed">＋</span><span class="s-title">Añadir servicio</span><span class="s-sub">👑 / 🛡️</span></button>':"";let o="";if("__all__"===activeStreamCat){const e=db.streamCats||[],t=[];e.forEach(e=>{const a=db.streaming.filter(t=>t.catId===e.id&&i(t));a.length&&t.push({name:e.name,list:a})});const a=db.streaming.filter(e=>!e.catId&&i(e));a.length&&t.push({name:e.length?"Sin categoría":"",list:a}),o=t.length?t.map((e,a)=>`${e.name?`<h3 class="stream-cat-heading">${esc(e.name)}</h3>`:""}<div class="stream-grid">${e.list.map((e,t)=>cardHTML(e,t)).join("")}${a===t.length-1?n:""}</div>`).join(""):`<div class="stream-grid">${s}${n}</div>`}else{o=`<div class="stream-grid">${db.streaming.filter(e=>!!i(e)&&("__none__"===activeStreamCat?!e.catId:e.catId===activeStreamCat)).map((e,t)=>cardHTML(e,t)).join("")||s}${n}</div>`}$("#stream-grid").innerHTML=o,$$("#stream-grid [data-sid]").forEach(e=>bindCard(e));const r=$("#add-service");r&&(r.onclick=()=>editServiceModal(null)),$("#btn-msg-default-all").classList.toggle("hidden",!a),$("#btn-copy-stock").classList.toggle("hidden",!a),renderStreamCatTabs(),renderInfCreativityGrid()}function cardHTML(e,t){const a=COVER_MAP[e.id]||COVER_BY_NAME[norm(e.title)]||COVER[t%COVER.length],i=priceForRole(e),PL=streamPlans(e),s=!1===e.disponible,n=!(!e.durations||!Object.values(e.durations).some(e=>e&&e.enabled&&null!=e.price));return`<button class="scard reveal${s?" s-off":""}" style="animation-delay:${Math.min(35*t,600)}ms" data-sid="${e.id}">\n    ${canEdit()?'<span class="s-admin"><span class="s-dup" title="Duplicar">⧉</span><span class="s-edit" title="Editar">✎</span><span class="s-del" title="Eliminar">✕</span></span>':""}\n    <span class="s-cover" style="background:linear-gradient(135deg,${a[0]},${a[1]})">${iconHTML(e.icon)}</span>\n    <span class="s-title">${esc(e.title)}${s?' <span class="srv-off-tag">Oculto</span>':""}${n?' <span class="srv-off-tag" style="color:var(--acc2);border-color:rgba(124,245,212,.4);background:rgba(124,245,212,.1)" title="Tiene precios por duración">⏳</span>':""}</span>\n    ${e.sub?`<span class="s-sub">${esc(e.sub)}</span>`:""}\n    <span class="s-prices"><span class="s-price green">💲${i}</span><span class="s-code">🔑 ${esc(codeFor(i))}</span></span>${PL.length>1?'<span class="s-plans">'+PL.filter(x=>"1m"!==x.key).map(x=>'<span class="s-plan" data-plan="'+x.key+'"><b>'+x.short+"</b><span>$"+x.price+"</span></span>").join("")+"</span>":""}\n  </button>`}function duplicateService(e){const t=db.streaming.find(t=>t.id===e);if(!t)return;const a={...t,id:uid(),title:t.title+" (copia)"};t.durations&&(a.durations=JSON.parse(JSON.stringify(t.durations)));const i=db.streaming.findIndex(t=>t.id===e);db.streaming.splice(i+1,0,a),save(),renderStreaming($("#str-search").value),toast(`«${t.title}» duplicado`,"⧉")}function renderInfCreativityGrid(){const e=$("#inf-creativity-grid");if(!e)return;const t=(db.streamCats||[]).find(e=>norm(e.name)===norm("Creatividad y Productividad")),a=t?t.id:"gyfwkfc",i=canEdit(),s=db.streaming.filter(e=>e.catId===a&&(!1!==e.disponible||i)),n=$("#inf-creativity-heading");n&&n.classList.toggle("hidden",!s.length),e.innerHTML=s.map((e,t)=>cardHTML(e,t)).join("")||"",e.querySelectorAll("[data-sid]").forEach(e=>bindCard(e))}function bindCard(e){e.onclick=t=>{const a=db.streaming.find(t=>t.id===e.dataset.sid);if(a)return t.target.closest(".s-dup")?(t.stopPropagation(),void duplicateService(a.id)):t.target.closest(".s-edit")?(t.stopPropagation(),void editServiceModal(a)):t.target.closest(".s-del")?(t.stopPropagation(),void delServiceConfirm(a.id)):void streamDetailModal(a,(t.target.closest("[data-plan]")||{dataset:{}}).dataset.plan)}}function buildStreamingStockText(){const e=db.streaming.filter(e=>!1!==e.disponible),t=e=>{const t=e.icon&&!e.icon.includes(":")?e.icon:"🔹",a=null!=e.price2&&""!==e.price2?e.price2:e.price;return`${t} ${e.title} $${a}`},a=db.streamCats||[],i=[];if(a.length){a.forEach(a=>{const s=e.filter(e=>e.catId===a.id);s.length&&i.push(`${a.name.toUpperCase()}\n`+s.map(t).join("\n"))});const s=e.filter(e=>!e.catId);s.length&&i.push("GENERAL\n"+s.map(t).join("\n"))}else i.push(e.map(t).join("\n"));return`⚠️ RECUERDA PREGUNTAR DISPONIBILIDAD⚠️\n🌟 STOCK DISPONIBLE 🌟\n✅ Entrega inmediata | 💳 Pagos seguros${i.length?"\n\n"+i.join("\n\n"):""}`}function buildTramitesStockText(){const e=e=>{const t=e.icon&&e.icon.length<=4?e.icon:"🔹",a=priceForRole(e),i=null!=a?`$${a}`:"Cotizar";return`${t} ${e.title} ${i}`},t=[];(db.servicios||[]).forEach(a=>{const i=(a.items||[]).filter(e=>!1!==e.disponible);i.length&&t.push(`${a.name.toUpperCase()}\n`+i.map(e).join("\n"))});return`⚠️ RECUERDA PREGUNTAR REQUISITOS⚠️\n🌟TRÁMITES DISPONIBLES 🌟\n✅ Entrega rápida | 💳 Pagos seguros${t.length?"\n\n"+t.join("\n\n"):""}`}function buildInformaticaStockText(){const e=e=>{const t=priceForRole(e),a=null!=t?`$${t}`:"Cotizar";return`🔹 ${e.title}${e.sub?` (${e.sub})`:""} ${a}`},t=[],a=new Map;(db.informatica||[]).filter(e=>!1!==e.disponible).forEach(e=>{const i=e.grupo||e.title;a.has(i)||(a.set(i,[]),t.push(i)),a.get(i).push(e)});const i=t.map(t=>`${t.toUpperCase()}\n`+a.get(t).map(e).join("\n"));return`⚠️ RECUERDA PREGUNTAR DISPONIBILIDAD⚠️\n🌟 INFORMÁTICA DISPONIBLE 🌟\n✅ Entrega rápida | 💳 Pagos seguros${i.length?"\n\n"+i.join("\n\n"):""}`}const PLAN_KEYS=["1m","2m","3m","4m","6m","12m"],PLAN_SHORT={"1m":"1M","2m":"2M","3m":"3M","4m":"4M","6m":"6M","12m":"1A"},PLAN_LONG={"1m":"1 MES","2m":"2 MESES","3m":"3 MESES","4m":"4 MESES","6m":"6 MESES","12m":"1 AÑO"},PLAN_MONTHS={"1m":1,"2m":2,"3m":3,"4m":4,"6m":6,"12m":12};function planRolePrice(p){return null!=p.price2&&""!==p.price2?priceForRole(p):p.price}function streamPlans(e){const o=[],b={price:e.price,price2:e.price2,price3:e.price3};null!=b.price&&""!==b.price&&o.push({key:"1m",months:1,p:b,price:planRolePrice(b)});PLAN_KEYS.slice(1).forEach(k=>{const d=e.durations&&e.durations[k];if(!d||!d.enabled||null==d.price||""===d.price)return;const p={price:d.price,price2:d.price2,price3:d.price3},r=planRolePrice(p);null!=r&&""!==r&&o.push({key:k,months:PLAN_MONTHS[k],p:p,price:r})});const base=o.length&&"1m"===o[0].key?+o[0].price:0;return o.map(x=>({...x,short:PLAN_SHORT[x.key],long:PLAN_LONG[x.key],save:base>0&&x.months>1?Math.round(100*(1-+x.price/(base*x.months))):0}))}function planChipsHTML(P,sel){return P.length>1?'<div class="plan-chips" id="plan-chips">'+P.map(x=>'<button type="button" class="plan-chip'+(x.key===sel?" is-on":"")+'" data-plan="'+x.key+'"><span class="pc-t">'+x.short+'</span><span class="pc-p">$'+x.price+"</span>"+(x.save>0?'<span class="pc-s">-'+x.save+"%</span>":"")+"</button>").join("")+"</div>":""}function streamDetailModal(e,sel){const t=canEdit(),P=streamPlans(e),cur=P.find(x=>x.key===sel)||P[0],i=planChipsHTML(P,cur&&cur.key),pp=cur?cur.p:{price:e.price,price2:e.price2,price3:e.price3};serviceModal({icon:e.icon,title:e.title,sub:"Servicio de streaming",price:pp.price,price2:pp.price2,price3:pp.price3,periodo:cur&&"1m"!==cur.key?cur.long:"",msg0:e.msg0,msg1:e.msg1,msg2:e.msg2,fallback:db.waMsgs.streaming,extraHTML:i,adminRow:t?'<button class="btn small ghost" id="ms-edit">✏️ Editar</button><button class="btn small danger" id="ms-del">🗑 Eliminar</button>':""}),$$("#plan-chips [data-plan]").forEach(b=>b.onclick=()=>streamDetailModal(e,b.dataset.plan)),t&&($("#ms-edit").onclick=()=>{closeModal(),editServiceModal(e)},$("#ms-del").onclick=()=>{closeModal(),delServiceConfirm(e.id)})}$("#str-search").addEventListener("input",e=>renderStreaming(e.target.value)),$("#btn-msg-default-all").onclick=()=>{openModal(`<div class="m-ico">🔒</div><h4>Confirmar identidad</h4><p>Esta acción reemplazará el mensaje de WhatsApp de Estándar en los ${db.streaming.length} servicios del catálogo. Introduce tu contraseña de 👑 Admin o 🛡️ Subadmin para continuar.</p>\n  <div class="field glass-in" id="msgall-pass-field"><input type="password" id="msgall-pass" placeholder="Contraseña"></div>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="msgall-pass-ok">Confirmar</button></div>`);const e=async()=>{const e=db.users.filter(e=>"admin"===e.role||"subadmin"===e.role),t=$("#msgall-pass").value;if(!await epAdminPwOk(e,t))return shakeField($("#msgall-pass-field")),void $("#msgall-pass").select();openModal(`<div class="m-ico"><span class="svc-svg svc-svg-inline" style="width:1.7em;height:1.7em"><img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366" alt="WhatsApp" loading="lazy" style="width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.7)) drop-shadow(0 0 7px rgba(0,0,0,.45))"></span></div><h4>¿Aplicar a todos?</h4><p>Se usará el mensaje predeterminado de Streaming como Mensaje 1 (👤 Estándar) en los ${db.streaming.length} servicios del catálogo, reemplazando el que tengan.</p>\n    <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="msg-all-ok">Aplicar a todos</button></div>`),$("#msg-all-ok").onclick=()=>{db.streaming.forEach(e=>{e.msg1={target:"estandar",text:db.waMsgs.streaming}}),save(),closeModal(),renderStreaming($("#str-search").value),toast("Mensaje predeterminado aplicado a todo el catálogo","<img src='https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366' alt='' style='width:1.4em;height:1.4em;vertical-align:-0.3em;display:inline-block;filter:drop-shadow(0 1px 3px rgba(0,0,0,.65))'>")}};$("#msgall-pass-ok").onclick=e,$("#msgall-pass").addEventListener("keydown",t=>{"Enter"===t.key&&e()}),$("#msgall-pass").focus()},$("#btn-copy-stock").onclick=async()=>{const e=buildStreamingStockText();try{await navigator.clipboard.writeText(e),toast("Stock copiado al portapapeles","📋")}catch(t){const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{document.execCommand("copy"),toast("Stock copiado al portapapeles","📋")}catch(e){toast("No se pudo copiar automáticamente","⚠️")}a.remove()}},$("#btn-copy-tramites").onclick=async()=>{const e=buildTramitesStockText();try{await navigator.clipboard.writeText(e),toast("Trámites copiados al portapapeles","📋")}catch(t){const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{document.execCommand("copy"),toast("Trámites copiados al portapapeles","📋")}catch(e){toast("No se pudo copiar automáticamente","⚠️")}a.remove()}},$("#btn-copy-informatica").onclick=async()=>{const e=buildInformaticaStockText();try{await navigator.clipboard.writeText(e),toast("Informática copiada al portapapeles","📋")}catch(t){const a=document.createElement("textarea");a.value=e,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select();try{document.execCommand("copy"),toast("Informática copiada al portapapeles","📋")}catch(e){toast("No se pudo copiar automáticamente","⚠️")}a.remove()}};const VAR_CHIPS_HTML='\n      <button type="button" class="var-chip" data-ins="{icono}">🖼️ Icono</button>\n      <button type="button" class="var-chip" data-ins="{titulo}">📝 Título</button>\n      <button type="button" class="var-chip" data-ins="{precio}">💲 $Invit</button>\n      <button type="button" class="var-chip" data-ins="{precio2}">💲 $Stand</button>\n      <button type="button" class="var-chip" data-ins="{precio3}">💲 $Admin</button>\n      <button type="button" class="var-chip" data-ins="{codigo}">🔑 Código</button>';function wireVarChips(){$$(".var-chips").forEach(e=>{const t=$("#"+e.dataset.for);t&&e.querySelectorAll(".var-chip").forEach(e=>{e.onclick=()=>{const a=e.dataset.ins,i=t.selectionStart??t.value.length,s=t.selectionEnd??t.value.length;t.value=t.value.slice(0,i)+a+t.value.slice(s),t.focus();const n=i+a.length;t.setSelectionRange(n,n)}})})}function roleCard(e,t,a,i,s,n,o,r,c){return`<div class="role-card ${e}">\n    <div class="msg-opt-head role-toggle"><span>${t}</span></div>\n    <div class="role-card-body"><div>\n    <div class="field glass-in price-field"><span class="price-sign">💲</span><input id="${a}" type="number" min="0" step="1" placeholder="${i}" value="${s}"></div>\n    ${c?`<div class="field glass-in"><input id="${c.id}" placeholder="${esc(c.ph||"Indicaciones (popup) para este rol")}" maxlength="120" value="${esc(c.val||"")}"></div>`:""}\n    <div class="var-chips" data-for="${n}">${VAR_CHIPS_HTML}</div>\n    <div class="field glass-in ta"><textarea id="${n}" maxlength="500" placeholder="Escribe el mensaje para WhatsApp…">${esc(o)}</textarea></div>\n    <p class="msg-hint">${r}</p>\n    </div></div>\n  </div>`}function editServiceModal(e){const t=!e,a=t||!1!==e.disponible;async function i(){const e=$("#sv-icoquery").value.trim(),t=$("#sv-icoquery-results"),a=$("#sv-icoquery-status");if(!e)return t.innerHTML="",void(a.textContent="");a.textContent="Buscando…",t.innerHTML="";try{const i=await fetch(`${iconifyBase()}/search?query=${encodeURIComponent(e)}&limit=30`),s=(await i.json()).icons||[];if(!s.length)return void(a.textContent="Sin resultados");a.textContent=`${s.length} resultado(s) · toca uno para usarlo`,t.innerHTML=s.map(e=>`<button type="button" class="icon-opt" data-if="${esc(e)}" title="${esc(e)}">${iconHTML("if:"+e)}</button>`).join(""),t.querySelectorAll("[data-if]").forEach(e=>{e.onclick=()=>{$("#sv-icon").value="if:"+e.dataset.if,t.querySelectorAll(".icon-opt").forEach(t=>t.classList.toggle("sel",t===e));const a=$("#sv-icon-preview");a&&(a.innerHTML=iconHTML("if:"+e.dataset.if)),toast("Seleccionado","🖼️")}})}catch(e){a.textContent="Error al buscar (revisa tu conexión o la API en Ajustes › Iconify)"}}openModal(`<button type="button" class="modal-eye-toggle${a?"":" off"}" id="sv-vis-toggle" title="Mostrar/ocultar para todos">${a?"👁️":"🙈"}</button>\n  <div class="m-ico" id="sv-icon-preview">${t?"➕":iconHTML(e.icon)}</div><h4>${t?"Añadir servicio":"Editar servicio"}</h4><p>Disponible para Admin 👑 y Subadmin 🛡️.</p>\n  <div class="sv-tabs" id="sv-tabs">\n    <button type="button" class="sv-tab-btn active" data-tab="general">⚙️ General</button>\n    <button type="button" class="sv-tab-btn" data-tab="precios">💲 Precios</button>\n    <button type="button" class="sv-tab-btn" data-tab="duraciones">⏳ Duraciones</button>\n  </div>\n  <div class="sv-tab-panel active" data-panel="general">\n    <div class="grid-sv">\n      <div class="field glass-in"><input id="sv-icon" maxlength="20" placeholder="📺" value="${t?"":esc(e.icon)}"></div>\n      <div class="field glass-in"><input id="sv-title" placeholder="Nombre del servicio" maxlength="40" value="${t?"":esc(e.title)}"></div>\n    </div>\n    <div class="field glass-in"><input id="sv-sub" placeholder="Subtítulo (opcional)" maxlength="60" value="${t?"":esc(e.sub||"")}"></div>\n    <div class="field glass-in"><select id="sv-cat">\n      <option value="">📂 Sin categoría</option>\n      ${(db.streamCats||[]).map(a=>`<option value="${a.id}"${t||e.catId!==a.id?"":" selected"}>${esc(a.name)}</option>`).join("")}\n      <option value="__new__">➕ Nueva categoría…</option>\n    </select></div>\n    <div class="field glass-in hidden" id="sv-cat-new-wrap"><input id="sv-cat-new" placeholder="Nombre de la nueva categoría" maxlength="30"></div>\n    <div class="icon-menu-wrap">\n      <p class="msg-hint">🔎 Busca el logo de marca en Iconify:</p>\n      <div class="field glass-in inline"><input id="sv-icoquery" placeholder="Ej. netflix, disney, hbo…" maxlength="40"><button type="button" class="btn small ghost" id="sv-icoquery-btn">Buscar</button></div>\n      <div class="icon-menu" id="sv-icoquery-results"></div>\n      <p class="msg-hint" id="sv-icoquery-status"></p>\n    </div>\n  </div>\n  <div class="sv-tab-panel" data-panel="precios">\n    <h4 class="display" style="font-size:.95rem;margin:0 0 8px">💲 Precios y mensajes por categoría</h4>\n    ${roleCard("role-card-guest","🙂 Invitado","sv-price","Precio invitado 💲",t?"":e.price,"sv-msg0",t?"":e.msg0&&e.msg0.text||"","Mensaje de WhatsApp que verá el Invitado · el {codigo} nunca se muestra en pantalla, solo va dentro de este mensaje · vacío = usa el mensaje global.")}\n    ${roleCard("role-card-std","👤 Revendedores / Estándar","sv-price2","Precio revendedor/estándar",t?"":e.price2||"","sv-msg1",t?"":e.msg1&&e.msg1.text||"","Mensaje de WhatsApp para Revendedores/Estándar · vacío = usa el mensaje global.")}\n    ${roleCard("role-card-admin","👑 Admin / 🛡️ Subadmin","sv-price3","Precio admin/subadmin",t?"":e.price3||"","sv-msg2",t?"":e.msg2&&e.msg2.text||"","Mensaje de WhatsApp para Admin/Subadmin · vacío = usa el mensaje global.")}\n  </div>\n  <div class="sv-tab-panel" data-panel="duraciones">\n    <h4 class="display" style="font-size:.95rem;margin:0 0 8px">⏳ Duraciones y precio por mes</h4>\n    <p class="msg-hint" style="margin:-4px 0 10px">Opcional · por defecto todas vienen desactivadas. Actívalas y ponles precio solo si este servicio se vende por duración (ej. 3 meses, 1 año).</p>\n    <div id="sv-durations">${DURATION_OPTIONS.map(a=>{const i=!t&&e.durations&&e.durations[a.key]||{enabled:!1,price:null};return`<div class="set-row" data-dur="${a.key}">\n        <div class="lbl"><b>${a.label}</b></div>\n        <div class="field glass-in" style="max-width:110px;margin:0 10px"><input type="number" min="0" class="sv-dur-price" placeholder="$" value="${null!=i.price?i.price:""}" ${i.enabled?"":"disabled"}></div>\n        <label class="switch"><input type="checkbox" class="sv-dur-toggle" ${i.enabled?"checked":""}><span class="knob"></span></label>\n      </div>`}).join("")}</div>\n  </div>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="sv-ok">${t?"Añadir":"Guardar"}</button></div>`,{lock:!0}),$$("#sv-tabs .sv-tab-btn").forEach(e=>{e.onclick=()=>{$$("#sv-tabs .sv-tab-btn").forEach(t=>t.classList.toggle("active",t===e)),$$(".sv-tab-panel").forEach(t=>t.classList.toggle("active",t.dataset.panel===e.dataset.tab))}}),$$(".role-card .role-toggle").forEach(e=>{e.onclick=()=>e.closest(".role-card").classList.toggle("open")});let s,n=a;$("#sv-vis-toggle").onclick=()=>{n=!n;const e=$("#sv-vis-toggle");e.textContent=n?"👁️":"🙈",e.classList.toggle("off",!n),toast(n?"Visible para todos":"Oculto para todos","👁️")},$("#sv-cat").onchange=()=>{$("#sv-cat-new-wrap").classList.toggle("hidden","__new__"!==$("#sv-cat").value),"__new__"===$("#sv-cat").value&&$("#sv-cat-new").focus()},$$("#sv-durations [data-dur]").forEach(e=>{const t=e.querySelector(".sv-dur-toggle"),a=e.querySelector(".sv-dur-price");t.onchange=()=>{a.disabled=!t.checked,t.checked&&a.focus()}}),$("#sv-icoquery-btn").onclick=i,$("#sv-icoquery").addEventListener("input",()=>{clearTimeout(s),s=setTimeout(i,420)}),$("#sv-icoquery").addEventListener("keydown",e=>{"Enter"===e.key&&(e.preventDefault(),clearTimeout(s),i())}),wireVarChips(),$("#sv-ok").onclick=()=>{const a=$("#sv-icon").value.trim()||"📺",i=$("#sv-title").value.trim(),s=Math.max(0,parseInt($("#sv-price").value||"0",10)),o=$("#sv-sub").value.trim(),r=Math.max(0,parseInt($("#sv-price2").value||"0",10)),c=Math.max(0,parseInt($("#sv-price3").value||"0",10));if(i.length<2)return toast("Escribe el nombre del servicio","✍️");const l=$("#sv-msg0").value.trim(),d=$("#sv-msg1").value.trim(),u=$("#sv-msg2").value.trim(),p=l?{target:"invitado",text:l}:null,m=d?{target:"estandar",text:d}:null,g=u?{target:"subadmin",text:u}:null;let f=$("#sv-cat").value;if("__new__"===f){const e=$("#sv-cat-new").value.trim();if(!e)return toast("Escribe el nombre de la nueva categoría","✍️");const t={id:uid(),name:e};db.streamCats.push(t),f=t.id}f=f||null;const v={};$$("#sv-durations [data-dur]").forEach(e=>{const t=e.dataset.dur,a=e.querySelector(".sv-dur-toggle").checked,i=e.querySelector(".sv-dur-price").value;v[t]={enabled:a,price:a&&""!==i?Math.max(0,parseInt(i,10)||0):null}}),t?db.streaming.push({id:uid(),icon:a,title:i,sub:o,price:s,price2:r,price3:c,msg0:p,msg1:m,msg2:g,disponible:n,catId:f,durations:v}):(e.icon=a,e.title=i,e.sub=o,e.price=s,e.price2=r,e.price3=c,e.msg0=p,e.msg1=m,e.msg2=g,e.disponible=n,e.catId=f,e.durations=v),save(),closeModal(),renderStreaming($("#str-search").value),renderCats(),toast(t?`«${i}» añadido`:`«${i}» actualizado`,t?"📺":"️")},$("#sv-title").focus()}function delServiceConfirm(e){const t=db.streaming.find(t=>t.id===e);t&&(openModal(`<div class="m-ico">${iconHTML(t.icon)}</div><h4>¿Eliminar «${esc(t.title)}»?</h4><p>Desaparecerá del catálogo y del buscador.</p>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn danger" id="ds-ok">Eliminar</button></div>`),$("#ds-ok").onclick=()=>{db.streaming=db.streaming.filter(t=>t.id!==e),save(),closeModal(),renderStreaming($("#str-search").value),renderCats(),toast(`«${t.title}» eliminado`,"🗑")})}function renderAccesos(e){if(!e)return;const t=document.getElementById(e.id.replace("acc-row-","acc-h-")),a0=canSeeAccesos(),cod="acc-row-home"===e.id&&canSeeCodigo(),a=a0||cod;if(t&&t.classList.toggle("hidden",!a),e.classList.toggle("hidden",!a),!a)return void(e.innerHTML="");const i=canEdit(),s=me()&&me().role,n=a0?db.accesos.filter(e=>"admin"===s||!1!==e.subVisible):[];e.innerHTML=n.map(e=>`\n   <button class="acc-btn" data-acc="${e.id}">\n     ${i?'<span class="acc-edit" title="Editar acceso">✎</span>':""}\n     <span class="acc-ico">${iconHTML(e.icon)}</span>\n     <span class="acc-txt"><b>${esc(e.name)}${i&&!1===e.subVisible?' <span class="srv-off-tag">Oculto p/ Subadmin</span>':""}</b><small>${esc(e.sub)}</small></span>\n   </button>`).join("")+(cod?'<button class="acc-btn" data-codigo="1"><span class="acc-ico">🔑</span><span class="acc-txt"><b>Código</b><small>Falla, entrega y templates</small></span></button>':"")+(i&&a0?'<button class="acc-btn acc-add">＋ Añadir acceso</button>':""),e.querySelectorAll("[data-acc]").forEach(e=>e.onclick=t=>{const a=db.accesos.find(t=>t.id===e.dataset.acc);if(a)return i&&t.target.closest(".acc-edit")?(t.stopPropagation(),void accesoModal(a)):void(a.url?window.open(a.url,"_blank"):toast(`«${a.name}» sin enlace configurado · Admin/Subadmin puede agregarlo`,"🔗"))});const o=e.querySelector(".acc-add");o&&(o.onclick=()=>accesoModal(null));const c2=e.querySelector("[data-codigo]");c2&&(c2.onclick=()=>{window.__codigoFromHome="search",setView("streaming"),setStreamTab("codigo")})}function accesoModal(e){const t=!e,a=t||!1!==e.subVisible;async function i(){const e=$("#ac-icoquery").value.trim(),t=$("#ac-icoquery-results"),a=$("#ac-icoquery-status");if(!e)return t.innerHTML="",void(a.textContent="");a.textContent="Buscando…",t.innerHTML="";try{const i=await fetch(`${iconifyBase()}/search?query=${encodeURIComponent(e)}&limit=30`),s=(await i.json()).icons||[];if(!s.length)return void(a.textContent="Sin resultados");a.textContent=`${s.length} resultado(s) · toca uno para usarlo`,t.innerHTML=s.map(e=>`<button type="button" class="icon-opt" data-if="${esc(e)}" title="${esc(e)}">${iconHTML("if:"+e)}</button>`).join(""),t.querySelectorAll("[data-if]").forEach(e=>{e.onclick=()=>{$("#ac-icon").value="if:"+e.dataset.if,t.querySelectorAll(".icon-opt").forEach(t=>t.classList.toggle("sel",t===e));const a=$("#ac-icon-preview");a&&(a.innerHTML=iconHTML("if:"+e.dataset.if)),toast("Seleccionado","🖼️")}})}catch(e){a.textContent="Error al buscar (revisa tu conexión o la API en Ajustes › Iconify)"}}let s;openModal(`<button type="button" class="modal-eye-toggle${a?"":" off"}" id="ac-subvis-toggle" title="Mostrar/ocultar para Subadmin">${a?"👁️":"🙈"}</button>\n  <div class="m-ico" id="ac-icon-preview">${t?"🔗":iconHTML(e.icon)}</div><h4>${t?"Nuevo acceso rápido":"Editar acceso rápido"}</h4><p>El enlace se abrirá en una pestaña nueva.</p>\n  <div class="grid-sv">\n    <div class="field glass-in"><input id="ac-icon" maxlength="40" placeholder="📺" value="${t?"":esc(e.icon)}"></div>\n    <div class="field glass-in"><input id="ac-name" placeholder="Nombre (ej. duli)" maxlength="24" value="${t?"":esc(e.name)}"></div>\n  </div>\n  <div class="icon-menu-wrap">\n    <p class="msg-hint">🔎 Busca un icono en Iconify:</p>\n    <div class="field glass-in inline"><input id="ac-icoquery" placeholder="Ej. link, cloud, web…" maxlength="40"><button type="button" class="btn small ghost" id="ac-icoquery-btn">Buscar</button></div>\n    <div class="icon-menu" id="ac-icoquery-results"></div>\n    <p class="msg-hint" id="ac-icoquery-status"></p>\n  </div>\n  <div class="field glass-in"><input id="ac-sub" placeholder="Subtítulo (ej. Sistema Web)" maxlength="24" value="${t?"":esc(e.sub)}"></div>\n  <div class="field glass-in"><input id="ac-url" placeholder="URL (ej. https://…)" value="${t?"":esc(e.url||"")}"></div>\n  <p class="fine" id="ac-subvis-hint" style="margin:-8px 0 12px">${a?"🛡️ Subadmin puede ver este acceso (si tiene la sección activada en Ajustes)":"🛡️ Subadmin NO puede ver este acceso, aunque tenga la sección activada"}</p>\n  <div class="m-row">\n    ${t?"":'<button class="btn danger" id="ac-del">🗑</button>'}\n    <button class="btn ghost" data-close>Cancelar</button>\n    <button class="btn btn-primary" id="ac-ok">${t?"Añadir":"Guardar"}</button>\n  </div>`),$("#ac-icoquery-btn").onclick=i,$("#ac-icoquery").addEventListener("input",()=>{clearTimeout(s),s=setTimeout(i,420)}),$("#ac-icoquery").addEventListener("keydown",e=>{"Enter"===e.key&&(e.preventDefault(),clearTimeout(s),i())}),$("#ac-icon").addEventListener("input",()=>{const e=$("#ac-icon-preview");e&&(e.innerHTML=iconHTML($("#ac-icon").value.trim()))});let n=a;$("#ac-subvis-toggle").onclick=()=>{n=!n;const e=$("#ac-subvis-toggle");e.textContent=n?"👁️":"🙈",e.classList.toggle("off",!n),$("#ac-subvis-hint").textContent=n?"🛡️ Subadmin puede ver este acceso (si tiene la sección activada en Ajustes)":"🛡️ Subadmin NO puede ver este acceso, aunque tenga la sección activada",toast(n?"Visible para Subadmin":"Oculto para Subadmin","👁️")},$("#ac-ok").onclick=()=>{const a=$("#ac-icon").value.trim()||"🔗",i=$("#ac-name").value.trim(),s=$("#ac-sub").value.trim()||"Acceso",o=$("#ac-url").value.trim();if(i.length<2)return toast("Escribe el nombre","✍️");t?db.accesos.push({id:uid(),icon:a,name:i,sub:s,url:o,subVisible:n}):(e.icon=a,e.name=i,e.sub=s,e.url=o,e.subVisible=n),save(),closeModal(),renderAccesos($("#acc-row-home")),renderAccesos($("#acc-row-srv")),toast(t?`Acceso «${i}» añadido`:`Acceso «${i}» actualizado`,"🔗")},t||($("#ac-del").onclick=()=>{db.accesos=db.accesos.filter(t=>t.id!==e.id),save(),closeModal(),renderAccesos($("#acc-row-home")),renderAccesos($("#acc-row-srv")),toast(`Acceso «${e.name}» eliminado`,"🗑")}),$("#ac-name").focus()}const SRV_SEC_LOGOS=[{test:/SAT/i,url:"https://docsmx.shop/_next/image?url=%2Fimg%2Flogosat.png&w=32&q=75"},{test:/INFONAVIT/i,url:"https://docsmx.shop/img/infonavit.svg"},{test:/IMSS/i,url:"https://docsmx.shop/_next/image?url=%2Fimg%2Fimss.png&w=32&q=75"}];function srvSecIconHTML(raw){
  const v = String(raw || "").trim(); if (!v) return "";
  const img = (u, mir) => `<img src="${esc(u)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer"${mir ? ` data-mir="${esc(mir)}"` : ""} onerror="if(this.dataset.mir&&!this.dataset.tried){this.dataset.tried=1;this.src=this.dataset.mir}else{this.parentNode&&this.parentNode.remove()}">`;
  if (/^(https?:)?\/\/|^data:image\//i.test(v)) return img(v);
  if (v.startsWith("if:")) { const t = v.slice(3), i = t.indexOf(":"); const pr = i > -1 ? t.slice(0, i) : t, nm = i > -1 ? t.slice(i + 1) : ""; return img(`${iconifyBase()}/${encodeURIComponent(pr)}/${encodeURIComponent(nm)}.svg`); }
  if (v.startsWith("svg2:")) { const p = v.split(":"); const path = `${encodeURIComponent(p[1] || "")}/${encodeURIComponent(p[2] || "default")}.svg`; return img("https://thesvg.org/icons/" + path, "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/" + path); }
  if (v.startsWith("svg:")) return iconHTML(v);
  return esc(v);
}
function srvSectionLogo(sec){
  const name = typeof sec === "string" ? sec : (sec && sec.name) || "";
  const own = sec && typeof sec === "object" ? srvSecIconHTML(sec.icon) : "";
  if (own) return `<span class="srv-sec-logo srv-sec-ico">${own}</span>`;
  const t = SRV_SEC_LOGOS.find(t => t.test.test(name));
  return t ? `<span class="srv-sec-logo srv-sec-ico"><img src="${t.url}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.remove()"></span>` : "";
}
const findSec=(e,r="servicios")=>db[r].find(t=>t.id===e);function findSrvItem(e,r="servicios"){for(const t of db[r]){const a=t.items.find(t=>t.id===e);if(a)return{sec:t,it:a}}return null}function renderServicios(e="",store="servicios"){const t=norm(e.trim()),a=canEdit(),isDoc="documentos"===store,i=$(isDoc?"#doc-list":"#srv-list"),wUno=isDoc?"documento":"trámite";let s=db[store].map(e=>a?e:{...e,items:e.items.filter(e=>!1!==e.disponible)});t&&(s=s.map(e=>{if(norm(e.name).includes(t))return e;const a=e.items.filter(e=>norm(e.title).includes(t));return a.length?{...e,items:a}:null}).filter(Boolean)),s=s.filter(e=>a||e.items.length),i.innerHTML=s.length?s.map(e=>`\n   <section class="srv-sec glass reveal" id="srv-sec-${e.id}">\n     <header class="srv-head">\n       <span class="srv-name display">${isDoc?"":srvSectionLogo(e)}${esc(e.name)}</span>\n       <span class="srv-count">${e.items.length} ${wUno}${1!==e.items.length?"s":""}</span>\n       ${a?`<span class="uact"><button class="icon-btn" data-sec-ren="${e.id}" title="Renombrar sección">✎</button><button class="icon-btn danger" data-sec-del="${e.id}" title="Eliminar sección">🗑</button></span>`:""}\n     </header>\n     ${e.items.map(t=>`\n       <div class="srv-item${!1===t.disponible?" srv-off":""}" data-sec="${e.id}" data-iid="${t.id}">\n         <span class="srv-dot">${t.icon||defaultSrvIcon(t.title)}</span>\n         <span class="srv-title-wrap">\n           <span class="srv-title">${esc(t.title)}${!1===t.disponible?' <span class="srv-off-tag">No disponible</span>':""}</span>\n           ${t.badge?`<span class="srv-badge-row">${String(t.badge).split(",").map(e=>e.trim()).filter(Boolean).map(e=>`<span class="srv-sub-badge">${esc(e)}</span>`).join("")}</span>`:""}\n         </span>\n         <span class="s-price">${(()=>{const e=priceForRole(t);return null!=e?"💲"+e:"Cotizar"})()}</span>\n         ${a?`<span class="uact"><button type="button" class="icon-btn mini eye-toggle${!1===t.disponible?" eye-off":""}" data-it-eye title="${!1===t.disponible?"Mostrar":"Ocultar"} servicio" onclick="event.stopPropagation()">${!1===t.disponible?"🙈":"👁️"}</button><button class="icon-btn mini" data-it-edit title="Editar">✎</button><button class="icon-btn mini danger" data-it-del title="Eliminar">✕</button></span>`:""}\n       </div>`).join("")||`<p class="fine">Sin ${wUno}s todavía. Añade el primero.</p>`}\n     ${a?`<button class="srv-add" data-sec-add="${e.id}">＋ Añadir ${wUno}</button>`:""}\n   </section>`).join(""):`<p class="fine">Sin coincidencias para «${esc(e)}».</p>`,i.querySelectorAll("[data-sec-ren]").forEach(e=>e.onclick=()=>sectionModal(findSec(e.dataset.secRen,store),store)),i.querySelectorAll("[data-sec-del]").forEach(e=>e.onclick=()=>delSectionConfirm(findSec(e.dataset.secDel,store),store)),i.querySelectorAll("[data-sec-add]").forEach(e=>e.onclick=()=>itemModal(findSec(e.dataset.secAdd,store),null,store)),i.querySelectorAll("[data-it-eye]").forEach(e=>e.onclick=()=>{const t=e.closest("[data-iid]"),a=findSec(t.dataset.sec,store);if(!a)return;const i=a.items.find(e=>e.id===t.dataset.iid);i&&(i.disponible=!1===i.disponible,save(),renderServicios($(isDoc?"#doc-search":"#srv-search").value,store),renderCats(),toast(`«${i.title}» ${!1!==i.disponible?"mostrado":"ocultado"}`,!1!==i.disponible?"👁️":"🙈"))}),i.querySelectorAll(".srv-item").forEach(e=>e.onclick=t=>{const a=findSec(e.dataset.sec,store);if(!a)return;const i=a.items.find(t=>t.id===e.dataset.iid);return i?t.target.closest("[data-it-edit]")?(t.stopPropagation(),void itemModal(a,i,store)):t.target.closest("[data-it-del]")?(t.stopPropagation(),void delItemConfirm(a,i,store)):void itemDetailModal(a,i,store):void 0}),isDoc?$("#btn-add-doc-section")&&$("#btn-add-doc-section").classList.toggle("hidden",!a):($("#btn-add-section").classList.toggle("hidden",!a),$("#btn-copy-tramites")&&$("#btn-copy-tramites").classList.toggle("hidden",!a))}function sectionModal(e,store="servicios"){const t=!e;openModal(`<div class="m-ico">🗂️</div><h4>${t?"Nueva sección":"Renombrar sección"}</h4><p>Ejemplos: SAT, IMSS, CFE, Agua…</p>\n  <div class="field glass-in"><input id="se-name" placeholder="Nombre de la sección" maxlength="30" value="${t?"":esc(e.name)}"></div>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="se-ok">${t?"Crear":"Guardar"}</button></div>`),$("#se-ok").onclick=()=>{const a=$("#se-name").value.trim();if(a.length<2)return toast("Escribe un nombre","✍️");t?db[store].push({id:uid(),name:a,items:[]}):e.name=a,save(),closeModal(),renderServicios($("documentos"===store?"#doc-search":"#srv-search").value,store),renderCats(),toast(t?`Sección «${a}» creada`:"Sección renombrada","🗂️")},$("#se-name").focus()}function delSectionConfirm(e,store="servicios"){openModal(`<div class="m-ico">🗂️</div><h4>¿Eliminar «${esc(e.name)}»?</h4><p>Se borrarán también sus ${e.items.length} elemento(s).</p>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn danger" id="dsec-ok">Eliminar</button></div>`),$("#dsec-ok").onclick=()=>{db[store]=db[store].filter(t=>t.id!==e.id),save(),closeModal(),renderServicios($("documentos"===store?"#doc-search":"#srv-search").value,store),renderCats(),toast(`Sección «${e.name}» eliminada`,"🗑")}}function itemModal(e,t,store="servicios"){const a=!t,i=a||!1!==t.disponible,s=a?"🧾":t.icon||defaultSrvIcon(t.title);openModal(`<button type="button" class="modal-eye-toggle${i?"":" off"}" id="it-vis-toggle" title="Mostrar/ocultar para todos">${i?"👁️":"🙈"}</button>
  ${!a&&t.req?'<button type="button" class="modal-eye-toggle" id="it-copy-req" style="right:60px" title="Copiar requisitos">📋</button>':""}
  <div class="m-ico" id="it-ico-preview">${s}</div><h4>${"documentos"===store?a?"Nuevo documento":"Editar documento":a?"Nuevo trámite":"Editar trámite"}</h4><p>Sección ${esc(e.name)} · Escritorio Público</p>\n  <fieldset class="vis-fieldset"><legend class="vis-legend"><span class="vis-legend-ico">📝</span>Título y subtítulo</legend>
  <div class="field glass-in"><input id="it-title" placeholder="Título (ej. RFC, NSS…)" maxlength="40" value="${a?"":esc(t.title)}"><button type="button" class="icon-pick-toggle" id="it-icon-toggle" title="Elegir ícono">${s}</button></div>\n  <div class="icon-pick-box hidden" id="it-icon-box"><div class="icon-pick" id="it-icon-pick">${SRV_ICONS.map(e=>`<button type="button" class="icon-pick-btn${e===s?" sel":""}" data-icon="${e}">${e}</button>`).join("")}</div></div>\n  <label class="fine" style="display:block;margin-bottom:6px;font-weight:800">🏷️ Chip(s) debajo del título (lista de trámites)</label>\n  <div class="field glass-in" style="margin-bottom:4px"><input id="it-badge" placeholder="Ej. TRAMITE OFICIAL, Por Cita" maxlength="80" value="${a?"":esc(t.badge||"")}"></div>\n  <p class="fine" style="margin:0 0 12px">(ej. TRAMITE OFICIAL, Por Cita)</p></fieldset>\n  <fieldset class="vis-fieldset"><legend class="vis-legend"><span class="vis-legend-ico">🏷️</span>Chips internos</legend>
  <label class="fine" style="display:block;margin-bottom:6px;font-weight:800">🏷️ Subtítulo (badges)</label>\n  <div class="chip-edit-list" id="it-sub-chips"></div>\n  <div class="chip-add-row" style="margin-bottom:12px"><div class="field glass-in"><input id="it-sub-new" placeholder="Escribe y presiona , o Enter (ej. Trámite oficial)" maxlength="40"></div><button type="button" class="chip-add-btn" id="it-sub-add" title="Añadir subtítulo">＋</button></div></fieldset>\n  <fieldset class="vis-fieldset"><legend class="vis-legend"><span class="vis-legend-ico">🧮</span>Formulario</legend>
  <div class="field glass-in ta"><textarea id="it-req" maxlength="500" placeholder="Requisitos">${a?"":esc(t.req||"")}</textarea></div>\n  <p class="fine" style="margin:-4px 0 6px">✍️ Escribe los datos que se piden separados por coma <b>,</b></p>\n  <div class="chip-edit-list" id="it-req-preview" style="margin-bottom:10px"></div>\n  <div class="set-row" style="margin:0 0 10px"><div class="lbl"><b>ACTIVAR/DESACTIVAR FORMULARIO</b></div><label class="switch"><input type="checkbox" id="it-reqform" ${a||!1!==t.reqForm?"checked":""}><span class="knob"></span></label></div>
  <div class="field glass-in"><input id="it-checklist" placeholder="Casilla opcional debajo del formulario (ej. Tengo una foto de mi CSF)" maxlength="80" value="${a?"":esc(t.checklist||"")}"></div>
  <p class="fine" style="margin:-4px 0 12px">✅ AL ACTIVAR, DESABILITA FORMULARIO Y PASA EN VERDE.</p></fieldset>
  <div class="field glass-in"><input id="it-entrega" placeholder="Entrega estimada (ej. 5 min)" maxlength="30" value="${a?"":esc(t.entrega||"")}"></div>\n  <fieldset class="vis-fieldset"><legend class="vis-legend"><span class="vis-legend-ico">📋</span>Datos generales</legend>
  <label class="fine" style="display:block;margin:12px 0 6px;font-weight:800">📋 Nota del formulario de requisitos</label>
  <div class="var-chips" data-for="it-note">${VAR_CHIPS_HTML}</div>\n  <div class="field glass-in ta"><textarea id="it-note" maxlength="300" placeholder="${esc(DEFAULT_REQ_NOTE)}">${a?"":esc(t.note||"")}</textarea></div>\n  <p class="msg-hint">Vacío = usa la leyenda por defecto de arriba.</p></fieldset>
  <h4 class="display" style="font-size:.95rem;margin:16px 0 8px">💲 Precios, indicaciones (popup) y mensajes por categoría</h4>\n  ${roleCard("role-card-guest","🙂 Invitado","it-price","Precio invitado 💲 (vacío = Cotizar)",a?"":t.price??"","it-msg0",a?"":t.msg0&&t.msg0.text||t.msg||"","Mensaje de WhatsApp que verá el Invitado · vacío = usa el mensaje global.",{id:"it-popup0",val:a?"":null!=t.popup0?t.popup0:t.popup||"",ph:"Indicaciones para Invitado (ej. Se entrega PDF)"})}\n  ${roleCard("role-card-std","👤 Revendedores / Estándar","it-price2","Precio revendedor/estándar (vacío = igual al invitado)",a?"":t.price2??"","it-msg1",a?"":t.msg1&&t.msg1.text||"","Mensaje de WhatsApp para Revendedores/Estándar · vacío = usa el mensaje global.",{id:"it-popup1",val:a?"":null!=t.popup1?t.popup1:t.popup||"",ph:"Indicaciones para Revendedores/Estándar"})}\n  ${roleCard("role-card-admin","👑 Admin / 🛡️ Subadmin","it-price3","Precio admin/subadmin (vacío = igual al estándar)",a?"":t.price3??"","it-msg2",a?"":t.msg2&&t.msg2.text||"","Mensaje de WhatsApp para Admin/Subadmin · vacío = usa el mensaje global.",{id:"it-popup2",val:a?"":null!=t.popup2?t.popup2:t.popup||"",ph:"Indicaciones para Admin/Subadmin"})}\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="it-ok">${a?"Añadir":"Guardar"}</button></div>`),$("#it-copy-req")&&($("#it-copy-req").onclick=()=>copyText(formatReqForCopy($("#it-title").value.trim()||t.title,$("#it-req").value),"Requisitos copiados"));let n=i,o=s,r=a?[]:String(t.sub||"").split(/[·.,]+/).map(e=>e.trim()).filter(Boolean);function c(){$("#it-sub-chips").innerHTML=r.length?r.map((e,t)=>`<span class="chip-edit">${esc(e)}<button type="button" data-i="${t}" title="Quitar">×</button></span>`).join(""):'<span class="chip-edit-empty">Sin subtítulo — añade uno abajo</span>',$$("#it-sub-chips button").forEach(e=>{e.onclick=()=>{r.splice(+e.dataset.i,1),c()}})}function l(){const e=$("#it-req").value,t=(e||"").trim()?parseRequisitos(e):[];$("#it-req-preview").innerHTML=t.length?t.map(e=>`<span class="chip-edit">🧩 ${esc(e.label)}</span>`).join(""):e&&e.trim()?'<span class="chip-edit-empty">No se reconoció ningún campo todavía — sigue escribiendo o separa con coma</span>':'<span class="chip-edit-empty">Aquí verás los campos que se crean, uno por cada coma</span>'}c(),l(),$("#it-req").addEventListener("input",l);const d=()=>{const e=$("#it-sub-new").value.trim().replace(/,+$/,"").trim();e&&(r.push(e),$("#it-sub-new").value="",c(),$("#it-sub-new").focus())};$("#it-sub-add").onclick=d,$("#it-sub-new").addEventListener("keydown",e=>{"Enter"!==e.key&&","!==e.key||(e.preventDefault(),d())}),$("#it-icon-toggle").onclick=()=>{$("#it-icon-box").classList.toggle("hidden")},$$("#it-icon-pick .icon-pick-btn").forEach(e=>{e.onclick=()=>{o=e.dataset.icon,$$("#it-icon-pick .icon-pick-btn").forEach(t=>t.classList.toggle("sel",t===e)),$("#it-ico-preview").textContent=o,$("#it-icon-toggle").textContent=o,$("#it-icon-box").classList.add("hidden")}}),$("#it-vis-toggle").onclick=()=>{n=!n;const e=$("#it-vis-toggle");e.textContent=n?"👁️":"🙈",e.classList.toggle("off",!n),toast(n?"Visible para todos":"Oculto para todos","👁️")},$$(".role-card .role-toggle").forEach(e=>{e.onclick=()=>e.closest(".role-card").classList.toggle("open")}),wireVarChips(),$("#it-ok").onclick=()=>{const i=$("#it-title").value.trim(),s=$("#it-price").value.trim(),c=""===s?null:Math.max(0,parseInt(s,10)),l=$("#it-price2").value.trim(),d=""===l?null:Math.max(0,parseInt(l,10)),u=$("#it-price3").value.trim(),p=""===u?null:Math.max(0,parseInt(u,10)),m=r.join(" · "),g=$("#it-badge").value.trim(),f=$("#it-req").value.trim(),v=$("#it-entrega").value.trim(),b=$("#it-note").value.trim(),h=$("#it-popup0").value.trim(),y=$("#it-popup1").value.trim(),E=$("#it-popup2").value.trim(),x=$("#it-reqform").checked,Q=$("#it-checklist").value.trim(),C=$("#it-msg0").value.trim(),S=$("#it-msg1").value.trim(),w=$("#it-msg2").value.trim(),A=C?{target:"invitado",text:C}:null,k=S?{target:"estandar",text:S}:null,L=w?{target:"subadmin",text:w}:null;if(i.length<2)return toast("Escribe el título","✍️");a?e.items.push({id:uid(),title:i,icon:o,sub:m,badge:g,price:c,price2:d,price3:p,popup0:h,popup1:y,popup2:E,req:f,entrega:v,note:b,reqForm:x,checklist:Q,msg0:A,msg1:k,msg2:L,disponible:n}):(t.title=i,t.icon=o,t.sub=m,t.badge=g,t.price=c,t.price2=d,t.price3=p,t.popup0=h,t.popup1=y,t.popup2=E,t.req=f,t.entrega=v,t.note=b,t.reqForm=x,t.checklist=Q,t.msg0=A,t.msg1=k,t.msg2=L,t.disponible=n),save(),closeModal(),renderServicios($("documentos"===store?"#doc-search":"#srv-search").value,store),renderCats(),toast(a?`«${i}» añadido a ${e.name}`:`«${i}» actualizado`,a?"🧾":"✅")},$("#it-title").focus()}function delItemConfirm(e,t,store="servicios"){openModal(`<div class="m-ico">🧾</div><h4>¿Eliminar «${esc(t.title)}»?</h4><p>Se quitará de la sección ${esc(e.name)}.</p>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn danger" id="dit-ok">Eliminar</button></div>`),$("#dit-ok").onclick=()=>{e.items=e.items.filter(e=>e.id!==t.id),save(),closeModal(),renderServicios($("documentos"===store?"#doc-search":"#srv-search").value,store),renderCats(),toast(`«${t.title}» eliminado`,"🗑")}}function subIcon(e){const t=(e||"").toLowerCase();return/tr[aá]mite oficial/.test(t)?"🛡️":/rastreo por sistema/.test(t)?"🔍":/actualizaci[oó]n de csf|idcif/.test(t)?"🧾":/office 365/.test(t)||/clave|llave/.test(t)?"🔑":/pel[ií]cula/.test(t)?"🎬":/juego/.test(t)?"🎮":/formateo|windows|mac/.test(t)?"🛠️":/driver|programa/.test(t)?"💾":/online/.test(t)?"🖥️":/usb/.test(t)?"🎞️":"🔖"}function infoGroupIconKey(e){const t=norm(e||"");return/\bmac\b/.test(t)?"svg:mac":/office/.test(t)?"svg:office365":/juego|videojueg|gamepad/.test(t)?"svg:gamepad":/windows/.test(t)?"svg:windows":null}function infoGroupIconHTML(e,t){const a=(t||[]).map(e=>e.icon).find(Boolean);if(a)return iconHTML(a);const i=infoGroupIconKey(e);if(i)return iconHTML(i);const s=subIcon(t&&t[0]&&t[0].sub||e);return`<span class="inf-card-emoji">${esc(s)}</span>`}/* App/Web: lista de extras con precio (se editan en el CRM). Cada uno que marcas se suma al precio de la card. */
function __extrasSetup(t, pk) {
  if (pk !== "appweb") return null;
  let L = t.extras; if (typeof L === "string") { try { L = JSON.parse(L); } catch (e) { L = []; } }
  L = (Array.isArray(L) ? L : []).map(o => ({ n: String((o && o.n) || "").trim(), p: Number(o && o.p) })).filter(o => o.n && isFinite(o.p) && o.p >= 0);
  if (!L.length) return null;
  const hasBase = t.price != null && t.price !== "";
  const baseRaw = (t.price2 != null && t.price2 !== "") ? priceForRole({ price: t.price, price2: t.price2, price3: t.price3 }) : t.price;
  const base = hasBase ? (Number(String(baseRaw).replace(/[^0-9.]/g, "")) || 0) : 0, sel = new Set();
  const total = () => base + [...sel].reduce((s, i) => s + L[i].p, 0);
  const picked = () => [...sel].sort((a, b) => a - b).map(i => L[i]);
  const has = () => hasBase || sel.size > 0;
  const html = '<div class="m-extras" id="m-extras"><div class="m-extras-h">➕ Agrega extras a tu proyecto</div>' +
    L.map((o, i) => '<label class="m-extra"><input type="checkbox" data-xi="' + i + '"><span class="m-extra-n">' + esc(o.n) + '</span><b class="m-extra-p">+$' + o.p + '</b></label>').join("") +
    '<div class="m-extras-total"><span>Total</span><b id="m-extras-total"></b></div></div>';
  return {
    opts: { extraHTML: html, totalFn: () => (has() ? total() : 0), msgFn: m => picked().length ? m + "\n\nEXTRAS: " + picked().map(o => o.n + " ($" + o.p + ")").join(", ") + "\nTOTAL: $" + total() : m },
    wire() {
      const box = document.getElementById("m-extras"); if (!box) return;
      const upd = () => {
        const pr = document.querySelector(".m-prices .m-price"); if (pr) pr.textContent = has() ? "💲" + total() : "Cotizar";
        const tt = document.getElementById("m-extras-total"); if (tt) tt.textContent = has() ? "$" + total() : "Cotizar";
        const code = document.querySelector(".m-code b"); if (code && has()) { try { code.textContent = codeFor(total()); } catch (e) {} }
      };
      box.addEventListener("change", ev => { const i = Number(ev.target.dataset.xi); if (isNaN(i)) return; ev.target.checked ? sel.add(i) : sel.delete(i); upd(); });
      upd();
    }
  };
}
function itemDetailModal(e,t,store="servicios",pk){const a=canEdit(),__x=__extrasSetup(t,pk);serviceModal({...(__x?__x.opts:{}),isInv:"invitaciones"===pk,video:t.invVideo||"",back:()=>itemDetailModal(e,t,store,pk),icon:"🧾",title:t.title,sub:t.sub||e.name,price:t.price,price2:t.price2,price3:t.price3,popup:t.popup,popup0:t.popup0,popup1:t.popup1,popup2:t.popup2,req:t.req,entrega:t.entrega,note:t.note,reqForm:t.reqForm,checklist:t.checklist,fallback:t.msg||("invitaciones"===pk&&(db.waMsgs.invitaciones||"HOLA, QUIERO COTIZAR LA INVITACIÓN DIGITAL {titulo} DE ${precio} EN _ESCRITORIO PUBLICO_"))||"appweb"===pk&&db.waMsgs.appweb||("documentos"===store||"documentos"===pk)&&db.waMsgs.documentos||db.waMsgs.servicio,msg0:t.msg0,msg1:t.msg1,msg2:t.msg2,adminRow:a?'<button class="btn small ghost" id="mi-edit">✏️ Editar</button><button class="btn small danger" id="mi-del">🗑 Eliminar</button>':"",onEdit:a?()=>{closeModal(),itemModal(e,t,store)}:null,onDel:a?()=>{closeModal(),delItemConfirm(e,t,store)}:null}),__x&&__x.wire()}function renderInformatica(e=""){const t=norm((e||"").trim()),a=canEdit(),i=$("#inf-grid");let s=a?db.informatica:db.informatica.filter(e=>!1!==e.disponible);if(t&&(s=s.filter(e=>norm(e.title).includes(t)||norm(e.sub||"").includes(t)||norm(e.code||"").includes(t)||norm(e.grupo||"").includes(t))),!s.length){i.innerHTML=`<p class="fine">${t?`Sin coincidencias para «${esc(e)}».`:"Sin artículos todavía. Añade el primero."}</p>`,$("#btn-add-info").classList.toggle("hidden",!a);const s=$("#btn-copy-informatica");return void(s&&s.classList.toggle("hidden",!a))}const n=[],o=new Map;if(s.forEach(e=>{const t=e.grupo||e.title;o.has(t)||(o.set(t,[]),n.push(t)),o.get(t).push(e)}),a){const e=n.findIndex(e=>/instalaci[oó]n\s*windows/i.test(e)&&!/office/i.test(e));n.splice(e>=0?e+1:n.length,0,"__ADD_GROUP__")}i.innerHTML=n.map(e=>{if("__ADD_GROUP__"===e)return'\n    <div class="inf-card inf-card-add" id="add-info-group">\n      <div class="inf-card-top"><span class="inf-card-ico"><span class="inf-card-ico-plus">＋</span></span></div>\n      <h3 class="inf-card-title">Añadir grupo</h3>\n    </div>';const t=o.get(e);return`\n    <div class="inf-card">\n      ${/instalaci[oó]n\s*windows/i.test(e)?`<div class="inf-card-top inf-card-top-combo"><span class="inf-card-ico inf-card-ico-sm">${iconHTML("svg:windows")}</span><span class="inf-combo-plus">+</span><span class="inf-card-ico inf-card-ico-sm">${iconHTML("svg:office365")}</span></div>`:`<div class="inf-card-top"><span class="inf-card-ico">${infoGroupIconHTML(e,t)}</span></div>`}\n      <h3 class="inf-card-title">${esc(e)}</h3>\n      <fieldset class="inf-price-fieldset">\n        <legend class="inf-price-legend"><span class="inf-price-legend-ico">🗂️</span>Lista de precios</legend>\n        <div class="inf-list">\n          ${t.map(e=>{const t=priceForRole(e),i=e.code||(null!=t?codeFor(t):""),s=(e.sub||"").split("·").map(e=>e.trim()).filter(Boolean).map(e=>`<span class="inf-sub-chip">${esc(e)}</span>`).join("");return`<div class="inf-row${!1===e.disponible?" inf-off":""}" data-iid="${e.id}">\n              <div class="inf-row-body">\n                <span class="inf-row-title">${esc(e.title)}${!1===e.disponible?' <span class="srv-off-tag">No disponible</span>':""}</span>\n                ${s?`<span class="inf-row-sub">${s}</span>`:""}\n                ${i?`<span class="inf-code">🔑 ${esc(i)}</span>`:""}\n              </div>\n              <span class="inf-price-btn">${null!=t?"💲"+t:"Cotizar"}</span>\n              ${a?`<span class="uact inf-uact"><button type="button" class="icon-btn mini eye-toggle${!1===e.disponible?" eye-off":""}" data-it-eye title="${!1===e.disponible?"Mostrar":"Ocultar"}" onclick="event.stopPropagation()">${!1===e.disponible?"🙈":"👁️"}</button><button class="icon-btn mini" data-it-edit title="Editar">✎</button><button class="icon-btn mini danger" data-it-del title="Eliminar">✕</button></span>`:""}\n            </div>`}).join("")}\n          ${a?`<button class="inf-add-row" data-add-grupo="${esc(e)}">＋ Añadir a ${esc(e)}</button>`:""}\n        </div>\n      </fieldset>\n    </div>`}).join(""),i.querySelectorAll("[data-it-eye]").forEach(e=>e.onclick=()=>{const t=e.closest("[data-iid]"),a=db.informatica.find(e=>e.id===t.dataset.iid);a&&(a.disponible=!1===a.disponible,save(),renderInformatica($("#inf-search").value),renderCats(),toast(`«${a.title}» ${!1!==a.disponible?"mostrado":"ocultado"}`,!1!==a.disponible?"👁️":"🙈"))}),i.querySelectorAll(".inf-row").forEach(e=>e.onclick=t=>{const a=db.informatica.find(t=>t.id===e.dataset.iid);if(a)return t.target.closest("[data-it-edit]")?(t.stopPropagation(),void infoItemModal(a)):t.target.closest("[data-it-del]")?(t.stopPropagation(),void delInfoConfirm(a)):void infoDetailModal(a)}),i.querySelectorAll("[data-add-grupo]").forEach(e=>e.onclick=()=>infoItemModal(null,e.dataset.addGrupo));const r=$("#add-info-group");r&&(r.onclick=()=>infoItemModal(null)),$("#btn-add-info").classList.toggle("hidden",!a);const c=$("#btn-copy-informatica");c&&c.classList.toggle("hidden",!a)}$("#srv-search").addEventListener("input",e=>renderServicios(e.target.value)),$("#btn-add-section").onclick=()=>sectionModal(null),$("#doc-search")&&$("#doc-search").addEventListener("input",e=>renderServicios(e.target.value,"documentos")),$("#btn-add-doc-section")&&($("#btn-add-doc-section").onclick=()=>sectionModal(null,"documentos")),$("#inf-search").addEventListener("input",e=>renderInformatica(e.target.value)),$("#btn-add-info").onclick=()=>infoItemModal(null);const INFO_SUB_CHIPS_DEFAULT=["1 año","6 meses","3 dispositivos","5 dispositivos"];function chipPickerHTML(e,t){const a=(t||"").split("·").map(e=>e.trim()).filter(Boolean),i=a.filter(e=>!INFO_SUB_CHIPS_DEFAULT.includes(e));return`<div class="chip-picker" id="${e}">\n    ${[...INFO_SUB_CHIPS_DEFAULT,...i].map(e=>`<button type="button" class="chip-pick${a.includes(e)?" sel":""}" data-chip="${esc(e)}">${esc(e)}</button>`).join("")}\n    <button type="button" class="chip-pick chip-add" id="${e}-add" title="Añadir opción">＋</button>\n  </div>`}function wireChipPicker(e,t){const a=$("#"+e),i=$("#"+t),s=()=>{i.value=[...a.querySelectorAll(".chip-pick.sel")].map(e=>e.dataset.chip).join(" · ")};a.querySelectorAll(".chip-pick:not(.chip-add)").forEach(e=>e.onclick=()=>{e.classList.toggle("sel"),s()});const n=$("#"+e+"-add");n.onclick=()=>{if(a.querySelector(".chip-add-input"))return;const e=document.createElement("input");e.type="text",e.maxLength=30,e.placeholder="Nueva opción",e.className="chip-add-input",n.replaceWith(e),e.focus();const t=()=>{const t=e.value.trim();if(t){const a=document.createElement("button");a.type="button",a.className="chip-pick sel",a.dataset.chip=t,a.textContent=t,a.onclick=()=>{a.classList.toggle("sel"),s()},e.replaceWith(a,n),s()}else e.replaceWith(n)};e.addEventListener("keydown",a=>{"Enter"===a.key&&(a.preventDefault(),t()),"Escape"===a.key&&e.replaceWith(n)}),e.addEventListener("blur",t)},s()}const INFO_ICON_KEYS=["windows","office365","mac","gamepad"];function infoItemModal(e,t){const a=!e,i=a||!1!==e.disponible,s=[...new Set(db.informatica.map(e=>e.grupo).filter(Boolean))],n=a?t||"":e.grupo||"";function o(){const e=$("#in-req").value,t=(e||"").trim()?parseRequisitos(e):[];$("#in-req-preview").innerHTML=t.length?t.map(e=>`<span class="chip-edit">🧩 ${esc(e.label)}</span>`).join(""):e&&e.trim()?'<span class="chip-edit-empty">No se reconoció ningún campo todavía — sigue escribiendo o separa con coma</span>':'<span class="chip-edit-empty">Aquí verás los campos que se crean, uno por cada coma</span>'}openModal(`<button type="button" class="modal-eye-toggle${i?"":" off"}" id="in-vis-toggle" title="Mostrar/ocultar para todos">${i?"👁️":"🙈"}</button>\n  <div class="m-ico" id="in-icon-preview">${a?"💻":iconHTML(e.icon||"")}</div><h4>${a?"Nuevo artículo":"Editar artículo"}</h4><p>${a&&t?`Informática · ${esc(t)}`:"Informática · Escritorio Público"}</p>\n  <div class="field glass-in"><input id="in-grupo" placeholder="Producto/Grupo (ej. Windows)" maxlength="30" value="${esc(n)}" list="inf-groups-list"></div>\n  <datalist id="inf-groups-list">${s.map(e=>`<option value="${esc(e)}">`).join("")}</datalist>\n  <div class="field glass-in"><input id="in-title" style="text-align:center" placeholder="Variante (ej. Windows 10)" maxlength="40" value="${a?"":esc(e.title)}"></div>\n  <input type="hidden" id="in-icon" value="${a?"":esc(e.icon||"")}">\n  <div class="icon-menu-wrap">\n    <p class="msg-hint">🖼️ Logo del grupo (opcional, si no se detecta solo por el nombre):</p>\n    <div class="icon-menu" id="in-icon-menu">\n      <button type="button" class="icon-opt clear" data-k="" title="Automático (detectar por nombre)">✏️</button>\n      ${INFO_ICON_KEYS.map(e=>`<button type="button" class="icon-opt" data-k="${e}" title="${esc(SVG_ICONS[e].label)}">${iconHTML("svg:"+e)}</button>`).join("")}\n    </div>\n    <p class="msg-hint">🔎 Busca otro logo en Iconify:</p>\n    <div class="field glass-in inline"><input id="in-icoquery" placeholder="Ej. adobe, linux, chrome…" maxlength="40"><button type="button" class="btn small ghost" id="in-icoquery-btn">Buscar</button></div>\n    <div class="icon-menu" id="in-icoquery-results"></div>\n    <p class="msg-hint" id="in-icoquery-status"></p>\n  </div>\n  <p class="chip-picker-label">Subtítulo</p>\n  ${chipPickerHTML("in-sub-picker",a?"":e.sub||"")}\n  <input type="hidden" id="in-sub" value="${a?"":esc(e.sub||"")}">\n  <div class="field glass-in"><input id="in-code" placeholder="Código manual (opcional, si no usa precio)" maxlength="24" value="${a?"":esc(e.code||"")}"></div>\n  <label class="fine" style="display:block;margin-bottom:6px;font-weight:800">🧾 Requisitos</label>\n  <div class="field glass-in ta"><textarea id="in-req" maxlength="500" placeholder="Requisitos">${a?"":esc(e.req||"")}</textarea></div>\n  <p class="fine" style="margin:-4px 0 6px">✍️ Escribe los datos que se piden separados por coma <b>,</b> — por cada coma se crea un campo para llenar en el formulario (ej. <i>Nombre completo, Correo, Teléfono</i>).</p>\n  <div class="chip-edit-list" id="in-req-preview" style="margin-bottom:10px"></div>\n  <div class="set-row" style="margin:0 0 10px"><div class="lbl"><b>🧮 Formulario de requisitos</b><small>Pide los datos uno por uno antes de enviar por WhatsApp</small></div><label class="switch"><input type="checkbox" id="in-reqform" ${a||!1!==e.reqForm?"checked":""}><span class="knob"></span></label></div>\n  ${!a&&e.req?'<div class="m-row"><button class="btn ghost small" id="in-copy-req">📋 Copiar requisitos</button></div>':""}\n  <div class="field glass-in"><input id="in-entrega" placeholder="Entrega estimada (ej. 5 min)" maxlength="30" value="${a?"":esc(e.entrega||"")}"></div>\n  <label class="fine" style="display:block;margin:12px 0 6px;font-weight:800">📋 Nota del formulario de requisitos</label>\n  <div class="var-chips" data-for="in-note">${VAR_CHIPS_HTML}</div>\n  <div class="field glass-in ta"><textarea id="in-note" maxlength="300" placeholder="${esc(DEFAULT_REQ_NOTE)}">${a?"":esc(e.note||"")}</textarea></div>\n  <p class="msg-hint">Vacío = usa la leyenda por defecto de arriba.</p>\n  <h4 class="display" style="font-size:.95rem;margin:16px 0 8px">💲 Precios y mensajes por categoría</h4>\n  ${roleCard("role-card-guest","🙂 Invitado","in-price","Precio invitado 💲",a?"":e.price??"","in-msg0",a?"":e.msg0&&e.msg0.text||"","Mensaje de WhatsApp para el Invitado · vacío = usa el mensaje global.")}\n  ${roleCard("role-card-std","👤 Estándar","in-price2","Precio estándar (vacío = igual al invitado)",a?"":e.price2??"","in-msg1",a?"":e.msg1&&e.msg1.text||"","Mensaje de WhatsApp para Estándar · vacío = usa el mensaje global.")}\n  ${roleCard("role-card-admin","👑 Admin / 🛡️ Subadmin","in-price3","Precio admin/subadmin (vacío = igual al estándar)",a?"":e.price3??"","in-msg2",a?"":e.msg2&&e.msg2.text||"","Mensaje de WhatsApp para Admin/Subadmin · vacío = usa el mensaje global.")}\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="in-ok">${a?"Añadir":"Guardar"}</button></div>`),wireChipPicker("in-sub-picker","in-sub"),$("#in-copy-req")&&($("#in-copy-req").onclick=()=>copyText(formatReqForCopy($("#in-title").value.trim()||e.title,$("#in-req").value),"Requisitos copiados")),o(),$("#in-req").addEventListener("input",o);let r,c=i;async function l(){const e=$("#in-icoquery").value.trim(),t=$("#in-icoquery-results"),a=$("#in-icoquery-status");if(!e)return t.innerHTML="",void(a.textContent="");a.textContent="Buscando…",t.innerHTML="";try{const i=await fetch(`${iconifyBase()}/search?query=${encodeURIComponent(e)}&limit=30`),s=(await i.json()).icons||[];if(!s.length)return void(a.textContent="Sin resultados");a.textContent=`${s.length} resultado(s) · toca uno para usarlo`,t.innerHTML=s.map(e=>`<button type="button" class="icon-opt" data-if="${esc(e)}" title="${esc(e)}">${iconHTML("if:"+e)}</button>`).join(""),t.querySelectorAll("[data-if]").forEach(e=>{e.onclick=()=>{$("#in-icon").value="if:"+e.dataset.if,$$("#in-icon-menu .icon-opt, #in-icoquery-results .icon-opt").forEach(t=>t.classList.toggle("sel",t===e));const t=$("#in-icon-preview");t&&(t.innerHTML=iconHTML("if:"+e.dataset.if)),toast("Seleccionado","🖼️")}})}catch(e){a.textContent="Error al buscar (revisa tu conexión o la API en Ajustes › Iconify)"}}$("#in-vis-toggle").onclick=()=>{c=!c;const e=$("#in-vis-toggle");e.textContent=c?"👁️":"🙈",e.classList.toggle("off",!c),toast(c?"Visible para todos":"Oculto para todos","👁️")},$$("#in-icon-menu .icon-opt").forEach(e=>{const t=$("#in-icon").value;e.dataset.k&&t==="svg:"+e.dataset.k&&e.classList.add("sel"),e.dataset.k||t||e.classList.add("sel"),e.onclick=()=>{$("#in-icon").value=e.dataset.k?"svg:"+e.dataset.k:"",$$("#in-icon-menu .icon-opt, #in-icoquery-results .icon-opt").forEach(t=>t.classList.toggle("sel",t===e));const t=$("#in-icon-preview");t&&(t.innerHTML=e.dataset.k?iconHTML("svg:"+e.dataset.k):"💻"),e.dataset.k&&toast(`Logo de ${e.title} seleccionado`,"🖼️")}}),$("#in-icoquery-btn").onclick=l,$("#in-icoquery").addEventListener("input",()=>{clearTimeout(r),r=setTimeout(l,420)}),$("#in-icoquery").addEventListener("keydown",e=>{"Enter"===e.key&&(e.preventDefault(),clearTimeout(r),l())}),$$(".role-card .role-toggle").forEach(e=>{e.onclick=()=>e.closest(".role-card").classList.toggle("open")}),wireVarChips(),$("#in-ok").onclick=()=>{const t=$("#in-title").value.trim(),i=$("#in-price").value.trim(),s=""===i?null:Math.max(0,parseInt(i,10)),n=$("#in-price2").value.trim(),o=""===n?null:Math.max(0,parseInt(n,10)),r=$("#in-price3").value.trim(),l=""===r?null:Math.max(0,parseInt(r,10)),d=$("#in-sub").value.trim(),u=$("#in-code").value.trim(),p=$("#in-grupo").value.trim()||t,m=$("#in-icon").value.trim(),g=$("#in-req").value.trim(),f=$("#in-entrega").value.trim(),v=$("#in-note").value.trim(),b=$("#in-reqform").checked,h=$("#in-msg0").value.trim(),y=$("#in-msg1").value.trim(),E=$("#in-msg2").value.trim(),x=h?{target:"invitado",text:h}:null,C=y?{target:"estandar",text:y}:null,S=E?{target:"subadmin",text:E}:null;if(t.length<2)return toast("Escribe la variante/título","✍️");a?db.informatica.push({id:uid(),grupo:p,title:t,sub:d,code:u,price:s,price2:o,price3:l,icon:m,req:g,entrega:f,note:v,reqForm:b,disponible:c,msg0:x,msg1:C,msg2:S}):(e.grupo=p,e.title=t,e.sub=d,e.code=u,e.price=s,e.price2=o,e.price3=l,e.icon=m,e.req=g,e.entrega=f,e.note=v,e.reqForm=b,e.disponible=c,e.msg0=x,e.msg1=C,e.msg2=S),save(),closeModal(),renderInformatica($("#inf-search").value),renderCats(),toast(a?`«${t}» añadido a ${p}`:`«${t}» actualizado`,a?"💻":"✅")},$(t?"#in-title":"#in-grupo").focus()}function delInfoConfirm(e){openModal(`<div class="m-ico">💻</div><h4>¿Eliminar «${esc(e.title)}»?</h4><p>Se quitará del listado de Informática.</p>\n  <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn danger" id="din-ok">Eliminar</button></div>`),$("#din-ok").onclick=()=>{db.informatica=db.informatica.filter(t=>t.id!==e.id),save(),closeModal(),renderInformatica($("#inf-search").value),renderCats(),toast(`«${e.title}» eliminado`,"🗑")}}function infoDetailModal(e){const t=canEdit(),a=[e.grupo&&e.grupo!==e.title?e.grupo:"",e.sub||""].filter(Boolean).join(" · ")||"Informática";serviceModal({icon:e.icon||infoGroupIconKey(e.grupo)||"💻",title:e.title,sub:a,price:e.price,price2:e.price2,price3:e.price3,code:e.code||"",req:e.req,entrega:e.entrega,note:e.note,reqForm:e.reqForm,fallback:db.waMsgs.informatica||db.waMsgs.servicio,msg0:e.msg0,msg1:e.msg1,msg2:e.msg2,adminRow:t?'<button class="btn small ghost" id="mi-edit">✏️ Editar</button><button class="btn small danger" id="mi-del">🗑 Eliminar</button>':"",onEdit:t?()=>{closeModal(),infoItemModal(e)}:null,onDel:t?()=>{closeModal(),delInfoConfirm(e)}:null})}$("#murc-num-in").addEventListener("input",()=>{const e=$("#murc-num-in").value;$("#murc-code-in").value=e?codeFor(e):""}),$("#murc-code-in").addEventListener("input",()=>{const e=$("#murc-code-in").value;$("#murc-num-in").value=e?numFromCode(e):""});let visible=[],activeIdx=-1,lastQ="";const input=$("#search-input");function runQuery(e){e=e.trim(),lastQ=e,$("#btn-clear").classList.toggle("hidden",!e);const t=$("#results-wrap"),a=$("#idle-wrap"),i=$("#empty-wrap");if(!e)return t.innerHTML="",a.classList.remove("hidden"),i.classList.add("hidden"),$("#results-meta").innerHTML="",void renderIdle();a.classList.add("hidden");const s=norm(e),n=dataset().map(e=>{const t=norm(e.title),a=norm(e.sub);let i=-1;return t.startsWith(s)?i=0:t.includes(s)?i=1:a.includes(s)&&(i=2),i<0?null:{it:e,score:i}}).filter(Boolean).sort((e,t)=>e.score-t.score);if(!n.length)return t.innerHTML="",i.classList.remove("hidden"),$("#empty-q").textContent=e,void($("#results-meta").textContent="");i.classList.add("hidden");const o=n.length;$("#results-meta").innerHTML=`<b>${o}</b> resultado${1!==o?"s":""} para «${esc(e)}»`,visible=n.map(e=>e.it),activeIdx=-1;let r="",c=0;for(const t of Object.keys(CATS)){const a=n.filter(e=>e.it.cat===t);if(a.length){r+=`<div class="group"><div class="g-head"><span>${CATS[t].icon}</span>${CATS[t].label}<span class="g-count">${a.length}</span></div>`;for(const i of a){const a=visible.indexOf(i.it),[s,n]=TINT[t];r+=`<button class="rrow reveal" style="animation-delay:${35*c++}ms" data-i="${a}">\n        <span class="r-ico${"actions"===t?" hex":""}" style="background:linear-gradient(135deg,${s},${n})">${iconHTML(i.it.icon)}</span>\n        <span class="r-txt"><span class="r-title">${highlight(i.it.title,e)}</span><span class="r-sub">${highlight(i.it.sub,e)}</span></span>\n        <svg class="chev" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m9 6 6 6-6 6"/></svg>\n      </button>`}r+="</div>"}}t.innerHTML=r,t.querySelectorAll(".rrow").forEach(e=>e.onclick=()=>activate(visible[+e.dataset.i]))}function setActive(e){const t=$$(".rrow");t.forEach(e=>e.classList.remove("active")),e<0||e>=t.length||(activeIdx=e,t[e].classList.add("active"),t[e].scrollIntoView({block:"nearest"}))}function addRecent(e){const t=prefs().recents;t.splice(0,0,...t.filter(t=>t!==e)),prefs().recents=t.slice(0,6),save()}function activate(e){if("actions"!==e.cat){if("app-9"===e.id)return canEdit()?(setView("settings"),void toast("Abriendo Ajustes","⚙️")):toast("Ajustes disponible solo para 👑 Admin y 🛡️ Subadmin","🔒");if("music"===e.cat){const t=db.streaming.find(t=>t.id===e.id.slice(4));return t&&streamDetailModal(t),void(lastQ&&addRecent(lastQ))}if("services"===e.cat){const t=findSrvItem(e.id.slice(4));return t&&itemDetailModal(t.sec,t.it),void(lastQ&&addRecent(lastQ))}if("informatica"===e.cat){const t=db.informatica.find(t=>t.id===e.id.slice(4));return t&&infoDetailModal(t),void(lastQ&&addRecent(lastQ))}lastQ&&addRecent(lastQ),toast(`Abriendo «${e.title}» · demo`,e.icon)}else runAction(e.id)}function runAction(e){"act-stream"===e?setView("streaming"):"act-services"===e?setView("servicios"):"act-perfil"===e?aboutMeModal():"act-compras"===e&&setView("compras")}function mapsEmbedSrc(e){return`https://www.google.com/maps?q=${encodeURIComponent(e||"")}&output=embed`}function negocioViewHTML(e){return`<div class="neg-block" id="neg-view">\n    <div class="neg-card neg-conocenos-card">\n      <span class="neg-card-ico">🤝</span>\n      <div class="neg-card-txt"><b>Conócenos</b><span>${esc(e.conocenos)}</span></div>\n    </div>\n    <div class="neg-card">\n      <span class="neg-card-ico">📍</span>\n      <div class="neg-card-txt"><b>Dirección</b><span>${esc(e.direccion)}</span></div>\n    </div>\n    <div class="neg-card">\n      <span class="neg-card-ico">📞</span>\n      <div class="neg-card-txt"><b>Teléfono</b><span>${esc(e.tel)}</span></div>\n      <button class="icon-btn mini neg-copy" id="neg-tel-copy" title="Copiar teléfono">📋</button>\n    </div>\n    <div class="neg-card neg-horarios-card">\n      <span class="neg-card-ico">🕘</span>\n      <div class="neg-card-txt">\n        <b>Horarios</b>\n        <span>Lunes a viernes: ${esc(e.hLV)}</span>\n        <span>Sábado: ${esc(e.hSab)}</span>\n        <span>Domingo: ${esc(e.hDom)}</span>\n      </div>\n    </div>\n    <div class="neg-map-card">\n      <iframe class="neg-map-embed" id="neg-map" src="${mapsEmbedSrc(e.direccion)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>\n      <a class="btn ghost small" style="width:100%;margin-top:10px" href="${esc(e.mapsUrl)}" target="_blank" rel="noopener">🗺️ Abrir en Google Maps</a>\n    </div>\n  </div>`}function negocioEditHTML(e){return`<div class="neg-block neg-edit-form" id="neg-edit">\n    <div class="field glass-in ta"><textarea id="neg-in-conocenos" maxlength="800" rows="5" placeholder="Texto de Conócenos">${esc(e.conocenos)}</textarea></div>\n    <div class="field glass-in"><input id="neg-in-version" maxlength="10" placeholder="Versión (ej. 2.4)" value="${esc(e.version)}"></div>\n    <div class="field glass-in ta"><textarea id="neg-in-direccion" maxlength="160" placeholder="Dirección">${esc(e.direccion)}</textarea></div>\n    <div class="field glass-in"><input id="neg-in-tel" maxlength="15" placeholder="Teléfono" value="${esc(e.tel)}"></div>\n    <div class="field glass-in"><input id="neg-in-maps" maxlength="200" placeholder="Enlace de Google Maps" value="${esc(e.mapsUrl)}"></div>\n    <div class="field glass-in"><input id="neg-in-hlv" maxlength="40" placeholder="Horario Lunes a viernes" value="${esc(e.hLV)}"></div>\n    <div class="neg-h3row">\n      <div class="field glass-in"><input id="neg-in-hsab" maxlength="40" placeholder="Horario Sábado" value="${esc(e.hSab)}"></div>\n      <div class="field glass-in"><input id="neg-in-hdom" maxlength="40" placeholder="Horario Domingo" value="${esc(e.hDom)}"></div>\n    </div>\n    <div class="m-row"><button class="btn ghost small" id="neg-cancel">Cancelar</button><button class="btn btn-primary small" id="neg-save">💾 Guardar</button></div>\n  </div>`}function wireNegocioView(){$("#neg-tel-copy")&&($("#neg-tel-copy").onclick=()=>copyText(db.negocio.tel,"Teléfono copiado")),$("#neg-edit-btn")&&($("#neg-edit-btn").onclick=()=>{$("#neg-view").outerHTML=negocioEditHTML(db.negocio),wireNegocioEdit()})}function wireNegocioEdit(){$("#neg-cancel").onclick=()=>{$("#neg-edit").outerHTML=negocioViewHTML(db.negocio),wireNegocioView()},$("#neg-save").onclick=()=>{const e=db.negocio;e.conocenos=$("#neg-in-conocenos").value.trim()||e.conocenos,e.version=$("#neg-in-version").value.trim()||e.version,e.direccion=$("#neg-in-direccion").value.trim()||e.direccion,e.tel=$("#neg-in-tel").value.trim()||e.tel,e.mapsUrl=$("#neg-in-maps").value.trim()||e.mapsUrl,e.hLV=$("#neg-in-hlv").value.trim()||e.hLV,e.hSab=$("#neg-in-hsab").value.trim()||e.hSab,e.hDom=$("#neg-in-hdom").value.trim()||e.hDom,save(),$("#neg-edit").outerHTML=negocioViewHTML(db.negocio),wireNegocioView(),$("#neg-version-line")&&($("#neg-version-line").textContent=`v${e.version} · App privada 🔒`),toast("Información actualizada","✅")}}function aboutMeModal(){const e=db.negocio,t=canEdit();openModal(`<div class="m-ico"><svg width="34" height="27" viewBox="0 0 651 526" role="img" aria-label="Logo Escritorio Público"><path d="M 582 408 L 526 312 L 470 409 L 244 409 L 188 506 L 526 506 Z M 469 213 L 244 213 L 187 116 L 18 408 L 74 506 L 186 506 L 130 408 L 187 310 L 413 310 Z M 188 114 L 526 114 L 533 124 L 583 212 L 639 115 L 583 17 L 244 17 L 197 98 L 198 99 L 196 100 Z" fill="#FF4500" fill-rule="evenodd"></path></svg></div><h4>Conócenos</h4><p>Escritorio Público</p>\n  <p class="fine" id="neg-version-line" style="margin-top:-14px;margin-bottom:18px">v${esc(e.version)} · App privada 🔒</p>\n  <div class="neg-head"><span class="neg-head-label">Datos del negocio</span>${t?'<button class="icon-btn mini" id="neg-edit-btn" title="Editar información">✎</button>':""}</div>\n  ${negocioViewHTML(e)}\n  <div class="m-row" style="margin-top:16px"><button class="btn ghost" data-close>Cerrar</button></div>`,{extraClass:"neg-neu-modal"}),wireNegocioView()}function renderIdle(){const e=prefs().recents,t=$("#recents-block"),a=$("#recents-row");t.classList.toggle("hidden",!e.length),a.innerHTML=e.map((e,t)=>`<button class="chip" data-r="${t}">🕘 ${esc(e)} <span class="x" data-x="${t}">✕</span></button>`).join(""),a.querySelectorAll("[data-r]").forEach(t=>t.onclick=a=>{if(void 0!==a.target.dataset.x)return prefs().recents.splice(+a.target.dataset.x,1),save(),void renderIdle();input.value=e[+t.dataset.r],runQuery(input.value),input.focus()});const i=getActions(),s=$("#quick-grid");s.innerHTML=i.map((e,t)=>{const[a,i]=hexPalette(e);return`<button class="qtile" data-a="${e.id}" style="--d:${(.55*t).toFixed(2)}s;animation-delay:${80*t}ms">\n      ${"act-perfil"===e.id?'<span class="anuncio-clip" id="anuncio-clip-btn" title="Ver anuncio" aria-label="Ver anuncio">'+robotSVG()+'</span>':""}\n      <span class="qi-wrap" style="--h1:${a};--h2:${i}">\n        <span class="qi-float"><span class="qi"><span class="qi-core">${e.icon}</span></span></span>\n        <span class="qi-floor"></span>\n      </span>\n      <span class="q-label">${esc(e.title)}</span>\n      ${e.extra?`<span class="q-extra">${esc(e.extra)}</span>`:""}\n    </button>`}).join(""),s.querySelectorAll("[data-a]").forEach(e=>e.onclick=()=>runAction(e.dataset.a)),$("#anuncio-clip-btn")&&($("#anuncio-clip-btn").onclick=e=>{e.stopPropagation(),anuncioModal()}),$("#recents-count").textContent=`${prefs().recents.length} búsquedas guardadas`}input.addEventListener("input",()=>runQuery(input.value)),$("#btn-clear").onclick=()=>{input.value="",runQuery(""),input.focus()},input.addEventListener("keydown",e=>{const t=$$(".rrow").length;if("ArrowDown"===e.key)e.preventDefault(),setActive(Math.min(activeIdx+1,t-1));else if("ArrowUp"===e.key)e.preventDefault(),setActive(Math.max(activeIdx-1,0));else if("Enter"===e.key){const e=activeIdx>=0?activeIdx:0;visible[e]&&activate(visible[e])}else"Escape"===e.key&&(input.value?(input.value="",runQuery("")):input.blur())}),addEventListener("keydown",e=>{$("#screen-app").classList.contains("hidden")||((e.metaKey||e.ctrlKey)&&"k"===e.key.toLowerCase()&&(e.preventDefault(),setView("search"),input.focus(),input.select()),"/"!==e.key||document.activeElement===input||/INPUT/.test(document.activeElement.tagName)||(e.preventDefault(),setView("search"),input.focus()))});function renderCats(){const e=$("#cats-list");e.innerHTML=Object.entries(CATS).map(([e,t])=>{let a;return a="actions"===e?getActions().length:"music"===e?db.streaming.length:"informatica"===e?db.informatica.length:db.servicios.reduce((e,t)=>e+t.items.length,0),`<div class="set-row"><div class="lbl"><b>${t.icon} ${t.label}</b><small>${a} elementos</small></div>\n    <label class="switch"><input type="checkbox" data-cat="${e}" ${prefs().cats[e]?"checked":""}><span class="knob"></span></label></div>`}).join(""),e.querySelectorAll("input").forEach(e=>e.onchange=()=>{prefs().cats[e.dataset.cat]=e.checked,save(),lastQ&&runQuery(lastQ),toast("Preferencias de búsqueda guardadas","🔎")})}$("#cp-ok").onclick=()=>{const e=me(),t=$("#cp-cur").value,a=$("#cp-new").value,i=$("#cp-new2").value;if(e.remote)return epChangeOwn(e,t,a,i);return hash(t)!==e.pass?toast("La contraseña actual no es correcta","⚠️"):a.length<4?toast("La nueva contraseña necesita 4+ caracteres","🔑"):a!==i?toast("Las contraseñas nuevas no coinciden","⚠️"):(e.pass=hash(a),save(),$("#cp-cur").value=$("#cp-new").value=$("#cp-new2").value="",void toast("Contraseña actualizada","🔑"))},$("#pf-save").onclick=()=>{const e=$("#pf-name").value.trim();if(e.length<2)return toast("Nombre demasiado corto","✍️");me().name=e,save(),renderApp(),toast("Nombre guardado","✅")},$("#seg-theme").querySelectorAll("button[data-t]").forEach(e=>e.onclick=()=>setTheme(e.dataset.t)),$("#seg-theme").querySelectorAll(".lock-btn").forEach(e=>e.onclick=t=>{t.stopPropagation(),toggleThemeLock(e.dataset.lock)}),$("#rng-blur").addEventListener("input",e=>{prefs().blur=+e.target.value,save(),applyPrefs()}),$("#sw-motion").onchange=e=>{prefs().motion=e.target.checked,save(),applyPrefs(),startNet(),toast(e.target.checked?"Animaciones y partículas activadas":"Animaciones pausadas","🎛️")},$("#btn-clear-recents").onclick=()=>{prefs().recents=[],save(),renderIdle(),toast("Historial borrado","🧹")};void 0;void 0;void 0;void 0;const _plStart=Date.now();function hidePreloader(){const e=document.getElementById("app-preloader");if(!e)return;const t=Math.max(0,1e3-(Date.now()-_plStart));setTimeout(()=>{e.classList.add("pl-hide"),setTimeout(()=>e.remove(),450)},t)}load(),document.documentElement.dataset.theme=THEME_OPTS[Math.floor(Math.random()*THEME_OPTS.length)],document.addEventListener("contextmenu",e=>{(!db||!db.seguridad||db.seguridad.rightclick!==!1)&&e.preventDefault()}),isDesktopBlocked()?showDeviceLockScreen():(buildLogin(),netSize(),startNet()),function(){let e=isDesktopBlocked(),t;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>{const a=isDesktopBlocked();a!==e&&location.reload()},300)})}(),hidePreloader();

// ============================================================
// Sincronización con Supabase (agregado por el CRM).
// No toca nada del script de arriba: solo actualiza `db` con
// los datos reales del CRM y vuelve a pintar el login.
// ============================================================
const __root = document.documentElement;
function __temaForzado() {
  if (__root.classList.contains("hw-season")) return "dark";
  if (__root.classList.contains("xm-season")) return "light";
  return __root.dataset.fixedTheme || null;
}
function aplicarTemporada(val, base) {
  __root.classList.toggle("hw-season", val === "halloween");
  __root.classList.toggle("xm-season", val === "navidad");
  if (base && base !== "aleatorio") __root.dataset.fixedTheme = base; else delete __root.dataset.fixedTheme;
  const f = __temaForzado();
  if (f && __root.dataset.theme !== f) __root.dataset.theme = f;
}
new MutationObserver(() => {
  const f = __temaForzado();
  if (f && __root.dataset.theme !== f) __root.dataset.theme = f;
}).observe(__root, { attributes: true, attributeFilter: ["data-theme"] });
try { if (typeof db !== "undefined") aplicarTemporada(db.temporadaActiva, db.fondoBase); } catch (e) {}

function aplicarPersonalizados() {
  try { __zonaBannerSync(); } catch (e) {}
  try {
    const pc = (typeof db !== "undefined" && db.personalizados) || null;
    if (!pc) return;
    const banner = document.querySelector(".pers-construccion:not([data-zona-banner])");
    if (banner) banner.style.display = "none"; // el aviso ahora vive dentro de App/Web e Invitaciones
    [["pers-appweb", "appweb"], ["pers-invitaciones", "invitaciones"], ["pers-documentos", "documentos"], ["flip-biblioteca", "biblioteca"]].forEach(([id, key]) => {
      const el = document.getElementById(id), c = pc[key];
      const fc = el && el.querySelector(".flip-content");
      if (!fc || !c) return;
      fc.innerHTML = '<span class="fl-ico' + (/🎉|🎊|🥳|🪅|🎈|party|confetti|fiesta|popper/i.test(String(c.icon || "")) ? " is-party" : "") + '">' + iconHTML(c.icon || "") + '</span><b>' + esc(c.title || "") + '</b><small>' + esc(c.sub || "") + '</small>';
    });
  } catch (e) { console.warn("aplicarPersonalizados", e); }
}

function __persSecs(key) {
  return ((db.persCat && db.persCat[key]) || []).map(s => ({ ...s, items: s.items.filter(i => i.disponible !== false) })).filter(s => s.items.length);
}
const PERS_BANNER_DEFAULT = "🚧 ¡ESTA SECCIÓN ESTÁ EN CONSTRUCCIÓN! 🚧";
const PERS_FACE_DEFAULT = {
  appweb: { icon: "📱", title: "App/Web", sub: "Aplicaciones y sitios a medida", desc: "", msg: "Hola, quiero cotizar una app o sitio web a medida." },
  invitaciones: { icon: "💌", title: "Invitaciones digitales", sub: "Diseños personalizados", desc: "", msg: "Hola, quiero cotizar una invitación digital personalizada." }
};
function __persBanner(key) {
  const pc = db.personalizados || {}, c = pc[key] || {};
  const text = typeof c.banner === "string" ? c.banner : (typeof pc.banner === "string" ? pc.banner : PERS_BANNER_DEFAULT);
  const on = typeof c.bannerActivo === "boolean" ? c.bannerActivo : (pc.bannerActivo !== false);
  return (on && text.trim()) ? text.trim() : "";
}

// Aviso «en construcción» de Zona Digital (config.personalizados.biblioteca): hub, Películas/Games y Todo Digital
function __zonaBannerSync() {
  // Cada apartado tiene su aviso: Películas y Games dentro de su catálogo, Todo Digital en el suyo; el menú de Zona Digital no lleva
  const pc = db.personalizados || {};
  const textoDe = k => ((k === "peliculas" || k === "games") && !pc[k]) ? __persBanner("biblioteca") : __persBanner(k);
  [["view-zona", ":scope > .hero", () => null], ["view-zona-cat", ":scope > .hero", () => window.__zcatKey], ["stream-biblioteca", ":scope > .mini-search", () => "biblioteca"]].forEach(([id, anchor, keyFn]) => {
    const v = document.getElementById(id); if (!v) return;
    const k = keyFn(), txt = k ? textoDe(k) : "";
    let b = v.querySelector(":scope > .pers-construccion[data-zona-banner]");
    if (!txt) { if (b) b.remove(); return; }
    if (!b) {
      b = document.createElement("div"); b.className = "pers-construccion"; b.setAttribute("data-zona-banner", "1");
      const ref = v.querySelector(anchor);
      if (!ref) return;
      if (id === "stream-biblioteca") ref.insertAdjacentElement("beforebegin", b); else ref.insertAdjacentElement("afterend", b);
    }
    b.textContent = txt;
  });
}
const __persCatActive = {};
// Símbolo de cada invitación: lee documentos_items.extra.invGender → "m" ♂ · "f" ♀ · "mf" ⚤ (también acepta el símbolo tal cual)
const __PERS_GENDER = { m: ["♂", "Masculino"], f: ["♀", "Femenino"], mf: ["⚤", "Masculino y femenino"] };
const __PERS_GENDER_SYM = { "♂": "m", "♀": "f", "⚤": "mf" };
function __persGender(it, key) {
  if (key !== "invitaciones") return "";
  const raw = String(it.invGender == null ? "" : it.invGender).trim().toLowerCase(), code = __PERS_GENDER[raw] ? raw : __PERS_GENDER_SYM[raw], g = code && __PERS_GENDER[code];
  return g ? '<span class="s-gender g-' + code + '" title="' + g[1] + '" aria-label="' + g[1] + '">' + g[0] + '</span>' : "";
}
function __persCardHTML(it, k, idx, key) {
  const cv = (typeof COVER !== "undefined" && COVER.length) ? COVER[idx % COVER.length] : ["#38b6ff", "#4f6dff"];
  const pr = priceForRole(it);
  // La carátula recorta lo que sobresale (overflow:hidden): con símbolo se envuelve y el chip va AFUERA de ella
  const cov = '<span class="s-cover" style="background:linear-gradient(135deg,' + cv[0] + ',' + cv[1] + ')">' + (iconHTML(it.icon) || "🧩") + '</span>', gh = __persGender(it, key);
  return '<button type="button" class="scard reveal" style="animation-delay:' + Math.min(35 * idx, 600) + 'ms" data-pc="' + k + '">' +
    (gh || key === "invitaciones" ? '<span class="s-cover-wrap">' + cov + gh + (key === "invitaciones" ? '<span class="fl-ico is-party s-party" aria-hidden="true">🎉</span>' : "") + '</span>' : cov) +
    '<span class="s-title">' + esc(it.title) + '</span>' +
    (it.badge ? '<span class="s-sub">' + esc(String(it.badge).split(",").map(x => x.trim()).filter(Boolean).join(" · ")) + '</span>' : "") +
    (pr != null && pr !== "" ? '<span class="s-prices"><span class="s-price green">💲' + pr + '</span></span>' : "") +
    '</button>';
}
function __persRender(key, q) {
  const list = document.getElementById("pers-cat-list");
  if (!list) return;
  const tabs = document.getElementById("pers-cat-tabs");
  const qn = (q || "").trim().toLowerCase();
  const all = __persSecs(key);
  let active = __persCatActive[key] || "__all__";
  if (active !== "__all__" && !all.some(s => s.id === active)) active = __persCatActive[key] = "__all__";
  if (tabs) {
    const pill = (id, name) => '<button type="button" class="stream-cat-pill' + (active === id ? " active" : "") + '" data-pcat="' + id + '">' + esc(name) + '</button>';
    tabs.style.display = all.length > 1 ? "flex" : "none";
    tabs.innerHTML = all.length > 1 ? pill("__all__", "Todas") + all.map(s => pill(s.id, s.name)).join("") : "";
    tabs.querySelectorAll("[data-pcat]").forEach(b => b.onclick = () => {
      __persCatActive[key] = b.dataset.pcat;
      const inp = document.getElementById("pers-cat-search");
      __persRender(key, inp ? inp.value : "");
    });
  }
  const secs = all.filter(s => active === "__all__" || s.id === active).map(s => ({
    ...s,
    items: s.items.filter(i => !qn || (i.title || "").toLowerCase().includes(qn) || (i.sub || "").toLowerCase().includes(qn) || (s.name || "").toLowerCase().includes(qn))
  })).filter(s => s.items.length);
  const map = {};
  if (!secs.length) {
    list.innerHTML = '<div class="glass" style="padding:26px;text-align:center"><div style="font-size:2.2rem;margin-bottom:8px">🛠️</div><b>' + (qn ? "Sin resultados" : "Muy pronto habrá productos aquí") + '</b></div>';
    return;
  }
  let idx = 0;
  list.innerHTML = secs.map((s, si) => {
    const cards = s.items.map((it, ii) => { const k = si + "-" + ii; map[k] = [s, it]; return __persCardHTML(it, k, idx++, key); }).join("");
    return (active === "__all__" && all.length > 1 ? '<h3 class="stream-cat-heading">' + esc(s.name) + '</h3>' : "") + '<div class="stream-grid">' + cards + '</div>';
  }).join("");
  list.querySelectorAll("[data-pc]").forEach(el => el.onclick = () => { const [s, it] = map[el.dataset.pc]; itemDetailModal(s, it, "documentos", key); });
}
function abrirPaginaPers(key) {
  const c = { ...(PERS_FACE_DEFAULT[key] || {}), ...((db.personalizados && db.personalizados[key]) || {}) };
  if (key === "appweb" && !c.msg) c.msg = PERS_FACE_DEFAULT.appweb.msg;   // App/Web siempre lleva «Cotizar a medida»
  const banner = __persBanner(key);
  let view = document.getElementById("view-pers-cat");
  if (!view) {
    view = document.createElement("div");
    view.className = "view hidden";
    view.id = "view-pers-cat";
    document.getElementById("view-documentos").insertAdjacentElement("afterend", view);
  }
  view.innerHTML = '<button class="btn ghost small back-btn" id="pers-cat-back">← Volver</button>' +
    '<div class="hero"><h2 class="display">' + (iconHTML(c.icon || "") || "") + " " + esc(c.title || "") + '</h2></div>' +
    (banner ? '<div class="pers-construccion">' + esc(banner) + '</div>' : "") +
    (c.desc ? '<p class="fine" style="text-align:center;margin:-6px 0 14px">' + esc(c.desc) + '</p>' : "") +
    '<div class="mini-search glass"><svg fill="none" height="18" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24" width="18"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg> <input autocomplete="off" id="pers-cat-search" placeholder="Buscar producto o sección…" spellcheck="false"></div>' +
    '<div id="pers-cat-tabs" style="display:none;flex-wrap:wrap;gap:8px;margin:0 0 16px"></div>' +
    '<div id="pers-cat-list" style="margin-top:6px"></div>' +
    (c.msg ? '<div style="text-align:center;margin:22px 0 10px">' +
      '<div class="m-row"><button class="btn-plane" id="pers-cat-wa" type="button"><span class="default"><span class="svc-svg svc-svg-inline" style="width:1.5em;height:1.5em"><img src="https://api.iconify.design/simple-icons/whatsapp.svg?color=%2325D366" alt="WhatsApp" loading="lazy" style="width:100%;height:100%;object-fit:contain"></span>COTIZAR A MEDIDA</span><span class="success"><svg viewBox="0 0 16 16"><polyline points="3.75 9 7 12 13 5"></polyline></svg>¡Listo!</span><svg class="trails" viewBox="0 0 33 64"><path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path><path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path></svg><div class="plane"><div class="left"></div><div class="right"></div></div></button></div></div>' : "");
  document.getElementById("pers-cat-back").onclick = () => setView("personalizados");
  document.getElementById("pers-cat-search").oninput = (e) => __persRender(key, e.target.value);
  const wa = document.getElementById("pers-cat-wa");
  if (wa) wa.onclick = () => {
    if (wa.classList.contains("active")) return;
    try { confettiBurst(wa); } catch (e) {}
    const __ff = c.form ? parseRequisitos(c.form) : [];
    if (__ff.length) { sendPlane(wa, () => requisitosModal({ title: c.title || "Cotizar a medida", icon: c.icon, note: (key === "invitaciones" ? "Completa los datos de tu evento para cotizar tu invitación a medida." : key === "appweb" ? "Cuéntanos de tu proyecto para cotizar tu app o sitio web a medida." : "Completa tus datos para cotizar a medida."), entregaInv: c.entrega || "", backFn: () => closeModal() }, __ff, c.msg, false)); return; }
    const _wt = window.open("", "_blank"); sendPlane(wa, () => { toast("Solicitud enviada", "📁"); _wt ? (_wt.location.href = waLink(c.msg)) : (location.href = waLink(c.msg)); }); };
  __persRender(key, "");
  setView("personalizados");
  document.getElementById("view-personalizados").classList.add("hidden");
  view.classList.remove("hidden");
}
function abrirPersonalizadoOCatalogo(key) { window.__epPersKey = key; abrirPaginaPers(key); }
if (!window.__persSetViewWrapped) {
  window.__persSetViewWrapped = true;
  const __origSetView = setView;
  setView = function () {
    const v = document.getElementById("view-pers-cat");
    if (v) v.classList.add("hidden");
    return __origSetView.apply(this, arguments);
  };
}
function __persTarget(ev) {
  const el = ev.target.closest && ev.target.closest("#pers-appweb, #pers-invitaciones");
  return el ? (el.id === "pers-appweb" ? "appweb" : "invitaciones") : null;
}
document.addEventListener("click", function (ev) {
  const key = __persTarget(ev);
  if (!key || typeof db === "undefined") return;
  ev.stopImmediatePropagation(); ev.preventDefault();
  abrirPersonalizadoOCatalogo(key);
}, true);
document.addEventListener("keydown", function (ev) {
  if (ev.key !== "Enter" && ev.key !== " ") return;
  const key = __persTarget(ev);
  if (!key || typeof db === "undefined") return;
  ev.stopImmediatePropagation(); ev.preventDefault();
  abrirPersonalizadoOCatalogo(key);
}, true);
try { aplicarPersonalizados(); } catch (e) {}

window.__syncDone = false;

/* ===================================================================
   Sincronización con Supabase: carga inicial + TIEMPO REAL
   - epSync(grupos): lee solo lo que cambió. Sin argumentos = todo.
     Grupos: "streaming" | "servicios" | "docs" | "informatica" | "accesos" | "config" | "perfiles"
   - Realtime avisa cuando el CRM cambia algo (api.js → subscribeCatalog) y se repinta sin recargar.
   =================================================================== */
const EP_API_URL = "./api.js?v=20261017a";
const EP_ALL_GROUPS = ["streaming", "servicios", "docs", "informatica", "accesos", "config", "perfiles"];
const EP_LIVE_TOAST = false; // true = mostrar un aviso "Actualizado en vivo" cada vez que llegue un cambio

function epSync(grupos) {
  const want = new Set(grupos && grupos.length ? grupos : EP_ALL_GROUPS);
  // Si ya hay una lectura en curso, el pedido se junta y se ejecuta al terminar (evita lecturas encimadas).
  if (window.__epSyncBusy) {
    window.__epSyncPending = window.__epSyncPending || new Set();
    want.forEach(g => window.__epSyncPending.add(g));
    return window.__epSyncBusy;
  }
  const p = epSyncRun(want).finally(() => {
    window.__epSyncBusy = null;
    if (window.__epSyncPending) { const sig = [...window.__epSyncPending]; window.__epSyncPending = null; epSync(sig); }
  });
  window.__epSyncBusy = p;
  return p;
}

async function epSyncRun(want) {
  const first = !window.__epFirstSyncDone;
  try {
    const api = await import(EP_API_URL);
    const { StreamingAPI, StreamCatsAPI, SeccionesAPI, ServicioItemsAPI, InformaticaAPI, AccesosAPI, ConfigAPI, ProfilesAPI } = api;

    // allSettled: si una consulta falla, las demás se aplican igual y lo que falló se queda como estaba
    const nada = Promise.resolve(null);
    const nombres = ["streaming", "categorías", "secciones", "informática", "accesos", "config", "perfiles"];
    const res = await Promise.allSettled([
      want.has("streaming") ? StreamingAPI.list() : nada,
      want.has("streaming") ? StreamCatsAPI.list() : nada,
      want.has("servicios") ? SeccionesAPI.list() : nada,
      want.has("informatica") ? InformaticaAPI.list() : nada,
      want.has("accesos") ? AccesosAPI.list() : nada,
      want.has("config") ? ConfigAPI.get() : nada,
      want.has("perfiles") ? ProfilesAPI.listPublic() : nada,
    ]);
    res.forEach((r, i) => { if (r.status === "rejected") console.warn("Sync: no se pudo leer " + nombres[i] + " — se mantiene lo guardado", r.reason); });
    const [streamingRows, streamCatRows, secciones, informaticaRows, accesosRows, cfg, perfiles] = res.map(r => (r.status === "fulfilled" ? r.value : null));

    const mapItem = it => ({
      id: it.id, title: it.title, sub: it.sub || "", badge: it.badge || "",
      price: it.price, price2: it.price2, price3: it.price3,
      popup: it.popup || "", req: it.req || "", entrega: it.entrega || "",
      disponible: it.disponible !== false, icon: it.icon || "",
      note: it.note || "", reqForm: it.reqForm !== false, checklist: it.checklist || "",
      popup0: it.popup0 || "", popup1: it.popup1 || "", popup2: it.popup2 || "",
      msg0: it.msg0 || null, msg1: it.msg1 || null, msg2: it.msg2 || null,
      invGender: it.invGender || "", invVideo: it.invVideo || "",
      gSystem: it.gSystem || "", gFormat: it.gFormat || "", gSize: it.gSize || "", gReq: it.gReq || "", gRec: it.gRec || "", extras: it.extras || null,
    });
    // Agrupa los items por sección (una sola consulta en vez de una por sección)
    const agrupar = rows => {
      const m = new Map();
      (rows || []).forEach(it => { if (!m.has(it.seccion_id)) m.set(it.seccion_id, []); m.get(it.seccion_id).push(it); });
      return m;
    };

    if (streamingRows) {
      db.streaming = streamingRows.map(r => ({
        id: r.id, title: r.title, icon: r.icon || "", sub: r.sub || "",
        price: r.price, price2: r.price2, price3: r.price3,
        disponible: r.disponible !== false, catId: r.cat_id || null,
        durations: r.durations || {},
        msg0: r.msg0 || null, msg1: r.msg1 || null, msg2: r.msg2 || null,
      }));
    }
    if (streamCatRows) db.streamCats = streamCatRows.map(c => ({ id: c.id, name: c.name }));

    if (secciones) {
      try {
        const todos = await ServicioItemsAPI.listAll().catch(() => null);
        const porSec = agrupar(todos);
        const servicios = [];
        for (const sec of secciones) {
          const items = todos ? (porSec.get(sec.id) || []) : await ServicioItemsAPI.listBySeccion(sec.id);
          servicios.push({ id: sec.id, name: sec.name, icon: String(sec.icon || "").trim(), items: items.map(mapItem) });
        }
        db.servicios = servicios;
      } catch (e) { console.warn("Trámites: se mantienen los datos locales", e); }
    }

    if (want.has("docs")) {
      try {
        const docSecs = await api.DocSeccionesAPI.list();
        if (docSecs && docSecs.length) {
          const todos = await api.DocItemsAPI.listAll().catch(() => null);
          const porSec = agrupar(todos);
          const grupos = { documentos: [], appweb: [], invitaciones: [], biblioteca: [], peliculas: [], games: [] };
          for (const sec of docSecs) {
            const items = todos ? (porSec.get(sec.id) || []) : await api.DocItemsAPI.listBySeccion(sec.id);
            const g = grupos[sec.grupo] ? sec.grupo : "documentos";
            grupos[g].push({ id: sec.id, name: sec.name, items: items.map(mapItem) });
          }
          if (grupos.documentos.length) db.documentos = grupos.documentos;
          db.persCat = { appweb: grupos.appweb, invitaciones: grupos.invitaciones };
          // Zona Digital: cada sección del CRM es un grupo; la imagen del artículo es su "ícono" cuando es una URL
          db.biblioteca = grupos.biblioteca.flatMap(sec => sec.items.map(it => ({ ...it, grupo: sec.name, img: /^(https?:)?\/\/|^data:image\//i.test(it.icon || "") ? it.icon : "" })));
          // Zona Digital › Películas por USB y Games PC: solo carátula, nombre y año (el año va en "sub")
          const __cover = it => /^(https?:)?\/\/|^data:image\//i.test(it.icon || "") ? it.icon : "";
          const __zmap = sec => it => ({ id: it.id, grupo: sec.name, title: it.title, sub: it.sub || "", img: __cover(it), disponible: it.disponible !== false, price: it.price, price2: it.price2, price3: it.price3, gSystem: it.gSystem, gFormat: it.gFormat, gSize: it.gSize, gReq: it.gReq, gRec: it.gRec });
          db.bibPel = grupos.peliculas.flatMap(sec => sec.items.map(__zmap(sec)));
          db.bibGames = grupos.games.flatMap(sec => sec.items.map(__zmap(sec)));
        }
      } catch (e) { console.warn("Documentos: se mantienen los datos locales", e); }
    }

    if (informaticaRows) {
      db.informatica = informaticaRows.map(it => ({
        id: it.id, grupo: it.grupo || "", title: it.title, sub: it.sub || "",
        icon: it.icon || "", price: it.price, price2: it.price2, price3: it.price3,
        disponible: it.disponible !== false,
        msg0: it.msg0 || null, msg1: it.msg1 || null, msg2: it.msg2 || null, code: it.code || "",
      }));
    }

    if (accesosRows) {
      db.accesos = accesosRows.map(a => ({
        id: a.id, icon: a.icon || "", name: a.name, sub: a.sub || "", url: a.url || "",
        subVisible: a.subVisible !== false,
      }));
    }

    if (cfg) {
      db.code = cfg.code || db.code;
      db.waNum = cfg.wa_num || db.waNum;
      db.anuncio = cfg.anuncio || db.anuncio;
      { const nuevo = (db.anuncio && db.anuncio.text) || "";   // el robotito avisa cuando el CRM publica un anuncio distinto
        if (window.__anuSeen !== undefined && nuevo && nuevo !== window.__anuSeen) toast("Hay un anuncio nuevo", "📢", () => anuncioModal());
        window.__anuSeen = nuevo; }
      db.murcTool = cfg.murc_tool || db.murcTool;
      db.waMsgs = cfg.wa_msgs || db.waMsgs;
      db.streamVis = cfg.stream_vis || db.streamVis;
      db.heroPalabras = cfg.hero_palabras || db.heroPalabras;
      db.accVis = cfg.acc_vis || db.accVis;
      db.negocio = { ...(db.negocio || {}), ...(cfg.negocio || {}) };
      try { window.__cfCodeCfg = (cfg.code_cfg && typeof cfg.code_cfg === "object") ? cfg.code_cfg : {}; localStorage.setItem("codeFichaRemoteV1", JSON.stringify(window.__cfCodeCfg)); } catch (e) {}
      db.iconifyApi = cfg.iconify_api || db.iconifyApi;
      db.seguridad = cfg.seguridad || db.seguridad;
      db.temporadaActiva = cfg.temporada_activa || "ninguna";
      db.fondoBase = cfg.fondo_base || "aleatorio";
      aplicarTemporada(db.temporadaActiva, db.fondoBase);
      if (cfg.personalizados && Object.keys(cfg.personalizados).length) { db.personalizados = cfg.personalizados; aplicarPersonalizados(); }
    }

    if (perfiles && perfiles.length) {
      db.users = perfiles.map(p => {
        const viejo = (db.users || []).find(u => u.id === p.id);
        return {
          id: p.id, name: p.name, username: p.username || "", emoji: p.emoji || "👤",
          strong: !!p.strong_auth, remote: true, role: p.role,
          // valores por defecto + lo que la persona ya tenía en este equipo + lo que manda el CRM (p. ej. "activo")
          prefs: { ...defPrefs(), ...((viejo && viejo.prefs) || {}), ...(p.prefs || {}) },
          created: p.created_at || Date.now(),
        };
      });
    }

    save();

    // Volver a dibujar lo que cambió (precios, disponibilidad, accesos, anuncio, "quién ve qué"…)
    epRepaint(want, first);

    // Cuenta suspendida desde el CRM: si tenía la sesión abierta, se cierra
    if (want.has("perfiles")) {
      try {
        const act = (db.session && db.session !== "guest") ? db.users.find(u => u.id === db.session) : null;
        if (act && act.prefs && act.prefs.activo === false) {
          logout();
          toast("Tu cuenta está suspendida", "⛔");
        }
      } catch (e) { console.warn("No se pudo revisar la suspensión", e); }
    }
    // Si la persona está escribiendo usuario/contraseña (panel 1 del login) NO se reinicia el carrusel.
    // Solo en la carga inicial: las actualizaciones en vivo nunca tocan la pantalla de login.
    if (first && (typeof db.session === "undefined" || db.session === null)) {
      if (loginPanelIdx === 0) buildLogin(); else { try { applyLockUI(); } catch (e) {} }
    }
    if (first && typeof aplicarTemaTemporada === "function") aplicarTemaTemporada();
  } catch (err) {
    console.warn("No se pudo sincronizar con Supabase — la app sigue con sus datos guardados localmente.", err);
  } finally {
    window.__epFirstSyncDone = true;
    window.__syncDone = true;
  }
}

// Repinta solo lo que corresponde a los grupos que cambiaron. No toca modales abiertos ni los campos de búsqueda.
function epRepaint(want, first) {
  const intentar = (fn) => { try { fn(); } catch (e) { console.warn("Tiempo real: no se pudo repintar", e); } };
  const val = (id) => { const el = document.getElementById(id); return el ? el.value : ""; };
  const appEl = document.getElementById("screen-app");
  const dentro = !!appEl && !appEl.classList.contains("hidden");

  // Lo de siempre en la carga inicial (también con la pantalla de login visible)
  if (first) {
    intentar(() => {
      if (typeof renderMurc === "function") renderMurc();
      if (typeof renderAccesos === "function") { renderAccesos($("#acc-row-home")); renderAccesos($("#acc-row-srv")); }
      if (typeof renderStreamHub === "function") renderStreamHub();
      if (typeof renderHeroHeadline === "function") renderHeroHeadline();
    });
  }
  if (!dentro) return; // en el login no hay listas que repintar

  const cfgCambio = want.has("config");
  if (want.has("streaming") || cfgCambio) intentar(() => {
    if (typeof renderStreamCatTabs === "function") renderStreamCatTabs();
    renderStreaming(val("str-search"));
  });
  if (want.has("servicios")) intentar(() => renderServicios(val("srv-search")));
  if (want.has("docs")) intentar(() => {
    renderServicios(val("doc-search"), "documentos");
    const pv = document.getElementById("view-pers-cat");
    if (pv && !pv.classList.contains("hidden") && window.__epPersKey && typeof __persRender === "function") __persRender(window.__epPersKey, "");
  });
  if (want.has("informatica")) intentar(() => {
    renderInformatica(val("inf-search"));
    if (typeof renderInfCreativityGrid === "function") renderInfCreativityGrid();
  });
  if (want.has("accesos") || cfgCambio) intentar(() => {
    if (typeof renderAccesos === "function") { renderAccesos($("#acc-row-home")); renderAccesos($("#acc-row-srv")); }
  });
  if (cfgCambio) intentar(() => {
    if (typeof renderMurc === "function") renderMurc();
    if (typeof renderStreamHub === "function") renderStreamHub();
    if (typeof renderHeroHeadline === "function") renderHeroHeadline();
    if (typeof renderAnuncio === "function") renderAnuncio();
  });
  // Contadores de Ajustes y resultados de la búsqueda general (si hay algo escrito)
  if (!first) {
    intentar(() => { if (typeof renderCats === "function") renderCats(); });
    intentar(() => { const q = val("search-input").trim(); if (q && typeof runQuery === "function") runQuery(q); });
  }
}

window.__syncPromise = epSync(null);

// ---------------- Tiempo real ----------------
(function epLive() {
  const pendientes = new Set();
  let temporizador = null;
  let huboSuscripcion = false;
  window.__epRtState = "INIT";

  function alCambiar(grupo) {
    pendientes.add(grupo);
    clearTimeout(temporizador);
    // Espera 400 ms: si el CRM cambia 20 precios seguidos, la app hace UNA sola lectura
    temporizador = setTimeout(() => {
      const lista = [...pendientes]; pendientes.clear();
      epSync(lista).then(() => {
        if (EP_LIVE_TOAST) { try { toast("Actualizado en vivo", "🔄"); } catch (e) {} }
      });
    }, 400);
  }

  function alEstado(estado) {
    const previo = window.__epRtState;
    window.__epRtState = estado;
    if (estado === "SUBSCRIBED") {
      // Si se había caído la conexión, se pudo perder algún cambio: se vuelve a leer todo
      if (huboSuscripcion && previo !== "SUBSCRIBED") epSync(null);
      huboSuscripcion = true;
    } else if (estado === "CHANNEL_ERROR" || estado === "TIMED_OUT") {
      console.warn("Tiempo real: " + estado + " (se reintenta solo)");
    }
  }

  // Se enciende al terminar la carga inicial, para no competir con ella
  Promise.resolve(window.__syncPromise).then(async () => {
    try {
      const api = await import(EP_API_URL);
      if (typeof api.subscribeCatalog !== "function") return;
      window.__epUnsub = api.subscribeCatalog(alCambiar, alEstado);
    } catch (e) {
      console.warn("Tiempo real no disponible — la app sigue con la sincronización normal", e);
    }
  });

  // Red de seguridad: al volver a la pestaña (tras 20 s o más) o recuperar internet, se vuelve a leer todo
  let oculto = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { oculto = Date.now(); return; }
    if (oculto && Date.now() - oculto > 20000) epSync(null);
    oculto = 0;
  });
  window.addEventListener("online", () => epSync(null));

  // Los perfiles (suspender cuenta, cambiar emoji…) no van por tiempo real por seguridad: se revisan cada 60 s
  setInterval(() => { if (!document.hidden) epSync(["perfiles"]); }, 60000);
  // Si el canal en vivo no está conectado, cada 5 min se relee el catálogo
  setInterval(() => { if (!document.hidden && window.__epRtState !== "SUBSCRIBED") epSync(null); }, 300000);
})();

// Si se intenta entrar con un usuario que todavía no está cargado (la lista llega de Supabase),
// se espera a que termine la sincronización (máx. 6 s) en vez de decir "Usuario no encontrado".
document.addEventListener("submit", function (ev) {
  const f = ev.target;
  if (!f || f.id !== "login-form" || window.__syncDone || typeof db === "undefined") return;
  const u = (document.getElementById("login-user").value || "").trim().toLowerCase();
  if (!u || db.users.some(x => (x.username || x.name).toLowerCase() === u)) return;
  ev.stopImmediatePropagation(); ev.preventDefault();
  Promise.race([window.__syncPromise, new Promise(r => setTimeout(r, 6000))]).then(() => {
    window.__syncDone = true;
    if (f.requestSubmit) f.requestSubmit(); else f.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  });
}, true);

// La contraseña del login siempre arranca oculta (un guardado anterior del HTML la pudo dejar visible).
(function () { const p = document.getElementById("login-pass"); if (p) p.type = "password"; })();

// ============================================================
// RFC combinada: "Con foto" (ydmu9ic) vs "Con CURP" (08qd2di).
// No modifica nada del código de arriba: intercepta el click
// en fase de captura y reusa el modal real de cada trámite.
// ============================================================
document.addEventListener("click", function (ev) {
  const card = ev.target.closest('.srv-item[data-iid="ydmu9ic"]');
  if (!card) return;
  if (typeof db === "undefined" || !db.servicios) return; // todavía no cargó, dejar el click normal

  const secFoto = db.servicios.find(s => s.items.some(it => it.id === "ydmu9ic"));
  const itFoto = secFoto && secFoto.items.find(it => it.id === "ydmu9ic");
  const secCurp = db.servicios.find(s => s.items.some(it => it.id === "08qd2di"));
  const itCurp = secCurp && secCurp.items.find(it => it.id === "08qd2di");
  if (!itFoto || !itCurp) return; // si algo no existe más, dejar pasar el click normal

  ev.stopImmediatePropagation();
  ev.preventDefault();

  const pFoto = priceForRole(itFoto);
  const pCurp = priceForRole(itCurp);
  openModal(`
    <div class="m-ico">${iconHTML(itFoto.icon)}</div>
    <h4>${esc(itFoto.title)}</h4>
    <p>¿Qué tienes disponible?</p>
    <div class="m-row"><button class="btn btn-primary" id="rfc-pick-foto">📷 Tengo foto de referencia — 💲${pFoto}</button></div>
    <div class="m-row"><button class="btn btn-primary" id="rfc-pick-curp">🆔 Solo tengo CURP — 💲${pCurp}</button></div>
    <div class="m-note">Este trámite no te inscribe al SAT; solo recupera y actualiza tus datos.</div>
    <div class="m-row"><button class="btn ghost" data-close>Cerrar</button></div>
  `);
  document.getElementById("rfc-pick-foto").onclick = () => { closeModal(); itemDetailModal(secFoto, itFoto, "servicios"); };
  document.getElementById("rfc-pick-curp").onclick = () => { closeModal(); itemDetailModal(secCurp, itCurp, "servicios"); };
}, true);
(function codeTabs(){
  const bar=document.getElementById("code-tabs"); if(!bar) return;
  bar.addEventListener("click",ev=>{
    const b=ev.target.closest("[data-codetab]"); if(!b) return;
    const t=b.dataset.codetab;
    bar.querySelectorAll("[data-codetab]").forEach(x=>x.classList.toggle("active",x===b));
    document.getElementById("code-sec-falla").classList.toggle("hidden",t!=="falla");
    document.getElementById("code-sec-template").classList.toggle("hidden",t!=="template");
  });
})();

/* ===== Código > Template: pantalla de código (portado de web3 · CODE TEMPLATE) ===== */
(function otpTemplate(){
  const ROOT = document.getElementById("code-sec-template"); if (!ROOT) return;
  const THESVG_ICON_BASE = "https://thesvg.org/icons/";
  const THESVG_ICON_MIRROR = "https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/";
  const THESVG_CACHE_KEY = "thesvgIconCacheV1";
  let THESVG_CACHE = {};
  try { THESVG_CACHE = JSON.parse(localStorage.getItem(THESVG_CACHE_KEY) || "{}") || {}; } catch (e) { THESVG_CACHE = {}; }
  function saveTheSvgCache() { try { localStorage.setItem(THESVG_CACHE_KEY, JSON.stringify(THESVG_CACHE)); } catch (e) {} }
  function fetchWithTimeout(url, ms) {
    const ctrl = ('AbortController' in window) ? new AbortController() : null;
    const timer = setTimeout(() => { if (ctrl) ctrl.abort(); }, ms || 8000);
    return fetch(url, ctrl ? { signal: ctrl.signal } : undefined).finally(() => clearTimeout(timer));
  }

  
  function sanitizeSvgNode(root) {
    root.querySelectorAll('script, foreignObject, iframe, object, embed').forEach(n => n.remove());
    root.querySelectorAll('*').forEach(el => {
      Array.from(el.attributes).forEach(a => {
        const n = a.name.toLowerCase(), v = a.value.trim().toLowerCase();
        if (n.indexOf('on') === 0 || ((n === 'href' || n === 'xlink:href') && v.indexOf('javascript:') === 0)) el.removeAttribute(a.name);
      });
    });
  }
  function svgTextToIconData(text) {
    const doc = new DOMParser().parseFromString(text, 'image/svg+xml');
    const svg = doc.documentElement;
    if (!svg || svg.nodeName.toLowerCase() !== 'svg' || doc.querySelector('parsererror')) throw new Error('bad-svg');
    sanitizeSvgNode(svg);
    let left = 0, top = 0, width = 24, height = 24;
    const vb = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    if (vb.length === 4 && vb.every(n => isFinite(n)) && vb[2] > 0 && vb[3] > 0) { left = vb[0]; top = vb[1]; width = vb[2]; height = vb[3]; }
    else {
      const w = parseFloat(svg.getAttribute('width')), h = parseFloat(svg.getAttribute('height'));
      if (w > 0 && h > 0) { width = w; height = h; }
    }
    const ser = new XMLSerializer();
    let body = Array.from(svg.childNodes).map(n => ser.serializeToString(n)).join('');
    // Atributos de presentación del <svg> raíz (fill, stroke…) se pasan a un <g> para no perderlos
    const inherit = ['fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'opacity']
      .filter(k => svg.hasAttribute(k)).map(k => k + '="' + svg.getAttribute(k).replace(/"/g, '&quot;') + '"').join(' ');
    if (inherit) body = '<g ' + inherit + '>' + body + '</g>';
    return { body, left, top, width, height };
  }
  async function loadTheSvgIcon(slug) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error('bad-slug');
    if (THESVG_CACHE[slug]) return THESVG_CACHE[slug];
    let lastErr;
    for (const base of [THESVG_ICON_BASE, THESVG_ICON_MIRROR]) {
      try {
        const res = await fetchWithTimeout(base + slug + '/default.svg', 10000);
        if (!res.ok) throw new Error('http-' + res.status);
        const data = svgTextToIconData(await res.text());
        THESVG_CACHE[slug] = data;
        saveTheSvgCache();
        return data;
      } catch (e) { lastErr = e; }
    }
    throw lastErr;
  }
  
  const OTP_LOGOS = [
      { slug: 'netflix', label: 'Netflix', color: '#e50914' },
      { slug: 'disney-plus', label: 'Disney+', color: '#113CCF' },
      { slug: 'disney', label: 'Disney', color: '#113CCF' },
      { slug: 'universal-plus', label: 'Universal+', color: '#050b16' },
      { slug: 'openai', label: 'OpenAI (ChatGPT)', color: '#ffffff' },
      { slug: 'hbo-max', label: 'HBO Max', color: '#000000' },
      { slug: 'amazon-prime-video', label: 'Prime Video', color: '#00A8E1' },
      { slug: 'apple-tv', label: 'Apple TV', color: '#000000' },
      { slug: 'spotify', label: 'Spotify', color: '#1DB954' },
      { slug: 'youtube', label: 'YouTube', color: '#FF0000' },
      { slug: '', label: 'Otra (solo texto)', color: '#e50914' }
    ];
    const OTP_DEFAULT = {
      email: 'cliente@correo.com',
      title: 'Ingresa el código que enviamos a tu email',
      expire: 'Este código vence en 15 minutos.',
      resendPre: '¿No recibiste un código?',
      resendLink: 'Solicita el reenvío.',
      brand: 'NETFLIX',
      logoSlug: 'netflix',
      color: '#e50914',
      // Plantilla activa ('netflix' = oscura · 'disney' = hoja blanca) y datos de la plantilla 2
      template: 'netflix',
      d_logoSlug: 'disney-plus',
      d_logoWhite: true,
      d_mask: true,
      d_sub: 'My',
      d_subLogoSlug: 'disney',
      d_title: 'Escribe tu código de acceso único',
      d_desc: 'Para verificar tu dirección de correo electrónico, escribe el código de seis dígitos que te enviamos a {correo}. No olvides revisar la carpeta de correo no deseado. El código vencerá en 15 minutos.',
      d_continue: 'Continuar',
      d_cancel: 'Cancelar',
      d_resendPre: '¿El código no es válido o no recibiste el correo electrónico?',
      d_resendLink: 'Reenviar',
      d_bg: '#0c2a3f',
      // Plantilla Universal
      u_logoSlug: 'universal-plus',
      u_title: 'Activa tu cuenta',
      u_desc: 'Te hemos enviado un correo electrónico a {correo} con el código de activación. Ingresa el código de 6 dígitos.',
      u_btn: 'Activar',
      u_resend: 'Reenviar: 49',
      u_bg: '#050b16',
      u_btnColor: '#a68314',
      u_cf: true,
      errorText: 'El código es obligatorio.',
      d_errorText: 'Código no válido. ¿Intentamos de nuevo?',
      n_digits: 4,
      d_digits: 6,
      u_digits: 6,
      // Plantilla ChatGPT
      g_logoSlug: 'openai',
      g_title: 'Busca en tu bandeja de entrada',
      g_desc: 'Ingrese el código de verificación que acabamos de enviar a {correo}.',
      g_label: 'Código',
      g_continue: 'Continuar',
      g_resend: 'Reenviar correo electrónico',
      g_terms: 'Términos de Uso',
      g_privacy: 'Política de Privacidad',
      g_bg: '#000000'
    };

    
  const state = { template: "netflix", n_digits: 4, d_digits: 6, u_digits: 6 };
  function loadOtpCfg() { return Object.assign({}, OTP_DEFAULT, state); }
  function escapeHtml(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Hora real del dispositivo/PC (no un valor fijo), formato tipo status bar de teléfono.
    function currentTimeStr() {
      const d = new Date();
      let h = d.getHours() % 12;
      if (h === 0) h = 12;
      const m = d.getMinutes();
      return h + ':' + (m < 10 ? '0' + m : m);
    }

    // Íconos de la barra de estado dibujados a mano (SVG propio, no dependen de una librería externa):
    // señal (barras ascendentes), wifi y batería con nivel relleno.
    function statusIconsSvg() {
      return '' +
        '<svg class="otp-mock-signal" width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor"/><rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="9" y="3" width="3" height="8" rx="0.5" fill="currentColor"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor"/></svg>' +
        '<svg class="otp-mock-wifi" width="16" height="12" viewBox="0 0 16 12"><path d="M8 10.3a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3z" fill="currentColor"/><path d="M4.8 6.7a4.6 4.6 0 0 1 6.4 0" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M2 3.9a8.6 8.6 0 0 1 12 0" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>' +
        '<svg class="otp-mock-battery" width="25" height="12" viewBox="0 0 25 12"><rect x="0.75" y="0.75" width="20.5" height="10.5" rx="2.5" stroke="currentColor" stroke-width="1.2" fill="none"/><rect x="22.5" y="4" width="1.8" height="4" rx="0.8" fill="currentColor"/><rect class="otp-mock-battery-fill" x="2.5" y="2.5" width="14" height="6.6" rx="1.2"/></svg>';
    }

    // Logo real de la plataforma: usa la API theSVG ya integrada en el proyecto (íconos "thesvg:<slug>").
    // Si no hay slug (opción "Otra"), cae en el nombre de texto como respaldo.
    // Logo oficial de Netflix (wordmark completo) incrustado directamente, sin depender de ninguna API de íconos.
    const NETFLIX_WORDMARK_SVG = '<svg class="otp-mock-logo-img otp-mock-logo-netflix" viewBox="0 0 512 138" style="height:20px;width:auto;display:block;vertical-align:middle;" xmlns="http://www.w3.org/2000/svg"><path fill="#db202c" d="M340.657 0v100.203q18.54.861 36.98 2.09v21.245a1822 1822 0 0 0-58.542-2.959V0zM512 .012l-28.077 65.094l28.07 72.438l-.031.013a1789 1789 0 0 0-24.576-3.323l-15.763-40.656l-15.913 36.882a1816 1816 0 0 0-22.662-2.36l27.371-63.43L435.352.013h23.325l14.035 36.184L488.318.012zM245.093 119.526V.011h60.19v21.436h-38.628v27.78h29.227v21.245h-29.227v49.05zM164.58 21.448V.01h66.69v21.437h-22.565v98.66c-7.197.19-14.386.412-21.56.683V21.448zM90.868 126.966V.014h59.89v21.435h-38.331v29.036c8.806-.113 21.327-.24 29.117-.222V71.51c-9.751-.12-20.758.134-29.117.217v32.164a1848 1848 0 0 1 38.331-2.62v21.247a1816 1816 0 0 0-59.89 4.45M48.571 77.854L48.57.01h21.562v128.96q-11.823 1.216-23.603 2.584L21.56 59.824v74.802q-10.8 1.406-21.56 2.936V.012h20.491zm346.854 46.965V.012h21.563V126.6c-7.179-.64-14.364-1.23-21.563-1.78"/></svg>';

    function logoMarkup(cfg) {
      if (cfg.logoSlug === 'netflix') {
        return NETFLIX_WORDMARK_SVG;
      }
      if (cfg.logoSlug) {
        // Si el slug ya trae su propio prefijo de API (ej. "thesvg:algo" elegido con el buscador
        // de íconos), se usa tal cual; si es un slug simple (de la lista rápida) se antepone "thesvg:".
        const iconId = cfg.logoSlug.indexOf(':') !== -1 ? cfg.logoSlug : 'thesvg:' + cfg.logoSlug;
        return '<iconify-icon class="otp-mock-logo-img" icon="' + escapeHtml(iconId) + '" style="height:22px;width:auto;" title="' + escapeHtml(cfg.brand) + '"></iconify-icon>';
      }
      return '<span class="otp-mock-logo">' + escapeHtml(cfg.brand) + '</span>';
    }

    // ---- Plantilla 2 (hoja blanca, estilo My Disney) ----
    function maskEmail(e) {
      const at = String(e).indexOf('@');
      if (at < 1) return e;
      return e.slice(0, Math.min(3, at)) + '****' + e.slice(at);
    }
    function logoMarkup2(cfg) {
      const slug = cfg.d_logoSlug;
      if (slug) {
        const iconId = slug.indexOf(':') !== -1 ? slug : 'thesvg:' + slug;
        return '<iconify-icon class="otp2-logo' + (cfg.d_logoWhite ? ' is-white' : '') + '" icon="' + escapeHtml(iconId) + '"></iconify-icon>';
      }
      const found = OTP_LOGOS.find(l => l.slug === slug);
      return '<span class="otp2-logo-text">' + escapeHtml(found && found.slug ? found.label : 'Disney+') + '</span>';
    }
    // Segundo logo (siempre en negro), junto a la palabra "My": va de la API de íconos como el logo principal
    function subLogoMarkup2(cfg) {
      const slug = cfg.d_subLogoSlug;
      if (!slug) return '';
      const iconId = slug.indexOf(':') !== -1 ? slug : 'thesvg:' + slug;
      return '<iconify-icon class="otp2-sub-logo" icon="' + escapeHtml(iconId) + '"></iconify-icon>';
    }
    function buildOtpMarkup2(cfg, emailOverride, opts) {
      let email = emailOverride && emailOverride.trim() ? emailOverride.trim() : cfg.email;
      if (cfg.d_mask) email = maskEmail(email);
      const desc = escapeHtml(cfg.d_desc).replace(/\{correo\}/g, '<b>' + escapeHtml(email) + '</b>');
      return '' +
        '<div class="otp2-phone" style="--otp2-bg:' + escapeHtml(cfg.d_bg) + '">' +
          '<div class="otp2-header">' +
            '<div class="otp2-status"><span>' + currentTimeStr() + '</span><span class="otp2-status-icons">' + statusIconsSvg() + '</span></div>' +
            '<div class="otp2-topbar"><span class="otp2-back"><iconify-icon icon="mdi:chevron-left"></iconify-icon></span>' + logoMarkup2(cfg) + '</div>' +
          '</div>' +
          '<div class="otp2-sheet">' +
            ((cfg.d_sub || cfg.d_subLogoSlug) ? '<div class="otp2-sub">' + (cfg.d_sub ? '<span class="otp2-sub-text">' + escapeHtml(cfg.d_sub) + '</span>' : '') + subLogoMarkup2(cfg) + '</div>' : '') +
            '<div class="otp2-title">' + escapeHtml(cfg.d_title) + '</div>' +
            '<p class="otp2-desc">' + desc + '</p>' +
            '<div class="otp2-digits' + (cfg.d_digits === 4 ? ' n4' : '') + (opts && opts.error ? ' is-err' : '') + '">' + otpDigits(cfg.d_digits === 4 ? 4 : 6, 'otp2-digit', opts && opts.code) + '</div>' + otpErr(cfg, opts, 'otp-err-d', cfg.d_errorText) +
            '<div class="otp2-btn primary">' + escapeHtml(cfg.d_continue) + '</div>' +
            '<div class="otp2-btn ghost">' + escapeHtml(cfg.d_cancel) + '</div>' +
            '<p class="otp2-resend">' + escapeHtml(cfg.d_resendPre) + ' <span class="otp2-link">' + escapeHtml(cfg.d_resendLink) + '</span></p>' +
          '</div>' +
        '</div>';
    }

    // ---- Plantilla Universal ----
    function buildOtpMarkup3(cfg, emailOverride, opts) {
      const email = emailOverride && emailOverride.trim() ? emailOverride.trim() : cfg.email;
      const desc = escapeHtml(cfg.u_desc).replace(/\{correo\}/g, '<b>' + escapeHtml(email) + '</b>');
      let logo;
      if (cfg.u_logoSlug) {
        const iconId = cfg.u_logoSlug.indexOf(':') !== -1 ? cfg.u_logoSlug : 'thesvg:' + cfg.u_logoSlug;
        logo = '<iconify-icon class="otp3-logo" icon="' + escapeHtml(iconId) + '"></iconify-icon>';
      } else {
        logo = '<span class="otp3-logo-text">UNIVERSAL+</span>';
      }
      const cf = cfg.u_cf ? '<div class="otp3-cf"><div class="otp3-cf-ok"><span class="otp3-cf-check"><iconify-icon icon="mdi:check-bold"></iconify-icon></span>¡Operación exitosa!</div>' +
        '<div class="otp3-cf-brand"><svg width="30" height="14" viewBox="0 0 30 14"><path d="M24 13H5.5C2.5 13 1 11 1 9c0-2.3 1.9-4 4.2-4 .5-2.5 2.6-4 5-4 2.3 0 4.2 1.4 4.9 3.4.6-.3 1.2-.5 1.9-.5 2.1 0 3.9 1.6 4.2 3.7C23.6 7.3 26 8.3 26 10.5c0 1.3-.9 2.5-2 2.5z" fill="#f6821f"/></svg><b>CLOUDFLARE</b><span><u>Privacidad</u> · <u>Ayuda</u></span></div></div>' : '';
      return '' +
        '<div class="otp3-phone" style="--otp3-bg:' + escapeHtml(cfg.u_bg) + ';--otp3-btn:' + escapeHtml(cfg.u_btnColor) + '">' +
          '<div class="otp3-status"><span>' + currentTimeStr() + '</span><span class="otp3-status-icons">' + statusIconsSvg() + '</span></div>' +
          '<div class="otp3-topbar"><span class="otp3-sq left"><iconify-icon icon="mdi:chevron-left"></iconify-icon></span>' + logo + '<span class="otp3-sq right"><iconify-icon icon="mdi:close"></iconify-icon></span></div>' +
          '<div class="otp3-title">' + escapeHtml(cfg.u_title) + '</div>' +
          '<div class="otp3-desc">' + desc + '</div>' +
          '<div class="otp3-digits' + (cfg.u_digits === 4 ? ' n4' : '') + (opts && opts.error ? ' is-err' : '') + '">' + otpDigits(cfg.u_digits === 4 ? 4 : 6, 'otp3-digit', opts && opts.code) + '</div>' + otpErr(cfg, opts, 'otp-err-u') +
          '<div class="otp3-btn">' + escapeHtml(cfg.u_btn) + '</div>' +
          '<div class="otp3-btn ghost">' + escapeHtml(cfg.u_resend) + '</div>' +
          cf +
          '<div class="otp3-nav"><i class="n1"></i><i class="n2"></i><i class="n3"></i></div>' +
        '</div>';
    }

    // ---- Plantilla ChatGPT (pantalla negra, logo OpenAI de contorno, campo "Código") ----
    // Logo OpenAI incrustado directamente (trazo blanco, sin depender de ninguna API de íconos).
    const OPENAI_LOGO_SVG = '<svg class="otp4-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.05" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>';
    function buildOtpMarkup4(cfg, emailOverride, opts) {
      const email = emailOverride && emailOverride.trim() ? emailOverride.trim() : cfg.email;
      const desc = escapeHtml(cfg.g_desc).replace(/\{correo\}/g, escapeHtml(email));
      let logo;
      if (cfg.g_logoSlug === 'openai') {
        logo = OPENAI_LOGO_SVG;
      } else if (cfg.g_logoSlug) {
        const iconId = cfg.g_logoSlug.indexOf(':') !== -1 ? cfg.g_logoSlug : 'thesvg:' + cfg.g_logoSlug;
        logo = '<iconify-icon class="otp4-logo" icon="' + escapeHtml(iconId) + '"></iconify-icon>';
      } else {
        logo = '<div class="otp4-logo" style="width:auto;font-size:20px;font-weight:800;height:auto;">OpenAI</div>';
      }
      return '' +
        '<div class="otp4-phone" style="--otp4-bg:' + escapeHtml(cfg.g_bg) + '">' +
          '<div class="otp4-status"><span>' + currentTimeStr() + '</span><span class="otp4-status-icons">' + statusIconsSvg() + '</span></div>' +
          '<div class="otp4-back"><iconify-icon icon="mdi:arrow-left"></iconify-icon></div>' +
          logo +
          '<div class="otp4-title">' + escapeHtml(cfg.g_title) + '</div>' +
          '<div class="otp4-desc">' + desc + '</div>' +
          '<div class="otp4-field' + (opts && opts.error ? ' is-err' : '') + '"><span class="otp4-field-label">' + escapeHtml(cfg.g_label) + '</span>' + (opts && opts.code ? '<span class="otp4-field-val">' + escapeHtml(opts.code) + '</span>' : '') + '</div>' + otpErr(cfg, opts, 'otp-err-g') +
          '<div class="otp4-btn">' + escapeHtml(cfg.g_continue) + '</div>' +
          '<div class="otp4-btn ghost">' + escapeHtml(cfg.g_resend) + '</div>' +
          '<div class="otp4-legal"><u>' + escapeHtml(cfg.g_terms) + '</u> y <u>' + escapeHtml(cfg.g_privacy) + '</u></div>' +
        '</div>';
    }

    function buildOtpMarkup(cfg, emailOverride, opts) {
      if (cfg.template === 'chatgpt') return buildOtpMarkup4(cfg, emailOverride, opts);
      if (cfg.template === 'universal') return buildOtpMarkup3(cfg, emailOverride, opts);
      if (cfg.template === 'disney') return buildOtpMarkup2(cfg, emailOverride, opts);
      const email = emailOverride && emailOverride.trim() ? emailOverride.trim() : cfg.email;
      return '' +
        '<div class="otp-mock-phone" style="--otp-accent:' + escapeHtml(cfg.color) + '">' +
          '<div class="otp-mock-status">' +
            '<span>' + currentTimeStr() + '</span>' +
            '<span class="otp-mock-status-icons">' + statusIconsSvg() + '</span>' +
          '</div>' +
          '<div class="otp-mock-topbar">' +
            '<iconify-icon class="otp-mock-back" icon="mdi:chevron-left"></iconify-icon>' +
            logoMarkup(cfg) +
          '</div>' +
          '<div class="otp-mock-body">' +
            '<div class="otp-mock-title">' + escapeHtml(cfg.title) + '</div>' +
            '<div class="otp-mock-email-row">' +
              '<span class="otp-mock-email">' + escapeHtml(email) + '</span>' +
              '<span class="otp-mock-change">Cambiar</span>' +
            '</div>' +
            '<div class="otp-mock-digits' + (opts && opts.error ? ' is-err' : '') + '">' + otpDigits(cfg.n_digits === 6 ? 6 : 4, 'otp-mock-digit', opts && opts.code) + '</div>' +
            otpErr(cfg, opts, 'otp-err-n') +
            '<div class="otp-mock-note">' + escapeHtml(cfg.expire) + '</div>' +
            '<div class="otp-mock-resend">' + escapeHtml(cfg.resendPre) + ' <span class="otp-mock-resend-link">' + escapeHtml(cfg.resendLink) + '</span></div>' +
            '<div class="otp-mock-help">Obtener ayuda <iconify-icon icon="mdi:chevron-down"></iconify-icon></div>' +
          '</div>' +
        '</div>';
    }

    // Estado del popup (código escrito y error visible) y de la vista previa de Configuración (solo error)
    
  function dlOpts() {
      return { code: (document.getElementById('dlOtpCodeOverride') || {}).value || '', error: !!(document.getElementById('dlOtpShowError') || {}).checked };
    }
    function cfgOpts() {
      return { code: '', error: !!(document.getElementById('cfgOtpErrPreview') || {}).checked };
    }
    function otpDigits(n, cls, code) {
      let out = '';
      for (let i = 0; i < n; i++) out += '<div class="' + cls + '">' + escapeHtml(String(code || '').charAt(i)) + '</div>';
      return out;
    }
    function otpErr(cfg, opts, cls, text) {
      return opts && opts.error ? '<div class="otp-err ' + cls + '">' + escapeHtml(text || cfg.errorText || 'El código es obligatorio.') + '</div>' : '';
    }
    
  function inlineIconsForShot(srcRoot, cloneRoot) {
      const srcIcons = srcRoot.querySelectorAll('iconify-icon');
      srcIcons.forEach(function (src, i) {
        // html2canvas convierte algunos <iconify-icon> en <div>: se localizan por la marca temporal, no por la etiqueta
        const dst = cloneRoot.querySelector('[data-shot-i="' + i + '"]');
        if (!dst) return;
        const svg = src.shadowRoot && src.shadowRoot.querySelector('svg');
        if (!svg) { dst.remove(); return; }
        const rect = src.getBoundingClientRect();
        const cs = getComputedStyle(src);
        const copy = svg.cloneNode(true);
        copy.setAttribute('width', rect.width);
        copy.setAttribute('height', rect.height);
        copy.style.cssText = 'display:block;width:' + rect.width + 'px;height:' + rect.height + 'px;';
        // html2canvas no aplica filter: se emula "logo en blanco / negro" pintando el SVG directamente
        const f = cs.filter || '';
        const tint = f.indexOf('invert') !== -1 ? '#ffffff' : (f.indexOf('brightness(0)') !== -1 ? '#000000' : '');
        if (tint) copy.querySelectorAll('*').forEach(function (n) {
          if (n.getAttribute('fill') !== 'none') n.style.fill = tint;
          if (n.getAttribute('stroke')) n.style.stroke = tint;
        });
        const wrap = dst.ownerDocument.createElement('span');
        wrap.style.cssText = 'display:inline-block;width:' + rect.width + 'px;height:' + rect.height + 'px;color:' + cs.color + ';line-height:0;vertical-align:middle;';
        wrap.appendChild(copy);
        // conserva el lugar en el diseño (márgenes / posición absoluta) del ícono original
        if (cs.position === 'absolute') { wrap.style.position = 'absolute'; wrap.style.left = src.offsetLeft + 'px'; wrap.style.top = src.offsetTop + 'px'; }
        if (cs.display === 'block') { wrap.style.display = 'block'; wrap.style.margin = cs.margin; }
        dst.replaceWith(wrap);
      });
    }
    
  const $o = id => document.getElementById(id);
  let libsPromise = null;
  function loadScript(src) {
    return new Promise((res, rej) => {
      const el = document.createElement("script");
      el.src = src; el.onload = res; el.onerror = () => rej(new Error("No cargó " + src));
      document.head.appendChild(el);
    });
  }
  function ensureIconify() {
    if (libsPromise) return libsPromise;
    libsPromise = (async () => {
      if (!(window.customElements && customElements.get("iconify-icon"))) {
        await loadScript("https://cdn.jsdelivr.net/npm/iconify-icon@3.0.2/dist/iconify-icon.min.js");
      }
      const IconifyEl = window.customElements && customElements.get("iconify-icon");
      if (IconifyEl && typeof IconifyEl.setCustomIconLoader === "function") {
        IconifyEl.setCustomIconLoader(name => loadTheSvgIcon(name).catch(() => null), "thesvg");
        IconifyEl.setCustomIconLoader(name => loadTheSvgIcon(name).catch(() => null), "thesvg-color");
      }
    })();
    libsPromise.catch(() => { libsPromise = null; });
    return libsPromise;
  }
  function digitsKeyFor(tpl) { return { netflix: "n_digits", disney: "d_digits", universal: "u_digits" }[tpl] || ""; }
  function syncDigChips() {
    const k = digitsKeyFor(state.template);
    const cur = k ? state[k] : 0;
    const row = $o("dlOtpDigRow"); if (row) row.hidden = !k;
    ROOT.querySelectorAll(".otp-dig-chip").forEach(c => c.classList.toggle("active", Number(c.dataset.n) === cur));
  }
  function render() {
    const box = $o("dlOtpPreview"); if (!box) return;
    syncDigChips();
    box.innerHTML = buildOtpMarkup(loadOtpCfg(), ($o("dlOtpEmailOverride") || {}).value || "", dlOpts());
  }
  function setTpl(tpl) {
    state.template = (tpl === "disney" || tpl === "universal" || tpl === "chatgpt") ? tpl : "netflix";
    ROOT.querySelectorAll(".otp-tpl-chip").forEach(c => c.classList.toggle("active", c.dataset.tpl === state.template));
    render();
  }
  let started = false;
  async function start() {
    if (started) return render();
    started = true;
    const box = $o("dlOtpPreview");
    if (box) box.innerHTML = '<span class="otp-loading">Cargando pantalla…</span>';
    try { await ensureIconify(); } catch (e) { toast("No cargaron los íconos (revisa tu conexión)", "⚠️"); }
    render();
  }
  ROOT.querySelector("#dlOtpTplChips").addEventListener("click", ev => { const b = ev.target.closest(".otp-tpl-chip"); if (b) setTpl(b.dataset.tpl); });
  ROOT.querySelector("#dlOtpDigChips").addEventListener("click", ev => {
    const chip = ev.target.closest(".otp-dig-chip"), k = digitsKeyFor(state.template);
    if (!chip || !k) return;
    state[k] = Number(chip.dataset.n) === 4 ? 4 : 6;
    render();
  });
  ["dlOtpEmailOverride", "dlOtpCodeOverride", "dlOtpShowError"].forEach(id => {
    const el = $o(id); if (el) { el.addEventListener("input", render); el.addEventListener("change", render); }
  });
  const codeIn = $o("dlOtpCodeOverride");
  if (codeIn) codeIn.addEventListener("input", () => { codeIn.value = codeIn.value.replace(/[^0-9A-Za-z]/g, ""); });
  document.addEventListener("click", ev => { if (ev.target.closest('[data-codetab="template"]')) start(); });
  setInterval(() => { if (started && !ROOT.classList.contains("hidden")) render(); }, 30000);

  $o("dlOtpDownloadBtn").addEventListener("click", async () => {
    const box = $o("dlOtpPreview"), phone = box && box.firstElementChild, btn = $o("dlOtpDownloadBtn");
    if (!phone || phone.classList.contains("otp-loading")) return;
    btn.disabled = true;
    try {
      if (typeof window.html2canvas !== "function") await loadScript("https://cdn.jsdelivr.net/npm/html2canvas-pro@2.4.5/dist/html2canvas-pro.min.js");
      const shotIcons = phone.querySelectorAll("iconify-icon");
      shotIcons.forEach((el, i) => el.setAttribute("data-shot-i", i));
      let canvas;
      try {
        canvas = await window.html2canvas(phone, { backgroundColor: null, scale: 3, useCORS: true, logging: false, onclone: (doc, cloned) => inlineIconsForShot(phone, cloned) });
      } finally { shotIcons.forEach(el => el.removeAttribute("data-shot-i")); }
      const blob = await new Promise(r => canvas.toBlob(r, "image/png"));
      if (!blob) throw new Error("sin imagen");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "pantalla-codigo-" + state.template + ".png";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast("Captura descargada", "📷");
    } catch (e) { toast("No se pudo generar la captura", "⚠️"); }
    finally { btn.disabled = false; }
  });
})();

/* ===== Código > Falla y Entrega: generador de ficha (portado de web3 · CODE — Generador de ficha) ===== */
(function fichaCodigo(){
  if (!document.getElementById("dlCodeFichaInput")) return;
  try { if (!window.__cfCodeCfg) window.__cfCodeCfg = JSON.parse(localStorage.getItem("codeFichaRemoteV1") || "null") || {}; } catch (e) { window.__cfCodeCfg = {}; }
  const toast = (m, o) => { if (typeof window.toast === "function") window.toast(m, typeof o === "string" ? o : (o && o.type === "error" ? "⚠️" : "🧾")); };
  const CF_PLATFORMS = ['Netflix', 'Disney', 'Crunchyroll', 'HBO Max', 'Max', 'Prime Video', 'Star+', 'Paramount+', 'Vix', 'ViX', 'Spotify', 'YouTube Premium', 'Apple TV+', 'Apple Music'];
    const CF_MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    function cfClean(t) { return (t || '').replace(/[\u200B\u200C\u200D\uFEFF\u2060]/g, ''); }

    // Busca "etiqueta: valor" en cualquier línea; si el valor queda vacío en esa misma línea
    // (porque va en la siguiente, como pasa seguido al pegar de WhatsApp), toma la siguiente línea no vacía.
    function cfFindLabel(text, altPattern) {
      const lines = cfClean(text).split(/\r?\n/);
      const re = new RegExp('^[^a-zA-Z0-9]*(?:' + altPattern + ')\\s*:\\s*(.*)$', 'i');
      for (let i = 0; i < lines.length; i++) {
        const stripped = lines[i].replace(/[`*_>#~]/g, '').trim();
        if (!stripped) continue;
        const m = stripped.match(re);
        if (m) {
          let val = (m[1] || '').replace(/[`*_]+$/g, '').trim();
          if (!val) {
            for (let j = i + 1; j < lines.length; j++) {
              const next = lines[j].replace(/[`*_>#~]/g, '').trim();
              if (next) { val = next; break; }
            }
          }
          return val;
        }
      }
      return '';
    }

    // Algunos pedidos (p.ej. IPTV) traen la etiqueta corrida: "Usuario:USUARIO xxx CONTRA yyy"
    // o "Contrasena:URL https://...". Se detecta ese patrón sin importar en qué línea/etiqueta caiga.
    function cfDetectUsuarioContraEmbebido(text) {
      const m = cfClean(text).match(/USUARIO\s+(\S+)\s+CONTRA\s+(\S+)/i);
      return m ? { usuario: m[1].trim(), contra: m[2].trim() } : null;
    }
    function cfDetectUrlEmbebida(text) {
      const m = cfClean(text).match(/URL\s*:?\s*(https?:\/\/\S+)/i);
      return m ? m[1].trim() : '';
    }
    function cfDetectPlatform(text) {
      const v = cfFindLabel(text, 'plataforma');
      if (v) return v.replace(/\s{2,}.*$/, '').trim();
      for (const p of CF_PLATFORMS) {
        if (new RegExp(p.replace('+', '\\+'), 'i').test(text)) return p;
      }
      // Si el texto empieza con una línea "título" (sin etiqueta de campo conocida),
      // se usa esa línea como nombre de plataforma/producto — típico de pedidos de IPTV.
      const lines = cfClean(text).split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const stripped = lines[i].replace(/[`*_>#~]/g, '').trim();
        if (!stripped) continue;
        const esLineaConEtiqueta = /^[^a-zA-Z0-9]*(usuario|user|username|contrase|contrasena|clave|password|pass|correo|email|perfil|profile|fecha|duraci|precio|vence|tipo|url|link|enlace)\s*:/i.test(stripped);
        if (!esLineaConEtiqueta) return stripped;
        break;
      }
      return '';
    }
    function cfDetectEmail(text) {
      const m = cfClean(text).match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
      return m ? m[0] : '';
    }
    function cfDetectUsuario(text) {
      const embebido = cfDetectUsuarioContraEmbebido(text);
      if (embebido) return embebido.usuario;
      return cfFindLabel(text, 'usuario|user|username');
    }
    function cfDetectUrl(text) {
      const embebida = cfDetectUrlEmbebida(text);
      if (embebida) return embebida;
      return cfFindLabel(text, 'url|link|enlace');
    }
    function cfDetectPassword(text) {
      const embebido = cfDetectUsuarioContraEmbebido(text);
      if (embebido) return embebido.contra;
      const v = cfFindLabel(text, 'contraseña|contrasena|clave|password|pass');
      if (v && /^https?:\/\//i.test(v.trim())) return ''; // evita tomar una URL como si fuera la contraseña
      return v;
    }
    function cfDetectProfile(text) {
      let v = cfFindLabel(text, 'perfil|profile');
      if (v) return v.replace(/[.*]+$/, '').trim();
      const m = cfClean(text).match(/@[a-z0-9.-]+\.[a-z]{2,}\s*\|\s*([^\n\r]+)/i);
      return m ? m[1].trim() : '';
    }
    function cfDetectDateRaw(text) {
      const v = cfFindLabel(text, 'fecha de compra|fecha de entrega|fecha');
      let m = v.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/);
      if (!m) m = cfClean(text).match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/);
      return m ? (m[1] + '/' + m[2] + '/' + m[3]) : '';
    }
    function cfFormatFechaEntrega(ddmmyyyy) {
      const m = (ddmmyyyy || '').match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/);
      if (!m) return ddmmyyyy || '';
      const dd = parseInt(m[1], 10);
      const mm = parseInt(m[2], 10);
      let yyyy = m[3];
      if (yyyy.length === 2) yyyy = '20' + yyyy;
      const mesNombre = CF_MESES[mm - 1] || '';
      return dd + ' de ' + mesNombre + ' ' + yyyy;
    }

    // ----- Plantillas editables (Entrega / Falla) -----
    const CF_DEFAULT_TPL = {
      entrega:
        '🍿 Plataforma: {plataforma}\n\n' +
        '```\n' +
        ' 🔗 `URL` :  \n\n' +
        '```\n\n' +
        '{url}\n' +
        '👤 `USUARIO:` {usuario}\n' +
        '🔑 `CONTRASEÑA:` {contraseña}\n' +
        '📆 `Fecha de compra:` {fecha}\n' +
        '⏳ Duracion:1 mes\n' +
        '✅ GARANTIA VÁLIDA POR 25 DÍAS SIEMPRE Y CUANDO RESPETES LAS REGLAS DE CADA PERFIL✅️\n' +
        '❌ NO CAMBIOS DE CONTRASEÑA\n' +
        '❌ NO INVADIR PERFILES\n' +
        '❌ NO CAMBIAR NOMBRE O AGREGAR DATOS A LOS PERFILES\n\n' +
        '¡Muchas gracias por tu compra! 🙌 Apreciamos mucho tu confianza. Si tienes alguna duda o necesitas apoyo con tu pedido, con gusto estamos para ayudarte. ¡Esperamos verte pronto de nuevo! 🍿',
      falla:
        '🌷 FICHA PARA CÓDIGO 🌷\n\n' +
        '```\n' +
        ' 🔗 `URL` :  \n\n' +
        '```\n\n' +
        '{url}\n' +
        '👤 `USUARIO:` {usuario}\n' +
        '🔑 `CONTRASEÑA:` {contraseña}\n' +
        '✨ TIPO DE CÓDIGO: {tipo}\n' +
        '📅 FECHA DE ENTREGA: {fecha}\n\n' +
        '📸 FOTO:\n' +
        '📌 Si es Disney, debe de ser VIDEO y está ficha adjunta\n' +
        '📌 Y las demás apps donde se solicite código será foto y ficha'
    };
    // ----- Cards de plantillas: vienen del CRM (Configuración › CODE) vía Supabase (config.code_cfg) -----
    // La app no las edita ni muestra selector: solo usa lo que se configuró en el CRM.
    // Misma lógica que el CRM: la card con "regla" cuyas palabras estén en la plataforma; si ninguna, la card por defecto.
    const CF_CARDS_KEY = 'codeFichaTpl_cardsV1';
    function cfRemote() { return (window.__cfCodeCfg && typeof window.__cfCodeCfg === 'object') ? window.__cfCodeCfg : {}; }
    function cfRawLegacy(kind) { const v = cfRemote()['codeFichaTpl_' + kind]; return typeof v === 'string' ? v : ''; }
    function cfDefaultCards() {
      const conPerfil = CF_DEFAULT_TPL.entrega
        .replace('👤 `USUARIO:` {usuario}\n', '👤 `USUARIO:` {correo}\n')
        .replace('🔑 `CONTRASEÑA:` {contraseña}\n', '🔑 `CONTRASEÑA:` {contraseña}\n🧑 `PERFIL:` {perfil}\n');
      return {
        entrega: [
          { id: 'e1', name: 'Entrega estándar', text: cfRawLegacy('entrega') || CF_DEFAULT_TPL.entrega },
          { id: 'e2', name: 'Entrega con correo y perfil', text: conPerfil }
        ],
        falla: [ { id: 'f1', name: 'Falla estándar', text: cfRawLegacy('falla') || CF_DEFAULT_TPL.falla } ],
        active: { entrega: 'e1', falla: 'f1' }
      };
    }
    function cfLoadCards() {
      try {
        const rawStr = cfRemote()[CF_CARDS_KEY];
        const raw = typeof rawStr === 'string' ? JSON.parse(rawStr) : (rawStr || null);
        if (raw && Array.isArray(raw.entrega) && raw.entrega.length && Array.isArray(raw.falla) && raw.falla.length) {
          raw.active = raw.active || {};
          ['entrega', 'falla'].forEach(k => { if (!raw[k].some(c => c.id === raw.active[k])) raw.active[k] = raw[k][0].id; });
          return raw;
        }
      } catch (e) { /* si algo falla, se usan las cards iniciales */ }
      return cfDefaultCards();
    }
    function cfNorm(t) { return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }
    function cfMatchWords(c) { return String(c.match || '').split(',').map(cfNorm).filter(Boolean); }
    function cfAutoCard(kind, platform) {
      const cards = cfLoadCards(), list = cards[kind] || [];
      const p = cfNorm(platform);
      if (p) { const hit = list.find(c => cfMatchWords(c).some(w => p.indexOf(w) > -1)); if (hit) return hit; }
      return list.find(c => c.id === cards.active[kind]) || list[0] || null;
    }
    function cfLoadTpl(kind, platform) { const c = cfAutoCard(kind, platform); return c ? c.text : CF_DEFAULT_TPL[kind]; }
    function cfSaveTplRaw(kind, text) {
      try { localStorage.setItem('codeFichaTpl_' + kind, text); } catch (e) {}
    }
    
  const cfOutcomeState = { cfg: 'entrega', dl: 'entrega' };
    window.setCodeFichaOutcome = function (prefix, outcome) {
      cfOutcomeState[prefix] = outcome;
      const sw = document.getElementById(prefix + 'CodeFichaTypeSwitch');
      if (sw) sw.querySelectorAll('.cf-type-btn').forEach(b => b.classList.toggle('active', b.dataset.cfOutcome === outcome));
      const hint = document.getElementById(prefix + 'CodeFichaOutcomeHint');
      if (hint) {
        hint.classList.remove('cf-outcome-entrega', 'cf-outcome-falla');
        hint.classList.add('cf-outcome-' + outcome);
        hint.innerHTML = 'Vas a generar: <strong>Ficha de ' + (outcome === 'falla' ? 'FALLA' : 'ENTREGA') + '</strong>' + (outcome === 'falla' ? ' (código rechazado)' : ' (código exitoso)');
      }
      if (typeof toast === 'function') {
        toast('Vas a generar: Ficha de ' + (outcome === 'falla' ? 'FALLA' : 'ENTREGA'), { type: outcome === 'falla' ? 'error' : 'ok' });
      }
      const fallaBox = document.getElementById(prefix + 'CodeFichaFalla');
      if (fallaBox) fallaBox.style.display = outcome === 'falla' ? 'block' : 'none';
      const outputWrap = document.getElementById(prefix + 'CodeFichaOutputWrap');
      if (outputWrap && outputWrap.style.display !== 'none') window.buildCodeFicha(prefix);
    };

    // Paso 1: lee el texto pegado, detecta los campos y los muestra editables.
    window.extractCodeFicha = function (prefix) {
      const raw = (document.getElementById(prefix + 'CodeFichaInput') || {}).value || '';
      if (!raw.trim()) { if (typeof toast === 'function') toast('Pega primero el texto del pedido', { type: 'error' }); return; }
      const platformEl = document.getElementById(prefix + 'CodeFichaPlatform');
      const usuarioEl = document.getElementById(prefix + 'CodeFichaUsuario');
      const urlEl = document.getElementById(prefix + 'CodeFichaUrl');
      const emailEl = document.getElementById(prefix + 'CodeFichaEmail');
      const passwordEl = document.getElementById(prefix + 'CodeFichaPassword');
      const profileEl = document.getElementById(prefix + 'CodeFichaProfile');
      const dateEl = document.getElementById(prefix + 'CodeFichaDate');
      if (platformEl) platformEl.value = cfDetectPlatform(raw);
      if (usuarioEl) usuarioEl.value = cfDetectUsuario(raw);
      if (urlEl) urlEl.value = cfDetectUrl(raw);
      if (emailEl) emailEl.value = cfDetectEmail(raw);
      if (passwordEl) passwordEl.value = cfDetectPassword(raw);
      if (profileEl) profileEl.value = cfDetectProfile(raw);
      if (dateEl) dateEl.value = cfDetectDateRaw(raw);
      const fieldsBox = document.getElementById(prefix + 'CodeFichaFields');
      if (fieldsBox) fieldsBox.style.display = 'block';
      window.buildCodeFicha(prefix);
      if ((cfOutcomeState[prefix] || 'entrega') === 'entrega') {
        announceFichaConConfeti();
      }
    };

    // Muestra el aviso del robotito y, cuando termina de asomarse, lanza el confeti desde su posición real.
    function announceFichaConConfeti() {
      if (typeof toast === 'function') toast('¡Ficha generada!');
      setTimeout(() => {
        const bots = document.querySelectorAll('#toastBox .rtoast-bot');
        const bot = bots[bots.length - 1];
        if (typeof fireConfetti !== 'function') return;
        if (bot) {
          const r = bot.getBoundingClientRect();
          fireConfetti(r.left + r.width / 2, r.top + r.height / 2);
        } else {
          fireConfetti(window.innerWidth - 60, window.innerHeight - 60);
        }
      }, 380);
    }

    // Paso 2: arma la ficha final (Entrega o Falla, según lo elegido) a partir de los campos.
    window.buildCodeFicha = function (prefix) {
      const platform = ((document.getElementById(prefix + 'CodeFichaPlatform') || {}).value || '').trim();
      const usuario = ((document.getElementById(prefix + 'CodeFichaUsuario') || {}).value || '').trim();
      const url = ((document.getElementById(prefix + 'CodeFichaUrl') || {}).value || '').trim();
      const email = ((document.getElementById(prefix + 'CodeFichaEmail') || {}).value || '').trim();
      const password = ((document.getElementById(prefix + 'CodeFichaPassword') || {}).value || '').trim();
      const profile = ((document.getElementById(prefix + 'CodeFichaProfile') || {}).value || '').trim();
      const dateRaw = ((document.getElementById(prefix + 'CodeFichaDate') || {}).value || '').trim();
      const typeSel = document.getElementById(prefix + 'CodeFichaType');
      const tipo = typeSel ? typeSel.value : 'acceso';
      const fechaEntrega = cfFormatFechaEntrega(dateRaw);
      const outcome = cfOutcomeState[prefix] || 'entrega';
      let motivo = '';
      if (outcome === 'falla') {
        const motivoSel = document.getElementById(prefix + 'CodeFichaMotivo');
        const motivoOtro = document.getElementById(prefix + 'CodeFichaMotivoOtro');
        motivo = motivoSel ? motivoSel.value : '';
        if (motivoOtro && motivoOtro.value.trim()) motivo = motivo + (motivo ? ' — ' : '') + motivoOtro.value.trim();
      }
      const tpl = cfLoadTpl(outcome, platform);
      const text = tpl
        .replace(/\{plataforma\}/g, platform || '—')
        .replace(/\{usuario\}/g, usuario || '—')
        .replace(/\{url\}/g, url || '—')
        .replace(/\{correo\}/g, email || '—')
        .replace(/\{contraseña\}/g, password || '—')
        .replace(/\{perfil\}/g, profile || '—')
        .replace(/\{tipo\}/g, tipo || '—')
        .replace(/\{fecha\}/g, fechaEntrega || '—')
        .replace(/\{motivo\}/g, motivo || '—');
      const outputEl = document.getElementById(prefix + 'CodeFichaOutput');
      const outputWrap = document.getElementById(prefix + 'CodeFichaOutputWrap');
      const outputLabel = document.getElementById(prefix + 'CodeFichaOutputLabel');
      if (outputEl) outputEl.value = text;
      if (outputWrap) outputWrap.style.display = 'block';
      if (outputLabel) outputLabel.textContent = 'Ficha generada — ' + (outcome === 'falla' ? 'FALLA' : 'ENTREGA');
    };

    window.copyCodeFichaFrom = function (id) {
      const el = document.getElementById(id);
      if (!el || !el.value) return;
      const done = () => { if (typeof toast === 'function') toast('Copiado'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(el.value).then(done).catch(() => {
          el.select(); document.execCommand('copy'); done();
        });
      } else {
        el.select(); document.execCommand('copy'); done();
      }
    };

    window.pasteCodeFichaInto = function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(text => {
          el.value = text;
          el.focus();
          if (typeof toast === 'function') toast('Pegado');
        }).catch(() => {
          if (typeof toast === 'function') toast('No se pudo leer el portapapeles');
          el.focus();
        });
      } else {
        el.focus();
        if (typeof toast === 'function') toast('Pega el texto con Ctrl+V');
      }
    };

    window.clearCodeFichaInput = function (prefix) {
      const ta = document.getElementById(prefix + 'CodeFichaInput');
      if (ta) ta.value = '';
      const platformEl = document.getElementById(prefix + 'CodeFichaPlatform');
      const usuarioEl = document.getElementById(prefix + 'CodeFichaUsuario');
      const urlEl = document.getElementById(prefix + 'CodeFichaUrl');
      const emailEl = document.getElementById(prefix + 'CodeFichaEmail');
      const passwordEl = document.getElementById(prefix + 'CodeFichaPassword');
      const profileEl = document.getElementById(prefix + 'CodeFichaProfile');
      const dateEl = document.getElementById(prefix + 'CodeFichaDate');
      const typeEl = document.getElementById(prefix + 'CodeFichaType');
      const motivoEl = document.getElementById(prefix + 'CodeFichaMotivo');
      const motivoOtroEl = document.getElementById(prefix + 'CodeFichaMotivoOtro');
      if (platformEl) platformEl.value = '';
      if (usuarioEl) usuarioEl.value = '';
      if (urlEl) urlEl.value = '';
      if (emailEl) emailEl.value = '';
      if (passwordEl) passwordEl.value = '';
      if (profileEl) profileEl.value = '';
      if (dateEl) dateEl.value = '';
      if (typeEl) typeEl.selectedIndex = 0;
      if (motivoEl) motivoEl.selectedIndex = 0;
      if (motivoOtroEl) motivoOtroEl.value = '';
      const fieldsBox = document.getElementById(prefix + 'CodeFichaFields');
      if (fieldsBox) fieldsBox.style.display = 'none';
      const outputEl = document.getElementById(prefix + 'CodeFichaOutput');
      const outputWrap = document.getElementById(prefix + 'CodeFichaOutputWrap');
      if (outputEl) outputEl.value = '';
      if (outputWrap) outputWrap.style.display = 'none';
      if (typeof toast === 'function') toast('Texto limpiado');
    };
    window.clearCodeFichaOutput = function (prefix) {
      const out = document.getElementById(prefix + 'CodeFichaOutput');
      const wrap = document.getElementById(prefix + 'CodeFichaOutputWrap');
      if (out) out.value = '';
      if (wrap) wrap.style.display = 'none';
      if (typeof toast === 'function') toast('Ficha limpiada');
    };

    
})();


// ============================================================
// Botón SOLICITAR (#m-wa): animación del avión de papel.
// Usa GSAP (cdnjs, ver index.html). Si GSAP no cargó o el visitante
// pidió "reducir movimiento", ejecuta la acción al instante.
// onFlight() se llama cuando el avión termina de despegar.
// ============================================================
function sendPlane(button, onFlight) {
  let done = false;
  const fly = () => { if (done) return; done = true; try { onFlight && onFlight(); } catch (e) { console.warn("sendPlane", e); } };
  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!button || !window.gsap || reduce) { fly(); return; }
  if (button.classList.contains("active")) return;
  button.classList.add("active");
  setTimeout(fly, 2500); // red de seguridad: la acción nunca se pierde

  const getVar = v => getComputedStyle(button).getPropertyValue(v);

  gsap.to(button, {
    keyframes: [{
      "--left-wing-first-x": 50, "--left-wing-first-y": 100,
      "--right-wing-second-x": 50, "--right-wing-second-y": 100,
      duration: .2,
      onComplete() {
        gsap.set(button, {
          "--left-wing-first-y": 0, "--left-wing-second-x": 40, "--left-wing-second-y": 100,
          "--left-wing-third-x": 0, "--left-wing-third-y": 100, "--left-body-third-x": 40,
          "--right-wing-first-x": 50, "--right-wing-first-y": 0,
          "--right-wing-second-x": 60, "--right-wing-second-y": 100,
          "--right-wing-third-x": 100, "--right-wing-third-y": 100, "--right-body-third-x": 60
        });
      }
    }, {
      "--left-wing-third-x": 20, "--left-wing-third-y": 90, "--left-wing-second-y": 90,
      "--left-body-third-y": 90, "--right-wing-third-x": 80, "--right-wing-third-y": 90,
      "--right-body-third-y": 90, "--right-wing-second-y": 90,
      duration: .2
    }, {
      "--rotate": 50, "--left-wing-third-y": 95, "--left-wing-third-x": 27,
      "--right-body-third-x": 45, "--right-wing-second-x": 45,
      "--right-wing-third-x": 60, "--right-wing-third-y": 83,
      duration: .25
    }, {
      "--rotate": 60, "--plane-x": -8, "--plane-y": 40, duration: .2
    }, {
      "--rotate": 40, "--plane-x": 45, "--plane-y": -300, "--plane-opacity": 0,
      duration: .375,
      onComplete() {
        fly();
        setTimeout(() => {
          button.removeAttribute("style");
          gsap.fromTo(button, { opacity: 0, y: -8 }, {
            opacity: 1, y: 0, clearProps: true, duration: .3,
            onComplete() { button.classList.remove("active"); }
          });
        }, 1800);
      }
    }]
  });

  gsap.to(button, {
    keyframes: [{
      "--text-opacity": 0, "--border-radius": 0,
      "--left-wing-background": getVar("--primary-dark"),
      "--right-wing-background": getVar("--primary-dark"),
      duration: .11
    }, {
      "--left-wing-background": getVar("--primary"),
      "--right-wing-background": getVar("--primary"),
      duration: .14
    }, {
      "--left-body-background": getVar("--primary-dark"),
      "--right-body-background": getVar("--primary-darkest"),
      duration: .25, delay: .1
    }, { "--trails-stroke": 171, duration: .22, delay: .22 },
    { "--success-opacity": 1, "--success-x": 0, duration: .2, delay: .15 },
    { "--success-stroke": 0, duration: .15 }]
  });
}

/* =====================================================================
   ACCESO SEGURO CON SUPABASE
   La contraseña de los perfiles se comprueba en el servidor (bcrypt). Aquí:
   inicio de sesión, cambio obligatorio de contraseña temporal y recuperación por correo.
   ===================================================================== */
let __epApiMod = null;
function epApi() { return __epApiMod || (__epApiMod = import("./api.js?v=20261017a")); }
const epIdent = u => u.username || u.name;
const epClean = p => String(p || "").replace(/\s/g, "");

// Devuelve { ok, must_change?, bloqueado?, segundos?, error? }
async function epAuthCheck(u, pw) {
  if (!u) return { ok: false };
  if (!u.remote) return { ok: hash(pw) === u.pass };            // cuentas creadas solo en este navegador
  try {
    const api = await epApi();
    return (await api.PerfilAuth.login(epIdent(u), epClean(pw))) || { ok: false };
  } catch (e) { return { ok: false, error: "red" }; }
}

// Confirmación con contraseña de administrador (mensajes masivos): se valida a la persona que tiene la sesión abierta
async function epAdminPwOk(admins, pw) {
  if (admins.some(u => !u.remote && hash(pw) === u.pass)) return true;
  const m = me();
  if (m && m.remote && admins.some(u => u.id === m.id)) return !!(await epAuthCheck(m, pw)).ok;
  return false;
}

function epPwRule(p) {
  if (!p || p.length < 6) return "La contraseña nueva necesita mínimo 6 caracteres";
  if (p.length > 12) return "La contraseña nueva puede tener máximo 12 caracteres";
  if (/\s/.test(p)) return "La contraseña no puede llevar espacios";
  return "";
}
function epChangeMsg(r) {
  const e = r && r.error;
  return e === "credenciales" ? "La contraseña actual (o temporal) no es correcta o ya venció"
    : e === "bloqueado" ? "Demasiados intentos · espera unos minutos"
    : e === "corta" ? "La contraseña nueva necesita mínimo 6 caracteres"
    : e === "larga" ? "La contraseña nueva puede tener máximo 12 caracteres"
    : e === "espacios" ? "La contraseña no puede llevar espacios"
    : e === "igual" ? "La contraseña nueva debe ser distinta de la actual"
    : "No se pudo cambiar la contraseña";
}

async function epLoginRemote(i, s, t) {
  const btn = $("#btn-login"); if (btn) btn.disabled = true;
  let r = await epAuthCheck(i, s);
  // sin internet: la clave antigua todavía se puede comprobar en este equipo
  if (!r.ok && r.error === "red" && !i.strong && i.pass && hash(s) === i.pass && !(i.prefs && i.prefs.activo === false)) r = { ok: true };
  if (btn) btn.disabled = false;
  if (!r.ok) {
    t.textContent = r.suspendido ? "⛔ Cuenta suspendida · contacta al administrador"
      : r.bloqueado ? `🔒 Demasiados intentos · espera ${Math.max(1, Math.ceil((r.segundos || 900) / 60))} min`
      : r.error === "red" ? "⚠️ No hay conexión con el servidor · intenta de nuevo"
      : "⚠️ Contraseña incorrecta";
    t.classList.add("show"); shakeField($("#login-field")); $("#login-pass").select(); return;
  }
  const entrar = () => {
    db.auth = { fails: 0, until: 0 }; save(); t.classList.remove("show"); t.textContent = "";
    selLogin = i.id; db.session = i.id; save();
    $("#login-card").classList.add("zoom-out");
    curtainSwap(() => {
      $("#login-pass").value = ""; $("#login-pass").type = "password";
      $("#screen-login").classList.add("hidden"); $("#screen-login").classList.remove("locked");
      $("#login-card").classList.remove("zoom-out"); enterApp();
    });
  };
  r.must_change ? epForceChange(i, s, entrar) : entrar();
}

// Pantalla que aparece ANTES de entrar cuando la contraseña es temporal
function epForceChange(u, actual, done) {
  openModal(`<div class="m-ico">🔐</div><h4>Crea tu contraseña nueva</h4>
    <p>Entraste con una contraseña temporal. Elige una nueva para continuar (de 6 a 12 caracteres, sin espacios).</p>
    <div class="field glass-in" id="fc-f1"><input type="password" id="fc-new" placeholder="Contraseña nueva" autocomplete="new-password" maxlength="12"><button type="button" class="icon-btn mini pw-toggle" data-pw-for="fc-new" title="Mostrar contraseña">👁️</button></div>
    <div class="field glass-in" id="fc-f2"><input type="password" id="fc-new2" placeholder="Repetir contraseña nueva" autocomplete="new-password" maxlength="12"><button type="button" class="icon-btn mini pw-toggle" data-pw-for="fc-new2" title="Mostrar contraseña">👁️</button></div>
    <p class="msg-hint" id="fc-err" style="min-height:1.3em;color:#ff7b7b"></p>
    <div class="m-row"><button class="btn ghost" data-close>Cancelar</button><button class="btn btn-primary" id="fc-ok">Guardar y entrar</button></div>`);
  const err = m => { $("#fc-err").textContent = m; };
  const guardar = async () => {
    const n = $("#fc-new").value, n2 = $("#fc-new2").value;
    const regla = epPwRule(n);
    if (regla) { err(regla); return shakeField($("#fc-f1")); }
    if (n !== n2) { err("Las contraseñas nuevas no coinciden"); return shakeField($("#fc-f2")); }
    if (n === actual) { err("La contraseña nueva debe ser distinta de la temporal"); return shakeField($("#fc-f1")); }
    const b = $("#fc-ok"); b.disabled = true; err("");
    try {
      const api = await epApi();
      const r = await api.PerfilAuth.cambiar(epIdent(u), epClean(actual), n);
      if (r && r.ok) { closeModal(); toast("Contraseña actualizada", "🔑"); done(); return; }
      err(epChangeMsg(r));
    } catch (e) { err("No hay conexión con el servidor · intenta de nuevo"); }
    b.disabled = false;
  };
  $("#fc-ok").onclick = guardar;
  $("#fc-new2").addEventListener("keydown", e => { if (e.key === "Enter") guardar(); });
  $("#fc-new").addEventListener("keydown", e => { if (e.key === "Enter") $("#fc-new2").focus(); });
  $("#fc-new").focus();
}

// Cambiar mi propia contraseña (panel de perfil) para perfiles remotos
async function epChangeOwn(u, actual, nueva, nueva2) {
  if (!actual) return toast("Escribe tu contraseña actual", "🔑");
  const regla = epPwRule(nueva); if (regla) return toast(regla, "🔑");
  if (nueva !== nueva2) return toast("Las contraseñas nuevas no coinciden", "⚠️");
  try {
    const api = await epApi();
    const r = await api.PerfilAuth.cambiar(epIdent(u), epClean(actual), nueva);
    if (!(r && r.ok)) return toast(epChangeMsg(r), "⚠️");
    $("#cp-cur").value = $("#cp-new").value = $("#cp-new2").value = "";
    toast("Contraseña actualizada", "🔑");
  } catch (e) { toast("No hay conexión con el servidor", "⚠️"); }
}

// Recuperar contraseña por correo (solo funciona si el administrador registró tu correo en el CRM)
function epForgotModal() {
  const pre = ($("#login-user") && $("#login-user").value.trim()) || "";
  openModal(`<div class="m-ico">📧</div><h4>Recuperar contraseña</h4>
    <p>Escribe tu usuario o tu correo. Si tienes un correo registrado, te enviaremos una contraseña temporal que vence en 30 minutos.</p>
    <div class="field glass-in" id="fg-field"><input id="fg-ident" placeholder="Usuario o correo" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="120" value="${esc(pre)}"></div>
    <p class="msg-hint" id="fg-msg" style="min-height:1.3em"></p>
    <div class="m-row"><button class="btn ghost" data-close>Cerrar</button><button class="btn btn-primary" id="fg-ok">Enviar</button></div>`);
  const enviar = async () => {
    const v = $("#fg-ident").value.trim();
    if (v.length < 2) return shakeField($("#fg-field"));
    const b = $("#fg-ok"); b.disabled = true; $("#fg-msg").textContent = "Enviando…";
    try {
      const api = await epApi();
      const r = await api.PerfilAuth.recuperar(v);
      $("#fg-msg").textContent = (r && r.mensaje) || "Si el usuario tiene un correo registrado, te enviamos una contraseña temporal. Revisa tu bandeja y la carpeta de spam.";
      setTimeout(() => { const x = $("#fg-ok"); if (x) x.disabled = false; }, 20000);
    } catch (e) { $("#fg-msg").textContent = "No se pudo enviar ahora. Intenta de nuevo en unos minutos."; b.disabled = false; }
  };
  $("#fg-ok").onclick = enviar;
  $("#fg-ident").addEventListener("keydown", e => { if (e.key === "Enter") enviar(); });
  $("#fg-ident").focus();
}
(function () { const b = document.getElementById("btn-forgot"); if (b) b.addEventListener("click", epForgotModal); })();


/* ===================================================================
   Reproductor de video (Invitaciones digitales)
   El CRM guarda la URL en documentos_items.extra.invVideo; aquí se convierte en un reproductor incrustado.
   Admite YouTube (watch, youtu.be, shorts), TikTok (con ID en la URL), Vimeo, Facebook, Instagram,
   Google Drive y archivos de video directos (.mp4, .webm…). Si el enlace no se puede incrustar, ofrece abrirlo.
   =================================================================== */
function epVideoEmbed(raw) {
  let u;
  try { u = new URL(String(raw || "").trim()); } catch (e) { return null; }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const h = u.hostname.replace(/^(www|m|vm|vt)\./, ""), p = u.pathname, q = u.searchParams, href = u.href;
  let m;
  const yt = (id, ratio) => ({ kind: "iframe", src: "https://www.youtube-nocookie.com/embed/" + id + "?rel=0&playsinline=1&autoplay=1", ratio: ratio || "16/9" });
  if (h === "youtu.be") { const id = p.slice(1).split("/")[0]; return id ? yt(id) : { kind: "link", href }; }
  if (/(^|\.)youtube(-nocookie)?\.com$/.test(h)) {
    let id = q.get("v"), ratio = "16/9";
    if (!id && (m = p.match(/^\/(shorts|embed|live|v)\/([\w-]{6,})/))) { id = m[2]; if (m[1] === "shorts") ratio = "9/16"; }
    return id ? yt(id, ratio) : { kind: "link", href };
  }
  if (/(^|\.)tiktok\.com$/.test(h)) {
    m = p.match(/\/video\/(\d+)/) || p.match(/^\/embed(?:\/v2)?\/(\d+)/);
    return m ? { kind: "iframe", src: "https://www.tiktok.com/embed/v2/" + m[1], ratio: "9/16" } : { kind: "link", href };
  }
  if (h === "vimeo.com" && (m = p.match(/\/(\d+)/))) return { kind: "iframe", src: "https://player.vimeo.com/video/" + m[1] + "?autoplay=1", ratio: "16/9" };
  if (h === "player.vimeo.com") return { kind: "iframe", src: href, ratio: "16/9" };
  if (/(^|\.)facebook\.com$/.test(h) || h === "fb.watch") return { kind: "iframe", src: "https://www.facebook.com/plugins/video.php?show_text=false&href=" + encodeURIComponent(href), ratio: "16/9" };
  if (/(^|\.)instagram\.com$/.test(h) && (m = p.match(/\/(reel|reels|p|tv)\/([\w-]+)/))) return { kind: "iframe", src: "https://www.instagram.com/" + (m[1] === "reels" ? "reel" : m[1]) + "/" + m[2] + "/embed/", ratio: "9/16" };
  if (h === "drive.google.com" && (m = p.match(/\/file\/d\/([\w-]+)/))) return { kind: "iframe", src: "https://drive.google.com/file/d/" + m[1] + "/preview", ratio: "16/9" };
  if (/\.(mp4|webm|ogg|mov|m4v)$/i.test(p)) return { kind: "video", src: href, ratio: "16/9" };
  return { kind: "link", href };
}
function epPlayVideo(url, title, back) {
  const v = epVideoEmbed(url);
  if (!v) { toast("El enlace del video no es válido", "⚠️"); return; }
  const frame = v.kind === "iframe"
    ? '<iframe src="' + esc(v.src) + '" title="' + esc(title || "Video") + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>'
    : v.kind === "video"
      ? '<video src="' + esc(v.src) + '" controls playsinline autoplay></video>'
      : "";
  const body = v.kind === "link"
    ? '<p class="fine" style="text-align:center;margin:10px 0 14px">Este enlace no se puede mostrar aquí. Ábrelo en una pestaña nueva.</p><div class="m-row"><a class="btn btn-primary" href="' + esc(v.href) + '" target="_blank" rel="noopener noreferrer">▶ Abrir video</a></div>'
    : '<div class="vp-frame ' + (v.ratio === "9/16" ? "v916" : "v169") + '">' + frame + "</div>";
  openModal('<h4 class="vp-title">' + esc(title || "Video") + "</h4>" + body +
    '<div class="m-row" style="margin-top:12px">' + (typeof back === "function" ? '<button type="button" class="btn ghost" id="vp-back">← Volver</button>' : "") + '<button class="btn ghost" data-close>Cerrar</button></div>', { extraClass: "vp-modal" });
  const b = document.getElementById("vp-back");
  if (b) b.onclick = () => { closeModal(); back(); };
}

/* ===================================================================
   Zona Digital (Streaming) — catálogo con imagen grande en lugar de ícono
   Usa db.biblioteca si existe (lista de {id, grupo, title, sub, img, price, price2, price3, disponible});
   mientras tanto muestra dos ejemplos.
   =================================================================== */
function __bibCover(label, c1, c2, glyph) {
  // Portada tipo banner (800×320): ícono a la izquierda y el nombre a la derecha
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs><rect width="800" height="320" fill="url(#g)"/><circle cx="700" cy="40" r="150" fill="#fff" fill-opacity=".07"/><circle cx="90" cy="320" r="120" fill="#fff" fill-opacity=".06"/><g transform="translate(70 60)">' + glyph + '</g>' +
    '<text x="330" y="178" font-family="Georgia,serif" font-weight="700" font-size="52" fill="#fff" fill-opacity=".96">' + label + "</text></svg>";
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}
const __BIB_IMG_BOOKS = __bibCover("eBooks y Guías", "#1fa2ff", "#7a4dff", '<g fill="#fff"><rect x="0" y="130" width="200" height="30" rx="7" fill-opacity=".95"/><rect x="14" y="92" width="172" height="30" rx="7" fill-opacity=".75"/><rect x="28" y="54" width="144" height="30" rx="7" fill-opacity=".55"/><rect x="42" y="16" width="116" height="30" rx="7" fill-opacity=".38"/></g>');
const __BIB_IMG_VIDEO = __bibCover("Cursos en Video", "#ff6a88", "#ff9a3c", '<rect x="0" y="20" width="200" height="150" rx="24" fill="#fff" fill-opacity=".95"/><path d="M80 62v66l56-33z" fill="#ff5c7a"/>');
const BIB_DEFAULT = [
  { id: "bib-ex-1", grupo: "eBooks y Guías", title: "Pack 50 eBooks", sub: "PDF · Descarga inmediata", price: 80, price2: 70, price3: 60, img: __BIB_IMG_BOOKS, disponible: true },
  { id: "bib-ex-2", grupo: "eBooks y Guías", title: "Pack 100 eBooks", sub: "PDF · EPUB · Descarga inmediata", price: 140, price2: 120, price3: 100, img: __BIB_IMG_BOOKS, disponible: true },
  { id: "bib-ex-3", grupo: "Cursos en Video", title: "Curso individual", sub: "HD · Acceso 1 año", price: 60, price2: 50, price3: 45, img: __BIB_IMG_VIDEO, disponible: true },
  { id: "bib-ex-4", grupo: "Cursos en Video", title: "Pack 10 cursos", sub: "HD · Acceso 1 año · Certificado", price: 250, price2: 220, price3: 200, img: __BIB_IMG_VIDEO, disponible: true }
];
function __bibItems() { return (Array.isArray(db.biblioteca) && db.biblioteca.length) ? db.biblioteca : BIB_DEFAULT; }
/* Zona Digital: al entrar hay 3 apartados (Películas por USB · Games PC · Todo Digital), como en Personalizados */
const __ZCAT = { peliculas: { title: "Películas por USB", ph: "🎬", search: "Buscar película o año…", sing: "película", plur: "películas" }, games: { title: "Games PC", ph: "🎮", search: "Buscar juego o año…", sing: "juego", plur: "juegos" } };
const __bibLimit = {};
/* Precios por rol de Películas y Games: el del artículo (si lo tiene) → el de config.personalizados.zonaPrecios (CRM) → el de fábrica.
   Invitado = price · Revendedores (estándar) = price2 · SubAdmin = price3 (lo resuelve priceForRole). */
const __ZONA_PRECIOS_DEF = { peliculas: [12, 8, 6], games: [100, 70, 50] };
function __zonaPrice(key, it) {
  const cfg = (db.personalizados && db.personalizados.zonaPrecios && db.personalizados.zonaPrecios[key]) || [], d = __ZONA_PRECIOS_DEF[key] || [];
  const pick = (own, i) => (own != null && own !== "" ? own : (cfg[i] != null && cfg[i] !== "" ? cfg[i] : d[i]));
  return priceForRole({ price: pick(it.price, 0), price2: pick(it.price2, 1), price3: pick(it.price3, 2) });
}
const __ZONA_NOTA_DEF = "📍 Únicamente presencial: se entrega vía USB";
function __zonaNota(key) {
  const n = db.personalizados && db.personalizados.zonaNota && db.personalizados.zonaNota[key];
  return (typeof n === "string" && n.trim()) ? n.trim() : __ZONA_NOTA_DEF;
}
function __zonaPopup(key, it) {
  const p = __zonaPrice(key, it), ph = key === "games" ? "🎮" : "🎬";
  const pic = it.img ? '<img class="cover-img" src="' + esc(it.img) + '" alt="" referrerpolicy="no-referrer" onerror="this.outerHTML=\'' + ph + '\'">' : ph;
  const head = '<div class="m-ico m-ico-cover' + (key === "games" ? " is-game" : "") + '">' + pic + '</div><h4>' + esc(it.title) + '</h4>' +
    (it.sub ? '<div class="m-sub-chips"><span class="m-sub-chip">' + esc(it.sub) + '</span></div>' : "");
  const price = '<div class="m-prices"><span class="m-price display">💲' + p + '</span></div>';
  const nota = '<div class="m-note">' + esc(__zonaNota(key)) + '</div>', ok = '<div class="m-row"><button class="btn btn-primary" data-close>Entendido</button></div>';
  if (key === "peliculas") { openModal(head + nota + price + ok); return; }
  const chips = [it.gSystem && "🖥️ " + it.gSystem, it.gFormat && "📦 " + it.gFormat, it.gSize && "💾 " + it.gSize + " GB", it.grupo && "🎭 " + it.grupo].filter(Boolean).map(x => '<span class="m-sub-chip">' + esc(x) + '</span>').join("");
  const req = (t, v) => v ? '<div class="m-note" style="text-align:left;white-space:pre-line"><b>' + t + '</b><br>' + esc(v) + '</div>' : "";
  openModal(head + (chips ? '<div class="m-sub-chips">' + chips + '</div>' : "") + req("⚙️ Requisitos mínimos", it.gReq) + req("🚀 Recomendados", it.gRec) + nota + price + ok);
}
function __bibList(k) { return k === "peliculas" ? (db.bibPel || []) : (db.bibGames || []); }
function __renderBibPosters(q, tab) {
  const grid = document.getElementById("zcat-grid"); if (!grid) return;
  const t = norm((q || "").trim());
  let list = __bibList(tab).filter(i => i.disponible !== false);
  if (t) list = list.filter(i => norm(i.title).includes(t) || norm(i.sub || "").includes(t) || norm(i.grupo || "").includes(t));
  if (!list.length) { grid.innerHTML = '<p class="fine">' + (t ? "Sin coincidencias para «" + esc(q) + "»." : "Muy pronto habrá contenido aquí.") + "</p>"; return; }
  const limit = __bibLimit[tab] || 60, shown = list.slice(0, limit), ph = __ZCAT[tab].ph;
  const groups = [], map = new Map();
  shown.forEach(i => { const g = i.grupo || (tab === "games" ? "Games" : "Películas"); if (!map.has(g)) { map.set(g, []); groups.push(g); } map.get(g).push(i); });
  grid.innerHTML = groups.map(g => `<section class="bib-sec"><h3 class="bib-sec-title">${esc(g)}</h3><div class="bib-posters${tab === "games" ? " is-game" : ""}">` + map.get(g).map(i => {
    const pic = i.img
      ? `<img class="bp-img" src="${esc(i.img)}" alt="${esc(i.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;bp-img bp-ph&quot;>${ph}</span>'">`
      : `<span class="bp-img bp-ph">${ph}</span>`;
    const pz = __zonaPrice(tab, i);
    return `<figure class="bib-poster" data-zid="${esc(i.id)}" role="button" tabindex="0">${pic}<figcaption class="bp-cap"><b class="bp-title">${esc(i.title)}</b>${i.sub ? `<span class="bp-year">${esc(i.sub)}</span>` : ""}${pz != null && pz !== "" ? `<span class="bp-price">💲${pz}</span>` : ""}</figcaption></figure>`;
  }).join("") + "</div></section>").join("")
    + (list.length > limit ? `<button type="button" class="btn ghost bib-more" id="bib-more">Mostrar más (${list.length - limit})</button>` : "");
  const more = document.getElementById("bib-more");
  if (more) more.onclick = () => { __bibLimit[tab] = limit + 60; __renderBibPosters(q, tab); };
  grid.querySelectorAll(".bib-poster[data-zid]").forEach(el => {
    const go = () => { const it = list.find(x => String(x.id) === el.dataset.zid); if (it) __zonaPopup(tab, it); };
    el.onclick = go; el.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } };
  });
}
function __zonaSyncHub() {
  [["zona-peliculas", "peliculas", "Carátulas, nombre y año"], ["zona-games", "games", "Carátulas, nombre y año"]].forEach(([id, key, base]) => {
    const el = document.getElementById(id), sm = el && el.querySelector("small"); if (!sm) return;
    const n = __bibList(key).filter(i => i.disponible !== false).length;
    sm.textContent = n ? n + " " + (n === 1 ? __ZCAT[key].sing : __ZCAT[key].plur) : base;
  });
}
function abrirZonaCat(key) {
  if (key === "todo") { window.__codigoFromHome = "zona"; setView("streaming"); setStreamTab("biblioteca"); return; }
  const c = __ZCAT[key]; if (!c) return;
  window.__zcatKey = key; __bibLimit[key] = 60;
  const t = document.getElementById("zcat-title"); if (t) t.textContent = c.title;
  const i = document.getElementById("zcat-search"); if (i) { i.value = ""; i.placeholder = c.search; }
  __renderBibPosters("", key);
  setView("zona");
  document.getElementById("view-zona").classList.add("hidden");
  document.getElementById("view-zona-cat").classList.remove("hidden");
}
if (!window.__zonaSetViewWrapped) {
  window.__zonaSetViewWrapped = true;
  const __origSV2 = setView;
  setView = function (e) {
    const cat = document.getElementById("view-zona-cat"), hub = document.getElementById("view-zona");
    if (cat) cat.classList.add("hidden");
    if (hub) hub.classList.toggle("hidden", e !== "zona");
    if (e === "zona") { try { __zonaSyncHub(); } catch (x) {} }
    try { __zonaBannerSync(); } catch (x) {}
    return __origSV2.apply(this, arguments);
  };
}
(function () {
  [["zona-peliculas", "peliculas"], ["zona-games", "games"], ["zona-todo", "todo"]].forEach(([id, key]) => {
    const el = document.getElementById(id); if (!el) return;
    const go = () => abrirZonaCat(key);
    el.addEventListener("click", go);
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  const back = document.getElementById("zcat-back"); if (back) back.onclick = () => setView("zona");
  const inp = document.getElementById("zcat-search"); if (inp) inp.addEventListener("input", e => __renderBibPosters(e.target.value, window.__zcatKey || "peliculas"));
})();
function renderBiblioteca(q) { return __renderBibTodo(q); }
function __renderBibTodo(q) {
  const grid = document.getElementById("bib-grid");
  if (!grid) return;
  const t = norm((q || "").trim()), src = __bibItems();
  let list = src.filter(i => i.disponible !== false);
  if (t) list = list.filter(i => norm(i.title).includes(t) || norm(i.sub || "").includes(t) || norm(i.grupo || "").includes(t));
  if (!list.length) { grid.innerHTML = '<p class="fine">' + (t ? "Sin coincidencias para «" + esc(q) + "»." : "Muy pronto habrá contenido aquí.") + "</p>"; return; }
  grid.innerHTML = list.map(e => {
    const img = e.img || "";
    const pic = img
      ? `<img class="bib-img" src="${esc(img)}" alt="${esc(e.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;bib-img bib-img-ph&quot;>📚</span>'">`
      : '<span class="bib-img bib-img-ph">📚</span>';
    const p = priceForRole(e);
    const chips = (e.sub || "").split("·").map(x => x.trim()).filter(Boolean).map(x => `<span class="inf-sub-chip">${esc(x)}</span>`).join("");
    return `<div class="inf-card bib-card"><div class="inf-card-top bib-top">${pic}</div><h3 class="inf-card-title">${esc(e.title)}</h3><fieldset class="inf-price-fieldset"><legend class="inf-price-legend"><span class="inf-price-legend-ico">🗂️</span>${esc(e.grupo || "Lista de precios")}</legend><div class="inf-list"><div class="inf-row" data-bid="${esc(e.id)}"><div class="inf-row-body">${chips ? `<span class="inf-row-sub">${chips}</span>` : `<span class="inf-row-title">${esc(e.title)}</span>`}</div><span class="inf-price-btn">${p != null && p !== "" ? "💲" + p : "Cotizar"}</span></div></div></fieldset></div>`;
  }).join("");
  grid.querySelectorAll(".inf-row").forEach(el => el.onclick = () => { const it = src.find(x => x.id === el.dataset.bid); if (it) bibDetailModal(it); });
}
function bibDetailModal(e) {
  serviceModal({ icon: "📚", title: e.title, sub: [e.grupo && e.grupo !== e.title ? e.grupo : "", e.sub || ""].filter(Boolean).join(" · ") || "Zona Digital", price: e.price, price2: e.price2, price3: e.price3, code: e.code || "", req: e.req, entrega: e.entrega, note: e.note, fallback: db.waMsgs.zona || db.waMsgs.servicio, msg0: e.msg0, msg1: e.msg1, msg2: e.msg2 });
}
(function () { const i = document.getElementById("bib-search"); if (i) i.addEventListener("input", e => renderBiblioteca(e.target.value)); })();

/* Botón "Código" dentro del catálogo de Streaming (solo cuentas con acceso; ya no hay menú intermedio) */
(function () { const b = document.getElementById("btn-go-codigo"); if (b) b.addEventListener("click", () => { window.__codigoFromHome = false; setStreamTab("codigo"); }); })();
