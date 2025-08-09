import { useState } from "preact/hooks";
import * as State from "../state"; // Assuming State manages your items and categories
import "./EditCategories.css";

type EditCategoriesProps = {};

export default function EditCategories({ }: EditCategoriesProps) {
  // Create a function to handle category change
  const handleCategoryChange = (itemId: number, newCategory: string) => {
    // Update the item category in the state (model)
    State.updateItem(itemId, { category: newCategory });
  };

  // Sort items alphabetically
  const sortedItems = State.items.value.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div id="edit-categories">
      <div className="grid">
        {sortedItems.map((item) => (
          <div className="grid-item" key={item.id}>
            <div className="item-name"> {item.name} </div>
            
            <div className="category-selector">
              <select value={item.category} onChange={(e) => handleCategoryChange(item.id, e.target.value)} >
                {State.categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    <span>{category.icon}</span> {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
