const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//greeting.js 파일에 만든 const와 충돌하지 않게 이름을 작성하는 것이 중요하다.

const TODOS_LS = "toDos";

let toDos = [];
// our toDos needs to be array

// each function처럼 각각의 item을 실행시킨다.
// function filterFn(toDo) {} == (함수 복잡하게 여러개 만들필요 없기에
// filter안에 직접 구현해버리자)
//deleteToDo 함수에서 toDos.filter(filterFn)을 실행
//filter는 toDos의 모든 array를 탐색하는데,
//filterFn에서 return true인 값만 실행시킨다. (중요)

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  //   btn의 parentNode, 즉 어떤 버튼이 지워지는지 파악하기 위해 그것의 부모를
  //   알아야하고, 그 부모를 알 수있는 방법이 li의 id를 파악하는 것
  toDoList.removeChild(li);
  //   그 li를 알았으니 removeChild해준다(child는 parent에 속해있으므로)
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  // toDos는 old, cleanToDos는 새로운 것이기 때문에 toDos에 할당해주는데
  // toDos가 const일 땐 할당할 수 없으므로, let toDos=[]로 바꿔준다.
  // 그리고 saveToDos에 저장
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //   자바스크립트 object를 string으로 바꿔준다는 것.
  // localStorage에 toDos를 저장하기 위함
}

function paintToDo(text) {
  const li = document.createElement("li");
  //querySelector는 html에서 어떠한것을 가져오는거고, createElement는 무언갈 우리가 직접 생성하는 것.

  const delBtn = document.createElement("button");
  delBtn.innerText = "❌ ";
  delBtn.addEventListener("click", deleteToDo);

  const span = document.createElement("span");
  const newId = toDos.length + 1;
  // newId는 새로운 index야. toDos 배열의 길이가 +1되면 newId가 하나 늘어나는 거지(순서가 증가)

  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  // put the span & delBtn into the li(list)
  //appendchild는 father의 element에 넣어주는 것
  toDoList.appendChild(li);

  li.id = newId;
  //const newId에서 설정한대로, 그 넘버링(순서)이 list의 id가 되는 것이고.
  //li에 id를 할당하는 또다른 이유는, 나중에 li를 지울 때 어떤 li를 지우는지 확인하기 위함

  // toDoObj라는 object를 만들어줘야한다. array에 넣기 전에
  const toDoObj = {
    text: text,
    id: newId
  };

  //여기 두개의 순서 중요
  // 왜냐면, push 하기 전에 saveToDos를 해버리면, 아무것도 push한게 없기 때문에 저장할게 없어(saveToDos)
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);

  //이걸 써줌으로 입력했던 문자를 엔터쳤을 때, 사라지게 만든다.
  //엔터 쳤는데도 입력창에서 안사라지면 이상하자너
  toDoInput.value = "";
}
//greeting.js와 비슷하게

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //파싱해준다는 뜻....어렵다..

    //forEach 함수 => parsedToDos에 직접 function(toDo)를 적용(?)할 것
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
