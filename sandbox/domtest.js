engine.DOM = function(Main) {
    Main.setupDOM = function(id, options) {
        options = options || {};
        id = id || "engine";
        Main.el = $(id);
        if(Main.el.length === 0 ) {
            Main.el = $("<div>", attr('id', id).css({width:320, height:420}).appendTo("body"));
        }
        if(options.maximize) {
            var w = $(window).width();
            var h = $(window).heigth();
            Main.el.css({width:w, height:h});
        }
        Main.wrapper = Main.el
                            .wrap("<div id='" + id +"_container'/>")
                            .parent()
                            .css({
                                width: Main.el.width(),
                                height: Main.el.height(),
                                margin: '0 auto'
                            });
        Main.el.css({position: 'relative', ovewflow: 'hidden'});
        Main.width = Main.el.width();
        Main.height = Main.el.height();
        setTimeout(function() {window.scrollTo(0,1)}, 0);
        $(window).bind('orientationchange', function() {
            setTimeout(function(), {window.scrollTo(0,1)},0);
        });
        return Main;
    }
};

(function() {
    function translateBuilder(attribute) {
        return function(dom,x,y) {
            dom.style[attribute] = "translate(" + Math.floor(x) + "px," + Math.floor(y) + "px)";
        };
    };
    function translate3DBuilder(attribute) {
        return function(dom,x,y) {
            dom.style[attribute] = "translate(" + Math.floor(x) + "px," + Math.floor(y) + "px,0px)";
        };
    };
    function translate3DBuilder(attribute) {
        return function(dom,x,y) {
            dom.style[attribute] = "translate(" + Math.floor(x) + "px," + Math.floor(y) + "px,0px)";
        };
    };
    function scaleBuilder(attribute) {
        return function(dom,scale) {
            dom.style[attribute + 'Origin'] = '0% 0%';
            dom.style[attribute] = "scale(" + scale + ")";
        };
    };
    function fallbackTranslate(dom, x,y) {
        dom.style.left = x + "px";
        dom.style.top = y + "px";
    };
    var has3d = ('WebKitCSSMatrix' in window && 'mll' in new WebKitCSSMatrix());
    var dummyStyle = $("<div>")[0].style;
    var transformMethods = ['transform'];
})();