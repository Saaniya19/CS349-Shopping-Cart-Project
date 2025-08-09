import { useState, useEffect } from "preact/hooks";
import * as State from "../state"; // Assuming your state holds items and relevant data
import "./ShowExpenses.css";

type ShowExpensesProps = {};

export default function ShowExpenses({ }: ShowExpensesProps) {
  const [boughtItems, setBoughtItems] = useState<State.Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Filter bought items
  useEffect(() => {
    const filteredItems = State.items.value.filter((item) => item.bought);
    setBoughtItems(filteredItems);

    const fetchItems = async (itemId: number, itemName: string) => {
        setIsLoading(true);
        const existingItem = State.items.value.find(item => item.id === itemId);
        if (existingItem && existingItem.price !== 0) {
            setIsLoading(false);
            return
        };

        const response = await fetch("https://student.cs.uwaterloo.ca/~cs349/resources/prices.php?item=" + itemName);
        const data = await response.json();
        State.updateItem(itemId, { price: data.price});

        const updatedItems = State.items.value.filter((item) => item.bought);
        const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalCost(total);
        setIsLoading(false);
    };

    filteredItems.forEach((item) => {
        fetchItems(item.id, item.name);
    })
  }, [State.items.value]);

  return (
    <div id="show-expenses">
      <table>
        <tbody>
          {boughtItems.map((item) => (
            <tr key={item.id}>
              <td className="name">{item.name}</td>
              <td className="quantity">{item.quantity}  x</td>
              <td className="price">{isLoading ? (<span className="loading-dots"></span>) : (`${item.price.toFixed(2)}  =`)}</td>
              <td className="total">{isLoading ? (<span className="loading-dots"></span>) : (`${(item.price*item.quantity).toFixed(2)}`)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>Total Cost:</td>
            <td style={{ fontWeight: "bold" }}>${totalCost.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
