import "./TodoItem.css";
import * as State from "../state";

type TodoItemProps = {
  todo: State.Item;
};

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="category-item" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.bought}
        onInput={() =>
          State.updateItem(todo.id, { bought: !todo.bought })
        }
      />
      <span className="item-label">{todo.name}</span>
      {!todo.bought && <input
        type="number"
        value={todo.quantity}
        min="1"
        max="24"
        step="1"
        onInput={(e) =>
          State.updateItem(todo.id, {
            quantity: Number((e.target as HTMLInputElement).value),
          })
        }
      />}
      <button onClick={() => State.deleteItem(todo.id)}>❌</button>
    </div>
  );
}
