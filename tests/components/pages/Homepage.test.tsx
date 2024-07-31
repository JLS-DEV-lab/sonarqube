import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Homepage } from "@pages";

describe("Homepage component", () => {
  test("renders Homepage components", () => {
    render(
      <Router>
        <Homepage />
      </Router>
    );

    // Check if elements from the Homepage component are rendered
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
