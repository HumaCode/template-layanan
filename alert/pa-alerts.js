/*!
 * PA Alerts v1.0 — SIPEKA | Dinas Kominfo Kota Pekalongan
 * Custom Alert / Toast / Dialog / Confirm / Prompt / Loading Library
 * Usage: PA.toast(), PA.dialog(), PA.confirm(), PA.prompt(), PA.loading()
 */
(function (root, factory) {
  root.PA = factory();
})(window, function () {
  'use strict';

  /* ─────────────────────────────────────────────
     INJECT GLOBAL STYLES (only once)
  ───────────────────────────────────────────── */
  (function injectStyles() {
    if (document.getElementById('pa-styles')) return;
    var css = `
/* ══════════════ PA ALERTS CORE ══════════════ */
:root{
  --pa-blue-900:#0d2d5e;--pa-blue-800:#1a4480;--pa-blue-700:#1d55a0;
  --pa-blue-600:#2b6cb0;--pa-blue-500:#3182ce;--pa-blue-400:#63b3ed;
  --pa-blue-100:#ebf4ff;--pa-blue-50:#f0f7ff;
  --pa-green:#16a34a;--pa-green-bg:#f0fdf4;--pa-green-border:#86efac;
  --pa-rose:#e53e3e;--pa-rose-bg:#fff5f5;--pa-rose-border:#fca5a5;
  --pa-gold:#e8a020;--pa-gold-bg:#fffbeb;--pa-gold-border:#fde68a;
  --pa-teal:#0d9488;--pa-teal-bg:#f0fdfa;--pa-teal-border:#99f6e4;
  --pa-purple:#7c3aed;--pa-purple-bg:#f5f3ff;--pa-purple-border:#c4b5fd;
  --pa-gray-900:#111827;--pa-gray-800:#1f2937;--pa-gray-700:#374151;
  --pa-gray-600:#4b5563;--pa-gray-500:#6b7280;--pa-gray-400:#9ca3af;
  --pa-gray-300:#d1d5db;--pa-gray-200:#e5e7eb;--pa-gray-100:#f3f4f6;
  --pa-gray-50:#f9fafb;
  --pa-shadow-md:0 4px 16px rgba(13,45,94,.12),0 2px 6px rgba(13,45,94,.06);
  --pa-shadow-lg:0 12px 40px rgba(13,45,94,.16),0 4px 12px rgba(13,45,94,.08);
  --pa-shadow-xl:0 24px 60px rgba(13,45,94,.22),0 8px 24px rgba(13,45,94,.1);
  --pa-r-sm:8px;--pa-r-md:14px;--pa-r-lg:20px;--pa-r-xl:26px;
}
*[class^="pa-"]{box-sizing:border-box;}

/* ── OVERLAY ── */
.pa-overlay{
  position:fixed;inset:0;z-index:9000;
  display:flex;align-items:center;justify-content:center;
  padding:16px;
  background:rgba(9,20,40,.45);
  backdrop-filter:blur(8px) saturate(140%);
  -webkit-backdrop-filter:blur(8px) saturate(140%);
  opacity:0;transition:opacity .28s ease;
}
.pa-overlay.pa-in{opacity:1;}
.pa-overlay.pa-out{opacity:0;pointer-events:none;}

/* ── DIALOG BOX ── */
.pa-box{
  background:#fff;border-radius:var(--pa-r-xl);
  box-shadow:var(--pa-shadow-xl);
  width:100%;max-width:440px;
  padding:0;overflow:hidden;
  transform:scale(.88) translateY(24px);
  opacity:0;
  transition:transform .38s cubic-bezier(.34,1.28,.64,1),opacity .28s ease;
  position:relative;
}
.pa-overlay.pa-in .pa-box{transform:scale(1) translateY(0);opacity:1;}
.pa-overlay.pa-out .pa-box{transform:scale(.9) translateY(16px);opacity:0;}

/* box top glow strip */
.pa-box::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  border-radius:var(--pa-r-xl) var(--pa-r-xl) 0 0;
  background:var(--pa-strip,linear-gradient(90deg,var(--pa-blue-600),var(--pa-blue-400)));
}

/* ── ICON AREA ── */
.pa-icon-wrap{
  display:flex;align-items:center;justify-content:center;
  padding:36px 36px 20px;
}
.pa-icon-ring{
  position:relative;
  width:82px;height:82px;
  display:flex;align-items:center;justify-content:center;
}
.pa-icon-ring svg.pa-ring{
  position:absolute;inset:0;width:100%;height:100%;
  animation:pa-spin 4s linear infinite;
}
.pa-icon-ring svg.pa-ring.rev{animation-direction:reverse;animation-duration:6s;}
.pa-icon-bg{
  width:64px;height:64px;border-radius:20px;
  display:flex;align-items:center;justify-content:center;
  font-size:28px;position:relative;z-index:1;
  animation:pa-icon-float 3s ease-in-out infinite;
}
@keyframes pa-spin{to{transform:rotate(360deg);}}
@keyframes pa-icon-float{
  0%,100%{transform:translateY(0) scale(1);}
  50%{transform:translateY(-5px) scale(1.06);}
}

/* ── CONTENT ── */
.pa-content{padding:0 32px 28px;text-align:center;}
.pa-title{
  font-family:'Instrument Serif',serif;
  font-size:21px;line-height:1.25;color:var(--pa-blue-900);
  margin-bottom:10px;
}
.pa-msg{
  font-size:14px;line-height:1.7;color:var(--pa-gray-600);
  margin-bottom:0;
}
.pa-msg strong{color:var(--pa-gray-800);}

/* ── INPUT (for prompt) ── */
.pa-input-wrap{margin-top:18px;text-align:left;}
.pa-input-label{font-size:12px;font-weight:700;color:var(--pa-gray-500);letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;display:block;}
.pa-input{
  width:100%;padding:10px 14px;
  border:2px solid var(--pa-gray-200);border-radius:var(--pa-r-sm);
  font-size:14px;font-family:'DM Sans',sans-serif;color:var(--pa-gray-800);
  outline:none;background:var(--pa-gray-50);
  transition:border-color .2s,box-shadow .2s;
}
.pa-input:focus{border-color:var(--pa-blue-400);background:#fff;box-shadow:0 0 0 3px rgba(99,179,237,.15);}
.pa-input.pa-err{border-color:var(--pa-rose);background:var(--pa-rose-bg);}
.pa-input-hint{font-size:11.5px;color:var(--pa-rose);margin-top:5px;display:none;}
.pa-input-hint.show{display:block;}

/* ── ACTIONS ── */
.pa-actions{
  display:flex;gap:10px;justify-content:center;
  padding:0 32px 28px;flex-wrap:wrap;
}
.pa-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:10px 22px;border-radius:var(--pa-r-sm);
  font-size:13.5px;font-weight:700;font-family:'DM Sans',sans-serif;
  cursor:pointer;border:none;transition:all .22s cubic-bezier(.4,0,.2,1);
  position:relative;overflow:hidden;min-width:100px;
  letter-spacing:.01em;
}
.pa-btn::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.2) 50%,transparent 65%);
  transform:translateX(-100%);
  transition:transform .5s ease;
}
.pa-btn:hover::after{transform:translateX(100%);}
.pa-btn:active{transform:scale(.96);}

.pa-btn-primary{
  background:linear-gradient(135deg,var(--pa-blue-600),var(--pa-blue-900));
  color:#fff;box-shadow:0 3px 12px rgba(43,108,176,.28);
}
.pa-btn-primary:hover{box-shadow:0 6px 20px rgba(43,108,176,.38);transform:translateY(-2px);}

.pa-btn-success{
  background:linear-gradient(135deg,#22c55e,var(--pa-green));
  color:#fff;box-shadow:0 3px 12px rgba(22,163,74,.28);
}
.pa-btn-success:hover{box-shadow:0 6px 20px rgba(22,163,74,.38);transform:translateY(-2px);}

.pa-btn-danger{
  background:linear-gradient(135deg,#f87171,var(--pa-rose));
  color:#fff;box-shadow:0 3px 12px rgba(229,62,62,.28);
}
.pa-btn-danger:hover{box-shadow:0 6px 20px rgba(229,62,62,.38);transform:translateY(-2px);}

.pa-btn-warning{
  background:linear-gradient(135deg,#fbbf24,var(--pa-gold));
  color:#fff;box-shadow:0 3px 12px rgba(232,160,32,.28);
}
.pa-btn-warning:hover{box-shadow:0 6px 20px rgba(232,160,32,.38);transform:translateY(-2px);}

.pa-btn-ghost{
  background:#fff;border:2px solid var(--pa-gray-200);color:var(--pa-gray-600);
}
.pa-btn-ghost:hover{background:var(--pa-blue-50);border-color:var(--pa-blue-400);color:var(--pa-blue-700);}

.pa-btn-full{width:100%;}

/* ── CHECKBOX in confirm ── */
.pa-check-wrap{
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;border-radius:var(--pa-r-sm);
  background:var(--pa-gray-50);border:1.5px solid var(--pa-gray-200);
  margin-top:16px;cursor:pointer;user-select:none;
  transition:border-color .2s,background .2s;text-align:left;
}
.pa-check-wrap:hover{background:var(--pa-blue-50);border-color:var(--pa-blue-200);}
.pa-check-wrap input{width:16px;height:16px;accent-color:var(--pa-blue-600);cursor:pointer;flex-shrink:0;}
.pa-check-wrap span{font-size:12.5px;color:var(--pa-gray-600);font-weight:500;line-height:1.4;}

/* ── DIVIDER ── */
.pa-divider{height:1px;background:var(--pa-gray-100);margin:0 0 0;}

/* ══════════════ TOAST ══════════════ */
.pa-toast-container{
  position:fixed;z-index:9999;
  display:flex;flex-direction:column;gap:10px;
  pointer-events:none;
}
.pa-toast-container.top-right{top:20px;right:20px;align-items:flex-end;}
.pa-toast-container.top-left{top:20px;left:20px;align-items:flex-start;}
.pa-toast-container.top-center{top:20px;left:50%;transform:translateX(-50%);align-items:center;}
.pa-toast-container.bottom-right{bottom:20px;right:20px;align-items:flex-end;}
.pa-toast-container.bottom-left{bottom:20px;left:20px;align-items:flex-start;}
.pa-toast-container.bottom-center{bottom:20px;left:50%;transform:translateX(-50%);align-items:center;}

.pa-toast{
  display:flex;align-items:flex-start;gap:12px;
  padding:13px 16px;border-radius:var(--pa-r-md);
  background:#fff;border:1.5px solid var(--pa-gray-200);
  box-shadow:var(--pa-shadow-lg);
  max-width:360px;min-width:240px;
  pointer-events:auto;
  opacity:0;transform:translateX(40px) scale(.94);
  transition:opacity .32s cubic-bezier(.34,1.2,.64,1),transform .32s cubic-bezier(.34,1.2,.64,1);
  position:relative;overflow:hidden;
  cursor:pointer;
}
.pa-toast-container.top-left .pa-toast,
.pa-toast-container.bottom-left .pa-toast{transform:translateX(-40px) scale(.94);}
.pa-toast-container.top-center .pa-toast,
.pa-toast-container.bottom-center .pa-toast{transform:translateY(-20px) scale(.94);}
.pa-toast.show{opacity:1;transform:none;}
.pa-toast.hide{opacity:0;transform:translateX(50px) scale(.88);}

/* progress bar */
.pa-toast-progress{
  position:absolute;bottom:0;left:0;height:3px;
  border-radius:0 0 0 var(--pa-r-md);
  transition:width linear;
}

/* left accent bar */
.pa-toast::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:4px;
  background:var(--pa-toast-color,var(--pa-blue-500));
  border-radius:var(--pa-r-md) 0 0 var(--pa-r-md);
}

.pa-toast-icon{
  width:36px;height:36px;border-radius:10px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:17px;
  background:var(--pa-toast-bg,var(--pa-blue-100));
  color:var(--pa-toast-color,var(--pa-blue-600));
  animation:pa-icon-float 2.5s ease-in-out infinite;
  margin-left:4px;
}
.pa-toast-body{flex:1;}
.pa-toast-title{font-size:13.5px;font-weight:700;color:var(--pa-gray-800);line-height:1.3;}
.pa-toast-msg{font-size:12.5px;color:var(--pa-gray-500);margin-top:3px;line-height:1.5;}
.pa-toast-close{
  width:22px;height:22px;border-radius:6px;border:none;background:none;
  color:var(--pa-gray-400);cursor:pointer;display:flex;align-items:center;
  justify-content:center;font-size:14px;flex-shrink:0;transition:background .2s,color .2s;
  padding:0;margin-top:1px;
}
.pa-toast-close:hover{background:var(--pa-gray-100);color:var(--pa-gray-700);}

/* ══════════════ LOADING OVERLAY ══════════════ */
.pa-loading-overlay{
  position:fixed;inset:0;z-index:9100;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;
  background:rgba(9,20,40,.5);
  backdrop-filter:blur(10px) saturate(140%);
  opacity:0;transition:opacity .3s ease;
}
.pa-loading-overlay.pa-in{opacity:1;}
.pa-loading-overlay.pa-out{opacity:0;pointer-events:none;}

.pa-loading-card{
  background:#fff;border-radius:var(--pa-r-xl);
  padding:40px 44px 36px;text-align:center;
  box-shadow:var(--pa-shadow-xl);min-width:260px;
  transform:scale(.9);opacity:0;
  transition:transform .35s cubic-bezier(.34,1.25,.64,1),opacity .3s;
}
.pa-loading-overlay.pa-in .pa-loading-card{transform:scale(1);opacity:1;}

.pa-spinner{
  width:64px;height:64px;margin:0 auto 22px;position:relative;
}
.pa-spinner-ring{
  position:absolute;inset:0;border-radius:50%;border:3.5px solid transparent;
  animation:pa-spin 1.1s cubic-bezier(.6,.2,.4,.8) infinite;
}
.pa-spinner-ring:nth-child(1){border-top-color:var(--pa-blue-600);animation-duration:1.1s;}
.pa-spinner-ring:nth-child(2){border-right-color:var(--pa-blue-400);inset:8px;animation-duration:1.5s;animation-direction:reverse;}
.pa-spinner-ring:nth-child(3){border-bottom-color:#e0edfa;inset:16px;animation-duration:2s;}
.pa-spinner-dot{
  position:absolute;inset:22px;border-radius:50%;
  background:linear-gradient(135deg,var(--pa-blue-600),var(--pa-blue-400));
  animation:pa-icon-float 1.8s ease-in-out infinite;
}
.pa-loading-title{font-family:'Instrument Serif',serif;font-size:18px;color:var(--pa-blue-900);margin-bottom:6px;}
.pa-loading-msg{font-size:13px;color:var(--pa-gray-500);}
.pa-loading-dots span{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--pa-blue-400);margin:0 2px;animation:pa-dot-bounce .9s ease-in-out infinite;}
.pa-loading-dots span:nth-child(2){animation-delay:.15s;}
.pa-loading-dots span:nth-child(3){animation-delay:.3s;}
@keyframes pa-dot-bounce{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-6px);opacity:1}}

/* ══════════════ INLINE ALERT ══════════════ */
.pa-alert{
  display:flex;align-items:flex-start;gap:14px;
  padding:14px 18px;border-radius:var(--pa-r-md);
  border:1.5px solid;position:relative;overflow:hidden;
  animation:pa-slide-down .35s cubic-bezier(.34,1.2,.64,1) both;
}
@keyframes pa-slide-down{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:none}}
.pa-alert::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--pa-alert-clr);}
.pa-alert-icon{font-size:20px;flex-shrink:0;animation:pa-icon-float 3s ease-in-out infinite;margin-left:4px;}
.pa-alert-body{flex:1;}
.pa-alert-title{font-size:13.5px;font-weight:700;margin-bottom:3px;}
.pa-alert-msg{font-size:13px;line-height:1.6;}
.pa-alert-close{background:none;border:none;cursor:pointer;font-size:16px;opacity:.5;transition:opacity .2s;padding:0;margin-left:auto;flex-shrink:0;}
.pa-alert-close:hover{opacity:1;}

/* TYPES */
.pa-alert.success{background:var(--pa-green-bg);border-color:var(--pa-green-border);--pa-alert-clr:var(--pa-green);}
.pa-alert.success .pa-alert-title{color:#15803d;}
.pa-alert.success .pa-alert-msg{color:#166534;}
.pa-alert.success .pa-alert-close{color:var(--pa-green);}

.pa-alert.error{background:var(--pa-rose-bg);border-color:var(--pa-rose-border);--pa-alert-clr:var(--pa-rose);}
.pa-alert.error .pa-alert-title{color:#991b1b;}
.pa-alert.error .pa-alert-msg{color:#b91c1c;}
.pa-alert.error .pa-alert-close{color:var(--pa-rose);}

.pa-alert.warning{background:var(--pa-gold-bg);border-color:var(--pa-gold-border);--pa-alert-clr:var(--pa-gold);}
.pa-alert.warning .pa-alert-title{color:#92400e;}
.pa-alert.warning .pa-alert-msg{color:#b45309;}
.pa-alert.warning .pa-alert-close{color:var(--pa-gold);}

.pa-alert.info{background:var(--pa-blue-100);border-color:#bfdbfe;--pa-alert-clr:var(--pa-blue-500);}
.pa-alert.info .pa-alert-title{color:var(--pa-blue-900);}
.pa-alert.info .pa-alert-msg{color:var(--pa-blue-700);}
.pa-alert.info .pa-alert-close{color:var(--pa-blue-600);}

.pa-alert.teal{background:var(--pa-teal-bg);border-color:var(--pa-teal-border);--pa-alert-clr:var(--pa-teal);}
.pa-alert.teal .pa-alert-title{color:#0f766e;}
.pa-alert.teal .pa-alert-msg{color:#115e59;}
.pa-alert.teal .pa-alert-close{color:var(--pa-teal);}

/* ══════════════ ICON PRESETS ══════════════ */
.pa-ic-success{background:#dcfce7;color:var(--pa-green);}
.pa-ic-error  {background:#fee2e2;color:var(--pa-rose);}
.pa-ic-warning{background:#fef3c7;color:var(--pa-gold);}
.pa-ic-info   {background:var(--pa-blue-100);color:var(--pa-blue-600);}
.pa-ic-teal   {background:#ccfbf1;color:var(--pa-teal);}
.pa-ic-purple {background:#f5f3ff;color:var(--pa-purple);}
.pa-ic-gray   {background:var(--pa-gray-100);color:var(--pa-gray-600);}

/* strip colors */
.pa-strip-success{--pa-strip:linear-gradient(90deg,#22c55e,#86efac);}
.pa-strip-error  {--pa-strip:linear-gradient(90deg,var(--pa-rose),#f87171);}
.pa-strip-warning{--pa-strip:linear-gradient(90deg,var(--pa-gold),#fbbf24);}
.pa-strip-info   {--pa-strip:linear-gradient(90deg,var(--pa-blue-600),var(--pa-blue-400));}
.pa-strip-teal   {--pa-strip:linear-gradient(90deg,var(--pa-teal),#2dd4bf);}
.pa-strip-purple {--pa-strip:linear-gradient(90deg,var(--pa-purple),#a78bfa);}

/* Toast type colors */
.pa-toast.t-success{--pa-toast-color:var(--pa-green);--pa-toast-bg:#dcfce7;border-color:var(--pa-green-border);}
.pa-toast.t-error  {--pa-toast-color:var(--pa-rose);--pa-toast-bg:#fee2e2;border-color:var(--pa-rose-border);}
.pa-toast.t-warning{--pa-toast-color:var(--pa-gold);--pa-toast-bg:#fef3c7;border-color:var(--pa-gold-border);}
.pa-toast.t-info   {--pa-toast-color:var(--pa-blue-500);--pa-toast-bg:var(--pa-blue-100);border-color:#bfdbfe;}
.pa-toast.t-teal   {--pa-toast-color:var(--pa-teal);--pa-toast-bg:#ccfbf1;border-color:var(--pa-teal-border);}
.pa-toast.t-purple {--pa-toast-color:var(--pa-purple);--pa-toast-bg:#f5f3ff;border-color:var(--pa-purple-border);}

/* Ensure font if loaded */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700&family=Instrument+Serif&display=swap');
`;
    var style = document.createElement('style');
    style.id = 'pa-styles';
    style.textContent = css;
    document.head.appendChild(style);
  })();

  /* ─────────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────────── */
  var ICONS = {
    success: '<i class="bi bi-check-circle-fill"></i>',
    error:   '<i class="bi bi-x-circle-fill"></i>',
    warning: '<i class="bi bi-exclamation-triangle-fill"></i>',
    warn:    '<i class="bi bi-exclamation-triangle-fill"></i>',
    info:    '<i class="bi bi-info-circle-fill"></i>',
    teal:    '<i class="bi bi-lightning-charge-fill"></i>',
    purple:  '<i class="bi bi-stars"></i>',
    delete:  '<i class="bi bi-trash3-fill"></i>',
    save:    '<i class="bi bi-floppy2-fill"></i>',
    logout:  '<i class="bi bi-box-arrow-right"></i>',
    lock:    '<i class="bi bi-lock-fill"></i>',
    key:     '<i class="bi bi-key-fill"></i>',
    user:    '<i class="bi bi-person-fill"></i>',
    send:    '<i class="bi bi-send-fill"></i>',
    upload:  '<i class="bi bi-cloud-upload-fill"></i>',
    download:'<i class="bi bi-download"></i>',
    bell:    '<i class="bi bi-bell-fill"></i>',
    question:'<i class="bi bi-question-circle-fill"></i>',
    shield:  '<i class="bi bi-shield-fill-check"></i>',
    refresh: '<i class="bi bi-arrow-repeat"></i>',
  };

  var RING_COLORS = {
    success: ['#22c55e44','#86efac88','#22c55e22'],
    error:   ['#f8717144','#fca5a588','#ef444422'],
    warning: ['#fbbf2444','#fde68a88','#f59e0b22'],
    warn:    ['#fbbf2444','#fde68a88','#f59e0b22'],
    info:    ['#3b82f644','#93c5fd88','#2563eb22'],
    teal:    ['#2dd4bf44','#99f6e488','#0d948822'],
    purple:  ['#a78bfa44','#c4b5fd88','#7c3aed22'],
    delete:  ['#f8717144','#fca5a588','#ef444422'],
    save:    ['#3b82f644','#93c5fd88','#2563eb22'],
    logout:  ['#f8717144','#fca5a588','#ef444422'],
    lock:    ['#fbbf2444','#fde68a88','#f59e0b22'],
    key:     ['#3b82f644','#93c5fd88','#2563eb22'],
    default: ['#3b82f644','#93c5fd88','#2563eb22'],
  };

  function getRingColors(type) {
    return RING_COLORS[type] || RING_COLORS.default;
  }

  function buildRingSVG(c1, c2, r) {
    return '<svg class="pa-ring" viewBox="0 0 82 82" fill="none">'
      + '<circle cx="41" cy="41" r="38" stroke="' + c1 + '" stroke-width="2" stroke-dasharray="6 8" stroke-linecap="round"/>'
      + '</svg>'
      + '<svg class="pa-ring rev" viewBox="0 0 82 82" fill="none">'
      + '<circle cx="41" cy="41" r="30" stroke="' + c2 + '" stroke-width="1.5" stroke-dasharray="3 12" stroke-linecap="round"/>'
      + '</svg>';
  }

  function buildIconHTML(icon, type) {
    var ic = typeof icon === 'string' && icon.startsWith('<') ? icon : (ICONS[icon] || ICONS[type] || ICONS.info);
    var icCls = 'pa-ic-' + (type || 'info');
    var rc = getRingColors(type || 'info');
    return '<div class="pa-icon-wrap">'
      + '<div class="pa-icon-ring">'
      + buildRingSVG(rc[0], rc[1], rc[2])
      + '<div class="pa-icon-bg ' + icCls + '">' + ic + '</div>'
      + '</div>'
      + '</div>';
  }

  function typeToStrip(type) {
    var map = { success:'pa-strip-success', error:'pa-strip-error', warning:'pa-strip-warning', warn:'pa-strip-warning', info:'pa-strip-info', teal:'pa-strip-teal', purple:'pa-strip-purple', delete:'pa-strip-error', logout:'pa-strip-error', save:'pa-strip-info', lock:'pa-strip-warning', key:'pa-strip-info' };
    return map[type] || 'pa-strip-info';
  }

  function createOverlay(extraClass) {
    var ov = document.createElement('div');
    ov.className = 'pa-overlay ' + (extraClass || '');
    document.body.appendChild(ov);
    requestAnimationFrame(function () { requestAnimationFrame(function () { ov.classList.add('pa-in'); }); });
    return ov;
  }

  function closeOverlay(ov, cb) {
    ov.classList.remove('pa-in');
    ov.classList.add('pa-out');
    setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); if (cb) cb(); }, 320);
  }

  /* ─────────────────────────────────────────────
     TOAST MANAGER
  ───────────────────────────────────────────── */
  var _toastContainers = {};

  function getToastContainer(position) {
    var pos = position || 'bottom-right';
    if (!_toastContainers[pos]) {
      var c = document.createElement('div');
      c.className = 'pa-toast-container ' + pos;
      document.body.appendChild(c);
      _toastContainers[pos] = c;
    }
    return _toastContainers[pos];
  }

  /* ─────────────────────────────────────────────
     PUBLIC API
  ───────────────────────────────────────────── */
  var PA = {};

  /**
   * PA.toast(options)
   * options: { title, message, type, duration, position, icon, closable }
   */
  PA.toast = function (options) {
    if (typeof options === 'string') options = { message: options };
    var opt = Object.assign({ type: 'info', duration: 4000, position: 'bottom-right', closable: true, title: '' }, options);
    var typeMap = { success: 'success', error: 'error', warning: 'warning', warn: 'warning', teal: 'teal', purple: 'purple', info: 'info' };
    var t = typeMap[opt.type] || 'info';
    var ic = opt.icon || ICONS[opt.type] || ICONS.info;

    var toast = document.createElement('div');
    toast.className = 'pa-toast t-' + t;
    toast.innerHTML = '<div class="pa-toast-icon">' + ic + '</div>'
      + '<div class="pa-toast-body">'
      + (opt.title ? '<div class="pa-toast-title">' + opt.title + '</div>' : '')
      + '<div class="pa-toast-msg">' + (opt.message || '') + '</div>'
      + '</div>'
      + (opt.closable ? '<button class="pa-toast-close" title="Tutup"><i class="bi bi-x"></i></button>' : '')
      + '<div class="pa-toast-progress" style="background:var(--pa-toast-color,var(--pa-blue-500));width:100%"></div>';

    var container = getToastContainer(opt.position);
    container.appendChild(toast);

    function dismiss() {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 400);
    }
    toast.addEventListener('click', function (e) { if (e.target.closest('.pa-toast-close') || !opt.closable) {} dismiss(); });

    requestAnimationFrame(function () { requestAnimationFrame(function () { toast.classList.add('show'); }); });

    var bar = toast.querySelector('.pa-toast-progress');
    if (bar && opt.duration > 0) {
      bar.style.transition = 'width ' + opt.duration + 'ms linear';
      requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = '0%'; }); });
      setTimeout(dismiss, opt.duration);
    }

    return { dismiss: dismiss };
  };

  // Shorthand
  PA.success  = function (msg, title) { return PA.toast({ type: 'success', message: msg, title: title || 'Berhasil' }); };
  PA.error    = function (msg, title) { return PA.toast({ type: 'error',   message: msg, title: title || 'Gagal' }); };
  PA.warning  = function (msg, title) { return PA.toast({ type: 'warning', message: msg, title: title || 'Perhatian' }); };
  PA.info     = function (msg, title) { return PA.toast({ type: 'info',    message: msg, title: title || 'Info' }); };

  /**
   * PA.dialog(options)
   * options: { title, message, type, icon, buttons:[{label,class,onClick,close}], showClose }
   * Returns Promise
   */
  PA.dialog = function (options) {
    if (typeof options === 'string') options = { message: options };
    var opt = Object.assign({ type: 'info', showClose: true, buttons: [{ label: 'Tutup', class: 'pa-btn-primary', close: true }] }, options);
    var ov = createOverlay();

    return new Promise(function (resolve) {
      var box = document.createElement('div');
      box.className = 'pa-box ' + typeToStrip(opt.type);

      var btns = (opt.buttons || []).map(function (b) {
        return '<button class="pa-btn ' + (b.class || 'pa-btn-ghost') + '">' + (b.icon ? b.icon + ' ' : '') + b.label + '</button>';
      }).join('');

      box.innerHTML = buildIconHTML(opt.icon || opt.type, opt.type)
        + '<div class="pa-content">'
        + '<div class="pa-title">' + (opt.title || '') + '</div>'
        + '<div class="pa-msg">' + (opt.message || '') + '</div>'
        + '</div>'
        + (btns ? '<div class="pa-divider"></div><div class="pa-actions">' + btns + '</div>' : '');

      ov.appendChild(box);

      // bind buttons
      var btnEls = box.querySelectorAll('.pa-btn');
      (opt.buttons || []).forEach(function (b, i) {
        if (btnEls[i]) {
          btnEls[i].addEventListener('click', function () {
            var result = b.value !== undefined ? b.value : b.label;
            if (b.onClick) b.onClick(result);
            if (b.close !== false) closeOverlay(ov, function () { resolve(result); });
          });
        }
      });

      // close on overlay click if showClose
      if (opt.showClose) {
        ov.addEventListener('click', function (e) {
          if (e.target === ov) closeOverlay(ov, function () { resolve(null); });
        });
      }
    });
  };

  /**
   * PA.confirm(options)
   * Resolves true/false
   */
  PA.confirm = function (options) {
    if (typeof options === 'string') options = { message: options };
    var opt = Object.assign({ type: 'warning', title: 'Konfirmasi', confirmLabel: 'Ya, Lanjutkan', cancelLabel: 'Batal', confirmClass: 'pa-btn-danger', requireCheck: false, checkLabel: '' }, options);

    var ov = createOverlay();

    return new Promise(function (resolve) {
      var box = document.createElement('div');
      box.className = 'pa-box ' + typeToStrip(opt.type);

      var checkHtml = opt.requireCheck
        ? '<label class="pa-check-wrap"><input type="checkbox" id="pa-confirm-check">'
          + '<span>' + (opt.checkLabel || 'Saya memahami konsekuensi tindakan ini') + '</span></label>'
        : '';

      box.innerHTML = buildIconHTML(opt.icon || opt.type, opt.type)
        + '<div class="pa-content">'
        + '<div class="pa-title">' + opt.title + '</div>'
        + '<div class="pa-msg">' + (opt.message || '') + '</div>'
        + checkHtml
        + '</div>'
        + '<div class="pa-divider"></div>'
        + '<div class="pa-actions">'
        + '<button class="pa-btn pa-btn-ghost" id="pa-cancel-btn">' + opt.cancelLabel + '</button>'
        + '<button class="pa-btn ' + opt.confirmClass + '" id="pa-confirm-btn"' + (opt.requireCheck ? ' disabled style="opacity:.4;pointer-events:none"' : '') + '>'
        + (opt.confirmIcon ? opt.confirmIcon + ' ' : '') + opt.confirmLabel + '</button>'
        + '</div>';

      ov.appendChild(box);

      // checkbox unlock
      if (opt.requireCheck) {
        var chk = box.querySelector('#pa-confirm-check');
        var okBtn = box.querySelector('#pa-confirm-btn');
        chk.addEventListener('change', function () {
          okBtn.disabled = !chk.checked;
          okBtn.style.opacity = chk.checked ? '1' : '.4';
          okBtn.style.pointerEvents = chk.checked ? '' : 'none';
        });
      }

      box.querySelector('#pa-confirm-btn').addEventListener('click', function () {
        closeOverlay(ov, function () { resolve(true); });
      });
      box.querySelector('#pa-cancel-btn').addEventListener('click', function () {
        closeOverlay(ov, function () { resolve(false); });
      });
      ov.addEventListener('click', function (e) {
        if (e.target === ov) closeOverlay(ov, function () { resolve(false); });
      });
    });
  };

  /**
   * PA.prompt(options)
   * Resolves entered string or null if cancelled
   */
  PA.prompt = function (options) {
    if (typeof options === 'string') options = { title: options };
    var opt = Object.assign({ type: 'info', title: 'Masukkan Data', label: 'Nilai', placeholder: '', required: true, confirmLabel: 'Simpan', cancelLabel: 'Batal', validate: null }, options);

    var ov = createOverlay();

    return new Promise(function (resolve) {
      var box = document.createElement('div');
      box.className = 'pa-box ' + typeToStrip(opt.type);

      box.innerHTML = buildIconHTML(opt.icon || opt.type, opt.type)
        + '<div class="pa-content">'
        + '<div class="pa-title">' + opt.title + '</div>'
        + (opt.message ? '<div class="pa-msg">' + opt.message + '</div>' : '')
        + '<div class="pa-input-wrap">'
        + '<span class="pa-input-label">' + opt.label + (opt.required ? ' <span style="color:var(--pa-rose)">*</span>' : '') + '</span>'
        + '<input type="' + (opt.inputType || 'text') + '" class="pa-input" id="pa-prompt-input" placeholder="' + (opt.placeholder || '') + '" value="' + (opt.defaultValue || '') + '">'
        + '<div class="pa-input-hint" id="pa-prompt-hint"></div>'
        + '</div>'
        + '</div>'
        + '<div class="pa-divider"></div>'
        + '<div class="pa-actions">'
        + '<button class="pa-btn pa-btn-ghost" id="pa-prompt-cancel">' + opt.cancelLabel + '</button>'
        + '<button class="pa-btn pa-btn-primary" id="pa-prompt-ok"><i class="bi bi-check2-circle"></i> ' + opt.confirmLabel + '</button>'
        + '</div>';

      ov.appendChild(box);

      var inp = box.querySelector('#pa-prompt-input');
      var hint = box.querySelector('#pa-prompt-hint');
      inp.focus();

      function doOk() {
        var val = inp.value.trim();
        if (opt.required && !val) {
          inp.classList.add('pa-err'); hint.textContent = 'Field ini wajib diisi.'; hint.classList.add('show');
          inp.focus(); return;
        }
        if (opt.validate) {
          var errMsg = opt.validate(val);
          if (errMsg) { inp.classList.add('pa-err'); hint.textContent = errMsg; hint.classList.add('show'); inp.focus(); return; }
        }
        closeOverlay(ov, function () { resolve(val); });
      }

      inp.addEventListener('input', function () { inp.classList.remove('pa-err'); hint.classList.remove('show'); });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') doOk(); if (e.key === 'Escape') cancel(); });
      box.querySelector('#pa-prompt-ok').addEventListener('click', doOk);

      function cancel() { closeOverlay(ov, function () { resolve(null); }); }
      box.querySelector('#pa-prompt-cancel').addEventListener('click', cancel);
      ov.addEventListener('click', function (e) { if (e.target === ov) cancel(); });
    });
  };

  /**
   * PA.loading(options)
   * Returns { close() }
   */
  PA.loading = function (options) {
    if (typeof options === 'string') options = { message: options };
    var opt = Object.assign({ title: 'Memuat...', message: 'Mohon tunggu sebentar', closable: false }, options);

    var ov = document.createElement('div');
    ov.className = 'pa-loading-overlay';
    ov.innerHTML = '<div class="pa-loading-card">'
      + '<div class="pa-spinner"><div class="pa-spinner-ring"></div><div class="pa-spinner-ring"></div><div class="pa-spinner-ring"></div><div class="pa-spinner-dot"></div></div>'
      + '<div class="pa-loading-title">' + opt.title + '</div>'
      + '<div class="pa-loading-msg">' + opt.message + ' <span class="pa-loading-dots"><span></span><span></span><span></span></span></div>'
      + (opt.closable ? '<div style="margin-top:18px"><button class="pa-btn pa-btn-ghost" id="pa-loading-close-btn">Batalkan</button></div>' : '')
      + '</div>';
    document.body.appendChild(ov);
    requestAnimationFrame(function () { requestAnimationFrame(function () { ov.classList.add('pa-in'); }); });

    if (opt.closable) {
      ov.querySelector('#pa-loading-close-btn').addEventListener('click', function () { instance.close(); });
    }

    var instance = {
      close: function (cb) {
        ov.classList.remove('pa-in');
        ov.classList.add('pa-out');
        setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); if (cb) cb(); }, 350);
      },
      setMessage: function (msg) {
        var el = ov.querySelector('.pa-loading-msg');
        if (el) el.innerHTML = msg + ' <span class="pa-loading-dots"><span></span><span></span><span></span></span>';
      },
      setTitle: function (t) {
        var el = ov.querySelector('.pa-loading-title');
        if (el) el.textContent = t;
      }
    };
    return instance;
  };

  /**
   * PA.alert(target, options)
   * Inline alert injected into target element
   * options: { type, title, message, closable }
   */
  PA.alert = function (target, options) {
    if (typeof options === 'string') options = { message: options };
    var opt = Object.assign({ type: 'info', closable: true }, options);
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    var ic = opt.icon || ICONS[opt.type] || ICONS.info;

    var div = document.createElement('div');
    div.className = 'pa-alert ' + opt.type;
    div.innerHTML = '<span class="pa-alert-icon">' + ic + '</span>'
      + '<div class="pa-alert-body">'
      + (opt.title ? '<div class="pa-alert-title">' + opt.title + '</div>' : '')
      + '<div class="pa-alert-msg">' + (opt.message || '') + '</div>'
      + '</div>'
      + (opt.closable ? '<button class="pa-alert-close" title="Tutup"><i class="bi bi-x-lg"></i></button>' : '');

    if (opt.closable) {
      div.querySelector('.pa-alert-close').addEventListener('click', function () {
        div.style.opacity = '0'; div.style.transform = 'translateY(-8px)';
        div.style.transition = 'all .3s ease';
        setTimeout(function () { if (div.parentNode) div.parentNode.removeChild(div); }, 300);
      });
    }

    if (opt.prepend) el.insertBefore(div, el.firstChild); else el.appendChild(div);
    return div;
  };

  return PA;
});
