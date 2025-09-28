import "./App.css";
import React, { useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // 추가
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;

    const newTodo: Todo = { id: String(Date.now()), text: value, done: false };
    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  // 완료 처리: 할 일 → 완료
  const handleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: true } : t))
    );
  };

  // 삭제: 완료 목록에서만
  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const todoList = todos.filter((t) => !t.done);
  const doneList = todos.filter((t) => t.done);

  return (
    <>
      <div className="todo-container">
        <h1 className="todo-container__header">YONG TODO</h1>

        {/* 기존 id/class 유지 */}
        <form
          id="todo-form"
          className="todo-container__form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="todo-input"
            className="todo-container__input"
            placeholder="할 일 입력"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="todo-container__button">
            할 일 추가
          </button>
        </form>

        <div className="render-container">
          {/* 할 일 섹션 */}
          <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul id="todo-list" className="render-container__list">
              {todoList.map((t) => (
                <li key={t.id} className="render-container__item">
                  <span>{t.text}</span>
                  <button
                    type="button"
                    className="render-container__item-button render-container__complete"
                    onClick={() => handleComplete(t.id)}
                    aria-label={`${t.text} 완료`}
                  >
                    완료
                  </button>
                </li>
              ))}
              {todoList.length === 0 && (
                <li className="render-container__empty"></li>
              )}
            </ul>
          </div>

          {/* 완료 섹션 */}
          <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul id="done-list" className="render-container__list">
              {doneList.map((t) => (
                <li key={t.id} className="render-container__item">
                  <span
                    style={{ textDecoration: "line-through", opacity: 0.7 }}
                  >
                    {t.text}
                  </span>
                  <button
                    type="button"
                    className="render-container__item-button render-container__delete"
                    onClick={() => handleDelete(t.id)}
                    aria-label={`${t.text} 삭제`}
                  >
                    삭제
                  </button>
                </li>
              ))}
              {doneList.length === 0 && (
                <li className="render-container__empty"></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
