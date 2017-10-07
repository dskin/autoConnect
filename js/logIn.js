var preparePage = document.getElementById("preparePage");
var submit = document.getElementById("submit");
var bindPage = document.getElementById("bindPage");
var cancelBind = document.getElementById("cancelBind");
var rouseBgPage = document.getElementById("rouseBgPage");
var localUser = document.getElementById("localUser");

// 绑定事件监听函数
function submitListener(){
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
}

// 取消事件监听函数
function cancelListener(){
	cancelBind.addEventListener("click",function(){
		localStorage.removeItem("user");
		bindPage.style.display = "none";
		preparePage.style.display = "block";
	},false)
}

// 主函数
function setAccountInfo(){
	if(!localStorage.user){
		submitListener();
		showUser();
	}else{
		bindPage.style.display = "block";
		preparePage.style.display = "none";
		cancelListener();
		submitListener();
		showUser();
	}
}

// 唤醒事件监听,与background页面通信,唤醒eventpage页面
rouseBgPage.addEventListener("click",function(){
	chrome.runtime.getBackgroundPage(function(bg){
		console.log(bg);
	});
	var noptions = {
		icon: "/images/icon48.png"
	};
	var notification = new Notification("已发送连接请求，现在打开网页吧！",noptions);
},false)

// 显示当前绑定用户信息
function showUser(){
	if(localStorage.user){
		localUser.innerText = localStorage.user;
	}else{
		localUser.innerText = "";
	}
}


setAccountInfo();

