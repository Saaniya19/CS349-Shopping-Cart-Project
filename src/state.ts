import { computed, signal } from "@preact/signals";

export type Item = {
  id: number;
  name: string;
  category: string;
  bought: boolean;
  hidden: boolean;
  quantity: number;
  price: number;
}

export const categories = [
  { icon: '🥛', name: "Dairy", colour: `hsl(220, 75%, 75%)` },
  { icon: '🧊', name: "Frozen", colour: `hsl(220, 90%, 95%)` },
  { icon: '🍌', name: "Fruit", colour: `hsl(140, 75%, 75%)` },
  { icon: '🛒', name: "Other", colour: `hsl(0, 0%, 90%)` }
];

//#region state

// the array of all items
export const items = signal<Item[]>([]);

export const numItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0));

export const numboughtItems = computed(
  () => items.value.filter((t) => t.bought).length
);

// selected item ID (for editing)
export const selectedItemId = signal<number | null>(null);

//#endregion

//#region convenience functions

// Read
export const getItem = (id: number): Item | undefined => {
  return items.value.find((t) => t.id === id);
};

// Get all items
export const allItems = computed(() => items.value);

//#endregion

//#region mutations

// simple unique id generator
let uniqueId = 1;

// Create
export const createItem = (name: string, quantity: number, category: string, bought: boolean) => {
  const foundItem = items.value.find(item => item.name === name);
  
  if (foundItem && !foundItem.hidden) {
    foundItem.quantity += quantity;
  } else if (foundItem && foundItem.hidden) {
    foundItem.hidden = false;
    foundItem.quantity = quantity;
  } else if (!foundItem) {
    items.value = [
      ...items.value,
      { id: uniqueId++, name, quantity, category, bought: bought, hidden: false, price: 0 },
    ];
  }
};

// Update
export const updateItem = (
  id: number,
  item: { text?: string; category?: string; bought?: boolean; quantity?: number, price?: number }
) => {
  items.value = items.value.map((i) => 
    i.id === id ? { ...i, ...item } : i
  );
};

// Select item for editing
export const selectItem = (id: number) => {
  selectedItemId.value = id;
};

// Delete
export const deleteItem = (id: number) => {
  items.value = items.value.map((item) =>
    item.id === id ? { ...item, hidden: true } : item
  );
  // console.log(selectedItemId.value, id)
  // if (selectedItemId.value === id) {
  //   console.log("hi")
  //   selectedItemId.value = null;
  // }
  // console.log(items.value)
};

//#endregion
