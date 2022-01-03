var cont = document.querySelector("main");
var isWebkit = "webkitRequestAnimationFrame" in window;
var scale = 1;

var appWidth;
var appHeight;
var apps;

window.addEventListener("load", function () {
    window.onresize = function () {
        resizeApp();
    };
    resizeApp();
});

function resizeApp() {
    var winHeight, winWidth;
    var appWidth = 1024;
    var appHeight = 768;
    // var appWidth = 800;
    // var appHeight = 600;

    winWidth = document.documentElement.clientWidth;
    winHeight = document.documentElement.clientHeight;

    var ws = winWidth / appWidth;
    var hs = winHeight / appHeight;
    scale = ws < hs ? ws : hs;

    var ua = window.navigator.userAgent;
    var msie = ua.includes("MSIE ");
    if (msie > 0) {
        //$('#main').css('zoom',scale);
        cont.style.msTransformOrigin = "0 0";
        cont.style.msTransform = "scale(" + scale + ")";
        cont.style.TransformOrigin = "0 0";
        cont.style.Transform = "scale(" + scale + ")";
    } else {
        cont.style.webkitTransformOrigin = "0 0";
        cont.style.webkitTransform = "scale(" + scale + ")";
        cont.style.MozTransformOrigin = "0 0";
        cont.style.MozTransform = "scale(" + scale + ")";
        cont.style.msTransformOrigin = "0 0";
        cont.style.msTransform = "scale(" + scale + ")";
    }

    if (winWidth > winHeight) {
        cont.style.left = (winWidth - appWidth * scale) / 2 + "px";
    } else {
        cont.style.left = 0;
    }
}


