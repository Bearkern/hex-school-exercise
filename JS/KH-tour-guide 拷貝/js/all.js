var xhr = new XMLHttpRequest();
xhr.open('get', 'http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send();
xhr.onload = function() {
	var xhrText = JSON.parse(xhr.responseText);
	var data = xhrText.result.records;
	var selectZone = document.getElementById('selectZoneId');
	var zoneTitle = document.getElementById('zoneTitleId');
	var siteList = document.querySelector('.siteList');

	selectZone.addEventListener('change', updateList, false)

	var dataLen = data.length;

	function updateList(e) {
		var selectedZone = e.target.value;
		zoneTitle.textContent = selectedZone;
		var siteListLi = '';

		for(var i = 0; i < dataLen; i++) {
			if (selectedZone == data[i].Zone) {
				siteListLi += '<li>';
				siteListLi += '<div class="sitePic" style="background-image:url(' + data[i].Picture1 + ')">';
				siteListLi += '<p class="name">' + data[i].Name + '</p>';
				siteListLi += '<em class="zone">' + data[i].Zone + '</em>';
				siteListLi += '</div>';
				siteListLi += '<div class="siteInfo">';
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
}

	// var itemsPerPage = 6;
	// var pages = {
	// 	currentPage: 1,
	// 	itemsPerPage: itemsPerPage,
	// 	totalItems: dataLen,
	// 	totalPages: dataLen / itemsPerPage
	// }