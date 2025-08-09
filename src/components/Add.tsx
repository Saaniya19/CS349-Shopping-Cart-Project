import { useRef, useState, useEffect } from "preact/hooks";
import "./Add.css";
import * as State from "../state";

type AddProps = {};

export default function Add({ }: AddProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Other");
  const [itemName, setItemName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // check if the item already exists
  useEffect(() => {
    const existingItem = State.items.value.find(item => item.name === itemName);
    if (existingItem) {
      setCategory(existingItem.category);
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [itemName]);

  function handleItemNameChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    const formattedValue = value.replace(/^[\s]+/, '').replace(/[^a-zA-Z\s]/g, '');
    setItemName(formattedValue);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (itemName.trim() === "") return;

    const existingItem = State.items.value.find(item => item.name === itemName);

    if (existingItem) {
      const newQuantity = Math.min(existingItem.quantity + quantity, 24);
      State.updateItem(existingItem.id, { quantity: newQuantity });
    } else {
      State.createItem(itemName, quantity, category, false);
    }

    resetFields();
    console.log(State.items.value)
  }

  function resetFields() {
    setItemName("");
    setQuantity(1);
    setCategory("Other");
    setIsDisabled(false);
  }

  function handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyPress);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [itemName]);

  return (
    <div id="add">
      <input type="text" ref={inputRef} value={itemName} placeholder={"Item Name"} onInput={handleItemNameChange} style={{ width: "100%" }} />
      <input type="number" value={quantity} min="1" max="24" step="1" 
        onInput={(e) => {
          const value = Number((e.target as HTMLInputElement).value);
          if (value >= 1 && value <= 24) {
            setQuantity(value);
          } else {
            if (value < 1) { setQuantity(1); } 
            else if (value > 24) { setQuantity(24); }
          }
        }}
        onKeyDown={handleKeyPress}
      />
      {/* <input type="number" value={quantity} min="1" max="24" step="1" onInput={(e) => setQuantity(Number((e.target as HTMLInputElement).value))} onKeyDown={handleKeyPress} /> */}
      <select value={category} onChange={(e) => setCategory((e.target as HTMLSelectElement).value)} disabled={isDisabled} >
        <option value="Other">🛒 Other</option>
        <option value="Dairy">🥛 Dairy</option>
        <option value="Frozen">🧊 Frozen</option>
        <option value="Fruit">🍌 Fruit</option>
      </select>
      <button onClick={handleSubmit}>➕</button>
    </div>
  );
}
