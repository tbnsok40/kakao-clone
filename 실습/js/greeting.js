const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

// querySelectorAll 은 모든걸 다 가져오고, querySelector는 맨 앞의 것을 가져온다

// localStorage is a small place that saving our small info on the web

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// CN: ClassName

function saveName(text) {
  localStorage.setItem(USER_LS, text);
  // 이 함수 덕분에, 인풋창에 입력한 내 이름이, 새로고침을 하여도 없어지지 않는다. User_LocalStorage
}

function handleSubmit(event) {
  event.preventDefault();
  //   입력창에 엔터쳤을 때 새로고침되며 없어지는걸 방지..?
  // 이게 없으면 입력 form이 enter와 함께 어디로 사라짐.

  const currentValue = input.value;

  // 얘는 input창에 입력-엔터치면, browser에 뜨게 하는 녀석
  paintGreeting(currentValue);

  //   이걸 해줘야, localStorage에 이름이 저장되구나(saveName)
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
  // 입력-제출을 했을 때, handleSubmit 함수를 호출
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  // setItem과 getItem의 차이를 숙지하자
  // currentUser는 localStorage에서 가져온 녀석임

  if (currentUser === null) {
    // when he or she is not
    askForName();
    // currentUser가 null이라면 name을 ask하는 것부터 할 것이다.
  } else {
    //   he or she is 존재! currentUser가 null이 아니면, paintGreeting을 실행(색칠)
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
