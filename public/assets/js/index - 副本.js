var vm;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        //离开此标签页
        document.title = "不要走吗o(>﹏<)o"
    } else {
        //进入此标签页
        document.title = "咦~ 你又回来了O(∩_∩)O哈哈~"

        window.setTimeout(() => {
            document.title = "软件仓库->专注于快速安装下载仓库平台"
        }, 800)
    }
}, false);

!function (e, t, a) {
    function r() {  //动画循环函数,它负责不断更新心形的位置、大小和透明度,并在心形消失时从页面中删除它们
        for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e, 1)) : (s[e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[e].x + "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale + "," + s[e].scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
    function n() {  //页面上注册点击事件监听器,在每次点击时创建一个新的心形元素
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(),
                o(e)
        }
    }
    function o(e) {  //函数负责创建新的心形元素,并设置它的初始位置、大小和透明度等属性
        var a = t.createElement("div");
        a.className = "heart",
            s.push({
                el: a,
                x: e.clientX - 5,
                y: e.clientY - 5,
                scale: 1,
                alpha: 1,
                color: c()
            }),
            t.body.appendChild(a)
    }
    function i(e) {  //函数负责动态插入一个 CSS 样式表,用于定义心形元素的样式。
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
    function c() { //函数用于生成随机的心形颜色
        return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    }
    var s = [];
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function (e) {
            setTimeout(e, 1e3 / 60)
        },
        i(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),
        n(),
        r()
}(window, document);