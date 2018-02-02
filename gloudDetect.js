$(function () {
    $("div[href]").click(function (event) {
        window.protocolCheck($(this).attr("href"),
            function () {
                alert("检测到您电脑Access Client本地客户端未安装 请下载");
            });
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    });
});
