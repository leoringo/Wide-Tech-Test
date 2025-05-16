import { useState } from "react";

export const useCounterHooks = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return {
    count,
    handleIncrement,
    handleDecrement,
  };
};
