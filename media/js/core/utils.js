var appSetup = appSetup || {};
window.appSetup = (function (window, document, undefined) {

    // dynamically load enhanced css
    // if (document.querySelector && document.addEventListener) {
    //     var head = document.getElementsByTagName("head")[0],
    //         cssUrl = "/media/css/core/enhance.css?v=1395690932944",
    //         link = document.createElement("link");
    
    //         link.href = cssUrl; link.media = "only screen and (min-width: 10em)"; link.rel = "stylesheet"; document.head.appendChild(link);
    // };
    
    /* FONT LOADING SCRIPT -- USES LOCALSTORAGE FOR CACHING
    -------------------------------------------------------------------------------------------------------------------------- */
    !function(){function e(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function t(e){return window.localStorage&&localStorage.font_css_cache&&localStorage.font_css_cache_file===e}function n(){if(window.localStorage&&window.XMLHttpRequest)if(t(o))a(localStorage.font_css_cache);else{var n=new XMLHttpRequest;n.open("GET",o,!0),e(n,"load",function(){4===n.readyState&&(a(n.responseText),localStorage.font_css_cache=n.responseText,localStorage.font_css_cache_file=o)}),n.send()}else{var c=document.createElement("link");c.href=o,c.rel="stylesheet",c.type="text/css",document.getElementsByTagName("head")[0].appendChild(c),document.cookie="font_css_cache"}}function a(e){var t=document.createElement("style");t.innerHTML=e,document.getElementsByTagName("head")[0].appendChild(t)}var o="/cutcartel/media/css/build/fonts.min.css";window.localStorage&&localStorage.font_css_cache||document.cookie.indexOf("font_css_cache")>-1?n():e(window,"load",n)}();

    if (doc.querySelector && doc.addEventListener) {

        /* IE10 Mobile bug fix
        -------------------------------------------------------------------------------------------------------------------------- */
        (function() { if (navigator.userAgent.match(/IEMobile\/10\.0/)) { var msViewportStyle = doc.createElement("style"); msViewportStyle.appendChild( doc.createTextNode("@-ms-viewport{width:auto!important}") ); doc.getElementsByTagName("head")[0].appendChild(msViewportStyle); } })();
    }

    /* matchMedia() polyfill  
    Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license
    -------------------------------------------------------------------------------------------------------------------------- */
    window.matchMedia=window.matchMedia||function(e,t){"use strict";var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");o.id="mq-test-1";o.style.cssText="position:absolute;top:-100em";s.style.background="none";s.appendChild(o);return function(e){o.innerHTML='­<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>';r.insertBefore(s,i);n=o.offsetWidth===42;r.removeChild(s);return{matches:n,media:e}}}(document);

})(this, this.document);