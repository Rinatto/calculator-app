export function parseExpression(expression: string): string[] {
  // Используем match для разбиения строки на токены
  const tokens = expression.match(/[\d\.]+|[()+\-*/√%]/g);

  // Проверяем, что результат не null
  if (tokens === null) {
    throw new Error("Invalid Expression");
  }

  return tokens;
}
