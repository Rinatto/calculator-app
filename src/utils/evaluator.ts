import { parseExpression } from "./parser";

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
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    case "√":
      return Math.sqrt(b);
    case "%":
      return (a * b) / 100;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

export function evaluateExpression(expression: string): number {
  const tokens = parseExpression(expression);
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];

  tokens.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      // Если токен - число
      outputQueue.push(token);
    } else if ("+-*/√%".includes(token)) {
      // Если токен - оператор
      while (
        operatorStack.length > 0 &&
        getPrecedence(operatorStack[operatorStack.length - 1]) >=
          getPrecedence(token)
      ) {
        outputQueue.push(operatorStack.pop() as string);
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop() as string);
      }
      operatorStack.pop(); // Удаляем '('
    }
  });

  // Очищаем операторный стек
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop() as string);
  }

  // Вычисляем результат из постфиксной записи
  const resultStack: number[] = [];

  outputQueue.forEach((token) => {
    if (!isNaN(parseFloat(token))) {
      // Если токен - число
      resultStack.push(parseFloat(token));
    } else {
      // Если токен - оператор
      const b = resultStack.pop() as number;
      const a = resultStack.pop() as number;
      const result = applyOperator(token, b, a);
      resultStack.push(result);
    }
  });

  if (resultStack.length !== 1) {
    throw new Error("Invalid Expression");
  }

  return resultStack[0];
}
