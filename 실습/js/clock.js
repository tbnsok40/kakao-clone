const clockContainer = document.querySelector(".js-clock"),
  // html에서 js-clock이란 div 클래스를 만들었으니, querySelector로 읽어오겠다.
  // querySelector look for children(element) of document.
  clockTitle = clockContainer.querySelector("h1");
// js-clock 내부의 h1태그를 읽어온다. + clockContainer상수 내부에서.

function getTime() {
  const date = new Date();
  // Date(): 날짜를 알려주는 메소드, date상수에 할당하는데, web console창에서 date를 입력하면
  // Date()가 연결돼있기 때문에 곧 바로 현재 시간을 알려준다.

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}
// innerText는 객체안에 text를 넣는다는 뜻
// ``이것은 벡틱 기호

function init() {
  getTime();
  //divide&conquere

  setInterval(getTime, 1000);
  // second argument is how often it execute. first argument is fn(function)
  // 1000: 1000millisecond
}
init();
