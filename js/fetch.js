/* 
targetDt: yyyymmdd 형식의 날짜
뒤에 repNationCd 옵션으로 한국/외국 영화별로 조회
*/
let url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=bfdf24d75fadae966012bf1413ec9346&targetDt=";

const day = new Date;
let year = day.getFullYear();
let month = day.getMonth() + 1;
let date = day.getDate() - 1;   
//전날의 통계를 불러옴

month = (month < 10) ? ("0" + month) : (month);
date = (date < 10) ? ("0" + date) : (date);

let now = `${year}${month}${date}`;
let restoredSession;
let selectedUrl;

async function fetchUrl(){
  //console.log(now);
  selectedUrl = url + now;
  //console.log(selectedUrl);

  const result = await fetch(selectedUrl)
  .then(res => res.json());

  return result;
  //.then(myJson => localStorage.setItem('session', JSON.stringify(myJson)));

//parse?
//restoredSession = localStorage.getItem('session'); 
  //restoredSession = JSON.parse(localStorage.getItem('session'));
  //console.log(restoredSession);
}
fetchUrl();

async function getDataAppend(){
  restoredSession = await fetchUrl();
}
getDataAppend();

const items = document.querySelector(".movie__infos");
const input = document.querySelector(".movie__search");
const addBtn = document.querySelector(".movie__insert__button");
const deleteAll = document.querySelector(".movie__delete-all");

function onAdd() {
  const text = input.value;

  if (text === "") {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: "center" });
  input.value = "";
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "movie__info__row");

  const item = document.createElement("div");
  item.setAttribute("class", "movie__info");

  const name = document.createElement("span");
  name.setAttribute("class", "movie__name");
  name.innerText = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "movie__delete");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "movie__divider");

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  return itemRow;
}

addBtn.addEventListener("click", () => {
  update();
});

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    update();
  }
});

deleteAll.addEventListener("click", () => {
  while(items.hasChildNodes){
    items.removeChild(items.firstChild);
  }
});

printRank();

function update(){
/*
  fetch(selectedUrl)
  .then(res => res.json())
  .then(myJson => localStorage.setItem('session', JSON.stringify(myJson)));
*/
  selectedUrl = null;
  now = null;
  now = input.value + "";
  //session = null;
  //restoredSession = null;

  fetchUrl();
  getDataAppend();
  printRank();
}

async function printRank(){
  await getDataAppend();
  for(let i = 0; i < 10; i++){
    //console.log(restoredSession.boxOfficeResult.dailyBoxOfficeList[i].movieNm);
    input.value = `${restoredSession.boxOfficeResult.dailyBoxOfficeList[i].movieNm}`;
    onAdd();
  }
}