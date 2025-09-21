"use strict"; //dist -> js 연결
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const getTodoText = () => todoInput.value.trim();
const renderTasks = () => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";
  todos.forEach((todo) => {
    const li = createTodoItem(todo, false);
    todoList.appendChild(li);
  });
  doneTasks.forEach((todo) => {
    const li = createTodoItem(todo, true);
    doneList.appendChild(li);
  });
};
const addTodo = (text) => {
  todos.push({ id: Date.now(), text });
  todoInput.value = "";
  renderTasks();
};
const completeTask = (todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};
const deleteDone = (todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};
const deleteTodo = (todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  renderTasks();
};
const createTodoItem = (todo, isDone) => {
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
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = getTodoText();
  if (text) addTodo(text);
});
renderTasks();
