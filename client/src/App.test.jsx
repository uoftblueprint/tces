import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders the correct content", () => {
  render(<h1>hello world</h1>);
  const headingElement = screen.getByText(/hello world/i);
  expect(headingElement).toBeInTheDocument();
});
