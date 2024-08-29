import {
  add,
  divide,
  multiply,
  percentage,
  sqrt,
  subtract,
} from "./mathOperations";
import { parseExpression } from "./parser";

function roundResult(value: number, decimals: number = 10): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function getPrecedence(operator: string): number {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    case "√":
      return 3;
    default:
      return 0;
  }
}

function applyOperator(operator: string, b: number, a: number): number {
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    case "√":
      result = sqrt(b);
      break;
    case "%":
      result = percentage(a, b);
      break;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
  return roundResult(result);
}

export function evaluateExpression(expression: string): number {
  const tokens = parseExpression(expression);
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  tokens.forEach((token, index) => {
    if (!isNaN(parseFloat(token))) {
      outputQueue.push(token);
    } else if ("+-*/√%".includes(token)) {
      const isUnaryMinus =
        token === "-" && (index === 0 || "*/+-(".includes(tokens[index - 1]));
      if (isUnaryMinus) {
        outputQueue.push("-1");
        operatorStack.push("*");
      } else {
        while (
          operatorStack.length > 0 &&
          getPrecedence(operatorStack[operatorStack.length - 1]) >=
            getPrecedence(token)
        ) {
          outputQueue.push(operatorStack.pop() as string);
        }
        operatorStack.push(token);
      }
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop() as string);
      }
      operatorStack.pop();
    }
  });

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop() as string);
  }

  const resultStack: number[] = [];

  outputQueue.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      resultStack.push(parseFloat(token));
    } else {
      const b = resultStack.pop() as number;
      const a = (resultStack.pop() as number) || 0;
      const result = applyOperator(token, b, a);
      resultStack.push(result);
    }
  });

  if (resultStack.length !== 1) {
    throw new Error("Invalid Expression");
  }

  return resultStack[0];
}
