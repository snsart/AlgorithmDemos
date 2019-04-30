(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        onResize = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth<=600){
                docEl.style.fontSize='12px';
            }else{
                docEl.style.fontSize = 18 * (clientWidth / 1024) + 'px';
                docEl.style.overflowX = 'hidden';
            }
        };
    var ready = false;
    if(ready == false){
        ready = true;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if(clientWidth<=600){
            docEl.style.fontSize='12px';
        }else{
            docEl.style.fontSize = 18 * (clientWidth / 1024) + 'px';
        }
    }
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, onResize, false);
    doc.addEventListener('DOMContentLoaded', onResize, false);
    
    $("body").css("display","block");
})(document, window);