// 1) 요소 선택 (널 방지: '!' 사용 또는 if-guard 사용)
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2) 타입
type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 3) 유틸: 입력값
const getTodoText = (): string => todoInput.value.trim();

// 4) 렌더링
const renderTasks = (): void => {
  // 리스트 비우고
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 미완료 렌더
  todos.forEach((todo) => {
    const li = createTodoItem(todo, false);
    todoList.appendChild(li);
  });

  // 완료 렌더
  doneTasks.forEach((todo) => {
    const li = createTodoItem(todo, true);
    doneList.appendChild(li);
  });
};

// 5) 할 일 추가
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = ""; //칸에서 입력값 지우기
  renderTasks();
};

// 6) 완료로 이동 -> 완료버튼을 누를 시
const completeTask = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id); // 선택한 것 제외
  doneTasks.push(todo); // 완료 배열로 이동
  renderTasks(); // 화면 다시 그리기
};

// 7) 완료 목록에서 삭제
const deleteDone = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

// (선택) 미완료에서 삭제가 필요하면 이 함수도 추가
const deleteTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  renderTasks(); //삭제화면과 똑같은 로직으로 작성해주면 됨
};

// 8) li 아이템 생성
const createTodoItem = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.textContent = todo.text;

  const btn = document.createElement("button");

  if (isDone) {
    btn.textContent = "삭제";
    btn.style.backgroundColor = "red";
    btn.addEventListener("click", () => deleteDone(todo));
  } else {
    btn.textContent = "완료";
    btn.style.backgroundColor = "green";
    btn.addEventListener("click", () => completeTask(todo));
  }

  btn.style.marginLeft = "8px";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.padding = "4px 8px";
  btn.style.borderRadius = "4px";
  btn.style.cursor = "pointer";

  li.appendChild(btn);
  return li;
};

// 9) 폼 제출
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = getTodoText();
  if (text) addTodo(text);
});
