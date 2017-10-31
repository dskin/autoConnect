(function content(){
	// 获取输入框、登录框
	var form = document.getElementsByTagName('form')[1];
	var fInput = form.getElementsByTagName('input');
	var user = fInput[1];
	var psw = fInput[2];
	var log = fInput[0];
	var isps = document.getElementsByTagName('select')[0].getElementsByTagName('option');
	// 登录错误提示
	// var erroMessage = document.getElementById('message');

	//从本地储存获取用户名、密码、运营商信息
	var userValue = localStorage.getItem('userValue');
	var pswValue = localStorage.getItem('pswValue');
	var ispValue = localStorage.getItem('ispValue');
	switch(ispValue){
		case ' ':
			isps[1].selected = true;
			break;
		case '@cmcc':
			isps[2].selected = true;
			break;
		case '@unicom':
			isps[3].selected = true;
            break;
		case '@telecom':
			isps[4].selected = true;
            break;
	}

	// 根据本地储存判断用户是否第一次登录。第一次登录则获取保存登录信息，否则直接登录
	if(userValue){
		user.value = userValue;
		psw.value = pswValue;
		log.click();
	}else{
		window.onsubmit = function(){
			console.log('表单填写事件执行了' + user.value);
			localStorage.setItem('userValue',user.value);
			localStorage.setItem('pswValue',psw.value);
			for(var i = 1; i <= isps.length; i++){
				if(isps[i].selected === true){
					localStorage.setItem('ispValue',isps[i].value);
				}
			}
		};
    }
})()