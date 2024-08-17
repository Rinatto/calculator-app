import React from "react";

import { Button } from "./Button";

interface ButtonPanelProps {
  onClick: (value: string) => void;
  buttons: string[];
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({
  onClick,
  buttons,
}) => {
  const handleButtonClick = (value: string) => () => {
    onClick(value);
  };

  return (
    <div className="calculator-buttons">
      {buttons.map((label) => (
        <Button key={label} label={label} onClick={handleButtonClick(label)} />
      ))}
    </div>
  );
};
