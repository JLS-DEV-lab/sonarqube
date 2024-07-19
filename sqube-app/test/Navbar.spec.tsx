import { Navbar } from "@modules";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

test("loads and displays Navbar component", async () => {
  render(
    <Router>
      <Navbar />
    </Router>
  );

  //Assert that all expected links are present
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Docs")).toBeInTheDocument();
  expect(screen.getByText("BDD")).toBeInTheDocument();
  expect(screen.getByText("NNA")).toBeInTheDocument();
  expect(screen.getByText("CM")).toBeInTheDocument();

  //Assert that when linkas are clicked, the correct page is displayed
  expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  expect(screen.getByText("Docs")).toHaveAttribute("href", "/docs");
  expect(screen.getByText("BDD")).toHaveAttribute("href", "/b");
  expect(screen.getByText("NNA")).toHaveAttribute("href", "/nna");
});
