export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

export function sqrt(a: number): number {
  if (a < 0) {
    throw new Error("Cannot take square root of negative number");
  }
  return Math.sqrt(a);
}

export function percentage(a: number, b: number): number {
  return (a * b) / 100;
}

export function calculateOperation(
  operator: string,
  a: number,
  b?: number,
): number {
  switch (operator) {
    case "+":
      return add(a, b!);
    case "-":
      return subtract(a, b!);
    case "*":
      return multiply(a, b!);
    case "/":
      return divide(a, b!);
    case "%":
      return percentage(a, b!);
    case "√":
      return sqrt(a);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}
