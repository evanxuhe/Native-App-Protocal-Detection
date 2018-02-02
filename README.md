# Native-App-Protocal-Detection

Detect if software/app installed in Windows using registry/plugins/onBlur  
Detect the presence of application/Sofware in Windows
Work Well for IE/Chrome/360  But Firefox not solved Now

Reference:
StackOverFlow Question：
https://stackoverflow.com/questions/27489665/approaches-of-detection-of-custom-protocol-in-chrome-and-safari-browsers
Custom Protocol Detection in Browser Code from ismailhabib:
https://github.com/ismailhabib/custom-protocol-detection

JS实现 浏览器判断本地是否安装程序，并下载与启动 Chrome,IE,360亲测可用，不用ppapi

场景需求：
最近工程的一个需求，用户点击链接：
软件已经存在，则打开软件
软件未安装，则提示用户下载；
问题可以拆分成两部分：
判断软件是否存在； 

打开软件；
使用超链接打开本地程序
 <a href="glcloud://"></a>  
很神奇，找到软件注册表的信息，写入根目录名称即可打开，蛋疼的是该方法没返回值，软件不存在不会有任何反应。
检测软件是否存在；
这部分才是难点，最简单的办法是使用navigator.plugins去检查对应的dll是否加载。但是在各大浏览器全面拒绝npapi之后，之前通过npapi加载本地dll插件的方法基本都不能用了，360浏览器极速内核支持可用。找了好久，参考了各路方式和StackOverflow的解法，在MIT大牛的基础上找到的解决方案:
StackOverFlow解决方案：
https://stackoverflow.com/questions/27489665/approaches-of-detection-of-custom-protocol-in-chrome-and-safari-browsers
Custom Protocol Detection in Browser源码:
https://github.com/ismailhabib/custom-protocol-detection

IE系列：
	Win7
<script>
			function findPlugins(){
var shell = new ActiveXObject("WScript.shell");
var reg=shell.RegRead("HKEY_CLASSES_ROOT\\glcloud\\URL Protocol");
}
<script>
更正一下，网上好多错的,command/层级下没有执行文件，无法执行
	Win8,Win10，IE自带API判断
navigator.msLaunchUri(uri)
	
	Chrome：
这个实现比较巧妙。当软件存在，点击链接会打开软件，鼠标跳出。因而创建一个SetTimeOut任务，当3s内鼠标仍未跳出，说明软件不存在。
navigator.plugins只能载入native client(nacl)、chrome PDF等几个组件，不支持npapi
	
	360极速浏览器：
可以使用navigator.plugins载入所有插件（包括npapi），也可以同chrome使用相同解法
<script>
			function findPlugins(){
				var plugins = navigator.plugins;
				for (var i = 0; i <plugins.length; i++) {
					var plugin_name=plugins[i].name;
					console.log(plugin_name);
					if (plugin_name=="Access Client") {
						alert(plugin_name+"   已找到");
						break;}}
}
</script>
	火狐：
火狐在软件不存在时也会弹出选择框，目前还未解决欢迎大家贡献才智
