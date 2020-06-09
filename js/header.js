    
(function timeBox() {
  const $time = document.querySelector('.time');
  const $msg = document.querySelector('.msg');

  const clock = new Date();
  let month = clock.getMonth();
  let day = clock.getDay();
  let hour = clock.getHours();
  let minute = clock.getMinutes();
  let second = clock.getSeconds();
  $time.innerHTML = `${day}일${hour}:${minute}:${second}`;

  // 메세지 나오게하기
  const msgBox = hour > 17 ? 'evening': (hour < 11 ? 'morning':'afternoon');
  $msg.innerHTML = `Good ${msgBox}!`;
  // AM , PM 나누기 
  const ampm = hour < 12 ? 'AM' : 'PM';  
  // 12시간제로 바꾸기
  hour %= 12;
  // 0 붙히기
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;  
  second = second < 10 ? '0' + second : second;
  $time.innerHTML = `${month}월 ${day}일 ${hour}:${minute}:${second}${ampm}`;
  setTimeout(timeBox,1000);
}());
