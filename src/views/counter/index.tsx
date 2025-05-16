import React from "react";
import { Box } from "@mui/material";
import TextStyle from "../../components/TextStyle";
import CustomButton from "../../components/CustomButton";
import { CounterContainer } from "./styled";
import { useCounterHooks } from "./useCounterHooks";

const Counter: React.FC = () => {
  const { count, handleIncrement, handleDecrement } = useCounterHooks();

  return (
    <CounterContainer>
      <TextStyle variant="h4">Count: {count}</TextStyle>
      <Box display="flex" gap={2}>
        <CustomButton
          variant="contained"
          color="secondary"
          onClick={handleDecrement}
          disabled={count === 0}
        >
          Decrement
        </CustomButton>
        <CustomButton
          variant="contained"
          color="primary"
          onClick={handleIncrement}
        >
          Increment
        </CustomButton>
      </Box>
    </CounterContainer>
  );
};

export default Counter;
