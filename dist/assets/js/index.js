var vm;

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        //离开此标签页
        document.title = "天气可视化"
    } else {
        //进入此标签页
        document.title = "O(∩_∩)O哈哈~"

        window.setTimeout(() => {
            document.title = "全方位天气可视化大屏"
        }, 800)
    }
}, false);