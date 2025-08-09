import Settings from "./Settings";
import Add from "./Add";
import List from "./List";
import Status from "./Status";

import "./App.css";

// common approach is to import all state functions and properties like this
import * as State from "../state";

export default function App() {
  // figure out if we are editing a todo or not

  return (
    <>
      <div id="left">
        <Settings />
        <Add />
        <List />
        <Status />
      </div>
    </>
  );
}
