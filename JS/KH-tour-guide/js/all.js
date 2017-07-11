function getData (data) {
	var selectZone = document.getElementById('selectZoneId');
	var zoneTitle = document.getElementById('zoneTitleId');

	selectZone.addEventListener('change', updateData, false)

	var siteList = document.querySelector('.siteList');
	var pagination = document.querySelector('.pagination ul');

	var dataLen = data.length;
	var itemsPerpage = 6;

	var pages = {
		currentPage: 1,
		itemsPerPage: itemsPerpage,
		totalItems: dataLen,
		totalPages: dataLen / itemsPerpage
	}

	function updateData(e) {
		updateList(e);
		console.log(e);
		updatePagination(e);
	}

	function updateList(e) {
		var selectedZone = e.target.value;
		zoneTitle.textContent = selectedZone;
		var siteListLi = '';

		for(var i = 0; i < pages.totalItems; i++) {
			if (selectedZone == data[i].Zone) {
				siteListLi += '<li>';
				siteListLi += '<div class="sitePic" style="background-image:url(' + data[i].Picture1 + ')">'
				siteListLi += '<p class="name">' + data[i].Name + '</p>';
				siteListLi += '<em class="zone">' + data[i].Zone + '</em>';
				siteListLi += '</div>';
				siteListLi += '<div class="siteInfo">'
				siteListLi += '<p><img src="assets/icons_clock.png">' + data[i].Opentime + '</p>';
				siteListLi += '<p><img src="assets/icons_pin.png">' + data[i].Add + '</p>';
				siteListLi += '<p><img src="assets/icons_phone.png">' + data[i].Tel + '</p>';
				siteListLi += '<p><img src="assets/icons_tag.png">' + data[i].Ticketinfo + '</p>';
				siteListLi += '</div>';
				siteListLi += '</li>';
			};
		}
		siteList.innerHTML = siteListLi;
	}

	function updatePagination() {
		var paginationLi = '';
		for(var i = 0; i < pages.totalPages; i++) {
			paginationLi += '<li><a>';
			paginationLi += i + 1;
			paginationLi += '</a></li>';
		}

		pagination.innerHTML += '<li><a class="prevBtn">&lt;prev</a></li>';
		pagination.innerHTML += paginationLi;
		pagination.innerHTML += '<li><a class="nextBtn">next&gt;</a></li>';
	}

	var prevBtn = document.querySelector('.prevBtn');
	var nextBtn = document.querySelector('.nextBtn');
}

var send = document.querySelector('.send');
send.addEventListener('click', signup, false);
function signup() {
	var emailStr = document.querySelector('.account').value;
	var passwordStr = document.querySelector('.password').value;
	var account = {};
	account.email = emailStr;
	account.password = passwordStr;

	var xhr = new XMLHttpRequest();
	xhr.open('post', 'https://hexschool-tutorial.herokuapp.com/api/signup', true);
	xhr.setRequestHeader('Content-type', 'application/json');
	var data = JSON.stringify(account);
	xhr.send(data);
	xhr.onload = function() {
		var callbackData = JSON.parse(xhr.responseText);
		console.log(callbackData);
		var variableStr = callbackData.message;
		if(variableStr == "帳號註冊成功") {
			alert("帳號註冊成功！");
		} else {
			alert("帳號註冊失敗！");
		}
	}
}