import { useEffect, useState } from "preact/hooks";
import "./Status.css";
import * as State from "../state";

type StatusProps = {};

export default function Status({ }: StatusProps) {
  const [numItems, setNumItems] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [target, setTarget] = useState(State.numItems.value);

  useEffect(() => {
    const target = State.numItems.value;
    setTarget(target);

    if (target > 0 && !isFetched) {
      let count = 0;

      // smooth count-up animation
      const interval = setInterval(() => {
        count += Math.ceil(target / 100);
        if (count >= target) {
          setNumItems(target);
          setIsFetched(true);
          clearInterval(interval);
        } else {
          setNumItems(count);
        }
      }, 50); // increment every 50 miliseconds

      return () => clearInterval(interval);
    } else {
      setNumItems(target);
    }
  }, [State.numItems.value, isFetched]);

  useEffect(() => {
    if (State.numItems.value !== target) {
      setNumItems(0);
      setIsFetched(false);
    }
  }, [State.numItems.value, target]);

  return (
    <div id="status">
      <h1 className="sparkle">
        There are a total of     <span className="num-items">{numItems}</span>     items on the shopping list!
      </h1>
    </div>
  );
}
