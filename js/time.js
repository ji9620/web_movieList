function setTime(){
  const today = new Date();

  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  hour = (hour < 10) ? ("0" + hour) : (hour);
  minute = (minute < 10) ? ("0" + minute) : (minute); 
  
  document.querySelector(".movie__current-time").innerText = `${hour}:${minute}`;
}
setInterval(setTime, 1000);