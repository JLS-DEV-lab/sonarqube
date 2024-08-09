import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";

describe("App component", () => {
  test("renders Outlet and Homepage components", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if elements from the Homepage component are rendered
    expect(screen.getByText('Welcome to SonarQube')).toBeInTheDocument();
  });
});
