import React from "react";

import { Button } from "./Button";

interface ButtonPanelProps {
  onClick: (value: string) => void;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({ onClick }) => {
  const handleButtonClick = (value: string) => () => {
    onClick(value);
  };

  return (
    <div className="calculator-buttons">
      <Button label="C" onClick={handleButtonClick("C")} />
      <Button label="√" onClick={handleButtonClick("√")} />
      <Button label="%" onClick={handleButtonClick("%")} />
      <Button label="/" onClick={handleButtonClick("/")} />
      <Button label="7" onClick={handleButtonClick("7")} />
      <Button label="8" onClick={handleButtonClick("8")} />
      <Button label="9" onClick={handleButtonClick("9")} />
      <Button label="×" onClick={handleButtonClick("×")} />
      <Button label="4" onClick={handleButtonClick("4")} />
      <Button label="5" onClick={handleButtonClick("5")} />
      <Button label="6" onClick={handleButtonClick("6")} />
      <Button label="-" onClick={handleButtonClick("-")} />
      <Button label="1" onClick={handleButtonClick("1")} />
      <Button label="2" onClick={handleButtonClick("2")} />
      <Button label="3" onClick={handleButtonClick("3")} />
      <Button label="+" onClick={handleButtonClick("+")} />
      <Button label="00" onClick={handleButtonClick("00")} />
      <Button label="0" onClick={handleButtonClick("0")} />
      <Button label="," onClick={handleButtonClick(",")} />
      <Button label="=" onClick={handleButtonClick("=")} />
    </div>
  );
};
