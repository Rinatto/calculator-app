export function parseExpression(expression: string): string[] {
  const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\*|\/|\%|\(|\)|√)/g);

  if (tokens === null) {
    throw new Error("Invalid Expression");
  }

  return tokens;
}
