

/* application wrapper
-------------------------------------------------------------------------------------------------------------------------- */
var cutcartel = cutcartel || {};
window.cutcartel = (function (window, document, ccwrapper) {


    window.onscroll = function changeClass(){
        var scrollPosY = window.pageYOffset | document.body.scrollTop;
        var navBar = document.getElementById('global-header');

        if(scrollPosY > 100) {
              navBar.className = ('global-header is-sticky');
        } else if(scrollPosY <= 100) {
             navBar.className =  ('global-header');
        }

    }

    /* load up a couple helpers
    ---------------------------------------------- */

    /* set atributes */
    function setAttributes(el, attrs) {
        for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
        }
    };


    /* set up for lazyloading images and video on small screens
    ---------------------------------------------- */
    var Utils = {
        q : function (q, res) {
            if (doc.querySelectorAll) {
                res = doc.querySelectorAll(q);
            } else {
                a = doc.styleSheets[0] || doc.createStyleSheet();
                a.addRule(q, 'f:b');
                for (var l = d.all, b = 0, c = [], f = l.length;b < f;b++)
                l[b].currentStyle.f && c.push(l[b]);
          
                a.removeRule(0);
                res = c;
            }
            return res;
        }
    };
    function initImages() {
        "use strict";
        var lazy = Utils.q('[data-src]'),
            //imgBos = Utils.q('[data-bos]'),
            imgAlt = Utils.q('[data-alt]'),
            imgWidth = Utils.q('[data-width]'),
            imgHeight = Utils.q('[data-height]');
        
        for (var i = 0; i < lazy.length; i++) {
            var source = lazy[i].getAttribute('data-src'),
                alt = imgAlt[i].getAttribute('data-alt'),
                width = imgWidth[i].getAttribute('data-width'),
                height = imgHeight[i].getAttribute('data-height'),
                img = new Image();
            
            //create the image & alt
            img.src = source;
            img.alt = alt;
            img.width = width;
            img.height = height;
            //insert it inside of the span
            lazy[i].insertBefore(img, lazy[i].firstChild);
            imgAlt[i].appendChild(img);
            imgWidth[i].appendChild(img);
            imgHeight[i].appendChild(img);
        }
    }
    // end lazy images


    /* touch - pointer check
    ---------------------------------------------- */
    function touchEvents() {
    
        var supportsTouch = false;
        if ('ontouchstart' in window) {
            //iOS & android
            supportsTouch = true;

            doc.documentElement.className = doc.documentElement.className.replace(/\bno-touch\b/g, '') + ' has-touch';
            //alert('boing! iOS & Android');

            /* A fix for the iOS orientationchange zoom bug. Script by @scottjehl, rebound by @wilto. MIT / GPLv2 License.  */
            (function () {

                // This fix addresses an iOS bug, so return early if the UA claims it's something else.
                var ua = navigator.userAgent;
                if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf("AppleWebKit") > -1)) {
                    return;
                }

                if (!doc.querySelector) { return; }

                var meta = doc.querySelector("meta[name=viewport]"),
                    initialContent = meta && meta.getAttribute("content"),
                    disabledZoom = initialContent + ",maximum-scale=1",
                    enabledZoom = initialContent + ",maximum-scale=10",
                    enabled = true,
                    x, y, z, aig;

                if (!meta) { return; }

                function restoreZoom() {
                    meta.setAttribute("content", enabledZoom);
                    enabled = true;
                }

                function disableZoom() {
                    meta.setAttribute("content", disabledZoom);
                    enabled = false;
                }

                function checkTilt(e) {
                    aig = e.accelerationIncludingGravity;
                    x = Math.abs(aig.x);
                    y = Math.abs(aig.y);
                    z = Math.abs(aig.z);

                    // If portrait orientation and in one of the danger zones
                    if ((!w.orientation || w.orientation === 180) && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
                        if (enabled) {
                            disableZoom();
                        }
                    }
                    else if (!enabled) {
                        restoreZoom();
                    }
                }

                w.addEventListener("orientationchange", restoreZoom, false);
                w.addEventListener("devicemotion", checkTilt, false);

            })(this);
            // end orientation fix

        } else if (window.navigator.msPointerEnabled) {
            //Win8
            supportsTouch = true;

            doc.documentElement.className = doc.documentElement.className.replace(/\bno-touch\b/g, '') + ' has-touch';
            //alert('bang!!! windows8');

        } else if (supportsTouch === false) {

            doc.documentElement.className = doc.documentElement.className.replace(/\bno-touch\b/g, '') + ' no-touch';
            //alert('cool beans! do not support touch');
        }
    }
    // end touchEvents

    /* Lazy Load Videos
    -------------------------------------------------------------------------------------------------------------------------- */
    function lazyvids() {
        function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
        r(function(){
            if(!document.getElementsByClassName) {
                // IE8 support
                var getElementsByClassName = function(node, classname) {
                    var a = [],
                        re = new RegExp('(^| )'+classname+'( |$)'),
                        els = node.getElementsByTagName("*");

                    for(var i=0,j=els.length; i<j; i++)
                        if(re.test(els[i].className))a.push(els[i]);
                    return a;
                }
                var videos = getElementsByClassName(document.body,"youtube");
            }
            else {
                var videos = document.getElementsByClassName("youtube");
            }

            var nb_videos = videos.length;
            for (var i=0; i<nb_videos; i++) {
                // Based on the YouTube ID, we can easily find the thumbnail image
                videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

                // Overlay the Play icon to make it look like a video player
                var play = document.createElement("div");
                play.setAttribute("class","play");
                videos[i].appendChild(play);

                videos[i].onclick = function() {
                    // Create an iFrame with autoplay set to true
                    var iframe = document.createElement("iframe"),
                        iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";

                    if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
                    iframe.setAttribute("src",iframe_url);
                    iframe.setAttribute("frameborder",'0');
                    iframe.setAttribute('allowfullscreen', 1);
                    //iframe.setAttribute("allowfullscreeen");

                    // The height and width of the iFrame should be the same as parent
                    // iframe.style.width  = this.style.width;
                    // iframe.style.height = this.style.height;

                    // Replace the YouTube thumbnail with YouTube Player
                    this.parentNode.replaceChild(iframe, this);
                }
            }
        });

    };


    /* load'em up! & execute!
    -------------------------------------------------------------------------------------------------------------------------- */

    /* always load touch events */
    touchEvents();

    if (doc.querySelectorAll('.lazy-img')) {

        if (window.matchMedia('only screen and (min-width: 299px)').matches) {
            addLoadEvent(initImages);
        }

    }

    if (doc.querySelectorAll('.youtube')) {
            addLoadEvent(lazyvids);
    }

})(this, this.document);
