import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import { useLocalStorage } from "./components/hooks/useLocalStorage";
const FILTERS = ["all", "active", "done"];
const App = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const newItem = { id: crypto.randomUUID(), text: trimmed, done: false };
    setTodos((prev) => [...prev, newItem]);
    console.log(todos);
    setText("");
  }

  function handleEdit(id, newItem) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newItem } : todo)),
    );
  }
  function handleChecked(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function ClearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });
  const hasDone = todos.some((todo) => todo.done);
  return (
    <main className="app">
      <header className="card">
        <h1 className="title">
          Todo-<span className="accent">App</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="task" className="visually-hidden">
            Enter task:{" "}
          </label>
          <input
            id="task"
            name="task"
            placeholder="Enter task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </header>
      <div className="filters">
        {FILTERS.map((name) => (
          <button
            key={name}
            className={filter === name ? "active" : ""}
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </button>
        ))}
      </div>

      {visibleTodos.length === 0 ? (
        <p className="empty">
          {todos.length === 0 ? (
            <p className="count"> No todos yet. Add your todos</p>
          ) : (
            <p className="empty">No todos available here </p>
          )}
        </p>
      ) : (
        <section className="todos">
          <ul className="list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                onChecked={handleChecked}
                onDelete={handleDelete}
                todo={todo}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        </section>
      )}

      {hasDone && (
        <button className="clear" onClick={ClearCompleted}>
          Clear completed
        </button>
      )}
    </main>
  );
};

export default App;
