import React, { useCallback, useEffect, useState } from "react";

import { evaluateExpression } from "../utils/evaluator";

import { ButtonPanel } from "./ButtonPanel";
import { DisplayComponent } from "./DisplayComponent";

import "../styles/Calculator.css";

export const Calculator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleCalculate = useCallback(() => {
    try {
      const normalizedInput = input.replace(/×/g, "*").replace(/,/g, ".");
      if (!normalizedInput || /[^0-9+*/%√().,-]/.test(normalizedInput)) {
        throw new Error("Invalid Expression");
      }

      const computedResult = evaluateExpression(normalizedInput);

      if (isNaN(Number(computedResult))) {
        throw new Error("Invalid Expression");
      }

      setResult(computedResult.toString());
    } catch {
      setResult("Error");
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult("");
  }, []);

  const handleClick = (value: string) => {
    if (value === "C") {
      handleClear();
    } else if (value === "=") {
      handleCalculate();
    } else if (["+", "-", "×", "/", "%"].includes(value)) {
      if (result !== "") {
        setInput(result + value);
        setResult("");
      } else {
        setInput(input + value);
      }
    } else if (value === ".") {
      setInput(input + ",");
    } else {
      setInput(input + value);
    }
  };

  useEffect(() => {
    let calculationPerformed = false;

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (!calculationPerformed) {
          handleCalculate();
          calculationPerformed = true;
        }
      } else if (event.key === "Escape") {
        handleClear();
      } else if (event.key === "Backspace") {
        event.preventDefault();
        setInput((prev) => prev.slice(0, -1));
      } else {
        calculationPerformed = false;
        if (
          [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "+",
            "-",
            "*",
            "/",
            "(",
            ")",
            ".",
            "%",
            "√",
          ].includes(event.key)
        ) {
          event.preventDefault();
          let value = event.key;
          switch (event.key) {
            case "*":
              value = "×";
              break;
            case ".":
              value = ",";
              break;
            default:
              break;
          }
          setInput((prev) => prev + value);
        }
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [handleCalculate, handleClear]);

  const fontSize =
    result.length > 10 ? `${30 - (result.length - 10)}px` : "2.5em";

  return (
    <div className="calculator-container">
      <DisplayComponent input={input} result={result} fontSize={fontSize} />
      <hr className="calculator-line" />
      <ButtonPanel onClick={handleClick} />
    </div>
  );
};
