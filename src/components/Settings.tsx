import { useState } from "preact/hooks";
import "./Settings.css";
import EditCategories from "./EditCategories";
import ShowExpenses from "./ShowExpenses"

type SettingsProps = {};

export default function Settings({ }: SettingsProps) {
  // reference hook for input element
  const [showOverlay, setShowOverlay] = useState(false);
  const [editCatView, setEditCatView] = useState(false);
  const [expenseView, setShowExpenseView] = useState(false);

  function handleEditCategories() {
    setEditCatView(true);
    setShowOverlay(true);
  }

  function handleShowExpenses() {
    setShowExpenseView(true);
    setShowOverlay(true);
  }

  function handleCloseOverlay() {
    setShowOverlay(false);
    setEditCatView(false);
    setShowExpenseView(false);
  }

  return (
    <div id="settings">
      <div className="button-container">
        <button onClick={handleEditCategories}>
          {"✍🏻 Edit Categories"}
        </button>
        <button onClick={handleShowExpenses}>
          {"💵 Show Expenses"}
        </button>
      </div>

      {showOverlay && (
            <div className="overlay">
                <div className="overlay-content">
                    {editCatView && (<EditCategories />)}
                    {expenseView && (<ShowExpenses />)}
                    <button className="close-overlay" onClick={handleCloseOverlay}>✖️</button>
                </div>
            </div>
        )}
    </div>
  );
}
