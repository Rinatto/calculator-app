import React from "react";

interface DisplayComponentProps {
  input: string;
  result: string;
  fontSize: string;
}

export const DisplayComponent: React.FC<DisplayComponentProps> = ({
  input,
  result,
  fontSize,
}) => {
  return (
    <div>
      <input
        type="text"
        value={input}
        className="calculator-display"
        readOnly
      />
      <div
        className="calculator-result"
        data-testid="result"
        style={{ fontSize }}
      >
        {result}
      </div>
    </div>
  );
};
