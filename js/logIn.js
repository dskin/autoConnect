// 唤醒按钮事件监听,与background页面通信,唤醒eventpage页面
rouseBgPage.addEventListener("click", function () {
	chrome.runtime.getBackgroundPage(function (bg) {
		console.log(bg);
	});
	var noptions = {
		icon: "/images/icon48.png"
	};
	var notification = new Notification("已发送连接请求，现在打开网页吧！", noptions);
	setTimeout(notification.close.bind(notification), 3000);
}, false)

// 绑定按钮事件监听
submit.addEventListener("click",function(){
	// 获取账号密码，登录运营商信息,@ ,@cmcc、@unicom、@telecom
	var user = document.getElementById("user").value;
	var psw = document.getElementById("psw").value;
	var isp = document.getElementById("isp");
	ispIndex = isp.selectedIndex;
	isp = isp.options[ispIndex].getAttribute("value");

	bindPage.style.display = "block";
	preparePage.style.display = "none";

	// 将获取到的值保存至本地存储
	localStorage.setItem('user',user);
	localStorage.setItem("psw",psw);
	localStorage.setItem("isp",isp);
	chrome.runtime.sendMessage("ok");
},false)

// 取消按钮事件监听
cancelBind.addEventListener("click",function(){
	localStorage.removeItem("user");
	hasConnect.style.display = "none";
	notConnect.style.display = "none";
	preparePage.style.display = "block";
},false)

// 显示当前绑定用户信息
function showUser() {
	if (localStorage.user) {
		localUser.innerText = localStorage.user;
	} else {
		localUser.innerText = "";
	}
}

// 主函数
function setAccountInfo(){
	var preparePage = document.getElementById("preparePage");
	var submit = document.getElementById("submit");
	var bindPage = document.getElementById("bindPage");
	var cancelBind = document.getElementById("cancelBind");
	var rouseBgPage = document.getElementById("rouseBgPage");
	var localUser = document.getElementById("localUser");
	var notConnect = document.getElementById("notConnect");
	var hasConnect = document.getElementById("hasConnect");

	if(!localStorage.user){
		submitListener();
		showUser();
	} else {
		preparePage.style.display = "none";
		// 发送一个fetch请求，判断是否联网，以显示不同信息
		fetch('https://www.baidu.com',{mode: 'no-cors'}).then(function (response) {
			hasConnect.style.display = "block";
		})
		.catch(function (error) {
			notConnect.style.display = "block";
		});
		showUser();
	}
}

setAccountInfo();

