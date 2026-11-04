import { useState } from "react";
const TodoItem = ({ onChecked, onDelete, todo, onEdit }) => {
  const [isEditTodo, setISEditTodo] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function editTrue() {
    setDraft(todo.text);
    setISEditTodo(true);
  }

  function save() {
    const trimmed = draft.trim();
    if (trimmed) onEdit(todo.id, trimmed);
    setISEditTodo(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") save();
    if (e.key === "Escape") setISEditTodo(false);
  }

  return (
    <div>
      <li className={`item ${todo.done ? "done" : ""}`}>
        <input
          type="checkbox"
          value={todo.done}
          onChange={() => onChecked(todo.id)}
        />

        {isEditTodo ? (
          <>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
            <button className="secondary" onClick={save}>
              Save
            </button>{" "}
          </>
        ) : (
          <>
            <span onDoubleClick={editTrue}> {todo.text} </span>
            <button onClick={editTrue} className="secondary">
              Edit
            </button>
          </>
        )}
        <button className="danger" onClick={() => onDelete(todo.id)}>
          Remove
        </button>
      </li>
    </div>
  );
};

export default TodoItem;
