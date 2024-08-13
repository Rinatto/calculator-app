import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Calculator } from "../Calculator";

import "@testing-library/jest-dom";

describe("Calculator", () => {
  test("handles button click and displays results correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("3");
  });

  test("handles multiple operations correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("×"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("7");
  });

  test("handles decimal numbers correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText(","));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText(","));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("3.7");
  });

  test("displays error on division by zero", () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("="));
    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("Error");
  });

  test("clears input when C is clicked", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("C"));

    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  test("displays error on invalid input", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("√"));
    fireEvent.click(screen.getByText("-"));
    fireEvent.click(screen.getByText("="));
    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("Error");
  });

  //   test("handles operations with parentheses correctly", () => {
  //     render(<Calculator />);

  //     fireEvent.click(screen.getByText("("));
  //     fireEvent.click(screen.getByText("2"));
  //     fireEvent.click(screen.getByText("+"));
  //     fireEvent.click(screen.getByText("3"));
  //     fireEvent.click(screen.getByText(")"));
  //     fireEvent.click(screen.getByText("×"));
  //     fireEvent.click(screen.getByText("4"));
  //     fireEvent.click(screen.getByText("="));

  //     const resultDisplay = screen.getByTestId("result");
  //     expect(resultDisplay).toHaveTextContent("20");
  //   }); // тест закомментирован, нету скобок на интерфейсе калькулятора

  test("handles sequential operations correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("3"));
    fireEvent.click(screen.getByText("="));
    fireEvent.click(screen.getByText("×"));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("20");
  });

  test("handles backspace correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("9"));
    fireEvent.click(screen.getByText("8"));
    fireEvent.click(screen.getByText("7"));
    fireEvent.keyDown(document, { key: "Backspace" });
    const inputDisplay = screen.getByRole("textbox");
    expect(inputDisplay).toHaveValue("98");
  });

  test("handles long numbers correctly", () => {
    render(<Calculator />);

    for (let i = 0; i < 20; i++) {
      fireEvent.click(screen.getByText("9"));
    }
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("100000000000000000000");
  });
  test("handles leading zero correctly", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText("0"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("5"));
    fireEvent.click(screen.getByText("="));

    const resultDisplay = screen.getByTestId("result");
    expect(resultDisplay).toHaveTextContent("10");
  });
});
