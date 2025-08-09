import { useEffect, useState } from "preact/hooks";
import TodoItem from "./TodoItem";
import "./List.css";
import * as State from "../state";

export default function List() {
  const [loading, setLoading] = useState(true);
  const categories = State.categories;

  // fetch data from the server asynchronously
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://student.cs.uwaterloo.ca/~cs349/resources/items.php");
        const data = await response.json();
        
        data.forEach((item: State.Item) => {
          State.createItem(item.name, item.quantity, item.category, item.bought);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        {/* source for loading gif: LottieFiles (https://lottiefiles.com/search?q=shopping+cart&category=animations&page=1) */}
        <img src="/loading_animation_shop_cart.gif" alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  return (
    <div id="list">
      {categories.map((category) => {
        // Filter and sort items by category
        const categoryItems = State.items.value
          .filter((item) => item.category === category.name)
          .filter((item) => item.hidden === false)
          .filter((item) => item.quantity > 0)
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

        // Calculate the number of bought items
        const numBought = categoryItems.filter((item) => item.bought).length;
        const totalItems = categoryItems.length;

        return (
          <div key={category.name} className="category" style={{ backgroundColor: category.colour }} >
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">
                {category.name} ({numBought} / {totalItems})
              </span>
            </div>

            {categoryItems.map((item) => (
              <TodoItem key={item.id} todo={item} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
