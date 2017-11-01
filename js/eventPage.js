chrome.runtime.onMessage.addListener(function(msg){
	if(msg === "ok"){
		logIn();
	}
})


// 后台登录
function logIn(){
	// 登录网址
	var url = 'http://172.30.4.129/a70.htm*';
	var options = {
		method: 'POST',
		hearders: {
			'Host': '172.30.4.129',
			'Connection': 'keep-alive',
			'Cache-Control': 'max-age=0',
			'Origin': 'http://172.30.4.129',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Referer': 'http://172.30.4.129/a70.htm',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.8'
		},
		body: 'DDDDD='+localStorage.getItem("user")+localStorage.getItem("isp")+'&upass='+localStorage.getItem("psw")+'&0MKKey=123456'
	};

	if(localStorage.user){
		fetch(url,options).then(function(response){
			console.log(response.status);
		})
	}else{
		// 以下为浏览器notification请求实例，实际上，chrome扩展已经在安装时获取了相应权限，可直接进行通知
		var noptions = {
			icon: "/images/icon48.png"
		}
		// 先检查浏览器是否支持
		if (!("Notification" in window)){
		   alert("未绑定，请绑定账号后刷新重试");
		}

		// 检查用户是否同意接受通知
		else if (Notification.permission === "granted"){
			var notification = new Notification("未绑定，请绑定账号后刷新重试",noptions);
		}

		// 否则我们需要向用户获取权限
		else if (Notification.permission !== 'denied'){
		    Notification.requestPermission(function(permission){
			    // 如果用户同意，就可以向他们发送通知
			    if (permission === "granted") {
			        var notification = new Notification("未绑定，请绑定账号后刷新重试",noptions);
			    }
		    });
		}
	}
}

logIn();