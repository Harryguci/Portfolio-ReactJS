import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders portfolio hero", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { level: 1, name: "PORTFOLIO" })
  ).toBeInTheDocument();
  expect(screen.getByText("START")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "ABOUT ME" })).toBeInTheDocument();
  expect(screen.getByText("THANK YOU")).toBeInTheDocument();
});
