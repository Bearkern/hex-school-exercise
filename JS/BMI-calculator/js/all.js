// Declare buttons
var seeResult = document.getElementById('seeResultId');
var result = document.querySelector('.resultBtn');
result.style.display = "none";

// Declare bmiData array, for store data to localStorage
var bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];

// Declare date
var date = new Date();
var month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var now = month[date.getMonth()] + "-";
now += (date.getDate() < 10 ? "0" : "") + date.getDate() + "-";
now += date.getFullYear();

seeResult.addEventListener('click', calculateBmi, false);
result.addEventListener('click', calculateBmi, false);

// Calculate BMI value, determine body status, store data to localStorage
function calculateBmi() {
  seeResult.style.display = "none";
  result.style.display = "block";
  var height = document.getElementById('heightId').value;
  var weight = document.getElementById('weightId').value;
  var bmi = Math.round(weight / ((height/100) * (height / 100)) * 100) / 100;
  var resultValue = document.querySelector('.resultValue');
  resultValue.innerHTML = bmi;
  
  var statusClass = bodyStatus(bmi)[0];
  var body = bodyStatus(bmi)[1];

  // Declare bmiReport properties and values
  var bmiReport = {
    'statusClass': statusClass,
    'bodyStatus': body,
    'bmi': bmi,
    'weight': weight,
    'height': height,
    'measureTime': now
  }

  bmiData.unshift(bmiReport);

  localStorage.setItem('bmiData', JSON.stringify(bmiData));
  
  // Execute measureList
  measureList();
}

// Button styles
function resultStyle(status, color) {
  var resultValue = document.querySelector('.resultValue');
  var resultText = document.querySelector('.resultText');
  var statusText = document.querySelector('.statusText');
  var resultBtn = document.querySelector('.resultBtn');
  var refresh = document.querySelector('.refresh');

  resultValue.style.color = color;
  resultText.style.color = color;
  statusText.textContent = status;
  statusText.style.color = color;
  resultBtn.style.borderColor = color;
  refresh.style.backgroundColor = color;
}

// Measure record list
function measureList() {
  var measureListUl = document.querySelector('.measureRecord ul');
  var len = bmiData.length;
  var str = '';

  for(var i = 0; i < len; i++) {
    str += '<li class="' + bmiData[i].statusClass + '">'
    str += '<div class="status"><span>' + bmiData[i].bodyStatus + '</span></div>';
    str += '<div class="bmi"><small>BMI </small><span>' + bmiData[i].bmi + '</span></div>';
    str += '<div class="weight"><small>weight </small><span>' + bmiData[i].weight + 'kg</span></div>';
    str += '<div class="height"><small>height </small><span>' + bmiData[i].height + 'cm</span></div>';
    str += '<div class="date"><small>' + bmiData[i].measureTime + '</small></div>';
    str += '</li>';
  }

  measureListUl.innerHTML = str;
} 

measureList();

// Determine body status
function bodyStatus(bmiValue) {
  switch(true) {
    case bmiValue > 0 && bmiValue < 18.5:
      resultStyle('過輕', '#31BAF9');
      return ['underweight', '過輕'];

    case bmiValue >= 18.5 && bmiValue < 24:
      resultStyle('理想', '#86D73F');
      return ['normal', '理想'];
      
    case bmiValue >= 24 && bmiValue < 27:
      resultStyle('過重', '#FF982D');
      return ['overweight', '過重'];

    case bmiValue >= 27 && bmiValue < 30:
      resultStyle('輕度肥胖', '#FF6C02');
      return ['obese', '輕度肥胖'];

    case bmiValue >= 30 && bmiValue < 35:
      resultStyle('中度肥胖', '#FF6C02');
      return ['clinicallyObese', '中度肥胖'];

    case bmiValue >= 35:
      resultStyle('重度肥胖', '#FF1200');
      return ['morbidlyObese', '重度肥胖'];
  }
}